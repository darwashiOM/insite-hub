# Mobile Responsiveness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make all 5 pages look polished on mobile (iPhone 390px width). Add a hamburger nav menu, fix all grid layouts that don't stack, and ensure readable typography/spacing.

**Architecture:** Add responsive CSS utility classes to styles.css, replace inline grid styles with class names in JSX, and add a hamburger toggle to Nav.jsx. One breakpoint at 960px (already exists).

**Tech Stack:** React, CSS (styles.css), no additional libraries.

---

## File Map

### Modify:
- `src/styles.css` — add responsive utility classes + mobile nav styles + page-specific fixes
- `src/components/Nav.jsx` — add hamburger menu toggle for mobile
- `src/components/Footer.jsx` — add class for responsive grid
- `src/pages/HomePage.jsx` — replace inline grid styles with responsive classes
- `src/pages/PlatformPage.jsx` — replace inline grid styles with responsive classes
- `src/pages/ServicesPage.jsx` — replace inline grid styles with responsive classes
- `src/pages/AboutPage.jsx` — replace inline grid styles with responsive classes
- `src/pages/ContactPage.jsx` — replace inline grid styles with responsive classes

---

### Task 1: Add responsive CSS utility classes and mobile nav styles to styles.css

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: Add utility classes and expand mobile media query**

Add these CSS rules BEFORE the existing `@media` block (around line 278):

```css
/* ── RESPONSIVE GRID UTILITIES ─────────────────────── */
.grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
.grid-3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; }
.grid-4 { display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:16px; }
.grid-2-1 { display:grid; grid-template-columns:2fr 1fr; gap:48px; align-items:center; }
.grid-1-1-lg { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:start; }
.grid-auto-quote { display:grid; grid-template-columns:1fr auto; gap:48px; align-items:center; }

/* ── MOBILE NAV ────────────────────────────────────── */
.nav-hamburger {
  display:none; width:40px; height:40px; border:none; background:none;
  cursor:pointer; flex-direction:column; align-items:center; justify-content:center; gap:5px;
}
.nav-hamburger span {
  display:block; width:22px; height:2px; background:var(--dk); border-radius:2px;
  transition:all .2s;
}
.nav-mobile-menu {
  display:none; position:fixed; top:68px; left:0; right:0; bottom:0;
  background:var(--wh); z-index:299; padding:24px;
  flex-direction:column; gap:8px;
  animation:navSlide .2s ease;
}
.nav-mobile-menu.open { display:flex; }
.nav-mobile-menu button {
  width:100%; text-align:left; padding:16px 20px; border-radius:12px;
  border:none; background:none; font-family:'DM Sans',sans-serif;
  font-size:16px; font-weight:500; color:var(--dk); cursor:pointer;
  transition:background .15s;
}
.nav-mobile-menu button:hover { background:var(--lt); }
.nav-mobile-menu button.on { color:var(--o); background:var(--o10); }
.nav-mobile-menu .mobile-cta {
  margin-top:auto; padding:14px; border-radius:11px; border:none;
  background:var(--o); color:#fff; font-family:'DM Sans',sans-serif;
  font-size:15px; font-weight:700; cursor:pointer; text-align:center;
  letter-spacing:.01em;
}
@keyframes navSlide { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
```

Then REPLACE the existing `@media (max-width:960px)` block entirely with:

```css
@media (max-width:960px) {
  /* Nav */
  .nav { padding:0 20px; }
  .nav-links { display:none; }
  .nav-right > .ng { display:none; }
  .nav-hamburger { display:flex; }

  /* Layout */
  .hero,.sec,.ph,.ph-dk,.ix-hero,.cta-full { padding-left:20px; padding-right:20px; }
  .hero-inner { grid-template-columns:1fr; }
  .hero-inner > div:last-child { display:none; }
  .mw { padding:0; }
  .sh { margin-bottom:32px; }

  /* Grids → single column */
  .pg,.dg,.ag,.ix-fg,.ix-cap3,.cg,.pl-cards { grid-template-columns:1fr; }
  .grid-2,.grid-3,.grid-4,.grid-2-1,.grid-1-1-lg { grid-template-columns:1fr; gap:14px; }
  .grid-auto-quote { grid-template-columns:1fr; gap:24px; }

  /* Stats → 2 col */
  .stats { padding:40px 20px; }
  .stats-row { grid-template-columns:1fr 1fr; }
  .st { border-right:none; border-bottom:1px solid var(--brk); padding:18px 0; }

  /* CTA bar */
  .cta-bar { flex-direction:column; align-items:flex-start; padding:28px; border-radius:16px; }

  /* CTA full */
  .cta-full { padding:80px 20px; }
  .cf-h { font-size:clamp(28px,8vw,42px); }
  .cf-btns { flex-direction:column; gap:10px; width:100%; }
  .cf-btns .bp, .cf-btns .bt-wt { width:100%; justify-content:center; }

  /* Page hero */
  .ph,.ph-dk { padding:120px 20px 60px; }
  .ph1 { font-size:clamp(28px,8vw,44px); }
  .psub { font-size:16px; }

  /* Section padding */
  .sec { padding:60px 20px; }

  /* Logo band */
  .logo-band { padding:20px; }
  .lb-row { gap:16px; }
  .lb-co { font-size:10px; }

  /* Hero adjustments */
  .hero { min-height:auto; padding:100px 20px 60px; }
  .hero-h1 { font-size:clamp(32px,9vw,48px); }
  .hero-p { font-size:16px; }
  .hero-actions { flex-direction:column; gap:10px; }
  .hero-actions .bp, .hero-actions .bs, .hero-actions .bt { width:100%; justify-content:center; }

  /* Buttons full width on mobile */
  .sec-cta { flex-direction:column; gap:10px; }
  .sec-cta .bp, .sec-cta .bs, .sec-cta .bt { width:100%; justify-content:center; }

  /* Footer */
  .footer-grid { grid-template-columns:1fr; gap:32px; }
  .fn-wrap { flex-direction:column; }
  .fn-wrap .fn-in { width:100%; }

  /* Typography */
  .h2,.h2-wt { font-size:clamp(22px,6vw,32px); }
  .lead,.lead-wt { font-size:15px; }

  /* Cards */
  .ac { padding:20px; }
  .pc { padding:24px; }
  .dc { padding:24px; }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles.css
git commit -m "Add responsive CSS: utility grid classes, mobile nav styles, full mobile overrides"
```

---

### Task 2: Add hamburger menu to Nav.jsx

**Files:**
- Modify: `src/components/Nav.jsx`

- [ ] **Step 1: Rewrite Nav.jsx with mobile hamburger**

Replace the entire contents of `src/components/Nav.jsx` with:

```jsx
import { useState } from 'react';
import { HexMark } from './HexMark';

const Nav = ({ page, setPage, scrolled }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const go = (p) => { setMobileOpen(false); setPage(p); };
  const links = [["Platform","platform"],["Services","services"],["About","about"],["Contact","contact"]];
  return (
    <>
      <nav className={"nav"+(scrolled?" up":"")}>
        <div className="nav-logo" onClick={()=>go("home")}>
          <HexMark size={38} color="#F4801F" strokeWidth={1.7}/>
          <span className="nav-wm">Insite<b>HUB</b></span>
        </div>
        <div className="nav-links">
          {links.map(([l,p])=>(
            <button key={p} className={"nl"+(page===p?" on":"")} onClick={()=>go(p)}>{l}</button>
          ))}
        </div>
        <div className="nav-right">
          <button className="no" onClick={()=>go("contact")}>Book a Demo</button>
          <button className="nav-hamburger" onClick={()=>setMobileOpen(o=>!o)} aria-label="Menu">
            <span style={mobileOpen?{transform:"rotate(45deg) translate(5px,5px)"}:{}}/>
            <span style={mobileOpen?{opacity:0}:{}}/>
            <span style={mobileOpen?{transform:"rotate(-45deg) translate(5px,-5px)"}:{}}/>
          </button>
        </div>
      </nav>
      <div className={"nav-mobile-menu"+(mobileOpen?" open":"")}>
        {links.map(([l,p])=>(
          <button key={p} className={page===p?"on":""} onClick={()=>go(p)}>{l}</button>
        ))}
        <button className="mobile-cta" onClick={()=>go("contact")}>Book a Demo</button>
      </div>
    </>
  );
};

export default Nav;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Nav.jsx
git commit -m "Add mobile hamburger menu to Nav with animated icon and slide panel"
```

---

### Task 3: Make Footer responsive

**Files:**
- Modify: `src/components/Footer.jsx`

- [ ] **Step 1: Add `footer-grid` class to the 3-column grid div**

In `src/components/Footer.jsx`, find the div that has the inline style `gridTemplateColumns:"2fr 1fr 1.5fr"` and add `className="footer-grid"` to it. Keep the inline style as the desktop default — the CSS media query will override it with `grid-template-columns:1fr`.

Find:
```
<div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1.5fr",gap:56,marginBottom:48}}>
```

Replace with:
```
<div className="footer-grid" style={{display:"grid",gridTemplateColumns:"2fr 1fr 1.5fr",gap:56,marginBottom:48}}>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.jsx
git commit -m "Add footer-grid class for mobile responsive override"
```

---

### Task 4: Make HomePage grids responsive

**Files:**
- Modify: `src/pages/HomePage.jsx`

