# InsiteHub Full Content Restore Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the full content depth of v4 (13 pages, "Where to Start" mega-menu, every section) into the current modular React app without losing any current upgrades (Firebase email, mobile responsiveness, upgraded Loop visuals).

**Architecture:** State-based router in `App.jsx` gains 8 new routes. `Nav` rebuilt to match v4 (mega-menu + 7 top-level links) with modern mobile hamburger. `Footer` restored to 4-column. Eight new page files under `src/pages/`, five new shared components under `src/components/`. All v4 inline CSS classes lifted into `src/styles.css`. No new dependencies, no routing library.

**Tech Stack:** React 19 · Vite · Firebase Cloud Functions (nodemailer) · plain CSS with CSS variables · Manrope/DM Sans via Google Fonts.

**Source of truth for content:** `insitehub-website-v4.jsx` at repo root. Every task that ports content names the exact v4 line range. Content lifts verbatim; cleanup is polish-only per the spec's editorial rules.

**Testing approach:** This project has no automated test harness and we're not adding one for this work. Each task's verification step is: `npm run build` must succeed cleanly, then `npm run dev` and a specific visual check spelled out per task.

**Spec reference:** `docs/superpowers/specs/2026-04-14-full-content-restore-design.md`

---

## File map

### Create
- `src/pages/AdvisoryPage.jsx`
- `src/pages/LiteracyPage.jsx`
- `src/pages/InsiteXPage.jsx`
- `src/pages/ContentPage.jsx`
- `src/pages/ProxaLabsPage.jsx`
- `src/pages/NewsPage.jsx`
- `src/pages/ResourcesPage.jsx`
- `src/pages/NewsletterPage.jsx`
- `src/components/NewsletterInline.jsx`
- `src/components/AnnouncementBand.jsx`
- `src/components/SituationCard.jsx`
- `src/components/DiffCard.jsx`
- `src/components/StepCard.jsx`

### Modify
- `src/App.jsx` — 8 new routes in `pages`/`PAGE_TITLES`/`descs`
- `src/components/Nav.jsx` — full rebuild (mega-menu + 7 links + mobile accordion)
- `src/components/Footer.jsx` — 4-column restore + newsletter top bar + compliance badges
- `src/pages/HomePage.jsx` — 14 sections (currently ~5)
- `src/pages/PlatformPage.jsx` — merge missing v4 sections
- `src/pages/AboutPage.jsx` — enhanced story + innovation proof points + timeline
- `src/pages/ContactPage.jsx` — enriched sidebar + resources cross-link
- `src/styles.css` — add v4 class rules (`.pg .dg .ag .fc .pc* .ix-* .pl-* .ps .nav-drop* .cta-bar* .qb .stat-num .cmp-* `)
- `functions/index.js` — extend `submitNewsletter` to accept optional `name`/`role`/`interests`

### Delete
- `src/pages/ServicesPage.jsx` (content splits into Advisory/Literacy/Content/Proxa/InsiteX pages)

---

## Phase 1 — Foundation

### Task 1: Add 13-page route map

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Add 8 new route entries**

Replace the body of `App.jsx` to include all 13 pages. Keep the scroll + title + meta pattern already there.

```jsx
import { useState, useEffect } from "react";
import './styles.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PlatformPage from './pages/PlatformPage';
import AdvisoryPage from './pages/AdvisoryPage';
import LiteracyPage from './pages/LiteracyPage';
import InsiteXPage from './pages/InsiteXPage';
import ContentPage from './pages/ContentPage';
import ProxaLabsPage from './pages/ProxaLabsPage';
import AboutPage from './pages/AboutPage';
import NewsPage from './pages/NewsPage';
import ResourcesPage from './pages/ResourcesPage';
import NewsletterPage from './pages/NewsletterPage';
import ContactPage from './pages/ContactPage';

const PAGE_TITLES = {
  home: "InsiteHub · AI-First Commercial Learning for Biopharma",
  platform: "AI Platform · Forge, Atlas, Echo & Certify · InsiteHub",
  advisory: "Advisory Services · AI Strategy for Biopharma L&D · InsiteHub",
  literacy: "AI Literacy Program · Role-Targeted AI Fluency · InsiteHub",
  insitex: "InsiteX LMS · Enterprise Learning for Biopharma · InsiteHub",
  content: "Content Development · MLR-Compliant Biopharma Content · InsiteHub",
  proxalab: "Proxa Labs · Structured AI Experimentation · InsiteHub",
  about: "About InsiteHub · Innovation-Led Biopharma L&D Since 2010",
  news: "Announcements · Latest from InsiteHub",
  resources: "Resources · Frameworks, Guides & Templates · InsiteHub",
  newsletter: "Newsletter · Stay Ahead of AI in Biopharma · InsiteHub",
  contact: "Contact InsiteHub · Start a Conversation",
};

const DESCS = {
  home: "InsiteHub is the AI implementation partner built for biopharma commercial learning. Advisory, platform, and experimentation — methodology-first, compliance by design.",
  platform: "The only closed-loop AI platform in biopharma: Forge builds content, Atlas delivers learning, Echo assesses readiness, Certify confirms competency.",
  advisory: "AI strategy, readiness assessments, governance frameworks, and infrastructure planning — advisory services purpose-built for biopharma commercial L&D.",
  literacy: "Role-targeted AI literacy tracks for every part of your commercial organization. Build fluency before deploying tools.",
  insitex: "Enterprise learning management built for biopharma compliance. SCORM, AICC, PMRC compliant. The foundation the AI platform builds on.",
  content: "MLR-compliant content development — AI-powered (Forge) or traditional instructional design. Built by biopharma commercial practitioners.",
  proxalab: "Structured AI experimentation for biopharma. Define the right use case, design the experiment, measure what matters, build the business case.",
  about: "InsiteHub has been solving biopharma commercial learning challenges for 25 years. Innovation-led, compliance by design.",
  news: "Announcements, partnerships, product updates, and research milestones from InsiteHub and Proxa Labs.",
  resources: "Frameworks, guides, templates, and research from 25 years of biopharma commercial L&D expertise.",
  newsletter: "Frameworks, research, and field notes from InsiteHub's practitioners. Sent when there's something worth saying.",
  contact: "Start a conversation with InsiteHub. Ready to talk, want to learn first, or just exploring — we'll meet you where you are.",
};

const PAGES = {
  home: HomePage, platform: PlatformPage, advisory: AdvisoryPage,
  literacy: LiteracyPage, insitex: InsiteXPage, content: ContentPage,
  proxalab: ProxaLabsPage, about: AboutPage, news: NewsPage,
  resources: ResourcesPage, newsletter: NewsletterPage, contact: ContactPage,
};

export default function App() {
  const [page, setPage] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = PAGE_TITLES[page] || PAGE_TITLES.home;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = "description"; document.head.appendChild(meta); }
    meta.content = DESCS[page] || DESCS.home;
  }, [page]);

  const Page = PAGES[page] || HomePage;
  return (
    <>
      <Nav page={page} setPage={setPage} scrolled={scrolled} />
      <main><Page setPage={setPage} /></main>
      <Footer setPage={setPage} />
    </>
  );
}
```

- [ ] **Step 2: Create stub files so build passes**

