// api/admin-bookings.js
// Server-side handler: uses service role key to bypass RLS on bookings table.
// GET  /api/admin-bookings          → list all bookings
// PATCH /api/admin-bookings?id=xxx  → update booking fields

import { createClient } from '@supabase/supabase-js';
import { sendBookingStatusEmail } from './send-booking-notification.js';

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars');
  return createClient(url, key);
}

function getAllowedAdminEmails() {
  const raw = (process.env.ADMIN_EMAILS || process.env.VITE_ADMIN_EMAILS || '').trim();
  return raw
    .split(',')
    .map((email) => String(email || '').trim().toLowerCase())
    .filter(Boolean);
}

async function ensureAdmin(req, supabase) {
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

  const authHeader = req.headers.authorization || '';
  const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
  if (!bearerToken) {
    return { ok: false, status: 401, error: 'Missing admin credentials' };
  }

  const { data, error } = await supabase.auth.getUser(bearerToken);
  if (error || !data?.user) {
    return { ok: false, status: 401, error: 'Invalid admin session token' };
  }

  const user = data.user;
  const appRole = user.app_metadata?.app_role;
  const userRole = user.user_metadata?.app_role || user.user_metadata?.role;
  if (appRole === 'admin' || userRole === 'admin') {
    return { ok: true, mode: 'supabase-role' };
  }

  const allowedEmails = getAllowedAdminEmails();
  const normalizedEmail = String(user.email || '').trim().toLowerCase();
  if (allowedEmails.includes(normalizedEmail)) {
    return { ok: true, mode: 'allowlist' };
  }

  return { ok: false, status: 403, error: 'Admin access denied' };
}

export default async function handler(req, res) {
  // CORS for local dev
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-login-token, x-admin-view-token');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const supabase = getSupabaseAdmin();
  const adminCheck = await ensureAdmin(req, supabase);
  if (!adminCheck.ok) {
    return res.status(adminCheck.status || 401).json({ error: adminCheck.error || 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const wpUrl = (process.env.WP_BOOKING_URL || '').trim().replace(/\/$/, '');
    const wpApiKey = (process.env.WP_BOOKING_API_KEY || '').trim();

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
        return res.status(502).json({ error: 'Failed to reach WordPress: ' + err.message });
      }
      if (!wpRes.ok) {
        return res.status(wpRes.status).json({ error: wpJson?.message || 'WordPress API error' });
      }
      const rowsRaw = Array.isArray(wpJson?.data) ? wpJson.data : (Array.isArray(wpJson) ? wpJson : []);
      const rows = rowsRaw.map((row) => ({
        ...row,
        internal_notes: row?.internal_notes || row?.message || '',
        message: row?.message || row?.internal_notes || '',
      }));
      return res.status(200).json(rows);
    }

    // Fallback: Supabase
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === 'PATCH') {
    const id = req.query?.id;
    if (!id) return res.status(400).json({ error: 'Missing booking id' });

    const body = req.body || {};
    // Whitelist updatable fields
    const allowed = ['status', 'internal_notes', 'bank_transfer_details', 'name', 'email', 'phone', 'course_title', 'item_title', 'preferred_date', 'total_amount', 'deposit_amount', 'due_amount'];
    const updates = {};
    for (const key of allowed) {
      if (key in body) updates[key] = body[key];
    }
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    const wpUrl = (process.env.WP_BOOKING_URL || '').trim().replace(/\/$/, '');
    const wpApiKey = (process.env.WP_BOOKING_API_KEY || '').trim();

    if (wpUrl && wpApiKey) {
      // Proxy to WordPress — id may be numeric WP id or Supabase UUID
      // Try numeric first; if non-numeric, look up WP id from Supabase
      let wpId = parseInt(id, 10);
      if (!wpId) {
        // id is a Supabase UUID — look up the corresponding WP booking by supabase_id or find by matching
        const { data: sbRow } = await supabase.from('bookings').select('wp_booking_id').eq('id', id).single().catch(() => ({ data: null }));
        wpId = sbRow?.wp_booking_id || 0;
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
        // Also sync to Supabase (best-effort, don't fail if it errors)
        await supabase.from('bookings').update(updates).eq('id', id).catch(() => {});
        if ('status' in updates) {
          await sendBookingStatusEmail({ ...(wpJson?.booking || {}), id }).catch(() => {});
        }
        return res.status(200).json(wpJson?.booking || { id, ...updates });
      }
      // No WP id found — fall through to Supabase-only update
    }

    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });

    if ('status' in updates) {
      await sendBookingStatusEmail(data || {}).catch(() => {});
    }

    return res.status(200).json(data);
  }

  if (req.method === 'DELETE') {
    const id = req.query?.id;
    if (!id) return res.status(400).json({ error: 'Missing booking id' });

    const wpUrl = (process.env.WP_BOOKING_URL || '').trim().replace(/\/$/, '');
    const wpApiKey = (process.env.WP_BOOKING_API_KEY || '').trim();

    if (wpUrl && wpApiKey) {
      let wpId = parseInt(id, 10);
      if (!wpId) {
        const { data: sbRow } = await supabase.from('bookings').select('wp_booking_id').eq('id', id).single().catch(() => ({ data: null }));
        wpId = sbRow?.wp_booking_id || 0;
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

    // Always also delete from Supabase
    const { error } = await supabase.from('bookings').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ ok: true, deleted: id });
  }

  res.status(405).json({ error: 'Method not allowed' });
}

