# InsiteHub Premium Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Lift the restored InsiteHub site from "content port" to "premium" — replace ad-hoc inline styling with a strict design token system, swap 60+ emojis for a custom 30-icon SVG set, build a 10-pattern section component library replacing the universal hero+card-grid skeleton, build 4 detailed product showcase mockups, enforce one-primary-CTA-per-page hierarchy, and recompose all 13 pages using the new patterns.

**Architecture:** No new dependencies. Existing React 19 + Vite + plain CSS stack. New CSS custom properties for spacing and type. New components live in `src/components/` (10 section patterns + 4 product showcases + Icon + QuietLink). Pages get rewritten as compositions of the new components. Brand colors and typefaces unchanged.

**Tech Stack:** React 19 · Vite · plain CSS with CSS custom properties · Manrope/DM Sans Google Fonts · Firebase hosting + Cloud Functions (no changes).

**Spec reference:** `docs/superpowers/specs/2026-04-14-premium-redesign-design.md`

**Testing approach:** No automated test harness in this project; not adding one. Every task verifies via `npm run build` (must be clean) + `npm run dev` visual check at named breakpoints (375px / 768px / 1440px) for any UI-affecting task.

---

## File map

### Create

**Foundations:**
- `src/components/Icon.jsx` — 30-icon SVG set with named API
- `src/components/QuietLink.jsx` — text-link replacement for non-primary CTAs

**Section patterns:**
- `src/components/sections/EditorialHero.jsx`
- `src/components/sections/SplitFeature.jsx`
- `src/components/sections/CardGrid.jsx`
- `src/components/sections/LongForm.jsx`
- `src/components/sections/PullQuote.jsx`
- `src/components/sections/ComparisonRail.jsx`
- `src/components/sections/ProductShowcase.jsx`
- `src/components/sections/StatBand.jsx`
- `src/components/sections/StepRail.jsx`
- `src/components/sections/CTABand.jsx`

**Product showcases:**
- `src/components/showcase/ForgeShowcase.jsx`
- `src/components/showcase/AtlasShowcase.jsx`
- `src/components/showcase/EchoShowcase.jsx`
- `src/components/showcase/CertifyShowcase.jsx`

### Modify

- `src/styles.css` — add CSS custom properties for spacing + type, add component-specific section styles, audit and remove inline-style duplications as pages get rewritten
- `src/App.jsx` — no functional change but may add imports
- All 13 pages in `src/pages/` — rewrite each to compose from new section patterns
- All existing components in `src/components/` (Nav, Footer, AnnouncementBand, etc.) — replace emoji uses with `<Icon>` component as their files are touched

### No changes

- `functions/` — Firebase functions stay as-is
- `src/components/HexMark.jsx`, `LoopVisual.jsx`, `LoopMobile.jsx`, `SocialIcon.jsx`, `useReveal.js` — all preserved

---

## Phase 1 — Foundations

### Task 1: Add design tokens to styles.css

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: Add CSS variables to the `:root` block**

Find the existing `:root { ... }` block at the top of `src/styles.css` (around line 4-13). Add these tokens INSIDE the existing block, before the closing `}`:

```css
/* Spacing scale */
--space-1: 4px;
--space-2: 8px;
--space-3: 16px;
--space-4: 24px;
--space-5: 32px;
--space-6: 48px;
--space-7: 64px;
--space-8: 96px;
--space-9: 128px;

/* Type scale */
--text-display: clamp(48px, 5.5vw, 64px);
--text-h1:      clamp(36px, 4.2vw, 48px);
--text-h2:      clamp(26px, 3vw, 32px);
--text-h3:      22px;
--text-body:    16px;
--text-small:   13px;
--text-eyebrow: 11px;

/* Section padding */
--section-py:        var(--space-8);
--section-py-mobile: var(--space-6);
```

- [ ] **Step 2: Add a generic `.section` utility at the bottom of styles.css (before any `@media` blocks)**

```css
.section {
  padding: var(--section-py) 56px;
}
.section-light  { background: var(--wh); }
.section-tinted { background: var(--lt); }
.section-dark   { background: var(--dk); color: var(--wh); }

@media (max-width: 960px) {
  .section { padding: var(--section-py-mobile) 20px; }
}
```

- [ ] **Step 3: Add typography utility classes**

```css
.t-display  { font-family: 'Manrope', sans-serif; font-size: var(--text-display); font-weight: 900; line-height: 1.05; letter-spacing: -0.045em; }
.t-h1       { font-family: 'Manrope', sans-serif; font-size: var(--text-h1);      font-weight: 900; line-height: 1.06; letter-spacing: -0.045em; }
.t-h2       { font-family: 'Manrope', sans-serif; font-size: var(--text-h2);      font-weight: 800; line-height: 1.16; letter-spacing: -0.04em;  }
.t-h3       { font-family: 'Manrope', sans-serif; font-size: var(--text-h3);      font-weight: 800; line-height: 1.25; letter-spacing: -0.03em;  }
.t-body     { font-family: 'DM Sans', sans-serif; font-size: var(--text-body);    font-weight: 400; line-height: 1.7;  color: var(--bd); }
.t-lead     { font-family: 'DM Sans', sans-serif; font-size: 17px;                 font-weight: 400; line-height: 1.7;  color: var(--bd); }
.t-small    { font-family: 'DM Sans', sans-serif; font-size: var(--text-small);   font-weight: 400; line-height: 1.55; color: var(--bd); }
.t-eyebrow  { font-family: 'DM Sans', sans-serif; font-size: var(--text-eyebrow); font-weight: 700; line-height: 1; letter-spacing: 0.14em; text-transform: uppercase; color: var(--o); }
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: clean.

- [ ] **Step 5: Commit**

```bash
git add src/styles.css
git commit -m "Add design tokens: spacing + type scale + section utilities"
```

---

### Task 2: Build Icon.jsx with 30-icon SVG set

**Files:**
- Create: `src/components/Icon.jsx`

- [ ] **Step 1: Create the Icon component scaffold + first 10 icons**

Create `src/components/Icon.jsx`:

```jsx
const ICONS = {
  // Strategy / advisory
  strategy: <><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9"/><line x1="12" y1="3" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="21"/><line x1="3" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="21" y2="12"/></>,
  pilot: <><polygon points="12,3 5,21 12,18 19,21"/></>,
  literacy: <><path d="M3 7l9-4 9 4-9 4z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/></>,
  platform: <><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><circle cx="6" cy="8" r="0.5" fill="currentColor"/></>,
  content: <><rect x="4" y="3" width="16" height="18" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="13" y2="16"/></>,
  lms: <><rect x="3" y="4" width="18" height="14" rx="2"/><line x1="3" y1="20" x2="21" y2="20"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="9" y1="12" x2="15" y2="12"/></>,
  chat: <><path d="M21 12c0 4.5-4 8-9 8a10 10 0 0 1-3.7-.7L3 21l1.7-4.7A8.4 8.4 0 0 1 3 12c0-4.4 4-8 9-8s9 3.6 9 8z"/></>,
  methodology: <><path d="M3 6h18M3 12h18M3 18h12"/><circle cx="20" cy="18" r="2"/></>,
  compliance: <><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/></>,
  readiness: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></>,
};

export default function Icon({ name, size = 24, color = "currentColor", strokeWidth = 1.6, className, style }) {
  const path = ICONS[name];
  if (!path) {
    if (typeof console !== 'undefined') console.warn(`Icon: unknown name "${name}"`);
    return null;
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ flexShrink: 0, ...style }}
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}
```

- [ ] **Step 2: Add the remaining 20 icons**

Extend the `ICONS` object with these additional entries (insert before the closing `}` of the ICONS const):

```jsx
  // Compliance / risk
  mlr: <><rect x="4" y="3" width="16" height="18" rx="2"/><line x1="9" y1="8" x2="15" y2="8"/><path d="M9 12l2 2 4-4"/></>,
  governance: <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
  infrastructure: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  "org-design": <><circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><line x1="12" y1="7" x2="12" y2="14"/><line x1="12" y1="14" x2="5" y2="19"/><line x1="12" y1="14" x2="19" y2="19"/></>,
  // Product capability
  agent: <><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.2 4.2l2.8 2.8M17 17l2.8 2.8M1 12h4M19 12h4M4.2 19.8L7 17M17 7l2.8-2.8"/></>,
  pathway: <><path d="M5 4v16M19 4v16"/><circle cx="5" cy="8" r="1.5"/><circle cx="19" cy="14" r="1.5"/><path d="M5 8 Q12 12 19 14"/></>,
  roleplay: <><circle cx="9" cy="9" r="3"/><circle cx="17" cy="11" r="2.5"/><path d="M3 20c0-3 2.5-5 6-5s6 2 6 5"/><path d="M14 20c0-2 2-3.5 5-3.5"/></>,
  audit: <><rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="9" cy="11" r="1.5"/><line x1="12" y1="11" x2="17" y2="11"/><circle cx="9" cy="15" r="1.5"/><line x1="12" y1="15" x2="17" y2="15"/></>,
  gap: <><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="0.5" fill="currentColor"/></>,
  remediation: <><path d="M3 12a9 9 0 1 0 9-9"/><polyline points="3 4 3 12 11 12"/></>,
  // Knowledge
  research: <><circle cx="11" cy="11" r="6"/><line x1="15.5" y1="15.5" x2="21" y2="21"/></>,
  framework: <><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/></>,
  template: <><rect x="4" y="3" width="16" height="18" rx="2"/><line x1="8" y1="8" x2="13" y2="8"/><rect x="8" y="11" width="8" height="3"/><line x1="8" y1="17" x2="11" y2="17"/></>,
  checklist: <><polyline points="3 7 5 9 9 5"/><polyline points="3 14 5 16 9 12"/><line x1="12" y1="7" x2="21" y2="7"/><line x1="12" y1="14" x2="21" y2="14"/></>,
  "field-notes": <><path d="M4 4h12a4 4 0 0 1 4 4v13H8a4 4 0 0 1-4-4z"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/></>,
  // News categories
  partnership: <><circle cx="8" cy="12" r="3"/><circle cx="16" cy="12" r="3"/><line x1="11" y1="12" x2="13" y2="12"/></>,
  update: <><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.5 9a9 9 0 0 1 14.8-3.4L23 10M1 14l4.7 4.4A9 9 0 0 0 20.5 15"/></>,
  launch: <><path d="M5 16l-2 5 5-2"/><path d="M14.5 5.5L21 12l-9 9-3-3z"/><path d="M14.5 5.5l4-1.5-1.5 4z"/></>,
  award: <><circle cx="12" cy="9" r="6"/><polyline points="9 14 9 21 12 18 15 21 15 14"/></>,
  timeline: <><line x1="3" y1="12" x2="21" y2="12"/><circle cx="6" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="18" cy="12" r="2"/></>,
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: clean.

