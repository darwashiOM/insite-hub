# Proxa Labs CMS — Design Spec

**Status:** Approved (design). Phase 1 build pending.
**Date:** 2026-06-28
**Stack:** React + Vite SPA · Firebase Hosting + Functions (2nd gen) · GitHub Actions deploy on push to `main`.

## Goal

A password-protected CMS, built on the site's existing Firebase, that lets non-technical editors change site content with no code. Content moves out of hardcoded JSX into a database; the public site reads it live; a hidden admin area edits it.

## Auth requirements (from the user)

- **Single hard password.** No email, no per-user accounts.
- Admin lives at a non-guessable path: **`/noonewillfindthis`** (also `noindex`).
- Editors: non-technical (e.g. Mercy). Editing must be simple.

## Scope

- **Phase 1 (this build):** the CMS engine (Firestore content store + password admin + image upload) **and** the blog fully editable. Migrate the existing "The Readiness Gap" post into Firestore. Shippable on its own.
- **Phase 2+ (later, not now):** bring other pages (homepage hero, contact info, etc.) under the same admin, one at a time. The Phase 1 foundation is reused unchanged.

## Architecture

```
[Public visitor] → SPA → Firestore (read published content)            ← live, instant
[Editor] → /noonewillfindthis → password → Cloud Function (verify) → custom token
         → signed-in admin session → write to Firestore / upload to Storage
```

### 1. Content store — Firestore
- Collection `articles/{id}`: one document per blog post. Shape mirrors the existing
  `ArticleLayout` data contract so the rendering component barely changes:
  `slug, pillar, title, description, author{name,role,headshot,bio}, date, readTime,
   summary(html), toc[{id,label}], body[{type:'p'|'h2'|'quote', ...}], related[],
   thumb, published(bool), createdAt, updatedAt, order`.
- Phase 2+: `pages/{pageId}` documents for non-blog content (out of scope now).
- Images: Firebase Storage under `blog/`. Public read; admin-only write.

### 2. Public site (read path)
- Add the Firebase **client SDK**; a small `src/lib/firebase.js` initializes it (public web
  config — not secret).
- `BlogIndexPage` and the article page fetch published articles from Firestore at load
  (replacing the static `src/data/articles.js` import). Loading + empty states added.
- **Instant publishing:** a publish in the admin is visible on the site immediately; no rebuild.

### 3. Admin (`/noonewillfindthis`)
- A `noindex` route in the same SPA. Renders a **login gate** until authenticated.
- **Login:** password field → `POST` to Cloud Function `adminLogin`.
- **Editor (once in):**
  - Article list (published + drafts) with status, edit, delete, new.
  - Article form: all fields above; a **block editor** for the body (add / reorder / remove
    paragraph, heading, quote blocks; headings carry the TOC anchor id); thumbnail upload;
    **Draft ⇄ Published** toggle.
  - **Logout** button.

### 4. Auth & security design (critical)
- **Password never ships to the browser.** It is stored as a Firebase **secret**
  (`ADMIN_PASSWORD`), set by the user via `firebase functions:secrets:set` — Claude never
  sees or sets it.
- **`adminLogin` Cloud Function:** constant-time compare of the submitted password against
  the secret. On success, mint a Firebase **custom token** for a fixed uid `site-admin` with
  developer claim `admin: true` (`firebase-admin createCustomToken`). Return it.
- **Client** calls `signInWithCustomToken(token)` → Firebase Auth session whose ID token
  carries `admin: true`.
- **Firestore rules:**
  - `articles`: `read` if `resource.data.published == true` **or** `request.auth.token.admin == true`;
    `write` only if `request.auth.token.admin == true`.
- **Storage rules:** public `read`; `write` only if `request.auth.token.admin == true`.
- **Brute-force protection:** `adminLogin` records failed attempts (per IP) in Firestore and
  locks out after N failures within a window; constant-time compare; minimal error detail.
- Firebase **Anonymous/Custom auth** provider enabled (needed for `signInWithCustomToken`);
  no email provider.
- HTTPS only (Firebase Hosting). Admin route is `noindex, nofollow`.
- **Accepted tradeoff:** one shared password = anyone holding it can edit the whole site.
  Mitigations: strong password, secret storage, lockout, logout, easy rotation (re-set secret).

### 5. Deployment
- New: `firestore.rules`, `firestore.indexes.json`, `storage.rules`; `firebase.json` gains
  `firestore` + `storage` config and a rewrite for `adminLogin` (e.g. `/api/admin-login`).
- Deploy order: Firestore/Storage rules + Functions (`firebase deploy`), then Hosting
  (staging preview channel). Production only after preview approval (per repo workflow).
- User one-time setup: enable Firestore + Storage + Custom-token auth in the Firebase console
  (or via CLI), and set the `ADMIN_PASSWORD` secret.

## Migration
- Seed the existing `readinessGap` object (from `src/data/articles.js`) into Firestore as the
  first `articles` document (`published: true`). After cutover, the static file is no longer
  the source of truth (kept or removed in a follow-up).

## Out of scope (Phase 1)
- Editing non-blog pages (Phase 2+). Multi-user accounts. Roles/permissions. Content
  versioning/history beyond Firestore. Scheduled publishing. Related-articles auto-wiring.

## Open items
- Block editor richness (start minimal: paragraph/heading/quote, matching the current model).
- Whether to keep `src/data/articles.js` as a fallback during cutover (lean: remove after seed verified).

## Deploy runbook (important)

GitHub Actions (`.github/workflows/deploy.yml`) deploys **Hosting only** on push to `main`.
The CMS's Cloud Function + security rules are **not** deployed by CI, so deploy them
**manually before** pushing/merging to main (order matters — the function and rules must
exist before the Hosting deploy ships the `/api/admin-login` rewrite and the Firestore-backed blog):

```
# 1. one-time: set the admin password secret (interactive; never in code)
firebase functions:secrets:set ADMIN_PASSWORD --project insite-hub-web

# 2. deploy backend (functions + rules) BEFORE hosting
firebase deploy --only functions,firestore:rules,storage --project insite-hub-web

# 3. then hosting (or let the push-to-main CI do it)
```

A future improvement is to add a `firebase deploy --only functions,firestore:rules,storage`
step to deploy.yml (before the hosting step) using the existing service-account secret.
