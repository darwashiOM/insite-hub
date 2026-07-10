const { onRequest } = require("firebase-functions/v2/https");
const { onSchedule } = require("firebase-functions/v2/scheduler");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const { FieldValue } = require("firebase-admin/firestore");
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

// NOTE: process.env.NOTIFY_EMAIL (functions/.env) is authoritative in production and
// overrides this constant; this is only the fallback when that env var is unset.
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
    res.set("Vary", "Origin"); // cache must key on origin since ACAO is reflected
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

  // Honeypot: a real user never fills this hidden field. Pretend success, store nothing.
  if (req.body && req.body._hp) { res.status(200).json({ success: true }); return; }

  const { name, email, company, role, interest, message, track, source, asset } = req.body;

  if (!name || !email || !email.includes("@")) {
    res.status(400).json({ error: "Name and valid email are required." });
    return;
  }

  // Rate limit so this endpoint can't be abused as an open email relay.
  if (await enforceRateLimit(admin.firestore(), req, Date.now())) {
    res.status(429).json({ error: "Too many submissions. Please try again later." }); return;
  }

  // Lead-gen submissions (e.g. the Future-Proof gated landing page) carry a `source`
  // and an `asset` ("html" = viewed the article, "pdf" = downloaded the PDF).
  const isLead = source === "future-proof-landing";
  const assetLabel = asset === "html" ? "Viewed the HTML article" : asset === "pdf" ? "Downloaded the PDF" : asset;
  const trackLabel = { talk: "Ready to talk", learn: "Want to learn first", demo: "Ready for a demo" }[track] || track;
  const sline = (s) => String(s == null ? "" : s).replace(/[\r\n]+/g, " ").trim(); // no header injection in subjects

  // All user values escaped before they hit the notification-email HTML.
  const cell = (k, v) => `<tr><td style="padding:8px 16px 8px 0;font-weight:bold;color:#666;">${k}</td><td style="padding:8px 0;">${v}</td></tr>`;
  const rows = [];
  if (isLead) {
    rows.push(cell("Source", "Future-Proof landing page"));
    if (asset) rows.push(cell("Asset", escapeHtml(assetLabel)));
  } else if (track) {
    rows.push(cell("Track", escapeHtml(trackLabel)));
  }
  rows.push(cell("Name", escapeHtml(name)));
  rows.push(cell("Email", `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`));
  if (company) rows.push(cell("Company", escapeHtml(company)));
  if (role) rows.push(cell("Role", escapeHtml(role)));
  if (interest) rows.push(cell("Interest", escapeHtml(interest)));
  if (message) rows.push(cell("Message", escapeHtml(message)));

  const heading = isLead ? "New Future-Proof Lead" : "New Proxa Labs Inquiry";
  const subject = isLead
    ? `New Future-Proof lead: ${sline(name)}${asset ? ` (${sline(asset)})` : ""}`
    : `New Proxa Labs inquiry from ${sline(name)}`;

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
  if (req.body && req.body._hp) { res.status(200).json({ success: true }); return; }
  const { email, name, role, interests } = req.body;
  if (!email || !email.includes("@")) {
    res.status(400).json({ error: "Valid email is required." });
    return;
  }
  if (await enforceRateLimit(admin.firestore(), req, Date.now())) {
    res.status(429).json({ error: "Too many submissions. Please try again later." }); return;
  }
  const sline = (s) => String(s == null ? "" : s).replace(/[\r\n]+/g, " ").trim();

  const rows = [
    ["Email", email],
    name && ["Name", name],
    role && ["Role", role],
    interests?.length && ["Interests", interests.join(", ")],
  ].filter(Boolean);

  const html = `
    <h2>New Newsletter Subscriber</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      ${rows.map(([k, v]) => `<tr><td style="padding:8px 16px 8px 0;font-weight:bold;color:#666;">${k}</td><td style="padding:8px 0;">${escapeHtml(v)}</td></tr>`).join('')}
    </table>
  `;

  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: getFromAddress(),
      to: getNotifyEmails(email),
      replyTo: email,
      subject: name ? `New newsletter subscriber: ${sline(name)} <${sline(email)}>` : `New newsletter subscriber: ${sline(email)}`,
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

  try {
    const db = admin.firestore();
    const now = Date.now();
    const password = (req.body && req.body.password) || "";
    // Two roles via two shared passwords: the admin password (full control) and an
    // optional editor password (content only — set EDITOR_PASSWORD to enable it).
    const editorPw = process.env.EDITOR_PASSWORD || "";
    const isAdminPw = password.length > 0 && constantTimeEqual(password, ADMIN_PASSWORD.value());
    const isEditorPw = !isAdminPw && editorPw.length > 0 && password.length > 0 && constantTimeEqual(password, editorPw);
    const ok = isAdminPw || isEditorPw;

    // Check the password BEFORE any lockout gate: a correct password must ALWAYS
    // succeed (the attacker never has it, so blocking a correct login during a
    // lockout protects nothing and would let attackers DoS the real admin).
    if (ok) {
      const uid = isAdminPw ? "site-admin" : "site-editor";
      const token = await admin.auth().createCustomToken(uid, {
        admin: isAdminPw, role: isAdminPw ? "admin" : "editor",
      });
      // Best-effort: clear this IP's failure counter (non-critical to auth).
      db.collection("adminLoginAttempts").doc(clientIp(req))
        .set({ count: 0, first: now, lockedUntil: 0 }, { merge: true }).catch(() => {});
      res.status(200).json({ token });
      return;
    }

    // Wrong password: enforce the lockout (per-IP + global) and record the failure.
    const ipRef = db.collection("adminLoginAttempts").doc(clientIp(req));
    const globalRef = db.collection("adminLoginAttempts").doc("global-lockout");
    const [ipSnap, gSnap] = await Promise.all([ipRef.get(), globalRef.get()]);
    if (isLocked(ipSnap.data(), now) || isLocked(gSnap.data(), now)) {
      res.status(429).json({ error: "Too many attempts. Try again later." });
      return;
    }
    await db.runTransaction(async (tx) => {
      const [is, gs] = await Promise.all([tx.get(ipRef), tx.get(globalRef)]); // reads first
      applyFailure(tx, ipRef, is, ADMIN_IP_MAX, now);                          // then writes
      applyFailure(tx, globalRef, gs, ADMIN_GLOBAL_MAX, now);
    });
    res.status(401).json({ error: "Invalid password." });
  } catch (err) {
    console.error("adminLogin failed:", err);
    res.status(500).json({ error: "Login error — please try again." });
  }
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
    // Non-2xx so clients keep their last-good cached overrides (and fall back to
    // in-code defaults on a cold load) instead of caching an empty {} over them.
    res.status(500).json({ error: "content unavailable" });
  }
});