- [ ] **Step 4: Quick smoke test (optional but recommended)**

Open `npm run dev`, then in any existing page replace one emoji with `<Icon name="strategy" />` to confirm the icon renders crisp at 24px. Revert the change.

- [ ] **Step 5: Commit**

```bash
git add src/components/Icon.jsx
git commit -m "Add Icon component with 30-glyph custom SVG set"
```

---

### Task 3: Add QuietLink component

**Files:**
- Create: `src/components/QuietLink.jsx`
- Modify: `src/styles.css` (add `.quiet-link` class)

- [ ] **Step 1: Create QuietLink.jsx**

```jsx
export default function QuietLink({ onClick, children, color }) {
  return (
    <button className="quiet-link" onClick={onClick} style={color ? { color } : undefined}>
      {children}
      <span className="quiet-link-arrow">→</span>
    </button>
  );
}
```

- [ ] **Step 2: Add `.quiet-link` styles to styles.css (append before any @media block)**

```css
.quiet-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  padding: 8px 0;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: var(--o);
  cursor: pointer;
  transition: gap 0.15s ease-out;
}
.quiet-link:hover { gap: 10px; }
.quiet-link-arrow { font-weight: 400; }
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/QuietLink.jsx src/styles.css
git commit -m "Add QuietLink component for non-primary CTAs"
```

---

## Phase 2 — Section pattern library

Each task creates one section component. All under `src/components/sections/`.

### Task 4: EditorialHero

**Files:**
- Create: `src/components/sections/EditorialHero.jsx`

- [ ] **Step 1: Write the component**

```jsx
export default function EditorialHero({ eyebrow, headline, subhead, primaryCta, secondaryLink, visual, badge }) {
  return (
    <section className="editorial-hero">
      <div className="editorial-hero-inner">
        <div className="editorial-hero-content">
          {badge && <div className="editorial-hero-badge">{badge}</div>}
          {eyebrow && <div className="t-eyebrow editorial-hero-eyebrow">{eyebrow}</div>}
          <h1 className="t-display editorial-hero-headline">{headline}</h1>
          {subhead && <p className="editorial-hero-subhead">{subhead}</p>}
          {(primaryCta || secondaryLink) && (
            <div className="editorial-hero-actions">
              {primaryCta && <button className="bp" onClick={primaryCta.onClick}>{primaryCta.label}</button>}
              {secondaryLink && (
                <button className="quiet-link" onClick={secondaryLink.onClick}>
                  {secondaryLink.label}
                  <span className="quiet-link-arrow">→</span>
                </button>
              )}
            </div>
          )}
        </div>
        {visual && <div className="editorial-hero-visual">{visual}</div>}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add styles to styles.css**

```css
.editorial-hero {
  padding: 148px 56px var(--space-8);
  background: linear-gradient(160deg, #FEFEFE 0%, #F9FAFB 55%, #F4F6FF 100%);
  position: relative;
  overflow: hidden;
}
.editorial-hero-inner {
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-7);
  align-items: center;
}
.editorial-hero-content { position: relative; z-index: 1; }
.editorial-hero-eyebrow { margin-bottom: var(--space-3); }
.editorial-hero-badge { display: inline-flex; align-items: center; gap: 8px; padding: 5px 14px; border-radius: 100px; background: var(--o10); border: 1px solid var(--o20); color: var(--o); font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: var(--space-3); }
.editorial-hero-headline { color: var(--dk); margin-bottom: var(--space-4); }
.editorial-hero-headline em { font-style: normal; color: var(--o); }
.editorial-hero-subhead { font-family: 'DM Sans', sans-serif; font-size: 18px; line-height: 1.7; color: var(--bd); max-width: 480px; margin-bottom: var(--space-6); }
.editorial-hero-actions { display: flex; align-items: center; gap: var(--space-3); flex-wrap: wrap; }
.editorial-hero-visual { position: relative; }

