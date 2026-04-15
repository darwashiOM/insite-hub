# Home/Platform Redundancy Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove product-showcase duplication between HomePage and PlatformPage — Home gets a compact 4-card teaser, Platform gains two distinctive v4-only sections (ClosedLoopDiagram, PlatformPreviews).

**Architecture:** Two new section components in `src/components/sections/`. One HomePage rewrite (replace 4 ProductShowcase blocks with 1 CardGrid). One PlatformPage update (insert 2 new sections). No brand color / typeface / routing changes.

**Tech Stack:** React 19 · Vite · plain CSS · existing section pattern library.

**Spec reference:** `docs/superpowers/specs/2026-04-15-home-platform-redundancy-fix.md`

**Testing approach:** No automated test harness. Each task verifies via `npm run build` clean + `npm run dev` visual check.

---

## File map

### Create
- `src/components/sections/ClosedLoopDiagram.jsx`
- `src/components/sections/PlatformPreviews.jsx`

### Modify
- `src/pages/HomePage.jsx` — drop 4 `<ProductShowcase>` blocks + their showcase-component imports; add 1 compact `<CardGrid>` product teaser
- `src/pages/PlatformPage.jsx` — add `<ClosedLoopDiagram>` between hero and LongForm; add `<PlatformPreviews>` between the 4 ProductShowcase blocks and ComparisonRail
- `src/styles.css` — small additions for closed-loop card + platform-previews 2-col grid + mobile collapse

### Unchanged
- All 11 other pages, Footer, Nav, App.jsx, Firebase functions, 4 Showcase mockup components, all 10 section pattern components.

---

## Task 1: Create ClosedLoopDiagram section component

**Files:**
- Create: `src/components/sections/ClosedLoopDiagram.jsx`
- Modify: `src/styles.css` (append closed-loop card styles)

- [ ] **Step 1: Write the component**

Create `/Users/darwashi/Downloads/insite-hub/src/components/sections/ClosedLoopDiagram.jsx`:

