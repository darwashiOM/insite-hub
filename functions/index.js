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
const ADMIN_IP_MAX = 8;          // per-IP failures before that IP is locked
const ADMIN_GLOBAL_MAX = 40;     // total failures (any source) before all logins lock
const ADMIN_WINDOW_MS = 15 * 60 * 1000;   // rolling window
const ADMIN_LOCKOUT_MS = 15 * 60 * 1000;  // lockout duration

function constantTimeEqual(a, b) {
  const ab = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ab.length !== bb.length) {
    crypto.timingSafeEqual(ab, ab); // keep timing ~constant, then fail
    return false;
  }
  return crypto.timingSafeEqual(ab, bb);
}

// Behind Firebase Hosting -> Cloud Functions, Google appends the REAL client IP as
// the rightmost X-Forwarded-For entry; everything left of it is client-supplied and
// untrustworthy. Use the rightmost token so the key can't be spoofed per-request.
function clientIp(req) {
  const parts = String(req.headers["x-forwarded-for"] || "")
    .split(",").map((s) => s.trim()).filter(Boolean);
  const ip = parts.length ? parts[parts.length - 1] : (req.ip || "unknown");
  return ip.replace(/[^a-zA-Z0-9_.:-]/g, "_").slice(0, 80) || "unknown";
}

function isLocked(d, now) {
  return !!(d && d.lockedUntil && now < d.lockedUntil);
}

// Compute the next failure state from a snapshot and write it (transaction-safe:
// the caller does all reads before any of these writes).
function applyFailure(tx, ref, snap, max, now) {
  const d = snap.exists ? snap.data() : { count: 0, first: now, lockedUntil: 0 };
  let count = d.count || 0;
  let first = d.first || now;
  if (now - first > ADMIN_WINDOW_MS) { count = 0; first = now; }
  count += 1;
  const upd = { count, first, lockedUntil: d.lockedUntil || 0 };
  if (count >= max) { upd.lockedUntil = now + ADMIN_LOCKOUT_MS; upd.count = 0; upd.first = now; }
  tx.set(ref, upd, { merge: true });
}

exports.adminLogin = onRequest({ secrets: [ADMIN_PASSWORD] }, async (req, res) => {
  if (setCors(req, res)) return;
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const db = admin.firestore();
  const now = Date.now();
  const ipRef = db.collection("adminLoginAttempts").doc(clientIp(req));
  const globalRef = db.collection("adminLoginAttempts").doc("__global__");

  // Reject early if this IP OR all logins (global) are currently locked.
  const [ipSnap, gSnap] = await Promise.all([ipRef.get(), globalRef.get()]);
  if (isLocked(ipSnap.data(), now) || isLocked(gSnap.data(), now)) {
    res.status(429).json({ error: "Too many attempts. Try again later." });
    return;
  }

  const password = (req.body && req.body.password) || "";
  const ok = password.length > 0 && constantTimeEqual(password, ADMIN_PASSWORD.value());

  if (!ok) {
    // Atomically record the failure against both the per-IP and global counters.
    // A spoofed X-Forwarded-For makes a new per-IP doc, but the global counter
    // still trips, so distributed/spoofed guessing is also rate-limited.
    await db.runTransaction(async (tx) => {
      const [is, gs] = await Promise.all([tx.get(ipRef), tx.get(globalRef)]); // reads first
      applyFailure(tx, ipRef, is, ADMIN_IP_MAX, now);                          // then writes
      applyFailure(tx, globalRef, gs, ADMIN_GLOBAL_MAX, now);
    });
    res.status(401).json({ error: "Invalid password." });
    return;
  }

  // Success: clear this IP's failures and mint the admin session.
  await ipRef.set({ count: 0, first: now, lockedUntil: 0 }, { merge: true });
  const token = await admin.auth().createCustomToken("site-admin", { admin: true });
  res.status(200).json({ token });
});

// ---------------------------------------------------------------------------
// Public page-content overrides: returns all siteContent docs as one JSON blob.
// Marketing pages fetch this (plain fetch, no Firebase SDK) and render overrides
// over their in-code defaults. Cached at the CDN so it's fast; updates within ~60s.
// ---------------------------------------------------------------------------
exports.getContent = onRequest(async (req, res) => {
  if (setCors(req, res)) return;
  try {
    const snap = await admin.firestore().collection("siteContent").get();
    const out = {};
    snap.forEach((d) => { out[d.id] = d.data(); });
    res.set("Cache-Control", "public, max-age=60, s-maxage=60");
    res.status(200).json(out);
  } catch (err) {
    console.error("getContent failed:", err);
    res.status(200).json({}); // never break the public site on content fetch failure
  }
});