// ---------------------------------------------------------------------------
// Dynamic sitemap: reads published content live, so it's always current the
// moment a marketer publishes (no rebuild). Served at /sitemap.xml via a Hosting
// rewrite. noindex items are excluded.
// ---------------------------------------------------------------------------
const SITEMAP_STATIC = [
  "/", "/platform", "/advisory", "/ai-literacy", "/insitex-lms", "/content-development",
  "/the-lab", "/about", "/announcements", "/resources", "/newsletter", "/contact",
  "/blog", "/news", "/case-studies", "/videos",
];
exports.getSitemap = onRequest(async (req, res) => {
  try {
    const db = admin.firestore();
    const origin = (process.env.SITE_URL || "https://www.proxalabs.com").replace(/\/+$/, "");
    const urls = [...SITEMAP_STATIC];
    for (const [col, prefix] of [["articles", "/blog/"], ["caseStudies", "/case-studies/"]]) {
      const snap = await db.collection(col).where("published", "==", true).get();
      snap.forEach((d) => { if (!d.data().noindex) urls.push(prefix + (d.data().slug || d.id)); });
    }
    const pages = await db.collection("pages").where("published", "==", true).get();
    pages.forEach((d) => { if (!d.data().noindex) urls.push("/" + (d.data().slug || d.id)); });
    const body = urls.map((u) => `  <url><loc>${origin}${u}</loc></url>`).join("\n");
    res.set("Content-Type", "application/xml");
    res.set("Cache-Control", "public, max-age=300, s-maxage=300");
    res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`);
  } catch (err) {
    console.error("getSitemap failed:", err);
    res.status(500).send("");
  }
});

// ---------------------------------------------------------------------------
// Dynamic llms.txt (AEO): a live, always-current index of the site for AI
// crawlers (ChatGPT, Perplexity, Google AI). Fixed pages are hand-described;
// every published post / case study / video / built page is appended
// automatically the moment it's published. Served at /llms.txt via rewrite.
// ---------------------------------------------------------------------------
const LLMS_HEADER = `# Proxa Labs

> Proxa Labs is the AI implementation partner built for biopharma commercial learning — advisory, an AI platform, and structured experimentation. Methodology-first, compliance by design.

## Pages
- [Platform](%o/platform): The closed-loop AI platform — Forge builds content, Cue delivers learning, Stage assesses readiness, Trace confirms competency.
- [Advisory](%o/advisory): AI strategy, readiness assessments, governance, and infrastructure planning for biopharma commercial L&D.
- [AI Literacy](%o/ai-literacy): Role-targeted AI fluency tracks for the commercial organization.
- [InsiteX LMS](%o/insitex-lms): Enterprise learning management built for biopharma compliance.
- [Content Development](%o/content-development): MLR-compliant content development, AI-powered or traditional.
- [The Lab](%o/the-lab): Structured AI experimentation — define the use case, design the experiment, measure what matters.
- [News](%o/news): Product releases, company announcements, and research milestones from Proxa Labs.
- [About](%o/about): 25 years of biopharma commercial learning expertise applied to AI implementation.
- [Contact](%o/contact): Start a conversation.`;

exports.getLlms = onRequest(async (req, res) => {
  try {
    const db = admin.firestore();
    const origin = (process.env.SITE_URL || "https://www.proxalabs.com").replace(/\/+$/, "");
    const line = (title, url, desc) => `- [${title}](${url})${desc ? `: ${String(desc).replace(/\s+/g, " ").trim().slice(0, 220)}` : ""}`;
    const section = async (heading, col, toUrl, toDesc) => {
      const snap = await db.collection(col).where("published", "==", true).get();
      const rows = [];
      snap.forEach((d) => {
        const x = d.data();
        if (x.noindex) return;
        rows.push({ order: x.order || 0, date: x.date || "", text: line(x.title || d.id, toUrl(x, d.id), toDesc(x)) });
      });
      rows.sort((a, b) => (a.order - b.order) || String(b.date).localeCompare(String(a.date)));
      return rows.length ? `\n\n## ${heading}\n${rows.map((r) => r.text).join("\n")}` : "";
    };
    let body = LLMS_HEADER.replace(/%o/g, origin);
    body += await section("Blog posts", "articles", (x, id) => `${origin}/blog/${x.slug || id}`, (x) => x.description || x.summary);
    body += await section("Case studies", "caseStudies", (x, id) => `${origin}/case-studies/${x.slug || id}`, (x) => x.summary);
    body += await section("Videos", "videos", () => `${origin}/videos`, (x) => x.description);
    body += await section("More pages", "pages", (x, id) => `${origin}/${x.slug || id}`, (x) => x.description);
    res.set("Content-Type", "text/plain; charset=utf-8");
    res.set("Cache-Control", "public, max-age=300, s-maxage=300");
    res.status(200).send(body + "\n");
  } catch (err) {
    console.error("getLlms failed:", err);
    res.status(500).send("");
  }
});

