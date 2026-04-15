# InsiteHub Full Content Restore — Design

**Date:** 2026-04-14
**Status:** Approved for implementation planning

## Context

After a client meeting, the client wants the full content depth of the old single-file v4 site (`insitehub-website-v4.jsx`, 2,471 lines, 13 pages) restored into the current modular React app (5 pages under `src/`). The target audience — biopharma commercial L&D leaders — responds well to content density; it signals that InsiteHub knows the domain. The client specifically called out the "Where to Start" mega-menu as a feature they loved.

The restore is not a blind copy-paste. The current app has real upgrades worth keeping (Firebase email, mobile responsiveness, upgraded Loop visuals). The old content has rough edges worth cleaning (duplicate CTAs, placeholder handlers, desktop-only layouts, overstuffed heroes).

## Goals

1. Restore all 13 pages from v4 with their content intact.
2. Restore the "Where to Start" mega-menu in the nav, verbatim old structure.
3. Preserve every improvement made since the refactor (see "Kept upgrades" below).
4. Apply targeted editorial cleanup so the restore reads polished rather than nostalgic.

## Non-goals

- Introducing a routing library (`react-router` etc.) — current state-based page map continues to work.
- CMS or dynamic data sources — news, resources, announcements remain in-code arrays like old.
- Gated downloads or auth — resource cards are teasers linking to contact.
- Analytics or tracking — not in old, not added.
- Integrations with Linear, Figma, or other external systems.

## Route map (13 pages)

`App.jsx` grows from 5 to 13 entries in three parallel maps: page components, `PAGE_TITLES`, and meta description map. Same state-based `setPage` pattern as today.

| Route       | Page                 | Primary purpose                                                   |
|-------------|----------------------|-------------------------------------------------------------------|
| `home`      | `HomePage`           | Full 14-section landing page                                      |
| `platform`  | `PlatformPage`       | Forge / Atlas / Echo / Certify — closed-loop AI platform          |
| `advisory`  | `AdvisoryPage`       | 6-engagement advisory catalog                                     |
| `literacy`  | `LiteracyPage`       | AI Literacy Program — 6 role-targeted tracks                      |
| `insitex`   | `InsiteXPage`        | Enterprise LMS (traditional, non-AI path)                         |
| `content`   | `ContentPage`        | Content development services (AI-powered + traditional ID)        |
| `proxalab`  | `ProxaLabsPage`      | Structured AI experimentation, 4-phase model, case study          |
| `about`     | `AboutPage`          | Story, innovation proof points, full timeline                     |
| `news`      | `NewsPage`           | Announcements / partnerships / platform updates                   |
| `resources` | `ResourcesPage`      | Downloadable frameworks library                                   |
| `newsletter`| `NewsletterPage`     | Dedicated signup page with context + sample issues                |
| `contact`   | `ContactPage`        | 3-track form (current) + richer "What to expect" panel            |

## Navigation

### Desktop nav (`Nav.jsx` rebuild)

Left: `Logo · [Where to Start ▾] Platform · AI Literacy · InsiteX LMS · Advisory · Content · Proxa Labs · About`
Right: `[Contact] [Book a Demo]`

**"Where to Start" dropdown** — 7 situational entry points in a 600px-wide panel, 2-column grid, icon + title + desc + orange tag-pill per item:

| Icon | Title                               | Routes to    | Tag           |
|------|-------------------------------------|--------------|---------------|
| 🧭   | I need an AI strategy               | `advisory`   | Advisory      |
| 🔬   | I want to run an AI pilot           | `proxalab`   | Proxa Labs    |
| 🎓   | I need AI literacy training         | `literacy`   | AI Literacy   |
| 🚀   | I'm ready for a platform            | `platform`   | AI Platform   |
| 📚   | I need content for a launch         | `content`    | Content       |
| 🖥️   | I need an LMS first                 | `insitex`    | InsiteX LMS   |
| 💬   | I'm not sure yet                    | `contact`    | Book a Call   |

