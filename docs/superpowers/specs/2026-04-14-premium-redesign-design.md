# InsiteHub Premium Redesign — Design Spec

**Date:** 2026-04-14
**Status:** Approved for implementation planning
**Builds on:** `docs/superpowers/specs/2026-04-14-full-content-restore-design.md` (the content restore that landed all 13 pages of v4 data into the modular React app)

## Context

The content restore is shipped — every piece of v4 data lives in the modern app, mobile-responsive, Firebase-wired. The client wants the next pass: keep all the data, lift the visual polish to "premium" so a senior pharma exec (CCO, VP L&D) reads the site and trusts that InsiteHub is a peer-grade buyer, not a startup vendor.

The brand colors are locked: orange `#F4801F`, dark `#12141A`, neutral grays, hex 4-cluster brand mark, Manrope (headings) + DM Sans (body). Layout, composition, hierarchy, iconography, motion, and per-page section flow are all in scope.

## Goals

1. Replace visual noise (60+ emojis, rainbow color tags) with disciplined iconography + restrained color palette.
2. Replace the universal "hero + 3 card grids + CTA" page skeleton with a 10-pattern section library that lets each page compose richer rhythm.
3. Add real product credibility visuals — large mockup blocks for Forge / Atlas / Echo / Certify.
4. Cut the button rainbow — one primary CTA per page, mid-section CTAs become quiet text links.
5. Enforce a strict spacing + type scale across all 13 pages so vertical rhythm becomes the silent quality signal.

## Non-goals

- New routing or backend changes.
- Changes to the brand color palette, typeface choices, or hex brand mark.
- Fresh photography or stock imagery (would lift further but is multi-week and outside scope).
- Live product screenshots — the showcase blocks are designed mockups, not real product UI captures.
- CMS for news/resources content.
- A/B testing infrastructure or analytics changes.
- Routing library swap (state-based router stays).
- New content. Every word, stat, and case study already lives in the v4 restore — this pass changes presentation, not data.

## Foundation — design system tokens

### Spacing scale (strict)

Five tokens, single source in `styles.css` as CSS custom properties:

```
--space-1: 4px
--space-2: 8px
--space-3: 16px
--space-4: 24px
--space-5: 32px
--space-6: 48px
--space-7: 64px
--space-8: 96px
--space-9: 128px
```

- Section vertical padding (desktop): `var(--space-8)` = 96px
- Section vertical padding (mobile): `var(--space-6)` = 48px
- Card padding compact: `var(--space-4)` = 24px
- Card padding standard: `var(--space-5)` = 32px
- Card padding hero/feature: `var(--space-6)` = 48px
- Stack gap inside sections: `var(--space-3)` = 16px between bullets, `var(--space-5)` = 32px between subsections

No more 20 / 26 / 28 / 34 px one-offs. Audit every page and snap to the scale.

### Type scale (six sizes max)

```
--text-display: clamp(48px, 5.5vw, 64px)   /* 1× per page max — landing hero */
--text-h1:      clamp(36px, 4.2vw, 48px)   /* page heros */
--text-h2:      clamp(26px, 3.0vw, 32px)   /* section headings */
--text-h3:      22px                        /* subsection / card titles */
--text-body:    16px                        /* paragraphs */
--text-small:   13px                        /* captions, metadata */
--text-eyebrow: 11px                        /* tracked uppercase labels */
```

Two weights per role:
- Headings: 700 (default) / 900 (display + emphatic H1 only)
- Body: 400 (default) / 500 (lead paragraphs and links)
- Eyebrow: 700 with `letter-spacing: 0.14em; text-transform: uppercase`

Replace ~all inline `style={{fontSize:...}}` overrides with these classes/vars. The current site uses 12+ different sizes inline; reduce to 6 across the entire app.

### Color discipline

**Primary palette (95% of all surfaces):**
- `--o` = `#F4801F` orange (single accent)
- `--o10`, `--o20` = orange tints
- `--dk` = `#12141A` dark / `--dk2` = `#1A1D25`
- `--bd` = `#5C6370` body text gray
- `--bdl` = `#8B919A` light gray
- `--br` = `#E3E5EA` border
- `--lt` = `#F5F6F8` light surface
- `--wh` = `#FFFFFF`

