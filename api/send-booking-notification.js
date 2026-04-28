import nodemailer from 'nodemailer';

function parseBody(req) {
  if (!req || req.body == null) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const bodyData = parseBody(req);
    const {
      name,
      email,
      phone,
      preferred_date,
      experience_level,
      message,
      item_title,
      deposit_amount,
      payment_choice,
      paypal_link,
    } = bodyData;

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    // Do not block booking flow when SMTP is not configured.
    if (!smtpHost || !smtpUser || !smtpPass) {
      return res.status(200).json({
        success: true,
        warning: 'SMTP not configured; notification email skipped',
      });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    const bookingTo = process.env.RESEND_BOOKING_TO_EMAIL || 'bookings@divinginasia.com';
    const fromEmail = process.env.RESEND_FROM_EMAIL || smtpUser;

    const textBody = [
      'New Booking Inquiry',
      '',
      `Course/Dive: ${item_title || 'N/A'}`,
      `Name: ${name || 'N/A'}`,
      `Email: ${email || 'N/A'}`,
      `Phone: ${phone || 'N/A'}`,
      `Preferred Date: ${preferred_date || 'N/A'}`,
      `Experience Level: ${experience_level || 'N/A'}`,
      `Deposit Amount: ${deposit_amount || 'N/A'}`,
      `Payment Choice: ${payment_choice || 'N/A'}`,
      paypal_link ? `PayPal Link: ${paypal_link}` : null,
      '',
      'Message:',
      message || 'No message',
    ]
      .filter(Boolean)
      .join('\n');

    try {
      await transporter.sendMail({
        from: fromEmail,
        to: bookingTo,
        subject: `New Booking Inquiry: ${item_title || 'Booking'}`,
        text: textBody,
      });
      return res.status(200).json({ success: true });
    } catch (mailErr) {
      console.error('send-booking-notification mail error', mailErr);
      return res.status(200).json({
        success: true,
        warning: mailErr instanceof Error ? mailErr.message : 'Email notification failed',
      });
    }
  } catch (err) {
    console.error('send-booking-notification error', err);
    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : 'Internal error',
    });
  }
}
