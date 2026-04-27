const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '.env.local'), override: true });

const app = express();
const affiliateClicksStore = [];
const MAX_AFFILIATE_CLICK_EVENTS = 2000;

// Compatibility shim: some legacy routes referenced `ensureAirtable`.
// Return true to allow Supabase-based handlers to run during migration.
const ensureAirtable = (res) => true;
const 
PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist')));


const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { realtime: { enabled: false } });

// Stripe setup
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_REPLACE_ME');

const getJiraConfig = () => ({
  domain: process.env.JIRA_DOMAIN || 'https://divinginasia.atlassian.net',
  projectKey: process.env.JIRA_PROJECT_KEY || 'PRO',
  email: process.env.JIRA_EMAIL || process.env.JIRA_USER_EMAIL || '',
  apiToken: process.env.JIRA_API_TOKEN || '',
});

const toJiraAdfDescription = (description) => {
  const text = typeof description === 'string' ? description : '';
  const lines = text.split(/\r?\n/);
  const content = lines.map((line) => ({
    type: 'paragraph',
    content: line
      ? [{ type: 'text', text: line }]
      : [],
  }));

  return {
    version: 1,
    type: 'doc',
    content: content.length ? content : [{ type: 'paragraph', content: [] }],
  };
};

const isJiraConfigured = () => {
  const { email, apiToken } = getJiraConfig();
  return Boolean(email && apiToken);
};

const buildJiraIssuePayload = ({
  summary,
  description,
  labels = [],
  issueType = 'Task',
  extraFields = {},
}) => {
  const { projectKey } = getJiraConfig();

  return {
    fields: {
      project: { key: projectKey },
      summary,
      description: typeof description === 'string' ? toJiraAdfDescription(description) : description,
      issuetype: { name: issueType },
      labels,
      ...extraFields,
    },
  };
};

const createJiraIssue = async (payload) => {
  const { domain, email, apiToken } = getJiraConfig();

  if (!email || !apiToken) {
    throw new Error('Jira is not configured');
  }

  const response = await fetch(`${domain}/rest/api/3/issue`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${email}:${apiToken}`).toString('base64')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Jira issue creation failed: ${response.status}`);
  }

  return response.json();
};

const createManualBookingIssue = ({ name, email, bookingDetails }) => createJiraIssue(buildJiraIssuePayload({
  summary: `Booking from ${name} (${email})`,
  description: `Booking Details:\n${bookingDetails}\n\nCustomer Email: ${email}`,
  labels: ['booking', 'manual-escalation'],
}));

const createBookingExportIssue = (booking) => createJiraIssue(buildJiraIssuePayload({
  summary: `[Booking] ${booking.course_title || 'Booking'} for ${booking.name || 'Unknown customer'}`,
  description: [
    'Booking Details:',
    '',
    `Name: ${booking.name || '-'}`,
    `Email: ${booking.email || '-'}`,
    `Phone: ${booking.phone || '-'}`,
    `Course: ${booking.course_title || '-'}`,
    `Preferred Date: ${booking.preferred_date || '-'}`,
    `Experience Level: ${booking.experience_level || '-'}`,
    `Item Type: ${booking.item_type || '-'}`,
    `Add-ons: ${booking.addons || booking.addons_json || '-'}`,
    `Subtotal: ${booking.subtotal_amount ?? '-'}`,
    `Payable Now: ${booking.total_payable_now ?? '-'}`,
    `Status: ${booking.status || '-'}`,
    `Notes: ${booking.internal_notes || booking.message || '-'}`,
    `ID: ${booking.id || '-'}`,
  ].join('\n'),
  labels: ['booking', 'export'],
}));

const mutateFieldsForUnknown = (fields, unknownField) => {
  if (!unknownField || !Object.prototype.hasOwnProperty.call(fields, unknownField)) return null;

  const nextFields = { ...fields };
  const aliases = WRITE_ALIASES[unknownField] || [];
  const aliasTarget = aliases.find((alias) => !Object.prototype.hasOwnProperty.call(nextFields, alias));

  if (aliasTarget) {
    nextFields[aliasTarget] = nextFields[unknownField];
    delete nextFields[unknownField];
    return nextFields;
  }

  delete nextFields[unknownField];
  return nextFields;
};

