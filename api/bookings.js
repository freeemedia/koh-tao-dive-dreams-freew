import { sendBookingNotificationEmail, sendCustomerInvoiceEmail } from './send-booking-notification.js';
import {
  getDbProvider,
  isSupabaseProvider,
  isMySqlProvider,
  isWordPressProvider,
  listSupabaseBookings,
  insertSupabaseBooking,
  updateSupabaseBookingById,
  deleteSupabaseBookingById,
} from './_lib/supabase-bookings.js';
import {
  listMySqlBookings,
  insertMySqlBooking,
  updateMySqlBookingById,
  deleteMySqlBookingById,
} from './_lib/mysql-bookings.js';
import {
  listWordPressBookings,
  insertWordPressBooking,
  updateWordPressBookingById,
  deleteWordPressBookingById,
} from './_lib/wordpress-bookings.js';

async function sendFluentBookingWebhook(payload) {
  const webhookUrl = String(process.env.FLUENT_BOOKING_WEBHOOK_URL || '').trim();
  if (!webhookUrl) return { skipped: true, reason: 'FLUENT_BOOKING_WEBHOOK_URL missing' };

  const webhookKey = String(process.env.FLUENT_BOOKING_WEBHOOK_KEY || '').trim();
  const headers = {
    'Content-Type': 'application/json',
  };

  if (webhookKey) {
    headers['x-fluent-webhook-key'] = webhookKey;
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      source: 'koh-tao-dive-dreams',
      event: 'booking.created',
      submitted_at: new Date().toISOString(),
      booking: payload,
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`Fluent webhook failed (${response.status}): ${text || 'unknown error'}`);
  }

  return { ok: true };
}

function getNotificationMode() {
  return String(process.env.NOTIFICATION_PROVIDER || '').trim().toLowerCase();
}

async function dispatchBookingNotifications(payload) {
  const mode = getNotificationMode();
  if (mode === 'fluent_only' || mode === 'fluent-only' || mode === 'fluent') {
    await sendFluentBookingWebhook(payload).catch(() => {});
    return;
  }

  await Promise.all([
    sendBookingNotificationEmail(payload).catch(() => {}),
    sendCustomerInvoiceEmail(payload).catch(() => {}),
    sendFluentBookingWebhook(payload).catch(() => {}),
  ]);
}

