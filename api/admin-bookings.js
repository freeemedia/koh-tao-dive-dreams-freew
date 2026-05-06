// api/admin-bookings.js
// MySQL/Supabase-backed admin handler.
// GET    /api/admin-bookings
// PATCH  /api/admin-bookings?id=123
// DELETE /api/admin-bookings?id=123

import { sendBookingStatusEmail } from './send-booking-notification.js';
import {
  getDbProvider,
  isSupabaseProvider,
  isMySqlProvider,
  listSupabaseBookings,
  updateSupabaseBookingById,
  deleteSupabaseBookingById,
} from './_lib/supabase-bookings.js';
import {
  listMySqlBookings,
  updateMySqlBookingById,
  deleteMySqlBookingById,
} from './_lib/mysql-bookings.js';

async function ensureAdmin(req) {
  const viewToken = process.env.ADMIN_BOOKINGS_VIEW_TOKEN || process.env.ADMIN_VIEW_TOKEN;
  const suppliedViewToken = req.headers['x-admin-view-token'] || req.query?.view_token;
  if (viewToken && suppliedViewToken && String(suppliedViewToken) === String(viewToken)) {
    return { ok: true, mode: 'view-token' };
  }

  const staticToken = process.env.ADMIN_BOOKINGS_VIEW_TOKEN || process.env.ADMIN_LOGIN_TOKEN || process.env.ADMIN_API_TOKEN;
  const suppliedAdminToken = req.headers['x-admin-login-token'];

  if (staticToken && suppliedAdminToken && String(suppliedAdminToken) === String(staticToken)) {
    return { ok: true, mode: 'static-token' };
  }

  return { ok: false, status: 401, error: `Missing admin credentials (got token: ${suppliedAdminToken ? 'yes' : 'no'}, expected: ${staticToken ? 'configured' : 'NOT configured'})` };
}

export default async function handler(req, res) {
  const dbProvider = getDbProvider();
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
    if (isSupabaseProvider()) {
      try {
        const rowsRaw = await listSupabaseBookings();
        const rows = rowsRaw.map((row) => ({
          ...row,
          internal_notes: row?.internal_notes || row?.message || '',
          message: row?.message || row?.internal_notes || '',
        }));
        return res.status(200).json(rows);
      } catch (supabaseError) {
        const message = supabaseError instanceof Error ? supabaseError.message : 'Supabase fetch failed';
        return res.status(502).json({ error: message, provider: dbProvider });
      }
    }

    if (isMySqlProvider()) {
      try {
        const rows = await listMySqlBookings();
        return res.status(200).json(rows);
      } catch (mysqlError) {
        const message = mysqlError instanceof Error ? mysqlError.message : 'MySQL fetch failed';
        return res.status(502).json({ error: message, provider: dbProvider });
      }
    }

    return res.status(500).json({ error: `Unsupported DB provider for admin bookings: ${dbProvider}` });
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

    if (isSupabaseProvider()) {
      try {
        const booking = await updateSupabaseBookingById(id, updates);
        if ('status' in updates) {
          await sendBookingStatusEmail(booking).catch(() => {});
        }
        return res.status(200).json(booking);
      } catch (supabaseError) {
        const message = supabaseError instanceof Error ? supabaseError.message : 'Supabase update failed';
        return res.status(502).json({ error: message, provider: dbProvider });
      }
    }

    if (isMySqlProvider()) {
      try {
        const booking = await updateMySqlBookingById(id, updates);
        if ('status' in updates) {
          await sendBookingStatusEmail(booking).catch(() => {});
        }
        return res.status(200).json(booking);
      } catch (mysqlError) {
        const message = mysqlError instanceof Error ? mysqlError.message : 'MySQL update failed';
        return res.status(502).json({ error: message, provider: dbProvider });
      }
    }

    return res.status(500).json({ error: `Unsupported DB provider for admin bookings: ${dbProvider}` });
  }

  if (req.method === 'DELETE') {
    const id = req.query?.id;
    if (!id) return res.status(400).json({ error: 'Missing booking id' });

    if (isSupabaseProvider()) {
      try {
        const result = await deleteSupabaseBookingById(id);
        return res.status(200).json({ ok: true, deleted: result.deleted });
      } catch (supabaseError) {
        const message = supabaseError instanceof Error ? supabaseError.message : 'Supabase delete failed';
        return res.status(502).json({ error: message, provider: dbProvider });
      }
    }

    if (isMySqlProvider()) {
      try {
        const result = await deleteMySqlBookingById(id);
        return res.status(200).json({ ok: true, deleted: result.deleted });
      } catch (mysqlError) {
        const message = mysqlError instanceof Error ? mysqlError.message : 'MySQL delete failed';
        return res.status(502).json({ error: message, provider: dbProvider });
      }
    }

    return res.status(500).json({ error: `Unsupported DB provider for admin bookings: ${dbProvider}` });
  }

  res.status(405).json({ error: 'Method not allowed' });
}

