const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

if (!admin.apps.length) admin.initializeApp();

// CMS admin password — set via `firebase functions:secrets:set ADMIN_PASSWORD`.
// Never committed, never logged.
const ADMIN_PASSWORD = defineSecret("ADMIN_PASSWORD");

const ALLOWED_ORIGINS = [
  "https://proxalabs.com",
  "https://www.proxalabs.com",
  "https://insite-hub-web.web.app",
  "https://insite-hub-web.firebaseapp.com",
  "https://www.insitehub.com",
  "https://insitehub.com",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5180",
  "http://localhost:5181",
];

const DEFAULT_NOTIFY_EMAILS = "sales@insitehub.com,john.royer@insitehub.com,mehrler@proxalabs.com";
const FUTURE_PROOF_REPLY_TO = "mehrler@proxalabs.com";
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
      replyTo: isLead ? FUTURE_PROOF_REPLY_TO : email,
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

// ---------------------------------------------------------------------------
// CMS admin login: verify the shared password server-side (against the secret),
// rate-limit brute force, and on success mint a Firebase custom token carrying
// the admin claim. The browser signs in with it; Firestore/Storage rules grant
// writes only to that claim. The password never reaches the client.
// ---------------------------------------------------------------------------
const ADMIN_MAX_ATTEMPTS = 8;
const ADMIN_WINDOW_MS = 15 * 60 * 1000;   // attempts counted within 15 min
const ADMIN_LOCKOUT_MS = 15 * 60 * 1000;  // lock for 15 min after too many

function constantTimeEqual(a, b) {
  const ab = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ab.length !== bb.length) {
    crypto.timingSafeEqual(ab, ab); // keep timing ~constant, then fail
    return false;
  }
  return crypto.timingSafeEqual(ab, bb);
}

exports.adminLogin = onRequest({ secrets: [ADMIN_PASSWORD] }, async (req, res) => {
  if (setCors(req, res)) return;
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const ipRaw = (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || req.ip || "unknown";
  const ip = (ipRaw.replace(/[^a-zA-Z0-9_.:-]/g, "_").slice(0, 80)) || "unknown";
  const db = admin.firestore();
  const ref = db.collection("adminLoginAttempts").doc(ip);
  const now = Date.now();

  const snap = await ref.get();
  const data = snap.exists ? snap.data() : { count: 0, first: now, lockedUntil: 0 };

  if (data.lockedUntil && now < data.lockedUntil) {
    res.status(429).json({ error: "Too many attempts. Try again later." });
    return;
  }

  let count = data.count || 0;
  let first = data.first || now;
  if (now - first > ADMIN_WINDOW_MS) { count = 0; first = now; }

  const password = (req.body && req.body.password) || "";
  const ok = password.length > 0 && constantTimeEqual(password, ADMIN_PASSWORD.value());

  if (!ok) {
    count += 1;
    const update = { count, first, lockedUntil: 0 };
    if (count >= ADMIN_MAX_ATTEMPTS) {
      update.lockedUntil = now + ADMIN_LOCKOUT_MS;
      update.count = 0;
      update.first = now;
    }
    await ref.set(update, { merge: true });
    res.status(401).json({ error: "Invalid password." });
    return;
  }

  await ref.set({ count: 0, first: now, lockedUntil: 0 }, { merge: true });
  const token = await admin.auth().createCustomToken("site-admin", { admin: true });
  res.status(200).json({ token });
});