**Product accent colors (restricted):**
- Forge orange `#F4801F` — only on Forge product blocks
- Atlas blue `#007AFF` — only on Atlas product blocks
- Echo purple `#7C3AED` — only on Echo product blocks
- Certify green `#059669` — only on Certify product blocks

These four colors **never appear together in the same section** unless the section is literally about the closed loop (HomePage closed-loop block, PlatformPage closed-loop diagram). Currently the site uses these 4 colors as decorative tags on unrelated cards (thought leadership tags, situation card highlights). That stops.

### Icon system

**Today:** ~60 emoji glyphs across the site. Audit list:
- HomePage: 🎯🔥⏱️🔍📊🏗️🤖🧭🔬🌐🎮🏛️🔄🗺️📋📊📈🧠📚
- AdvisoryPage: 🧭🎯📋⚖️🏗️📐
- LiteracyPage: 🧠⚖️✍️🎭📊🗺️
- ProxaLabsPage: 🎯🔬📈📋🔥📐❓
- ContentPage: 🤖✍️⚖️🔄
- ContactPage: 🗣️📚🔍🔍📋📚🗺️
- ResourcesPage: 📋🗺️📊🔬⚖️🧠🎭📈
- NewsPage: 🌐🔗📊🚀🤝⚡
- NewsletterPage: 🔬📣📋🧠
- Nav "Where to Start": 🧭🔬🎓🚀📚🖥️💬

**New:** A 30-icon custom SVG set, all 24×24, stroke-width 1.6, single-color (current text color or `var(--o)` orange), built from a geometric vocabulary that complements the hex brand mark. Style reference: Phosphor or Lucide — clean, single-stroke, calm.

Icons live in a single component: `src/components/Icon.jsx` exporting a `<Icon name="strategy" />` API. The 30 names cover the semantic categories the site needs:

```
strategy · pilot · literacy · platform · content · lms · chat
methodology · compliance · readiness · mlr · governance · infrastructure · org-design
agent · pathway · roleplay · audit · gap · remediation
research · framework · template · checklist · field-notes
partnership · update · launch · award · timeline
```

**Where emojis stay:** the four product identities — `⚡` Forge, `🎓` Atlas, `🎭` Echo, `✅` Certify. These read as distinct product brands and earn their place in product-showcase contexts. Everywhere else: replaced with custom icons.

## Section pattern library

Define ten reusable section components that every page composes from. Each pattern has one job, a clear interface, and a single visual personality.

### Pattern 1: `<EditorialHero>`

Page-top hero. Used by every page exactly once.

**Anatomy:**
- Eyebrow (optional)
- Display headline (1-3 lines, uses `--text-display`)
- Subhead paragraph (max 3 lines, `--text-body * 1.2` size)
- One primary CTA + optional one quiet text-link secondary
- Optional right-side visual element (LoopVisual on Home, HexMarkLarge watermark on others, full-bleed image slot reserved for future photography)

**Props:** `eyebrow`, `headline` (JSX for em tags), `subhead`, `primaryCta`, `secondaryLink`, `visual` (component slot)

### Pattern 2: `<SplitFeature>`

Concept + visual side-by-side. The single most useful pattern for varying rhythm.

**Anatomy:** Two-column grid (60/40 or 50/50, prop-driven). One side has prose (eyebrow + H2 + body + bullet list + optional CTA). Other side has a visual block (mockup, diagram, callout card, image).

**Props:** `ratio` ('60-40' | '50-50' | '40-60'), `eyebrow`, `heading`, `body`, `bullets[]`, `cta`, `visual` (component slot), `reverse` (bool to flip side)

### Pattern 3: `<CardGrid>`

3-up or 2-up card grid. **Restricted use** — only for genuinely card-shaped content (advisory engagements, role tracks, situation cards, framework downloads). Not the default for everything.

