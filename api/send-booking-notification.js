async function sendViaResend({ to, subject, html }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY not set');
  const from = process.env.RESEND_FROM_EMAIL
    || process.env.RESEND_BOOKING_EMAIL
    || process.env.SMTP_FROM
    || 'confirmed@lembonganwatersports.com';

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ from, to, subject, html }),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Resend error ${res.status}: ${json.message || JSON.stringify(json)}`);
  return { ok: true };
}

async function sendViaSMTP({ to, subject, html }) {
  const { createTransport } = await import('nodemailer');
  const transporter = createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    html,
  });
  return { ok: true };
}

async function sendEmail({ to, subject, html }) {
  try {
    return await sendViaResend({ to, subject, html });
  } catch (err) {
    console.warn('Resend failed, trying SMTP:', err.message);
    return await sendViaSMTP({ to, subject, html });
  }
}

export async function sendBookingNotificationEmail(payload = {}) {
  console.log('sendBookingNotificationEmail called');

  const adminTo = process.env.RESEND_BOOKING_TO_EMAIL || 'bookings@lembonganwatersports.com';

  const {
    name, email, phone, accommodation, accommodation_type, preferred_date, experience_level,
    message, comments, item_title, selected_price, currency, deposit_amount, total_amount, due_amount, payment_choice, paypal_link,
  } = payload;
  const accommodationValue = accommodation || accommodation_type || 'N/A';

  const bookingTitle = item_title || 'Diving Package';
  const rowStyle = 'border-bottom:1px solid #e8edf2;';
  const labelStyle = 'padding:10px 14px;font-weight:600;color:#1a3a5c;white-space:nowrap;width:160px;';
  const valueStyle = 'padding:10px 14px;color:#374151;';

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>New Booking Inquiry</title></head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:32px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(11,61,145,0.10);">

      <!-- Header -->
      <tr><td style="background:linear-gradient(135deg,#0b3d91 0%,#1a5ed4 100%);padding:0;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:28px 32px 0 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td><span style="font-size:22px;font-weight:700;color:#ffffff;letter-spacing:1px;">🤿 PRO DIVING ASIA</span></td>
                  <td align="right"><span style="background:rgba(255,255,255,0.18);color:#fff;font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px;letter-spacing:1px;">⚠️ ADMIN NOTIFICATION</span></td>
                </tr>
              </table>
            </td>
          </tr>
          <tr><td style="padding:18px 32px 32px 32px;text-align:center;">
            <div style="font-size:48px;margin-bottom:8px;">📋</div>
            <h1 style="margin:0 0 6px;color:#ffffff;font-size:24px;font-weight:700;">New Booking Inquiry</h1>
            <p style="margin:0;color:rgba(255,255,255,0.85);font-size:14px;">${bookingTitle}</p>
          </td></tr>
        </table>
      </td></tr>

      <!-- Body -->
      <tr><td style="padding:32px;">
        <p style="margin:0 0 20px;color:#374151;font-size:15px;">A new booking inquiry has been submitted. Details are below:</p>

        <!-- Details table -->
        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8edf2;border-radius:8px;overflow:hidden;margin-bottom:24px;">
          <tr style="${rowStyle}"><td style="${labelStyle}">Course / Dive</td><td style="${valueStyle}">${bookingTitle}</td></tr>
          <tr style="${rowStyle}"><td style="${labelStyle}">Name</td><td style="${valueStyle}">${name || 'N/A'}</td></tr>
          <tr style="${rowStyle}"><td style="${labelStyle}">Email</td><td style="${valueStyle}"><a href="mailto:${email || ''}" style="color:#1a5ed4;">${email || 'N/A'}</a></td></tr>
          <tr style="${rowStyle}"><td style="${labelStyle}">Phone</td><td style="${valueStyle}">${phone || 'N/A'}</td></tr>
          <tr style="${rowStyle}"><td style="${labelStyle}">Accommodation</td><td style="${valueStyle}">${accommodationValue}</td></tr>
          <tr style="${rowStyle}"><td style="${labelStyle}">Preferred Date</td><td style="${valueStyle}">${preferred_date || 'N/A'}</td></tr>
          ${experience_level && experience_level !== 'none' ? `<tr style="${rowStyle}"><td style="${labelStyle}">Experience Level</td><td style="${valueStyle}">${experience_level}</td></tr>` : ''}
          ${selected_price != null ? `<tr style="${rowStyle}"><td style="${labelStyle}">Selected Price</td><td style="${valueStyle}">${formatMoney(selected_price)} ${currency || 'THB'}</td></tr>` : ''}
          ${total_amount != null ? `<tr style="${rowStyle}"><td style="${labelStyle}">Total Amount</td><td style="${valueStyle}">${formatMoney(total_amount)}</td></tr>` : ''}
          ${deposit_amount != null ? `<tr style="${rowStyle}"><td style="${labelStyle}">Deposit Amount</td><td style="${valueStyle}">${formatMoney(deposit_amount)}</td></tr>` : ''}
          ${due_amount != null ? `<tr style="${rowStyle}"><td style="${labelStyle}">Balance</td><td style="${valueStyle}">${formatMoney(due_amount)}</td></tr>` : ''}
          <tr style="${rowStyle}"><td style="${labelStyle}">Payment Choice</td><td style="${valueStyle}">${normalizePaymentChoiceLabel(payment_choice)}</td></tr>
          ${paypal_link ? `<tr style="${rowStyle}"><td style="${labelStyle}">PayPal Link</td><td style="${valueStyle}"><a href="${paypal_link}" style="color:#1a5ed4;">${paypal_link}</a></td></tr>` : ''}
          <tr><td style="${labelStyle}">Message</td><td style="${valueStyle}">${message || comments || 'No message'}</td></tr>
        </table>

        <!-- CTA -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td align="center">
            <a href="https://admin.lembonganwatersports.com/ktd-dashboard/" style="display:inline-block;background:linear-gradient(135deg,#0b3d91,#1a5ed4);color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:15px;font-weight:600;letter-spacing:0.5px;">Open Admin Panel →</a>
          </td></tr>
        </table>
      </td></tr>

      <!-- Footer -->
      <tr><td style="background:#f8fafc;border-top:1px solid #e8edf2;padding:20px 32px;text-align:center;">
        <p style="margin:0;color:#6b7280;font-size:12px;">Pro Diving Asia · Koh Tao, Thailand · This is an automated admin notification</p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body></html>`;

  try {
    await sendEmail({
      to: adminTo,
      subject: `New Booking Inquiry: ${bookingTitle}`,
      html,
    });
    return { success: true };
  } catch (mailErr) {
    console.error('send-booking-notification error', mailErr);
    return { success: true, warning: mailErr instanceof Error ? mailErr.message : 'Email notification failed' };
  }
}

