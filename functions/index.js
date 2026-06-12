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
const DEFAULT_FROM_NAME = "Proxa Labs Website";

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
  res.set("Access-Control-Allow-Headers", "Content-Type, sentry-trace, baggage");
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

  const { name, email, company, role, interest, message, track, source, asset } = req.body;

  if (!name || !email || !email.includes("@")) {
    res.status(400).json({ error: "Name and valid email are required." });
    return;
  }

  // Lead-gen submissions (e.g. the Future-Proof gated landing page) carry a `source`
  // and an `asset` ("html" = viewed the article, "pdf" = downloaded the PDF).
  const isLead = source === "future-proof-landing";
  const assetLabel = asset === "html" ? "Viewed the HTML article" : asset === "pdf" ? "Downloaded the PDF" : asset;
  const trackLabel = { talk: "Ready to talk", learn: "Want to learn first", demo: "Ready for a demo" }[track] || track;

  const cell = (k, v) => `<tr><td style="padding:8px 16px 8px 0;font-weight:bold;color:#666;">${k}</td><td style="padding:8px 0;">${v}</td></tr>`;
  const rows = [];
  if (isLead) {
    rows.push(cell("Source", "Future-Proof landing page"));
    if (asset) rows.push(cell("Asset", assetLabel));
  } else if (track) {
    rows.push(cell("Track", trackLabel));
  }
  rows.push(cell("Name", name));
  rows.push(cell("Email", `<a href="mailto:${email}">${email}</a>`));
  if (company) rows.push(cell("Company", company));
  if (role) rows.push(cell("Role", role));
  if (interest) rows.push(cell("Interest", interest));
  if (message) rows.push(cell("Message", message));

  const heading = isLead ? "New Future-Proof Lead" : "New Proxa Labs Inquiry";
  const subject = isLead
    ? `New Future-Proof lead: ${name}${asset ? ` (${asset})` : ""}`
    : `New Proxa Labs inquiry from ${name}`;

  const html = `
    <h2>${heading}</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      ${rows.join("\n      ")}
    </table>
  `;

  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: getFromAddress(),
      to: getNotifyEmails(email),
      replyTo: email,
      subject,
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