**Props:** `columns` (2 | 3 | 4), `cards[]` (each `{icon, title, body, link?, accent?}`), `cardStyle` ('compact' | 'standard' | 'feature')

### Pattern 4: `<LongForm>`

Single-column rich-text section, max 720px wide. For methodology, story, deep-dive prose. The pattern that lets the site read like editorial content.

**Anatomy:** Eyebrow + H2 + 2-4 paragraphs + optional inline pull-quote + optional inline list + optional CTA at end.

**Props:** `eyebrow`, `heading`, `children` (rich JSX content), `pullQuote`, `cta`

### Pattern 5: `<PullQuote>`

Standalone testimonial. Full-bleed (or section-width), large italic text, attribution row, optional stats column.

**Anatomy:** Big opening quote mark (decorative), italic quote text (`--text-h3` size), attribution avatar/initials + name + title + company, optional 4-stat column on the right.

**Props:** `quote`, `author` ({name, title, company, avatarInitials, avatarGradient}), `stats[]` (optional 3-4 stat objects)

### Pattern 6: `<ComparisonRail>`

Side-by-side feature comparison. For "InsiteHub vs traditional LMS" or "AI Platform vs InsiteX" type contrasts.

**Anatomy:** Header row with column titles, body rows with feature label + cell per column (✓ / ✗ / partial / text). Currently has CSS classes `.cmp-row`, `.cmp-cell`, `.cmp-head`, `.cmp-win`, `.cmp-no`, `.cmp-part` — repurpose them.

**Props:** `columns[]` (`{label, accent}`), `rows[]` (`[{label, values: [v1, v2, ...]}]`)

### Pattern 7: `<ProductShowcase>`

Large mockup block (~600px tall) for each of the 4 products. Centerpiece pattern.

**Anatomy:** Eyebrow (product name) + H2 (one-line tagline) + body + bullet list + large designed mockup. Mockup is product-specific (defined in §3 below).

**Props:** `product` ('forge' | 'atlas' | 'echo' | 'certify'), `tagline`, `body`, `bullets[]`, `mockupComponent`

### Pattern 8: `<StatBand>`

Dark band of stats. Currently exists; refine type and spacing only.

**Anatomy:** 3 or 4 stats in a row, each with big number + caption.

**Props:** `stats[]` (`[{n, l}]`), `tone` ('dark' | 'light')

### Pattern 9: `<StepRail>`

Numbered process flow. Vertical on mobile, horizontal on desktop. For 4-phase Proxa Labs model, 5-step InsiteHub journey, advisory engagement sequence.

**Anatomy:** 3-6 numbered steps with icon + title + body. Connected by a thin rule line. Active step optionally highlighted.

**Props:** `steps[]` (`[{n, icon, title, body, highlight?}]`), `orientation` ('horizontal' | 'vertical' | 'auto')

### Pattern 10: `<CTABand>`

Final call-to-action band. Exactly one per page.

**Anatomy:** Dark gradient background with subtle hex watermark, large H2 with em-styled accent words, supporting paragraph, one primary CTA + one quiet text-link.

**Props:** `heading` (JSX), `body`, `primaryCta`, `secondaryLink`

### Composition rules

- **No page uses the same pattern twice in a row.** The section after `<CardGrid>` must not be another `<CardGrid>`.
- Every page ends with `<CTABand>`. Every page starts with `<EditorialHero>`.
- Mobile: every multi-column pattern collapses to 1 column at ≤960px.
- Section padding: every section uses `var(--space-8)` desktop / `var(--space-6)` mobile vertical padding via shared `.section` class. No more inline `padding: "100px 56px"` exceptions.

## Product showcase blocks

Each of the 4 products gets a designed mockup block, ~600px tall, placed as the centerpiece on PlatformPage and in compact form on HomePage's product preview section.

These are **designed mockups** (HTML/CSS/SVG), not real product screenshots. They should look credible — like genuine product UI — without overpromising.

### Forge mockup — "Agent session"

Terminal-style frame. Top bar: `Forge Agent · Session #2841 · Running`. Body: scrolling agent log with timestamps, e.g.:

```
[12:01:04] ▸ Loading PI for Lumeris® XR (oncology indication)
[12:01:08] ✓ Found 247 claims in source documents
[12:01:11] ▸ Generating MLR-ready content draft
[12:01:18] ✓ All 247 claims cited to PI sections 5.1, 6.2, 8.4
[12:01:21] ▸ Running ComplianceGuard pre-check
[12:01:23] ✓ 0 issues — content ready for MLR routing
[12:01:25] ▸ Routing to Veeva PromoMats workflow
[12:01:27] ⬤ Done · Artifact ID: FRG-2841-A
```

Right side: forming output document preview (sketched headings + paragraph blocks).

### Atlas mockup — "Rep pathway dashboard"

Dashboard frame. Header: `Sarah Chen · Oncology Onboarding · Week 6 of 12`. Body grid:
- Knowledge map (small node-and-edge visualization showing topic mastery, with one node highlighted as "gap detected")
- Progress rings for 4 competency areas (MOA, Clinical Data, Objections, Compliance)
- "Predicted readiness in 2 weeks: 92%" callout
- Manager view button + "Echo session unlocked" badge

### Echo mockup — "HCP roleplay session"

Split view frame. Left: video-call style avatar of "Dr. Kim · Hematologist". Right: rep transcript with messages, ComplianceGuard inline annotations:
- Rep: "Lumeris has shown a 40% reduction in disease progression compared to standard of care."
  - 🚨 ComplianceGuard: "Claim not in PI for monotherapy use. Did you mean: 'in combination therapy'?"
- Rep: "Apologies — in combination with bortezomib, the data shows..."
  - ✓ ComplianceGuard: "Approved phrasing"
- Live behavioral score panel: Clinical Accuracy 88 · Compliance 100 · Objection Handling 72

### Certify mockup — "Certification record"

Certificate-style card with:
- Issued To: Sarah Chen, Oncology Specialist
- Competencies Demonstrated: 12/12 ✓ checklist
- Behavioral Evidence: linked Echo session IDs
- Audit Hash: SHA-256 fingerprint (truncated visible)
- Issue Date / Valid Through dates
- SOC 2 Type II + 10-year retention badges

These four blocks live as components: `src/components/showcase/ForgeShowcase.jsx`, `AtlasShowcase.jsx`, `EchoShowcase.jsx`, `CertifyShowcase.jsx`. Each uses the corresponding product accent color exclusively.

## CTA hierarchy — one primary, that's it

### New rules

- **One primary action per page**: `Book a Demo` → routes to `contact`. Lives in two places: sticky in nav (already there) and in the page-bottom `<CTABand>`. Nothing competes with it visually.
- **Mid-section CTAs disappear** in most cases. Where the user genuinely benefits from a cross-link (e.g., "see the platform", "explore advisory"), the link becomes a quiet text link in body color: `Start with Advisory →` (no button chrome, just text + arrow). New shared component: `<QuietLink>`.
- **Form pages exception**: ContactPage and NewsletterPage have form-submit buttons — those are obviously primary in their own context.
- **Sticky nav `Book a Demo` button** stays. After scrolling past hero, it can subtly pulse-scale once to draw attention. No persistent animation.

### Audit deliverable

After applying these rules, the site should have ~80% fewer button-styled CTAs than today. Counting now: ~30+ buttons per page average. Target: ~6-8 buttons per page max.

## Per-page composition map

Each page composes from the 10 patterns. No page is "hero + 3 grids + CTA" anymore. Order matters — variation is enforced.

### Home