const mapBooking = (record) => {
  const fields = record?.fields || {};

  const pickField = (keys = []) => {
    for (const key of keys) {
      if (Object.prototype.hasOwnProperty.call(fields, key) && fields[key] !== undefined && fields[key] !== null) {
        return fields[key];
      }
    }
    return null;
  };

  const toNumberOr = (value, fallback = 0) => {
    if (typeof value === 'number' && !Number.isNaN(value)) return value;
    if (typeof value === 'string' && value.trim() !== '') {
      const parsed = Number(value);
      return Number.isNaN(parsed) ? fallback : parsed;
    }
    return fallback;
  };

  const addonsTotal = pickField(['addons_total', 'Add-ons total', 'addonsTotal']);
  const subtotalAmount = pickField(['subtotal_amount', 'Subtotal amount', 'subtotalAmount']);
  const totalPayableNow = pickField(['total_payable_now', 'Total payable now', 'totalPayableNow']);

  return {
    id: pickField(['id']) || record.id,
    name: pickField(['name', 'Name']) || '',
    email: pickField(['email', 'Email']) || '',
    phone: pickField(['phone', 'Phone']),
    item_type: pickField(['item_type', 'Item type', 'itemType']),
    course_title: pickField(['course_title', 'Course/Dive', 'courseTitle']) || '',
    preferred_date: pickField(['preferred_date', 'Preferred Date', 'preferredDate']),
    experience_level: pickField(['experience_level', 'Experience Level', 'experienceLevel']),
    addons: pickField(['addons', 'Add-ons', 'addOns']),
    addons_json: pickField(['addons_json', 'Add-ons JSON', 'addonsJson']),
    addons_total: toNumberOr(addonsTotal, 0),
    subtotal_amount: subtotalAmount === null ? null : toNumberOr(subtotalAmount, 0),
    total_payable_now: totalPayableNow === null ? null : toNumberOr(totalPayableNow, 0),
    internal_notes: pickField(['internal_notes', 'Internal Notes', 'internalNotes']),
    message: pickField(['message', 'Message']),
    status: pickField(['status', 'Status']) || 'pending',
    created_at: pickField(['created_at', 'Created At', 'createdAt']),
    updated_at: pickField(['updated_at', 'Updated At', 'updatedAt']),
  };
};

const mapAffiliateClick = (record) => {
  const fields = record?.fields || {};
  return {
    id: fields.id || record.id,
    hotel_name: fields.hotel_name || '',
    hotel_url: fields.hotel_url || '',
    affiliate_id: fields.affiliate_id || null,
    clicked_at: fields.clicked_at || null,
    referrer: fields.referrer || null,
    user_agent: fields.user_agent || null,
  };
};

const findBookingRecordById = async (id) => {
  try {
    const { data, error } = await supabase.from('bookings').select('*').eq('id', id).limit(1);
    if (error) throw error;
    if (data && data.length) return data[0];

    // Fallback: try matching on a `record_id` column if present
    const { data: data2, error: error2 } = await supabase.from('bookings').select('*').eq('record_id', id).limit(1);
    if (error2) throw error2;
    return data2?.[0] || null;
  } catch (err) {
    throw new Error(err.message || 'Failed to query booking');
  }
};

// Routes

