// api/admin-bookings.js
// Server-side handler: manages bookings via WordPress (primary) and MySQL (fallback).
// GET  /api/admin-bookings          → list all bookings
// PATCH /api/admin-bookings?id=xxx  → update booking fields

import { getDb, ensureBookingsTable } from './_lib/mysql.js';
import { sendBookingStatusEmail } from './send-booking-notification.js';

function getAllowedAdminEmails() {
  const raw = (process.env.ADMIN_EMAILS || process.env.VITE_ADMIN_EMAILS || '').trim();
  return raw
    .split(',')
    .map((email) => String(email || '').trim().toLowerCase())
    .filter(Boolean);
}

async function ensureAdmin(req) {
  const viewToken = process.env.ADMIN_BOOKINGS_VIEW_TOKEN || process.env.ADMIN_VIEW_TOKEN;
  const suppliedViewToken = req.headers['x-admin-view-token'] || req.query?.view_token;
  if (viewToken && suppliedViewToken && String(suppliedViewToken) === String(viewToken)) {
    return { ok: true, mode: 'view-token' };
  }

  const staticToken = process.env.ADMIN_LOGIN_TOKEN || process.env.ADMIN_API_TOKEN || process.env.ADMIN_BOOKINGS_VIEW_TOKEN;
  const suppliedAdminToken = req.headers['x-admin-login-token'];

  if (staticToken && suppliedAdminToken && String(suppliedAdminToken) === String(staticToken)) {
    return { ok: true, mode: 'static-token' };
  }

  return { ok: false, status: 401, error: 'Missing or invalid admin credentials' };
}

