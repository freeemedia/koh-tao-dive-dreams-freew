import { createClient } from '@supabase/supabase-js';
import { sendBookingNotificationEmail } from './send-booking-notification.js';

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error('Missing Supabase env vars. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or fallback keys).');
  }
  return createClient(url, key);
}

function tryGetSupabaseAdmin() {
  try {
    return getSupabaseAdmin();
  } catch {
    return null;
  }
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

function parseAmount(value) {
  if (value == null || value === '') return null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  const normalized = String(value).replace(/[^0-9.-]/g, '');
  if (!normalized) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeAmounts(input, out) {
  const src = input || {};

  const totalCandidates = [
    src.total_amount,
    src.totalAmount,
    src.full_price,
    src.price,
    src.subtotal_amount,
  ];
  const depositCandidates = [
    src.deposit_amount,
    src.depositAmount,
    src.total_payable_now,
    src.payable_now,
  ];
  const dueCandidates = [
    src.due_amount,
    src.balance_amount,
    src.balance,
  ];

  let total = totalCandidates.map(parseAmount).find((v) => v != null) ?? null;
  let deposit = depositCandidates.map(parseAmount).find((v) => v != null) ?? null;
  let due = dueCandidates.map(parseAmount).find((v) => v != null) ?? null;

  if (deposit == null && total != null && total > 0) {
    deposit = Math.round(total * 0.2);
  }

  if (due == null && total != null && deposit != null) {
    due = Math.max(total - deposit, 0);
  }

  if (total == null && deposit != null) {
    total = deposit;
    if (due == null) due = 0;
  }

  if (total != null) out.total_amount = total;
  if (deposit != null) out.deposit_amount = deposit;
  if (due != null) out.due_amount = due;
}

function normalizeBookingPayload(input, { includeId = false } = {}) {
  const src = input || {};
  const out = {};

  if (includeId && src.id) out.id = src.id;
  if (src.name != null) out.name = src.name;
  if (src.email != null) out.email = src.email;
  if (src.phone != null) out.phone = src.phone;
  if (src.accommodation != null) out.accommodation = src.accommodation;
  else if (src.accommodation_type != null) out.accommodation = src.accommodation_type;
  else if (src.accommodationType != null) out.accommodation = src.accommodationType;
  if (src.course_title != null) out.course_title = src.course_title;
  else if (src.item_title != null) out.course_title = src.item_title;
  if (src.preferred_date != null) out.preferred_date = src.preferred_date;
  else if (src.arrival_date != null) out.preferred_date = src.arrival_date;
  else if (src.arrivalDate != null) out.preferred_date = src.arrivalDate;
  if (src.experience_level != null) out.experience_level = src.experience_level;
  else if (src.diving_experience != null) out.experience_level = src.diving_experience;
  else if (src.divingExperience != null) out.experience_level = src.divingExperience;
  if (src.payment_choice != null) out.payment_choice = src.payment_choice;
  if (src.message != null) out.message = src.message;
  else if (src.comments != null) out.message = src.comments;
  else if (src.questions != null) out.message = src.questions;
  if (src.status != null) out.status = src.status;
  if (src.internal_notes != null) out.internal_notes = src.internal_notes;
  // Keep admin notes populated for forms that only send `message`.
  if (out.internal_notes == null && src.message != null) out.internal_notes = src.message;
  if (out.internal_notes == null && src.comments != null) out.internal_notes = src.comments;
  if (src.bank_transfer_details != null) out.bank_transfer_details = src.bank_transfer_details;

  normalizeAmounts(src, out);

  return out;
}

// Map normalized payload to actual Supabase column names
function toSupabasePayload(payload) {
  const {
    total_amount,
    deposit_amount,
    due_amount,
    booking_type,
    item_title,
    accommodation,
    booking_source,
    currency,
    guests,
    nights,
    paypal_link,
    raw_payload,
    nationality,
    ...rest
  } = payload;

  const out = { ...rest };
  // Map to Supabase column names
  if (deposit_amount != null) out.total_payable_now = deposit_amount;
  if (total_amount != null) out.subtotal_amount = total_amount;
  // item_title maps to course_title if not already set
  if (item_title != null && out.course_title == null) out.course_title = item_title;
  // item_type from booking_type
  if (booking_type != null) out.item_type = booking_type;
  return out;
}

async function mirrorBookingToWordPress(payload) {
  const canonicalWpUrl = 'https://lightsalmon-dinosaur-377714.hostingersite.com';
  let wpUrl = (process.env.WP_BOOKING_URL || '').trim().replace(/\/$/, '');
  if (!wpUrl || /admin\.divinginasia\.com$/i.test(wpUrl)) {
    wpUrl = canonicalWpUrl;
  }
  const wpApiKey = (process.env.WP_BOOKING_API_KEY || '').trim();
  if (!wpApiKey) {
    return { ok: false, skipped: true, reason: 'WP_BOOKING_API_KEY missing' };
  }

  const wpPayload = {
    name: payload.name || '',
    email: payload.email || '',
    phone: payload.phone || '',
    accommodation: payload.accommodation || '',
    preferred_date: payload.preferred_date || '',
    experience_level: payload.experience_level || '',
    payment_choice: payload.payment_choice || '',
    deposit_amount: payload.deposit_amount ?? null,
    total_amount: payload.total_amount ?? null,
    due_amount: payload.due_amount ?? null,
    message: payload.message || '',
    internal_notes: payload.internal_notes || payload.message || '',
    status: payload.status || 'new',
    booking_type: payload.booking_type || payload.item_type || 'course',
    item_title: payload.course_title || payload.item_title || '',
    course_title: payload.course_title || payload.item_title || '',
    course: payload.course_title || payload.item_title || '',
    booking_source: 'vercel-app',
  };

  const baseHeaders = { 'Content-Type': 'application/json' };
  const headerOptions = [
    { ...baseHeaders, 'x-ktd-api-key': wpApiKey },
  ];
  const endpointOptions = [
    `${wpUrl}/wp-json/ktd/v1/bookings/create`,
    `${wpUrl}/wp-json/ktd/v1/bookings`,
  ];

  const attempts = [];
  for (const endpoint of endpointOptions) {
    for (const headers of headerOptions) {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(wpPayload),
      });
      const text = await res.text();
      let parsed = null;
      try {
        parsed = text ? JSON.parse(text) : null;
      } catch {
        parsed = null;
      }

      const mirrorId = parsed && typeof parsed === 'object'
        ? (parsed.id || parsed.booking_id || (parsed.data && parsed.data.id))
        : null;
      if (res.ok && mirrorId != null) {
        return {
          ok: true,
          endpoint,
          status: res.status,
          id: mirrorId,
        };
      }

      attempts.push({
        endpoint,
        status: res.status,
        body: (parsed && (parsed.message || parsed.code)) || text || 'unknown response',
      });
    }
  }

  const details = attempts
    .map((a) => `${a.endpoint} -> ${a.status} ${a.body}`)
    .join(' | ');
  throw new Error(`WordPress mirror failed: ${details}`);
}

