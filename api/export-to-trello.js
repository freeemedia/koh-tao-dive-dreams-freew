// api/export-to-trello.js
// POST /api/export-to-trello
// Exports all (or filtered) bookings to Trello as individual cards.
// Requires: TRELLO_API_KEY, TRELLO_TOKEN, TRELLO_LIST_ID in env.

import {
  getDbProvider,
  isSupabaseProvider,
  isMySqlProvider,
  isWordPressProvider,
  listSupabaseBookings,
} from './_lib/supabase-bookings.js';
import { listMySqlBookings } from './_lib/mysql-bookings.js';
import { listWordPressBookings } from './_lib/wordpress-bookings.js';

function buildCardContent(booking) {
  const fields = [
    'id', 'name', 'email', 'phone',
    'course_title', 'booking_type', 'preferred_date',
    'status', 'message', 'internal_notes',
  ];
  const lines = fields
    .map((k) => {
      const v = booking[k];
      if (v == null || v === '') return null;
      return `${k}: ${typeof v === 'object' ? JSON.stringify(v) : String(v)}`;
    })
    .filter(Boolean);

  const title = booking.course_title || booking.item_title || booking.booking_type || 'Booking';
  const name = booking.name || 'Unknown guest';
  return {
    name: `${title} - ${name}`,
    desc: lines.join('\n') || 'Exported from divinginasia.com',
  };
}

async function createTrelloCard(booking, { apiKey, token, listId, labels, members }) {
  const { name, desc } = buildCardContent(booking);
  const body = new URLSearchParams({ key: apiKey, token, idList: listId, name, desc, pos: 'top' });
  if (labels) body.set('idLabels', labels);
  if (members) body.set('idMembers', members);

  const res = await fetch('https://api.trello.com/1/cards', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Trello ${res.status}: ${text}`);
  }
  return res.json();
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-login-token, x-admin-view-token');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Auth check
  const viewToken = process.env.ADMIN_BOOKINGS_VIEW_TOKEN || process.env.ADMIN_LOGIN_TOKEN;
  const supplied = req.headers['x-admin-login-token'] || req.headers['x-admin-view-token'];
  if (!viewToken || String(supplied) !== String(viewToken)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Trello credentials
  const apiKey = String(process.env.TRELLO_API_KEY || '').trim();
  const token = String(process.env.TRELLO_TOKEN || '').trim();
  const listId = String(process.env.TRELLO_LIST_ID || '').trim();
  if (!apiKey || !token || !listId) {
    return res.status(400).json({
      error: 'Trello not configured. Set TRELLO_API_KEY, TRELLO_TOKEN, and TRELLO_LIST_ID in Vercel environment variables.',
    });
  }
  const labels = String(process.env.TRELLO_LABEL_IDS || '').trim();
  const members = String(process.env.TRELLO_MEMBER_IDS || '').trim();
  const creds = { apiKey, token, listId, labels, members };

  // Fetch bookings
  const provider = getDbProvider();
  let bookings = [];
  try {
    if (isSupabaseProvider(provider)) bookings = await listSupabaseBookings();
    else if (isMySqlProvider(provider)) bookings = await listMySqlBookings();
    else if (isWordPressProvider(provider)) bookings = await listWordPressBookings();
  } catch (err) {
    return res.status(500).json({ error: `Failed to fetch bookings: ${err.message}` });
  }

  // Optional status filter from request body
  const { status: filterStatus } = req.body || {};
  const toExport = filterStatus
    ? bookings.filter((b) => String(b.status || '').toLowerCase() === String(filterStatus).toLowerCase())
    : bookings;

  if (toExport.length === 0) {
    return res.status(200).json({ exported: 0, message: 'No bookings to export.' });
  }

  // Send to Trello (sequentially to avoid rate-limit)
  let exported = 0;
  const errors = [];
  for (const booking of toExport) {
    try {
      await createTrelloCard(booking, creds);
      exported++;
    } catch (err) {
      errors.push({ id: booking.id, error: err.message });
    }
  }

  return res.status(200).json({
    exported,
    total: toExport.length,
    errors: errors.length ? errors : undefined,
    message: `${exported} of ${toExport.length} bookings exported to Trello.`,
  });
}