// ---------------------------------------------------------------------------
// CMS forms: accept a submission for a marketer-built form, validate against the
// form definition, store it (admin SDK — clients can't write submissions directly),
// email a notification, and return a gated download link if the form gates a file.
// Honeypot + per-IP rate limit guard against spam.
// ---------------------------------------------------------------------------
const FORM_MAX_PER_WINDOW = 12;
const FORM_GLOBAL_MAX = 300; // total across all IPs per window — bounds spam even if a single IP key is forged
const FORM_WINDOW_MS = 15 * 60 * 1000;
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"];

// Window-aware counter step for the rate limiter (returns the next {count, first}).
function rlNext(snap, now) {
  const d = snap.exists ? snap.data() : { count: 0, first: now };
  let count = d.count || 0; let first = d.first || now;
  if (now - first > FORM_WINDOW_MS) { count = 0; first = now; }
  return { count: count + 1, first };
}

// Shared per-IP + global rate limit (one transaction so bursts can't race past
// it). Returns true if over the limit. Used by every public email/form endpoint
// so none is an open relay. The global cap bounds total volume even when the
// per-IP key is forged on a direct call (App Check / CAPTCHA is the real fix).
async function enforceRateLimit(db, req, now) {
  const ipRef = db.collection("formRateLimit").doc(clientIp(req));
  const gRef = db.collection("formRateLimit").doc("global-counter");
  let limited = false;
  await db.runTransaction(async (tx) => {
    const [ipS, gS] = await Promise.all([tx.get(ipRef), tx.get(gRef)]);
    const ipd = rlNext(ipS, now);
    const gd = rlNext(gS, now);
    if (ipd.count > FORM_MAX_PER_WINDOW || gd.count > FORM_GLOBAL_MAX) { limited = true; return; }
    const expireAt = new Date(now + FORM_WINDOW_MS);
    tx.set(ipRef, { ...ipd, expireAt }, { merge: true });
    tx.set(gRef, { ...gd, expireAt }, { merge: true });
  });
  return limited;
}

