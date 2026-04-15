# Home vs Platform Redundancy Fix — Design Spec

**Date:** 2026-04-15
**Status:** Approved for implementation planning
**Builds on:** `docs/superpowers/specs/2026-04-14-premium-redesign-design.md`

## Context

The premium redesign shipped HomePage and PlatformPage with near-identical product presentation — both pages use the full `<ProductShowcase>` block for all four products (Forge / Atlas / Echo / Certify) with the heavyweight UI mockups. A user scrolling Home then clicking "Platform" in the nav sees substantially the same content.

v4 deliberately split these pages: Home had a compact 4-card product teaser, while Platform had a closed-loop SVG diagram + longer product prose + UI preview mockups + LMS cross-promo. The redesign inherited the heavyweight treatment to both pages, eliminating Platform's reason to exist as a dedicated deep-dive.

## Goals

1. Remove product-showcase duplication between Home and Platform.
2. Restore Home to a compact product-teaser pattern (match v4's `.pg` intent).
3. Restore two v4-only Platform sections (closed-loop diagram, UI previews grid) so Platform has distinctive content Home doesn't.
4. Preserve all prose, bullets, CTAs, and routes — presentation change only.

## Non-goals

- No changes to the other 11 pages (Advisory, Literacy, About, News, Resources, Newsletter, Contact, InsiteX, Content, ProxaLabs, + nav / footer).
- No changes to brand palette, typography, or Firebase wiring.
- No new routes or backend changes.
- Not removing the 4 `<ProductShowcase>` blocks from Platform — those stay as the detailed product pitch.

## Design

### Change 1 — HomePage: replace 4 full ProductShowcase blocks with 1 compact teaser section

**Remove** from `src/pages/HomePage.jsx` (4 sections, roughly 50 lines of JSX):

```jsx
<ProductShowcase product="forge" ... mockup={<ForgeShowcase />} />
<ProductShowcase product="atlas" ... mockup={<AtlasShowcase />} reverse />
<ProductShowcase product="echo"  ... mockup={<EchoShowcase  />} />
<ProductShowcase product="certify" ... mockup={<CertifyShowcase />} reverse background="tinted" />
```

And the now-unused imports:
- `import ProductShowcase from '../components/sections/ProductShowcase';`
- `import { Forge/Atlas/Echo/Certify }Showcase from '../components/showcase/...';`

**Add** one compact 4-card section in their place, between the differentiators CardGrid and the Sarah Chen PullQuote. Use the existing `<CardGrid>` pattern with an accent-color-per-card treatment so each card subtly reads in the product's color (Forge orange, Atlas blue, Echo purple, Certify green) without turning into the rainbow anti-pattern from the prior iteration — the accent lives only on the card's icon + tag, body text stays neutral.

```jsx
const PRODUCTS_TEASER = [
  { iconName: "agent",    accent: "#F4801F", tag: "Forge",   title: "Agentic content creation.",     body: "AI agents build MLR-compliant training from your PI, CSRs, and brand assets. Hours, not months." },
  { iconName: "pathway",  accent: "#007AFF", tag: "Atlas",   title: "AI-powered adaptive learning.",  body: "Personalized pathways that close knowledge gaps in real time, ensuring reps are field-ready." },
  { iconName: "roleplay", accent: "#7C3AED", tag: "Echo",    title: "AI roleplay + compliance guard.", body: "Live HCP conversations with AI physician avatars. ComplianceGuard monitors every message." },
  { iconName: "audit",    accent: "#059669", tag: "Certify", title: "Demonstrated field readiness.",   body: "Certification earned through behavioral competency — not attendance. 10-year audit trail." },
];

<CardGrid
  eyebrow="The AI Platform"
  heading="Four products. One closed loop."
  lead="Content published in Forge → delivered by Atlas → assessed by Echo → certified by Certify — and every gap automatically restarts the loop. See the full platform for product detail and UI previews."
  columns={2}
  cards={PRODUCTS_TEASER.map(p => ({
    icon: <Icon name={p.iconName} size={26} color={p.accent} />,
    tag: p.tag,
    tagColor: p.accent,
    title: p.title,
    body: p.body,
    linkLabel: "See details",
    onClick: () => setPage("platform"),
  }))}
  cardStyle="feature"
  background="tinted"
  centerHeader
/>
```

Net effect on Home: fewer vertical pixels, no mockup duplication, clear "see the platform" path. Home stays focused on its actual job (cross-service trust signals, situation cards, case study, path-with-InsiteHub).

### Change 2 — PlatformPage: insert `<ClosedLoopDiagram>` section between hero and LongForm

**New component** `src/components/sections/ClosedLoopDiagram.jsx` — a static SVG inside a dark card, showing the 4 products as rounded rectangles arranged in a 4-node loop (top / right / bottom / left) with labeled arrows connecting them in sequence.

Arrow labels (from v4):
- Forge → Atlas: "content published"
- Atlas → Echo: "readiness reached"
- Echo → Certify: "competency demonstrated"
- Certify → Forge: "gap → rebuild"

Center text: `INTELLIGENT CAPABILITY DEVELOPMENT` in small uppercase spaced type.

This is distinct from the animated `<LoopVisual>` (which has circles that cycle through active states). The closed-loop diagram is STATIC and EXPOSITORY — it's the "proof" visual that the platform actually is a closed loop, rendered once for the reader to scan.

API:

```jsx
<ClosedLoopDiagram
  eyebrow="The Closed Loop"
  heading="Build → Develop → Assess → Certify → Repeat"
  lead="A continuous cycle. Content created in Forge powers learning in Atlas, assessed in Echo, drives Certify — and gaps detected restart the loop automatically."
/>
```

Dark background card inside a light `section` wrapper (matches the v4 treatment — dark card floating on the light page).

### Change 3 — PlatformPage: insert `<PlatformPreviews>` section after the 4 ProductShowcase blocks, before ComparisonRail

**New component** `src/components/sections/PlatformPreviews.jsx` — 4 mac-window-style preview cards in a 2×2 grid. Each card:
- Mac-window topbar (3 colored circles + product/session label)
- Dark body background
- Small uppercase product name
- 3 rows of progress bars (label + bar + percentage), each row colored in the product accent or a warning amber for "gap detected"
- Bottom status callout pill

The data per card (ported from v4 lines 91-111):
- **Forge** — content creation agent session — 3 rows: Launch Content Agent 88%, MLR citation check 100%, Veeva routing queued 62%. Status: "3 artifacts ready for MLR review"
- **Atlas** — rep pathway dashboard — 3 rows: Sarah Chen Oncology pathway 74%, Knowledge gap detected · MOA 41% (amber), Echo readiness threshold 90%. Status: "Echo assessment unlocked"
- **Echo** — HCP roleplay session · Dr. Kim — 3 rows: Clinical accuracy 82%, Compliance guard · clean 100%, Objection handling 67% (amber). Status: "Scorecard generating…"
- **Certify** — certification audit record — 3 rows: Competency threshold met 100%, Behavioral evidence logged 100%, SHA-256 audit trail 100%. Status: "Certification issued · 10yr record"

These are smaller and more systematic than the detailed per-product mockups (Forge terminal / Atlas dashboard / Echo roleplay / Certify certificate) — they're the "four UIs at a glance" view that complements, not duplicates, the big per-product treatments earlier on the page.

Uses existing `.prod-preview`, `.pp-topbar`, `.pp-dot`, `.pp-content`, `.pp-row`, `.pp-label`, `.pp-bar` classes already in `styles.css` from the initial content restore — no new CSS needed except mobile grid collapse if missing.

API:

```jsx
<PlatformPreviews
  eyebrow="Platform Previews"
  heading="What it looks like inside."
/>
```

All data ships inside the component as a constant array — no props for the preview content itself, since there are exactly 4 products and the content is stable.

### Final PlatformPage composition (after changes)

1. `<EditorialHero>` — with `<LoopVisual>` (animated hero visual, brand-familiar)
2. `<ClosedLoopDiagram>` — **new** — static expository loop diagram on dark card
3. `<LongForm>` — why a closed loop matters
4. `<ProductShowcase product="forge">` with `<ForgeShowcase />` mockup (unchanged)
5. `<ProductShowcase product="atlas" reverse>` with `<AtlasShowcase />` (unchanged)
6. `<ProductShowcase product="echo">` with `<EchoShowcase />` (unchanged)
7. `<ProductShowcase product="certify" reverse background="tinted">` with `<CertifyShowcase />` (unchanged)
8. `<PlatformPreviews>` — **new** — 4 mac-window preview grid
9. `<ComparisonRail>` — unchanged
10. `<SplitFeature>` — InsiteX callout (unchanged)
11. `<CTABand>` — unchanged

Platform gains 2 new sections (ClosedLoopDiagram, PlatformPreviews) that don't exist anywhere else. Home loses 4 big ProductShowcase sections and gains 1 compact CardGrid teaser. The two pages now tell complementary stories rather than near-identical ones.

### Final HomePage composition (after changes)

1. `<EditorialHero>` with LoopVisual (unchanged)
2. Logo band (unchanged)
3. `<StatBand>` (unchanged)
4. `<AnnouncementBand>` — AI Literacy (unchanged)
5. `<CardGrid>` differentiators (unchanged)
6. `<CardGrid>` PRODUCT TEASER — **new** — replaces 4 ProductShowcase blocks
7. `<PullQuote>` Sarah Chen (unchanged)
8. `<CardGrid>` situation cards (unchanged)
9. `<StepRail>` path with InsiteHub (unchanged)
10. `<CTABand>` final (unchanged)

Home drops from ~13 sections to ~10. The ones it loses were duplicate territory. Nothing of value was lost — the product overview survives as a compact teaser that does its job (name the products, convey the closed loop, route to Platform).

## Components

### New: `src/components/sections/ClosedLoopDiagram.jsx`

Single-purpose section component. Renders a `.section` wrapper with a dark card inside containing the SVG + optional HexMark watermark + eyebrow / heading / lead prose above the card.

Implementation: ports the v4 PlatformPage closed-loop SVG (v4 lines 30-55 of PlatformPage's dark card) verbatim — 4 rounded-rectangle product nodes with labeled curved arrow paths between them, plus center text.

### New: `src/components/sections/PlatformPreviews.jsx`

Single-purpose section component. Renders a `.section` wrapper with a 2×2 grid of 4 mac-window preview cards. All 4 cards' data lives in a local const array inside the component (no props for the preview rows).

Uses existing `.prod-preview`, `.pp-topbar`, `.pp-dot`, `.pp-content`, `.pp-row`, `.pp-label`, `.pp-bar` classes from `styles.css`. Verify those classes still exist in `styles.css` (they were lifted during the initial content restore).

## Styles

No new CSS variables. Small additions only:

- `.closed-loop-diagram` styles (dark card, padding, centered SVG container) — new block in `styles.css`
- `.platform-previews-grid` — 2-col grid of `.prod-preview` cards, collapses to 1-col at 960px

## Data shape

Both new components encapsulate their own data. `ClosedLoopDiagram` ships with the 4 product names and arrow labels hardcoded. `PlatformPreviews` ships with the 4 preview cards' rows and status lines hardcoded. Consumers only pass eyebrow/heading/lead text via props.

## Error handling

No user input, no network, no runtime error paths. Components are purely declarative SVG + HTML.

## Testing

Consistent with the rest of the project (no automated test harness):

- `npm run build` clean
- `npm run dev` visual check: Home has compact product section instead of 4 big blocks; Platform has the closed-loop diagram up top and the 4 UI preview cards after the product showcases
- 375 / 768 / 1440 px breakpoint check for the new Platform sections

## Out of scope (explicit)

- Changing LoopVisual itself (still the hero animation on both Home and Platform — that was the prior request's outcome and stays)
- Adding a hero for Platform that differs from Home beyond the subhead — Platform's hero keeps LoopVisual, and the new ClosedLoopDiagram (section 2) carries the visual differentiation
- Cross-page link styling, nav changes, footer changes

## Open questions

None. Approach approved by the user ("do that please. brainstorm it").
