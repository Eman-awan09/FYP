// src/utils/sendEmail.js
const nodemailer = require("nodemailer");

/**
 * Sends an email using SMTP config from .env.
 * In dev, you can log instead of sending.
 */
const sendEmail = async ({ to, subject, text, html }) => {
  // If you don't want real email yet, uncomment below:
  // console.log("Mock email:", { to, subject, text });
  // return;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Campus Desk" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  });
};

module.exports = sendEmail;