Dropdown is React-state-controlled (`dropOpen`), closes on outside click, route change, or Esc.

### Mobile nav

Current hamburger panel stays. Gets a collapsible "Where to Start" accordion at the top, followed by the 7 page links, then `[Contact]` + `[Book a Demo]` pinned at bottom. All 13 routes reachable from phone.

## Pages — content contract

Each page is a separate file under `src/pages/`. Each imports `HexMarkLarge` as needed, uses `setPage` for internal links, and contains the sections listed below.

### HomePage (14 sections)

1. Hero — headline, subhead, primary + secondary CTA, `LoopVisual` desktop / `LoopMobile` mobile
2. Announcements strip — latest 3 announcements (partnership / platform update / research)
3. Client logos band
4. Stats row (dark) — 4 stats (80–95%, 11mo, 84%, 25yrs)
5. Thought Leadership strip — 4 cards (guide, framework, research, template)
6. AI Literacy announcement band (orange gradient) — "NEW Program" with CTAs
7. Why InsiteHub — 4 differentiator cards (methodology / compliance / insider / experimentation)
8. AI Products preview — 4 cards (Forge / Atlas / Echo / Certify)
9. Inline CTA bar — "Talk to someone who's been in your seat"
10. Who InsiteHub Is For — 6 situation cards
11. Client story — 4-phase timeline + testimonial with 4 outcome stats
12. "For every stage" — 3 path cards + 5-step path sidebar
13. Thought leadership + newsletter signup — 2-column (feature list + dark signup card with `NewsletterInline`)
14. Final dark CTA — "The mandate is clear. The platform is ready."

### PlatformPage

Current content stays — already covers dark closed-loop SVG card, 4 product detail cards, UI preview grid, InsiteX callout, final CTA. Merge in any section from v4's PlatformPage that the current page lacks (comparison table vs other vendors, deeper product bullets, additional proof points). Zero sections from v4 PlatformPage get dropped.

### AdvisoryPage

- Hero (light)
- Diagnostic methodology intro
- 6 engagement cards in grid: Strategy & Roadmap Workshop · Readiness & Maturity Assessment · Learning Tech & GenAI Assessment · Governance & Compliance Framework · Infrastructure Assessment · AI-Optimized Org Design
- Each card: deliverable, duration, outcome
- Inline CTA bar
- Final dark CTA

### LiteracyPage

- Hero (light, "NEW Program" pill)
- "Why literacy first" argument
- 6 role-targeted tracks (reuses current `ServicesPage` literacy module grid)
- Program structure: 4 delivery models
- Outcomes band
- CTA

### InsiteXPage

- Dark hero
- Feature grid (SCORM/AICC/PMRC, credentialing, compliance, Veeva integration)
- Comparison row: InsiteX LMS vs AI Platform — when to pick which
- Compliance badges strip
- Transition path callout ("upgrade to AI when ready")
- CTA

### ContentPage

- Hero
- AI-powered (Forge) vs Traditional ID split
- 4 capability cards: AI-Powered Content · Traditional ID · MLR-Integrated Design · AI-Assisted Human Review
- Case example (a launch-window scenario)
- CTA

### ProxaLabsPage

- Hero
- 4-phase experimentation model (Define · Design · Measure · Business Case)
- 3 pilot-failure patterns
- Client case study (the one currently on HomePage can stay there AND live here)
- Research reference section (r=0.84)
- CTA

### AboutPage

Current About is trimmed. Restore:

- Hero (light)
- Our Story section (3 paragraphs)
- Innovation proof points (4): Vanguard Award virtual world · 100% gamified training adoption · NIH biomedical accelerator · Only closed-loop AI in commercial L&D
- Full timeline (2010 → present) — 5 milestones
- CTA

### NewsPage