export default async function handler(req, res) {
  // CORS for local dev
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-login-token, x-admin-view-token');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const adminCheck = await ensureAdmin(req);
  if (!adminCheck.ok) {
    return res.status(adminCheck.status || 401).json({ error: adminCheck.error || 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const wpUrl = (process.env.WP_BOOKING_URL || '').trim().replace(/\/$/, '');
    const wpApiKey = (process.env.WP_BOOKING_API_KEY || '').trim();
    let wpWarning = null;

    if (wpUrl && wpApiKey) {
      // Proxy from WordPress REST API
      let wpRes, wpJson;
      try {
        const sep = wpUrl.includes('?') ? '&' : '?';
        const endpoint = `${wpUrl}/wp-json/ktd/v1/bookings${sep}nocache=${Date.now()}`;
        wpRes = await fetch(endpoint, {
          cache: 'no-store',
          headers: {
            'x-ktd-api-key': wpApiKey,
            'cache-control': 'no-cache',
          },
        });
        wpJson = await wpRes.json();
      } catch (err) {
        wpWarning = 'Failed to reach WordPress: ' + err.message;
      }
      if (wpRes && !wpRes.ok) {
        wpWarning = wpJson?.message || 'WordPress API error';
      }
      if (wpRes && wpRes.ok) {
        const rowsRaw = Array.isArray(wpJson?.data) ? wpJson.data : (Array.isArray(wpJson) ? wpJson : []);
        const rows = rowsRaw.map((row) => ({
          ...row,
          internal_notes: row?.internal_notes || row?.message || '',
          message: row?.message || row?.internal_notes || '',
        }));
        return res.status(200).json(rows);
      }
    }

    // Fallback: MySQL
    await ensureBookingsTable();
    const db = getDb();
    const [rows] = await db.query(`SELECT * FROM bookings ORDER BY created_at DESC`);
    return res.status(200).json(rows);
  }

      if (wpWarning) {
        res.setHeader('X-Data-Source-Warning', wpWarning);
      }
      return res.status(200).json(rows);
    const id = req.query?.id;
    if (!id) return res.status(400).json({ error: 'Missing booking id' });

    const body = req.body || {};
    // Whitelist updatable fields
    const allowed = ['status', 'internal_notes', 'bank_transfer_details', 'name', 'email', 'phone', 'course_title', 'item_title', 'preferred_date', 'total_amount', 'deposit_amount', 'due_amount'];
    const updates = {};
    for (const key of allowed) {
          try {
            await ensureBookingsTable();
            const db = getDb();
            const [rows] = await db.query(`SELECT * FROM bookings ORDER BY created_at DESC`);
            if (wpWarning) {
              res.setHeader('X-Data-Source-Warning', wpWarning);
            }
            return res.status(200).json(rows);
          } catch (mysqlErr) {
            const mysqlMessage = mysqlErr instanceof Error ? mysqlErr.message : 'MySQL fallback failed';
            res.setHeader('X-Data-Source-Warning', wpWarning || 'WordPress unavailable');
            res.setHeader('X-MySQL-Warning', mysqlMessage);
            return res.status(200).json([]);
          }
    }

    const wpUrl = (process.env.WP_BOOKING_URL || '').trim().replace(/\/$/, '');
    const wpApiKey = (process.env.WP_BOOKING_API_KEY || '').trim();

    if (wpUrl && wpApiKey) {
      // Proxy to WordPress — id may be numeric WP id or Supabase UUID
      // Try numeric first; if non-numeric, look up WP id from Supabase
      let wpId = parseInt(id, 10);
      if (!wpId) {
        // id is not a numeric WP id — look up wp_booking_id from MySQL
        await ensureBookingsTable();
        const db = getDb();
        const [rows] = await db.query(`SELECT wp_booking_id FROM bookings WHERE id = ? LIMIT 1`, [id]);
        wpId = rows[0]?.wp_booking_id || 0;
      }

      if (wpId) {
        let wpRes, wpJson;
        try {
          wpRes = await fetch(`${wpUrl}/wp-json/ktd/v1/bookings/${wpId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'x-ktd-api-key': wpApiKey },
            body: JSON.stringify(updates),
          });
          wpJson = await wpRes.json().catch(() => ({}));
        } catch (err) {
          return res.status(502).json({ error: 'Failed to reach WordPress: ' + err.message });
        }
        if (!wpRes.ok) {
          return res.status(wpRes.status).json({ error: wpJson?.message || 'WordPress update failed' });
        }
        // Sync to MySQL (best-effort)
        try {
          await ensureBookingsTable();
          const db = getDb();
          const sets = Object.keys(updates).map((k) => `\`${k}\` = ?`).join(', ');
          await db.query(`UPDATE bookings SET ${sets} WHERE id = ?`, [...Object.values(updates), id]);
        } catch {}
        if ('status' in updates) {
          await sendBookingStatusEmail({ ...(wpJson?.booking || {}), id }).catch(() => {});
        }
        return res.status(200).json(wpJson?.booking || { id, ...updates });
      }
      // No WP id found — fall through to MySQL-only update
    }

    await ensureBookingsTable();
    const db = getDb();
    const sets = Object.keys(updates).map((k) => `\`${k}\` = ?`).join(', ');
    await db.query(`UPDATE bookings SET ${sets} WHERE id = ?`, [...Object.values(updates), id]);
    const [rows] = await db.query(`SELECT * FROM bookings WHERE id = ? LIMIT 1`, [id]);
    const updated = rows[0] || { id, ...updates };

    if ('status' in updates) {
      await sendBookingStatusEmail(updated).catch(() => {});
    }

    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    const id = req.query?.id;
    if (!id) return res.status(400).json({ error: 'Missing booking id' });

    const wpUrl = (process.env.WP_BOOKING_URL || '').trim().replace(/\/$/, '');
    const wpApiKey = (process.env.WP_BOOKING_API_KEY || '').trim();

    if (wpUrl && wpApiKey) {
      let wpId = parseInt(id, 10);
      if (!wpId) {
        await ensureBookingsTable();
        const db = getDb();
        const [rows] = await db.query(`SELECT wp_booking_id FROM bookings WHERE id = ? LIMIT 1`, [id]);
        wpId = rows[0]?.wp_booking_id || 0;
      }
      if (wpId) {
        try {
          const wpRes = await fetch(`${wpUrl}/wp-json/ktd/v1/bookings/${wpId}`, {
            method: 'DELETE',
            headers: { 'x-ktd-api-key': wpApiKey },
          });
          if (!wpRes.ok) {
            const wpJson = await wpRes.json().catch(() => ({}));
            return res.status(wpRes.status).json({ error: wpJson?.message || 'WordPress delete failed' });
          }
        } catch (err) {
          return res.status(502).json({ error: 'Failed to reach WordPress: ' + err.message });
        }
      }
    }

    // Always also delete from MySQL
    await ensureBookingsTable();
    const db = getDb();
    await db.query(`DELETE FROM bookings WHERE id = ?`, [id]);
    return res.status(200).json({ ok: true, deleted: id });
  }

  res.status(405).json({ error: 'Method not allowed' });
}