function formatMoney(value) {
  if (value == null || value === '') return 'To be confirmed';
  if (typeof value === 'string' && /฿|quote/i.test(value)) return value;
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) return String(value);
  return `฿${numericValue.toLocaleString()}`;
}

function normalizePaymentChoiceLabel(value) {
  const raw = String(value || '').trim().toLowerCase();
  if (!raw || raw === 'none' || raw === 'inquire') return 'Pay later (invoice pending)';
  if (raw === 'deposit_received') return 'Deposit received';
  if (raw.includes('pay deposit now') || raw === 'now') return 'Pay deposit now via PayPal';
  if (raw === 'link') return 'Payment link sent';
  return String(value || 'Pay later (invoice pending)');
}

function pickCustomerTemplate(payload = {}) {
  const forced = String(payload.email_template || '').trim().toLowerCase();
  if (forced === 'received' || forced === 'reminder' || forced === 'confirmed') {
    return forced;
  }

  const status = String(payload.status || '').trim().toLowerCase();
  const choice = String(payload.payment_choice || payload.payment_mode || '').trim().toLowerCase();

  if (status === 'confirmed' || status === 'completed' || choice === 'deposit_received' || choice === 'paid') {
    return 'confirmed';
  }
  if (status === 'pending' || choice === 'now' || choice === 'link' || Boolean(payload.paypal_link)) {
    return 'reminder';
  }
  return 'received';
}

