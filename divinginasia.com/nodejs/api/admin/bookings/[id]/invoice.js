import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');

const readBookings = () => JSON.parse(fs.readFileSync(BOOKINGS_FILE, 'utf8') || '[]');

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    if (!fs.existsSync(BOOKINGS_FILE)) return res.status(404).json({ error: 'No bookings' });

    const { id } = req.query || {};
    if (!id) return res.status(400).json({ error: 'Missing id' });

    const items = readBookings();
    const booking = items.find(b => b.id === id);
    if (!booking) return res.status(404).json({ error: 'Not found' });

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: smtpUser && smtpPass ? { user: smtpUser, pass: smtpPass } : undefined,
    });

    const subject = `Invoice for booking: ${booking.item_title || 'Booking'}`;
    const text = `Hello ${booking.name || ''},\n\nPlease find your invoice details below:\n\nItem: ${booking.item_title || ''}\nAmount: ${booking.deposit_amount || ''}\nStatus: ${booking.status || ''}\n\nIf you have any questions reply to this email.\n\nRegards,\nDiving In Asia`;

    await transporter.sendMail({
      from: smtpUser || 'contact@divinginasia.com',
      to: booking.email,
      cc: 'payments@divinginasia.com',
      subject,
      text,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('invoice error', err);
    res.status(500).json({ error: err.message || 'Internal error' });
  }
}
