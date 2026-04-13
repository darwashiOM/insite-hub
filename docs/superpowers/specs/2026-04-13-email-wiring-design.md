# Email Wiring — Design Spec

**Date:** 2026-04-13
**Goal:** Wire the contact form and newsletter signup to send emails via Firebase Cloud Functions + Nodemailer (Gmail SMTP).
**Constraint:** Recipient email must be easily changeable via environment variables. Default to malekbinanas9@gmail.com.

---

## Context

The InsiteHub site has 2 forms that currently only set local state (no backend):
1. **Contact form** (`src/pages/ContactPage.jsx`) — collects name, email, company, role, interest, message, track (talk/learn/explore)
2. **Newsletter signup** (`src/components/Footer.jsx`) — collects email only

All "Book a Demo" / "Book a Discovery Call" buttons across the site navigate to the contact page — those are already wired correctly and don't need changes.

---

## Architecture

```
React (browser)
  → fetch POST to Firebase Cloud Function HTTPS endpoint
    → Cloud Function validates required fields
      → Nodemailer sends email via Gmail SMTP
        → Returns JSON { success: true } or { error: "message" }
```

Two Cloud Functions:
- `submitContact` — handles the contact form
- `submitNewsletter` — handles the newsletter signup

Both are HTTPS callable functions deployed to the existing `insite-hub-web` Firebase project.

---

## Cloud Functions

### `submitContact`

**Trigger:** HTTPS POST
**Input body:**
```json
{
  "name": "string (required)",
  "email": "string (required)",
  "company": "string (optional)",
  "role": "string (optional)",
  "interest": "string (optional)",
  "message": "string (optional)",
  "track": "talk | learn | explore"
}
```
**Validation:** name and email are required. Email must contain @.
**Email sent to:** `NOTIFY_EMAIL` env var
**Email subject:** `New InsiteHub inquiry from {name}`
**Email body:** HTML formatted with all submitted fields, including which track was selected.
**Reply-To:** Set to the submitter's email so the recipient can reply directly.

### `submitNewsletter`

**Trigger:** HTTPS POST
**Input body:**
```json
{
  "email": "string (required)"
}
```
**Validation:** email is required and must contain @.
**Email sent to:** `NOTIFY_EMAIL` env var
**Email subject:** `New newsletter subscriber: {email}`
**Email body:** Simple notification with the subscriber's email address.

### CORS

Both functions set CORS headers to allow requests from the Firebase hosting domain and localhost for development.

---

## Environment Variables

### `.env.example` (project root — committed to git)

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
# Edit NOTIFY_EMAIL above, then redeploy:
#   cd functions && firebase deploy --only functions
#
# ── To add more recipients ─────────────────────────────
# Use comma-separated emails:
#   NOTIFY_EMAIL=person1@company.com,person2@company.com
```

### `functions/.env` (actual secrets — gitignored)

Same format, with real values filled in.

---

## Frontend Changes

### `ContactPage.jsx`

- Add a `sending` state (boolean)
- On form submit: set `sending=true`, POST to the Cloud Function URL, on success set `sent=true`, on error show error message and re-enable button
- Button text changes: "Send Message →" → "Sending..." while in flight
- The Cloud Function URL is read from an environment variable `VITE_CONTACT_FUNCTION_URL` (set after first deploy)
- Error state: show a red-tinted message "Something went wrong. Please try again." and re-enable the form

### `Footer.jsx`

- Add a `sending` state (boolean)
- On subscribe: set `sending=true`, POST to the Cloud Function URL, on success set `subbed=true`, on error re-enable button
- Button text changes: "Subscribe" → "..." while in flight
- The Cloud Function URL is read from `VITE_NEWSLETTER_FUNCTION_URL`

### Vite environment variables

`.env` (project root, gitignored) and `.env.example` updated with:
```
VITE_CONTACT_FUNCTION_URL=https://us-central1-insite-hub-web.cloudfunctions.net/submitContact
VITE_NEWSLETTER_FUNCTION_URL=https://us-central1-insite-hub-web.cloudfunctions.net/submitNewsletter
```

These are read in the React code via `import.meta.env.VITE_CONTACT_FUNCTION_URL`.

---

## Files Created/Modified

### Create:
- `functions/index.js` — Cloud Functions (submitContact, submitNewsletter)
- `functions/package.json` — dependencies (firebase-functions, nodemailer, cors)
- `functions/.env` — actual SMTP credentials (gitignored)
- `.env.example` — template with instructions (committed)

### Modify:
- `firebase.json` — add functions configuration
- `.gitignore` — ensure functions/.env and .env are gitignored
- `src/pages/ContactPage.jsx` — wire form to Cloud Function
- `src/components/Footer.jsx` — wire newsletter to Cloud Function

---

## Deployment

After implementation:
1. `cd functions && npm install`
2. Copy `.env.example` values into `functions/.env` with real app password
3. `firebase deploy --only functions` — deploys the two Cloud Functions
4. Copy the function URLs into `.env` at project root
5. `npm run build && firebase deploy --only hosting` — deploys updated frontend