function escapeHtml(v) {
  return String(v == null ? "" : v)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// Turn a stored gated-file download URL into a short-lived signed URL so the gate
// is time-limited + revocable (files live in the non-public files/ path). Falls
// back to the stored URL if signing isn't available, so the gate never breaks.
async function signedGatedUrl(downloadUrl) {
  try {
    const m = /\/o\/([^?]+)/.exec(downloadUrl || "");
    if (!m) return downloadUrl;
    const objectPath = decodeURIComponent(m[1]);
    const [url] = await admin.storage().bucket("insite-hub-web-blog").file(objectPath).getSignedUrl({
      version: "v4", action: "read", expires: Date.now() + 15 * 60 * 1000,
    });
    return url;
  } catch (e) {
    console.error("signed gated URL failed, using stored URL:", e.message || e);
    return downloadUrl;
  }
}

exports.submitForm = onRequest(async (req, res) => {
  if (setCors(req, res)) return;
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }
  try {
    const db = admin.firestore();
    const now = Date.now();
    const body = req.body || {};
    // Honeypot: a real user never fills this hidden field. Pretend success, store nothing.
    if (body._hp) { res.status(200).json({ success: true }); return; }

    const formSlug = String(body.formSlug || "");
    if (!formSlug) { res.status(400).json({ error: "Missing form." }); return; }

    const formSnap = await db.collection("forms").doc(formSlug).get();
    if (!formSnap.exists || formSnap.data().published !== true) { res.status(404).json({ error: "Form not found." }); return; }
    const form = formSnap.data();

    // Validate required fields + consent FIRST (so a user's typo never burns their
    // rate-limit budget, and invalid spam never reaches the counter/store).
    const data = (body.data && typeof body.data === "object") ? body.data : {};
    for (const f of (form.fields || [])) {
      if (f.required && !String(data[f.key] == null ? "" : data[f.key]).trim()) {
        res.status(400).json({ error: `Please fill in "${f.label || f.key}".` }); return;
      }
    }
    if (form.consentText && !body.consent) { res.status(400).json({ error: "Please accept to continue." }); return; }

    // Rate limit (per-IP + global cap) — validated above first so a typo never
    // burns budget and invalid spam never reaches the counter/store.
    if (await enforceRateLimit(db, req, now)) {
      res.status(429).json({ error: "Too many submissions. Please try again later." }); return;
    }

    // Keep only fields the form defines + only known UTM keys (drop/cap everything
    // else to prevent arbitrary/oversized data being stored).
    const allowed = new Set((form.fields || []).map((f) => f.key));
    const cleanData = {};
    Object.keys(data).forEach((k) => { if (allowed.has(k)) cleanData[k] = String(data[k] == null ? "" : data[k]).slice(0, 5000); });
    const cleanUtm = {};
    if (body.utm && typeof body.utm === "object") {
      UTM_KEYS.forEach((k) => { if (body.utm[k] != null) cleanUtm[k] = String(body.utm[k]).slice(0, 200); });
    }

    await db.collection("formSubmissions").add({
      formSlug, formName: form.name || formSlug,
      data: cleanData,
      utm: cleanUtm,
      consent: !!body.consent,
      createdAt: FieldValue.serverTimestamp(),
    });

    // Email notification (best-effort — never fail the submission if email errors).
    const to = parseEmails(form.notifyEmail || process.env.NOTIFY_EMAIL || DEFAULT_NOTIFY_EMAILS);
    if (to.length) {
      const rows = (form.fields || [])
        .map((f) => `<tr><td style="padding:6px 16px 6px 0;font-weight:bold;color:#666;">${escapeHtml(f.label || f.key)}</td><td style="padding:6px 0;">${escapeHtml(cleanData[f.key] || "")}</td></tr>`)
        .join("");
      const utmRows = Object.entries(cleanUtm)
        .map(([k, v]) => `<tr><td style="padding:6px 16px 6px 0;font-weight:bold;color:#999;">${escapeHtml(k)}</td><td style="padding:6px 0;color:#999;">${escapeHtml(v)}</td></tr>`)
        .join("");
      const subjectName = String(form.name || formSlug).replace(/[\r\n]+/g, " ").slice(0, 200);
      getTransporter().sendMail({
        from: getFromAddress(),
        to,
        subject: `New form submission: ${subjectName}`,
        html: `<h2>${escapeHtml(form.name || formSlug)}</h2><table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">${rows}${utmRows}</table>`,
      }).catch((e) => console.error("submitForm email failed:", e));
    }

    const out = { success: true };
    if (form.gated && form.gatedFileUrl) out.download = await signedGatedUrl(form.gatedFileUrl);
    res.status(200).json(out);
  } catch (err) {
    console.error("submitForm failed:", err);
    res.status(500).json({ error: "Submission failed — please try again." });
  }
});

// ---------------------------------------------------------------------------
// Scheduled publishing: content saved with a future publishAt (millis) stays a
// draft until its time arrives; this runs periodically and flips it live. Only
// publishAt (a range field) is queried, so no composite index is needed — once
// published, publishAt is removed so a doc is never reprocessed.
// ---------------------------------------------------------------------------
async function publishDueContent() {
  const db = admin.firestore();
  const now = Date.now();
  let count = 0;
  for (const col of ["articles", "caseStudies", "videos"]) {
    const snap = await db.collection(col).where("publishAt", "<=", now).get();
    if (snap.empty) continue;
    const batch = db.batch();
    snap.forEach((d) => {
      const upd = { publishAt: FieldValue.delete() };
      // Set status in lockstep with published so the editor's status<->published
      // invariant holds; otherwise a later edit-save would silently unpublish it.
      if (!d.data().published) { upd.published = true; upd.status = "published"; count += 1; }
      batch.update(d.ref, upd);
    });
    await batch.commit();
  }
  return count;
}

exports.publishScheduled = onSchedule("every 10 minutes", async () => {
  const n = await publishDueContent();
  if (n) console.log(`publishScheduled: published ${n} item(s).`);
});
