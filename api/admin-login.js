export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  const normalizeValue = (value) => String(value || '').trim().replace(/^['\"]|['\"]$/g, '');
  const parseCandidates = (raw) => {
    const base = normalizeValue(raw);
    if (!base) return [];

    const candidates = new Set([base]);
    base
      .split(/[;,\n]/)
      .map((part) => normalizeValue(part))
      .filter(Boolean)
      .forEach((part) => candidates.add(part));

    return Array.from(candidates);
  };

  const adminTokens = parseCandidates(process.env.ADMIN_BOOKINGS_VIEW_TOKEN || process.env.VITE_ADMIN_BOOKINGS_VIEW_TOKEN);
  const adminPasswords = parseCandidates(process.env.ADMIN_PASSWORD);
  const allowedEmails = parseCandidates(process.env.ADMIN_EMAILS || process.env.VITE_ADMIN_EMAILS)
    .map((e) => e.toLowerCase());

  const emailLower = String(email).trim().toLowerCase();

  // Accept if email is in admin list and password matches token or ADMIN_PASSWORD
  const emailOk = allowedEmails.length === 0 || allowedEmails.includes(emailLower);
  const normalizedPassword = String(password || '').trim();
  const passwordOk =
    adminTokens.includes(normalizedPassword) ||
    adminPasswords.includes(normalizedPassword);

  if (emailOk && passwordOk) {
    return res.status(200).json({ success: true, token: adminTokens[0] || 'ok' });
  }

  return res.status(401).json({ success: false, error: 'Invalid credentials' });
}