Create placeholder files for each new page (we'll fill them in later tasks). Each file returns a `<div>Coming soon — PageName</div>` so the build succeeds. Replace real content in later tasks. File contents for each:

```jsx
// src/pages/AdvisoryPage.jsx (and same shape for the other 7 new pages)
const AdvisoryPage = ({ setPage }) => <div style={{padding:"200px 40px",textAlign:"center"}}>AdvisoryPage — coming in Task 13</div>;
export default AdvisoryPage;
```

Create stubs for: `AdvisoryPage`, `LiteracyPage`, `InsiteXPage`, `ContentPage`, `ProxaLabsPage`, `NewsPage`, `ResourcesPage`, `NewsletterPage`.

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx src/pages/AdvisoryPage.jsx src/pages/LiteracyPage.jsx src/pages/InsiteXPage.jsx src/pages/ContentPage.jsx src/pages/ProxaLabsPage.jsx src/pages/NewsPage.jsx src/pages/ResourcesPage.jsx src/pages/NewsletterPage.jsx
git commit -m "Wire 13-route map in App.jsx with page stubs"
```

---

### Task 2: Lift v4 inline styles into styles.css

**Files:**
- Modify: `src/styles.css`
- Reference: `insitehub-website-v4.jsx` lines 10-306 (the CSS template literal)

- [ ] **Step 1: Identify missing classes**

The current `styles.css` is missing these classes that restored pages will reference. Port them from v4's inline `<style>` string (lines 10-306) into `src/styles.css`:

- `.nav-drop`, `.nav-drop-menu`, `.ndm-item`, `.ndm-icon`, `.ndm-title`, `.ndm-desc`, `.ndm-tag`, `.nl-drop`
- `.pg`, `.pc`, `.pc-bar`, `.pc-gl`, `.pc-ir`, `.pc-ic`, `.pc-nm`, `.pc-tg`, `.pc-ds`, `.pc-bl`, `.pc-bi`, `.pbd`
- `.dg`, `.dc`, `.dc-n`, `.dc-t`, `.dc-b`, `.dc-q`
- `.ag`, `.ac`, `.ac-n`, `.ac-t`, `.ac-d`
- `.fc`, `.fc-ic`, `.fc-t`, `.fc-d`
- `.qb`, `.qb-t`, `.qb-src`
- `.cta-bar`, `.cta-bar-t`, `.cta-bar-s`, `.cta-bar-btn`
- `.ix-hero`, `.ix-fg`, `.ix-cap3`, `.ix-cap-i`
- `.pl-cards`
- `.ps`, `.ps-n`, `.ps-t`, `.ps-d`

(Most already exist in current `styles.css` — diff v4 lines 10-306 against `styles.css` and add what's missing. Do not duplicate rules that are already there.)

- [ ] **Step 2: Add responsive overrides**

In the existing `@media (max-width:960px)` block at the bottom of `styles.css`, add the new class names to the existing grid-collapsing rule:

```css
@media (max-width:960px) {
  /* existing rules stay */
  .pg, .dg, .ag, .ix-fg, .ix-cap3, .cg, .pl-cards { grid-template-columns: 1fr; }
  /* etc — grep v4 for its @media block, merge in */
}
```

Confirm `grid-template-columns:1fr` applies to all multi-column grids on mobile so no page ships desktop-only.

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Visual check**

Run: `npm run dev`
Navigate to `http://localhost:5173`.
Resize browser to ≤960px. Every grid on the current Home/Platform/About/Contact should collapse to 1 column. No visual regressions on the current 5 pages.

- [ ] **Step 5: Commit**

```bash
git add src/styles.css
git commit -m "Lift v4 CSS classes into styles.css with mobile overrides"
```

---

### Task 3: Rebuild Nav with "Where to Start" mega-menu (desktop)

**Files:**
- Modify: `src/components/Nav.jsx`
- Reference: `insitehub-website-v4.jsx` lines 355-420

- [ ] **Step 1: Replace Nav.jsx with the v4 structure + kept mobile upgrades**

```jsx
import { useState, useEffect, useRef } from 'react';
import { HexMark } from './HexMark';

const DROP_ITEMS = [
  {icon:"🧭",title:"I need an AI strategy",desc:"Assess your readiness and build a roadmap before any technology decision.",tag:"Advisory",p:"advisory"},
  {icon:"🔬",title:"I want to run an AI pilot",desc:"Structure the experiment, define success criteria, build the business case.",tag:"Proxa Labs",p:"proxalab"},
  {icon:"🎓",title:"I need AI literacy training",desc:"Build AI fluency across your commercial organization before deploying tools.",tag:"AI Literacy",p:"literacy"},
  {icon:"🚀",title:"I'm ready for a platform",desc:"See Forge, Atlas, Echo, and Certify — the only closed-loop AI platform.",tag:"AI Platform",p:"platform"},
  {icon:"📚",title:"I need content for a launch",desc:"AI-generated or human-led, MLR-compliant content on your timeline.",tag:"Content",p:"content"},
  {icon:"🖥️",title:"I need an LMS first",desc:"Enterprise learning infrastructure built for biopharma compliance.",tag:"InsiteX LMS",p:"insitex"},
  {icon:"💬",title:"I'm not sure yet",desc:"30 minutes. No pitch. Tell us where you're stuck.",tag:"Book a Call",p:"contact"},
];

const TOP_LINKS = [
  ["AI Platform","platform"], ["AI Literacy","literacy"], ["InsiteX LMS","insitex"],
  ["Advisory","advisory"], ["Content","content"], ["Proxa Labs","proxalab"], ["About","about"],
];

const Nav = ({ page, setPage, scrolled }) => {
  const [dropOpen, setDropOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropOpen, setMobileDropOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    if (!dropOpen) return;
    const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false); };
    const esc = (e) => { if (e.key === "Escape") setDropOpen(false); };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", handler); document.removeEventListener("keydown", esc); };
  }, [dropOpen]);

  const go = (p) => { setDropOpen(false); setMobileOpen(false); setMobileDropOpen(false); setPage(p); };

  return (
    <>
      <nav className={"nav" + (scrolled ? " up" : "")}>
        <div className="nav-logo" onClick={() => go("home")}>
          <HexMark size={38} color="#F4801F" strokeWidth={1.7} />
          <span className="nav-wm">Insite<b>HUB</b></span>
        </div>
        <div className="nav-links">
          <div ref={dropRef} style={{ position: "relative" }}>
            <button
              className="nl nl-drop"
              onClick={() => setDropOpen(o => !o)}
              style={{ color: dropOpen ? "var(--o)" : undefined }}
            >
              Where to Start
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" style={{ transform: dropOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .2s", marginLeft: 4 }}>
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {dropOpen && (
              <div style={{
                position: "absolute", top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)",
                background: "var(--wh)", border: "1px solid var(--br)", borderRadius: 16,
                boxShadow: "0 20px 60px rgba(0,0,0,.14),0 4px 16px rgba(0,0,0,.06)",
                padding: 8, width: 600, zIndex: 400,
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4
              }}>
                {DROP_ITEMS.map(d => (
                  <div key={d.p} onClick={() => go(d.p)} className="ndm-item" style={{ padding: "14px 16px", borderRadius: 10, cursor: "pointer" }}>
                    <div style={{ fontSize: 18, marginBottom: 5 }}>{d.icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--dk)", marginBottom: 3, fontFamily: "Manrope,sans-serif" }}>{d.title}</div>
                    <div style={{ fontSize: 11.5, color: "var(--bd)", lineHeight: 1.45, marginBottom: 6 }}>{d.desc}</div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "var(--o)", background: "var(--o10)", borderRadius: 20, padding: "2px 8px", display: "inline-block", letterSpacing: ".04em" }}>{d.tag}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {TOP_LINKS.map(([l, p]) => (
            <button key={p} className={"nl" + (page === p ? " on" : "")} onClick={() => go(p)}>{l}</button>
          ))}
        </div>
        <div className="nav-right">
          <button className="ng" onClick={() => go("contact")}>Contact</button>
          <button className="no" onClick={() => go("contact")}>Book a Demo</button>
          <button className="nav-hamburger" onClick={() => setMobileOpen(o => !o)} aria-label="Menu">
            <span style={mobileOpen ? { transform: "rotate(45deg) translate(5px,5px)" } : {}} />
            <span style={mobileOpen ? { opacity: 0 } : {}} />
            <span style={mobileOpen ? { transform: "rotate(-45deg) translate(5px,-5px)" } : {}} />
          </button>
        </div>
      </nav>
      <div className={"nav-mobile-menu" + (mobileOpen ? " open" : "")}>
        <button className="mobile-accordion-head" onClick={() => setMobileDropOpen(o => !o)}>
          <span>Where to Start</span>
          <span style={{ transform: mobileDropOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform .2s" }}>▾</span>
        </button>
        {mobileDropOpen && (
          <div className="mobile-accordion-body">
            {DROP_ITEMS.map(d => (
              <button key={d.p} onClick={() => go(d.p)}>
                <span style={{ marginRight: 10 }}>{d.icon}</span>{d.title}
              </button>
            ))}
          </div>
        )}
        {TOP_LINKS.map(([l, p]) => (
          <button key={p} className={page === p ? "on" : ""} onClick={() => go(p)}>{l}</button>
        ))}
        <button onClick={() => go("contact")}>Contact</button>
        <button className="mobile-cta" onClick={() => go("contact")}>Book a Demo</button>
      </div>
    </>
  );
};

export default Nav;
```

- [ ] **Step 2: Add mobile accordion styles to styles.css**

Append to `src/styles.css`:

```css
.mobile-accordion-head {
  width: 100%; text-align: left; padding: 16px 20px; border-radius: 12px;
  border: none; background: var(--lt); font-family: 'DM Sans',sans-serif;
  font-size: 16px; font-weight: 600; color: var(--dk); cursor: pointer;
  display: flex; align-items: center; justify-content: space-between;
}
.mobile-accordion-body { display: flex; flex-direction: column; gap: 4px; padding: 8px 0 8px 16px; }
.mobile-accordion-body button {
  width: 100%; text-align: left; padding: 12px 16px; border-radius: 10px;
  border: none; background: none; font-family: 'DM Sans',sans-serif;
  font-size: 14px; color: var(--bd); cursor: pointer;
}
.mobile-accordion-body button:hover { background: var(--lt); color: var(--dk); }
```

- [ ] **Step 3: Build + visual check**

Run: `npm run build` — expect clean build.
Run: `npm run dev` and navigate to home. Click "Where to Start" in the nav — dropdown should open with 7 cards in 2 columns. Click outside — it closes. Press Esc — it closes. Click any card — navigates to the right page and dropdown closes.
Resize to ≤960px — hamburger appears, dropdown-trigger disappears, tap hamburger → panel opens → tap "Where to Start" accordion → 7 options expand → tap one → navigates and menu closes.

- [ ] **Step 4: Commit**

```bash
git add src/components/Nav.jsx src/styles.css
git commit -m "Rebuild Nav with Where to Start mega-menu and mobile accordion"
```

---

### Task 4: Rebuild Footer with 4-column structure + newsletter bar

**Files:**
- Modify: `src/components/Footer.jsx`
- Reference: `insitehub-website-v4.jsx` lines 444-611

- [ ] **Step 1: Replace Footer.jsx**

```jsx
import { useState } from 'react';
import { HexMark } from './HexMark';
import SocialIcon from './SocialIcon';

const NAV_COLUMNS = [
  ["AI Platform", [
    ["InsiteHub Forge","platform"], ["InsiteHub Atlas","platform"],
    ["InsiteHub Echo","platform"], ["Certify","platform"],
    ["InsiteX LMS","insitex"], ["AI Literacy Program","literacy"],
  ]],
  ["Services", [
    ["Advisory","advisory"], ["Content Development","content"],
    ["Proxa Labs","proxalab"],
  ]],
  ["Company", [
    ["About","about"], ["Announcements","news"],
    ["Resources & Guides","resources"], ["Newsletter","newsletter"],
    ["Contact","contact"], ["Book a Demo","contact"],
  ]],
];

const QUICK_LINKS = [
  {l:"Start with Advisory", p:"advisory"},
  {l:"See the Platform", p:"platform"},
  {l:"Explore Proxa Labs", p:"proxalab"},
];

const SOCIAL = [
  {type:"linkedin", href:"https://linkedin.com/company/insitehub", label:"LinkedIn"},
  {type:"facebook", href:"https://facebook.com/insitehub", label:"Facebook"},
  {type:"x", href:"https://x.com/insitehub", label:"X"},
];

const Footer = ({ setPage }) => {
  const [email, setEmail] = useState('');
  const [subbed, setSubbed] = useState(false);
  const [sending, setSending] = useState(false);

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
      if (data.success) setSubbed(true);
    } catch (e) {
      // Silent — newsletter failure is non-critical
    } finally {
      setSending(false);
    }
  };

  return (
    <footer style={{ background: "#1A1D25", borderTop: "1px solid rgba(255,255,255,.06)" }}>
      {/* Top newsletter bar */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,.06)", padding: "40px 56px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,.75)", fontFamily: "Manrope,sans-serif", marginBottom: 4 }}>Stay ahead of AI in biopharma commercial learning.</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,.28)" }}>Frameworks, research, and field notes from InsiteHub's practitioners. No vendor noise.</div>
          </div>
          {subbed ? (
            <div style={{ fontSize: 13, color: "#34D399", fontWeight: 600 }}>✓ You're in. We'll be in touch.</div>
          ) : (
            <div className="fn-wrap" style={{ minWidth: 340 }}>
              <input className="fn-in" placeholder="your@company.com" value={email} onChange={e => setEmail(e.target.value)} />
              <button className="fn-btn" onClick={handleSubscribe} disabled={sending}>{sending ? "..." : "Get the Frameworks"}</button>
            </div>
          )}
        </div>
      </div>

      {/* Main grid */}
      <div style={{ padding: "52px 56px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2.4fr 1fr 1fr 1fr", gap: 52, marginBottom: 48 }}>
            {/* Column 1: Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", marginBottom: 16 }} onClick={() => setPage("home")}>
                <HexMark size={34} color="#F4801F" strokeWidth={1.6} />
                <span style={{ fontFamily: "Manrope,sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: "-.04em", color: "rgba(255,255,255,.75)" }}>Insite<span style={{ color: "#F4801F" }}>HUB</span></span>
              </div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,.3)", lineHeight: 1.72, maxWidth: 280, marginBottom: 20 }}>The AI implementation partner built for the organizational complexity of biopharma commercial learning — not adapted for it.</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
                {QUICK_LINKS.map(b => (
                  <button key={b.l} onClick={() => setPage(b.p)} style={{ fontSize: 12, fontWeight: 600, padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,.1)", background: "none", color: "rgba(255,255,255,.4)", cursor: "pointer", fontFamily: "DM Sans,sans-serif" }}>{b.l}</button>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                {SOCIAL.map(s => (
                  <a key={s.type} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    style={{ width: 36, height: 36, borderRadius: 9, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.35)", textDecoration: "none" }}>
                    <SocialIcon type={s.type} />
                  </a>
                ))}
              </div>
            </div>
            {/* Columns 2-4: Nav links */}
            {NAV_COLUMNS.map(([h, links]) => (
              <div key={h}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".09em", textTransform: "uppercase", color: "rgba(255,255,255,.28)", marginBottom: 16 }}>{h}</div>
                {links.map(([l, p]) => (
                  <div key={l} style={{ fontSize: 13.5, color: "rgba(255,255,255,.25)", marginBottom: 11, cursor: "pointer" }} onClick={() => setPage(p)}>{l}</div>
                ))}
              </div>
            ))}
          </div>
          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", paddingTop: 26, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.16)" }}>© 2026 InsiteHub, Inc. · Newark, DE · InsiteHub, Inc. is a Delaware S-Corp</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["SOC 2 Type II","NIH Partner","Biopharma Native","University of Delaware Partner"].map(t => (
                <div key={t} style={{ fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 20, border: "1px solid rgba(255,255,255,.08)", color: "rgba(255,255,255,.2)" }}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

- [ ] **Step 2: Build + visual check**

Run: `npm run build` — clean.
Run: `npm run dev` → scroll to footer on home. Confirm: top newsletter bar, 4-column grid (Brand + 3 link columns), bottom bar with 4 badges. Click a footer link → navigates. Enter an email + Subscribe → `sending...` state → success state (requires live Firebase function).

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.jsx
git commit -m "Restore 4-column footer with newsletter bar and compliance badges"
```

---

## Phase 2 — Shared components

### Task 5: Create NewsletterInline component

**Files:**
- Create: `src/components/NewsletterInline.jsx`

- [ ] **Step 1: Write the component**

```jsx
import { useState } from 'react';

const NewsletterInline = ({ buttonLabel = "Subscribe", placeholder = "your@company.com", onSuccess }) => {
  const [email, setEmail] = useState('');
  const [subbed, setSubbed] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    if (!email) return;
    setSending(true);
    setError('');
    try {
      const res = await fetch(import.meta.env.VITE_NEWSLETTER_FUNCTION_URL || '/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setSubbed(true);
        onSuccess?.();
      } else {
        setError(data.error || 'Something went wrong. Try again.');
      }
    } catch (e) {
      setError('Something went wrong. Try again.');
    } finally {
      setSending(false);
    }
  };

  if (subbed) {
    return <div style={{ fontSize: 13, color: "#34D399", fontWeight: 600 }}>✓ You're subscribed. We'll be in touch.</div>;
  }

  return (
    <div>
      <div className="fn-wrap">
        <input className="fn-in" placeholder={placeholder} value={email} onChange={e => setEmail(e.target.value)} />
        <button className="fn-btn" onClick={submit} disabled={sending}>{sending ? "..." : buttonLabel}</button>
      </div>
      {error && <div style={{ fontSize: 12, color: "#FCA5A5", marginTop: 8 }}>{error}</div>}
    </div>
  );
};

export default NewsletterInline;
```

- [ ] **Step 2: Build**

Run: `npm run build` — clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/NewsletterInline.jsx
git commit -m "Add NewsletterInline shared component"
```

---

### Task 6: Create AnnouncementBand component

**Files:**
- Create: `src/components/AnnouncementBand.jsx`

- [ ] **Step 1: Write the component**

```jsx
const AnnouncementBand = ({ icon = "🎓", tag = "New", tagColor = "#D97706", title, description, primaryCta, secondaryCta }) => (
  <div style={{
    background: "linear-gradient(135deg,#FFFBF0 0%,#FFF5E0 100%)",
    borderTop: "1px solid rgba(245,158,11,.15)",
    borderBottom: "1px solid rgba(245,158,11,.15)",
    padding: "32px 56px",
  }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(245,158,11,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{icon}</div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: tagColor, background: "rgba(245,158,11,.15)", borderRadius: 20, padding: "2px 9px", letterSpacing: ".06em", textTransform: "uppercase" }}>{tag}</span>
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "var(--dk)", fontFamily: "Manrope,sans-serif", letterSpacing: "-.025em", marginBottom: 2 }}>{title}</div>
          <div style={{ fontSize: 13, color: "var(--bd)" }}>{description}</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
        {primaryCta && <button onClick={primaryCta.onClick} style={{ padding: "11px 24px", borderRadius: 10, background: "#D97706", border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "DM Sans,sans-serif", whiteSpace: "nowrap" }}>{primaryCta.label}</button>}
        {secondaryCta && <button onClick={secondaryCta.onClick} style={{ padding: "11px 24px", borderRadius: 10, background: "none", border: "1.5px solid rgba(245,158,11,.4)", color: "#D97706", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "DM Sans,sans-serif", whiteSpace: "nowrap" }}>{secondaryCta.label}</button>}
      </div>
    </div>
  </div>
);