1. `<EditorialHero>` — display headline + LoopVisual right side + 1 primary CTA + 1 quiet link
2. Logo band (existing horizontal scroll of client logos — keep as-is, refine spacing)
3. `<StatBand>` — 4 stats, dark
4. `<SplitFeature>` (60/40, reverse) — "The thinking behind the platform" + 2x2 thought leadership cards on right
5. `<AnnouncementBand>` — AI Literacy Program (existing component, refine)
6. `<CardGrid>` (3-up, feature) — 4 differentiator cards (Why InsiteHub) — kept as cards because they have parallel structure
7. `<ProductShowcase>` × 4 in compact form — Forge / Atlas / Echo / Certify each as a small split-feature row (alternating sides)
8. `<PullQuote>` — Sarah Chen testimonial with 4 stat column (full-bleed)
9. `<SplitFeature>` (50/50) — "Who InsiteHub Is For" prose + 6 situation card grid on right (compact)
10. `<StepRail>` — 5-step "Your Path with InsiteHub"
11. `<SplitFeature>` (60/40) — Thought leadership feature row left + dark Newsletter signup card right (sticky on scroll, current behavior)
12. `<CTABand>` — final dark CTA

### Platform

1. `<EditorialHero>` — closed-loop diagram (current dark card, refined) as right-side visual
2. `<LongForm>` — methodology of the closed loop
3. `<ProductShowcase>` — Forge full block
4. `<ProductShowcase>` — Atlas full block (alternating side)
5. `<ProductShowcase>` — Echo full block
6. `<ProductShowcase>` — Certify full block
7. `<ComparisonRail>` — Forge/Atlas/Echo/Certify vs traditional LMS feature matrix
8. `<SplitFeature>` — InsiteX callout (transition path for non-AI-ready buyers)
9. `<CTABand>`

### Advisory

1. `<EditorialHero>`
2. `<LongForm>` — "We diagnose before we prescribe" methodology + inline pull-quote
3. `<StepRail>` — 6 engagements as a process flow (not a card grid)
4. `<SplitFeature>` — proof points (Vanguard Award, Bell Labs methodology) on right, body left
5. `<PullQuote>` — short advisory case quote
6. `<CTABand>`

### Literacy

1. `<EditorialHero>` — orange "New Program" badge
2. `<LongForm>` — why literacy first
3. `<CardGrid>` (3-up) — 6 role tracks (legitimate grid use, parallel structure)
4. `<StepRail>` — program structure (4 delivery steps)
5. `<StatBand>` — outcomes
6. `<SplitFeature>` — UMU partnership note
7. `<CTABand>`

### Proxa Labs

1. `<EditorialHero>` — 4-phase preview as right-side visual
2. `<LongForm>` — what is Proxa Labs (positioning + 5-step "Our Specialty" inline)
3. `<CardGrid>` (3-up, compact) — 3 failure-pattern cards
4. `<StepRail>` (horizontal on desktop) — 4-phase experimentation model with phase-detail expansions
5. `<SplitFeature>` (50/50) — Sarah Chen case study left, 4 stat column right (this is the Pull Quote variant essentially)
6. `<CardGrid>` (3-up) — 3 active research projects
7. `<CTABand>`

### InsiteX

1. `<EditorialHero>` — dark hero
2. `<SplitFeature>` — enterprise LMS positioning prose + capability list right
3. `<CardGrid>` (2-up, standard) — 6 admin/learner capability cards
4. `<ComparisonRail>` — InsiteX LMS vs AI Platform — when to pick which
5. `<SplitFeature>` — transition path callout (3 integration arrows: InsiteX → Atlas, Forge → Library, Echo → Records)
6. `<CTABand>`

### Content

1. `<EditorialHero>`
2. `<SplitFeature>` — "Two Tracks. One Standard." AI-powered vs traditional ID positioning
3. `<CardGrid>` (2-up) — 4 capability cards
4. `<LongForm>` — example launch-window scenario, drawn from existing v4 content already on the page (no new prose; just reformatted as a long-form section instead of a card)
5. `<SplitFeature>` — therapy area coverage on right, prose left
6. `<CTABand>`

### About

1. `<EditorialHero>`
2. `<LongForm>` — 3-paragraph story (no card chrome)
3. `<StatBand>` (light variant) — 4 innovation proof points
4. `<StepRail>` (vertical) — timeline 2010 → present
5. `<PullQuote>` — short founding-vision quote
6. `<CTABand>`

### News

1. `<EditorialHero>`
2. `<SplitFeature>` (50/50, prominent) — featured UMU partnership announcement (rich visual treatment, blue-tinted, replaces current featured card)
3. `<CardGrid>` (2-up) — 4 secondary announcements (static, no nav)
4. `<CTABand>` — newsletter strip variant routing to /newsletter

