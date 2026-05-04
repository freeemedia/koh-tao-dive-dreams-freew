import nodemailer from 'nodemailer';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const sbHeaders = () => ({
  'Content-Type': 'application/json',
  'apikey': SERVICE_KEY,
  'Authorization': `Bearer ${SERVICE_KEY}`,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!SUPABASE_URL || !SERVICE_KEY) {
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing id' });

  // Fetch booking from Supabase
  const r = await fetch(
    `${SUPABASE_URL}/rest/v1/booking_inquiries?id=eq.${encodeURIComponent(id)}&select=*`,
    { headers: sbHeaders() }
  );
  const rows = await r.json();
  const booking = Array.isArray(rows) ? rows[0] : null;

  if (!booking) return res.status(404).json({ error: 'Booking not found' });

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    return res.status(500).json({ error: 'SMTP not configured' });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const subject = `Invoice for booking: ${booking.course_title || 'Booking'}`;
  const text = `Hello ${booking.name || ''},\n\nPlease find your invoice details below:\n\nItem: ${booking.course_title || ''}\nAmount: ${booking.deposit_amount || 'N/A'}\nStatus: ${booking.status || ''}\n\nIf you have any questions, reply to this email.\n\nRegards,\nDiving In Asia`;

  await transporter.sendMail({
    from: smtpUser,
    to: booking.email,
    cc: smtpUser,
    subject,
    text,
  });

  return res.status(200).json({ success: true });
}