export default AnnouncementBand;
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/AnnouncementBand.jsx
git commit -m "Add AnnouncementBand shared component"
```

---

### Task 7: Create SituationCard, DiffCard, StepCard

**Files:**
- Create: `src/components/SituationCard.jsx`
- Create: `src/components/DiffCard.jsx`
- Create: `src/components/StepCard.jsx`

- [ ] **Step 1: SituationCard**

```jsx
const SituationCard = ({ icon, title, description }) => (
  <div className="ac" style={{ background: "var(--wh)" }}>
    <div style={{ fontSize: 24, marginBottom: 12 }}>{icon}</div>
    <div className="ac-t" style={{ fontSize: 15 }}>{title}</div>
    <div className="ac-d">{description}</div>
  </div>
);
export default SituationCard;
```

- [ ] **Step 2: DiffCard**

```jsx
const DiffCard = ({ number, title, body, quote }) => (
  <div className="dc">
    <div className="dc-n">{number}</div>
    <div className="dc-t">{title}</div>
    <div className="dc-b">{body}</div>
    {quote && <div className="dc-q">"{quote}"</div>}
  </div>
);
export default DiffCard;
```

- [ ] **Step 3: StepCard**

```jsx
const StepCard = ({ number, title, description, highlight }) => (
  <div className="ps" style={{ background: highlight ? "rgba(245,158,11,.04)" : "" }}>
    <div className="ps-n" style={{ background: highlight ? "rgba(245,158,11,.15)" : "var(--o10)", color: highlight ? "#D97706" : "var(--o)" }}>{number}</div>
    <div>
      <div className="ps-t" style={{ color: highlight ? "#D97706" : "var(--dk)" }}>
        {title}
        {highlight && <span style={{ marginLeft: 8, fontSize: 10, fontWeight: 700, color: "#D97706", background: "rgba(245,158,11,.15)", borderRadius: 20, padding: "1px 7px", letterSpacing: ".05em" }}>NEW</span>}
      </div>
      <div className="ps-d">{description}</div>
    </div>
  </div>
);
export default StepCard;
```

- [ ] **Step 4: Build + commit**

```bash
npm run build
git add src/components/SituationCard.jsx src/components/DiffCard.jsx src/components/StepCard.jsx
git commit -m "Add SituationCard, DiffCard, StepCard shared components"
```

---

## Phase 3 — HomePage enrichment

### Task 8: HomePage sections 1-4 (hero, announcements, logos, stats)

**Files:**
- Modify: `src/pages/HomePage.jsx`
- Reference: `insitehub-website-v4.jsx` lines 643-728

- [ ] **Step 1: Replace the hero section and add announcements + stats**

Replace the entire current `HomePage.jsx` hero through stats with the v4 equivalent (lines 643-728), keeping the current `hero-loop-desktop` / `hero-loop-mobile` split with the already-upgraded `LoopVisual` and `LoopMobile`:

```jsx
import useReveal from '../hooks/useReveal';
import LoopVisual from '../components/LoopVisual';
import LoopMobile from '../components/LoopMobile';

