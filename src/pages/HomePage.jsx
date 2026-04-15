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