function templateContent(template, firstName, itemTitle, paymentLine, hasPayNow, displayDeposit) {
  if (template === 'confirmed') {
    return {
      subject: `Booking Confirmed: ${itemTitle} - Diving In Asia`,
      ribbon: 'Final Confirmation',
      heroIcon: '✅',
      heroTitle: `You are confirmed, ${firstName}!`,
      intro: 'Your booking is secured. Thank you for choosing Diving In Asia.',
      statusBanner: '<p style="margin:0;color:#065f46;font-size:14px;">✅ <strong>Confirmed</strong> - Your place is secured.</p>',
      nextSteps: [
        'Our team will share final meeting details and schedule.',
        'Please reply if any traveler details have changed.',
        'See you soon in Koh Tao.',
      ],
      paymentLine,
      showPayButton: false,
      payButtonLabel: `Pay ${displayDeposit} with PayPal`,
    };
  }

  if (template === 'reminder') {
    return {
      subject: `Deposit Reminder: ${itemTitle} - Diving In Asia`,
      ribbon: 'Deposit Reminder',
      heroIcon: '⏳',
      heroTitle: `Quick reminder, ${firstName}`,
      intro: 'To secure your booking, please complete your deposit when convenient.',
      statusBanner: '<p style="margin:0;color:#92400e;font-size:14px;">⏳ <strong>Payment pending</strong> - Please complete your deposit to secure your place.</p>',
      nextSteps: [
        'Complete the deposit using the button below.',
        'We will send your final confirmation right after payment.',
        'Need help? Reply to this email or WhatsApp us anytime.',
      ],
      paymentLine,
      showPayButton: true,
      payButtonLabel: `Pay ${displayDeposit} with PayPal`,
    };
  }

  return {
    subject: `Booking Received: ${itemTitle} - Diving In Asia`,
    ribbon: 'Booking Received',
    heroIcon: '🤿',
    heroTitle: `Thanks, ${firstName}!`,
    intro: 'We have received your booking inquiry and our team is reviewing it now.',
    statusBanner: '<p style="margin:0;color:#92400e;font-size:14px;">⏳ <strong>Review in progress</strong> - We will contact you shortly with next steps.</p>',
    nextSteps: [
      'We will confirm availability within 24 hours.',
      'You will receive a follow-up email with payment details.',
      'Have questions? Message us anytime on WhatsApp.',
    ],
    paymentLine,
    showPayButton: hasPayNow,
    payButtonLabel: `Pay ${displayDeposit} with PayPal`,
  };
}