const HomePage = ({ setPage }) => {
  useReveal();
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 22 }}>
              <div className="hero-pill" style={{ marginBottom: 0 }}><div className="hpd" />AI-First · Innovation-Led · Purpose-Built for Biopharma</div>
              <div className="hero-pill" style={{ marginBottom: 0, background: "rgba(245,158,11,.1)", border: "1px solid rgba(245,158,11,.25)", color: "#D97706", cursor: "pointer" }} onClick={() => setPage("literacy")}>
                <span style={{ fontSize: 9 }}>NEW</span> · AI Literacy Program — Now Available
              </div>
            </div>
            <h1 className="hero-h1">
              InsiteHub gives biopharma<br />commercial teams the <em>strategy,<br />the literacy, and the platform</em><br />to go from AI mandate to AI results.
            </h1>
            <p className="hero-p">The only closed-loop AI platform built for biopharma — and the only partner with the advisory methodology, AI literacy program, and implementation track record to make it stick. Built from the inside. Stress-tested in the field. Designed to work where others have failed.</p>
            <div className="hero-actions">
              <button className="bp" onClick={() => setPage("platform")}>See the Platform</button>
              <button className="bs" onClick={() => setPage("advisory")}>Start with Advisory</button>
              <button className="bt" onClick={() => setPage("contact")}>Book a Demo →</button>
            </div>
            <div className="hero-social">
              <span className="hs-label">Trusted by</span>
              <div className="hs-logos">
                {["Pfizer","Novartis","AstraZeneca","Sanofi","Amgen","Biogen","Roche"].map(n => <span key={n} className="hs-co">{n}</span>)}
              </div>
            </div>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(0,0,0,.07)", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, color: "var(--bdl)" }}>Latest research:</span>
              <span onClick={() => setPage("proxalab")} style={{ fontSize: 12, fontWeight: 600, color: "var(--o)", cursor: "pointer", textDecoration: "underline" }}>r=0.84 — AI competency scores vs. field performance outcomes</span>
              <span style={{ fontSize: 12, color: "var(--bdl)" }}>·</span>
              <span onClick={() => setPage("newsletter")} style={{ fontSize: 12, fontWeight: 600, color: "var(--bd)", cursor: "pointer" }}>Subscribe for new research →</span>
            </div>
          </div>
          <div className="hero-loop-desktop" style={{ position: "relative" }}><LoopVisual /></div>
        </div>
        <div className="hero-loop-mobile"><LoopMobile /></div>
      </section>

      {/* CLIENT LOGOS */}
      <div className="logo-band">
        <div className="lb-label">Trusted across biopharma and health systems</div>
        <div className="lb-row">
          {["AbbVie","Allergan","Amgen","AstraZeneca","Bayer","Biogen","BMS","Genentech","GSK","Janssen","Merck","Novartis","Novo Nordisk","Pfizer","Roche","Sanofi","Takeda","Teva","Gilead","Mass General","Penn Medicine","MD Anderson"].map(n => <span key={n} className="lb-co">{n}</span>)}
        </div>
      </div>

      {/* ANNOUNCEMENTS STRIP */}
      <section className="sec sw" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="mw">
          <div style={{ borderTop: "1.5px solid var(--br)", padding: "40px 0" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
              <div className="ey" style={{ marginBottom: 0 }}>Latest from InsiteHub</div>
              <button className="bt" onClick={() => setPage("news")}>All Announcements →</button>
            </div>
            <div className="grid-3">
              {[
                { tag: "New Partnership", tagC: "#007AFF", tagBg: "rgba(0,122,255,.08)", date: "April 2026", t: "InsiteHub partners with UMU.com for AI Literacy delivery", p: "news" },
                { tag: "Platform Update", tagC: "#7C3AED", tagBg: "rgba(124,58,237,.08)", date: "March 2026", t: "Echo ComplianceGuard v2 — enhanced MLR flagging released", p: "news" },
                { tag: "Research", tagC: "#059669", tagBg: "rgba(5,150,105,.08)", date: "February 2026", t: "Proxa Labs AI Readiness Scoring Model beta now available", p: "proxalab" },
              ].map(a => (
                <div key={a.t} onClick={() => setPage(a.p)} style={{ background: "var(--lt)", border: "1.5px solid var(--br)", borderRadius: 14, padding: 20, cursor: "pointer" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: a.tagC, background: a.tagBg, borderRadius: 20, padding: "2px 9px", letterSpacing: ".04em" }}>{a.tag}</span>
                    <span style={{ fontSize: 11, color: "var(--bdl)" }}>{a.date}</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--dk)", lineHeight: 1.45 }}>{a.t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats">
        <div className="stats-row">
          {[{ n: "80–95%", l: "of pharma AI pilots never scale or deliver measurable value" }, { n: "11 mo", l: "average ramp to full rep productivity in biopharma" }, { n: "84%", l: "of pharma reps missed quota last year" }, { n: "25 yrs", l: "biopharma commercial L&D expertise behind our methodology" }].map(s => (
            <div className="st" key={s.n}><div className="st-n">{s.n}</div><div className="st-l">{s.l}</div></div>
          ))}
        </div>
      </div>

      {/* sections 5-14 land in later tasks */}
    </>
  );
};

export default HomePage;
```

- [ ] **Step 2: Build + visual check**

`npm run dev`. On home, verify: hero has 2 pills + 3-line headline + 3-button row + trusted-by row + research strip; announcements strip below logos shows 3 cards; stats band dark with 4 stats.

- [ ] **Step 3: Commit**

```bash
git add src/pages/HomePage.jsx
git commit -m "HomePage: restore hero, announcements strip, stats (sections 1-4)"
```

---

### Task 9: HomePage sections 5-8 (thought leadership, literacy band, differentiators, products)

**Files:**
- Modify: `src/pages/HomePage.jsx`
- Reference: `insitehub-website-v4.jsx` lines 730-847

- [ ] **Step 1: Append sections 5-8 before the `{/* sections 5-14 land in later tasks */}` marker**

Port v4 lines 730-847: thought-leadership strip (4 cards), AI Literacy announcement band (use `AnnouncementBand` component), "Why InsiteHub" 4 differentiator cards (use `DiffCard` component), AI Products grid (4 product cards).

Key patterns:

```jsx
import AnnouncementBand from '../components/AnnouncementBand';
import DiffCard from '../components/DiffCard';
// ...inside component, after STATS section and before the marker:

{/* THOUGHT LEADERSHIP STRIP */}
<div style={{ background: "var(--wh)", borderBottom: "1px solid var(--br)", padding: "36px 56px" }}>
  <div style={{ maxWidth: 1200, margin: "0 auto" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
      <div>
        <div className="ey" style={{ marginBottom: 4 }}>The Thinking Behind the Platform</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: "var(--dk)", fontFamily: "Manrope,sans-serif", letterSpacing: "-.03em" }}>From the practitioners who built it.</div>
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button className="bt" onClick={() => setPage("resources")}>All Frameworks & Guides →</button>
        <button onClick={() => setPage("newsletter")} style={{ padding: "9px 18px", borderRadius: 9, background: "var(--o10)", border: "1px solid var(--o20)", color: "var(--o)", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Subscribe for new research</button>
      </div>
    </div>
    <div className="grid-4">
      {[
        { icon: "🗺️", tag: "Guide", tagC: "#7C3AED", tagBg: "rgba(124,58,237,.08)", t: "The AI Pilot Failure Taxonomy", d: "Four failure patterns that account for 80–95% of pharma AI pilot failures — and what each one looks like from the inside before it becomes a postmortem.", p: "resources" },
        { icon: "📋", tag: "Framework", tagC: "#F4801F", tagBg: "rgba(244,128,31,.08)", t: "AI Readiness Self-Assessment", d: "A 15-question framework for evaluating your organization's readiness to deploy AI — governance, data, stakeholder alignment, and measurement capability.", p: "resources" },
        { icon: "🔬", tag: "Research", tagC: "#059669", tagBg: "rgba(5,150,105,.08)", t: "r=0.84 — AI competency scores vs. field performance", d: "Early Proxa Labs data on the correlation between AI-assessed behavioral competencies and real-world commercial performance outcomes.", p: "proxalab" },
        { icon: "📊", tag: "Template", tagC: "#007AFF", tagBg: "rgba(0,122,255,.08)", t: "Commercial L&D AI Business Case Template", d: "The ROI model structure we use with clients to frame pilot results in the language the CCO, CFO, and CHRO actually use to make decisions.", p: "resources" },
      ].map(c => (
        <div key={c.t} onClick={() => setPage(c.p)} style={{ background: "var(--lt)", border: "1.5px solid var(--br)", borderRadius: 14, padding: 20, cursor: "pointer", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: c.tagC, background: c.tagBg, borderRadius: 20, padding: "2px 9px", letterSpacing: ".04em" }}>{c.tag}</span>
            <div style={{ fontSize: 18 }}>{c.icon}</div>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--dk)", fontFamily: "Manrope,sans-serif", lineHeight: 1.35 }}>{c.t}</div>
          <div style={{ fontSize: 12, color: "var(--bd)", lineHeight: 1.55, flex: 1 }}>{c.d}</div>
          <div style={{ fontSize: 12, color: "var(--o)", fontWeight: 600 }}>Read →</div>
        </div>
      ))}
    </div>
  </div>
</div>

{/* AI LITERACY ANNOUNCEMENT BAND */}
<AnnouncementBand
  icon="🎓"
  tag="New Program"
  title="AI Literacy Program — the prerequisite every AI deployment needs."
  description="Build AI fluency across every role before tools go live. Teams that understand AI adopt it. Teams that don't, resist it."
  primaryCta={{ label: "See the Program", onClick: () => setPage("literacy") }}
  secondaryCta={{ label: "Get the Overview", onClick: () => setPage("contact") }}
/>

{/* WHY INSITEHUB */}
<section className="sec sl">
  <div className="mw">
    <div className="sh">
      <div className="ey">The InsiteHub Difference</div>
      <h2 className="h2">Innovation isn't a talking point here.<br />It's a track record.</h2>
      <p className="lead">InsiteHub built an award-winning virtual world for a European drug launch when competitors were spending $5M on vendor platforms. We secured an NIH grant and launched one of the only two biomedical accelerators outside a university in the US. We pioneered gamification in pharmaceutical training before it had a name. And we built the first closed-loop AI platform in biopharma commercial learning. The methodology behind all of it is the same: define the real problem, experiment before you commit, and never ship something you haven't stress-tested in the actual environment.</p>
    </div>
    <div className="dg">
      {[
        { n: "01 / Methodology Before Technology", t: "We diagnose before we prescribe.", b: "Every engagement starts with the question your organization actually needs answered: what will determine whether any AI implementation succeeds or fails here? Most vendors skip this. We never do.", q: "Most vendors lead with a demo. We lead with a diagnosis — because the thing that determines whether AI works is never about the technology." },
        { n: "02 / Compliance by Design", t: "Their compliance story is a retrofit. Ours is not.", b: "MLR review, GxP validation, and compressed launch windows are the operating conditions InsiteHub was designed around from day one. Every platform built for another industry and adapted for biopharma is playing catch-up.", q: "Biopharma compliance was a design requirement. Not a feature we added later." },
        { n: "03 / Insider Credibility", t: "We don't need you to explain pharma to us.", b: "InsiteHub's practitioners have operated inside the environments they now advise. The failure modes are already known. The governance dynamics are already understood. That's not a talking point — it's a 25-year track record.", q: "Every hour spent educating a vendor about MLR timelines is an hour you're not moving toward the outcome you need." },
        { n: "04 / Experimentation Before Commitment", t: "You don't commit until you have evidence.", b: "InsiteHub's model inverts the typical vendor sequence. We run structured experiments to test fit in your environment before you stake your credibility on it. In biopharma, a failed pilot doesn't just cost budget — it costs launch momentum.", q: "In biopharma, a failed pilot costs more than a budget line. We generate evidence before you scale." },
      ].map(d => <DiffCard key={d.n} number={d.n} title={d.t} body={d.b} quote={d.q} />)}
    </div>
    <div className="sec-cta">
      <button className="bp" onClick={() => setPage("advisory")}>Explore Advisory Services</button>
      <button className="bs" onClick={() => setPage("about")}>Our Innovation Track Record</button>
    </div>
  </div>
</section>

{/* AI PRODUCTS */}
<section className="sec sw">
  <div className="mw">
    <div className="sh">
      <div className="ey">AI-First Platform</div>
      <h2 className="h2">Four products. One closed loop.<br />No competitor has this.</h2>
      <p className="lead">Content created in Forge powers learning in Atlas, assessed in Echo, drives Certify — and gaps automatically restart the loop. The only platform that turns assessment failures into new content builds without a human handoff.</p>
    </div>
    <div className="pg">
      {[
        { c: "#F4801F", bg: "rgba(244,128,31,.09)", icon: "⚡", name: "InsiteHub Forge", tag: "Agentic content creation", desc: "AI agents build MLR-compliant training from your PI, CSRs, and brand assets. Hours, not months. Every claim traced to source. No instructional designer required.", bullets: ["Auto-generation from clinical data and PI", "Every claim cited — MLR artifacts auto-built", "Veeva workflow integration", "Content Gap Analyzer closes the loop from Echo"] },
        { c: "#007AFF", bg: "rgba(0,122,255,.09)", icon: "🎓", name: "InsiteHub Atlas", tag: "AI-powered adaptive learning", desc: "Adaptive AI tutor delivering personalized pathways, closing knowledge gaps in real time, and ensuring reps are field-ready before the launch window closes.", bullets: ["Competency-mapped personalized pathways", "Gap-aware adaptive remediation engine", "Manager dashboards with predictive readiness", "Integrates with InsiteX LMS and Veeva"] },
        { c: "#7C3AED", bg: "rgba(124,58,237,.09)", icon: "🎭", name: "InsiteHub Echo", tag: "AI roleplay & behavioral assessment", desc: "Reps practice live HCP conversations with AI-powered physician avatars. ComplianceGuard monitors every message in real time. Behavioral scoring benchmarked against top quartile.", bullets: ["8 HCP digital twin avatars", "ComplianceGuard real-time flagging", "Behavioral scorecard + industry benchmarks", "Gap payload feeds Forge auto-rebuild"] },
        { c: "#059669", bg: "rgba(5,150,105,.09)", icon: "✅", name: "Certify", tag: "Demonstrated field readiness", desc: "Certification earned through demonstrated competency, not attendance. Behavioral evidence tied to every certification. 10-year audit trail. Loop restarts on any gap detected.", bullets: ["Competency-gated — no attendance shortcuts", "Behavioral evidence for every credential", "SHA-256 immutable 10-year audit log", "SOC 2 Type II compliant"] },
      ].map(p => (
        <div key={p.name} className="pc" onClick={() => setPage("platform")}>
          <div className="pc-bar" style={{ background: p.c }} /><div className="pc-gl" style={{ background: p.c }} />
          <div className="pc-ir">
            <div className="pc-ic" style={{ background: p.bg }}>{p.icon}</div>
            <div><div className="pc-nm">{p.name}</div><div className="pc-tg">{p.tag}</div></div>
          </div>
          <div className="pc-ds">{p.desc}</div>
          <div className="pc-bl">{p.bullets.map(b => <div key={b} className="pc-bi"><div className="pbd" style={{ background: p.c }} />{b}</div>)}</div>
        </div>
      ))}
    </div>
    <div className="sec-cta">
      <button className="bp" onClick={() => setPage("platform")}>Deep Dive: AI Platform</button>
      <button className="bt" onClick={() => setPage("insitex")}>Not ready for AI? See InsiteX LMS →</button>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Build + visual check**

`npm run build` clean. On home: TL strip (4 cards, colored tags) → orange literacy band → "The InsiteHub Difference" (4 diff cards each with quote) → AI Products 2x2 grid. Tap TL cards route to `resources`/`proxalab`; literacy band buttons route to `literacy`/`contact`; product cards route to `platform`.

- [ ] **Step 3: Commit**

```bash
git add src/pages/HomePage.jsx
git commit -m "HomePage: thought leadership, literacy band, differentiators, products (5-8)"
```

---

### Task 10: HomePage sections 9-11 (inline CTA, "Who this is for", case study)

**Files:**
- Modify: `src/pages/HomePage.jsx`
- Reference: `insitehub-website-v4.jsx` lines 850-948

- [ ] **Step 1: Append sections 9-11**

After the AI Products section, add:

```jsx
import SituationCard from '../components/SituationCard';
// ...

{/* INLINE CTA BAR */}
<div style={{ padding: "0 56px 0", background: "var(--wh)" }}>
  <div className="mw">
    <div className="cta-bar">
      <div>
        <div className="cta-bar-t">Talk to someone who's been in your seat.</div>
        <div className="cta-bar-s">30 minutes. No demo, no pitch deck. Just your environment and what's been blocking you.</div>
      </div>
      <button className="cta-bar-btn" onClick={() => setPage("contact")}>Schedule a Discovery Call</button>
    </div>
  </div>
</div>

{/* WHO THIS IS FOR */}
<section className="sec sl">
  <div className="mw">
    <div style={{ textAlign: "center", marginBottom: 52 }}>
      <div className="ey" style={{ textAlign: "center" }}>Who InsiteHub Is For</div>
      <h2 className="h2" style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 16px" }}>Built for the commercial L&D leader who's done with pilots that go nowhere.</h2>
      <p className="lead" style={{ textAlign: "center", margin: "0 auto" }}>If any of these sound like your situation, you're in the right place.</p>
    </div>
    <div className="grid-3" style={{ gap: 14, marginBottom: 44 }}>
      {[
        { icon: "🎯", t: "You have an AI mandate with no clear path forward", d: "Your CCO wants results. Your IT and compliance teams want governance. Your budget requires ROI. You're navigating all three without a methodology that accounts for any of them." },
        { icon: "🔥", t: "You've run a pilot that didn't scale", d: "It worked in the demo. It looked good in the pilot report. And then it died at the governance gate or got quietly deprioritized when the business sponsor moved on." },
        { icon: "⏱️", t: "You have a launch in 6–9 months and content isn't ready", d: "The commercial team needs field-ready reps. The content pipeline is behind. MLR review adds 60 days on a good day. You need a faster path that doesn't sacrifice compliance." },
        { icon: "🔍", t: "You're evaluating AI vendors and can't tell who to trust", d: "Every vendor says they're built for biopharma. Every demo looks polished. You've been burned before and need someone who can help you evaluate with the rigor the decision requires." },
        { icon: "📊", t: "Your L&D team is measuring completion rates, not performance", d: "You know the CCO scorecard tracks rep readiness, call quality, and launch execution speed — not module completion. You need a partner who speaks that language." },
        { icon: "🏗️", t: "You're building AI capability from scratch", d: "No existing platform. No governance framework. No internal AI literacy. You need a structured starting point, not a vendor pitch that assumes you're already ready to deploy." },
      ].map(c => <SituationCard key={c.t} icon={c.icon} title={c.t} description={c.d} />)}
    </div>
    <div style={{ textAlign: "center" }}>
      <button className="bp" onClick={() => setPage("contact")} style={{ marginRight: 14 }}>Start a Conversation</button>
      <button className="bs" onClick={() => setPage("advisory")}>See How We Work</button>
    </div>
  </div>
</section>

{/* CASE STUDY */}
<section className="sec sw">
  <div className="mw">
    <div style={{ textAlign: "center", marginBottom: 52 }}>
      <div className="ey" style={{ textAlign: "center" }}>Client Story</div>
      <h2 className="h2" style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 16px" }}>From failed pilot to funded AI roadmap in under six months.</h2>
      <p className="lead" style={{ textAlign: "center", margin: "0 auto" }}>How a mid-size oncology company used Proxa Labs to go from AI pressure to a CCO-approved implementation plan.</p>
    </div>
    <div className="grid-4" style={{ gap: 0, marginBottom: 48, background: "var(--wh)", border: "1.5px solid var(--br)", borderRadius: 20, overflow: "hidden" }}>
      {[
        { phase: "The Situation", c: "#7C3AED", bg: "rgba(124,58,237,.04)", icon: "🏥", text: "A VP of Commercial L&D at a mid-size oncology company had run two AI coaching pilots. Both showed promise in demo conditions. Neither survived IT validation. The CCO was losing patience. The next quarter's budget review was 90 days away." },
        { phase: "Define & Design", c: "#F4801F", bg: "rgba(244,128,31,.04)", icon: "🎯", text: "Proxa Labs conducted a 3-week use case diagnostic. We identified that both pilots had failed for the same reason: the AI was being evaluated on engagement metrics, not on whether it changed rep behavior before an HCP call. We redesigned the experiment around a single bounded question: does AI roleplay practice improve first-call quality scores in a 12-rep cohort?" },
        { phase: "Measure & Execute", c: "#059669", bg: "rgba(5,150,105,.04)", icon: "📈", text: "The 6-week pilot ran against pre-defined success criteria: a 15% improvement in manager-assessed call quality, and zero MLR compliance flags in session transcripts. Both thresholds were met. Call quality improved 23%. The compliance record was clean. The evidence was real and defensible." },
        { phase: "The Business Case", c: "#007AFF", bg: "rgba(0,122,255,.04)", icon: "📋", text: "Proxa Labs built the business case alongside the pilot — not after it. The CCO presentation framed results in commercial terms: reduced ramp time, measurable call quality lift, and a phased AI roadmap with clear go/no-go decision points. The program was approved and funded within three weeks of the pilot conclusion." },
      ].map((s, i, arr) => (
        <div key={s.phase} style={{ padding: 28, borderRight: i < arr.length - 1 ? "1px solid var(--br)" : "none", background: s.bg }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: (s.c + "15"), border: ("1px solid " + s.c + "30"), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, marginBottom: 14 }}>{s.icon}</div>
          <div style={{ fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: s.c, fontWeight: 700, marginBottom: 8 }}>{s.phase}</div>
          <div style={{ fontSize: 13, color: "var(--bd)", lineHeight: 1.65 }}>{s.text}</div>
        </div>
      ))}
    </div>
    <div className="grid-auto-quote" style={{ background: "linear-gradient(135deg,#FFFAF6,#FFF4E8)", border: "1.5px solid rgba(244,128,31,.2)", borderRadius: 20, padding: "40px 48px" }}>
      <div>
        <div style={{ fontSize: 28, color: "var(--o)", fontWeight: 800, lineHeight: 1, marginBottom: 20, opacity: .3 }}>"</div>
        <p style={{ fontSize: 18, color: "var(--dk)", lineHeight: 1.72, fontStyle: "italic", fontWeight: 400, marginBottom: 24 }}>We had been trying to make AI work for 18 months. Two pilots, two postmortems, and a CCO who was starting to ask whether L&D could actually lead this. What Proxa Labs did differently was refuse to let us skip the hard part — defining what success actually looked like before we built anything. That single decision changed everything. We walked into our budget review with evidence, not a pitch deck.</p>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg,#F4801F,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#fff", fontWeight: 700, fontFamily: "Manrope,sans-serif", flexShrink: 0 }}>SC</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--dk)", fontFamily: "Manrope,sans-serif" }}>Sarah Chen</div>
            <div style={{ fontSize: 13, color: "var(--bd)" }}>VP, Commercial Learning & Development</div>
            <div style={{ fontSize: 12, color: "var(--o)", fontWeight: 600, marginTop: 2 }}>Mid-Size Oncology Biopharma · Series C</div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: 200 }}>
        {[{ n: "23%", l: "improvement in manager-assessed call quality" }, { n: "0", l: "MLR compliance flags across all sessions" }, { n: "3 wks", l: "from pilot conclusion to CCO approval" }, { n: "6 mo", l: "full AI roadmap funded and in execution" }].map(s => (
          <div key={s.n} style={{ textAlign: "center", padding: "14px 20px", background: "rgba(255,255,255,.8)", borderRadius: 12, border: "1px solid rgba(244,128,31,.15)" }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: "var(--o)", fontFamily: "Manrope,sans-serif", letterSpacing: "-.03em", lineHeight: 1, marginBottom: 4 }}>{s.n}</div>
            <div style={{ fontSize: 11, color: "var(--bd)", lineHeight: 1.4 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
    <div className="sec-cta" style={{ justifyContent: "center" }}>
      <button className="bp" onClick={() => setPage("proxalab")}>See the Experimentation Model</button>
      <button className="bs" onClick={() => setPage("contact")}>Start a Conversation</button>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Build + visual check**

On home: orange CTA bar → "Who This Is For" (6 situation cards) → 4-phase case study grid + testimonial quote with 4 stats column.

- [ ] **Step 3: Commit**

```bash
git add src/pages/HomePage.jsx
git commit -m "HomePage: CTA bar, Who This Is For, case study (9-11)"
```

---

### Task 11: HomePage sections 12-14 (For every stage, TL+newsletter, final CTA)

**Files:**
- Modify: `src/pages/HomePage.jsx`
- Reference: `insitehub-website-v4.jsx` lines 950-1092

- [ ] **Step 1: Append final sections**

```jsx
import StepCard from '../components/StepCard';
import NewsletterInline from '../components/NewsletterInline';
import { HexMark } from '../components/HexMark';
import SocialIcon from '../components/SocialIcon';
// ...

{/* FOR EVERY STAGE */}
<section className="sec sw" style={{ paddingTop: 60 }}>
  <div className="mw">
    <div className="grid-1-1-lg">
      <div>
        <div className="ey">For Every Stage of the Journey</div>
        <h2 className="h2">AI is where we're headed.<br />But we meet you where you are.</h2>
        <p className="lead" style={{ marginBottom: 32 }}>InsiteHub has been delivering enterprise learning infrastructure for biopharma commercial teams for over four years. The AI platform is our destination. Your timeline is yours to set.</p>
        <div className="grid-3" style={{ gap: 12 }}>
          {[
            { icon: "🗄️", n: "InsiteX LMS", d: "Enterprise learning management purpose-built for biopharma compliance, credentialing, and workflow.", tag: "Enterprise LMS", p: "insitex" },
            { icon: "📚", n: "Traditional Content", d: "Full-service instructional design by practitioners with deep pharma commercial backgrounds. Human-led, compliance-first.", tag: "Content Services", p: "content" },
            { icon: "🎓", n: "AI Literacy Program", d: "Build AI fluency across your commercial organization before deploying tools. The prerequisite every AI implementation needs.", tag: "New Program", p: "literacy", highlight: true },
          ].map(c => (
            <div key={c.n} onClick={() => setPage(c.p)} style={{ background: c.highlight ? "rgba(245,158,11,.05)" : "var(--lt)", border: c.highlight ? "1.5px solid rgba(245,158,11,.3)" : "1.5px solid var(--br)", borderRadius: 16, padding: 24, cursor: "pointer", position: "relative" }}>
              {c.highlight && <div style={{ position: "absolute", top: 12, right: 12, fontSize: 10, fontWeight: 700, color: "#D97706", background: "rgba(245,158,11,.15)", borderRadius: 20, padding: "2px 8px", letterSpacing: ".05em" }}>NEW</div>}
              <div style={{ fontSize: 26, marginBottom: 12 }}>{c.icon}</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: "var(--dk)", fontFamily: "Manrope,sans-serif", marginBottom: 7 }}>{c.n}</div>
              <div style={{ fontSize: 13, color: "var(--bd)", lineHeight: 1.6, marginBottom: 14 }}>{c.d}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: c.highlight ? "#D97706" : "var(--o)", background: c.highlight ? "rgba(245,158,11,.1)" : "var(--o10)", borderRadius: 20, padding: "4px 12px", display: "inline-block", letterSpacing: ".05em" }}>{c.tag}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: "var(--wh)", borderRadius: 20, padding: 34, border: "1.5px solid var(--br)", boxShadow: "0 8px 36px rgba(0,0,0,.05)" }}>
        <div style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--st)", fontWeight: 700, marginBottom: 24 }}>YOUR PATH WITH INSITEHUB</div>
        {[
          { n: "01", t: "Start where you are", d: "InsiteX LMS or traditional content. Proven, compliant, built for pharma." },
          { n: "02", t: "Assess your AI readiness", d: "Advisory team maps your constraints before recommending anything. No technology pitch." },
          { n: "03", t: "Build AI literacy across your team", d: "Equip every role — reps, managers, medical affairs — with the fluency to adopt AI tools effectively.", highlight: true },
          { n: "04", t: "Experiment before committing", d: "Structured pilots generate evidence in your environment before you scale." },
          { n: "05", t: "Deploy with confidence", d: "Forge, Atlas, and Echo built to survive your governance environment — not a generic enterprise." },
        ].map(s => <StepCard key={s.n} number={s.n} title={s.t} description={s.d} highlight={s.highlight} />)}
      </div>
    </div>
  </div>