### Resources

1. `<EditorialHero>`
2. `<CardGrid>` (3-up, feature) — 6 frameworks/guides
3. `<LongForm>` — bridge text into research section
4. `<CardGrid>` (3-up, compact) — 3 active research items
5. `<CTABand>`

### Newsletter

1. `<EditorialHero>`
2. `<SplitFeature>` (50/50) — form left, "What you'll receive" + social right
3. `<CTABand>`

### Contact

1. `<EditorialHero>` — track selector (3 entry points) as the right-side visual element
2. `<SplitFeature>` (60/40) — form left, "What to expect" sidebar + address block right
3. `<CardGrid>` (4-up, compact) — 4 resource teasers routing to /resources
4. `<CTABand>`

## Motion & micro-interactions

Restraint, not flash. Pharma execs do not respond to scroll-jacked Apple-product-page theatrics — they respond to polish that doesn't get in their way.

- **Page transitions:** 200ms fade + 8px y-translate on route change. (Already partially via `useReveal` IntersectionObserver — extend to all pages.)
- **Hover states:** standardize to `translate(0, -2px)` + `box-shadow` lift on all clickable cards. Single duration: 150ms. Single easing: `ease-out`.
- **Sticky nav `Book a Demo`:** subtle 1.04× scale-pulse animation triggered once on first scroll past viewport height. Plays once per session.
- **LoopVisual:** keep current 3.5s auto-cycle, glow effect already polished.
- **AnnouncementBand:** subtle gradient breathing animation on the orange tag (12s loop, ±5% opacity). Optional — can omit.
- **No parallax.** No scroll-jacking. No autoplay video. No persistent looping animations beyond the LoopVisual cycle.

## Implementation phasing

Six phases, each independently shippable.

1. **Foundations.** Add the spacing + type CSS variables to `styles.css`. Audit existing inline `style={{padding:..., fontSize:...}}` and snap to the scale (highest-impact files first: HomePage, Nav, Footer, the 4 closed-loop pages). Build `Icon.jsx` component with the 30 named icons. Replace emojis with `<Icon>` component on a per-page basis as that page is touched in later phases.
2. **Section pattern library.** Build the 10 React components: `EditorialHero`, `SplitFeature`, `CardGrid`, `LongForm`, `PullQuote`, `ComparisonRail`, `ProductShowcase`, `StatBand`, `StepRail`, `CTABand`. Each ships with Storybook-style demo or a temporary `/demo` route showing all variants.
3. **Product showcase blocks.** Build the 4 `Showcase` components (Forge, Atlas, Echo, Certify). These are the single most credible thing we ship.
4. **HomePage redesign.** Rewrite HomePage using only the new patterns + showcases. Acts as the proof + reference for the rest of the site.
5. **Where-to-Start destination pages.** Apply the system to Platform, Advisory, Literacy, Proxa Labs, Content, InsiteX (the 6 pages users land on most from the mega-menu).
6. **Remaining pages + cleanup.** About, News, Resources, Newsletter, Contact. Final pass: CTA discipline audit (target ≤8 buttons per page), spacing audit, type-scale audit. Delete dead inline styles.

Each phase commits to `main` and is reviewable on its own. Phase 4 is the visual reveal — that's the moment the site stops looking like a content port and starts looking premium.

## Out of scope (reaffirmed)

- New routes / new pages / new content
- Backend/Firebase function changes
- Photography or stock imagery
- Live product UI screenshots
- A/B testing, analytics, CMS
- Routing library swap

## Testing

This is a UI-only React app with no automated test harness, and we're not adding one for this work. Verification per task:

- `npm run build` clean (no warnings, no missing imports)
- `npm run dev` and visit each modified page; check at 375px / 768px / 1440px breakpoints
- Manual smoke: every button still routes; every form still submits; every nav item still works
- Visual-diff via the brainstorm companion at decision points (`http://localhost:61477` style)

## Open questions

None. Approach approved by the user.
