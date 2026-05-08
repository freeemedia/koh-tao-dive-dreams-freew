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
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
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