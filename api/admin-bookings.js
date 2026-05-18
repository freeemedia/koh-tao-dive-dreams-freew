// api/admin-bookings.js
// MySQL/Supabase-backed admin handler.
// GET    /api/admin-bookings
// PATCH  /api/admin-bookings?id=123

import { sendBookingStatusEmail } from './send-booking-notification.js';
import {
  getDbProvider,
  isSupabaseProvider,
  isMySqlProvider,
  isWordPressProvider,
  listSupabaseBookings,
  updateSupabaseBookingById,
  deleteSupabaseBookingById,
} from './_lib/supabase-bookings.js';
import {
  listMySqlBookings,
  updateMySqlBookingById,
  deleteMySqlBookingById,
} from './_lib/mysql-bookings.js';
import {
  listWordPressBookings,
  updateWordPressBookingById,
  deleteWordPressBookingById,
} from './_lib/wordpress-bookings.js';
import {
  checkAndTrackFailure,
  getClientFingerprint,
  recordSecurityEvent,
} from './_lib/security-tracker.js';

async function ensureAdmin(req) {
  const viewToken = process.env.ADMIN_BOOKINGS_VIEW_TOKEN || process.env.ADMIN_VIEW_TOKEN;
  const suppliedViewToken = req.headers['x-admin-view-token'] || req.query?.view_token;
  if (viewToken && suppliedViewToken && String(suppliedViewToken) === String(viewToken)) {
    return { ok: true, mode: 'view-token' };
  }

  const staticToken = process.env.ADMIN_BOOKINGS_VIEW_TOKEN || process.env.ADMIN_LOGIN_TOKEN || process.env.ADMIN_API_TOKEN || process.env.ADMIN_PASSWORD;
  const suppliedAdminToken = req.headers['x-admin-login-token'];

  if (staticToken && suppliedAdminToken && String(suppliedAdminToken) === String(staticToken)) {
    return { ok: true, mode: 'static-token' };
  }

  return { ok: false, status: 401, error: 'Unauthorized' };
}