- Hero (light)
- Filter chips (All / Partnerships / Platform Updates / Research)
- Card grid of announcements (tag, date, title, excerpt)
- Each card links to external source or in-app detail where relevant
- Newsletter signup footer strip

### ResourcesPage

- Hero
- Filter chips (All / Frameworks / Research / Templates / Scorecards)
- Card grid: AI Readiness Self-Assessment · Pilot Failure Taxonomy · Business Case Template · Vendor Evaluation Scorecard · Research briefs
- Cards are teasers — CTA is "Get it via email" which routes to `contact` with `track=learn` preselected
- Newsletter strip at bottom

### NewsletterPage

- Dedicated signup page with:
  - Context: "Frameworks, research, field notes — no vendor noise"
  - What you get (4 bullets)
  - Sample issues preview (3 past topics)
  - Inline signup form (shared component)
  - Social links

### ContactPage

Current 3-track form stays. Additions:

- Richer "What to expect" sidebar (4 path cards, restored from old)
- Address block (Newark, DE · 591 Collaboration Way, Suite 613)
- Resources teaser grid below the form (cross-link to `resources`)
- Keep Firebase wiring, error states, re-submission across tracks

## Components

### Existing — keep as-is

- `HexMark`, `HexMarkLarge` — no change
- `LoopVisual` — keep the upgraded glow + animated flow + labels-below version
- `LoopMobile` — keep
- `SocialIcon` — no change
- `useReveal` hook — no change

### Existing — rebuild

- `Nav` — add "Where to Start" mega-menu, 7 top-level links, mobile accordion
- `Footer` — restore 4-column structure (Brand · AI Platform · Services · Company), top newsletter bar, bottom compliance badges. Keep Firebase wiring.

### New

- `NewsletterInline` — shared inline signup form used on HomePage (thought-leadership section), NewsletterPage, and as a reusable block. Wires to `VITE_NEWSLETTER_FUNCTION_URL`. Shows sending state + success confirmation.
- `AnnouncementBand` — the orange AI Literacy announcement strip; generalized so a future announcement can swap in without duplicating markup.
- `SituationCard` — single reusable card for the "Who InsiteHub Is For" grid + Advisory engagement grid + similar. Props: icon, title, description, optional tag.
- `DiffCard` — single reusable card for the "Why InsiteHub" differentiator grid. Props: number, title, body, quote.
- `StepCard` — single reusable step row used in the "For every stage" 5-step path.

Resist further abstraction until patterns repeat at least three times. One-offs stay inline.

## Styles

Today's `src/styles.css` is missing classes the old pages reference (`.pg`, `.dg`, `.ag`, `.fc`, `.pc*`, `.ix-*`, `.pl-*`, `.ps*`, `.nav-drop*`, `.cta-bar*`, `.qb*`, `.stat-num`, `.cmp-*`). These already exist inside the v4 file's inline `<style>` template literal.

Lift those rules into `src/styles.css` **before** building pages that reference them. Unify with the existing responsive block and the 960px mobile breakpoint so mobile works on every restored page (the old v4 was desktop-only).

No CSS framework, no CSS-in-JS switch — plain stylesheet stays.

## Kept upgrades (non-negotiable)

The following carry forward from the current app into the restored site:

- **Firebase Cloud Functions** for contact + newsletter (`functions/index.js`, `submitContact`, `submitNewsletter`) with Gmail SMTP, CORS allowlist, validation
- **Mobile hamburger menu** + responsive CSS (960px breakpoint, utility grid classes)
- **LoopVisual** upgrade (animated dashed flow, per-node glow, labels outside circles, single-line center text)
- **LoopMobile** vertical-timeline component
- **Contact form re-submission** across tracks (sentTracks state) + error + loading states
- **Split CSS** (`src/styles.css`) — no inlined template-literal styles

## Editorial cleanup rules