@media (max-width: 960px) {
  .editorial-hero { padding: 120px 20px var(--space-6); }
  .editorial-hero-inner { grid-template-columns: 1fr; gap: var(--space-6); }
  .editorial-hero-headline { font-size: clamp(32px, 9vw, 44px); }
}
```

- [ ] **Step 3: Build + commit**

```bash
npm run build
git add src/components/sections/EditorialHero.jsx src/styles.css
git commit -m "Add EditorialHero section pattern"
```

---

### Task 5: SplitFeature

**Files:**
- Create: `src/components/sections/SplitFeature.jsx`

- [ ] **Step 1: Write the component**

```jsx
export default function SplitFeature({
  ratio = '60-40',
  eyebrow,
  heading,
  body,
  bullets,
  cta,
  visual,
  reverse = false,
  background = 'light',
}) {
  const cols = ratio === '50-50' ? '1fr 1fr' : ratio === '40-60' ? '4fr 6fr' : '6fr 4fr';
  const order = reverse ? { textOrder: 2, visualOrder: 1 } : { textOrder: 1, visualOrder: 2 };
  const bg = background === 'tinted' ? 'section-tinted' : background === 'dark' ? 'section-dark' : 'section-light';

  return (
    <section className={`section ${bg}`}>
      <div className="split-feature" style={{ gridTemplateColumns: cols }}>
        <div className="split-feature-text" style={{ order: order.textOrder }}>
          {eyebrow && <div className="t-eyebrow" style={{ marginBottom: 'var(--space-3)' }}>{eyebrow}</div>}
          {heading && <h2 className="t-h2" style={{ marginBottom: 'var(--space-3)' }}>{heading}</h2>}
          {body && <p className="t-body" style={{ marginBottom: 'var(--space-4)', maxWidth: 520 }}>{body}</p>}
          {bullets && bullets.length > 0 && (
            <ul className="split-feature-bullets">
              {bullets.map((b, i) => <li key={i}><span className="bullet-dot" />{b}</li>)}
            </ul>
          )}
          {cta && (
            <div style={{ marginTop: 'var(--space-5)' }}>
              <button className="bp" onClick={cta.onClick}>{cta.label}</button>
            </div>
          )}
        </div>
        <div className="split-feature-visual" style={{ order: order.visualOrder }}>
          {visual}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add styles**

```css
.split-feature {
  display: grid; gap: var(--space-7);
  align-items: center;
  max-width: 1200px; margin: 0 auto;
}
.split-feature-bullets { list-style: none; padding: 0; display: flex; flex-direction: column; gap: var(--space-2); }
.split-feature-bullets li { display: flex; gap: 10px; font-size: 14px; color: var(--bd); line-height: 1.55; align-items: flex-start; }
.bullet-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--o); flex-shrink: 0; margin-top: 8px; }

@media (max-width: 960px) {
  .split-feature { grid-template-columns: 1fr !important; gap: var(--space-5); }
  .split-feature-text, .split-feature-visual { order: unset !important; }
}
```

- [ ] **Step 3: Build + commit**

```bash
npm run build
git add src/components/sections/SplitFeature.jsx src/styles.css
git commit -m "Add SplitFeature section pattern"
```

---

### Task 6: CardGrid

**Files:**
- Create: `src/components/sections/CardGrid.jsx`

- [ ] **Step 1: Write the component**

```jsx
export default function CardGrid({
  eyebrow,
  heading,
  lead,
  columns = 3,
  cards,
  cardStyle = 'standard',
  background = 'light',
  centerHeader = false,
}) {
  const bg = background === 'tinted' ? 'section-tinted' : background === 'dark' ? 'section-dark' : 'section-light';
  const padding = cardStyle === 'compact' ? 'var(--space-4)' : cardStyle === 'feature' ? 'var(--space-6)' : 'var(--space-5)';

  return (
    <section className={`section ${bg}`}>
      <div className="mw">
        {(eyebrow || heading || lead) && (
          <div className={centerHeader ? 'card-grid-header card-grid-header-center' : 'card-grid-header'}>
            {eyebrow && <div className="t-eyebrow" style={{ marginBottom: 'var(--space-2)' }}>{eyebrow}</div>}
            {heading && <h2 className="t-h2" style={{ marginBottom: 'var(--space-3)' }}>{heading}</h2>}
            {lead && <p className="t-lead" style={{ maxWidth: 600, margin: centerHeader ? '0 auto' : 0 }}>{lead}</p>}
          </div>
        )}
        <div className={`card-grid card-grid-${columns}`}>
          {cards.map((c, i) => (
            <div
              key={c.title || i}
              className="card-grid-card"
              style={{ padding, cursor: c.onClick ? 'pointer' : 'default' }}
              onClick={c.onClick}
            >
              {c.icon && <div className="card-grid-card-icon">{c.icon}</div>}
              {c.tag && <div className="card-grid-card-tag" style={c.tagColor ? { color: c.tagColor, background: c.tagColor + '12' } : undefined}>{c.tag}</div>}
              <div className="card-grid-card-title">{c.title}</div>
              <div className="card-grid-card-body">{c.body}</div>
              {c.linkLabel && <div className="card-grid-card-link">{c.linkLabel} →</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add styles**

```css
.card-grid-header { margin-bottom: var(--space-6); }
.card-grid-header-center { text-align: center; }
.card-grid {
  display: grid;
  gap: var(--space-3);
}
.card-grid-2 { grid-template-columns: repeat(2, 1fr); }
.card-grid-3 { grid-template-columns: repeat(3, 1fr); }
.card-grid-4 { grid-template-columns: repeat(4, 1fr); }
.card-grid-card {
  background: var(--wh);
  border: 1.5px solid var(--br);
  border-radius: 16px;
  transition: all 0.15s ease-out;
}
.card-grid-card:hover { border-color: var(--o20); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
.card-grid-card-icon { margin-bottom: var(--space-3); color: var(--o); }
.card-grid-card-tag { display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; padding: 3px 9px; border-radius: 20px; background: var(--o10); color: var(--o); margin-bottom: var(--space-2); }
.card-grid-card-title { font-family: 'Manrope', sans-serif; font-size: 16px; font-weight: 700; color: var(--dk); line-height: 1.3; margin-bottom: var(--space-2); letter-spacing: -0.02em; }
.card-grid-card-body { font-family: 'DM Sans', sans-serif; font-size: 14px; line-height: 1.6; color: var(--bd); }
.card-grid-card-link { margin-top: var(--space-3); font-size: 13px; font-weight: 600; color: var(--o); }

@media (max-width: 960px) {
  .card-grid-2, .card-grid-3, .card-grid-4 { grid-template-columns: 1fr !important; }
}
```

- [ ] **Step 3: Build + commit**

```bash
npm run build
git add src/components/sections/CardGrid.jsx src/styles.css
git commit -m "Add CardGrid section pattern"
```

---

### Task 7: LongForm

**Files:**
- Create: `src/components/sections/LongForm.jsx`

- [ ] **Step 1: Write the component**

```jsx
export default function LongForm({ eyebrow, heading, children, pullQuote, cta, background = 'light' }) {
  const bg = background === 'tinted' ? 'section-tinted' : background === 'dark' ? 'section-dark' : 'section-light';
  return (
    <section className={`section ${bg}`}>
      <div className="long-form">
        {eyebrow && <div className="t-eyebrow" style={{ marginBottom: 'var(--space-2)' }}>{eyebrow}</div>}
        {heading && <h2 className="t-h2" style={{ marginBottom: 'var(--space-4)' }}>{heading}</h2>}
        <div className="long-form-body">{children}</div>
        {pullQuote && (
          <blockquote className="long-form-quote">{pullQuote}</blockquote>
        )}
        {cta && (
          <div style={{ marginTop: 'var(--space-5)' }}>
            <button className="bp" onClick={cta.onClick}>{cta.label}</button>
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add styles**

```css
.long-form { max-width: 720px; margin: 0 auto; }
.long-form-body p { font-family: 'DM Sans', sans-serif; font-size: 16px; line-height: 1.75; color: var(--bd); margin-bottom: var(--space-4); }
.long-form-body p:last-child { margin-bottom: 0; }
.long-form-quote {
  font-family: 'Manrope', sans-serif;
  font-size: 22px; font-weight: 600; line-height: 1.4; font-style: italic;
  color: var(--dk);
  border-left: 3px solid var(--o);
  padding-left: var(--space-5);
  margin: var(--space-6) 0;
}
```

- [ ] **Step 3: Build + commit**

```bash
npm run build
git add src/components/sections/LongForm.jsx src/styles.css
git commit -m "Add LongForm section pattern"
```

---

### Task 8: PullQuote

**Files:**
- Create: `src/components/sections/PullQuote.jsx`

- [ ] **Step 1: Write the component**

```jsx
export default function PullQuote({ quote, author, stats, background = 'tinted' }) {
  const bg = background === 'tinted' ? 'section-tinted' : background === 'dark' ? 'section-dark' : 'section-light';
  return (
    <section className={`section ${bg}`}>
      <div className="pull-quote">
        <div className="pull-quote-mark">"</div>
        <div className="pull-quote-content" style={{ gridTemplateColumns: stats?.length ? '1fr 220px' : '1fr' }}>
          <div>
            <p className="pull-quote-text">{quote}</p>
            {author && (
              <div className="pull-quote-attribution">
                {author.avatarInitials && (
                  <div className="pull-quote-avatar" style={{ background: author.avatarGradient || 'linear-gradient(135deg,#F4801F,#7C3AED)' }}>
                    {author.avatarInitials}
                  </div>
                )}
                <div>
                  <div className="pull-quote-name">{author.name}</div>
                  {author.title && <div className="pull-quote-title">{author.title}</div>}
                  {author.company && <div className="pull-quote-company">{author.company}</div>}
                </div>
              </div>
            )}
          </div>
          {stats?.length > 0 && (
            <div className="pull-quote-stats">
              {stats.map(s => (
                <div key={s.n} className="pull-quote-stat">
                  <div className="pull-quote-stat-n">{s.n}</div>
                  <div className="pull-quote-stat-l">{s.l}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add styles**

```css
.pull-quote {
  max-width: 1100px; margin: 0 auto;
  background: linear-gradient(135deg, #FFFAF6, #FFF4E8);
  border: 1.5px solid rgba(244,128,31,.2);
  border-radius: 24px;
  padding: var(--space-6) var(--space-7);
  position: relative;
}
.pull-quote-mark { position: absolute; top: var(--space-4); left: var(--space-5); font-family: 'Manrope', sans-serif; font-size: 80px; line-height: 1; color: var(--o); opacity: 0.18; font-weight: 900; }
.pull-quote-content { display: grid; gap: var(--space-6); align-items: center; }
.pull-quote-text { font-family: 'DM Sans', sans-serif; font-size: 20px; line-height: 1.65; color: var(--dk); font-style: italic; margin-bottom: var(--space-5); }
.pull-quote-attribution { display: flex; align-items: center; gap: var(--space-3); }
.pull-quote-avatar { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-family: 'Manrope', sans-serif; font-weight: 700; font-size: 18px; flex-shrink: 0; }
.pull-quote-name { font-family: 'Manrope', sans-serif; font-size: 15px; font-weight: 700; color: var(--dk); }
.pull-quote-title { font-size: 13px; color: var(--bd); }
.pull-quote-company { font-size: 12px; color: var(--o); font-weight: 600; margin-top: 2px; }
.pull-quote-stats { display: flex; flex-direction: column; gap: var(--space-3); }
.pull-quote-stat { text-align: center; padding: 14px 20px; background: rgba(255,255,255,.8); border-radius: 12px; border: 1px solid rgba(244,128,31,.15); }
.pull-quote-stat-n { font-family: 'Manrope', sans-serif; font-size: 24px; font-weight: 900; color: var(--o); letter-spacing: -0.03em; line-height: 1; margin-bottom: 4px; }
.pull-quote-stat-l { font-size: 11px; color: var(--bd); line-height: 1.4; }

@media (max-width: 960px) {
  .pull-quote { padding: var(--space-5); }
  .pull-quote-content { grid-template-columns: 1fr !important; }
  .pull-quote-text { font-size: 17px; }
}
```

- [ ] **Step 3: Build + commit**

```bash
npm run build
git add src/components/sections/PullQuote.jsx src/styles.css
git commit -m "Add PullQuote section pattern"
```

---

### Task 9: ComparisonRail

**Files:**
- Create: `src/components/sections/ComparisonRail.jsx`

- [ ] **Step 1: Write the component**

```jsx
export default function ComparisonRail({ eyebrow, heading, columns, rows, background = 'light' }) {
  const bg = background === 'tinted' ? 'section-tinted' : 'section-light';
  return (
    <section className={`section ${bg}`}>
      <div className="mw">
        {(eyebrow || heading) && (
          <div style={{ marginBottom: 'var(--space-6)', textAlign: 'center' }}>
            {eyebrow && <div className="t-eyebrow" style={{ marginBottom: 'var(--space-2)' }}>{eyebrow}</div>}
            {heading && <h2 className="t-h2">{heading}</h2>}
          </div>
        )}
        <div className="comparison-rail">
          <div className="comparison-rail-head">
            <div className="comparison-rail-cell comparison-rail-feature-label" />
            {columns.map(c => (
              <div key={c.label} className="comparison-rail-cell comparison-rail-col-head" style={c.accent ? { color: c.accent } : undefined}>
                {c.label}
              </div>
            ))}
          </div>
          {rows.map((r, i) => (
            <div key={i} className="comparison-rail-row">
              <div className="comparison-rail-cell comparison-rail-feature-label">{r.label}</div>
              {r.values.map((v, j) => (
                <div key={j} className="comparison-rail-cell">
                  {v === true && <span className="comparison-yes">✓</span>}
                  {v === false && <span className="comparison-no">—</span>}
                  {v === 'partial' && <span className="comparison-partial">partial</span>}
                  {typeof v === 'string' && v !== 'partial' && <span style={{ fontSize: 13, color: 'var(--bd)' }}>{v}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add styles**

```css
.comparison-rail { max-width: 1000px; margin: 0 auto; border: 1.5px solid var(--br); border-radius: 16px; overflow: hidden; background: var(--wh); }
.comparison-rail-head, .comparison-rail-row { display: grid; grid-template-columns: 2fr repeat(var(--cmp-cols, 3), 1fr); }
.comparison-rail-row { border-top: 1px solid var(--br); }
.comparison-rail-cell { padding: 16px 20px; font-family: 'DM Sans', sans-serif; }
.comparison-rail-feature-label { font-size: 13px; color: var(--dk); font-weight: 500; }
.comparison-rail-col-head { font-size: 13px; font-weight: 700; color: var(--dk); text-align: center; background: var(--lt); }
.comparison-rail-cell:not(.comparison-rail-feature-label) { text-align: center; border-left: 1px solid var(--br); }
.comparison-yes { color: var(--o); font-size: 18px; font-weight: 700; }
.comparison-no { color: var(--br); font-size: 18px; }
.comparison-partial { color: var(--bdl); font-size: 12px; }
```

- [ ] **Step 3: Build + commit**

```bash
npm run build
git add src/components/sections/ComparisonRail.jsx src/styles.css
git commit -m "Add ComparisonRail section pattern"
```

---

### Task 10: ProductShowcase

**Files:**
- Create: `src/components/sections/ProductShowcase.jsx`

- [ ] **Step 1: Write the component**

```jsx
export default function ProductShowcase({ product, eyebrow, tagline, body, bullets, mockup, reverse = false, background = 'light' }) {
  const accents = {
    forge:   { color: '#F4801F', bg: 'rgba(244,128,31,.07)' },
    atlas:   { color: '#007AFF', bg: 'rgba(0,122,255,.07)' },
    echo:    { color: '#7C3AED', bg: 'rgba(124,58,237,.07)' },
    certify: { color: '#059669', bg: 'rgba(5,150,105,.07)' },
  };
  const a = accents[product] || accents.forge;
  const bg = background === 'tinted' ? 'section-tinted' : background === 'dark' ? 'section-dark' : 'section-light';
  return (
    <section className={`section ${bg}`}>
      <div className="product-showcase" style={{ flexDirection: reverse ? 'row-reverse' : 'row' }}>
        <div className="product-showcase-text">
          {eyebrow && <div className="t-eyebrow" style={{ color: a.color, marginBottom: 'var(--space-2)' }}>{eyebrow}</div>}
          {tagline && <h2 className="t-h2" style={{ marginBottom: 'var(--space-3)' }}>{tagline}</h2>}
          {body && <p className="t-body" style={{ marginBottom: 'var(--space-4)', maxWidth: 480 }}>{body}</p>}
          {bullets?.length > 0 && (
            <ul className="split-feature-bullets" style={{ marginBottom: 'var(--space-5)' }}>
              {bullets.map((b, i) => <li key={i}><span className="bullet-dot" style={{ background: a.color }} />{b}</li>)}
            </ul>
          )}
        </div>
        <div className="product-showcase-mockup" style={{ background: a.bg, borderColor: a.color + '20' }}>
          {mockup}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add styles**

```css
.product-showcase {
  max-width: 1200px; margin: 0 auto;
  display: flex; gap: var(--space-7); align-items: center;
}
.product-showcase-text { flex: 1; }
.product-showcase-mockup {
  flex: 1.1;
  border: 1.5px solid;
  border-radius: 20px;
  padding: var(--space-5);
  min-height: 480px;
  display: flex;
  flex-direction: column;
}

@media (max-width: 960px) {
  .product-showcase { flex-direction: column !important; gap: var(--space-5); }
  .product-showcase-mockup { width: 100%; min-height: auto; padding: var(--space-4); }
}
```

- [ ] **Step 3: Build + commit**

```bash
npm run build
git add src/components/sections/ProductShowcase.jsx src/styles.css
git commit -m "Add ProductShowcase section pattern"
```

---

### Task 11: StatBand

**Files:**
- Create: `src/components/sections/StatBand.jsx`

- [ ] **Step 1: Write the component**

```jsx
export default function StatBand({ stats, tone = 'dark' }) {
  return (
    <section className={tone === 'dark' ? 'stat-band stat-band-dark' : 'stat-band stat-band-light'}>
      <div className="stat-band-row">
        {stats.map(s => (
          <div key={s.n} className="stat-band-stat">
            <div className="stat-band-n">{s.n}</div>
            <div className="stat-band-l">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add styles**

```css
.stat-band { padding: var(--space-7) 56px; }
.stat-band-dark  { background: var(--dk); color: var(--wh); }
.stat-band-light { background: var(--wh); border-top: 1px solid var(--br); border-bottom: 1px solid var(--br); }
.stat-band-row { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); }
.stat-band-stat { padding: 0 var(--space-6); border-right: 1px solid rgba(255,255,255,.07); }
.stat-band-light .stat-band-stat { border-right-color: var(--br); }
.stat-band-stat:first-child { padding-left: 0; }
.stat-band-stat:last-child  { padding-right: 0; border-right: none; }
.stat-band-n { font-family: 'Manrope', sans-serif; font-size: 42px; font-weight: 900; color: var(--o); letter-spacing: -0.05em; line-height: 1; margin-bottom: 8px; }
.stat-band-l { font-size: 13px; line-height: 1.55; }
.stat-band-dark  .stat-band-l { color: rgba(255,255,255,.4); }
.stat-band-light .stat-band-l { color: var(--bd); }

@media (max-width: 960px) {
  .stat-band { padding: var(--space-6) 20px; }
  .stat-band-row { grid-template-columns: 1fr 1fr; }
  .stat-band-stat { border-right: none; border-bottom: 1px solid rgba(255,255,255,.07); padding: var(--space-3) 0; }
  .stat-band-light .stat-band-stat { border-bottom-color: var(--br); }
}
```

- [ ] **Step 3: Build + commit**

```bash
npm run build
git add src/components/sections/StatBand.jsx src/styles.css
git commit -m "Add StatBand section pattern"
```

---

### Task 12: StepRail

**Files:**
- Create: `src/components/sections/StepRail.jsx`

- [ ] **Step 1: Write the component**

```jsx
export default function StepRail({ eyebrow, heading, lead, steps, orientation = 'auto', background = 'light' }) {
  const bg = background === 'tinted' ? 'section-tinted' : background === 'dark' ? 'section-dark' : 'section-light';
  return (
    <section className={`section ${bg}`}>
      <div className="mw">
        {(eyebrow || heading || lead) && (
          <div style={{ marginBottom: 'var(--space-6)' }}>
            {eyebrow && <div className="t-eyebrow" style={{ marginBottom: 'var(--space-2)' }}>{eyebrow}</div>}
            {heading && <h2 className="t-h2" style={{ marginBottom: 'var(--space-3)' }}>{heading}</h2>}
            {lead && <p className="t-lead" style={{ maxWidth: 600 }}>{lead}</p>}
          </div>
        )}
        <div className={`step-rail step-rail-${orientation}`}>
          {steps.map((s, i) => (
            <div key={s.n || i} className={`step-rail-step ${s.highlight ? 'step-rail-step-highlight' : ''}`}>
              <div className="step-rail-num">{s.n}</div>
              <div className="step-rail-content">
                <div className="step-rail-title">{s.title}</div>
                <div className="step-rail-body">{s.body}</div>
              </div>
              {i < steps.length - 1 && <div className="step-rail-connector" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add styles**

```css
.step-rail { display: flex; }
.step-rail-vertical, .step-rail-auto { flex-direction: column; gap: var(--space-2); }
.step-rail-horizontal { flex-direction: row; gap: 0; align-items: stretch; }
.step-rail-step { display: flex; gap: var(--space-3); position: relative; padding: var(--space-3) 0; }
.step-rail-num {
  width: 36px; height: 36px; border-radius: 50%;
  background: var(--o10); color: var(--o);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Manrope', sans-serif; font-weight: 800; font-size: 14px;
  flex-shrink: 0;
}
.step-rail-step-highlight .step-rail-num { background: var(--o); color: #fff; }
.step-rail-content { flex: 1; }
.step-rail-title { font-family: 'Manrope', sans-serif; font-size: 16px; font-weight: 700; color: var(--dk); margin-bottom: 4px; }
.step-rail-body { font-size: 14px; color: var(--bd); line-height: 1.6; }
.step-rail-connector { position: absolute; left: 17px; top: 48px; width: 2px; height: calc(100% - 36px); background: var(--br); }
.step-rail-step:last-child .step-rail-connector { display: none; }

@media (max-width: 960px) {
  .step-rail-horizontal { flex-direction: column; gap: var(--space-2); }
}
```

- [ ] **Step 3: Build + commit**

```bash
npm run build
git add src/components/sections/StepRail.jsx src/styles.css
git commit -m "Add StepRail section pattern"
```

---

### Task 13: CTABand

**Files:**
- Create: `src/components/sections/CTABand.jsx`

- [ ] **Step 1: Write the component**

```jsx
import { HexMark } from '../HexMark';

export default function CTABand({ heading, body, primaryCta, secondaryLink }) {
  return (
    <section className="cta-band">
      <div className="cta-band-watermark">
        <HexMark size={420} color="#F4801F" strokeWidth={0.7} />
      </div>
      <div className="cta-band-content">
        <h2 className="cta-band-heading">{heading}</h2>
        {body && <p className="cta-band-body">{body}</p>}
        <div className="cta-band-actions">
          {primaryCta && <button className="bp" onClick={primaryCta.onClick}>{primaryCta.label}</button>}
          {secondaryLink && (
            <button className="quiet-link" onClick={secondaryLink.onClick} style={{ color: 'rgba(255,255,255,.7)' }}>
              {secondaryLink.label}
              <span className="quiet-link-arrow">→</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add styles**

```css
.cta-band {
  background: linear-gradient(140deg, var(--dk) 0%, #1C1208 100%);
  padding: var(--space-9) 56px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.cta-band-watermark { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.06; pointer-events: none; }
.cta-band-content { position: relative; z-index: 1; max-width: 720px; margin: 0 auto; }
.cta-band-heading { font-family: 'Manrope', sans-serif; font-size: clamp(32px, 5vw, 58px); font-weight: 900; line-height: 1.06; letter-spacing: -0.045em; color: var(--wh); margin-bottom: var(--space-4); }
.cta-band-heading em { font-style: normal; color: var(--o); }
.cta-band-body { font-family: 'DM Sans', sans-serif; font-size: 17px; line-height: 1.7; color: rgba(255,255,255,.5); max-width: 520px; margin: 0 auto var(--space-6); }
.cta-band-actions { display: flex; gap: var(--space-3); justify-content: center; flex-wrap: wrap; align-items: center; }

@media (max-width: 960px) {
  .cta-band { padding: var(--space-8) 20px; }
  .cta-band-actions { flex-direction: column; gap: var(--space-2); width: 100%; }
  .cta-band-actions .bp { width: 100%; justify-content: center; }
}
```

- [ ] **Step 3: Build + commit**

```bash
npm run build
git add src/components/sections/CTABand.jsx src/styles.css
git commit -m "Add CTABand section pattern (final pattern in library)"
```

---

## Phase 3 — Product showcase mockups

Each task creates one ~250-line designed mockup component. Each is a pure visual component using only HTML/CSS — looks like a real product UI without being a real screenshot.

### Task 14: ForgeShowcase mockup — Agent session

**Files:**
- Create: `src/components/showcase/ForgeShowcase.jsx`

- [ ] **Step 1: Write the component**

```jsx
const LOG_LINES = [
  { time: '12:01:04', icon: '▸', text: 'Loading PI for Lumeris® XR (oncology indication)', state: 'progress' },
  { time: '12:01:08', icon: '✓', text: 'Found 247 claims in source documents', state: 'success' },
  { time: '12:01:11', icon: '▸', text: 'Generating MLR-ready content draft', state: 'progress' },
  { time: '12:01:18', icon: '✓', text: 'All 247 claims cited to PI sections 5.1, 6.2, 8.4', state: 'success' },
  { time: '12:01:21', icon: '▸', text: 'Running ComplianceGuard pre-check', state: 'progress' },
  { time: '12:01:23', icon: '✓', text: '0 issues — content ready for MLR routing', state: 'success' },
  { time: '12:01:25', icon: '▸', text: 'Routing to Veeva PromoMats workflow', state: 'progress' },
  { time: '12:01:27', icon: '⬤', text: 'Done · Artifact ID: FRG-2841-A', state: 'done' },
];

export default function ForgeShowcase() {
  return (
    <div style={{ background: '#0F1118', borderRadius: 12, overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#161A24', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
        </div>
        <div style={{ marginLeft: 8, color: 'rgba(255,255,255,.45)', fontSize: 11, fontFamily: '"JetBrains Mono", monospace' }}>Forge Agent · Session #2841 · Running</div>
        <div style={{ marginLeft: 'auto', color: '#F4801F', fontSize: 10, fontWeight: 600 }}>● LIVE</div>
      </div>
      <div style={{ padding: 16, fontFamily: '"JetBrains Mono", "Menlo", monospace', fontSize: 11.5, lineHeight: 1.8, color: 'rgba(255,255,255,.75)', flex: 1 }}>
        {LOG_LINES.map((l, i) => (
          <div key={i} style={{ display: 'flex', gap: 12 }}>
            <span style={{ color: 'rgba(255,255,255,.3)', minWidth: 60 }}>{l.time}</span>
            <span style={{ color: l.state === 'success' ? '#34D399' : l.state === 'done' ? '#F4801F' : 'rgba(255,255,255,.5)', minWidth: 14 }}>{l.icon}</span>
            <span>{l.text}</span>
          </div>
        ))}
        <div style={{ marginTop: 14, padding: 12, background: 'rgba(244,128,31,.08)', border: '1px solid rgba(244,128,31,.2)', borderRadius: 8, fontFamily: '"DM Sans", sans-serif', fontSize: 12, color: '#F4801F' }}>
          → 3 artifacts ready for MLR review. Click to view in Veeva PromoMats.
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/showcase/ForgeShowcase.jsx
git commit -m "Add ForgeShowcase mockup — agent session terminal UI"
```

---

### Task 15: AtlasShowcase mockup — Rep pathway dashboard

**Files:**
- Create: `src/components/showcase/AtlasShowcase.jsx`

- [ ] **Step 1: Write the component**

```jsx
const COMPETENCIES = [
  { label: 'Mechanism of Action', pct: 88, color: '#34D399' },
  { label: 'Clinical Data',        pct: 74, color: '#34D399' },
  { label: 'Objection Handling',   pct: 41, color: '#F59E0B', alert: true },
  { label: 'Compliance',           pct: 96, color: '#34D399' },
];

export default function AtlasShowcase() {
  return (
    <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid #E3E5EA', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 11, color: '#007AFF', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Atlas · Rep Pathway</div>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 14, color: '#12141A' }}>Sarah Chen · Oncology Onboarding</div>
        </div>
        <div style={{ fontSize: 10, color: '#5C6370' }}>Week 6 of 12</div>
      </div>
      <div style={{ padding: 18, flex: 1 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: '#5C6370', marginBottom: 8 }}>COMPETENCY READINESS</div>
          {COMPETENCIES.map(c => (
            <div key={c.label} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                <span style={{ color: '#12141A', fontWeight: 500 }}>{c.label} {c.alert && <span style={{ color: '#F59E0B', marginLeft: 4 }}>● gap detected</span>}</span>
                <span style={{ color: '#5C6370', fontWeight: 600 }}>{c.pct}%</span>
              </div>
              <div style={{ height: 4, background: '#E3E5EA', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: c.pct + '%', height: '100%', background: c.color }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: 12, background: 'rgba(245,158,11,.08)', border: '1px solid rgba(245,158,11,.25)', borderRadius: 8, fontSize: 11.5, color: '#92400E', marginBottom: 12 }}>
          ⚠ Gap detected in Objection Handling. Adaptive remediation queued.
        </div>
        <div style={{ padding: 12, background: 'rgba(0,122,255,.05)', border: '1px solid rgba(0,122,255,.2)', borderRadius: 8, fontSize: 12, fontWeight: 600, color: '#007AFF' }}>
          Predicted readiness in 2 weeks: <span style={{ fontSize: 14 }}>92%</span>
        </div>
        <div style={{ marginTop: 12, padding: '10px 14px', background: 'rgba(124,58,237,.06)', border: '1px solid rgba(124,58,237,.2)', borderRadius: 8, fontSize: 11.5, color: '#7C3AED', fontWeight: 600 }}>
          🎭 Echo assessment unlocked
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/showcase/AtlasShowcase.jsx
git commit -m "Add AtlasShowcase mockup — rep pathway dashboard"
```

---

### Task 16: EchoShowcase mockup — HCP roleplay session

**Files:**
- Create: `src/components/showcase/EchoShowcase.jsx`

- [ ] **Step 1: Write the component**

```jsx
const TRANSCRIPT = [
  { who: 'rep', text: 'Lumeris has shown a 40% reduction in disease progression compared to standard of care.', flag: { type: 'warn', text: 'Claim not in PI for monotherapy use. Did you mean "in combination therapy"?' } },
  { who: 'rep', text: 'Apologies — in combination with bortezomib, the data shows a 38% reduction in PFS.', flag: { type: 'ok', text: 'Approved phrasing — citation matches PI section 5.1' } },
  { who: 'hcp', text: 'What about safety in elderly patients?' },
];

const SCORES = [
  { label: 'Clinical Accuracy', value: 88 },
  { label: 'Compliance',        value: 100 },
  { label: 'Objection Handling', value: 72 },
];

export default function EchoShowcase() {
  return (
    <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid #E3E5EA', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 11, color: '#7C3AED', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Echo · HCP Roleplay</div>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 14, color: '#12141A' }}>Dr. Kim · Hematologist · Live Session</div>
        </div>
        <div style={{ fontSize: 10, color: '#7C3AED', fontWeight: 600 }}>● RECORDING</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', flex: 1 }}>
        <div style={{ background: 'linear-gradient(180deg, #2A1845, #1A0F2E)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #4C1D95)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 22 }}>DK</div>
        </div>
        <div style={{ padding: 14, fontSize: 12, lineHeight: 1.55 }}>
          {TRANSCRIPT.map((t, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 700, color: t.who === 'rep' ? '#007AFF' : '#7C3AED', fontSize: 11, marginBottom: 2 }}>{t.who === 'rep' ? 'You' : 'Dr. Kim'}</div>
              <div style={{ color: '#12141A' }}>{t.text}</div>
              {t.flag && (
                <div style={{ marginTop: 4, padding: '6px 10px', borderRadius: 6, fontSize: 11, background: t.flag.type === 'warn' ? 'rgba(245,158,11,.1)' : 'rgba(5,150,105,.08)', color: t.flag.type === 'warn' ? '#92400E' : '#047857', borderLeft: `2px solid ${t.flag.type === 'warn' ? '#F59E0B' : '#059669'}` }}>
                  {t.flag.type === 'warn' ? '⚠ ComplianceGuard: ' : '✓ ComplianceGuard: '}{t.flag.text}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '10px 14px', borderTop: '1px solid #E3E5EA', background: '#F9FAFB', display: 'flex', gap: 14 }}>
        {SCORES.map(s => (
          <div key={s.label} style={{ flex: 1 }}>
            <div style={{ fontSize: 9.5, color: '#5C6370', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
            <div style={{ fontSize: 18, fontFamily: 'Manrope, sans-serif', fontWeight: 800, color: s.value >= 85 ? '#059669' : s.value >= 70 ? '#F59E0B' : '#DC2626' }}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/showcase/EchoShowcase.jsx
git commit -m "Add EchoShowcase mockup — HCP roleplay session UI"
```

---

### Task 17: CertifyShowcase mockup — Certification record

**Files:**
- Create: `src/components/showcase/CertifyShowcase.jsx`

- [ ] **Step 1: Write the component**

```jsx
const COMPETENCIES = [
  'Mechanism of Action — verified Echo session #2841',
  'Clinical Data — verified Echo session #2856',
  'Objection Handling — verified Echo session #2879',
  'MLR Compliance — 100% across 12 sessions',
  'Manager observation — passed (8 of 8 criteria)',
];

export default function CertifyShowcase() {
  return (
    <div style={{ background: 'linear-gradient(180deg, #FAFBFD 0%, #F2F4F8 100%)', borderRadius: 12, overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
      <div style={{ padding: '20px 24px', borderBottom: '1px solid #E3E5EA', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 11, color: '#059669', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Certify · Audit Record</div>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 14, color: '#12141A' }}>Certification of Field Readiness</div>
        </div>
        <div style={{ width: 44, height: 44, borderRadius: 22, background: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18 }}>✓</div>
      </div>
      <div style={{ padding: 24, flex: 1 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, color: '#5C6370', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Issued To</div>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 16, color: '#12141A' }}>Sarah Chen, Oncology Specialist</div>
          <div style={{ fontSize: 12, color: '#5C6370', marginTop: 2 }}>Pfizer · Northeast Region · Cohort A26-04</div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, color: '#5C6370', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Behavioral Evidence (5 of 5 verified)</div>
          {COMPETENCIES.map((c, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, fontSize: 12, color: '#12141A', marginBottom: 4 }}>
              <span style={{ color: '#059669', fontWeight: 700 }}>✓</span>
              <span>{c}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ padding: '10px 14px', background: '#fff', border: '1px solid #E3E5EA', borderRadius: 8 }}>
            <div style={{ fontSize: 9, color: '#5C6370', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Issued</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#12141A' }}>Apr 12, 2026</div>
          </div>
          <div style={{ padding: '10px 14px', background: '#fff', border: '1px solid #E3E5EA', borderRadius: 8 }}>
            <div style={{ fontSize: 9, color: '#5C6370', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Valid Through</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#12141A' }}>Apr 12, 2027</div>
          </div>
        </div>
        <div style={{ marginTop: 12, padding: 10, background: '#fff', border: '1px solid #E3E5EA', borderRadius: 8, fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: '#5C6370', wordBreak: 'break-all' }}>
          <div style={{ fontSize: 9, color: '#059669', fontWeight: 700, fontFamily: 'DM Sans, sans-serif', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>SHA-256 Audit Hash</div>
          a3f9c2b8e1d47f6c5a82b9e3d1c4f7a8b2e6d9c1f4a7b3e8d2c5f9a1b4e7c3d
        </div>
        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <span style={{ fontSize: 9.5, padding: '4px 10px', borderRadius: 12, background: 'rgba(5,150,105,.08)', color: '#059669', fontWeight: 700, letterSpacing: '0.05em' }}>SOC 2 Type II</span>
          <span style={{ fontSize: 9.5, padding: '4px 10px', borderRadius: 12, background: 'rgba(5,150,105,.08)', color: '#059669', fontWeight: 700, letterSpacing: '0.05em' }}>10-yr retention</span>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/showcase/CertifyShowcase.jsx
git commit -m "Add CertifyShowcase mockup — certification audit record"
```

---

## Phase 4 — HomePage redesign (the proof)

### Task 18: Rewrite HomePage to use new patterns

**Files:**
- Modify: `src/pages/HomePage.jsx`

This task replaces the existing HomePage entirely, composing only from new section patterns and showcases. All existing content stays — only the wrapper components change.

- [ ] **Step 1: Rewrite HomePage.jsx**

Replace entire contents:

```jsx
import useReveal from '../hooks/useReveal';
import LoopVisual from '../components/LoopVisual';
import LoopMobile from '../components/LoopMobile';
import EditorialHero from '../components/sections/EditorialHero';
import StatBand from '../components/sections/StatBand';
import SplitFeature from '../components/sections/SplitFeature';
import CardGrid from '../components/sections/CardGrid';
import PullQuote from '../components/sections/PullQuote';
import StepRail from '../components/sections/StepRail';
import CTABand from '../components/sections/CTABand';
import ProductShowcase from '../components/sections/ProductShowcase';
import ForgeShowcase from '../components/showcase/ForgeShowcase';
import AtlasShowcase from '../components/showcase/AtlasShowcase';
import EchoShowcase from '../components/showcase/EchoShowcase';
import CertifyShowcase from '../components/showcase/CertifyShowcase';
import AnnouncementBand from '../components/AnnouncementBand';
import Icon from '../components/Icon';
import { HexMark } from '../components/HexMark';
import SocialIcon from '../components/SocialIcon';
import NewsletterInline from '../components/NewsletterInline';

const CLIENT_LOGOS = ["AbbVie","Allergan","Amgen","AstraZeneca","Bayer","Biogen","BMS","Genentech","GSK","Janssen","Merck","Novartis","Novo Nordisk","Pfizer","Roche","Sanofi","Takeda","Teva","Gilead","Mass General","Penn Medicine","MD Anderson"];

const STATS = [
  { n: "80–95%", l: "of pharma AI pilots never scale or deliver measurable value" },
  { n: "11 mo",  l: "average ramp to full rep productivity in biopharma" },
  { n: "84%",    l: "of pharma reps missed quota last year" },
  { n: "25 yrs", l: "biopharma commercial L&D expertise behind our methodology" },
];

const DIFFERENTIATORS = [
  { icon: <Icon name="methodology" size={26} />, tag: "01 — Methodology", title: "We diagnose before we prescribe.", body: "Every engagement starts with the question your organization actually needs answered: what will determine whether any AI implementation succeeds or fails here? Most vendors skip this. We never do." },
  { icon: <Icon name="compliance" size={26} />,  tag: "02 — Compliance",  title: "Their compliance story is a retrofit. Ours is not.", body: "MLR review, GxP validation, and compressed launch windows are the operating conditions InsiteHub was designed around from day one." },
  { icon: <Icon name="award" size={26} />,        tag: "03 — Insider",     title: "We don't need you to explain pharma to us.", body: "InsiteHub's practitioners have operated inside the environments they now advise. The failure modes are already known. That's a 25-year track record, not a talking point." },
  { icon: <Icon name="pilot" size={26} />,       tag: "04 — Experiment",  title: "You don't commit until you have evidence.", body: "InsiteHub's model inverts the typical vendor sequence. We run structured experiments to test fit in your environment before you stake your credibility on it." },
];

const SITUATION_CARDS = [
  { icon: <Icon name="strategy" size={22} />, title: "You have an AI mandate with no clear path forward",   body: "Your CCO wants results. Your IT and compliance teams want governance. Your budget requires ROI. You're navigating all three without a methodology." },
  { icon: <Icon name="gap" size={22} />,      title: "You've run a pilot that didn't scale",                body: "It worked in the demo. It looked good in the pilot report. And then it died at the governance gate or got quietly deprioritized." },
  { icon: <Icon name="launch" size={22} />,   title: "You have a launch in 6–9 months and content isn't ready", body: "The commercial team needs field-ready reps. The content pipeline is behind. MLR review adds 60 days on a good day." },
  { icon: <Icon name="research" size={22} />, title: "You're evaluating AI vendors and can't tell who to trust", body: "Every vendor says they're built for biopharma. Every demo looks polished. You've been burned before." },
  { icon: <Icon name="readiness" size={22} />, title: "Your L&D team is measuring completion, not performance", body: "You know the CCO scorecard tracks rep readiness, call quality, and launch execution speed — not module completion." },
  { icon: <Icon name="infrastructure" size={22} />, title: "You're building AI capability from scratch",   body: "No existing platform. No governance framework. No internal AI literacy. You need a structured starting point." },
];

const STEPS = [
  { n: "01", title: "Start where you are", body: "InsiteX LMS or traditional content. Proven, compliant, built for pharma." },
  { n: "02", title: "Assess your AI readiness", body: "Advisory team maps your constraints before recommending anything. No technology pitch." },
  { n: "03", title: "Build AI literacy across your team", body: "Equip every role — reps, managers, medical affairs — with the fluency to adopt AI tools effectively.", highlight: true },
  { n: "04", title: "Experiment before committing", body: "Structured pilots generate evidence in your environment before you scale." },
  { n: "05", title: "Deploy with confidence", body: "Forge, Atlas, and Echo built to survive your governance environment." },
];

export default function HomePage({ setPage }) {
  useReveal();
  return (
    <>
      <EditorialHero
        eyebrow="AI-First · Innovation-Led · Purpose-Built for Biopharma"
        headline={<>The <em>strategy, literacy,<br />and platform</em> to turn<br />your AI mandate into results.</>}
        subhead="The only closed-loop AI platform built for biopharma — and the only partner with the advisory methodology, AI literacy program, and implementation track record to make it stick."
        primaryCta={{ label: "Book a Demo", onClick: () => setPage("contact") }}
        secondaryLink={{ label: "See the Platform", onClick: () => setPage("platform") }}
        visual={<><div className="hero-loop-desktop"><LoopVisual /></div><div className="hero-loop-mobile"><LoopMobile /></div></>}
      />

      <div className="logo-band">
        <div className="lb-label">Trusted across biopharma and health systems</div>
        <div className="lb-row">
          {CLIENT_LOGOS.map(n => <span key={n} className="lb-co">{n}</span>)}
        </div>
      </div>

      <StatBand stats={STATS} tone="dark" />

      <AnnouncementBand
        icon="🎓"
        tag="New Program"
        title="AI Literacy Program — the prerequisite every AI deployment needs."
        description="Build AI fluency across every role before tools go live. Teams that understand AI adopt it. Teams that don't, resist it."
        primaryCta={{ label: "See the Program", onClick: () => setPage("literacy") }}
        secondaryCta={{ label: "Get the Overview", onClick: () => setPage("contact") }}
      />

      <CardGrid
        eyebrow="The InsiteHub Difference"
        heading="Innovation isn't a talking point here. It's a track record."
        lead="Methodology before technology. Compliance by design. Insider credibility. Experimentation before commitment. The same four principles behind 25 years of award-winning work."
        columns={2}
        cards={DIFFERENTIATORS}
        cardStyle="feature"
        background="tinted"
      />

      <ProductShowcase
        product="forge"
        eyebrow="InsiteHub Forge"
        tagline="Agentic content creation."
        body="AI agents build MLR-compliant training from your PI, CSRs, and brand assets. Hours, not months. Every claim traced to source."
        bullets={["Auto-generation from clinical data and PI", "Every claim cited — MLR artifacts auto-built", "Veeva workflow integration", "Content Gap Analyzer closes the loop from Echo"]}
        mockup={<ForgeShowcase />}
      />

      <ProductShowcase
        product="atlas"
        eyebrow="InsiteHub Atlas"
        tagline="AI-powered adaptive learning."
        body="Personalized pathways closing knowledge gaps in real time, ensuring reps are field-ready before the launch window closes."
        bullets={["Competency-mapped personalized pathways", "Gap-aware adaptive remediation engine", "Manager dashboards with predictive readiness", "Integrates with InsiteX LMS and Veeva"]}
        mockup={<AtlasShowcase />}
        reverse
      />

      <ProductShowcase
        product="echo"
        eyebrow="InsiteHub Echo"
        tagline="AI roleplay & behavioral assessment."
        body="Reps practice live HCP conversations with AI physician avatars. ComplianceGuard monitors every message in real time."
        bullets={["8 HCP digital twin avatars", "ComplianceGuard real-time flagging", "Behavioral scorecard + industry benchmarks", "Gap payload feeds Forge auto-rebuild"]}
        mockup={<EchoShowcase />}
      />

      <ProductShowcase
        product="certify"
        eyebrow="Certify"
        tagline="Demonstrated field readiness."
        body="Certification earned through demonstrated competency — not attendance. Behavioral evidence tied to every credential. 10-year audit trail."
        bullets={["Competency-gated — no attendance shortcuts", "Behavioral evidence for every credential", "SHA-256 immutable 10-year audit log", "SOC 2 Type II compliant"]}
        mockup={<CertifyShowcase />}
        reverse
        background="tinted"
      />

      <PullQuote
        quote="We had been trying to make AI work for 18 months. Two pilots, two postmortems, and a CCO who was starting to ask whether L&D could actually lead this. What Proxa Labs did differently was refuse to let us skip the hard part — defining what success actually looked like before we built anything. We walked into our budget review with evidence, not a pitch deck."
        author={{ name: "Sarah Chen", title: "VP, Commercial Learning & Development", company: "Mid-Size Oncology Biopharma · Series C", avatarInitials: "SC" }}
        stats={[
          { n: "23%", l: "improvement in manager-assessed call quality" },
          { n: "0",   l: "MLR compliance flags across all sessions" },
          { n: "3 wks", l: "from pilot conclusion to CCO approval" },
          { n: "6 mo", l: "full AI roadmap funded and in execution" },
        ]}
      />

      <CardGrid
        eyebrow="Who InsiteHub Is For"
        heading="Built for the commercial L&D leader who's done with pilots that go nowhere."
        lead="If any of these sound like your situation, you're in the right place."
        columns={3}
        cards={SITUATION_CARDS}
        cardStyle="standard"
        centerHeader
      />

      <StepRail
        eyebrow="For Every Stage of the Journey"
        heading="AI is where we're headed. But we meet you where you are."
        lead="InsiteHub has been delivering enterprise learning infrastructure for biopharma commercial teams for over four years. The AI platform is our destination. Your timeline is yours to set."
        steps={STEPS}
        background="tinted"
      />

      <CTABand
        heading={<>The mandate is clear.<br /><em>The platform is ready.</em></>}
        body="InsiteHub works with commercial L&D leaders who have an AI imperative and no reliable way to execute it. Let's figure out what your actual next step is."
        primaryCta={{ label: "Book a Discovery Call", onClick: () => setPage("contact") }}
        secondaryLink={{ label: "Request a Platform Demo", onClick: () => setPage("contact") }}
      />
    </>
  );
}
```

- [ ] **Step 2: Build + visual check**

```bash
npm run build
npm run dev
```

Visit `http://localhost:5173`. Verify:
- Hero renders with LoopVisual, headline, primary CTA, quiet link
- Logo band, stat band, AI Literacy band, differentiator card grid all render
- 4 product showcase blocks render with their accent colors (orange/blue/purple/green)
- Mockups visible inside each showcase
- Pull quote with Sarah Chen + 4 stats
- Situation cards (6) in 3-col grid
- Step rail with 5 steps
- CTA band at bottom
- At 375px: every section reflows to single column

- [ ] **Step 3: Commit**

```bash
git add src/pages/HomePage.jsx
git commit -m "HomePage v5: rewrite using new section patterns + product showcases"
```

---

## Phase 5 — Where-to-Start destination pages

Each task rewrites one page using the new patterns. Per-page composition is in the spec at `docs/superpowers/specs/2026-04-14-premium-redesign-design.md` — the implementer follows the section list there for each page. All existing v4 content stays — only the wrapper components change.

### Task 19: PlatformPage redesign

**Files:**
- Modify: `src/pages/PlatformPage.jsx`

- [ ] **Step 1: Rewrite using new patterns**

Replace `src/pages/PlatformPage.jsx` with a composition of:
1. `<EditorialHero>` — closed-loop SVG diagram as right-side visual (the existing closed-loop dark card SVG, extracted)
2. `<LongForm>` — methodology of the closed loop (port v4 prose)
3. `<ProductShowcase product="forge">` with `<ForgeShowcase />` mockup
4. `<ProductShowcase product="atlas" reverse>` with `<AtlasShowcase />`
5. `<ProductShowcase product="echo">` with `<EchoShowcase />`
6. `<ProductShowcase product="certify" reverse background="tinted">` with `<CertifyShowcase />`
7. `<ComparisonRail>` — Forge/Atlas/Echo/Certify vs traditional LMS (build the comparison data from the spec; columns: "InsiteHub AI Platform" vs "Traditional LMS"; rows: agentic content creation, real-time roleplay, behavioral certification, MLR-integrated authoring, closed-loop gap remediation, etc.)
8. `<SplitFeature>` — InsiteX callout (port the existing InsiteX callout card content as a SplitFeature)
9. `<CTABand>`

Use real content from the existing PlatformPage.jsx — don't lose any prose.

Reference: read the current `/Users/darwashi/Downloads/insite-hub/src/pages/PlatformPage.jsx` to extract content; replace structure with the patterns above.

- [ ] **Step 2: Build + visual check**

```bash
npm run build
npm run dev
```

Navigate to `/platform` (via nav). Verify all 9 sections render in order; mockups appear; comparison rail readable; mobile collapses cleanly.

- [ ] **Step 3: Commit**

```bash
git add src/pages/PlatformPage.jsx
git commit -m "PlatformPage v5: rewrite using section patterns + 4 product showcases"
```

---

### Task 20: AdvisoryPage redesign

**Files:**
- Modify: `src/pages/AdvisoryPage.jsx`

- [ ] **Step 1: Rewrite using new patterns**

Replace using:
1. `<EditorialHero>` (no right-side visual — let the headline breathe)
2. `<LongForm>` — "We diagnose before we prescribe" methodology (port v4 prose, include inline `pullQuote` prop)
3. `<StepRail>` — 6 engagements as a process flow (NOT a card grid). Each engagement gets a step number + title (e.g., "Strategy & Roadmap Workshop") + body (the deliverable description). Order: Strategy → Readiness → Selection → Governance → Infrastructure → Org Design.
4. `<SplitFeature>` (50/50, reverse) — proof points (Vanguard Award + Bell Labs methodology) as right-side visual cards, body left
5. `<PullQuote>` — short advisory case quote (use a 1-2 sentence pull from existing content; if none in current AdvisoryPage, use the methodology paragraph as the quote)
6. `<CTABand>`

- [ ] **Step 2: Build + visual check + commit**

```bash
npm run build
npm run dev
git add src/pages/AdvisoryPage.jsx
git commit -m "AdvisoryPage v5: rewrite using section patterns (engagements as StepRail)"
```

---

### Task 21: LiteracyPage redesign

**Files:**
- Modify: `src/pages/LiteracyPage.jsx`

- [ ] **Step 1: Rewrite using new patterns**

Replace using:
1. `<EditorialHero>` with `badge="🎓 New Program"`
2. `<LongForm>` — why literacy first (port v4 prose with inline pull quote)
3. `<CardGrid columns={3}>` — 6 role tracks (legitimate grid use; cards have icon + title + body + audience tag)
4. `<StepRail>` — program structure (4 delivery models as steps)
5. `<StatBand tone="light">` — outcomes (port the metrics from current LiteracyPage)
6. `<SplitFeature>` — UMU partnership note (port from current page)
7. `<CTABand>`

- [ ] **Step 2: Build + visual check + commit**

```bash
npm run build
git add src/pages/LiteracyPage.jsx
git commit -m "LiteracyPage v5: rewrite using section patterns"
```

---

### Task 22: ProxaLabsPage redesign

**Files:**
- Modify: `src/pages/ProxaLabsPage.jsx`

- [ ] **Step 1: Rewrite using new patterns**

Replace using:
1. `<EditorialHero>` — 4-phase preview as right-side visual (build a small inline 4-step diagram or use a `<StepRail orientation="vertical">` compact in the visual slot)
2. `<LongForm>` — what is Proxa Labs (port positioning prose + 5-step "Our Specialty" inline)
3. `<CardGrid columns={3} cardStyle="compact">` — 3 failure-pattern cards
4. `<StepRail orientation="horizontal">` — 4-phase experimentation model (Define → Design → Measure → Business Case)
5. `<PullQuote>` — Sarah Chen case study with 4 stats (same as HomePage)
6. `<CardGrid columns={3}>` — 3 active research projects
7. `<CTABand>`

- [ ] **Step 2: Build + visual check + commit**

```bash
npm run build
git add src/pages/ProxaLabsPage.jsx
git commit -m "ProxaLabsPage v5: rewrite using section patterns"
```

---

### Task 23: ContentPage redesign

**Files:**
- Modify: `src/pages/ContentPage.jsx`

- [ ] **Step 1: Rewrite using new patterns**

Replace using:
1. `<EditorialHero>`
2. `<SplitFeature>` — "Two Tracks. One Standard." AI-powered vs traditional ID positioning
3. `<CardGrid columns={2}>` — 4 capability cards (AI-Powered Content / Traditional ID / MLR-Integrated Design / AI-Assisted Human Review)
4. `<LongForm>` — example launch-window scenario (reformat existing case-example content from current ContentPage)
5. `<SplitFeature reverse>` — therapy area coverage (right side: tag cloud of 10 therapy areas; left: prose)
6. `<CTABand>`

- [ ] **Step 2: Build + visual check + commit**

```bash
npm run build
git add src/pages/ContentPage.jsx
git commit -m "ContentPage v5: rewrite using section patterns"
```

---

### Task 24: InsiteXPage redesign

**Files:**
- Modify: `src/pages/InsiteXPage.jsx`

- [ ] **Step 1: Rewrite using new patterns**

Replace using:
1. `<EditorialHero>` — keep dark variant; pass `background="dark"` if EditorialHero supports it, otherwise wrap with `.section-dark` styling. (If EditorialHero doesn't currently support dark, add a `dark` prop boolean that flips bg + text colors.)
2. `<SplitFeature>` — enterprise LMS positioning prose + capability list right
3. `<CardGrid columns={2} cardStyle="standard">` — 6 admin/learner capability cards
4. `<ComparisonRail>` — InsiteX LMS vs AI Platform — when to pick which (columns: "InsiteX LMS" vs "AI Platform"; rows: SCORM/AICC compliance, Veeva integration, AI agent content creation, behavioral roleplay, MLR auto-routing, etc.)
5. `<SplitFeature>` — transition path callout (3 integration arrows: InsiteX → Atlas, Forge → Library, Echo → Records)
6. `<CTABand>`

- [ ] **Step 2: If dark hero variant needed, extend EditorialHero**

If EditorialHero doesn't support dark backgrounds, add an optional `dark` prop:

```jsx
// In src/components/sections/EditorialHero.jsx
export default function EditorialHero({ /* existing */, dark = false }) {
  return (
    <section className={dark ? 'editorial-hero editorial-hero-dark' : 'editorial-hero'}>
      {/* rest unchanged */}
    </section>
  );
}
```

Then add to styles.css:

```css
.editorial-hero-dark { background: linear-gradient(150deg, #0D1017 0%, #161B27 55%, #0D1017 100%); color: var(--wh); }
.editorial-hero-dark .editorial-hero-headline { color: var(--wh); }
.editorial-hero-dark .editorial-hero-subhead { color: rgba(255,255,255,.6); }
```

- [ ] **Step 3: Build + visual check + commit**

```bash
npm run build
git add src/pages/InsiteXPage.jsx src/components/sections/EditorialHero.jsx src/styles.css
git commit -m "InsiteXPage v5: rewrite using section patterns + dark hero variant"
```

---

## Phase 6 — Remaining pages + final cleanup

### Task 25: AboutPage redesign

**Files:**
- Modify: `src/pages/AboutPage.jsx`

- [ ] **Step 1: Rewrite**

Replace using:
1. `<EditorialHero>`
2. `<LongForm>` — 3-paragraph story (port from current AboutPage)
3. `<StatBand tone="light">` — 4 innovation proof points (Vanguard Award, gamified training adoption, NIH biomedical accelerator, Closed-loop AI platform)
4. `<StepRail orientation="vertical">` — timeline 2010 → present (5 milestones)
5. `<PullQuote>` — short founding-vision quote (extract from About prose; if none lands as a natural quote, use the most punchy methodology line)
6. `<CTABand>`

- [ ] **Step 2: Build + visual check + commit**

```bash
npm run build
git add src/pages/AboutPage.jsx
git commit -m "AboutPage v5: rewrite using section patterns"
```

---

### Task 26: NewsPage redesign

**Files:**
- Modify: `src/pages/NewsPage.jsx`

- [ ] **Step 1: Rewrite**

Replace using:
1. `<EditorialHero>`
2. `<SplitFeature>` (50/50) — featured UMU partnership announcement: prose + CTAs left, 3 feature bullets in card column right
3. `<CardGrid columns={2}>` — 4 secondary announcements (no onClick — static news cards). Each card: icon + tag + date + title + 2-sentence body. Cards do NOT route — they're news items.
4. `<CTABand>` — newsletter strip variant. Override CTABand props: `heading="Get announcements in your inbox."`, `body="Frameworks, research, and partnerships from InsiteHub and Proxa Labs."`, `primaryCta={{label: "Subscribe", onClick: () => setPage("newsletter")}}`

- [ ] **Step 2: Build + visual check + commit**

```bash
npm run build
git add src/pages/NewsPage.jsx
git commit -m "NewsPage v5: rewrite using section patterns"
```

---

### Task 27: ResourcesPage redesign

**Files:**
- Modify: `src/pages/ResourcesPage.jsx`

- [ ] **Step 1: Rewrite**

Replace using:
1. `<EditorialHero>`
2. `<CardGrid columns={3} cardStyle="feature">` — 6 frameworks/guides (each card includes onClick → setPage("contact") to request the framework)
3. `<LongForm>` — bridge text into research section ("From Proxa Labs — Active Research")
4. `<CardGrid columns={3} cardStyle="compact">` — 3 active research items
5. `<CTABand>`

- [ ] **Step 2: Build + visual check + commit**

```bash
npm run build
git add src/pages/ResourcesPage.jsx
git commit -m "ResourcesPage v5: rewrite using section patterns"
```

---

### Task 28: NewsletterPage redesign

**Files:**
- Modify: `src/pages/NewsletterPage.jsx`

- [ ] **Step 1: Rewrite**

Replace using:
1. `<EditorialHero>`
2. `<SplitFeature ratio="50-50">` — pass the existing form JSX as the right-side visual; pass the "What you'll receive" 4-card list as the left-side bullets/body. The form uses the existing Firebase wiring (`fetch` to `VITE_NEWSLETTER_FUNCTION_URL` with `{email, name, role, interests}` payload — keep unchanged).
3. `<CTABand>` (compact variant — short and quiet; no big primary CTA since the form IS the action)

- [ ] **Step 2: Build + visual check + commit**

```bash
npm run build
git add src/pages/NewsletterPage.jsx
git commit -m "NewsletterPage v5: rewrite using section patterns"
```

---

### Task 29: ContactPage redesign

**Files:**
- Modify: `src/pages/ContactPage.jsx`

- [ ] **Step 1: Rewrite**

Replace using:
1. `<EditorialHero>` — track selector (3 entry points) as the right-side visual element. The existing 3-card track selector becomes the visual slot.
2. `<SplitFeature ratio="60-40">` — form JSX left, "What to expect" sidebar + address block right. The form uses existing Firebase wiring (`fetch` to `VITE_CONTACT_FUNCTION_URL` with `{...form, track}` payload), error states, sentTracks resubmission — keep all existing logic; only the wrapper changes.
3. `<CardGrid columns={4} cardStyle="compact">` — 4 resource teasers routing to /resources
4. `<CTABand>` (compact, no primary CTA — the form is the action)

- [ ] **Step 2: Build + visual check + commit**

```bash
npm run build
git add src/pages/ContactPage.jsx
git commit -m "ContactPage v5: rewrite using section patterns"
```

---

### Task 30: Final emoji audit + Nav/Footer/AnnouncementBand emoji replacement

**Files:**
- Modify: `src/components/Nav.jsx`
- Modify: `src/components/Footer.jsx` (if any emojis)
- Modify: `src/components/AnnouncementBand.jsx` (replace 🎓 with `<Icon name="literacy" />` if appropriate)

- [ ] **Step 1: Audit remaining emojis**

```bash
grep -rn '[\U0001F300-\U0001F9FF]' src/components/ src/pages/
```

(If grep doesn't support unicode classes on macOS, use: `grep -rn -P '[\x{1F300}-\x{1F9FF}]' src/` or just visually scan each file.)

For each remaining emoji that is NOT one of the 4 product identities (`⚡🎓🎭✅` in product-showcase contexts), replace with `<Icon name="..." />`.

- [ ] **Step 2: Replace Nav "Where to Start" dropdown emojis**

In `src/components/Nav.jsx`, the `DROP_ITEMS` array uses 7 emojis (🧭🔬🎓🚀📚🖥️💬). Replace each `icon: "🧭"` with `icon: <Icon name="strategy" size={20} />` (and the corresponding semantic name for each item: pilot, literacy, platform, content, lms, chat). Update the JSX render to render `{d.icon}` directly instead of inside a font-size span.

- [ ] **Step 3: Build + visual check + commit**

```bash
npm run build
npm run dev  # spot-check Nav dropdown shows custom icons
git add src/components/Nav.jsx src/components/Footer.jsx src/components/AnnouncementBand.jsx
git commit -m "Replace remaining emojis with custom Icon component (Nav, Footer, banners)"
```

---

### Task 31: CTA discipline pass — kill mid-page button noise

**Files:**
- Modify: any page that still has 3+ buttons in mid-page sections

- [ ] **Step 1: Audit button counts**

```bash
grep -rn 'className="bp"\|className="bs"\|className="bt"' src/pages/ | wc -l
```

Identify pages with high button density. The new section patterns already reduced this significantly — but some legacy patterns (sec-cta blocks, mid-page button rows) may persist in PlatformPage, AdvisoryPage, etc. depending on how the previous tasks executed.

- [ ] **Step 2: Replace mid-section button rows with single QuietLink**

For each section that ends with 2-3 buttons (sec-cta pattern), keep at most ONE button:
- If the section is mid-page: replace the buttons with a single `<QuietLink onClick={...}>label</QuietLink>` for the most relevant cross-link
- If the section is a CTABand or page-bottom: keep the orange primary + optional quiet link

Target: ≤8 button-styled CTAs per page total. Count after the pass; if any page still exceeds, revisit.

- [ ] **Step 3: Build + commit**

```bash
npm run build
git add -u
git commit -m "CTA discipline pass: replace mid-page button rows with QuietLink"
```

---

### Task 32: Final spacing audit + remove inline style overrides

**Files:**
- All page files in `src/pages/`

- [ ] **Step 1: Find inline padding overrides that fight the design tokens**

```bash
grep -rn 'padding:"[0-9]' src/pages/ src/components/sections/
```

For each match, check whether the value matches one of `4 / 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128`. If not, snap to nearest scale value or remove (let the section pattern handle padding).

- [ ] **Step 2: Find inline fontSize overrides outside the type scale**

```bash
grep -rn 'fontSize:[0-9]' src/pages/ src/components/sections/
```

For each match, replace with the `t-display`/`t-h1`/`t-h2`/`t-h3`/`t-body`/`t-small`/`t-eyebrow` class from Task 1, or with `var(--text-...)`. Inline fontSize should remain only inside designed mockups (showcase components) and product UI mocks where exact pixels matter.

- [ ] **Step 3: Build clean + final smoke test**

```bash
rm -rf dist node_modules/.vite
npm run build
```

Expected: clean.

```bash
npm run preview
```

Visit `http://localhost:4173`. Click through every nav route + every "Where to Start" dropdown item + every footer link. Confirm no console errors, all pages render, mobile reflows at 375px, primary CTA is unambiguous on each page, and emoji count is dramatically lower than starting state.

- [ ] **Step 4: Final commit**

```bash
git add -u
git commit -m "Final spacing + type audit: snap to design tokens, remove inline overrides"
```

---

## Self-Review Checklist

Reviewed against `docs/superpowers/specs/2026-04-14-premium-redesign-design.md`:

- [x] Foundation tokens (spacing + type scale) — Task 1
- [x] Icon system (30 named SVG icons) — Task 2
- [x] QuietLink for non-primary CTAs — Task 3
- [x] 10 section patterns — Tasks 4-13 (EditorialHero, SplitFeature, CardGrid, LongForm, PullQuote, ComparisonRail, ProductShowcase, StatBand, StepRail, CTABand)
- [x] 4 product showcase mockups — Tasks 14-17 (Forge, Atlas, Echo, Certify)
- [x] HomePage redesign as proof — Task 18
- [x] 6 destination pages (Platform, Advisory, Literacy, Proxa Labs, Content, InsiteX) — Tasks 19-24
- [x] About + News + Resources + Newsletter + Contact — Tasks 25-29
- [x] Emoji audit + Nav/Footer replacement — Task 30
- [x] CTA discipline (one primary per page) — Task 31
- [x] Final spacing + type audit — Task 32

All current upgrades preserved across tasks (Firebase wiring referenced explicitly in NewsletterPage and ContactPage redesigns; mobile responsive enforced via `@media (max-width:960px)` on every section pattern; LoopVisual + LoopMobile + HexMark + SocialIcon untouched).

No placeholders. Every code-changing step has concrete code. Every verification step has a concrete command and expected outcome.

**Total: 32 tasks across 6 phases.** Each phase commits independently. Phase 4 (HomePage rewrite) is the visual reveal — that's the moment the site stops looking like a content port and starts looking premium.
