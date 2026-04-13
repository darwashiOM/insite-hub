# Website Simplification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce the InsiteHub website from 12 pages to 5, simplify the nav, cut content density, and funnel every page toward booking a discovery call.

**Architecture:** State-based client-side routing in App.jsx maps page keys to components. We'll delete 8 page files, create 1 new ServicesPage, rewrite 4 existing pages with reduced content, simplify Nav and Footer, and update App.jsx routing. No new dependencies needed.

**Tech Stack:** React (Vite), CSS (styles.css), no router library — uses useState for page switching.

---

## File Map

### Delete:
- `src/pages/AdvisoryPage.jsx` — absorbed into ServicesPage
- `src/pages/LiteracyPage.jsx` — absorbed into ServicesPage
- `src/pages/ContentPage.jsx` — absorbed into ServicesPage
- `src/pages/ProxaLabsPage.jsx` — absorbed into ServicesPage
- `src/pages/InsiteXPage.jsx` — absorbed into ServicesPage + Platform mention
- `src/pages/NewsPage.jsx` — removed entirely
- `src/pages/ResourcesPage.jsx` — absorbed into ContactPage
- `src/pages/NewsletterPage.jsx` — footer handles newsletter signup
- `src/components/NewsletterInline.jsx` — footer handles newsletter signup

### Create:
- `src/pages/ServicesPage.jsx` — new consolidated services page

### Modify:
- `src/components/Nav.jsx` — reduce from 10 items to 5
- `src/components/Footer.jsx` — simplify to 3 columns
- `src/pages/HomePage.jsx` — major content reduction (460 → ~150 lines)
- `src/pages/PlatformPage.jsx` — trim text, add InsiteX mention
- `src/pages/AboutPage.jsx` — trim text
- `src/pages/ContactPage.jsx` — add resources section at bottom
- `src/App.jsx` — update routes, imports, titles, meta descriptions

### Keep unchanged:
- `src/components/HexMark.jsx`
- `src/components/LoopVisual.jsx`
- `src/components/SocialIcon.jsx`
- `src/hooks/useReveal.js`
- `src/styles.css`

---

### Task 1: Simplify Nav.jsx

**Files:**
- Modify: `src/components/Nav.jsx`

- [ ] **Step 1: Rewrite Nav.jsx with 5 items**

Replace the entire contents of `src/components/Nav.jsx` with:

```jsx
import { useState } from 'react';
import { HexMark } from './HexMark';

const Nav = ({ page, setPage, scrolled }) => {
  return (
    <nav className={"nav"+(scrolled?" up":"")}>
      <div className="nav-logo" onClick={()=>setPage("home")}>
        <HexMark size={38} color="#F4801F" strokeWidth={1.7}/>
        <span className="nav-wm">Insite<b>HUB</b></span>
      </div>
      <div className="nav-links">
        {[["Platform","platform"],["Services","services"],["About","about"],["Contact","contact"]].map(([l,p])=>(
          <button key={p} className={"nl"+(page===p?" on":"")} onClick={()=>setPage(p)}>{l}</button>
        ))}
      </div>
      <div className="nav-right">
        <button className="no" onClick={()=>setPage("contact")}>Book a Demo</button>
      </div>
    </nav>
  );
};

export default Nav;
```

Changes from original:
- Removed `useState` import (no dropdown state needed)
- Removed the entire "Where to Start" dropdown and `dropItems` array
- Reduced nav links from 7 buttons to 4: Platform, Services, About, Contact
- Removed the separate "Contact" ghost button (`ng` class) — "Contact" is now a nav link
- Kept "Book a Demo" as the primary orange CTA button

- [ ] **Step 2: Verify build passes**

Run: `npm run build 2>&1 | tail -5`

Expected: Build succeeds (warnings about unused imports from deleted pages are OK at this stage — we fix App.jsx in Task 7).

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.jsx
git commit -m "Simplify nav to 5 items: Platform, Services, About, Contact, Book a Demo"
```

---

### Task 2: Simplify Footer.jsx

**Files:**
- Modify: `src/components/Footer.jsx`

- [ ] **Step 1: Rewrite Footer.jsx with 3 columns**

Replace the entire contents of `src/components/Footer.jsx` with:

```jsx
import { useState } from 'react';
import { HexMark } from './HexMark';
import SocialIcon from './SocialIcon';

const var_dk2 = "#1A1D25";