export default async function handler(req, res) {
  const dbProvider = getDbProvider();
  const allowDelete = String(process.env.ALLOW_BOOKING_DELETE || '').trim().toLowerCase() === 'true';
  // CORS for local dev
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', allowDelete ? 'GET, PATCH, DELETE, OPTIONS' : 'GET, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-login-token, x-admin-view-token');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const adminCheck = await ensureAdmin(req);
  if (!adminCheck.ok) {
    const clientKey = getClientFingerprint(req, 'admin-bookings');
    const throttle = checkAndTrackFailure({
      scope: 'admin-bookings',
      key: clientKey,
      maxAttempts: 20,
      windowMs: 10 * 60 * 1000,
      blockMs: 15 * 60 * 1000,
    });
    recordSecurityEvent({ type: 'admin_bookings_unauthorized', req, details: { attempts: throttle.attempts } });
    if (throttle.blocked) {
      res.setHeader('Retry-After', Math.ceil(throttle.retryAfterMs / 1000));
      return res.status(429).json({ error: 'Too many unauthorized attempts. Try again later.' });
    }
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

    if (isWordPressProvider()) {
      try {
        const rows = await listWordPressBookings();
        return res.status(200).json(rows);
      } catch (wordpressError) {
        const message = wordpressError instanceof Error ? wordpressError.message : 'WordPress fetch failed';
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
    const allowed = ['status', 'payment_status', 'payment_link_url', 'internal_notes', 'bank_transfer_details', 'name', 'email', 'phone', 'course_title', 'item_title', 'preferred_date', 'total_amount', 'deposit_amount', 'due_amount'];
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

    if (isWordPressProvider()) {
      try {
        const booking = await updateWordPressBookingById(id, updates);
        if ('status' in updates) {
          await sendBookingStatusEmail(booking).catch(() => {});
        }
        return res.status(200).json(booking);
      } catch (wordpressError) {
        const message = wordpressError instanceof Error ? wordpressError.message : 'WordPress update failed';
        return res.status(502).json({ error: message, provider: dbProvider });
      }
    }

    return res.status(500).json({ error: `Unsupported DB provider for admin bookings: ${dbProvider}` });
  }

  if (req.method === 'DELETE') {
    if (!allowDelete) {
      return res.status(403).json({ error: 'Booking deletion is disabled. Set ALLOW_BOOKING_DELETE=true to enable.' });
    }

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

    if (isWordPressProvider()) {
      try {
        const result = await deleteWordPressBookingById(id);
        return res.status(200).json({ ok: true, deleted: result.deleted });
      } catch (wordpressError) {
        const message = wordpressError instanceof Error ? wordpressError.message : 'WordPress delete failed';
        if (message.toLowerCase().includes('no route was found')) {
          const archivedBooking = await updateWordPressBookingById(id, { status: 'archived' });
          return res.status(200).json({ ok: true, deleted: false, archived: true, booking: archivedBooking });
        }
        return res.status(502).json({ error: message, provider: dbProvider });
      }
    }

    return res.status(500).json({ error: `Unsupported DB provider for admin bookings: ${dbProvider}` });
  }

  // POST — export all bookings to Trello
  if (req.method === 'POST') {
    const action = req.query?.action || (req.body || {}).action;
    if (action !== 'export-to-trello' && action !== 'export-to-jira') {
      return res.status(400).json({ error: 'Unknown action. Use ?action=export-to-trello or ?action=export-to-jira' });
    }

    if (action === 'export-to-jira') {
      const jiraBaseUrl = String(process.env.JIRA_BASE_URL || 'https://divinginasia.atlassian.net').trim().replace(/\/$/, '');
      const jiraEmail = String(process.env.JIRA_EMAIL || '').trim();
      const jiraApiToken = String(process.env.JIRA_API_TOKEN || '').trim();
      const jiraProjectKey = String(process.env.JIRA_PROJECT_KEY || '').trim();
      const jiraIssueType = String(process.env.JIRA_ISSUE_TYPE || 'Task').trim();

      if (!jiraEmail || !jiraApiToken || !jiraProjectKey) {
        return res.status(400).json({
          error: 'Jira not configured. Add JIRA_EMAIL, JIRA_API_TOKEN, JIRA_PROJECT_KEY to Vercel environment variables.',
        });
      }

      let bookings = [];
      try {
        if (isSupabaseProvider()) bookings = await listSupabaseBookings();
        else if (isMySqlProvider()) bookings = await listMySqlBookings();
        else if (isWordPressProvider()) bookings = await listWordPressBookings();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Fetch failed';
        return res.status(502).json({ error: `Failed to fetch bookings: ${message}` });
      }

      const { status: filterStatus } = req.body || {};
      const toExport = filterStatus
        ? bookings.filter((b) => String(b.status || '').toLowerCase() === String(filterStatus).toLowerCase())
        : bookings;

      if (toExport.length === 0) {
        return res.status(200).json({ exported: 0, message: 'No bookings to export.' });
      }

      function toAtlassianDocument(booking) {
        const lines = [
          `Booking ID: ${booking.id || ''}`,
          `Name: ${booking.name || ''}`,
          `Email: ${booking.email || ''}`,
          `Phone: ${booking.phone || ''}`,
          `Course: ${booking.course_title || booking.item_title || ''}`,
          `Booking Type: ${booking.booking_type || ''}`,
          `Preferred Date: ${booking.preferred_date || ''}`,
          `Status: ${booking.status || ''}`,
          `Message: ${booking.message || ''}`,
          `Internal Notes: ${booking.internal_notes || ''}`,
        ].filter((line) => !line.endsWith(': '));

        return {
          type: 'doc',
          version: 1,
          content: lines.map((text) => ({
            type: 'paragraph',
            content: [{ type: 'text', text }],
          })),
        };
      }

      const authHeader = `Basic ${Buffer.from(`${jiraEmail}:${jiraApiToken}`).toString('base64')}`;
      let exported = 0;
      const errors = [];

      for (const booking of toExport) {
        try {
          const title = booking.course_title || booking.item_title || booking.booking_type || 'Booking';
          const guestName = booking.name || 'Unknown guest';
          const summary = `[Booking] ${title} - ${guestName}`;
          const payload = {
            fields: {
              project: { key: jiraProjectKey },
              summary,
              issuetype: { name: jiraIssueType },
              description: toAtlassianDocument(booking),
            },
          };

          const issueRes = await fetch(`${jiraBaseUrl}/rest/api/3/issue`, {
            method: 'POST',
            headers: {
              'Authorization': authHeader,
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          if (!issueRes.ok) {
            const text = await issueRes.text().catch(() => '');
            throw new Error(`Jira ${issueRes.status}: ${text}`);
          }

          exported++;
        } catch (err) {
          errors.push({ id: booking.id, error: err instanceof Error ? err.message : 'Unknown error' });
        }
      }

      return res.status(200).json({
        exported,
        total: toExport.length,
        errors: errors.length ? errors : undefined,
        message: `${exported} of ${toExport.length} bookings exported to Jira.`,
      });
    }

    const apiKey = String(process.env.TRELLO_API_KEY || '').trim();
    const token = String(process.env.TRELLO_TOKEN || '').trim();
    const listId = String(process.env.TRELLO_LIST_ID || '').trim();
    if (!apiKey || !token || !listId) {
      return res.status(400).json({
        error: 'Trello not configured. Add TRELLO_API_KEY, TRELLO_TOKEN, TRELLO_LIST_ID to Vercel environment variables.',
      });
    }
    const labels = String(process.env.TRELLO_LABEL_IDS || '').trim();
    const members = String(process.env.TRELLO_MEMBER_IDS || '').trim();

    // Fetch bookings
    let bookings = [];
    try {
      if (isSupabaseProvider()) bookings = await listSupabaseBookings();
      else if (isMySqlProvider()) bookings = await listMySqlBookings();
      else if (isWordPressProvider()) bookings = await listWordPressBookings();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Fetch failed';
      return res.status(502).json({ error: `Failed to fetch bookings: ${message}` });
    }

    const { status: filterStatus } = req.body || {};
    const toExport = filterStatus
      ? bookings.filter((b) => String(b.status || '').toLowerCase() === String(filterStatus).toLowerCase())
      : bookings;

    if (toExport.length === 0) {
      return res.status(200).json({ exported: 0, message: 'No bookings to export.' });
    }

    function buildCardContent(booking) {
      const fields = ['id', 'name', 'email', 'phone', 'course_title', 'booking_type', 'preferred_date', 'status', 'message', 'internal_notes'];
      const lines = fields.map((k) => {
        const v = booking[k];
        if (v == null || v === '') return null;
        return `${k}: ${typeof v === 'object' ? JSON.stringify(v) : String(v)}`;
      }).filter(Boolean);
      const title = booking.course_title || booking.item_title || booking.booking_type || 'Booking';
      const name = booking.name || 'Unknown guest';
      return { name: `${title} - ${name}`, desc: lines.join('\n') || 'Exported from divinginasia.com' };
    }

    let exported = 0;
    const errors = [];
    for (const booking of toExport) {
      try {
        const { name, desc } = buildCardContent(booking);
        const body = new URLSearchParams({ key: apiKey, token, idList: listId, name, desc, pos: 'top' });
        if (labels) body.set('idLabels', labels);
        if (members) body.set('idMembers', members);
        const cardRes = await fetch('https://api.trello.com/1/cards', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body,
        });
        if (!cardRes.ok) {
          const text = await cardRes.text().catch(() => '');
          throw new Error(`Trello ${cardRes.status}: ${text}`);
        }
        exported++;
      } catch (err) {
        errors.push({ id: booking.id, error: err instanceof Error ? err.message : 'Unknown error' });
      }
    }

    return res.status(200).json({
      exported,
      total: toExport.length,
      errors: errors.length ? errors : undefined,
      message: `${exported} of ${toExport.length} bookings exported to Trello.`,
    });
  }

  res.status(405).json({ error: 'Method not allowed' });
}

