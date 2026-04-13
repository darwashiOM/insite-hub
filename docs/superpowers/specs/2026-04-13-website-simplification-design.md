# InsiteHub Website Simplification — Design Spec

**Date:** 2026-04-13
**Goal:** Simplify the website from 12 pages to 5 pages so visitors understand what InsiteHub does without feeling overwhelmed, and are funneled toward booking a discovery call.
**Constraint:** Preserve the closed-loop animation on the home page.

---

## Context

InsiteHub offers AI-powered commercial learning for biopharma: an AI platform (Forge, Atlas, Echo, Certify), advisory services, AI literacy training, content development, an experimentation lab (Proxa Labs), and an enterprise LMS (InsiteX). The current site has 12 pages with dense, long-form text. Visitors are a mix of cold researchers and warm referrals — both senior biopharma L&D leaders.

The primary conversion goal is **booking a discovery call**.

---

## Site Structure: 5 Pages

### 1. Home (`home`)

**Job:** "Here's what we do and why it matters — in 10 seconds."

**Sections (in order):**
1. **Hero** — Keep the current hero layout with the closed-loop animation (LoopVisual). Shorten the headline. Remove the second pill badge (AI Literacy announcement). Simplify the subtitle to 1-2 sentences max. Two CTAs: "Book a Discovery Call" (primary) + "See the Platform" (secondary).
2. **Social proof logos** — Keep the logo band. Remove the "Trusted by" list from the hero (redundant with the band).
3. **Three capability cards** — Replace the current dense sections with 3 clean cards:
   - "AI Platform" — one sentence + link to Platform page
   - "Advisory & Services" — one sentence + link to Services page
   - "Proxa Labs" — one sentence + link to Services page
   These replace: the 4 product cards section, the "InsiteHub Difference" section, the "Who This Is For" section, and the "For Every Stage" section.
4. **Stats band** — Keep the 4 stats (80-95%, 11 mo, 84%, 25 yrs). These are punchy and effective.
5. **Testimonial** — Keep the Sarah Chen testimonial but shorten it. Remove the 4-phase case study timeline above it — the quote and the 4 stat boxes beside it are enough.
6. **CTA** — "Book a Discovery Call" full-width CTA banner.

**What gets removed from Home:**
- Announcements strip (3 cards)
- Thought leadership strip (4 framework cards)
- AI Literacy announcement band
- "The InsiteHub Difference" section (4 diff cards) — the positioning is conveyed through the hero and About page
- "AI Products" section (4 product cards) — moved to Platform page
- Inline CTA bar ("Talk to someone who's been in your seat")
- "Who InsiteHub Is For" section (6 persona cards) — too much text, the hero should convey this
- "For Every Stage" section (InsiteX, Content, Literacy cards + path steps)
- Thought Leadership + Newsletter section (dual column)
- The 4-phase case study timeline (keep the quote only)

### 2. Platform (`platform`)

**Job:** "Here's how the closed-loop AI platform works."

**Sections (in order):**
1. **Page hero** — Badge, headline, 1-2 sentence subtitle, "Book a Demo" + "Start with Advisory" CTAs.
2. **Loop diagram** — The dark-background SVG loop diagram showing Build > Develop > Assess > Certify. Keep as-is — it's clear and well-designed.
3. **4 product cards** — Forge, Atlas, Echo, Certify. Use the current detailed cards from the Platform page but cut each description by ~40%. Keep bullet points to 3 per product (not 5).
4. **Platform previews** — Keep the 4 mock UI cards. They look polished and make the product feel real.
5. **InsiteX mention** — A single callout card: "Not ready for AI? InsiteX is our enterprise LMS — built for biopharma compliance. It's the foundation the AI platform builds on." + "Learn more" link that scrolls to the Services page InsiteX section, or a brief modal. No separate page.
6. **CTA** — "Book a Demo" full-width CTA.

**What gets removed from Platform:**
- "Before You Deploy" / AI Literacy prereq section — this moves to Services
- Duplicate CTA sections (currently 3 CTA blocks on this page)

### 3. Services (`services`)

**Job:** "Here's how we help beyond the platform — wherever you are in your journey."

This page consolidates Advisory, AI Literacy, Content Development, and Proxa Labs into one page with clear sections separated by visual breaks.