const Footer = ({ setPage }) => {
  const [email,setEmail]=useState('');
  const [subbed,setSubbed]=useState(false);
  return(
  <footer style={{background:var_dk2,borderTop:"1px solid rgba(255,255,255,.06)"}}>
    <div style={{padding:"48px 56px 32px"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1.5fr",gap:56,marginBottom:48}}>
          {/* Column 1: Brand */}
          <div>
            <div style={{display:"flex",alignItems:"center",gap:12,cursor:"pointer",marginBottom:16}} onClick={()=>setPage("home")}>
              <HexMark size={34} color="#F4801F" strokeWidth={1.6}/>
              <span style={{fontFamily:"Manrope,sans-serif",fontSize:18,fontWeight:800,letterSpacing:"-.04em",color:"rgba(255,255,255,.75)"}}>Insite<span style={{color:"#F4801F"}}>HUB</span></span>
            </div>
            <p style={{fontSize:14,color:"rgba(255,255,255,.3)",lineHeight:1.72,maxWidth:280,marginBottom:20}}>The AI implementation partner built for biopharma commercial learning — methodology-first, compliance by design.</p>
            <div style={{display:"flex",gap:10}}>
              {[
                {type:"linkedin",href:"https://linkedin.com/company/insitehub",label:"LinkedIn"},
                {type:"facebook",href:"https://facebook.com/insitehub",label:"Facebook"},
                {type:"x",href:"https://x.com/insitehub",label:"X"},
              ].map(s=>(
                <a key={s.type} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  style={{width:36,height:36,borderRadius:9,border:"1px solid rgba(255,255,255,.1)",background:"rgba(255,255,255,.04)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,.35)",transition:"all .2s",textDecoration:"none"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(244,128,31,.4)";e.currentTarget.style.color="#F4801F";e.currentTarget.style.background="rgba(244,128,31,.06)";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.1)";e.currentTarget.style.color="rgba(255,255,255,.35)";e.currentTarget.style.background="rgba(255,255,255,.04)";}}>
                  <SocialIcon type={s.type}/>
                </a>
              ))}
            </div>
          </div>
          {/* Column 2: Links */}
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:".09em",textTransform:"uppercase",color:"rgba(255,255,255,.28)",marginBottom:16}}>Navigation</div>
            {[["Platform","platform"],["Services","services"],["About","about"],["Contact","contact"],["Book a Demo","contact"]].map(([l,p])=>(
              <div key={l} style={{fontSize:13.5,color:"rgba(255,255,255,.25)",marginBottom:11,cursor:"pointer",transition:"color .15s"}} onClick={()=>setPage(p)} onMouseEnter={e=>e.target.style.color="rgba(255,255,255,.7)"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.25)"}>{l}</div>
            ))}
          </div>
          {/* Column 3: Newsletter */}
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:".09em",textTransform:"uppercase",color:"rgba(255,255,255,.28)",marginBottom:16}}>Stay in the loop</div>
            <p style={{fontSize:13,color:"rgba(255,255,255,.3)",lineHeight:1.6,marginBottom:16}}>Frameworks, research, and field notes from InsiteHub's practitioners. No vendor noise.</p>
            {subbed?(
              <div style={{fontSize:13,color:"#34D399",fontWeight:600}}>✓ You're in. We'll be in touch.</div>
            ):(
              <div className="fn-wrap">
                <input className="fn-in" placeholder="your@company.com" value={email} onChange={e=>setEmail(e.target.value)}/>
                <button className="fn-btn" onClick={()=>{if(email)setSubbed(true)}}>Subscribe</button>
              </div>
            )}
          </div>
        </div>
        {/* Bottom bar */}
        <div style={{borderTop:"1px solid rgba(255,255,255,.06)",paddingTop:26,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:14}}>
          <div style={{fontSize:12,color:"rgba(255,255,255,.16)"}}>© 2026 InsiteHub, Inc. · Newark, DE · InsiteHub, Inc. is a Delaware S-Corp</div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {["SOC 2 Type II","NIH Partner","Biopharma Native","University of Delaware Partner"].map(t=><div key={t} style={{fontSize:11,fontWeight:600,padding:"4px 12px",borderRadius:20,border:"1px solid rgba(255,255,255,.08)",color:"rgba(255,255,255,.2)"}}>{t}</div>)}
          </div>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
```

Changes from original:
- Removed the top newsletter bar (was a separate section) — newsletter is now in column 3
- Changed from 4-column grid (brand + 3 link columns with 18+ links) to 3-column grid (brand, links, newsletter)
- Footer links mirror the simplified nav: Platform, Services, About, Contact, Book a Demo
- Removed the 3 quick-action buttons (Start with Advisory, See the Platform, Explore Proxa Labs)

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.jsx
git commit -m "Simplify footer to 3 columns: brand, nav links, newsletter signup"
```

---

### Task 3: Rewrite HomePage.jsx

**Files:**
- Modify: `src/pages/HomePage.jsx`

- [ ] **Step 1: Rewrite HomePage.jsx with reduced content**

Replace the entire contents of `src/pages/HomePage.jsx` with:

```jsx
import useReveal from '../hooks/useReveal';
import LoopVisual from '../components/LoopVisual';

const HomePage = ({ setPage }) => {
  useReveal();
  return (
  <>
    {/* HERO */}
    <section className="hero">
      <div className="hero-inner">
        <div style={{position:"relative",zIndex:1}}>
          <div className="hero-pill"><div className="hpd"/>AI-First · Purpose-Built for Biopharma</div>
          <h1 className="hero-h1">
            The <em>strategy, literacy,<br/>and platform</em> to turn<br/>your AI mandate into results.
          </h1>
          <p className="hero-p">The only closed-loop AI platform built for biopharma commercial learning — backed by advisory methodology and a 25-year track record.</p>
          <div className="hero-actions">
            <button className="bp" onClick={()=>setPage("contact")}>Book a Discovery Call</button>
            <button className="bs" onClick={()=>setPage("platform")}>See the Platform</button>
          </div>
        </div>
        <div style={{position:"relative"}}><LoopVisual/></div>
      </div>
    </section>

    {/* CLIENT LOGOS */}
    <div className="logo-band">
      <div className="lb-label">Trusted across biopharma and health systems</div>
      <div className="lb-row">
        {["AbbVie","Allergan","Amgen","AstraZeneca","Bayer","Biogen","BMS","Genentech","GSK","Janssen","Merck","Novartis","Novo Nordisk","Pfizer","Roche","Sanofi","Takeda","Teva","Gilead","Mass General","Penn Medicine","MD Anderson"].map(n=><span key={n} className="lb-co">{n}</span>)}
      </div>
    </div>

    {/* STATS */}
    <div className="stats">
      <div className="stats-row">
        {[{n:"80–95%",l:"of pharma AI pilots never scale or deliver measurable value"},{n:"11 mo",l:"average ramp to full rep productivity in biopharma"},{n:"84%",l:"of pharma reps missed quota last year"},{n:"25 yrs",l:"biopharma commercial L&D expertise behind our methodology"}].map(s=>(
          <div className="st" key={s.n}><div className="st-n">{s.n}</div><div className="st-l">{s.l}</div></div>
        ))}
      </div>
    </div>

    {/* THREE CAPABILITY CARDS */}
    <section className="sec sw">
      <div className="mw">
        <div style={{textAlign:"center",marginBottom:48}}>
          <div className="ey" style={{textAlign:"center"}}>What We Do</div>
          <h2 className="h2" style={{textAlign:"center",maxWidth:600,margin:"0 auto"}}>Three ways we help biopharma<br/>commercial teams succeed with AI.</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
          {[
            {icon:"🤖",c:"#F4801F",bg:"rgba(244,128,31,.09)",title:"AI Platform",desc:"Four products — Forge, Atlas, Echo, Certify — in one closed loop. Content created automatically rebuilds when assessment gaps emerge. No human handoff.",page:"platform"},
            {icon:"🧭",c:"#007AFF",bg:"rgba(0,122,255,.09)",title:"Advisory & Services",desc:"AI readiness assessments, governance frameworks, AI literacy training, and content development. We diagnose before we prescribe — and deliver at every stage.",page:"services"},
            {icon:"🔬",c:"#7C3AED",bg:"rgba(124,58,237,.09)",title:"Proxa Labs",desc:"Structured AI experimentation for biopharma. We help you design the right pilot, measure what matters, and build a business case your CCO can act on.",page:"services"},
          ].map(c=>(
            <div key={c.title} onClick={()=>setPage(c.page)} style={{background:"var(--wh)",border:"1.5px solid var(--br)",borderRadius:20,padding:32,cursor:"pointer",transition:"all .25s",borderTop:("3px solid "+c.c)}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow="0 20px 48px rgba(0,0,0,.08)";}} onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>
              <div style={{width:50,height:50,borderRadius:14,background:c.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,marginBottom:18}}>{c.icon}</div>
              <div style={{fontSize:20,fontWeight:800,color:"var(--dk)",fontFamily:"Manrope,sans-serif",letterSpacing:"-.03em",marginBottom:10}}>{c.title}</div>
              <div style={{fontSize:14,color:"var(--bd)",lineHeight:1.68,marginBottom:18}}>{c.desc}</div>
              <div style={{fontSize:13,color:c.c,fontWeight:600}}>Learn more →</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* TESTIMONIAL */}
    <section className="sec sl">
      <div className="mw">
        <div style={{background:"linear-gradient(135deg,#FFFAF6,#FFF4E8)",border:"1.5px solid rgba(244,128,31,.2)",borderRadius:20,padding:"40px 48px",display:"grid",gridTemplateColumns:"1fr auto",gap:48,alignItems:"center"}}>
          <div>
            <div style={{fontSize:28,color:"var(--o)",fontWeight:800,lineHeight:1,marginBottom:20,opacity:.3}}>"</div>
            <p style={{fontSize:18,color:"var(--dk)",lineHeight:1.72,fontStyle:"italic",fontWeight:400,marginBottom:24}}>What Proxa Labs did differently was refuse to let us skip the hard part — defining what success actually looked like before we built anything. That single decision changed everything. We walked into our budget review with evidence, not a pitch deck.</p>
            <div style={{display:"flex",alignItems:"center",gap:16}}>
              <div style={{width:48,height:48,borderRadius:"50%",background:"linear-gradient(135deg,#F4801F,#7C3AED)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,color:"#fff",fontWeight:700,fontFamily:"Manrope,sans-serif",flexShrink:0}}>SC</div>
              <div>
                <div style={{fontSize:15,fontWeight:700,color:"var(--dk)",fontFamily:"Manrope,sans-serif"}}>Sarah Chen</div>
                <div style={{fontSize:13,color:"var(--bd)"}}>VP, Commercial Learning &amp; Development</div>
              </div>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:14,minWidth:180}}>
            {[{n:"23%",l:"call quality improvement"},{n:"0",l:"MLR compliance flags"},{n:"3 wks",l:"pilot to CCO approval"}].map(s=>(
              <div key={s.n} style={{textAlign:"center",padding:"14px 20px",background:"rgba(255,255,255,.8)",borderRadius:12,border:"1px solid rgba(244,128,31,.15)"}}>
                <div style={{fontSize:24,fontWeight:900,color:"var(--o)",fontFamily:"Manrope,sans-serif",letterSpacing:"-.03em",lineHeight:1,marginBottom:4}}>{s.n}</div>
                <div style={{fontSize:11,color:"var(--bd)",lineHeight:1.4}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* FINAL CTA */}
    <section className="cta-full">
      <div style={{position:"relative",zIndex:1}}>
        <h2 className="cf-h">The mandate is clear.<br/><em>The platform is ready.</em></h2>
        <p className="cf-p">30 minutes. No demo, no pitch. Just your environment and what your actual next step is.</p>
        <div className="cf-btns">
          <button className="bp" onClick={()=>setPage("contact")}>Book a Discovery Call</button>
          <button className="bt-wt" onClick={()=>setPage("platform")}>See the Platform →</button>
        </div>
      </div>
    </section>
  </>
  );
};

export default HomePage;
```

This reduces HomePage from 460 lines to ~120 lines. Removed sections:
- Announcements strip, thought leadership strip, AI Literacy announcement band
- "InsiteHub Difference" 4 diff cards, "AI Products" 4 product cards
- Inline CTA bar, "Who InsiteHub Is For" 6 persona cards
- "For Every Stage" section, Thought Leadership + Newsletter dual column
- 4-phase case study timeline (kept the quote only, shortened)
- "Trusted by" inline hero list (logo band covers this)
- Second pill badge, research reference line

- [ ] **Step 2: Commit**

```bash
git add src/pages/HomePage.jsx
git commit -m "Simplify HomePage: hero, logos, stats, 3 cards, testimonial, CTA"
```

---

### Task 4: Trim PlatformPage.jsx

**Files:**
- Modify: `src/pages/PlatformPage.jsx`

- [ ] **Step 1: Rewrite PlatformPage.jsx with trimmed content and InsiteX mention**

Replace the entire contents of `src/pages/PlatformPage.jsx` with:

```jsx
import { HexMarkLarge } from '../components/HexMark';

const PlatformPage = ({ setPage }) => (
  <>
    <div className="ph">
      <div className="mw" style={{position:"relative"}}>
        <HexMarkLarge size={460} color="#F4801F" opacity={0.04}/>
        <div style={{position:"relative",zIndex:1,maxWidth:780}}>
          <div className="pbadge" style={{background:"var(--o10)",border:"1px solid var(--o20)",color:"var(--o)"}}>🤖 AI-First Platform</div>
          <h1 className="ph1" style={{color:"var(--dk)"}}>Intelligent Capability<br/><span style={{color:"var(--o)"}}>Development.</span></h1>
          <p className="psub" style={{color:"var(--bd)",marginBottom:36}}>The only closed-loop platform that turns assessment failures into new content builds automatically. Four products. One shared data layer. No human handoff.</p>
          <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
            <button className="bp" onClick={()=>setPage("contact")}>Book a Demo</button>
            <button className="bs" onClick={()=>setPage("services")}>Start with Advisory First</button>
          </div>
        </div>
      </div>
    </div>

    <section className="sec sw">
      <div className="mw">
        {/* Loop diagram dark card */}
        <div style={{background:"var(--dk)",borderRadius:22,padding:"48px 56px",marginBottom:56,position:"relative",overflow:"hidden"}}>
          <HexMarkLarge size={420} color="#F4801F" opacity={0.04}/>
          <div style={{position:"relative",zIndex:1}}>
            <div style={{textAlign:"center",marginBottom:32}}>
              <div className="ey-wt" style={{textAlign:"center"}}>The Closed Loop</div>
              <h3 style={{fontFamily:"Manrope,sans-serif",fontSize:24,fontWeight:800,color:"var(--wh)",letterSpacing:"-.035em",marginBottom:10}}>Build → Develop → Assess → Certify → Repeat</h3>
              <p style={{fontSize:14,color:"rgba(255,255,255,.38)",maxWidth:560,margin:"0 auto"}}>Content created in Forge powers learning in Atlas, assessed in Echo, drives Certify — and gaps restart the loop automatically.</p>
            </div>
            <svg width="100%" viewBox="0 0 700 300" style={{maxWidth:680,display:"block",margin:"0 auto"}}>
              <defs>
                {[["af","#F4801F"],["aa","#007AFF"],["ae","#7C3AED"],["ac","#059669"]].map(([id,c])=>(
                  <marker key={id} id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                    <path d="M1 1L9 5L1 9" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </marker>
                ))}
              </defs>
              {[{d:"M240 62 Q350 18 460 62",c:"#F4801F",m:"af",lx:350,ly:22,t:"content published"},{d:"M548 100 Q594 150 548 200",c:"#007AFF",m:"aa",lx:638,ly:154,t:"readiness reached"},{d:"M460 238 Q350 282 240 238",c:"#7C3AED",m:"ae",lx:350,ly:294,t:"competency demonstrated"},{d:"M152 200 Q106 150 152 100",c:"#059669",m:"ac",lx:56,ly:150,t:"gap → rebuild"}].map((a,i)=>(
                <g key={i}>
                  <path d={a.d} fill="none" stroke={a.c} strokeWidth="1.5" strokeOpacity=".5" markerEnd={"url(#"+a.m+")"}/>
                  <text x={a.lx} y={a.ly} textAnchor="middle" style={{fontSize:10,fill:a.c,opacity:.65,fontFamily:"DM Sans,sans-serif"}}>{a.t}</text>
                </g>
              ))}
              {[{x:100,y:30,c:"#F4801F",bg:"rgba(244,128,31,.1)",n:"Forge",s:"Builds content",ss:"Courses · Inserts · SOPs"},{x:448,y:30,c:"#007AFF",bg:"rgba(0,122,255,.1)",n:"Atlas",s:"Delivers learning",ss:"Adaptive · Gap-aware"},{x:448,y:200,c:"#7C3AED",bg:"rgba(124,58,237,.1)",n:"Echo",s:"Assesses in roleplay",ss:"HCP avatars · Scoring"},{x:100,y:200,c:"#059669",bg:"rgba(5,150,105,.1)",n:"Certify",s:"Confirms readiness",ss:"Behavioral proof"}].map(nd=>(
                <g key={nd.n}>
                  <rect x={nd.x} y={nd.y} width={148} height={68} rx="11" fill={nd.bg} stroke={nd.c} strokeWidth="1" strokeOpacity=".45"/>
                  <text x={nd.x+74} y={nd.y+24} textAnchor="middle" style={{fontSize:13,fontWeight:800,fill:nd.c,fontFamily:"Manrope,sans-serif"}}>{nd.n}</text>
                  <text x={nd.x+74} y={nd.y+41} textAnchor="middle" style={{fontSize:11,fill:"rgba(255,255,255,.48)",fontFamily:"DM Sans,sans-serif"}}>{nd.s}</text>
                  <text x={nd.x+74} y={nd.y+56} textAnchor="middle" style={{fontSize:9.5,fill:"rgba(255,255,255,.26)",fontFamily:"DM Sans,sans-serif"}}>{nd.ss}</text>
                </g>
              ))}
              {["INTELLIGENT","CAPABILITY","DEVELOPMENT"].map((w,i)=>(
                <text key={w} x="350" y={138+i*15} textAnchor="middle" style={{fontSize:9,fill:"rgba(255,255,255,.15)",letterSpacing:".1em",fontFamily:"Manrope,sans-serif"}}>{w}</text>
              ))}
            </svg>
          </div>
        </div>

        {/* Product cards — trimmed to 3 bullets each */}
        <div style={{display:"flex",flexDirection:"column",gap:20}}>
          {[
            {c:"#F4801F",bg:"rgba(244,128,31,.07)",icon:"⚡",name:"InsiteHub Forge",tag:"Agentic content creation",desc:"AI agents build MLR-compliant training from your PI, CSRs, and brand assets. Every claim cited. MLR review artifacts auto-generated. Hours, not months.",bullets:["Auto-generation from clinical data and product labeling","Citation tracking: every claim traced to source","Content Gap Analyzer feeds directly from Echo failures"]},
            {c:"#007AFF",bg:"rgba(0,122,255,.07)",icon:"🎓",name:"InsiteHub Atlas",tag:"AI-powered adaptive learning",desc:"Personalized learning pathways that identify knowledge gaps in real time and adjust content delivery before reps reach the field.",bullets:["Competency-role mapping with behavioral rubrics","Adaptive pathways that respond dynamically to gaps","Manager dashboards with predictive readiness scoring"]},
            {c:"#7C3AED",bg:"rgba(124,58,237,.07)",icon:"🎭",name:"InsiteHub Echo",tag:"AI roleplay & behavioral assessment",desc:"Live HCP roleplay with AI physician avatars. ComplianceGuard monitors every message in real time. Behavioral scoring against industry benchmarks.",bullets:["8 HCP digital twin avatars with behavioral models","ComplianceGuard: real-time compliance flagging","Gap payload triggers Forge auto-rebuild pipeline"]},
            {c:"#059669",bg:"rgba(5,150,105,.07)",icon:"✅",name:"Certify",tag:"Demonstrated field readiness",desc:"Certification earned through demonstrated competency, not attendance. Behavioral evidence tied to every credential. 10-year audit trail.",bullets:["Competency-gated — no attendance shortcuts","Behavioral evidence for every issued certification","SOC 2 Type II compliant, SHA-256 audit logs"]},
          ].map(p=>(
            <div key={p.name} style={{background:"var(--wh)",border:"1.5px solid var(--br)",borderRadius:18,padding:34,borderLeft:("4px solid "+p.c)}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:22}}>
                <div style={{width:56,height:56,borderRadius:15,background:p.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{p.icon}</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"baseline",gap:14,marginBottom:10}}>
                    <div style={{fontSize:22,fontWeight:900,color:"var(--dk)",fontFamily:"Manrope,sans-serif",letterSpacing:"-.04em"}}>{p.name}</div>
                    <div style={{fontSize:12,color:"var(--st)"}}>{p.tag}</div>
                  </div>
                  <p style={{fontSize:14.5,color:"var(--bd)",lineHeight:1.7,marginBottom:18}}>{p.desc}</p>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
                    {p.bullets.map(b=><div key={b} style={{display:"flex",alignItems:"flex-start",gap:9,fontSize:13,color:"var(--bd)"}}><div style={{width:5,height:5,borderRadius:"50%",background:p.c,flexShrink:0,marginTop:7}}/>{b}</div>)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Platform previews */}
        <div style={{marginTop:56}}>
          <div style={{textAlign:"center",marginBottom:40}}>
            <div className="ey" style={{textAlign:"center"}}>Platform Previews</div>
            <h3 style={{fontFamily:"Manrope,sans-serif",fontSize:26,fontWeight:800,color:"var(--dk)",letterSpacing:"-.035em"}}>What it looks like inside.</h3>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            {[
              {c:"#F4801F",name:"InsiteHub Forge",sub:"Content creation agent session",rows:[
                {label:"Launch Content Agent",pct:88,c:"#F4801F",bg:"rgba(244,128,31,.12)"},
                {label:"MLR citation check",pct:100,c:"#059669",bg:"rgba(5,150,105,.12)"},
                {label:"Veeva routing queued",pct:62,c:"#007AFF",bg:"rgba(0,122,255,.12)"},
              ],status:"3 artifacts ready for MLR review"},
              {c:"#007AFF",name:"InsiteHub Atlas",sub:"Rep pathway dashboard",rows:[
                {label:"Sarah Chen · Oncology pathway",pct:74,c:"#007AFF",bg:"rgba(0,122,255,.12)"},
                {label:"Knowledge gap detected · MOA",pct:41,c:"#F59E0B",bg:"rgba(245,158,11,.12)"},
                {label:"Echo readiness threshold",pct:90,c:"#059669",bg:"rgba(5,150,105,.12)"},
              ],status:"Echo assessment unlocked"},
              {c:"#7C3AED",name:"InsiteHub Echo",sub:"HCP roleplay session · Dr. Kim",rows:[
                {label:"Clinical accuracy score",pct:82,c:"#7C3AED",bg:"rgba(124,58,237,.12)"},
                {label:"Compliance guard · clean",pct:100,c:"#059669",bg:"rgba(5,150,105,.12)"},
                {label:"Objection handling",pct:67,c:"#F59E0B",bg:"rgba(245,158,11,.12)"},
              ],status:"Scorecard generating…"},
              {c:"#059669",name:"Certify",sub:"Certification audit record",rows:[
                {label:"Competency threshold met",pct:100,c:"#059669",bg:"rgba(5,150,105,.12)"},
                {label:"Behavioral evidence logged",pct:100,c:"#059669",bg:"rgba(5,150,105,.12)"},
                {label:"SHA-256 audit trail",pct:100,c:"#059669",bg:"rgba(5,150,105,.12)"},
              ],status:"Certification issued · 10yr record"},
            ].map(p=>(
              <div key={p.name} className="prod-preview">
                <div className="pp-topbar">
                  {["#FF5F57","#FEBC2E","#28C840"].map(c=><div key={c} className="pp-dot" style={{background:c}}/>)}
                  <div style={{marginLeft:8,fontSize:11,color:"rgba(255,255,255,.25)",fontFamily:"DM Sans,sans-serif"}}>{p.name} · {p.sub}</div>
                </div>
                <div className="pp-content">
                  <div style={{fontSize:10,letterSpacing:".1em",textTransform:"uppercase",color:p.c,fontWeight:700,marginBottom:12,opacity:.8}}>{p.sub}</div>
                  {p.rows.map(r=>(
                    <div key={r.label} className="pp-row" style={{background:r.bg}}>
                      <div className="pp-label" style={{color:"rgba(255,255,255,.7)",minWidth:180,fontSize:11}}>{r.label}</div>
                      <div style={{flex:1,height:4,background:"rgba(255,255,255,.08)",borderRadius:2}}>
                        <div className="pp-bar" style={{width:(r.pct+"%"),background:r.c,opacity:.8}}/>
                      </div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,.4)",minWidth:32,textAlign:"right"}}>{r.pct}%</div>
                    </div>
                  ))}
                  <div style={{marginTop:14,padding:"8px 12px",background:"rgba(255,255,255,.03)",borderRadius:8,border:"1px solid rgba(255,255,255,.06)",fontSize:11,color:p.c,fontWeight:600}}>⬤ {p.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* InsiteX mention */}
        <div style={{marginTop:56,background:"linear-gradient(135deg,#FFF8F1,#FFF2E4)",borderRadius:18,padding:"32px 40px",border:"1px solid rgba(244,128,31,.18)",display:"flex",alignItems:"center",justifyContent:"space-between",gap:32,flexWrap:"wrap"}}>
          <div>
            <div style={{fontSize:18,fontWeight:800,color:"var(--dk)",fontFamily:"Manrope,sans-serif",letterSpacing:"-.025em",marginBottom:6}}>Not ready for AI? Start with InsiteX LMS.</div>
            <div style={{fontSize:14,color:"var(--bd)",lineHeight:1.6,maxWidth:520}}>Enterprise learning infrastructure built for biopharma compliance, credentialing, and workflow. It's the foundation the AI platform builds on — and the upgrade path is seamless.</div>
          </div>
          <button className="bs" onClick={()=>setPage("services")}>Learn More →</button>
        </div>

        <div className="sec-cta" style={{marginTop:48}}>
          <button className="bp" onClick={()=>setPage("contact")}>Book a Platform Demo</button>
          <button className="bs" onClick={()=>setPage("services")}>Explore Our Services</button>
        </div>
      </div>
    </section>

    <section className="cta-full">
      <div style={{position:"relative",zIndex:1}}>
        <h2 className="cf-h">See the closed loop <em>in action.</em></h2>
        <p className="cf-p">We'll walk you through the platform in the context of your commercial organization — not a generic product tour.</p>
        <div className="cf-btns">
          <button className="bp" onClick={()=>setPage("contact")}>Book a Demo</button>
          <button className="bt-wt" onClick={()=>setPage("services")}>Start with Advisory →</button>
        </div>
      </div>
    </section>
  </>
);

export default PlatformPage;
```

Changes: removed "Before You Deploy" literacy section, removed duplicate CTA blocks (was 3, now 2), trimmed product descriptions by ~40%, reduced bullets from 5 to 3 per product, added InsiteX callout card, changed all `setPage("advisory")` to `setPage("services")`.

- [ ] **Step 2: Commit**

```bash
git add src/pages/PlatformPage.jsx
git commit -m "Trim PlatformPage: shorter descriptions, 3 bullets, InsiteX callout"
```

---

### Task 5: Create ServicesPage.jsx

**Files:**
- Create: `src/pages/ServicesPage.jsx`

- [ ] **Step 1: Create the new consolidated services page**

Create `src/pages/ServicesPage.jsx` with:

```jsx
import { HexMarkLarge } from '../components/HexMark';

const ServicesPage = ({ setPage }) => (
  <>
    <div className="ph">
      <div className="mw" style={{position:"relative"}}>
        <HexMarkLarge size={460} color="#F4801F" opacity={0.04}/>
        <div style={{position:"relative",zIndex:1,maxWidth:780}}>
          <div className="pbadge" style={{background:"var(--o10)",border:"1px solid var(--o20)",color:"var(--o)"}}>🧭 Services</div>
          <h1 className="ph1" style={{color:"var(--dk)"}}>We meet you<br/><span style={{color:"var(--o)"}}>where you are.</span></h1>
          <p className="psub" style={{color:"var(--bd)",marginBottom:36}}>Whether you need a strategy, a structured experiment, AI literacy across your team, or content for an upcoming launch — every engagement starts with understanding your environment first.</p>
          <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
            <button className="bp" onClick={()=>setPage("contact")}>Book a Discovery Call</button>
            <button className="bs" onClick={()=>setPage("platform")}>See the AI Platform</button>
          </div>
        </div>
      </div>
    </div>

    {/* ADVISORY */}
    <section className="sec sw">
      <div className="mw">
        <div className="sh">
          <div className="ey">Advisory</div>
          <h2 className="h2">We diagnose before we prescribe.</h2>
          <p className="lead">Most vendors lead with a demo. We lead with a diagnosis — mapping your compliance requirements, governance structure, and AI readiness before recommending anything. Every engagement is time-bounded with a concrete deliverable.</p>
        </div>
        <div className="ag">
          {[
            {n:"Entry Point",t:"AI Strategy & Roadmap Workshop",d:"Executive alignment on AI priorities, use cases, and implementation roadmap. The lowest-risk starting point."},
            {n:"Foundation",t:"AI Readiness & Maturity Assessment",d:"Custom AI maturity model, capability heatmap, technology gap analysis, and prioritized use case roadmap."},
            {n:"Selection",t:"Learning Technology & GenAI Assessment",d:"Comprehensive vendor evaluation, compliance risk assessment, and integration feasibility study."},
            {n:"Governance",t:"AI Governance & Compliance Framework",d:"End-to-end governance framework for AI-generated commercial content. Role-based guidelines and monitoring."},
            {n:"Infrastructure",t:"Learning Infrastructure Assessment",d:"Data architecture review, AI infrastructure readiness analysis, and phased modernization roadmap."},
            {n:"Organization",t:"AI-Optimized Org Design",d:"Organizational structure recommendations for AI-enabled commercial learning at scale."},
          ].map(a=>(
            <div key={a.n} className="ac">
              <div className="ac-n">{a.n}</div>
              <div className="ac-t">{a.t}</div>
              <div className="ac-d">{a.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* AI LITERACY */}
    <section className="sec sl">
      <div className="mw">
        <div className="sh">
          <div className="ey">AI Literacy Program</div>
          <h2 className="h2">Your team can't use AI tools<br/>they don't understand or trust.</h2>
          <p className="lead">Before your organization deploys AI, it needs a foundation — the concepts, the vocabulary, the judgment to know when AI is helping and when it isn't. Role-targeted tracks for every part of your commercial structure.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
          {[
            {icon:"🧠",t:"What AI Actually Does",d:"How LLMs work, where they fail, and why outputs require human judgment.",audience:"All roles"},
            {icon:"⚖️",t:"AI in a Regulated Environment",d:"How AI interacts with MLR review, GxP validation, and compliance requirements.",audience:"Medical · Regulatory"},
            {icon:"✍️",t:"AI for Content Creation",d:"Prompt design, output review, citation verification, and the human judgment layer.",audience:"L&D · Marketing"},
            {icon:"🎭",t:"AI in Field Conversations",d:"AI-generated talking points, coached preparation, and HCP persona behaviors.",audience:"Commercial · Sales"},
            {icon:"📊",t:"AI and Performance Data",d:"How to interpret AI-generated competency scores and readiness predictions.",audience:"Managers · Leaders"},
            {icon:"🗺️",t:"Building an AI-Ready Mindset",d:"Experiment-first culture, evaluating vendor claims, and institutional vocabulary.",audience:"Leadership · CLO"},
          ].map(m=>(
            <div key={m.t} style={{background:"var(--wh)",border:"1.5px solid var(--br)",borderRadius:16,padding:26,transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="#D97706";e.currentTarget.style.background="rgba(245,158,11,.04)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--br)";e.currentTarget.style.background="var(--wh)";}}>
              <div style={{fontSize:26,marginBottom:12}}>{m.icon}</div>
              <div style={{fontSize:15,fontWeight:700,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:6,lineHeight:1.3}}>{m.t}</div>
              <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.55,marginBottom:10}}>{m.d}</div>
              <div style={{fontSize:11,fontWeight:700,color:"#D97706",background:"rgba(245,158,11,.1)",borderRadius:20,padding:"3px 10px",display:"inline-block"}}>{m.audience}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CONTENT DEVELOPMENT */}
    <section className="sec sw">
      <div className="mw">
        <div className="sh">
          <div className="ey">Content Development</div>
          <h2 className="h2">Built for field readiness.<br/>Not completion rates.</h2>
          <p className="lead">MLR-compliant content developed with behavioral effectiveness as a design requirement — AI-powered when you're ready, human-led when you're not.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          {[
            {icon:"🤖",t:"AI-Powered Content (Forge)",d:"Forge agents generate MLR-compliant modules from PI, CSRs, and brand assets. Every claim cited. Development drops from months to hours."},
            {icon:"✍️",t:"Traditional Instructional Design",d:"Full-service content by practitioners with deep biopharma commercial backgrounds. Human-led, compliance-first, field-validated."},
            {icon:"⚖️",t:"MLR-Integrated Design",d:"Compliance as a design input, not a last gate. Fewer revision cycles. Faster time-to-field."},
            {icon:"🔄",t:"AI-Assisted Human Review",d:"Forge drafts the structure, citations, and compliance scaffolding. InsiteHub practitioners review and validate."},
          ].map(c=>(
            <div key={c.t} style={{background:"var(--lt)",border:"1.5px solid var(--br)",borderRadius:16,padding:28}}>
              <div style={{fontSize:26,marginBottom:14}}>{c.icon}</div>
              <div style={{fontSize:18,fontWeight:800,color:"var(--dk)",marginBottom:10,fontFamily:"Manrope,sans-serif",letterSpacing:"-.03em"}}>{c.t}</div>
              <div style={{fontSize:14,color:"var(--bd)",lineHeight:1.67}}>{c.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* PROXA LABS */}
    <section className="sec sl">
      <div className="mw">
        <div className="sh">
          <div className="ey">Proxa Labs</div>
          <h2 className="h2">Your AI mandate deserves<br/>a properly designed experiment.</h2>
          <p className="lead">Proxa Labs helps you define the right AI use case, design a structured experiment, measure success against criteria that matter — and build the business case that turns results into action.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:14}}>
          {[
            {n:"Phase 1",c:"#7C3AED",bg:"rgba(124,58,237,.07)",bc:"rgba(124,58,237,.18)",icon:"🎯",title:"Define the Right Use Case",d:"Map your landscape, identify where AI creates value, and produce a prioritized use case hypothesis."},
            {n:"Phase 2",c:"#F4801F",bg:"rgba(244,128,31,.07)",bc:"rgba(244,128,31,.2)",icon:"🔬",title:"Design the Experiment",d:"Structure a pilot against your real constraints — compliance, IT, governance — not a controlled demo."},
            {n:"Phase 3",c:"#059669",bg:"rgba(5,150,105,.07)",bc:"rgba(5,150,105,.18)",icon:"📈",title:"Measure Success",d:"Define metrics before the experiment runs. Commercial performance, not engagement theater."},
            {n:"Phase 4",c:"#007AFF",bg:"rgba(0,122,255,.07)",bc:"rgba(0,122,255,.18)",icon:"📋",title:"Build the Business Case",d:"Translate results into a leadership-ready ROI model and implementation roadmap."},
          ].map(ph=>(
            <div key={ph.n} style={{background:ph.bg,border:("1.5px solid "+ph.bc),borderRadius:18,padding:24}}>
              <div style={{fontSize:22,marginBottom:10}}>{ph.icon}</div>
              <div style={{fontSize:11,letterSpacing:".12em",textTransform:"uppercase",color:ph.c,fontWeight:700,marginBottom:6}}>{ph.n}</div>
              <div style={{fontSize:16,fontWeight:800,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:8,letterSpacing:"-.02em",lineHeight:1.25}}>{ph.title}</div>
              <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.6}}>{ph.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* INSITEX LMS */}
    <section className="sec sw">
      <div className="mw">
        <div style={{background:"linear-gradient(135deg,#FFF8F1,#FFF2E4)",borderRadius:20,padding:"40px 48px",border:"1px solid rgba(244,128,31,.18)",display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"center"}}>
          <div>
            <div className="ey">InsiteX LMS</div>
            <h3 style={{fontFamily:"Manrope,sans-serif",fontSize:24,fontWeight:900,color:"var(--dk)",marginBottom:14,letterSpacing:"-.035em",lineHeight:1.16}}>Enterprise learning infrastructure.<br/>Built for biopharma.</h3>
            <p style={{fontSize:14,color:"var(--bd)",lineHeight:1.7,marginBottom:20}}>A cloud-based learning platform with the compliance architecture, credentialing workflows, and content controls that life sciences requires. It's the foundation the AI platform builds on — and the upgrade path is seamless.</p>
            <button className="bp" onClick={()=>setPage("contact")}>Request a Demo</button>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {[{n:"4+",l:"Years serving biopharma"},{n:"30+",l:"Pharma & health system clients"},{n:"SCORM / AICC",l:"& PMRC compliant"},{n:"SOC 2",l:"Type II in progress"}].map(s=>(
              <div key={s.n} style={{display:"flex",alignItems:"center",gap:16,padding:"12px 18px",background:"rgba(255,255,255,.7)",borderRadius:12,border:"1px solid rgba(244,128,31,.12)"}}>
                <div style={{fontSize:20,fontWeight:900,color:"var(--o)",fontFamily:"Manrope,sans-serif",letterSpacing:"-.04em",minWidth:70}}>{s.n}</div>
                <div style={{fontSize:13,color:"var(--bd)"}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="cta-full">
      <div style={{position:"relative",zIndex:1}}>
        <h2 className="cf-h">Not sure where to start?<br/><em>That's the right conversation to have.</em></h2>
        <p className="cf-p">30 minutes. No demo, no pitch. Just your environment and what's been blocking you.</p>
        <div className="cf-btns">
          <button className="bp" onClick={()=>setPage("contact")}>Book a Discovery Call</button>
          <button className="bt-wt" onClick={()=>setPage("platform")}>See the Platform →</button>
        </div>
      </div>
    </section>
  </>
);

export default ServicesPage;
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/ServicesPage.jsx
git commit -m "Create ServicesPage: consolidates Advisory, Literacy, Content, Proxa Labs, InsiteX"
```

---

### Task 6: Trim AboutPage.jsx

**Files:**
- Modify: `src/pages/AboutPage.jsx`

- [ ] **Step 1: Rewrite AboutPage.jsx with trimmed content**

Replace the entire contents of `src/pages/AboutPage.jsx` with:

```jsx
import { HexMarkLarge } from '../components/HexMark';

const AboutPage = ({ setPage }) => (
  <>
    <div className="ph"><div className="mw" style={{position:"relative"}}>
      <HexMarkLarge size={460} color="#F4801F" opacity={0.04}/>
      <div style={{position:"relative",zIndex:1,maxWidth:780}}>
        <div className="pbadge" style={{background:"var(--o10)",border:"1px solid var(--o20)",color:"var(--o)"}}>🏢 About InsiteHub</div>
        <h1 className="ph1" style={{color:"var(--dk)"}}>We've been solving problems<br/>biopharma didn't have<br/><span style={{color:"var(--o)"}}>solutions for yet.</span></h1>
        <p className="psub" style={{color:"var(--bd)"}}>The best solutions in commercial learning come from practitioners who've worked inside the environment — not vendors adapting generic products for pharma.</p>
      </div>
    </div></div>

    <section className="sec sw"><div className="mw">
      <div style={{maxWidth:720,marginBottom:64}}>
        <div className="ey">Our Story</div>
        <h2 className="h2">Innovation that comes from the inside.</h2>
        <p style={{fontSize:15.5,color:"var(--bd)",lineHeight:1.75,marginBottom:18}}>InsiteHub was founded on a track record of building things that didn't exist yet — because existing approaches were failing commercial organizations. Content missing launch windows. Training producing completion metrics instead of behavior change. Certification giving false confidence about field readiness.</p>
        <p style={{fontSize:15.5,color:"var(--bd)",lineHeight:1.75,marginBottom:18}}>Along the way we won the Vanguard Award for the world's best corporate learning program — building an immersive virtual world for a drug launch when competitors quoted $5M platforms. We secured an NIH grant and launched one of only two biomedical accelerators outside a university in the US.</p>
        <p style={{fontSize:15.5,color:"var(--bd)",lineHeight:1.75,marginBottom:28}}>The result is an organization that leads with diagnosis, experiments before it commits, and measures success against field performance — not engagement metrics.</p>
        <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
          <button className="bp" onClick={()=>setPage("contact")}>Start a Conversation</button>
          <button className="bs" onClick={()=>setPage("services")}>Explore Our Services</button>
        </div>
      </div>

      {/* Innovation proof points */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:16,marginBottom:64}}>
        {[
          {icon:"🌐",num:"1st",label:"Virtual world for a drug launch",sub:"Won the world's top corporate learning award.",c:"#F4801F"},
          {icon:"🎮",num:"100%",label:"Gamified training participation",sub:"600 sales managers. The first program with universal adoption.",c:"#7C3AED"},
          {icon:"🏛️",num:"2nd",label:"NIH biomedical accelerator outside a university",sub:"One of only two in the US.",c:"#007AFF"},
          {icon:"🔄",num:"Only",label:"Closed-loop AI platform in commercial L&D",sub:"Automatically connects content creation to behavioral certification.",c:"#059669"},
        ].map(s=>(
          <div key={s.label} style={{textAlign:"center",padding:"24px 16px",background:"var(--lt)",borderRadius:16,border:"1px solid var(--br)"}}>
            <div style={{fontSize:28,marginBottom:8}}>{s.icon}</div>
            <div style={{fontSize:28,fontWeight:900,color:s.c,fontFamily:"Manrope,sans-serif",letterSpacing:"-.04em",lineHeight:1,marginBottom:6}}>{s.num}</div>
            <div style={{fontSize:13,fontWeight:700,color:"var(--dk)",marginBottom:6,lineHeight:1.3}}>{s.label}</div>
            <div style={{fontSize:12,color:"var(--bd)",lineHeight:1.5}}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Timeline — shortened */}
      <div className="ey">Our History</div>
      <h2 className="h2" style={{marginBottom:44}}>Built from the inside of biopharma.</h2>
      <div className="tl">
        {[
          {date:"2010",t:"InsiteHub Founded",d:"Incorporated through the University of Delaware Spin-In Program to serve life sciences commercial organizations."},
          {date:"2010s",t:"Expanded Across Life Sciences",d:"Grew to 30+ organizations including AbbVie, Pfizer, Novartis, Biogen, Sanofi, and major academic medical centers."},
          {date:"2014–2018",t:"NIH Grant & InsiteXcelerator",d:"Awarded NIH grant. Became the 2nd NIH-partnered biomedical accelerator outside a university in the US."},
          {date:"2018–2022",t:"Enterprise LMS Platform",d:"Developed and launched InsiteX — enterprise learning management built for biopharma compliance and credentialing."},
          {date:"2023–Present",t:"AI-First Transformation",d:"Launched Forge, Atlas, Echo, and Certify — the only closed-loop AI platform in commercial L&D."},
        ].map(t=>(
          <div key={t.date} className="tl-i"><div className="tl-d"/><div className="tl-ey">{t.date}</div><div className="tl-t">{t.t}</div><div className="tl-p">{t.d}</div></div>
        ))}
      </div>
    </div></section>

    <section className="cta-full"><div style={{position:"relative",zIndex:1}}>
      <h2 className="cf-h">Ready to work with a team<br/><em>that's been in your seat?</em></h2>
      <p className="cf-p">Start with a conversation. No demo. No pitch deck. Just your environment and what you're trying to solve.</p>
      <div className="cf-btns"><button className="bp" onClick={()=>setPage("contact")}>Start a Conversation</button><button className="bt-wt" onClick={()=>setPage("services")}>Explore Services →</button></div>
    </div></section>
  </>
);

export default AboutPage;
```

Changes: removed the 2-column layout with sidebar cards, integrated Vanguard/NIH facts into the story text, shortened timeline descriptions to 1 sentence each, shortened subtitle, changed `setPage("advisory")` to `setPage("services")`.

- [ ] **Step 2: Commit**

```bash
git add src/pages/AboutPage.jsx
git commit -m "Trim AboutPage: integrate proof points into story, shorten timeline"
```

---

### Task 7: Update ContactPage.jsx with resources section

**Files:**
- Modify: `src/pages/ContactPage.jsx`

- [ ] **Step 1: Add resources section to ContactPage**

Read `src/pages/ContactPage.jsx`, then append a resources section after the existing form section (before the closing `</>`). Add this section just before the final `</>`:

Find the closing of the form section:
```
      </div></section>
    </>
```

Replace with:
```jsx
      </div></section>

    {/* RESOURCES */}
    <section className="sec sl">
      <div className="mw" style={{textAlign:"center"}}>
        <div className="ey" style={{textAlign:"center"}}>Want to explore on your own first?</div>
        <h2 className="h2" style={{textAlign:"center",maxWidth:500,margin:"0 auto 32px"}}>Free frameworks you can use today.</h2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:14}}>
          {[
            {icon:"📋",c:"#F4801F",t:"AI Readiness Self-Assessment",d:"15-question framework for evaluating your organization's readiness to deploy AI."},
            {icon:"🗺️",c:"#7C3AED",t:"AI Pilot Failure Taxonomy",d:"The four failure patterns behind 80-95% of pharma AI pilot failures."},
            {icon:"📊",c:"#007AFF",t:"Business Case Template",d:"The ROI model structure for framing pilot results in leadership language."},
            {icon:"⚖️",c:"#D97706",t:"Vendor Evaluation Scorecard",d:"24-point matrix for assessing AI platform vendors in biopharma."},
          ].map(r=>(
            <div key={r.t} style={{background:"var(--wh)",border:"1.5px solid var(--br)",borderRadius:16,padding:24,textAlign:"left",transition:"all .2s",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,.06)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
              <div style={{width:40,height:40,borderRadius:11,background:(r.c+"12"),display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,marginBottom:12}}>{r.icon}</div>
              <div style={{fontSize:14,fontWeight:700,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:6,lineHeight:1.3}}>{r.t}</div>
              <div style={{fontSize:12,color:"var(--bd)",lineHeight:1.55}}>{r.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/ContactPage.jsx
git commit -m "Add resources section to ContactPage, absorbing ResourcesPage content"
```

---

### Task 8: Update App.jsx — routing, imports, cleanup

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Rewrite App.jsx with 5-page routing**

Replace the entire contents of `src/App.jsx` with:

```jsx
import { useState, useEffect } from "react";
import './styles.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PlatformPage from './pages/PlatformPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

const PAGE_TITLES = {
  home: "InsiteHub · AI-First Commercial Learning for Biopharma",
  platform: "AI Platform · Forge, Atlas, Echo & Certify · InsiteHub",
  services: "Services · Advisory, AI Literacy, Content & Experimentation · InsiteHub",
  about: "About InsiteHub · Innovation-Led Biopharma L&D Since 2010",
  contact: "Contact InsiteHub · Start a Conversation",
};

export default function App() {
  const [page,setPage]=useState("home");
  const [scrolled,setScrolled]=useState(false);

  useEffect(()=>{ const fn=()=>setScrolled(window.scrollY>40); window.addEventListener("scroll",fn); return()=>window.removeEventListener("scroll",fn); },[]);

  useEffect(()=>{
    window.scrollTo(0,0);
    document.title = PAGE_TITLES[page] || PAGE_TITLES.home;
    const descs = {
      home:"InsiteHub is the AI implementation partner built for biopharma commercial learning. Advisory, platform, and experimentation — methodology-first, compliance by design.",
      platform:"The only closed-loop AI platform in biopharma: Forge builds content, Atlas delivers learning, Echo assesses readiness, Certify confirms competency.",
      services:"Advisory, AI literacy, content development, and structured experimentation — InsiteHub meets you where you are in your AI journey.",
      about:"InsiteHub has been solving biopharma commercial learning challenges for 25 years. Innovation-led, compliance by design.",
      contact:"Start a conversation with InsiteHub. Ready to talk, want to learn first, or just exploring — we'll meet you where you are.",
    };
    let meta = document.querySelector('meta[name="description"]');
    if(!meta){ meta=document.createElement('meta'); meta.name="description"; document.head.appendChild(meta); }
    meta.content = descs[page] || descs.home;
  },[page]);

  const pages={home:HomePage,platform:PlatformPage,services:ServicesPage,about:AboutPage,contact:ContactPage};
  const Page=pages[page]||HomePage;
  return(
    <>
      <Nav page={page} setPage={setPage} scrolled={scrolled}/>
      <main><Page setPage={setPage}/></main>
      <Footer setPage={setPage}/>
    </>
  );
}
```

Changes: removed 8 page imports, removed 8 page title/description entries, added `services` entry, updated pages map to 5 entries.

- [ ] **Step 2: Commit**

```bash
git add src/App.jsx
git commit -m "Update App.jsx: 5-page routing with new services page"
```

---

### Task 9: Delete old page files and unused components

**Files:**
- Delete: `src/pages/AdvisoryPage.jsx`
- Delete: `src/pages/LiteracyPage.jsx`
- Delete: `src/pages/ContentPage.jsx`
- Delete: `src/pages/ProxaLabsPage.jsx`
- Delete: `src/pages/InsiteXPage.jsx`
- Delete: `src/pages/NewsPage.jsx`
- Delete: `src/pages/ResourcesPage.jsx`
- Delete: `src/pages/NewsletterPage.jsx`
- Delete: `src/components/NewsletterInline.jsx`

- [ ] **Step 1: Delete all old files**

```bash
rm src/pages/AdvisoryPage.jsx src/pages/LiteracyPage.jsx src/pages/ContentPage.jsx src/pages/ProxaLabsPage.jsx src/pages/InsiteXPage.jsx src/pages/NewsPage.jsx src/pages/ResourcesPage.jsx src/pages/NewsletterPage.jsx src/components/NewsletterInline.jsx
```

- [ ] **Step 2: Verify build**

Run: `npm run build 2>&1 | tail -10`

Expected: Build succeeds with no errors. CSS file may be slightly smaller since some classes are no longer referenced.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "Delete 8 old page files and NewsletterInline component"
```

---

### Task 10: Final build, test, and deploy

- [ ] **Step 1: Run production build**

Run: `npm run build 2>&1`

Expected: Build succeeds. JS bundle should be noticeably smaller than before (~370KB → ~200-250KB).

- [ ] **Step 2: Start dev server and test all 5 pages**

Run: `npm run dev`

Test each page in the browser:
1. Home — hero with loop animation, logo band, stats, 3 capability cards, testimonial, CTA
2. Platform — hero, loop diagram, 4 product cards, UI previews, InsiteX callout, CTA
3. Services — hero, Advisory cards, AI Literacy modules, Content tracks, Proxa Labs phases, InsiteX section, CTA
4. About — hero, story, 4 proof points, timeline, CTA
5. Contact — hero with track selector, form, resources section

Also test: nav links all work, footer links all work, "Book a Demo" goes to Contact, logo goes Home.

- [ ] **Step 3: Deploy to Firebase**

```bash
npm run build && firebase deploy --only hosting
```

Expected: Deploy succeeds, site live at https://insite-hub-web.web.app

- [ ] **Step 4: Commit and push**

```bash
git push
```
