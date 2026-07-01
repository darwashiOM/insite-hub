# Proxa Labs CMS — Handoff & Acceptance Report

_Last updated: 2026-07-01. Branch: `cms/full-build` (local only — not yet deployed)._

This is the operator guide + honest status of the CMS built against Mercy's
"Content Management System — Requirements Specification" (June 2026). It covers
what a marketer can do, what's verified, what still needs the client, and how to
deploy. It exists to satisfy Guiding Principle 5 ("built to hand off").

---

## 0. Update — round-2 gap features + audit (2026-07-01)

A second pass closed most of the "partial/missing" gaps from §3 below and then
adversarially audited the new code (a 19-agent workflow: 11 issues found, all
confirmed, **all fixed**). What's now added on top of the original build:

- **Case studies & videos** reach full parity with the blog: per-item SEO
  (search title, canonical, social image, hide-from-search), **schedule**, and
  **live preview**; case studies emit Article + Breadcrumb structured data.
- **Three-state workflow**: Draft / Ready for review / Published on every type.
- **Two roles**: admin (everything) + **editor** (content only — no Site pages /
  Navigation / Redirects / custom-code), via a second password `EDITOR_PASSWORD`.
- **Activity log**: an append-only, admin-only record of every save + delete
  (validated in the rules so it can't be forged), shown in an Activity tab.
- **Page builder**: linkable from nav + CTA buttons; social image + canonical +
  structured-data-type + admin-only custom-code; **Form**, **Logo strip** and
  **Formatted text** section blocks; **duplicate** any page/post.
- **Rich-text editor** (bold/italic/link/list) for post + section copy.
- **Media**: uploads auto-downscale large photos; documents (PDF etc.) can live in
  the library; video **captions** (.vtt).
- **Visible breadcrumbs**; **per-page SEO for the fixed marketing pages** (baked
  into the prerender); **site search**; **security headers**; **GTM** support.

Audit fixes worth knowing: the scheduled-publish function now keeps `status` in
sync with `published` (a scheduled post no longer silently unpublishes on the next
edit); the prerender serves `/api/content` so marketer SEO overrides bake into the
static HTML; custom-code is admin-only and no longer double-injected; built-page
slugs can't collide with real routes.

The rest of this document (the acceptance matrix, deploy runbook, needs-you list)
still applies; where §3 said "partial/missing" for the items above, treat them as
**built** now. Still outstanding: admin-form label a11y (internal-tool), a strict
CSP (deferred for the custom-code slot), and the schema-driven content model.

---

## 1. What it is

A content management layer on top of the existing hand-built Proxa Labs site
(React + Vite SPA, Firebase backend: Firestore, Cloud Functions v2, Hosting,
Storage). Content is stored in Firestore and rendered through the **real site
components**, so nothing changes the design. The public marketing pages don't
ship the Firebase SDK (content comes from a cached `/api/content` function); only
the blog/case-studies/videos/forms/landing pages and the admin load the SDK.

## 2. How to operate it (marketer guide)

- **Admin URL:** `/noonewillfindthis` (deliberately unguessable, `noindex`).
- **Login:** one shared password (set as the `ADMIN_PASSWORD` server secret — the
  developer/Anas sets it; it never appears in code). Enter it → you're in.
- **The admin has 10 tabs:**
  | Tab | What it does |
  |---|---|
  | Blog | Create/edit/schedule blog posts; topics, tags, featured, author, per-post SEO, live preview, version history |
  | Case studies | Client/industry/challenge/results + highlight stats, version history |
  | Videos | Paste a YouTube or direct video link, thumbnail, length, topic, **publish date**, transcript |
  | Forms | Build a form (field types, required, dropdowns), gate a file behind it, set notify emails + consent, view/export submissions (CSV) |
  | Landing pages | Build a page from the section kit (hero, text+image, feature cards, stat band, pull quote, CTA, FAQ); reorder/fill sections; per-page SEO; preview; publish |
  | Authors | Reusable author profiles (name, title, bio, headshot, links) |
  | Media | Upload/browse/search images, give alt text, copy a link to reuse |
  | Site pages | Edit the copy on the fixed marketing pages (home, platform, etc.) |
  | Navigation | Edit the Platform/Solutions/Resources header menus |
  | Redirects | Map an old URL to a new one |

- **Publishing is instant for site visitors** (the live SPA reads Firestore). **But
  the sitemap and the prerendered/crawlable HTML only regenerate on a developer
  build+deploy** — see §5 and the limitation in §7. So a freshly published post is
  live for humans immediately, but not in the sitemap / not prerendered for
  crawlers until the next deploy.

## 3. S13 acceptance status (honest)

Legend: ✅ done · 🟡 done but needs a client input to be _live_ · ⚠️ partial · ❌ not built.

1. **Publish/edit/schedule/roll back a blog post, case study & video with all SEO/AI
   settings** — ⚠️ Blog: ✅ full (schedule, preview, version history, SEO/AEO fields).
   Case study & video: content + version history ✅, but **no schedule/preview
   pickers in their editors** and **no per-item SEO fields** (metaTitle/canonical/
   ogImage/noindex) — the blog has these, case studies/videos don't yet.
2. **Build a landing page from the kit, set its search settings, publish, looks
   hand-built** — ⚠️ Building + on-brand rendering ✅. Gaps: can't set a social
   image or canonical for a built page; **can't add the new page to the nav or
   link a button to it** (the destination list is fixed — see §7); no "form" or
   "logo strip" section block; no page-duplicate.
3. **Create a form, gate a file, submit, stored + notified + exportable** — 🟡 All
   built and the gate is now secure (§4). Notification email needs SMTP secrets
   set (§4). Gated file can now be a PDF.
4. **GA4 tracking page views + key actions** — 🟡 Page views + `generate_lead`
   (form submit) + `file_download` (gated download) are wired. **No-op until a GA4
   Measurement ID is set** (`VITE_GA4_MEASUREMENT_ID`).
5. **Sort & filter blog by topic, author, date on the live site** — ✅.
6. **Add a redirect, sitemap updates, structured data correct for article & FAQ** —
   ⚠️ Redirect tool ✅ (client-side; see §7). Article + FAQ JSON-LD ✅ and baked
   into prerendered HTML. **Sitemap only updates on a developer rebuild**, not when
   a marketer publishes.
7. **Pages load fast + pass accessibility checks** — ⚠️ Architecture is fast (CDN,
   prerender, caching, code-split). **No captured Lighthouse/axe report exists**,
   and there are known admin a11y gaps (§6). Run these before sign-off.

## 4. Security posture (post-audit)

Fixed in this hardening pass:
- **Gated-download bypass closed.** The full form doc (notify email + gated file
  URL) is admin-only; the public renders a stripped `formsPublic` mirror. The
  gated URL is only returned by `submitForm` after a valid submission, and gated
  files live in a non-public `files/` Storage path.
- **`submitContact` / `submitNewsletter` are no longer an open email relay** — they
  got the honeypot + per-IP/global rate limit `submitForm` already had, plus HTML
  escaping and subject-newline stripping (no injection into staff notifications).
- **`VITE_PRERENDER` can no longer affect a production build** (a stray env var
  can't point the live site at the local emulator).

Remaining (needs client keys / later work):
- **Per-IP rate limit is forgeable on direct (non-Hosting) function calls.** The
  global cap is the honest backstop. Real fix: **Firebase App Check or a CAPTCHA**
  (needs keys) + reject non-Hosting invocation.
- **No `firebase.json` security headers** (CSP / HSTS / X-Frame-Options) — add before go-live.
- **Single shared password, no per-user roles or audit log** (see §7, task #15).

## 5. Deploy runbook

Nothing here is deployed yet. When ready (after client sign-off on a preview):

1. **Set required secrets/env** (see §6).
2. **Rules:** `firebase deploy --only firestore:rules,storage:rules` (this pass adds
   `formsPublic`, the admin-only `forms`, and the `files/` Storage path).
3. **Functions:** `firebase deploy --only functions` (contact/newsletter now share
   the rate limiter; `submitForm` unchanged externally).
4. **Prerender + hosting:** `npm run build:prerender` then `firebase deploy --only
   hosting`. `build:prerender` runs `vite build` (production, reads **production**
   Firestore for slugs — needs Application Default Credentials, e.g. `gcloud auth
   application-default login`) then snapshots every route to static HTML +
   regenerates the sitemap. CI needs `npx playwright install chromium`.
   - To make publishing update the sitemap/crawlable HTML **automatically**, wire
     `build:prerender` into a scheduled or publish-triggered rebuild (a follow-up).
5. **Migrations after deploy:**
   - **Re-save each existing form once** so its `formsPublic` mirror is created
     (older forms predate the split and won't render publicly until re-saved).
   - Confirm Firestore PITR + scheduled backups are actually on (see §7).

_Local verification build (reads the emulator):_ `vite build --mode prerender` with
`VITE_PRERENDER=1` + `FIRESTORE_EMULATOR_HOST=127.0.0.1:8080 node scripts/prerender.mjs`.

## 6. What the client must provide before go-live

None of these are doable by a non-technical person alone; all block full acceptance:

- **GA4 Measurement ID** → `VITE_GA4_MEASUREMENT_ID` (analytics is a no-op without it).
- **Production domain** → `VITE_SITE_URL`. **Default is `https://www.insitehub.com`**
  but the brand is now Proxa Labs — every canonical/og:url/sitemap/JSON-LD/`llms.txt`
  URL is wrong until this is set to the real production domain. `public/llms.txt`
  also hardcodes `insitehub.com` and should be updated.
- **OG share image** (~1200×630) → `VITE_OG_IMAGE`.
- **`ADMIN_PASSWORD`** secret (the shared admin password).
- **`EDITOR_PASSWORD`** secret (optional) — set it to enable the editor role /
  second login; leave unset to keep admin-only. Bind it to the functions so it's
  in `process.env` (e.g. `firebase functions:secrets:set EDITOR_PASSWORD`).
- **SMTP creds** (`SMTP_EMAIL` / `SMTP_PASSWORD`) — form/contact notification email
  is fire-and-forget; a bad/missing config fails silently.
- **Form CAPTCHA / App Check keys** — for the durable spam fix.
- **Custom domain + TLS** setup in the Firebase console.
- **Editor/admin logins** — required for roles + audit log (task #15); Claude can't
  create accounts.

## 7. Known limitations / deferred (be transparent with the client)

- **Roles & audit log not built (§10).** One shared password = one all-powerful
  identity; version history can't be attributed to a person. (Task #15.)
- **Publish ≠ crawlable without a developer.** Sitemap + prerendered HTML +
  `llms.txt` only regenerate on a build/deploy, not on Publish. Live SPA is fine
  for human visitors immediately.
- **Case study / video editors lack** schedule + preview pickers and per-item SEO
  fields (the backend scheduler already covers them; the UI doesn't expose it).
- **Landing pages can't be linked from the nav or a button** (fixed destination
  list), can't set social image/canonical, have no form/logo-strip block, and
  can't be duplicated.
- **No rich-text field** — blog body formatting is via HTML blocks; section body
  copy is plain text.
- **Media library is images only** (no general file manager); alt text is warned
  but not enforced; no auto-resize/optimize.
- **Redirects are client-side**, not true 301s (no `firebase.json` redirects block).
- **Backups:** an earlier commit says PITR + daily backups were enabled out-of-band
  via gcloud; there is **no artifact in the repo** — verify this is actually on.
- **Admin form-field accessibility:** labels aren't associated with inputs
  (`htmlFor`/`id`) in the admin editors (the public `CmsForm` is fine). Fix pattern:
  give each input an `id` and its `<label>` a matching `htmlFor` (see `AdminLogin.jsx`).
- **No schema-driven content model** (task #17) — adding a field/type needs a developer.
- **Site search** (§12/§14) — optional, not built (client decision).

## 8. What's been verified (locally, on the emulator)

Login; blog create/edit/schedule/version-restore; case study & video CRUD; author
picker; media upload/browse/alt/search; nav editing; redirect (old→new); form
build/submit/store/CSV/honeypot/rate-limit/gating; the `formsPublic` split (public
page renders from the stripped mirror, secrets stay server-side); the page builder
(build/reorder/fill/save/publish, renders on-brand at `/slug`); FAQ + FAQPage
JSON-LD; and full prerender (19 routes → static HTML with body + meta + canonical +
Article/FAQ/VideoObject JSON-LD, sitemap regenerated). The scheduled-publish
function's logic is verified directly (it won't fire in the emulator — needs deploy).
