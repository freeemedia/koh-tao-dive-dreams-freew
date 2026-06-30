import { handleOptions, applyCors } from '../_lib/cors.js';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

const hasSmtpConfig = () => Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

const getResendFromCandidates = () => {
  const primary = process.env.RESEND_FROM_EMAIL || 'confirmed@divinginasia.com';
  return Array.from(new Set([primary, 'onboarding@resend.dev']));
};

export default async function handler(req, res) {
  applyCors(res);

  if (handleOptions(req, res)) return;

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const body = req.body;
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }

    const {
      name,
      email,
      phone,
      preferred_date,
      experience_level,
      payment_choice,
      paypal_link,
      item_title,
      full_price,
      dive_count,
      course_fun_dive_count,
      course_fun_dive_cost,
      stay_with_us,
      deposit_amount,
      addons,
      booking_source,
      message,
    } = body;

    const adminEmail = process.env.BOOKING_ADMIN_EMAIL || process.env.RESEND_BOOKING_TO_EMAIL || 'bookings@divinginasia.com';
    const subject = `New Booking Inquiry: ${item_title || 'Booking'}`;

    const emailText = [
      `New booking inquiry received:`,
      '',
      `Name: ${name || 'N/A'}`,
      `Email: ${email || 'N/A'}`,
      `Phone: ${phone || 'N/A'}`,
      `Preferred Date: ${preferred_date || 'N/A'}`,
      `Experience Level: ${experience_level || 'N/A'}`,
      `Payment Choice: ${payment_choice || 'N/A'}`,
      paypal_link ? `PayPal Link: ${paypal_link}` : '',
      `Item: ${item_title || 'N/A'}`,
      `Full Price: ${full_price || 'N/A'}`,
      `Dive Count: ${dive_count || 'N/A'}`,
      `Course Fun Dive Count: ${course_fun_dive_count || 'N/A'}`,
      `Course Fun Dive Cost: ${course_fun_dive_cost || 'N/A'}`,
      `Stay With Us: ${stay_with_us || 'N/A'}`,
      `Deposit Amount: ${deposit_amount || 'N/A'}`,
      `Addons: ${addons || 'N/A'}`,
      `Booking Source: ${booking_source || 'N/A'}`,
      '',
      `Message:`,
      message || 'No message',
    ].filter(line => line !== '').join('\n');

    let emailSent = false;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      for (const fromEmail of getResendFromCandidates()) {
        try {
          const { error } = await resend.emails.send({
            from: fromEmail,
            to: adminEmail,
            subject,
            text: emailText,
            replyTo: email || undefined,
          });

          if (!error) {
            emailSent = true;
            break;
          }

          console.error('Resend send error:', error);
        } catch (err) {
          console.error('Resend exception:', err);
        }
      }
    }

    if (!emailSent && hasSmtpConfig()) {
      const smtpPort = Number(process.env.SMTP_PORT || 587);
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });

      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: adminEmail,
        subject,
        replyTo: email || undefined,
        text: emailText,
      });

      emailSent = true;
    }

    if (!emailSent) {
      console.warn('No email configuration available, booking notification not sent');
      return res.status(200).json({
        success: false,
        warning: 'Booking saved but email notification could not be sent due to missing email configuration'
      });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('send-booking-notification error:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
}