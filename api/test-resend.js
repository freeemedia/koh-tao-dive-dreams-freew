export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-login-token');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const suppliedToken = req.headers['x-admin-login-token'];
  const adminToken = process.env.ADMIN_PASSWORD || process.env.ADMIN_BOOKINGS_VIEW_TOKEN;

  if (!adminToken || suppliedToken !== adminToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const fallbackTo = process.env.RESEND_BOOKING_TO_EMAIL || process.env.ADMIN_EMAILS;
  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const to = body.to || fallbackTo;
  const subject = body.subject || 'Resend test from lembonganwatersports.com';

  if (!apiKey) {
    return res.status(500).json({ error: 'RESEND_API_KEY not set' });
  }

  if (!from) {
    return res.status(500).json({ error: 'RESEND_FROM_EMAIL not set' });
  }

  if (!to) {
    return res.status(500).json({ error: 'No recipient configured' });
  }

  const html = `
    <div style="font-family: Arial, sans-serif; padding: 24px;">
      <h2>Resend test successful</h2>
      <p>This message was sent from the deployed Vercel app.</p>
      <p><strong>From:</strong> ${from}</p>
      <p><strong>To:</strong> ${to}</p>
      <p><strong>Time:</strong> ${new Date().toISOString()}</p>
    </div>
  `;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ from, to, subject, html }),
  });

  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    return res.status(response.status).json({
      ok: false,
      provider: 'resend',
      error: json.message || JSON.stringify(json),
    });
  }

  return res.status(200).json({
    ok: true,
    provider: 'resend',
    id: json.id || null,
    to,
    from,
    subject,
  });
}