app.get('/api/bookings', async (req, res) => {
  const adminUser = await requireAdmin(req, res);
  if (!adminUser) return;
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// NOTE: Airtable-backed booking creation removed. Use the Supabase-backed
// POST /api/bookings route below (adds a booking into the `bookings` table).

app.put('/api/bookings/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled', 'paid'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const record = await findBookingRecordById(id);
    if (!record) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const { data, error } = await supabase
      .from('bookings')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', record.id)
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json({ message: 'Status updated', booking: (data || [])[0] });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});


app.post('/api/bookings', async (req, res) => {
  const body = req.body;
  if (!body.name || !body.email) {
    return res.status(400).json({ error: 'Missing required fields: name and email' });
  }
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([body])
      .select();
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(201).json(data[0]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Stripe Checkout session endpoint
app.post('/api/create-stripe-session', async (req, res) => {
  const { name, email, course_title, preferred_date, experience_level } = req.body;
  if (!name || !email || !course_title) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: course_title,
              description: `Preferred date: ${preferred_date || '-'} | Experience: ${experience_level || '-'}`,
            },
            unit_amount: 5000, // $50.00, change as needed
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: email,
      success_url: 'https://www.divinginasia.com/thank-you.html',
      cancel_url: 'https://www.divinginasia.com/booking-form.html',
      metadata: { name, email, course_title, preferred_date, experience_level },
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.options('/api/create-jira-booking', (req, res) => {
  res.setHeader('Allow', 'POST, OPTIONS');
  return res.status(200).end();
});

app.post('/api/create-jira-booking', async (req, res) => {
  const adminUser = await requireAdmin(req, res);
  if (!adminUser) return;

  const { name, email, bookingDetails } = req.body || {};

  if (!name || !email || !bookingDetails) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!isJiraConfigured()) {
    return res.status(500).json({ error: 'Jira is not configured' });
  }

  try {
    const issue = await createManualBookingIssue({ name, email, bookingDetails });
    return res.status(200).json({ success: true, issue });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Internal error' });
  }
});

app.options('/api/export-bookings-to-jira', (req, res) => {
  res.setHeader('Allow', 'POST, OPTIONS');
  return res.status(200).end();
});

app.post('/api/export-bookings-to-jira', async (req, res) => {
  const adminUser = await requireAdmin(req, res);
  if (!adminUser) return;

  if (!isJiraConfigured()) {
    return res.status(500).json({ message: 'Jira is not configured' });
  }

  try {
    if (req.body && Object.keys(req.body).length) {
      const jira = await createBookingExportIssue(req.body);
      return res.status(200).json({ message: 'Exported booking to Jira.', jira });
    }

    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    if (!data || !data.length) {
      throw new Error('No bookings found');
    }

    let success = 0;
    let failed = 0;

    for (const booking of data) {
      try {
        await createBookingExportIssue(booking);
        success += 1;
      } catch {
        failed += 1;
      }
    }

    return res.status(200).json({
      message: `Exported ${success} bookings to Jira. ${failed ? `${failed} failed.` : ''}`.trim(),
    });
  } catch (err) {
    return res.status(500).json({ message: `Export failed: ${err.message || err}` });
  }
});

app.get('/api/affiliate-clicks', async (req, res) => {
  const providerFilter = typeof req.query.provider === 'string' ? req.query.provider : null;
  const filtered = providerFilter
    ? affiliateClicksStore.filter((event) => event.provider === providerFilter)
    : affiliateClicksStore;

  const byProvider = filtered.reduce((acc, event) => {
    const key = event.provider || 'unknown';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return res.status(200).json({
    total: filtered.length,
    byProvider,
    recent: filtered.slice(-100).reverse(),
  });
});

app.post('/api/affiliate-clicks', async (req, res) => {
  const body = req.body || {};
  const provider = typeof body.provider === 'string' ? body.provider : null;
  const hotelUrl = typeof body.hotel_url === 'string' ? body.hotel_url : null;

  if (!provider || !hotelUrl) {
    return res.status(400).json({ error: 'Missing required fields: provider, hotel_url' });
  }

  const event = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    provider,
    hotel_name: typeof body.hotel_name === 'string' ? body.hotel_name : null,
    hotel_url: hotelUrl,
    affiliate_id: typeof body.affiliate_id === 'string' ? body.affiliate_id : null,
    placement: typeof body.placement === 'string' ? body.placement : null,
    page_path: typeof body.page_path === 'string' ? body.page_path : null,
    referrer: typeof body.referrer === 'string' ? body.referrer : null,
    user_agent: typeof body.user_agent === 'string' ? body.user_agent : null,
    session_id: typeof body.session_id === 'string' ? body.session_id : null,
    clicked_at: typeof body.clicked_at === 'string' ? body.clicked_at : new Date().toISOString(),
  };

  affiliateClicksStore.push(event);
  if (affiliateClicksStore.length > MAX_AFFILIATE_CLICK_EVENTS) {
    affiliateClicksStore.splice(0, affiliateClicksStore.length - MAX_AFFILIATE_CLICK_EVENTS);
  }

  return res.status(201).json({ ok: true, id: event.id });
});

// Catch-all handler: send back index.html for client-side routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});