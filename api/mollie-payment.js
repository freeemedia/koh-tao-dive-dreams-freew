/**
 * POST /api/mollie-payment
 * Creates a Mollie payment link for a booking.
 * Body: { booking_id, amount_eur, description, customer_email, customer_name }
 *
 * GET /api/mollie-payment?link_id=pl_xxx
 * Checks payment link status.
 */

const VERCEL_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'https://www.lembonganwatersports.com';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-view-token, x-admin-login-token');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const MOLLIE_API_KEY = process.env.MOLLIE_API_KEY;
  if (!MOLLIE_API_KEY) {
    return res.status(500).json({ error: 'Mollie not configured — add MOLLIE_API_KEY to environment variables' });
  }

  // Auth check
  const viewToken  = req.headers['x-admin-view-token']  || req.query.view_token || '';
  const loginToken = req.headers['x-admin-login-token'] || '';
  const expectedView  = process.env.ADMIN_BOOKINGS_VIEW_TOKEN || '';
  const expectedLogin = process.env.ADMIN_LOGIN_TOKEN || process.env.ADMIN_BOOKINGS_VIEW_TOKEN || '';
  const authed = (expectedView  && viewToken  === expectedView) ||
                 (expectedLogin && loginToken === expectedLogin);
  if (!authed) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // ── GET: check status ────────────────────────────────────────────
  if (req.method === 'GET') {
    const { link_id } = req.query;
    if (!link_id) return res.status(400).json({ error: 'link_id required' });

    const r = await fetch(`https://api.mollie.com/v2/payment-links/${link_id}`, {
      headers: { Authorization: `Bearer ${MOLLIE_API_KEY}` },
    });
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: data.detail || 'Mollie error' });

    return res.json({
      id: data.id,
      status: data.paidAt ? 'paid' : 'open',
      paidAt: data.paidAt || null,
      url: data._links?.paymentLink?.href,
    });
  }

  // ── POST: create payment link ────────────────────────────────────
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { booking_id, amount_eur, description, customer_email, customer_name } = req.body || {};

  if (!booking_id || !amount_eur) {
    return res.status(400).json({ error: 'booking_id and amount_eur are required' });
  }

  const amountValue = parseFloat(amount_eur);
  if (isNaN(amountValue) || amountValue <= 0) {
    return res.status(400).json({ error: 'Invalid amount_eur' });
  }

  const payload = {
    description: description || `Diving in Asia — Booking #${booking_id}`,
    amount: {
      currency: 'EUR',
      value: amountValue.toFixed(2),
    },
    redirectUrl: 'https://www.lembonganwatersports.com/thankyou.html',
    webhookUrl: `${VERCEL_URL}/api/mollie-webhook`,
    metadata: {
      booking_id: String(booking_id),
      customer_email: customer_email || '',
      customer_name: customer_name || '',
    },
  };

  const mollieRes = await fetch('https://api.mollie.com/v2/payment-links', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${MOLLIE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const mollieData = await mollieRes.json();
  if (!mollieRes.ok) {
    return res.status(mollieRes.status).json({ error: mollieData.detail || mollieData.title || 'Mollie error' });
  }

  const paymentUrl = mollieData._links?.paymentLink?.href;
  const linkId     = mollieData.id;

  // Persist link_id and payment_status on the WP booking
  try {
    const WP_URL = process.env.WP_BOOKING_URL;
    const API_KEY = process.env.WP_BOOKING_API_KEY;
    if (WP_URL && API_KEY) {
      await fetch(`${WP_URL}/wp-json/ktd/v1/bookings/${booking_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-ktd-api-key': API_KEY,
        },
        body: JSON.stringify({
          payment_status: 'invoiced',
          payment_link_url: paymentUrl,
          mollie_link_id: linkId,
        }),
      });
    }
  } catch (_) {
    // Non-fatal — link still created
  }

  return res.json({ success: true, url: paymentUrl, id: linkId });
}
