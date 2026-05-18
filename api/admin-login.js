import {
  checkAndTrackFailure,
  clearFailureTracking,
  getClientFingerprint,
  recordSecurityEvent,
} from './_lib/security-tracker.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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

  const adminTokens = parseCandidates(
    process.env.ADMIN_BOOKINGS_VIEW_TOKEN
    || process.env.ADMIN_LOGIN_TOKEN
    || process.env.ADMIN_API_TOKEN
    || process.env.VITE_ADMIN_BOOKINGS_VIEW_TOKEN
  );
  const adminPasswords = parseCandidates(process.env.ADMIN_PASSWORD);
  const allowedEmails = parseCandidates(process.env.ADMIN_EMAILS || process.env.VITE_ADMIN_EMAILS)
    .map((e) => e.toLowerCase());

  const emailLower = String(email).trim().toLowerCase();
  const clientKey = getClientFingerprint(req, emailLower || 'admin-login');

  // Accept if email is in admin list and password matches token or ADMIN_PASSWORD
  const emailOk = allowedEmails.length === 0 || allowedEmails.includes(emailLower);
  const normalizedPassword = String(password || '').trim();
  const passwordOk =
    adminTokens.includes(normalizedPassword) ||
    adminPasswords.includes(normalizedPassword);

  if (emailOk && passwordOk) {
    clearFailureTracking('admin-login', clientKey);
    recordSecurityEvent({ type: 'admin_login_success', req, details: { email: emailLower } });
    const issuedToken = adminTokens[0] || normalizedPassword;
    return res.status(200).json({ success: true, token: issuedToken });
  }

  const throttle = checkAndTrackFailure({
    scope: 'admin-login',
    key: clientKey,
    maxAttempts: 7,
    windowMs: 10 * 60 * 1000,
    blockMs: 20 * 60 * 1000,
  });

  recordSecurityEvent({ type: 'admin_login_failed', req, details: { email: emailLower, attempts: throttle.attempts } });

  if (throttle.blocked) {
    res.setHeader('Retry-After', Math.ceil(throttle.retryAfterMs / 1000));
    return res.status(429).json({ success: false, error: 'Too many attempts. Try again later.' });
  }

  return res.status(401).json({ success: false, error: 'Invalid credentials' });
}
