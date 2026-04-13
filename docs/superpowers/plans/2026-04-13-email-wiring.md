# Email Wiring Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire the contact form and newsletter signup to send emails via Firebase Cloud Functions + Nodemailer (Gmail SMTP).

**Architecture:** Two Firebase Cloud Functions (`submitContact`, `submitNewsletter`) receive POST requests from the React frontend, validate input, send email via Gmail SMTP using Nodemailer, and return success/error JSON. Frontend forms show loading state during submission and error state on failure.

**Tech Stack:** Firebase Cloud Functions (Node.js), Nodemailer, Gmail SMTP, Vite env vars

---

## File Map

### Create:
- `functions/index.js` — two Cloud Functions: submitContact, submitNewsletter
- `functions/package.json` — dependencies
- `.env.example` — template with SMTP config instructions (committed)
- `functions/.env` — actual secrets (gitignored)

### Modify:
- `firebase.json` — add functions config
- `.gitignore` — add functions/.env and .env entries
- `src/pages/ContactPage.jsx` — wire form submit to Cloud Function
- `src/components/Footer.jsx` — wire newsletter submit to Cloud Function

---

### Task 1: Set up Firebase Functions project

**Files:**
- Create: `functions/package.json`
- Create: `functions/index.js`

- [ ] **Step 1: Initialize functions directory and package.json**

Create `functions/package.json`:

```json
{
  "name": "insitehub-functions",
  "description": "InsiteHub email Cloud Functions",
  "engines": {
    "node": "20"
  },
  "main": "index.js",
  "dependencies": {
    "firebase-admin": "^12.0.0",
    "firebase-functions": "^5.0.0",
    "nodemailer": "^6.9.0"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `cd functions && npm install`

Expected: node_modules created, package-lock.json generated.

- [ ] **Step 3: Create the Cloud Functions**

Create `functions/index.js`:

```js
const { onRequest } = require("firebase-functions/v2/https");
const nodemailer = require("nodemailer");

const ALLOWED_ORIGINS = [
  "https://insite-hub-web.web.app",
  "https://insite-hub-web.firebaseapp.com",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5180",
  "http://localhost:5181",
];

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

  const trackLabel = { talk: "Ready to talk", learn: "Want to learn first", explore: "Just exploring" }[track] || track;

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
      from: `"InsiteHub Website" <${process.env.SMTP_EMAIL}>`,
      to: process.env.NOTIFY_EMAIL,
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

  const { email } = req.body;

  if (!email || !email.includes("@")) {
    res.status(400).json({ error: "Valid email is required." });
    return;
  }

  const html = `
    <h2>New Newsletter Subscriber</h2>
    <p style="font-family:sans-serif;font-size:14px;">
      <strong>${email}</strong> just subscribed to the InsiteHub newsletter.
    </p>
  `;

  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: `"InsiteHub Website" <${process.env.SMTP_EMAIL}>`,
      to: process.env.NOTIFY_EMAIL,
      replyTo: email,
      subject: `New newsletter subscriber: ${email}`,
      html,
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email send failed:", err);
    res.status(500).json({ error: "Failed to send email. Please try again." });
  }
});
```

- [ ] **Step 4: Commit**

```bash
git add functions/package.json functions/package-lock.json functions/index.js
git commit -m "Create Firebase Cloud Functions for contact and newsletter email"
```

---

### Task 2: Configure environment, firebase.json, and gitignore

**Files:**
- Create: `.env.example`
- Create: `functions/.env`
- Modify: `firebase.json`
- Modify: `.gitignore`

- [ ] **Step 1: Create .env.example at project root**

Create `.env.example`:

```bash
# ── InsiteHub Email Configuration ──────────────────────
# Copy this file to functions/.env and fill in your values.
#
# STEP 1: Generate a Gmail App Password
#   1. Go to https://myaccount.google.com/apppasswords
#   2. Sign in to your Google account
#   3. Select "Mail" as the app, "Other" as the device (name it "InsiteHub")
#   4. Copy the 16-character password Google gives you
#
# STEP 2: Fill in the values below
#
# The Gmail account that sends the emails:
SMTP_EMAIL=malekbinanas9@gmail.com
#
# The app password from Step 1 (NOT your regular Gmail password):
SMTP_PASSWORD=xxxx-xxxx-xxxx-xxxx
#
# Where inquiry emails are delivered (can be any email address):
NOTIFY_EMAIL=malekbinanas9@gmail.com
#
# ── To change the recipient email ──────────────────────
# Edit NOTIFY_EMAIL above in functions/.env, then redeploy:
#   cd functions && firebase deploy --only functions
#
# ── To add more recipients ─────────────────────────────
# Use comma-separated emails:
#   NOTIFY_EMAIL=person1@company.com,person2@company.com
#
# ── Frontend Function URLs ─────────────────────────────
# After deploying functions, paste the URLs here and in .env:
VITE_CONTACT_FUNCTION_URL=https://submitcontact-<hash>.a.run.app
VITE_NEWSLETTER_FUNCTION_URL=https://submitnewsletter-<hash>.a.run.app
```

- [ ] **Step 2: Create functions/.env with the default email**

Create `functions/.env`:

```bash
SMTP_EMAIL=malekbinanas9@gmail.com
SMTP_PASSWORD=xxxx-xxxx-xxxx-xxxx
NOTIFY_EMAIL=malekbinanas9@gmail.com
```

- [ ] **Step 3: Update firebase.json to include functions**

Replace `firebase.json` with:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },
  "functions": {
    "source": "functions"
  }
}
```