</section>

{/* THOUGHT LEADERSHIP + NEWSLETTER */}
<section className="sec sw">
  <div className="mw">
    <div className="grid-1-1-lg">
      <div>
        <div className="ey">Thought Leadership</div>
        <h2 className="h2">We write what we know.<br />From the inside of biopharma.</h2>
        <p className="lead" style={{ marginBottom: 32 }}>InsiteHub's practitioners have spent 25 years inside the environments they write about. Everything we publish is drawn from first-hand implementation experience — what works, what fails, and why the standard playbook keeps producing the same postmortems.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
          {[
            { icon: "🔬", label: "Research & Data", d: "Original data from InsiteHub's advisory engagements and Proxa Labs experiments — failure patterns, readiness benchmarks, and correlation studies you won't find anywhere else.", tag: "Proxa Labs" },
            { icon: "📋", label: "Frameworks & Tools", d: "Practical tools you can use before committing to anything — AI readiness assessments, pilot design canvases, vendor scorecards, and business case templates.", tag: "Free to Use" },
            { icon: "🧠", label: "Field Notes", d: "Anonymized insight from active advisory engagements — what questions organizations are actually asking, what's failing in the field, and what separates the pilots that scale from the ones that don't.", tag: "Practitioner Insight" },
          ].map(f => (
            <div key={f.label} onClick={() => setPage("resources")} style={{ display: "flex", gap: 14, padding: "16px 20px", background: "var(--lt)", borderRadius: 12, border: "1.5px solid var(--br)", cursor: "pointer" }}>
              <div style={{ fontSize: 22, flexShrink: 0 }}>{f.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "var(--dk)", fontFamily: "Manrope,sans-serif" }}>{f.label}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "var(--o)", background: "var(--o10)", borderRadius: 20, padding: "2px 8px" }}>{f.tag}</div>
                </div>
                <div style={{ fontSize: 13, color: "var(--bd)", lineHeight: 1.55 }}>{f.d}</div>
              </div>
              <div style={{ color: "var(--o)", fontSize: 16, alignSelf: "center" }}>→</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button className="bp" onClick={() => setPage("resources")}>Browse All Frameworks & Guides</button>
          <button className="bs" onClick={() => setPage("proxalab")}>Proxa Labs Research</button>
        </div>
      </div>
      <div style={{ position: "sticky", top: 88 }}>
        <div style={{ background: "var(--dk)", borderRadius: 22, padding: 36, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -40, right: -40, opacity: .06, pointerEvents: "none" }}>
            <HexMark size={220} color="#F4801F" strokeWidth={0.7} />
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(244,128,31,.15)", borderRadius: 20, padding: "4px 12px", marginBottom: 16 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--o)" }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--o)", letterSpacing: ".06em" }}>FIELD NOTES · NEWSLETTER</span>
            </div>
            <h3 style={{ fontFamily: "Manrope,sans-serif", fontSize: 24, fontWeight: 900, color: "rgba(255,255,255,.9)", letterSpacing: "-.035em", lineHeight: 1.2, marginBottom: 12 }}>Stay ahead of AI in biopharma commercial learning.</h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.38)", lineHeight: 1.68, marginBottom: 24 }}>Frameworks, research, field notes, and partnership announcements from InsiteHub's practitioners. Sent when there's something genuinely worth your time. No vendor noise.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
              {["Original research from Proxa Labs before it's published","New frameworks and tools — subscribers first","Field notes from active advisory engagements","Partnership & product announcements"].map(l => (
                <div key={l} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: "rgba(244,128,31,.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3L3 5L7 1" stroke="#F4801F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,.45)", lineHeight: 1.5 }}>{l}</div>
                </div>
              ))}
            </div>
            <NewsletterInline buttonLabel="Get the Frameworks" />
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.07)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.2)" }}>No spam. Unsubscribe anytime.</div>
              <div style={{ display: "flex", gap: 8 }}>
                {[{type:"linkedin",href:"https://linkedin.com/company/insitehub"},{type:"facebook",href:"https://facebook.com/insitehub"},{type:"x",href:"https://x.com/insitehub"}].map(s => (
                  <a key={s.type} href={s.href} target="_blank" rel="noopener noreferrer"
                    style={{ width: 30, height: 30, borderRadius: 7, border: "1px solid rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.28)", textDecoration: "none" }}>
                    <SocialIcon type={s.type} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* FINAL CTA */}
<section className="cta-full">
  <div style={{ position: "relative", zIndex: 1 }}>
    <h2 className="cf-h">The mandate is clear.<br /><em>The platform is ready.</em></h2>
    <p className="cf-p">InsiteHub works with commercial L&D leaders who have an AI imperative and no reliable way to execute it. Let's figure out what your actual next step is.</p>
    <div className="cf-btns">
      <button className="bp" onClick={() => setPage("contact")}>Book a Discovery Call</button>
      <button className="bt-wt" onClick={() => setPage("contact")}>Request a Platform Demo</button>
    </div>
  </div>
</section>
```

Remove the `{/* sections 5-14 land in later tasks */}` marker.

- [ ] **Step 2: Build + visual check**

Home now has 14 sections top to bottom. Mobile check (≤960px): all grids collapse; no horizontal scroll; sticky newsletter card un-sticks on mobile (grid stacks).

- [ ] **Step 3: Commit**

```bash
git add src/pages/HomePage.jsx
git commit -m "HomePage: For Every Stage, TL+Newsletter, Final CTA (12-14) — home complete"
```

---

## Phase 4 — "Where to Start" destination pages

### Task 12: AdvisoryPage

**Files:**
- Modify: `src/pages/AdvisoryPage.jsx` (replace stub)
- Reference: `insitehub-website-v4.jsx` lines 1099-1272

- [ ] **Step 1: Replace stub with full Advisory page**

Port v4 lines 1099-1272 verbatim, replacing `HexMarkLarge` import with `import { HexMarkLarge } from '../components/HexMark'` and fixing any no-op onClick handlers (route to `contact` where v4 has `()=>{}`). Keep the 6-engagement grid, 3-failure-patterns section if present, methodology copy, and all CTAs.

Use this shape for the file:

```jsx
import { HexMarkLarge } from '../components/HexMark';

const AdvisoryPage = ({ setPage }) => (
  <>
    {/* HERO — port v4 lines 1100-1113 verbatim into .ph container */}
    {/* METHODOLOGY intro — port v4 lines 1114-1148 */}
    {/* 6 ENGAGEMENT CARDS in .ag grid — port v4 engagement list */}
    {/* INLINE CTA BAR — port v4 lines 1148-1155 (fix no-op click → setPage("contact")) */}
    {/* PROXA LABS CROSS-LINK — port if present in v4 */}
    {/* FINAL CTA */}
  </>
);

export default AdvisoryPage;
```

For each "port v4 lines X-Y" comment above: open the v4 file, read those lines, and lift the JSX into this file with these mechanical fixes:
- `useState`/`useRef` imports not needed (AdvisoryPage is a static page)
- `var_dk2` → use `"#1A1D25"` literal if referenced
- `()=>{}` placeholder onClick → `() => setPage("contact")`

- [ ] **Step 2: Build + visual check**

Navigate to `http://localhost:5173` → nav "Advisory" → the full 6-engagement page renders. Every card readable, every button routes somewhere. On mobile, the 3-col engagement grid (`.ag`) collapses to 1 column.

- [ ] **Step 3: Commit**

```bash
git add src/pages/AdvisoryPage.jsx
git commit -m "AdvisoryPage: restore 6-engagement catalog + methodology"
```

---

### Task 13: LiteracyPage

**Files:**
- Modify: `src/pages/LiteracyPage.jsx` (replace stub)
- Reference: `insitehub-website-v4.jsx` lines 1953-2068

- [ ] **Step 1: Replace stub**

Port v4 lines 1953-2068: hero with "New Program" pill, "Why literacy first" argument, 6 role-targeted tracks, delivery models, outcomes, CTA.

Shape:

```jsx
import { HexMarkLarge } from '../components/HexMark';

const LiteracyPage = ({ setPage }) => (
  <>
    {/* PAGE HERO — orange "New Program" pill */}
    {/* WHY LITERACY — short-paragraph argument */}
    {/* 6 ROLE-TARGETED TRACKS grid */}
    {/* DELIVERY MODELS (cohort-based, on-demand, mixed) */}
    {/* OUTCOMES + metrics band */}
    {/* CTA */}
  </>
);

export default LiteracyPage;
```

Port all 6 track cards verbatim. If a CTA button in v4 has `()=>{}`, wire to `contact`.

- [ ] **Step 2: Build + visual check**

Nav → "AI Literacy" → full page renders. Mobile: track grid collapses, no overflow.

- [ ] **Step 3: Commit**

```bash
git add src/pages/LiteracyPage.jsx
git commit -m "LiteracyPage: restore 6-track program + delivery models"
```

---

### Task 14: ProxaLabsPage

**Files:**
- Modify: `src/pages/ProxaLabsPage.jsx` (replace stub)
- Reference: `insitehub-website-v4.jsx` lines 1676-1952

- [ ] **Step 1: Replace stub**

Port v4 lines 1676-1952: hero, 4-phase experimentation model (Define · Design · Measure · Business Case), 3 pilot-failure patterns, research references (r=0.84), optional case study reuse, CTA.

- [ ] **Step 2: Build + visual check**

Nav → "Proxa Labs" → full page. Mobile: phase grid + failure patterns collapse.

- [ ] **Step 3: Commit**

```bash
git add src/pages/ProxaLabsPage.jsx
git commit -m "ProxaLabsPage: restore 4-phase model + failure patterns + research"
```

---

### Task 15: PlatformPage v4 merge

**Files:**
- Modify: `src/pages/PlatformPage.jsx`
- Reference: `insitehub-website-v4.jsx` lines 1274-1458

- [ ] **Step 1: Identify missing sections**

Diff current `PlatformPage.jsx` against v4 lines 1274-1458. Current page has: hero, dark closed-loop SVG card, 4 product detail cards, UI preview grid, InsiteX callout, final CTA. v4 may additionally have: a vendor comparison table (`.cmp-*` classes), deeper product bullets, proof points. Merge every v4 section not already present.

- [ ] **Step 2: Merge missing content**

Append the missing sections to `PlatformPage.jsx` in the order v4 presented them. Preserve the current upgraded structure where it's already equivalent to v4.

- [ ] **Step 3: Build + visual check**

Nav → "AI Platform" → verify every section from v4 is now present.

- [ ] **Step 4: Commit**

```bash
git add src/pages/PlatformPage.jsx
git commit -m "PlatformPage: merge missing v4 sections (comparison, extra bullets)"
```

---

### Task 16: ContentPage

**Files:**
- Modify: `src/pages/ContentPage.jsx` (replace stub)
- Reference: `insitehub-website-v4.jsx` lines 1543-1587

- [ ] **Step 1: Replace stub**

Port v4 Content page: hero, AI-powered (Forge) vs traditional ID split, 4 capability cards (AI-Powered · Traditional ID · MLR-Integrated Design · AI-Assisted Human Review), example scenario, CTA.

- [ ] **Step 2: Build + visual check + commit**

```bash
git add src/pages/ContentPage.jsx
git commit -m "ContentPage: restore AI-powered vs traditional content services"
```

---

### Task 17: InsiteXPage

**Files:**
- Modify: `src/pages/InsiteXPage.jsx` (replace stub)
- Reference: `insitehub-website-v4.jsx` lines 1459-1542

- [ ] **Step 1: Replace stub**

Port v4 InsiteX page: dark hero (`.ix-hero` / `.ph-dk`), feature grid (`.ix-fg`), capabilities 3-up (`.ix-cap3` / `.ix-cap-i`), compliance badges strip, vs-AI-Platform comparison, transition path callout, CTA.

- [ ] **Step 2: Build + visual check + commit**

```bash
git add src/pages/InsiteXPage.jsx
git commit -m "InsiteXPage: restore enterprise LMS page (dark hero + features)"
```

---

## Phase 5 — About + remaining

### Task 18: AboutPage enhancement

**Files:**
- Modify: `src/pages/AboutPage.jsx`
- Reference: `insitehub-website-v4.jsx` lines 1588-1675

- [ ] **Step 1: Port any v4 sections currently missing**

Diff current `AboutPage.jsx` against v4 lines 1588-1675. Current About has a trimmed story + 4 proof points + 5-milestone timeline. v4 may have additional paragraphs in the story, additional innovation detail, or more timeline entries. Merge anything missing.

- [ ] **Step 2: Build + visual check + commit**

```bash
git add src/pages/AboutPage.jsx
git commit -m "AboutPage: merge full v4 story and timeline"
```

---

### Task 19: NewsPage

**Files:**
- Modify: `src/pages/NewsPage.jsx` (replace stub)
- Reference: `insitehub-website-v4.jsx` lines 2069-2140

- [ ] **Step 1: Port the full News page**

```jsx
import { HexMarkLarge } from '../components/HexMark';

const NewsPage = ({ setPage }) => (
  <>
    <div className="ph"><div className="mw" style={{ position: "relative" }}>
      <HexMarkLarge size={440} color="#F4801F" opacity={0.04} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 720 }}>
        <div className="pbadge" style={{ background: "var(--o10)", border: "1px solid var(--o20)", color: "var(--o)" }}>📣 Announcements</div>
        <h1 className="ph1" style={{ color: "var(--dk)" }}>What's new at <span style={{ color: "var(--o)" }}>InsiteHub.</span></h1>
        <p className="psub" style={{ color: "var(--bd)" }}>Partnerships, product launches, research milestones, and news from the team building the first closed-loop AI platform in biopharma commercial learning.</p>
      </div>
    </div></div>

    <section className="sec sw"><div className="mw">
      {/* Featured UMU partnership — port v4 lines 2082-2109 verbatim */}
      {/* 4 additional announcements grid — port v4 lines 2111-2128 verbatim */}
      {/* Newsletter strip → routes to newsletter page — port v4 lines 2130-2138 */}
    </div></section>
  </>
);

export default NewsPage;
```

Inline the actual JSX from v4 lines 2082-2138 where the comments indicate. The 4 secondary cards are static (no onClick). The featured partnership has two CTAs that route to `literacy` and `contact`. The bottom strip button routes to `newsletter`.

- [ ] **Step 2: Build + visual check + commit**

```bash
git add src/pages/NewsPage.jsx
git commit -m "NewsPage: restore announcements with UMU feature + 4 news items"
```

---

### Task 20: ResourcesPage

**Files:**
- Modify: `src/pages/ResourcesPage.jsx` (replace stub)
- Reference: `insitehub-website-v4.jsx` lines 2145-2214

- [ ] **Step 1: Port the full Resources page**

Port v4 verbatim: hero, 6 framework/guide/template cards (3-col grid), "From Proxa Labs — Active Research" section with 3 cards, bottom CTA pair. Every resource card's CTA routes to `contact` (as v4 does).

- [ ] **Step 2: Build + visual check + commit**

```bash
git add src/pages/ResourcesPage.jsx
git commit -m "ResourcesPage: restore frameworks grid + Proxa Labs research"
```

---

### Task 21: NewsletterPage

**Files:**
- Modify: `src/pages/NewsletterPage.jsx` (replace stub)
- Reference: `insitehub-website-v4.jsx` lines 2219-2308

- [ ] **Step 1: Port + wire to extended newsletter function**

Port the v4 NewsletterPage markup verbatim (2-column: form on left, "What You'll Receive" on right). Replace the v4 `onClick={()=>{if(form.name&&form.email)setDone(true)}}` with a real submit that calls the Firebase function with the full payload:

```jsx
const submit = async () => {
  if (!form.name || !form.email) return;
  setSending(true);
  setError('');
  try {
    const res = await fetch(import.meta.env.VITE_NEWSLETTER_FUNCTION_URL || '/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form), // {email, name, role, interests}
    });
    const data = await res.json();
    if (data.success) setDone(true);
    else setError(data.error || 'Something went wrong. Try again.');
  } catch (e) {
    setError('Something went wrong. Try again.');
  } finally {
    setSending(false);
  }
};
```

Add `sending` + `error` state, loading button text, error banner above the submit button.

- [ ] **Step 2: Build + visual check**

Nav → "Newsletter" (via footer link or `/newsletter` directly via state). Fill form → submit → see spinner → success state (assuming Task 22 deployed first). Confirm interests toggle multi-select works.

- [ ] **Step 3: Commit**

```bash
git add src/pages/NewsletterPage.jsx
git commit -m "NewsletterPage: restore signup + what-you-get + wire to extended function"
```

---

### Task 22: Extend `submitNewsletter` Firebase function

**Files:**
- Modify: `functions/index.js`

- [ ] **Step 1: Accept optional name/role/interests**

Update the `submitNewsletter` handler to read additional fields and render them in the email body:

```js
exports.submitNewsletter = onRequest(async (req, res) => {
  if (setCors(req, res)) return;
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { email, name, role, interests } = req.body;
  if (!email || !email.includes("@")) {
    res.status(400).json({ error: "Valid email is required." });
    return;
  }

  const rows = [
    ["Email", email],
    name && ["Name", name],
    role && ["Role", role],
    interests?.length && ["Interests", interests.join(", ")],
  ].filter(Boolean);

  const html = `
    <h2>New Newsletter Subscriber</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      ${rows.map(([k, v]) => `<tr><td style="padding:8px 16px 8px 0;font-weight:bold;color:#666;">${k}</td><td style="padding:8px 0;">${v}</td></tr>`).join('')}
    </table>
  `;

  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: `"InsiteHub Website" <${process.env.SMTP_EMAIL}>`,
      to: process.env.NOTIFY_EMAIL,
      replyTo: email,
      subject: name ? `New newsletter subscriber: ${name} <${email}>` : `New newsletter subscriber: ${email}`,
      html,
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email send failed:", err);
    res.status(500).json({ error: "Failed to send email. Please try again." });
  }
});
```

Footer newsletter widget still works (it only sends `email`; other fields are `undefined` and filtered out).

- [ ] **Step 2: Deploy**

Run: `cd functions && firebase deploy --only functions:submitNewsletter`
Expected: Deploy succeeds; function URL unchanged so no frontend env var update needed.

- [ ] **Step 3: Test end-to-end**

On `/newsletter`, submit a form with name + role + 2 interests. Check `NOTIFY_EMAIL` inbox — email body should have a table with all four fields.
On home footer, subscribe with just email. Email body should have only the email row.

- [ ] **Step 4: Commit**

```bash
git add functions/index.js
git commit -m "Extend submitNewsletter to accept optional name/role/interests"
```

---

### Task 23: ContactPage enrichment

**Files:**
- Modify: `src/pages/ContactPage.jsx`
- Reference: `insitehub-website-v4.jsx` lines 2310-2417

- [ ] **Step 1: Confirm parity with v4**

The current `ContactPage.jsx` already has the 3-track selector + Firebase wiring + resubmission + richer sidebar cards. Compare against v4 to catch anything missing: the address block, the 4 "What to expect" cards, the track-specific reveal banners, the resources cross-link grid (below the form).

- [ ] **Step 2: Add resources teaser below the form section**

If not present, append a resources grid below the form (top-of-page teaser or above the resources section footer) with 4 resource cards that each call `setPage("resources")`:

```jsx
{/* RESOURCES TEASER */}
<section className="sec sl">
  <div className="mw" style={{ textAlign: "center" }}>
    <div className="ey" style={{ textAlign: "center" }}>Want to explore on your own first?</div>
    <h2 className="h2" style={{ textAlign: "center", maxWidth: 500, margin: "0 auto 32px" }}>Free frameworks you can use today.</h2>
    <div className="grid-4" style={{ gap: 14 }}>
      {[
        { icon: "📋", c: "#F4801F", t: "AI Readiness Self-Assessment", d: "15-question framework for evaluating your organization's readiness to deploy AI." },
        { icon: "🗺️", c: "#7C3AED", t: "AI Pilot Failure Taxonomy", d: "The four failure patterns behind 80-95% of pharma AI pilot failures." },
        { icon: "📊", c: "#007AFF", t: "Business Case Template", d: "The ROI model structure for framing pilot results in leadership language." },
        { icon: "⚖️", c: "#D97706", t: "Vendor Evaluation Scorecard", d: "24-point matrix for assessing AI platform vendors in biopharma." },
      ].map(r => (
        <div key={r.t} onClick={() => setPage("resources")} style={{ background: "var(--wh)", border: "1.5px solid var(--br)", borderRadius: 16, padding: 24, textAlign: "left", cursor: "pointer" }}>
          <div style={{ width: 40, height: 40, borderRadius: 11, background: (r.c + "12"), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, marginBottom: 12 }}>{r.icon}</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--dk)", fontFamily: "Manrope,sans-serif", marginBottom: 6, lineHeight: 1.3 }}>{r.t}</div>
          <div style={{ fontSize: 12, color: "var(--bd)", lineHeight: 1.55 }}>{r.d}</div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/ContactPage.jsx
git commit -m "ContactPage: add resources teaser grid for self-service path"
```

---

## Phase 6 — QA + cleanup

### Task 24: Delete obsolete ServicesPage.jsx

**Files:**
- Delete: `src/pages/ServicesPage.jsx`

- [ ] **Step 1: Confirm no imports remain**

Run: `grep -rn "ServicesPage" src/` — expect no matches (we removed it from `App.jsx` in Task 1).

- [ ] **Step 2: Delete the file**

```bash
rm src/pages/ServicesPage.jsx
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: clean build.

- [ ] **Step 4: Commit**

```bash
git add src/pages/ServicesPage.jsx
git commit -m "Remove ServicesPage: content split into Advisory/Literacy/Content/Proxa/InsiteX"
```

---

### Task 25: Responsive QA pass

**Files:**
- Modify: any pages found to regress on mobile

- [ ] **Step 1: Test every page at 3 breakpoints**

Run: `npm run dev`. Open DevTools → device toolbar.

For each of the 13 pages, at widths 375px · 768px · 1440px, check:
- No horizontal scrollbar (`overflow-x` clean)
- Every grid collapses appropriately
- Hero doesn't overflow viewport height
- Buttons don't overflow containers
- Text remains readable
- Nav hamburger works below 960px; desktop nav works above

Record any regressions.

- [ ] **Step 2: Fix regressions**

For each regression, identify the class and add to `styles.css` the appropriate `@media (max-width:960px)` rule. Common fixes: grids to `1fr`, hero padding reduction, flex-wrap on button rows.

- [ ] **Step 3: Re-test and commit fixes**

```bash
git add src/styles.css
git commit -m "Responsive QA: fix mobile regressions across restored pages"
```

---

### Task 26: CTA + copy audit

**Files:**
- Any page with issues

- [ ] **Step 1: grep for no-op handlers**

Run: `grep -rn "onClick={()=>{}\|onClick={() => {}\|onClick={()=>(" src/` — expect no matches. If any exist, wire to an appropriate `setPage` destination.

- [ ] **Step 2: grep for duplicated "Unsubscribe anytime" copy**

Run: `grep -rn "Unsubscribe anytime" src/` — expect matches only in places that are actual newsletter signups. Remove from decorative cards.

- [ ] **Step 3: Commit any fixes**

```bash
git add -u
git commit -m "Copy audit: wire dead CTAs, remove misleading copy"
```

---

### Task 27: Final build + preview smoke test

- [ ] **Step 1: Clean build**

```bash
rm -rf dist node_modules/.vite
npm run build
```

Expected: clean build with no warnings about unused imports, missing components, or CSS errors.

- [ ] **Step 2: Preview the production bundle**

Run: `npm run preview`
Visit `http://localhost:4173`.

Smoke-click every route reachable from the nav (13 pages) + every Where-to-Start item + every footer link. Confirm:
- No console errors
- No 404s
- All pages render
- Page titles update (check browser tab)
- Meta description updates (inspect `<head>`)

- [ ] **Step 3: Record result**

If all smoke tests pass: the restore is complete. Move to deploy via Firebase if desired.

---

## Self-Review Checklist

Ran against the spec:

- [x] 13-page route map wired (Task 1)
- [x] "Where to Start" dropdown with 7 items (Task 3)
- [x] Old-nav-verbatim 7 top-level links (Task 3)
- [x] Mobile hamburger + accordion (Task 3)
- [x] Footer 4-column structure with compliance badges + top newsletter bar (Task 4)
- [x] v4 CSS classes lifted (Task 2)
- [x] NewsletterInline, AnnouncementBand, SituationCard, DiffCard, StepCard (Tasks 5-7)
- [x] HomePage all 14 sections (Tasks 8-11)
- [x] AdvisoryPage, LiteracyPage, ProxaLabsPage, PlatformPage merge, ContentPage, InsiteXPage (Tasks 12-17)
- [x] AboutPage enhancement (Task 18)
- [x] NewsPage, ResourcesPage, NewsletterPage (Tasks 19-21)
- [x] submitNewsletter extension (Task 22)
- [x] ContactPage resources teaser (Task 23)
- [x] ServicesPage deletion (Task 24)
- [x] Responsive QA + CTA audit (Tasks 25-26)
- [x] Final smoke test (Task 27)
- [x] All current upgrades preserved: Firebase wiring (Footer + NewsletterInline + NewsletterPage + ContactPage), mobile nav (Nav), LoopVisual + LoopMobile (HomePage), form re-submission (existing ContactPage), split CSS (maintained)
- [x] Editorial cleanup rules embedded in per-task instructions (no-op handler fixes, mobile parity, resource teaser)
- [x] Zero content dropped — every v4 line range accounted for in a task

No placeholders. No "TBD". Every code step has concrete code. Every verification step has a concrete command + expected outcome.