**Guiding principle: every piece of old content lands in the new site. Cleanup is about presentation consistency, not trimming data.** If a section had 6 cards in v4, it has 6 cards in the restore. If a page had 8 paragraphs, it has 8 paragraphs. The client wants the data density — we don't cut to make it "cleaner."

What counts as cleanup (applied during implementation, not a separate pass):

- **CTA consistency** — standard pattern per section is one primary (`bp`) + one secondary (`bs`), occasional tertiary (`bt`). Merge duplicates that say the same thing twice; keep distinct ones.
- **Kill `onClick={()=>{}}` placeholder handlers** — every button routes somewhere or does something real (e.g., old line 858 "Schedule a Discovery Call" is a no-op; wire to `contact`).
- **De-duplicate the "NEW · Literacy" badge** — keep the launch band + badge on HomePage and the Literacy page; on unrelated pages, don't keep the badge just because v4 had it in the nav pill.
- **Swap emoji icons for the hex/SVG brand mark** where v4 used them as visual filler (timeline dots especially); keep emojis where they carry meaning (situation cards, product identity, track selector).
- **Remove "unsubscribe anytime" wording** from non-subscribe contexts where old code duplicated it.
- **Every page gets the 960px mobile treatment** — no page ships desktop-only (v4 was desktop-only). Content is preserved; layout reflows.
- **Hero polish, not hero trim** — if a v4 hero had two pills and a long headline, all of it stays; we just make sure it reflows cleanly on mobile and doesn't overflow viewport on desktop.

## Data shape

All content lives in-code as typed arrays/objects inside the page files, matching the existing pattern. No external data source, no CMS.

- Announcements: `[{tag, tagColor, date, title, p}]`
- Resources: `[{icon, color, tag, title, description, track}]`
- Engagements, phases, tracks: co-located inside their page files

## Error handling

- Form submissions: existing `try/catch` + user-facing error banner pattern stays
- Missing env vars (`VITE_CONTACT_FUNCTION_URL`, `VITE_NEWSLETTER_FUNCTION_URL`): form shows error banner, doesn't silently succeed
- 404 / unknown page: `App.jsx` already falls back to `HomePage` (`pages[page] || HomePage`) — no change

## Testing

- **Manual cross-page smoke test** — every route reachable from nav, every nav item reaches the right page, "Where to Start" items route correctly, mobile hamburger reaches every page
- **Mobile responsive check** — every page at 375px width (iPhone SE baseline), 768px (tablet), 1440px (desktop)
- **Form wiring check** — contact form across all 3 tracks with valid + invalid inputs; newsletter form from HomePage + Footer + NewsletterPage all hit the same function
- **Build** — `npm run build` clean, no warnings, `dist/` output loads in `firebase serve`

No automated test suite — UI-only app, existing project has no test harness; not adding one for this work.

## Implementation phasing

1. **Phase 1 — Foundation.** Nav rebuild + Footer rebuild + 13-route App.jsx + styles.css merge from v4 inline CSS. Verify every route returns a placeholder page.
2. **Phase 2 — Shared components.** `NewsletterInline`, `AnnouncementBand`, `SituationCard`, `DiffCard`, `StepCard`.
3. **Phase 3 — HomePage enrichment.** All 14 sections.
4. **Phase 4 — "Where to Start" destination pages.** Advisory, Literacy, Proxa Labs, Platform copy sweep, Content, InsiteX.
5. **Phase 5 — About enhancement + remaining pages.** About (full restore), News, Resources, Newsletter, Contact additions.
6. **Phase 6 — QA pass.** Mobile responsive sweep (all pages at 3 breakpoints), copy edit against cleanup rules, CTA audit (no no-op buttons), build + preview smoke test.

Each phase commits independently so the branch stays bisectable and the client can review progress.

## Open questions

None. Structural decisions locked in:

- Full 13-page restore (option A from brainstorming step 1)
- Old nav verbatim (option A from brainstorming step 2)
- All current improvements retained
- Content included from v4 with targeted editorial cleanup