- [ ] **Step 4: Update .gitignore**

Add these lines to the end of `.gitignore`:

```
# Environment secrets
.env
functions/.env
```

- [ ] **Step 5: Commit**

```bash
git add .env.example firebase.json .gitignore
git commit -m "Add env config, update firebase.json for functions, gitignore secrets"
```

---

### Task 3: Wire ContactPage.jsx to Cloud Function

**Files:**
- Modify: `src/pages/ContactPage.jsx`

- [ ] **Step 1: Add sending and error state, replace submit handler**

In `src/pages/ContactPage.jsx`, make these changes:

1. After line 7 (`const u=k=>e=>setForm(f=>({...f,[k]:e.target.value}));`), add:

```jsx
  const [sending,setSending]=useState(false);
  const [error,setError]=useState('');

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    setSending(true);
    setError('');
    try {
      const res = await fetch(import.meta.env.VITE_CONTACT_FUNCTION_URL || '/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, track }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (e) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };
```

2. Find the submit button (line 77):
```jsx
                <button className="fsub" onClick={()=>{if(form.name&&form.email)setSent(true)}}>
                  {track==="talk" ? "Send Message →" : track==="learn" ? "Send Me the Frameworks →" : "Send Me the Overview →"}
                </button>
```

Replace with:
```jsx
                {error && (
                  <div style={{background:"rgba(239,68,68,.07)",border:"1px solid rgba(239,68,68,.2)",borderRadius:10,padding:"12px 16px",marginBottom:16,fontSize:13,color:"#DC2626"}}>
                    {error}
                  </div>
                )}
                <button className="fsub" onClick={handleSubmit} disabled={sending} style={{opacity:sending?.6:1}}>
                  {sending ? "Sending..." : track==="talk" ? "Send Message →" : track==="learn" ? "Send Me the Frameworks →" : "Send Me the Overview →"}
                </button>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/ContactPage.jsx
git commit -m "Wire ContactPage form to Firebase Cloud Function with loading and error states"
```

---

### Task 4: Wire Footer.jsx newsletter to Cloud Function

**Files:**
- Modify: `src/components/Footer.jsx`

- [ ] **Step 1: Add sending state and async handler**

In `src/components/Footer.jsx`, make these changes:

1. After line 9 (`const [subbed,setSubbed]=useState(false);`), add:

```jsx
  const [sending,setSending]=useState(false);

  const handleSubscribe = async () => {
    if (!email) return;
    setSending(true);
    try {
      const res = await fetch(import.meta.env.VITE_NEWSLETTER_FUNCTION_URL || '/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setSubbed(true);
      }
    } catch (e) {
      // Silently fail for newsletter — not critical
    } finally {
      setSending(false);
    }
  };
```

2. Find the subscribe button (line 53):
```jsx
                <button className="fn-btn" onClick={()=>{if(email)setSubbed(true)}}>Subscribe</button>
```

Replace with:
```jsx
                <button className="fn-btn" onClick={handleSubscribe} disabled={sending}>{sending ? "..." : "Subscribe"}</button>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.jsx
git commit -m "Wire Footer newsletter to Firebase Cloud Function with loading state"
```

---

### Task 5: Deploy functions, get URLs, create .env, rebuild and deploy

- [ ] **Step 1: Upgrade Firebase project to Blaze plan (if not already)**

The user must verify their Firebase project is on the Blaze (pay-as-you-go) plan. Cloud Functions require it.

Run: `firebase projects:list` to confirm the project. Then check at https://console.firebase.google.com/project/insite-hub-web/usage/details — if it says "Spark", upgrade to Blaze.

- [ ] **Step 2: Set up the Gmail app password**

The user needs to:
1. Go to https://myaccount.google.com/apppasswords
2. Generate an app password for "Mail" / "Other (InsiteHub)"
3. Copy the 16-character password
4. Edit `functions/.env` and replace `xxxx-xxxx-xxxx-xxxx` with the real app password

- [ ] **Step 3: Deploy the Cloud Functions**

Run: `firebase deploy --only functions 2>&1`

Expected: Both functions deploy successfully. The output will show URLs like:
```
✔ functions[submitContact(us-central1)] Successful create operation.
Function URL (submitContact(us-central1)): https://submitcontact-<hash>-uc.a.run.app
✔ functions[submitNewsletter(us-central1)] Successful create operation.
Function URL (submitNewsletter(us-central1)): https://submitnewsletter-<hash>-uc.a.run.app
```

- [ ] **Step 4: Create .env at project root with function URLs**

Create `.env` in the project root with the actual URLs from the deploy output:

```bash
VITE_CONTACT_FUNCTION_URL=https://submitcontact-<hash>-uc.a.run.app
VITE_NEWSLETTER_FUNCTION_URL=https://submitnewsletter-<hash>-uc.a.run.app
```

Replace `<hash>` with the actual hash from the deploy output.

- [ ] **Step 5: Build and deploy hosting**

Run: `npm run build && firebase deploy --only hosting`

Expected: Build succeeds, hosting deploys.

- [ ] **Step 6: Test the contact form**

Go to https://insite-hub-web.web.app, navigate to Contact, fill in the form with a test name and email, and submit. Verify:
1. Button shows "Sending..."
2. Success message appears
3. Email arrives at malekbinanas9@gmail.com

- [ ] **Step 7: Test the newsletter signup**

Scroll to the footer, enter a test email, click Subscribe. Verify:
1. Button shows "..."
2. Success message appears
3. Email arrives at malekbinanas9@gmail.com

- [ ] **Step 8: Push to GitHub**

```bash
git push
```
