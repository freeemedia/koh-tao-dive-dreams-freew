import { createClient } from '@supabase/supabase-js';

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars');
  }
  return createClient(url, key);
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

function normalizeBookingPayload(input, { includeId = false } = {}) {
  const src = input || {};
  const out = {};

  if (includeId && src.id) out.id = src.id;
  if (src.name != null) out.name = src.name;
  if (src.email != null) out.email = src.email;
  if (src.phone != null) out.phone = src.phone;
  if (src.course_title != null) out.course_title = src.course_title;
  else if (src.item_title != null) out.course_title = src.item_title;
  if (src.preferred_date != null) out.preferred_date = src.preferred_date;
  if (src.experience_level != null) out.experience_level = src.experience_level;
  if (src.payment_choice != null) out.payment_choice = src.payment_choice;
  if (src.message != null) out.message = src.message;
  if (src.status != null) out.status = src.status;
  if (src.internal_notes != null) out.internal_notes = src.internal_notes;
  if (src.bank_transfer_details != null) out.bank_transfer_details = src.bank_transfer_details;

  return out;
}

async function mirrorBookingToWordPress(payload) {
  const wpUrl = (process.env.WP_BOOKING_URL || '').trim().replace(/\/$/, '');
  const wpApiKey = (process.env.WP_BOOKING_API_KEY || '').trim();
  if (!wpUrl || !wpApiKey) return;

  const wpPayload = {
    name: payload.name || '',
    email: payload.email || '',
    phone: payload.phone || '',
    preferred_date: payload.preferred_date || '',
    experience_level: payload.experience_level || '',
    payment_choice: payload.payment_choice || '',
    message: payload.message || '',
    status: payload.status || 'new',
    booking_type: payload.booking_type || payload.item_type || 'course',
    item_title: payload.course_title || payload.item_title || '',
    booking_source: 'vercel-app',
  };

  await fetch(`${wpUrl}/wp-json/ktd/v1/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-ktd-api-key': wpApiKey,
    },
    body: JSON.stringify(wpPayload),
  });
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const supabase = getSupabaseAdmin();

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ bookings: data || [] });
  }

  if (req.method === 'POST') {
    const body = parseBody(req);
    const { id, ...rest } = body || {};

    if (!id) {
      const generatedId = (globalThis.crypto && typeof globalThis.crypto.randomUUID === 'function')
        ? globalThis.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      const payload = normalizeBookingPayload({ id: generatedId, ...rest }, { includeId: true });

      const { data, error } = await supabase
        .from('bookings')
        .insert(payload)
        .select();

      if (error) return res.status(500).json({ error: error.message });
      // Best effort mirror for WordPress-backed admin.
      await mirrorBookingToWordPress(payload).catch(() => {});
      return res.status(201).json(Array.isArray(data) ? data[0] : data);
    }

    if (Object.keys(rest).length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    const updates = normalizeBookingPayload(rest);
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(Array.isArray(data) ? data[0] : data);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