**Sections (in order):**
1. **Page hero** — "We meet you where you are." Simple headline, subtitle explaining InsiteHub has multiple entry points.
2. **Advisory section** — The most important service. Keep: headline, 1 paragraph explaining the approach, the 6 engagement type cards (but shorten each description to 1-2 sentences). Remove: the "Four Failure Patterns" sidebar, the "Why InsiteHub" proof section (that's for the About page), the "How We Engage" 3-step section (too much detail for a first visit).
3. **AI Literacy section** — Headline, 1 paragraph on why literacy matters, the 6 module cards (keep icons and titles, shorten descriptions to 1 sentence each). Remove: the "Why AI Literacy First" concern cards, the "How It's Delivered" section.
4. **Content Development section** — Headline, 1 paragraph, the 4 track cards (AI-Powered, Traditional, MLR-Integrated, AI-Assisted). Remove: therapy area tags section.
5. **Proxa Labs section** — Headline, 1 paragraph explaining the experimentation model, the 4 phase cards (simplified — title + 1 sentence each, not the current full-page treatment). Remove: "Why Experimentation Fails" section, "Active Research" section, credential cards.
6. **InsiteX LMS mention** — Brief card for organizations not ready for AI. Title, 2 sentences, "Talk to us" CTA.
7. **CTA** — "Not sure where to start? Book a 30-minute call." Full-width CTA.

### 4. About (`about`)

**Job:** "Here's why we're credible."

**Sections (in order):**
1. **Page hero** — Current headline is good. Keep it short.
2. **Story** — Keep the 3 paragraphs but edit each down to 2-3 sentences. Remove the 2 sidebar highlight cards (Vanguard Award, Bell Labs) — integrate those facts into the story text.
3. **Innovation proof points** — Keep the 4-stat grid (1st virtual world, 100% gamified training, 2nd NIH accelerator, Only closed-loop platform). These are powerful and scannable.
4. **Timeline** — Keep the 5 milestones but shorten each description to 1 sentence.
5. **CTA** — "Start a Conversation" full-width CTA.

**What gets removed from About:**
- The separate highlight cards (redundant with the story)
- Verbose timeline descriptions

### 5. Contact (`contact`)

**Job:** "Let's talk."

**Sections (in order):**
1. **Page hero** — Keep the current "Where are you in the journey?" headline and the 3-track selector (Ready to talk / Want to learn first / Just exploring). This is well-designed.
2. **Form + sidebar** — Keep the conditional form and the "What to expect" sidebar. This works well.
3. **Resources mention** — Below the form, add a small section: "Want to explore on your own first?" with 3-4 downloadable resource links (AI Readiness Framework, Pilot Failure Taxonomy, Business Case Template, Vendor Scorecard). This absorbs the Resources page.

**What gets removed:**
- Nothing significant — this page is already focused.

---

## Navigation

**Before (10 items):** Where to Start (dropdown) | AI Platform | AI Literacy | InsiteX LMS | Advisory | Content | Proxa Labs | About | Contact | Book a Demo

**After (5 items):** Platform | Services | About | Contact | **Book a Demo** (primary CTA button)

- "Where to Start" dropdown is removed — the home page capability cards serve this purpose
- "Book a Demo" remains the prominent orange button on the right

---

## Footer

**Simplify the footer columns:**
- Column 1: InsiteHub logo, 1-sentence description, social icons
- Column 2: Platform | Services | About | Contact (mirrors nav)
- Column 3: Newsletter signup (email input + button)
- Bottom bar: Copyright + badges (SOC 2, NIH Partner, etc.)

Remove the current 4-column link list with 18+ individual links.

---

## Content Editing Principles

Apply these rules across every page:

1. **One idea per paragraph.** If a paragraph makes two points, split or cut.
2. **No paragraph longer than 3 lines on desktop.** If it's longer, it needs editing.
3. **Cut every sentence that says "we're different" without proving it.** Show, don't tell.
4. **Remove duplicate CTAs.** Max 2 CTA blocks per page (one mid-page, one at bottom).
5. **Remove all "not ready" hedging sections.** The services page handles the "where to start" question. Individual pages don't need to re-explain it.
6. **Titles do the work.** If someone only reads the headings and CTAs, they should understand the page.

---

## Pages Removed

| Old Page | Where it goes |
|----------|--------------|
| InsiteX LMS | Brief mention on Platform page + Services page |
| Advisory | Section on Services page |
| AI Literacy | Section on Services page |
| Content | Section on Services page |
| Proxa Labs | Section on Services page |
| News | Removed entirely (use social media / newsletter for announcements) |
| Resources | Absorbed into Contact page as downloadable links |
| Newsletter | Footer signup + Contact page |

---

## Components Affected

### Keep as-is:
- `HexMark.jsx` / `HexMarkLarge.jsx`
- `LoopVisual.jsx`
- `SocialIcon.jsx`
- `useReveal.js`

### Modify:
- `Nav.jsx` — reduce to 5 items
- `Footer.jsx` — simplify to 3 columns
- `HomePage.jsx` — major content reduction
- `PlatformPage.jsx` — trim text, add InsiteX mention
- `AboutPage.jsx` — trim text
- `ContactPage.jsx` — add resources section at bottom

### Create new:
- `ServicesPage.jsx` — consolidates Advisory, Literacy, Content, Proxa Labs

### Delete:
- `AdvisoryPage.jsx`
- `LiteracyPage.jsx`
- `ContentPage.jsx`
- `ProxaLabsPage.jsx`
- `InsiteXPage.jsx`
- `NewsPage.jsx`
- `ResourcesPage.jsx`
- `NewsletterPage.jsx`
- `NewsletterInline.jsx` (footer handles this now)

### Update:
- `App.jsx` — update routes, remove deleted page imports, update PAGE_TITLES and meta descriptions
- `styles.css` — remove unused CSS classes for deleted sections