```jsx
import { HexMark } from '../HexMark';

const NODES = [
  { x: 100, y: 30,  c: "#F4801F", bg: "rgba(244,128,31,.1)", name: "Forge",   sub: "Builds content",       ss: "Courses · Inserts · SOPs" },
  { x: 448, y: 30,  c: "#007AFF", bg: "rgba(0,122,255,.1)",  name: "Atlas",   sub: "Delivers learning",    ss: "Adaptive · Gap-aware" },
  { x: 448, y: 200, c: "#7C3AED", bg: "rgba(124,58,237,.1)", name: "Echo",    sub: "Assesses in roleplay", ss: "HCP avatars · Scoring" },
  { x: 100, y: 200, c: "#059669", bg: "rgba(5,150,105,.1)",  name: "Certify", sub: "Confirms readiness",   ss: "Behavioral proof" },
];

const ARROWS = [
  { d: "M240 62 Q350 18 460 62",   c: "#F4801F", m: "af", lx: 350, ly: 22,  t: "content published" },
  { d: "M548 100 Q594 150 548 200", c: "#007AFF", m: "aa", lx: 638, ly: 154, t: "readiness reached" },
  { d: "M460 238 Q350 282 240 238", c: "#7C3AED", m: "ae", lx: 350, ly: 294, t: "competency demonstrated" },
  { d: "M152 200 Q106 150 152 100", c: "#059669", m: "ac", lx: 56,  ly: 150, t: "gap → rebuild" },
];

export default function ClosedLoopDiagram({ eyebrow = "The Closed Loop", heading = "Build → Develop → Assess → Certify → Repeat", lead = "A continuous cycle. Content created in Forge powers learning in Atlas, assessed in Echo, drives Certify — and gaps detected restart the loop automatically." }) {
  return (
    <section className="section section-light">
      <div className="mw">
        <div className="closed-loop-diagram">
          <div className="closed-loop-watermark">
            <HexMark size={420} color="#F4801F" strokeWidth={0.7} />
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              {eyebrow && <div className="t-eyebrow closed-loop-eyebrow" style={{ marginBottom: 10 }}>{eyebrow}</div>}
              {heading && <h3 className="closed-loop-heading">{heading}</h3>}
              {lead && <p className="closed-loop-lead">{lead}</p>}
            </div>
            <svg width="100%" viewBox="0 0 700 300" style={{ maxWidth: 680, display: "block", margin: "0 auto" }}>
              <defs>
                {ARROWS.map(a => (
                  <marker key={a.m} id={a.m} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                    <path d="M1 1L9 5L1 9" fill="none" stroke={a.c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </marker>
                ))}
              </defs>
              {ARROWS.map((a, i) => (
                <g key={i}>
                  <path d={a.d} fill="none" stroke={a.c} strokeWidth="1.5" strokeOpacity=".5" markerEnd={`url(#${a.m})`} />
                  <text x={a.lx} y={a.ly} textAnchor="middle" style={{ fontSize: 10, fill: a.c, opacity: .75, fontFamily: "DM Sans,sans-serif" }}>{a.t}</text>
                </g>
              ))}
              {NODES.map(nd => (
                <g key={nd.name}>
                  <rect x={nd.x} y={nd.y} width={148} height={68} rx="11" fill={nd.bg} stroke={nd.c} strokeWidth="1" strokeOpacity=".45" />
                  <text x={nd.x + 74} y={nd.y + 24} textAnchor="middle" style={{ fontSize: 13, fontWeight: 800, fill: nd.c, fontFamily: "Manrope,sans-serif" }}>{nd.name}</text>
                  <text x={nd.x + 74} y={nd.y + 41} textAnchor="middle" style={{ fontSize: 11, fill: "rgba(255,255,255,.6)", fontFamily: "DM Sans,sans-serif" }}>{nd.sub}</text>
                  <text x={nd.x + 74} y={nd.y + 56} textAnchor="middle" style={{ fontSize: 9.5, fill: "rgba(255,255,255,.32)", fontFamily: "DM Sans,sans-serif" }}>{nd.ss}</text>
                </g>
              ))}
              {["INTELLIGENT", "CAPABILITY", "DEVELOPMENT"].map((w, i) => (
                <text key={w} x="350" y={138 + i * 15} textAnchor="middle" style={{ fontSize: 9, fill: "rgba(255,255,255,.18)", letterSpacing: ".1em", fontFamily: "Manrope,sans-serif" }}>{w}</text>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Append CSS to styles.css (BEFORE the `@media` block)**

```css
.closed-loop-diagram {
  background: linear-gradient(140deg, var(--dk) 0%, #1C1208 100%);
  border-radius: 22px;
  padding: var(--space-6) var(--space-7);
  position: relative;
  overflow: hidden;
}
.closed-loop-watermark {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.05; pointer-events: none;
}
.closed-loop-eyebrow { color: var(--o) !important; }
.closed-loop-heading {
  font-family: 'Manrope', sans-serif;
  font-size: 24px; font-weight: 800;
  color: var(--wh); letter-spacing: -0.035em;
  margin-bottom: 10px;
}
.closed-loop-lead {
  font-family: 'DM Sans', sans-serif;
  font-size: 14px; color: rgba(255,255,255,.45);
  max-width: 560px; margin: 0 auto;
}
```

Also add to the existing `@media (max-width:960px)` block:

```css
.closed-loop-diagram { padding: var(--space-5); }
```

- [ ] **Step 3: Build**

```bash
cd /Users/darwashi/Downloads/insite-hub
npm run build
```
Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/ClosedLoopDiagram.jsx src/styles.css
git commit -m "Add ClosedLoopDiagram section for PlatformPage"
```

---

## Task 2: Create PlatformPreviews section component

**Files:**
- Create: `src/components/sections/PlatformPreviews.jsx`
- Modify: `src/styles.css` (append platform-previews grid styles)

- [ ] **Step 1: Write the component**

Create `/Users/darwashi/Downloads/insite-hub/src/components/sections/PlatformPreviews.jsx`:

```jsx
const PREVIEWS = [
  {
    c: "#F4801F",
    name: "InsiteHub Forge",
    sub: "Content creation agent session",
    rows: [
      { label: "Launch Content Agent",  pct: 88,  c: "#F4801F", bg: "rgba(244,128,31,.12)" },
      { label: "MLR citation check",     pct: 100, c: "#059669", bg: "rgba(5,150,105,.12)" },
      { label: "Veeva routing queued",   pct: 62,  c: "#007AFF", bg: "rgba(0,122,255,.12)" },
    ],
    status: "3 artifacts ready for MLR review",
  },
  {
    c: "#007AFF",
    name: "InsiteHub Atlas",
    sub: "Rep pathway dashboard",
    rows: [
      { label: "Sarah Chen · Oncology pathway", pct: 74,  c: "#007AFF", bg: "rgba(0,122,255,.12)" },
      { label: "Knowledge gap detected · MOA",  pct: 41,  c: "#F59E0B", bg: "rgba(245,158,11,.12)" },
      { label: "Echo readiness threshold",       pct: 90,  c: "#059669", bg: "rgba(5,150,105,.12)" },
    ],
    status: "Echo assessment unlocked",
  },
  {
    c: "#7C3AED",
    name: "InsiteHub Echo",
    sub: "HCP roleplay session · Dr. Kim",
    rows: [
      { label: "Clinical accuracy score",     pct: 82,  c: "#7C3AED", bg: "rgba(124,58,237,.12)" },
      { label: "Compliance guard · clean",     pct: 100, c: "#059669", bg: "rgba(5,150,105,.12)" },
      { label: "Objection handling",           pct: 67,  c: "#F59E0B", bg: "rgba(245,158,11,.12)" },
    ],
    status: "Scorecard generating…",
  },
  {
    c: "#059669",
    name: "Certify",
    sub: "Certification audit record",
    rows: [
      { label: "Competency threshold met",   pct: 100, c: "#059669", bg: "rgba(5,150,105,.12)" },
      { label: "Behavioral evidence logged", pct: 100, c: "#059669", bg: "rgba(5,150,105,.12)" },
      { label: "SHA-256 audit trail",         pct: 100, c: "#059669", bg: "rgba(5,150,105,.12)" },
    ],
    status: "Certification issued · 10yr record",
  },
];

export default function PlatformPreviews({ eyebrow = "Platform Previews", heading = "What it looks like inside." }) {
  return (
    <section className="section section-light">
      <div className="mw">
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          {eyebrow && <div className="t-eyebrow" style={{ marginBottom: 10 }}>{eyebrow}</div>}
          {heading && <h2 className="t-h2">{heading}</h2>}
        </div>
        <div className="platform-previews-grid">
          {PREVIEWS.map(p => (
            <div key={p.name} className="prod-preview">
              <div className="pp-topbar">
                {["#FF5F57", "#FEBC2E", "#28C840"].map(c => <div key={c} className="pp-dot" style={{ background: c }} />)}
                <div style={{ marginLeft: 8, fontSize: 11, color: "rgba(255,255,255,.28)", fontFamily: "DM Sans,sans-serif" }}>{p.name} · {p.sub}</div>
              </div>
              <div className="pp-content">
                <div style={{ fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: p.c, fontWeight: 700, marginBottom: 12, opacity: .85 }}>{p.sub}</div>
                {p.rows.map(r => (
                  <div key={r.label} className="pp-row" style={{ background: r.bg }}>
                    <div className="pp-label" style={{ color: "rgba(255,255,255,.72)", minWidth: 180, fontSize: 11 }}>{r.label}</div>
                    <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,.08)", borderRadius: 2 }}>
                      <div className="pp-bar" style={{ width: r.pct + "%", background: r.c, opacity: .85 }} />
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,.42)", minWidth: 32, textAlign: "right" }}>{r.pct}%</div>
                  </div>
                ))}
                <div style={{ marginTop: 14, padding: "8px 12px", background: "rgba(255,255,255,.03)", borderRadius: 8, border: "1px solid rgba(255,255,255,.06)", fontSize: 11, color: p.c, fontWeight: 600 }}>⬤ {p.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Append CSS to styles.css (BEFORE the `@media` block)**

```css
.platform-previews-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  max-width: 1200px;
  margin: 0 auto;
}
```

Add to the `@media (max-width:960px)` block:

```css
.platform-previews-grid { grid-template-columns: 1fr !important; gap: var(--space-3); }
```

Note: `.prod-preview`, `.pp-topbar`, `.pp-dot`, `.pp-content`, `.pp-row`, `.pp-label`, `.pp-bar` classes already exist in styles.css (verified at lines 274-281). No need to re-add.

- [ ] **Step 3: Build**

```bash
npm run build
```
Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/PlatformPreviews.jsx src/styles.css
git commit -m "Add PlatformPreviews section (4 mac-window UI mockups)"
```

---

## Task 3: HomePage — replace 4 ProductShowcase blocks with compact CardGrid teaser

**Files:**
- Modify: `src/pages/HomePage.jsx`

- [ ] **Step 1: Read current HomePage**

Read `/Users/darwashi/Downloads/insite-hub/src/pages/HomePage.jsx`. Find the 4 `<ProductShowcase ... />` JSX blocks (one per product: forge, atlas, echo, certify) and the imports at the top of the file:

```jsx
import ProductShowcase from '../components/sections/ProductShowcase';
import ForgeShowcase from '../components/showcase/ForgeShowcase';
import AtlasShowcase from '../components/showcase/AtlasShowcase';
import EchoShowcase from '../components/showcase/EchoShowcase';
import CertifyShowcase from '../components/showcase/CertifyShowcase';
```

- [ ] **Step 2: Remove the 5 imports**

Delete those 5 import lines. The `Icon` and `CardGrid` imports already exist higher up — keep them.

- [ ] **Step 3: Remove the 4 ProductShowcase JSX blocks**

Delete the 4 blocks that look like:
```jsx
<ProductShowcase
  product="forge"
  eyebrow="InsiteHub Forge"
  ...
  mockup={<ForgeShowcase />}
/>

<ProductShowcase
  product="atlas"
  ...
  mockup={<AtlasShowcase />}
  reverse
  background="tinted"
/>

<ProductShowcase
  product="echo"
  ...
  mockup={<EchoShowcase />}
/>

<ProductShowcase
  product="certify"
  ...
  mockup={<CertifyShowcase />}
  reverse
  background="tinted"
/>
```

These 4 blocks live between the differentiators CardGrid and the Sarah Chen PullQuote.

- [ ] **Step 4: Add the compact product teaser**

Insert this at the same spot the 4 ProductShowcase blocks were removed from (between the differentiators CardGrid and the Sarah Chen PullQuote):

```jsx
<CardGrid
  eyebrow="The AI Platform"
  heading="Four products. One closed loop."
  lead="Content published in Forge → delivered by Atlas → assessed by Echo → certified by Certify — and every gap automatically restarts the loop. See the full platform for product detail and UI previews."
  columns={2}
  cards={[
    { icon: <Icon name="agent"    size={26} color="#F4801F" />, tag: "Forge",   tagColor: "#F4801F", title: "Agentic content creation.",      body: "AI agents build MLR-compliant training from your PI, CSRs, and brand assets. Hours, not months.",     linkLabel: "See details", onClick: () => setPage("platform") },
    { icon: <Icon name="pathway"  size={26} color="#007AFF" />, tag: "Atlas",   tagColor: "#007AFF", title: "AI-powered adaptive learning.",  body: "Personalized pathways that close knowledge gaps in real time, ensuring reps are field-ready.",         linkLabel: "See details", onClick: () => setPage("platform") },
    { icon: <Icon name="roleplay" size={26} color="#7C3AED" />, tag: "Echo",    tagColor: "#7C3AED", title: "AI roleplay + compliance guard.", body: "Live HCP conversations with AI physician avatars. ComplianceGuard monitors every message in real time.", linkLabel: "See details", onClick: () => setPage("platform") },
    { icon: <Icon name="audit"    size={26} color="#059669" />, tag: "Certify", tagColor: "#059669", title: "Demonstrated field readiness.",   body: "Certification earned through behavioral competency — not attendance. 10-year audit trail.",           linkLabel: "See details", onClick: () => setPage("platform") },
  ]}
  cardStyle="feature"
  background="tinted"
  centerHeader
/>
```

- [ ] **Step 5: Build + verify**

```bash
npm run build
```
Expected: clean. No warnings about unused imports (ProductShowcase, ForgeShowcase, etc. should be fully removed).

- [ ] **Step 6: Visual check**

```bash
npm run dev
```
Visit `http://localhost:5173`. Verify HomePage:
- The 4 full product showcase blocks are GONE
- One compact 2×2 card grid in their place showing Forge / Atlas / Echo / Certify
- Each card has the product accent color on its tag pill + icon
- Clicking any card routes to `/platform` (via `setPage("platform")`)
- Sarah Chen PullQuote appears right after this new section

- [ ] **Step 7: Commit**

```bash
git add src/pages/HomePage.jsx
git commit -m "HomePage: drop 4 ProductShowcase blocks for compact 4-card product teaser"
```

---

## Task 4: PlatformPage — insert ClosedLoopDiagram + PlatformPreviews

**Files:**
- Modify: `src/pages/PlatformPage.jsx`

- [ ] **Step 1: Read current PlatformPage**

Read `/Users/darwashi/Downloads/insite-hub/src/pages/PlatformPage.jsx`. Locate:
- The `<EditorialHero ... />` at the top
- The `<LongForm eyebrow="The Closed Loop" ... />` right after the hero
- The 4 `<ProductShowcase ... />` blocks
- The `<ComparisonRail ... />` after the 4 ProductShowcase blocks

- [ ] **Step 2: Add imports**

Add to the existing imports block at the top of PlatformPage.jsx:

```jsx
import ClosedLoopDiagram from '../components/sections/ClosedLoopDiagram';
import PlatformPreviews from '../components/sections/PlatformPreviews';
```

- [ ] **Step 3: Insert ClosedLoopDiagram between EditorialHero and LongForm**

Find the LongForm block:
```jsx
<LongForm
  eyebrow="The Closed Loop"
  heading="Why a closed loop matters."
  ...
```

INSERT the ClosedLoopDiagram IMMEDIATELY BEFORE that LongForm:

```jsx
<ClosedLoopDiagram />
```

(Uses the component's default props: eyebrow="The Closed Loop", heading="Build → Develop → Assess → Certify → Repeat", and the default lead prose. If the LongForm right after it also uses eyebrow="The Closed Loop", change the LongForm's eyebrow to something distinct like "Methodology" to avoid the back-to-back repetition — update `eyebrow="The Closed Loop"` on the LongForm to `eyebrow="Methodology"`.)

- [ ] **Step 4: Insert PlatformPreviews between the 4 ProductShowcase blocks and ComparisonRail**

Find the last `<ProductShowcase product="certify" ... />` block. INSERT `<PlatformPreviews />` IMMEDIATELY AFTER the closing `/>` of that Certify ProductShowcase (and before the `<ComparisonRail ...>` block).

```jsx
<ProductShowcase
  product="certify"
  ...
  mockup={<CertifyShowcase />}
  reverse
  background="tinted"
/>

<PlatformPreviews />

<ComparisonRail
  eyebrow="Why It's Different"
  ...
/>
```

- [ ] **Step 5: Build + verify**

```bash
npm run build
```
Expected: clean.

- [ ] **Step 6: Visual check**

```bash
npm run dev
```
Visit `http://localhost:5173`, click "Platform" in the nav. Verify:
- Hero (with LoopVisual) still renders
- ClosedLoopDiagram dark card appears right after hero — 4 product rectangles in a loop with labeled arrows, "INTELLIGENT CAPABILITY DEVELOPMENT" center text
- Methodology LongForm after that
- 4 full ProductShowcase blocks (Forge / Atlas / Echo / Certify)
- **NEW:** PlatformPreviews 2×2 grid of mac-window mockups after Certify
- ComparisonRail after that
- Final CTABand
- At 375px: ClosedLoopDiagram SVG scales down; PlatformPreviews grid collapses to 1-col

- [ ] **Step 7: Commit**

```bash
git add src/pages/PlatformPage.jsx
git commit -m "PlatformPage: insert ClosedLoopDiagram + PlatformPreviews sections"
```

---

## Self-Review Checklist

Against the spec at `docs/superpowers/specs/2026-04-15-home-platform-redundancy-fix.md`:

- [x] Change 1 — HomePage: drop 4 ProductShowcase, add 1 compact CardGrid teaser → Task 3
- [x] Change 2 — PlatformPage ClosedLoopDiagram inserted between hero and LongForm → Tasks 1 + 4
- [x] Change 3 — PlatformPage PlatformPreviews inserted after ProductShowcases before ComparisonRail → Tasks 2 + 4
- [x] No changes to brand colors, typefaces, routing → confirmed (only JSX composition + 2 new section components)
- [x] Preserves all prose/bullets/CTAs/routes → Home loses 4 showcase sections (the compact teaser carries the product identity forward with one-line-per-product); Platform keeps everything and gains
- [x] LoopVisual stays on both heroes per open-question resolution in spec

Type consistency: `setPage` used everywhere consistently. Section component prop APIs (eyebrow/heading/lead) match existing conventions. Icon `size`/`color` usage matches existing pattern. No invented helpers.

No placeholders. Each code step has complete code. Each verification step has a concrete command + expected outcome.

**Total: 4 tasks.** Tasks 1 and 2 are independent (create components). Tasks 3 and 4 must run after their respective components exist. Task ordering: 1 → 2 → 3 → 4 (or 1 + 2 in parallel, then 3 + 4 in parallel — but since subagent-driven dispatches are sequential, run them in order).
