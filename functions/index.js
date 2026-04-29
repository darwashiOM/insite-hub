const { onRequest } = require("firebase-functions/v2/https");
const nodemailer = require("nodemailer");

const ALLOWED_ORIGINS = [
  "https://insite-hub-web.web.app",
  "https://insite-hub-web.firebaseapp.com",
  "https://www.insitehub.com",
  "https://insitehub.com",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5180",
  "http://localhost:5181",
];

const DEFAULT_NOTIFY_EMAILS = "sales@insitehub.com,john.royer@insitehub.com";
const DEFAULT_FROM_NAME = "InsiteHub Website";

function parseEmails(value) {
  return (value || "")
    .split(",")
    .map(email => email.trim())
    .filter(Boolean);
}

function getNotifyEmails(submitterEmail) {
  const submitter = (submitterEmail || "").trim().toLowerCase();
  return parseEmails(process.env.NOTIFY_EMAIL || DEFAULT_NOTIFY_EMAILS)
    .filter(email => email.toLowerCase() !== submitter);
}

function getFromAddress() {
  const fromName = process.env.FROM_NAME || DEFAULT_FROM_NAME;
  const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_EMAIL;
  return `"${fromName}" <${fromEmail}>`;
}

function setCors(req, res) {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.set("Access-Control-Allow-Origin", origin);
  }
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return true;
  }
  return false;
}

function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

exports.submitContact = onRequest(async (req, res) => {
  if (setCors(req, res)) return;

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { name, email, company, role, interest, message, track } = req.body;

  if (!name || !email || !email.includes("@")) {
    res.status(400).json({ error: "Name and valid email are required." });
    return;
  }

  const trackLabel = { talk: "Ready to talk", learn: "Want to learn first", demo: "Ready for a demo" }[track] || track;

  const html = `
    <h2>New InsiteHub Inquiry</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      <tr><td style="padding:8px 16px 8px 0;font-weight:bold;color:#666;">Track</td><td style="padding:8px 0;">${trackLabel}</td></tr>
      <tr><td style="padding:8px 16px 8px 0;font-weight:bold;color:#666;">Name</td><td style="padding:8px 0;">${name}</td></tr>
      <tr><td style="padding:8px 16px 8px 0;font-weight:bold;color:#666;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
      ${company ? `<tr><td style="padding:8px 16px 8px 0;font-weight:bold;color:#666;">Company</td><td style="padding:8px 0;">${company}</td></tr>` : ""}
      ${role ? `<tr><td style="padding:8px 16px 8px 0;font-weight:bold;color:#666;">Role</td><td style="padding:8px 0;">${role}</td></tr>` : ""}
      ${interest ? `<tr><td style="padding:8px 16px 8px 0;font-weight:bold;color:#666;">Interest</td><td style="padding:8px 0;">${interest}</td></tr>` : ""}
      ${message ? `<tr><td style="padding:8px 16px 8px 0;font-weight:bold;color:#666;">Message</td><td style="padding:8px 0;">${message}</td></tr>` : ""}
    </table>
  `;

  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: getFromAddress(),
      to: getNotifyEmails(email),
      replyTo: email,
      subject: `New InsiteHub inquiry from ${name}`,
      html,
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email send failed:", err);
    res.status(500).json({ error: "Failed to send email. Please try again." });
  }
});

exports.submitNewsletter = onRequest(async (req, res) => {
  if (setCors(req, res)) return;
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { email, name, role, interests } = req.body;
  if (!email || !email.includes("@")) {
    res.status(400).json({ error: "Valid email is required." });
    return;
  }

  const rows = [
    ["Email", email],
    name && ["Name", name],
    role && ["Role", role],
    interests?.length && ["Interests", interests.join(", ")],
  ].filter(Boolean);

  const html = `
    <h2>New Newsletter Subscriber</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      ${rows.map(([k, v]) => `<tr><td style="padding:8px 16px 8px 0;font-weight:bold;color:#666;">${k}</td><td style="padding:8px 0;">${v}</td></tr>`).join('')}
    </table>
  `;

  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: getFromAddress(),
      to: getNotifyEmails(email),
      replyTo: email,
      subject: name ? `New newsletter subscriber: ${name} <${email}>` : `New newsletter subscriber: ${email}`,
      html,
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email send failed:", err);
    res.status(500).json({ error: "Failed to send email. Please try again." });
  }
});