export async function sendCustomerInvoiceEmail(payload = {}) {
  const toEmail = String(payload.email || '').trim();
  if (!toEmail) {
    return { success: true, warning: 'Missing customer email; invoice skipped' };
  }

  const {
    name, phone, accommodation, accommodation_type, preferred_date, arrival_date, experience_level, diving_experience,
    item_title, course_title, activity, selected_price, currency, deposit_amount, total_amount, due_amount, payment_choice, payment_mode, paypal_link,
  } = payload;
  const accommodationValue = accommodation || accommodation_type || 'Not specified';
  const preferredDateValue = preferred_date || arrival_date;
  const rawExp = experience_level || diving_experience;
  const experienceValue = rawExp && rawExp !== 'none' ? rawExp : null;

  const invoiceDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  const bookingTitle = item_title || course_title || activity || 'Diving Package';
  const displayDeposit = formatMoney(deposit_amount);
  const displayTotal = formatMoney(total_amount);
  const displayDue = due_amount != null && due_amount !== '' ? formatMoney(due_amount) : null;
  const normalizedPaymentMode = String(payment_mode || '').trim().toLowerCase();
  const normalizedPaymentChoice = String(payment_choice || '').trim().toLowerCase();
  const isPayNow = normalizedPaymentMode === 'now' || normalizedPaymentChoice.includes('pay deposit now');
  const template = pickCustomerTemplate(payload);
  const firstName = name ? String(name).split(' ')[0] : 'diver';
  const paymentLabel = normalizePaymentChoiceLabel(payment_choice || payment_mode);
  const ui = templateContent(template, firstName, bookingTitle, paymentLabel, isPayNow, displayDeposit);

  const paypalSection = (paypal_link && ui.showPayButton)
    ? `<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 0 8px;">
        <a href="${paypal_link}" style="display:inline-block;background:#0070ba;color:#ffffff;padding:15px 36px;border-radius:50px;text-decoration:none;font-size:16px;font-weight:700;letter-spacing:0.3px;">
          💳 ${ui.payButtonLabel}
        </a>
        <p style="font-size:12px;color:#888;margin:10px 0 0;">Secure payment of <strong>${displayDeposit}</strong> via PayPal</p>
      </td></tr></table>`
    : `<table width="100%" cellpadding="0" cellspacing="0"><tr><td style="background:#fffbeb;border:1px solid #fcd34d;border-radius:8px;padding:14px 18px;margin:0;">
        ${ui.statusBanner}
      </td></tr></table>`;

  const dividerRow = `<tr><td style="padding:0 32px;"><div style="height:1px;background:#e8eeff;"></div></td></tr>`;

  const detailRow = (label, value, shade) =>
    `<tr style="background:${shade ? '#f5f8ff' : '#ffffff'};">
      <td style="padding:11px 16px;color:#6b7280;font-size:13px;width:42%;border-bottom:1px solid #eef1fb;">${label}</td>
      <td style="padding:11px 16px;color:#111827;font-size:13px;font-weight:500;border-bottom:1px solid #eef1fb;">${value}</td>
    </tr>`;

  const bookingRows = [
    name            && detailRow('Name', name, false),
    phone           && detailRow('Phone', phone, true),
    detailRow('Accommodation', accommodationValue, false),
    preferredDateValue && detailRow('Preferred Date', `📅 ${preferredDateValue}`, true),
    experienceValue && detailRow('Experience Level', experienceValue, false),
  ].filter(Boolean).join('');

  const nextStepsRows = (ui.nextSteps || []).map((step, idx) => {
    const icons = ['✅', '📩', '💬'];
    return `<tr>
      <td style="width:32px;vertical-align:top;padding:4px 12px 12px 0;font-size:18px;">${icons[idx] || '•'}</td>
      <td style="vertical-align:top;padding:0 0 12px;color:#374151;font-size:14px;line-height:1.5;">${step}</td>
    </tr>`;
  }).join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${ui.ribbon} - Diving In Asia</title>
</head>
<body style="margin:0;padding:0;background:#edf2ff;font-family:'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#edf2ff;padding:40px 16px;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" role="presentation" style="max-width:580px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 40px rgba(11,61,145,0.12);">

        <!-- ── HEADER ── -->
        <tr>
          <td style="background:linear-gradient(135deg,#0b3d91 0%,#1a5ed4 100%);padding:32px 40px;text-align:center;">
            <img src="https://www.lembonganwatersports.com/images/logo.png"
                 alt="Diving In Asia"
                 width="120" height="auto"
                 style="display:block;margin:0 auto 14px;max-width:120px;" />
            <div style="width:48px;height:2px;background:rgba(255,255,255,0.3);margin:0 auto 14px;border-radius:2px;"></div>
            <p style="color:#c7d9ff;margin:0;font-size:13px;letter-spacing:1.5px;text-transform:uppercase;font-weight:500;">${ui.ribbon}</p>
          </td>
        </tr>

        <!-- ── HERO TEXT ── -->
        <tr>
          <td style="padding:32px 40px 20px;text-align:center;">
            <div style="font-size:36px;margin-bottom:12px;">${ui.heroIcon}</div>
            <h1 style="color:#0b3d91;font-size:22px;font-weight:700;margin:0 0 10px;">${ui.heroTitle}</h1>
            <p style="color:#4b5563;font-size:15px;line-height:1.6;margin:0;">
              ${ui.intro}<br>
              Here's a summary of your reservation.
            </p>
          </td>
        </tr>

        ${dividerRow}

        <!-- ── BOOKING DETAILS ── -->
        <tr>
          <td style="padding:24px 40px 8px;">
            <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#9ca3af;">Booking Details</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e9f8;border-radius:10px;overflow:hidden;">
              <tr style="background:linear-gradient(135deg,#0b3d91,#1a5ed4);">
                <td colspan="2" style="padding:12px 16px;color:#ffffff;font-weight:700;font-size:15px;">
                  🌊 ${bookingTitle}
                </td>
              </tr>
              ${bookingRows}
            </table>
          </td>
        </tr>

        <!-- ── PAYMENT SUMMARY ── -->
        <tr>
          <td style="padding:16px 40px 8px;">
            <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#9ca3af;">Payment Summary</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e9f8;border-radius:10px;overflow:hidden;">
              <tr style="background:#f0f5ff;">
                <td style="padding:12px 16px;color:#374151;font-size:14px;border-bottom:1px solid #e5e9f8;">Deposit Due Now</td>
                <td style="padding:12px 16px;color:#0b3d91;font-size:18px;font-weight:800;border-bottom:1px solid #e5e9f8;text-align:right;">${displayDeposit}</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;color:#6b7280;font-size:13px;">Selected Course Price</td>
                <td style="padding:12px 16px;color:#374151;font-size:13px;font-weight:600;text-align:right;">${selected_price != null ? `${formatMoney(selected_price)} ${currency || 'THB'}` : displayTotal}</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;color:#6b7280;font-size:13px;">Total Course Price</td>
                <td style="padding:12px 16px;color:#374151;font-size:13px;font-weight:600;text-align:right;">${displayTotal}</td>
              </tr>
              ${displayDue ? `<tr style="background:#f9fbff;">
                <td style="padding:12px 16px;color:#6b7280;font-size:13px;border-top:1px solid #e5e9f8;">Remaining Balance</td>
                <td style="padding:12px 16px;color:#374151;font-size:13px;font-weight:600;text-align:right;border-top:1px solid #e5e9f8;">${displayDue}</td>
              </tr>` : ''}
              <tr>
                <td style="padding:12px 16px;color:#6b7280;font-size:13px;border-top:1px solid #e5e9f8;">Payment Option</td>
                <td style="padding:12px 16px;color:#374151;font-size:13px;font-weight:600;text-align:right;border-top:1px solid #e5e9f8;">${ui.paymentLine}</td>
              </tr>
            </table>
            <p style="font-size:11px;color:#9ca3af;margin:8px 0 0;text-align:right;">All prices in Thai Baht (THB)</p>
          </td>
        </tr>

        <!-- ── PAYMENT CTA ── -->
        <tr>
          <td style="padding:8px 40px 24px;">
            ${paypalSection}
          </td>
        </tr>

        ${dividerRow}

        <!-- ── WHAT HAPPENS NEXT ── -->
        <tr>
          <td style="padding:24px 40px;">
            <p style="margin:0 0 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#9ca3af;">What Happens Next</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${nextStepsRows}
            </table>
          </td>
        </tr>

        ${dividerRow}

        <!-- ── CONTACT ── -->
        <tr>
          <td style="padding:24px 40px;text-align:center;">
            <p style="margin:0 0 12px;color:#4b5563;font-size:14px;">Need help or have questions?</p>
            <a href="https://wa.me/66639230132"
               style="display:inline-block;background:#25d366;color:#ffffff;padding:12px 28px;border-radius:50px;text-decoration:none;font-size:14px;font-weight:700;">
              💬 WhatsApp Us: +66 63 923 0132
            </a>
            <p style="margin:12px 0 0;color:#9ca3af;font-size:12px;">Or reply directly to this email</p>
          </td>
        </tr>

        <!-- ── FOOTER ── -->
        <tr>
          <td style="background:#0b3d91;padding:20px 40px;text-align:center;">
            <img src="https://www.lembonganwatersports.com/images/logo.png"
                 alt="Diving In Asia" width="70" height="auto"
                 style="display:block;margin:0 auto 10px;opacity:0.8;" />
            <p style="color:#93b4e8;margin:0;font-size:12px;line-height:1.6;">
              © ${new Date().getFullYear()} Diving In Asia · Koh Tao, Surat Thani, Thailand<br>
              <a href="https://www.lembonganwatersports.com" style="color:#93b4e8;text-decoration:underline;">www.lembonganwatersports.com</a>
            </p>
          </td>
        </tr>

      </table>
      <!-- Preheader spacer -->
      <p style="color:#edf2ff;font-size:1px;line-height:1px;max-height:0;overflow:hidden;mso-hide:all;">&nbsp;</p>
    </td></tr>
  </table>
</body>
</html>`;

  try {
    await sendEmail({
      to: toEmail,
      subject: ui.subject,
      html,
    });
    return { success: true };
  } catch (err) {
    console.error('sendCustomerInvoiceEmail error', err);
    return { success: true, warning: `Customer invoice email failed: ${err.message}` };
  }
}

export async function sendBookingStatusEmail(payload = {}) {
  const toEmail = String(payload.email || '').trim();
  if (!toEmail) {
    return { success: true, warning: 'Missing customer email; status email skipped' };
  }

  const status = String(payload.status || 'updated').toLowerCase();
  const template = (status === 'confirmed' || status === 'completed')
    ? 'confirmed'
    : (status === 'pending' ? 'reminder' : 'received');

  return sendCustomerInvoiceEmail({
    ...payload,
    email_template: template,
  });
}

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

    // Send admin notification and customer invoice in parallel
    const [result, invoiceResult] = await Promise.all([
      sendBookingNotificationEmail(bodyData),
      sendCustomerInvoiceEmail(bodyData),
    ]);

    const warnings = [result.warning, invoiceResult.warning].filter(Boolean);
    return res.status(200).json({
      success: true,
      warning: warnings.length ? warnings.join('; ') : undefined,
    });
  } catch (err) {
    console.error('send-booking-notification error', err);
    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : 'Internal error',
    });
  }
}
