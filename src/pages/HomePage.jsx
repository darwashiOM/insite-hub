import useReveal from '../hooks/useReveal';
import LoopVisual from '../components/LoopVisual';
import LoopMobile from '../components/LoopMobile';
import AnnouncementBand from '../components/AnnouncementBand';
import DiffCard from '../components/DiffCard';

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

      {/* sections 9-14 land in later tasks */}
    </>
  );
};

export default HomePage;
