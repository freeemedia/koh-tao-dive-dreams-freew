const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // Port 587 uses STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function main() {
  try {
    let info = await transporter.sendMail({
      from: 'noreply@divigiinasia.com',
      to: process.env.DEBUG_EMAIL_TO, // Set this in your .env
      subject: 'SMTP Debug Test',
      text: 'This is a test email from your debug script.',
    });
    console.log('Message sent:', info.messageId);
  } catch (err) {
    console.error('Error sending mail:', err);
  }
}

main();
