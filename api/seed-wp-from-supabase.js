/**
 * POST /api/seed-wp-from-supabase
 *
 * Reads all bookings from Supabase and creates them in WordPress
 * (skips emails that already exist in WordPress).
 *
 * Protected by X-Admin-Key header (WP_BOOKING_API_KEY).
 *
 * Optional body params (JSON):
 *   { "limit": 100, "offset": 0, "dry_run": true }
 */

import { createClient } from '@supabase/supabase-js';

export const config = { runtime: 'nodejs' };

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('Missing Supabase env vars');
  return createClient(url, key);
}

function parseNum(v) {
  if (v == null || v === '') return null;
  const n = Number(String(v).replace(/[^0-9.-]/g, ''));
  return Number.isFinite(n) ? n : null;
}

function fillAmounts(row) {
  let total = parseNum(row.total_amount);
  let deposit = parseNum(row.deposit_amount);
  let due = parseNum(row.due_amount);
  if (deposit == null && total != null && total > 0) deposit = Math.round(total * 0.2);
  if (due == null && total != null && deposit != null) due = Math.max(total - deposit, 0);
  if (total == null && deposit != null) { total = deposit; if (due == null) due = 0; }
  return { total_amount: total, deposit_amount: deposit, due_amount: due };
}

function toWpPayload(row) {
  const amounts = fillAmounts(row);
  return {
    name: row.name || '',
    email: row.email || '',
    phone: row.phone || '',
    accommodation: row.accommodation || '',
    preferred_date: row.preferred_date || '',
    experience_level: row.experience_level || '',
    payment_choice: row.payment_choice || '',
    deposit_amount: amounts.deposit_amount,
    total_amount: amounts.total_amount,
    due_amount: amounts.due_amount,
    message: row.message || '',
    internal_notes: row.internal_notes || row.message || '',
    status: row.status || 'new',
    booking_type: row.booking_type || row.item_type || 'course',
    item_title: row.course_title || row.item_title || '',
    course_title: row.course_title || row.item_title || '',
    course: row.course_title || row.item_title || '',
    booking_source: 'supabase-seed',
  };
}

function parseBody(req) {
  if (!req || req.body == null) return {};
  if (typeof req.body === 'string') { try { return JSON.parse(req.body); } catch { return {}; } }
  return req.body;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const adminKey = (process.env.ADMIN_BACKFILL_KEY || process.env.WP_BOOKING_API_KEY || '').trim();
  const provided = (req.headers['x-admin-key'] || '').trim();
  if (!adminKey || provided !== adminKey) {
    return res.status(401).json({ error: 'Unauthorized. Send X-Admin-Key header.' });
  }

  const wpUrl = (process.env.WP_BOOKING_URL || '').trim().replace(/\/$/, '');
  const wpApiKey = (process.env.WP_BOOKING_API_KEY || '').trim();
  if (!wpUrl) return res.status(500).json({ error: 'WP_BOOKING_URL not configured' });

  const body = parseBody(req);
  const limit = Math.min(parseInt(body.limit) || 500, 500);
  const offset = parseInt(body.offset) || 0;
  const dryRun = body.dry_run === true || body.dry_run === 'true';

  try {
    // 1. Fetch Supabase bookings
    const supabase = getSupabase();
    const { data: sbRows, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) throw new Error('Supabase error: ' + error.message);
    if (!sbRows || sbRows.length === 0) {
      return res.status(200).json({ ok: true, message: 'No Supabase bookings found', total: 0 });
    }

    // 2. Fetch existing WP bookings to detect duplicates by email+date+course
    const wpListRes = await fetch(`${wpUrl}/wp-json/ktd/v1/bookings?per_page=500`, {
      headers: { 'x-ktd-api-key': wpApiKey },
    });
    let existingKeys = new Set();
    if (wpListRes.ok) {
      const wpData = await wpListRes.json();
      const wpBookings = Array.isArray(wpData) ? wpData : (wpData.bookings || []);
      // Dedup key: email + preferred_date + course_title (allows same person, different bookings)
      for (const b of wpBookings) {
        const key = [
          (b.email || '').toLowerCase().trim(),
          (b.preferred_date || '').trim(),
          (b.item_title || b.course_title || b.course || '').trim(),
        ].join('|');
        existingKeys.add(key);
      }
    }

    function dedupKey(row) {
      return [
        (row.email || '').toLowerCase().trim(),
        (row.preferred_date || '').trim(),
        (row.course_title || row.item_title || '').trim(),
      ].join('|');
    }

    if (dryRun) {
      const toCreate = sbRows.filter(r => !existingKeys.has(dedupKey(r)));
      return res.status(200).json({
        ok: true,
        dry_run: true,
        supabase_total: sbRows.length,
        already_in_wp: sbRows.length - toCreate.length,
        would_create: toCreate.length,
        sample: toCreate.slice(0, 5).map(r => ({ email: r.email, name: r.name, status: r.status, course: r.course_title, date: r.preferred_date })),
      });
    }

    // 3. Create each missing booking in WP
    let created = 0;
    let skipped = 0;
    let failed = [];

    for (const row of sbRows) {
      const key = dedupKey(row);
      if (existingKeys.has(key)) { skipped++; continue; }

      const wpPayload = toWpPayload(row);
      try {
        const createRes = await fetch(`${wpUrl}/wp-json/ktd/v1/bookings/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-ktd-api-key': wpApiKey },
          body: JSON.stringify(wpPayload),
        });
        if (createRes.ok) {
          created++;
          existingKeys.add(key); // prevent dupes within same run
        } else {
          const txt = await createRes.text();
          failed.push({ email: row.email, status: createRes.status, response: txt.slice(0, 200) });
        }
      } catch (e) {
        failed.push({ email: row.email, error: e.message });
      }
    }

    return res.status(200).json({
      ok: true,
      supabase_total: sbRows.length,
      created,
      skipped,
      failed_count: failed.length,
      failed: failed.slice(0, 10),
      note: sbRows.length === limit ? `More rows may exist — re-run with offset=${offset + limit}` : 'All rows processed',
    });
  } catch (err) {
    console.error('seed-wp-from-supabase error', err);
    return res.status(500).json({ error: err.message });
  }
}
