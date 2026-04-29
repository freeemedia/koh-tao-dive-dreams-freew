export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  const adminToken = process.env.ADMIN_BOOKINGS_VIEW_TOKEN || process.env.VITE_ADMIN_BOOKINGS_VIEW_TOKEN;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const allowedEmails = (process.env.ADMIN_EMAILS || process.env.VITE_ADMIN_EMAILS || '')
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean);

  const emailLower = String(email).trim().toLowerCase();

  // Accept if email is in admin list and password matches token or ADMIN_PASSWORD
  const emailOk = allowedEmails.length === 0 || allowedEmails.includes(emailLower);
  const passwordOk =
    (adminToken && password === adminToken) ||
    (adminPassword && password === adminPassword);

  if (emailOk && passwordOk) {
    return res.status(200).json({ success: true, token: adminToken || 'ok' });
  }

  return res.status(401).json({ success: false, error: 'Invalid credentials' });
}
