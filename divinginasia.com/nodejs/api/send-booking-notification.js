import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
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
    } = req.body || {};

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.warn('SMTP not configured');
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: smtpUser && smtpPass ? { user: smtpUser, pass: smtpPass } : undefined,
    });

    const body = `New Booking Inquiry\n\nCourse/Dive: ${item_title}\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nPreferred Date: ${preferred_date || 'N/A'}\nExperience Level: ${experience_level || 'N/A'}\nDeposit Amount: ${deposit_amount || 'N/A'}\nPayment Choice: ${payment_choice || 'N/A'}\n${paypal_link ? `PayPal Link: ${paypal_link}` : ''}\n\nMessage:\n${message || 'No message'}`;

    await transporter.sendMail({
      from: smtpUser || 'contact@divinginasia.com',
      to: 'payments@divinginasia.com',
      subject: `New Booking Inquiry: ${item_title}`,
      text: body,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('send-booking-notification error', err);
    res.status(500).json({ error: err.message || 'Internal error' });
  }
}