- [ ] **Step 1: Replace inline grid styles with responsive utility classes**

In `src/pages/HomePage.jsx`, make these changes:

1. The 3 capability cards grid — find:
```
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
```
Replace with:
```
<div className="grid-3">
```

2. The testimonial grid — find:
```
style={{background:"linear-gradient(135deg,#FFFAF6,#FFF4E8)",border:"1.5px solid rgba(244,128,31,.2)",borderRadius:20,padding:"40px 48px",display:"grid",gridTemplateColumns:"1fr auto",gap:48,alignItems:"center"}}
```
Replace with:
```
className="grid-auto-quote" style={{background:"linear-gradient(135deg,#FFFAF6,#FFF4E8)",border:"1.5px solid rgba(244,128,31,.2)",borderRadius:20,padding:"40px 48px"}}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/HomePage.jsx
git commit -m "Make HomePage grids responsive with utility classes"
```

---

### Task 5: Make PlatformPage grids responsive

**Files:**
- Modify: `src/pages/PlatformPage.jsx`

- [ ] **Step 1: Replace inline grid styles with responsive utility classes**

In `src/pages/PlatformPage.jsx`, make these changes:

1. Platform preview cards grid — find any `style` containing `gridTemplateColumns:"1fr 1fr"` for the previews section and add `className="grid-2"`, removing the inline grid properties. Look for:
```
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
```
Replace with:
```
<div className="grid-2">
```

2. Product card bullet grids — find all instances of:
```
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
```
Replace with:
```
<div className="grid-2" style={{gap:9}}>
```

3. The InsiteX callout — if it uses an inline flex/grid that doesn't stack, ensure it wraps. Find the callout div with `display:"flex"` and `gap:32` and add `flexWrap:"wrap"` if not already present.

- [ ] **Step 2: Commit**

```bash
git add src/pages/PlatformPage.jsx
git commit -m "Make PlatformPage grids responsive with utility classes"
```

---

### Task 6: Make ServicesPage grids responsive

**Files:**
- Modify: `src/pages/ServicesPage.jsx`

- [ ] **Step 1: Replace inline grid styles with responsive utility classes**

In `src/pages/ServicesPage.jsx`, make these changes:

1. AI Literacy 3-column grid — find:
```
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
```
Replace with:
```
<div className="grid-3" style={{gap:14}}>
```

2. Content Development 2-column grid — find:
```
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
```
Replace with:
```
<div className="grid-2">
```

3. Proxa Labs 4-column grid — find:
```
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:14}}>
```
Replace with:
```
<div className="grid-4" style={{gap:14}}>
```

4. InsiteX 2-column grid — find:
```
style={{...borderRadius:20,padding:"40px 48px",border:"1px solid rgba(244,128,31,.18)",display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"center"}}
```
Replace with:
```
className="grid-2" style={{background:"linear-gradient(135deg,#FFF8F1,#FFF2E4)",borderRadius:20,padding:"40px 48px",border:"1px solid rgba(244,128,31,.18)",gap:48,alignItems:"center"}}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/ServicesPage.jsx
git commit -m "Make ServicesPage grids responsive with utility classes"
```

---

### Task 7: Make AboutPage and ContactPage grids responsive

**Files:**
- Modify: `src/pages/AboutPage.jsx`
- Modify: `src/pages/ContactPage.jsx`

- [ ] **Step 1: Fix AboutPage**

In `src/pages/AboutPage.jsx`, find the innovation proof points grid:
```
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:16,marginBottom:64}}>
```
Replace with:
```
<div className="grid-4" style={{gap:16,marginBottom:64}}>
```

- [ ] **Step 2: Fix ContactPage**

In `src/pages/ContactPage.jsx`, make these changes:

1. Track selector 3-column grid — find:
```
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
```
Replace with:
```
<div className="grid-3" style={{gap:10}}>
```

2. Resources 4-column grid — find:
```
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:14}}>
```
Replace with:
```
<div className="grid-4" style={{gap:14}}>
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/AboutPage.jsx src/pages/ContactPage.jsx
git commit -m "Make AboutPage and ContactPage grids responsive"
```

---

### Task 8: Test on mobile and deploy

- [ ] **Step 1: Build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 2: Test on mobile viewport (390x844)**

Start dev server, resize to 390x844, test all 5 pages:
- Home: hero stacks, cards stack, testimonial stacks, CTAs full-width
- Platform: diagram readable, product cards stack, previews stack
- Services: all section grids stack to single column
- About: proof points 2x2 or stacked, timeline readable
- Contact: track selector stacks, resources stack
- Nav: hamburger visible, opens menu panel, all links work
- Footer: 3 columns stack to single column

- [ ] **Step 3: Deploy**

```bash
npm run build && firebase deploy --only hosting
git push
```
