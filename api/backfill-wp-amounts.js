/**
 * POST /api/backfill-wp-amounts
 *
 * Reads all Supabase bookings that have amount data, then syncs those
 * amounts to matching WordPress rows (matched by email + name).
 *
 * Also handles WP rows that have total_amount but are missing deposit/due
 * by computing them server-side (deposit = 20% of total, due = total - deposit).
 *
 * Protected by X-Admin-Key header (must match ADMIN_BACKFILL_KEY env var,
 * or WP_BOOKING_API_KEY as fallback).
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

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  // Auth
  const adminKey = (process.env.ADMIN_BACKFILL_KEY || process.env.WP_BOOKING_API_KEY || '').trim();
  const provided = (req.headers['x-admin-key'] || '').trim();
  if (!adminKey || provided !== adminKey) {
    return res.status(401).json({ error: 'Unauthorized. Send X-Admin-Key header.' });
  }

  const wpUrl = (process.env.WP_BOOKING_URL || '').trim().replace(/\/$/, '');
  const wpApiKey = (process.env.WP_BOOKING_API_KEY || '').trim();
  if (!wpUrl) return res.status(500).json({ error: 'WP_BOOKING_URL not configured' });

  try {
    // 1. Get all WP bookings
    const wpRes = await fetch(`${wpUrl}/wp-json/ktd/v1/bookings?per_page=500`, {
      headers: { 'x-ktd-api-key': wpApiKey },
    });
    if (!wpRes.ok) throw new Error(`WP list failed: ${wpRes.status}`);
    const wpData = await wpRes.json();
    const wpBookings = Array.isArray(wpData) ? wpData : (wpData.bookings || []);

    // 2. Filter WP rows that need amounts filled
    const needsFill = wpBookings.filter(b => {
      const total = parseNum(b.total_amount);
      const deposit = parseNum(b.deposit_amount);
      const due = parseNum(b.due_amount);
      return total == null || deposit == null || due == null;
    });

    if (needsFill.length === 0) {
      return res.status(200).json({ ok: true, message: 'No rows need updating', total_wp: wpBookings.length });
    }

    // 3. Try to enrich from Supabase (match by email)
    const emails = [...new Set(needsFill.map(b => b.email).filter(Boolean))];
    const supabase = getSupabase();
    const { data: sbRows } = await supabase
      .from('bookings')
      .select('email, name, total_amount, deposit_amount, due_amount')
      .in('email', emails);

    // Build email → amounts map (first row with amounts wins)
    const sbAmountMap = {};
    for (const row of (sbRows || [])) {
      const email = row.email?.toLowerCase();
      if (!email) continue;
      if (sbAmountMap[email]) continue; // already have one
      const filled = fillAmounts(row);
      if (filled.total_amount != null || filled.deposit_amount != null) {
        sbAmountMap[email] = filled;
      }
    }

    // 4. Build bulk update payload
    const updates = [];
    for (const wpRow of needsFill) {
      const email = wpRow.email?.toLowerCase();
      let amounts = sbAmountMap[email] || null;

      // If no Supabase data, try computing from whatever WP already has
      if (!amounts) {
        const filled = fillAmounts(wpRow);
        if (filled.total_amount != null || filled.deposit_amount != null) {
          amounts = filled;
        }
      }

      if (!amounts) continue; // truly nothing to fill

      // Only include fields that are currently null in WP
      const update = { id: wpRow.id };
      if (parseNum(wpRow.total_amount) == null && amounts.total_amount != null) update.total_amount = amounts.total_amount;
      if (parseNum(wpRow.deposit_amount) == null && amounts.deposit_amount != null) update.deposit_amount = amounts.deposit_amount;
      if (parseNum(wpRow.due_amount) == null && amounts.due_amount != null) update.due_amount = amounts.due_amount;

      if (Object.keys(update).length > 1) updates.push(update);
    }

    if (updates.length === 0) {
      return res.status(200).json({
        ok: true,
        message: 'Could not determine amounts for any row (no source data). Enter amounts manually in the WP admin.',
        needs_manual: needsFill.length,
      });
    }

    // 5. Bulk update WordPress
    const bulkRes = await fetch(`${wpUrl}/wp-json/ktd/v1/bookings/bulk-update-amounts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-ktd-api-key': wpApiKey,
      },
      body: JSON.stringify({ bookings: updates }),
    });
    const bulkResult = await bulkRes.json();

    return res.status(200).json({
      ok: true,
      wp_rows_checked: wpBookings.length,
      rows_needing_fill: needsFill.length,
      rows_with_data: updates.length,
      rows_without_data: needsFill.length - updates.length,
      wp_update_result: bulkResult,
    });
  } catch (err) {
    console.error('backfill-wp-amounts error', err);
    return res.status(500).json({ error: err.message });
  }
}