async function fetchBookingsFromWordPress() {
  const canonicalWpUrl = 'https://lightsalmon-dinosaur-377714.hostingersite.com';
  let wpUrl = (process.env.WP_BOOKING_URL || '').trim().replace(/\/$/, '');
  if (!wpUrl || /admin\.divinginasia\.com$/i.test(wpUrl)) {
    wpUrl = canonicalWpUrl;
  }

  const wpApiKey = (process.env.WP_BOOKING_API_KEY || '').trim();
  if (!wpUrl || !wpApiKey) return null;

  const endpoint = `${wpUrl}/wp-json/ktd/v1/bookings?nocache=${Date.now()}`;
  const response = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      'x-ktd-api-key': wpApiKey,
      'cache-control': 'no-cache',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`WordPress GET failed (${response.status}): ${text || 'unknown error'}`);
  }

  const json = await response.json().catch(() => null);
  const rowsRaw = Array.isArray(json?.data) ? json.data : (Array.isArray(json) ? json : []);

  const rows = rowsRaw.map((row) => ({
    ...row,
    internal_notes: row?.internal_notes || row?.message || '',
    message: row?.message || row?.internal_notes || '',
  }));

  return rows;
}

export default async function handler(req, res) {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    if (req.method === 'GET') {
      // WordPress is primary when configured (matches migrated WP tables).
      try {
        const wpRows = await fetchBookingsFromWordPress();
        if (wpRows) {
          return res.status(200).json({ bookings: wpRows, source: 'wordpress' });
        }
      } catch (wpError) {
        console.warn('WordPress bookings fetch failed, falling back to Supabase:', wpError);
      }

      const supabase = tryGetSupabaseAdmin();
      if (!supabase) {
        return res.status(500).json({ error: 'WordPress fetch failed and Supabase is not configured.' });
      }

      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ bookings: data || [], source: 'supabase' });
    }

    if (req.method === 'POST') {
      const body = parseBody(req);
      const { id, ...rest } = body || {};

      if (!id) {
        const generatedId = (globalThis.crypto && typeof globalThis.crypto.randomUUID === 'function')
          ? globalThis.crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        const payload = normalizeBookingPayload({ id: generatedId, ...rest }, { includeId: true });

        // WordPress is the source of truth: creation must succeed here first.
        let wpMirrorResult = null;
        try {
          wpMirrorResult = await mirrorBookingToWordPress(payload);
          if (wpMirrorResult && wpMirrorResult.ok === false) {
            return res.status(502).json({ error: `WordPress booking create skipped: ${wpMirrorResult.reason || 'unknown reason'}` });
          }
        } catch (err) {
          const message = err instanceof Error ? err.message : 'WordPress booking create failed';
          return res.status(502).json({ error: message });
        }

        let supabaseWriteWarning = null;
        let created = null;
        const supabase = tryGetSupabaseAdmin();
        if (supabase) {
          const supabasePayload = toSupabasePayload(payload);
          const { data, error } = await supabase
            .from('bookings')
            .insert(supabasePayload)
            .select();

          if (error) {
            supabaseWriteWarning = error.message;
          } else {
            created = Array.isArray(data) ? data[0] : data;
          }
        } else {
          supabaseWriteWarning = 'Supabase not configured; skipped secondary write.';
        }

        // Best effort email notification for new bookings.
        await sendBookingNotificationEmail({
          ...payload,
          item_title: payload.course_title || payload.item_title,
        }).catch(() => {});

        const responsePayload = {
          ...(created || payload),
          wp_mirror_endpoint: wpMirrorResult?.endpoint || null,
          wp_mirror_id: wpMirrorResult?.id || null,
        };

        if (supabaseWriteWarning) {
          return res.status(201).json({
            ...responsePayload,
            supabase_warning: supabaseWriteWarning,
          });
        }

        return res.status(201).json(responsePayload);
      }

      if (Object.keys(rest).length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
      }

      const updates = normalizeBookingPayload(rest);
      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: 'No valid fields to update' });
      }

      const supabase = tryGetSupabaseAdmin();
      if (!supabase) {
        return res.status(500).json({ error: 'Supabase is not configured for updates.' });
      }

      const { data, error } = await supabase
        .from('bookings')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(Array.isArray(data) ? data[0] : data);
    }

    if (req.method === 'DELETE') {
      const id = req.query?.id || (parseBody(req) || {}).id;
      if (!id) return res.status(400).json({ error: 'Missing booking id' });

      const supabase = tryGetSupabaseAdmin();
      if (!supabase) {
        return res.status(500).json({ error: 'Supabase is not configured for deletes.' });
      }

      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ deleted: id });
    }

    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Unexpected server error' });
  }
}