async function dispatchBookingNotificationsWithWarning(payload) {
  try {
    await dispatchBookingNotifications(payload);
    return null;
  } catch (error) {
    return error instanceof Error ? error.message : 'Booking saved, but notification delivery failed';
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

function cleanOptionalString(value) {
  if (value == null) return null;
  const normalized = String(value).trim();
  return normalized ? normalized : null;
}

function cleanOptionalDate(value) {
  const normalized = cleanOptionalString(value);
  if (!normalized) return null;
  return /^\d{4}-\d{2}-\d{2}$/.test(normalized) ? normalized : null;
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
  if (src.name != null) out.name = cleanOptionalString(src.name);
  if (src.email != null) out.email = cleanOptionalString(src.email);
  if (src.phone != null) out.phone = cleanOptionalString(src.phone);
  if (src.accommodation != null) out.accommodation = cleanOptionalString(src.accommodation);
  else if (src.accommodation_type != null) out.accommodation = cleanOptionalString(src.accommodation_type);
  else if (src.accommodationType != null) out.accommodation = cleanOptionalString(src.accommodationType);
  if (src.item_type != null) out.item_type = cleanOptionalString(src.item_type);
  else if (src.booking_type != null) out.item_type = cleanOptionalString(src.booking_type);
  if (src.course_title != null) out.course_title = cleanOptionalString(src.course_title);
  else if (src.item_title != null) out.course_title = cleanOptionalString(src.item_title);
  if (src.preferred_date != null) out.preferred_date = cleanOptionalDate(src.preferred_date);
  else if (src.arrival_date != null) out.preferred_date = cleanOptionalDate(src.arrival_date);
  else if (src.arrivalDate != null) out.preferred_date = cleanOptionalDate(src.arrivalDate);
  if (src.experience_level != null) out.experience_level = cleanOptionalString(src.experience_level);
  else if (src.diving_experience != null) out.experience_level = cleanOptionalString(src.diving_experience);
  else if (src.divingExperience != null) out.experience_level = cleanOptionalString(src.divingExperience);
  if (src.payment_choice != null) out.payment_choice = cleanOptionalString(src.payment_choice);
  if (src.message != null) out.message = cleanOptionalString(src.message);
  else if (src.comments != null) out.message = cleanOptionalString(src.comments);
  else if (src.questions != null) out.message = cleanOptionalString(src.questions);
  if (src.status != null) out.status = cleanOptionalString(src.status);
  if (src.internal_notes != null) out.internal_notes = cleanOptionalString(src.internal_notes);
  // Keep admin notes populated for forms that only send `message`.
  if (out.internal_notes == null && src.message != null) out.internal_notes = cleanOptionalString(src.message);
  if (out.internal_notes == null && src.comments != null) out.internal_notes = cleanOptionalString(src.comments);
  if (src.bank_transfer_details != null) out.bank_transfer_details = cleanOptionalString(src.bank_transfer_details);

  normalizeAmounts(src, out);

  return out;
}

export default async function handler(req, res) {
  try {
    const dbProvider = getDbProvider();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    if (req.method === 'GET') {
      if (isSupabaseProvider()) {
        try {
          const rows = await listSupabaseBookings();
          return res.status(200).json({ bookings: rows, source: 'supabase' });
        } catch (supabaseError) {
          const message = supabaseError instanceof Error ? supabaseError.message : 'Supabase fetch failed';
          return res.status(502).json({ error: message, provider: dbProvider });
        }
      }

      if (isMySqlProvider()) {
        try {
          const rows = await listMySqlBookings();
          return res.status(200).json({ bookings: rows, source: 'mysql' });
        } catch (mysqlError) {
          const message = mysqlError instanceof Error ? mysqlError.message : 'MySQL fetch failed';
          return res.status(502).json({ error: message, provider: dbProvider });
        }
      }

      if (isWordPressProvider()) {
        try {
          const rows = await listWordPressBookings();
          return res.status(200).json({ bookings: rows, source: 'wordpress' });
        } catch (wordpressError) {
          const message = wordpressError instanceof Error ? wordpressError.message : 'WordPress fetch failed';
          return res.status(502).json({ error: message, provider: dbProvider });
        }
      }

      return res.status(500).json({ error: `Unsupported DB provider for bookings: ${dbProvider}` });
    }

    if (req.method === 'POST') {
      const body = parseBody(req);
      const { id, ...rest } = body || {};

      if (!id) {
        const generatedId = (globalThis.crypto && typeof globalThis.crypto.randomUUID === 'function')
          ? globalThis.crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        const payload = normalizeBookingPayload({ id: generatedId, ...rest }, { includeId: true });

        if (isSupabaseProvider()) {
          try {
            const inserted = await insertSupabaseBooking(payload);
            const emailPayload = { ...inserted, item_title: inserted.course_title || inserted.item_title };
            const warning = await dispatchBookingNotificationsWithWarning(emailPayload);
            return res.status(201).json(warning ? { ...inserted, warning } : inserted);
          } catch (supabaseError) {
            const message = supabaseError instanceof Error ? supabaseError.message : 'Supabase booking create failed';
            return res.status(502).json({ error: message, provider: dbProvider });
          }
        }

        if (isMySqlProvider()) {
          try {
            const inserted = await insertMySqlBooking(payload);
            const emailPayload = { ...inserted, item_title: inserted.course_title || inserted.item_title };
            const warning = await dispatchBookingNotificationsWithWarning(emailPayload);
            return res.status(201).json(warning ? { ...inserted, warning } : inserted);
          } catch (mysqlError) {
            const message = mysqlError instanceof Error ? mysqlError.message : 'MySQL booking create failed';
            return res.status(502).json({ error: message, provider: dbProvider });
          }
        }

        if (isWordPressProvider()) {
          try {
            const inserted = await insertWordPressBooking(payload);
            const emailPayload = { ...inserted, item_title: inserted.course_title || inserted.item_title };
            const warning = await dispatchBookingNotificationsWithWarning(emailPayload);
            return res.status(201).json(warning ? { ...inserted, warning } : inserted);
          } catch (wordpressError) {
            const message = wordpressError instanceof Error ? wordpressError.message : 'WordPress booking create failed';
            return res.status(502).json({ error: message, provider: dbProvider });
          }
        }

        return res.status(500).json({ error: `Unsupported DB provider for bookings: ${dbProvider}` });
      }

      if (Object.keys(rest).length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
      }

      const updates = normalizeBookingPayload(rest);
      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: 'No valid fields to update' });
      }

      if (isSupabaseProvider()) {
        try {
          const updated = await updateSupabaseBookingById(id, updates);
          return res.status(200).json(updated);
        } catch (supabaseError) {
          const message = supabaseError instanceof Error ? supabaseError.message : 'Supabase update failed';
          return res.status(502).json({ error: message, provider: dbProvider });
        }
      }

      if (isMySqlProvider()) {
        try {
          const updated = await updateMySqlBookingById(id, updates);
          return res.status(200).json(updated);
        } catch (mysqlError) {
          const message = mysqlError instanceof Error ? mysqlError.message : 'MySQL update failed';
          return res.status(502).json({ error: message, provider: dbProvider });
        }
      }

      if (isWordPressProvider()) {
        try {
          const updated = await updateWordPressBookingById(id, updates);
          return res.status(200).json(updated);
        } catch (wordpressError) {
          const message = wordpressError instanceof Error ? wordpressError.message : 'WordPress update failed';
          return res.status(502).json({ error: message, provider: dbProvider });
        }
      }

      return res.status(500).json({ error: `Unsupported DB provider for bookings: ${dbProvider}` });
    }

    if (req.method === 'DELETE') {
      const id = req.query?.id || (parseBody(req) || {}).id;
      if (!id) return res.status(400).json({ error: 'Missing booking id' });

      if (isSupabaseProvider()) {
        try {
          const result = await deleteSupabaseBookingById(id);
          return res.status(200).json(result);
        } catch (supabaseError) {
          const message = supabaseError instanceof Error ? supabaseError.message : 'Supabase delete failed';
          return res.status(502).json({ error: message, provider: dbProvider });
        }
      }

      if (isMySqlProvider()) {
        try {
          const result = await deleteMySqlBookingById(id);
          return res.status(200).json(result);
        } catch (mysqlError) {
          const message = mysqlError instanceof Error ? mysqlError.message : 'MySQL delete failed';
          return res.status(502).json({ error: message, provider: dbProvider });
        }
      }

      if (isWordPressProvider()) {
        try {
          const result = await deleteWordPressBookingById(id);
          return res.status(200).json(result);
        } catch (wordpressError) {
          const message = wordpressError instanceof Error ? wordpressError.message : 'WordPress delete failed';
          return res.status(502).json({ error: message, provider: dbProvider });
        }
      }

      return res.status(500).json({ error: `Unsupported DB provider for bookings: ${dbProvider}` });
    }

    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Unexpected server error' });
  }
}
