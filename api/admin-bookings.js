// api/admin-bookings.js
// Admin bookings API with WordPress primary and MySQL fallback.

import { getDb, ensureBookingsTable } from './_lib/mysql.js';
import { sendBookingStatusEmail } from './send-booking-notification.js';

async function ensureAdmin(req) {
  const viewToken = process.env.ADMIN_BOOKINGS_VIEW_TOKEN || process.env.ADMIN_VIEW_TOKEN;
  const suppliedViewToken = req.headers['x-admin-view-token'] || req.query?.view_token;
  if (viewToken && suppliedViewToken && String(suppliedViewToken) === String(viewToken)) {
    return { ok: true };
  }

  const staticToken = process.env.ADMIN_LOGIN_TOKEN || process.env.ADMIN_API_TOKEN || process.env.ADMIN_BOOKINGS_VIEW_TOKEN;
  const suppliedAdminToken = req.headers['x-admin-login-token'];
  if (staticToken && suppliedAdminToken && String(suppliedAdminToken) === String(staticToken)) {
    return { ok: true };
  }

  return { ok: false, status: 401, error: 'Missing or invalid admin credentials' };
}

function parseBody(req) {
  if (!req || req.body == null) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
}

function getWpConfig() {
  const wpUrl = String(process.env.WP_BOOKING_URL || '').trim().replace(/\/$/, '');
  const wpApiKey = String(process.env.WP_BOOKING_API_KEY || '').trim();
  return { wpUrl, wpApiKey, enabled: Boolean(wpUrl && wpApiKey) };
}

async function fetchWpBookings(wpUrl, wpApiKey) {
  const endpoint = `${wpUrl}/wp-json/ktd/v1/bookings?nocache=${Date.now()}`;
  const response = await fetch(endpoint, {
    cache: 'no-store',
    headers: {
      'x-ktd-api-key': wpApiKey,
      'cache-control': 'no-cache',
    },
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.message || `WordPress API error (${response.status})`);
  }

  const rowsRaw = Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : []);
  return rowsRaw.map((row) => ({
    ...row,
    internal_notes: row?.internal_notes || row?.message || '',
    message: row?.message || row?.internal_notes || '',
  }));
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-login-token, x-admin-view-token');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const adminCheck = await ensureAdmin(req);
  if (!adminCheck.ok) {
    return res.status(adminCheck.status || 401).json({ error: adminCheck.error || 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const { wpUrl, wpApiKey, enabled } = getWpConfig();
    let wpWarning = null;

    if (enabled) {
      try {
        const wpRows = await fetchWpBookings(wpUrl, wpApiKey);
        return res.status(200).json(wpRows);
      } catch (err) {
        wpWarning = err instanceof Error ? err.message : 'WordPress fetch failed';
      }
    }

    try {
      await ensureBookingsTable();
      const db = getDb();
      const [rows] = await db.query('SELECT * FROM bookings ORDER BY created_at DESC');
      if (wpWarning) res.setHeader('X-Data-Source-Warning', wpWarning);
      return res.status(200).json(rows);
    } catch (mysqlErr) {
      const mysqlWarning = mysqlErr instanceof Error ? mysqlErr.message : 'MySQL fallback failed';
      if (wpWarning) res.setHeader('X-Data-Source-Warning', wpWarning);
      res.setHeader('X-MySQL-Warning', mysqlWarning);
      return res.status(200).json([]);
    }
  }

  if (req.method === 'PATCH') {
    const id = req.query?.id;
    if (!id) return res.status(400).json({ error: 'Missing booking id' });

    const body = parseBody(req);
    const allowed = [
      'status',
      'internal_notes',
      'bank_transfer_details',
      'name',
      'email',
      'phone',
      'course_title',
      'item_title',
      'preferred_date',
      'total_amount',
      'deposit_amount',
      'due_amount',
    ];

    const updates = {};
    for (const key of allowed) {
      if (Object.prototype.hasOwnProperty.call(body, key)) updates[key] = body[key];
    }
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    const { wpUrl, wpApiKey, enabled } = getWpConfig();
    let wpWarning = null;

    if (enabled) {
      try {
        let wpId = Number.parseInt(String(id), 10);
        if (!wpId) {
          await ensureBookingsTable();
          const db = getDb();
          const [rows] = await db.query('SELECT wp_booking_id FROM bookings WHERE id = ? LIMIT 1', [id]);
          wpId = rows?.[0]?.wp_booking_id || 0;
        }

        if (wpId) {
          const wpRes = await fetch(`${wpUrl}/wp-json/ktd/v1/bookings/${wpId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'x-ktd-api-key': wpApiKey,
            },
            body: JSON.stringify(updates),
          });
          if (!wpRes.ok) {
            const wpJson = await wpRes.json().catch(() => ({}));
            wpWarning = wpJson?.message || `WordPress update failed (${wpRes.status})`;
          }
        }
      } catch (err) {
        wpWarning = err instanceof Error ? err.message : 'WordPress update failed';
      }
    }

    try {
      await ensureBookingsTable();
      const db = getDb();
      const sets = Object.keys(updates).map((k) => `\`${k}\` = ?`).join(', ');
      await db.query(`UPDATE bookings SET ${sets} WHERE id = ?`, [...Object.values(updates), id]);
      const [rows] = await db.query('SELECT * FROM bookings WHERE id = ? LIMIT 1', [id]);
      const updated = rows?.[0] || { id, ...updates };
      if ('status' in updates) await sendBookingStatusEmail(updated).catch(() => {});
      if (wpWarning) res.setHeader('X-Data-Source-Warning', wpWarning);
      return res.status(200).json(updated);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'MySQL update failed';
      return res.status(500).json({ error: message, ...(wpWarning ? { wp_warning: wpWarning } : {}) });
    }
  }

  if (req.method === 'DELETE') {
    const id = req.query?.id;
    if (!id) return res.status(400).json({ error: 'Missing booking id' });

    const { wpUrl, wpApiKey, enabled } = getWpConfig();
    let wpWarning = null;

    if (enabled) {
      try {
        let wpId = Number.parseInt(String(id), 10);
        if (!wpId) {
          await ensureBookingsTable();
          const db = getDb();
          const [rows] = await db.query('SELECT wp_booking_id FROM bookings WHERE id = ? LIMIT 1', [id]);
          wpId = rows?.[0]?.wp_booking_id || 0;
        }

        if (wpId) {
          const wpRes = await fetch(`${wpUrl}/wp-json/ktd/v1/bookings/${wpId}`, {
            method: 'DELETE',
            headers: { 'x-ktd-api-key': wpApiKey },
          });
          if (!wpRes.ok) {
            const wpJson = await wpRes.json().catch(() => ({}));
            wpWarning = wpJson?.message || `WordPress delete failed (${wpRes.status})`;
          }
        }
      } catch (err) {
        wpWarning = err instanceof Error ? err.message : 'WordPress delete failed';
      }
    }

    try {
      await ensureBookingsTable();
      const db = getDb();
      await db.query('DELETE FROM bookings WHERE id = ?', [id]);
      if (wpWarning) res.setHeader('X-Data-Source-Warning', wpWarning);
      return res.status(200).json({ ok: true, deleted: id });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'MySQL delete failed';
      return res.status(500).json({ error: message, ...(wpWarning ? { wp_warning: wpWarning } : {}) });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
