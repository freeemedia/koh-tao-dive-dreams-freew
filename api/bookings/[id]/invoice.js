import { sendCustomerInvoiceEmail, sendAdminInvoiceCopyEmail } from '../../send-booking-notification.js';
import {
  getDbProvider,
  isSupabaseProvider,
  isMySqlProvider,
  isWordPressProvider,
  getSupabaseBookingById,
} from '../../_lib/supabase-bookings.js';
import { getMySqlBookingById } from '../../_lib/mysql-bookings.js';
import { getWordPressBookingById } from '../../_lib/wordpress-bookings.js';
import {
  checkAndTrackFailure,
  getClientFingerprint,
  recordSecurityEvent,
} from '../../_lib/security-tracker.js';

function ensureAdmin(req) {
  const viewToken = process.env.ADMIN_BOOKINGS_VIEW_TOKEN || process.env.ADMIN_VIEW_TOKEN;
  const suppliedViewToken = req.headers['x-admin-view-token'] || req.query?.view_token;
  if (viewToken && suppliedViewToken && String(suppliedViewToken) === String(viewToken)) {
    return { ok: true };
  }

  const staticToken = process.env.ADMIN_BOOKINGS_VIEW_TOKEN || process.env.ADMIN_LOGIN_TOKEN || process.env.ADMIN_API_TOKEN || process.env.ADMIN_PASSWORD;
  const suppliedAdminToken = req.headers['x-admin-login-token'];
  if (staticToken && suppliedAdminToken && String(suppliedAdminToken) === String(staticToken)) {
    return { ok: true };
  }

  return { ok: false, status: 401, error: 'Unauthorized' };
}

async function loadBookingById(id) {
  const provider = getDbProvider();

  if (isSupabaseProvider()) {
    const booking = await getSupabaseBookingById(id);
    return { booking, source: 'supabase' };
  }

  if (isMySqlProvider()) {
    const booking = await getMySqlBookingById(id);
    return { booking, source: 'mysql' };
  }

  if (isWordPressProvider()) {
    const booking = await getWordPressBookingById(id);
    return { booking, source: 'wordpress' };
  }

  throw new Error(`Unsupported DB provider for invoices: ${provider}`);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-login-token, x-admin-view-token');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const adminCheck = ensureAdmin(req);
  if (!adminCheck.ok) {
    const clientKey = getClientFingerprint(req, 'invoice-endpoint');
    const throttle = checkAndTrackFailure({
      scope: 'admin-invoice',
      key: clientKey,
      maxAttempts: 12,
      windowMs: 10 * 60 * 1000,
      blockMs: 15 * 60 * 1000,
    });
    recordSecurityEvent({ type: 'invoice_unauthorized', req, details: { attempts: throttle.attempts } });
    if (throttle.blocked) {
      res.setHeader('Retry-After', Math.ceil(throttle.retryAfterMs / 1000));
      return res.status(429).json({ error: 'Too many unauthorized attempts. Try again later.' });
    }
    return res.status(adminCheck.status || 401).json({ error: adminCheck.error || 'Unauthorized' });
  }

  const id = String(req.query?.id || '').trim();
  if (!id) {
    return res.status(400).json({ error: 'Missing booking id' });
  }

  try {
    const { booking, source } = await loadBookingById(id);
    const [invoiceResult, adminCopyResult] = await Promise.all([
      sendCustomerInvoiceEmail(booking),
      sendAdminInvoiceCopyEmail(booking),
    ]);

    return res.status(200).json({
      ok: true,
      source,
      bookingId: id,
      invoice: invoiceResult,
      adminCopy: adminCopyResult,
    });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to send invoice',
    });
  }
}