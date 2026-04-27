import { useState, useEffect, useRef } from 'react';
import { HexMark } from './HexMark';
import Icon from './Icon';

const DROP_ITEMS = [
  {icon:<Icon name="strategy" size={20} />,title:"I need an AI strategy",desc:"Assess your readiness and build a roadmap before any technology decision.",tag:"Advisory",p:"advisory"},
  {icon:<Icon name="pilot" size={20} />,title:"I want to run an AI pilot",desc:"Structure the experiment, define success criteria, build the business case.",tag:"Proxa Labs",p:"proxalab"},
  {icon:<Icon name="literacy" size={20} />,title:"I need AI literacy training",desc:"Build AI fluency across your commercial organization before deploying tools.",tag:"AI Literacy",p:"literacy"},
  {icon:<Icon name="platform" size={20} />,title:"I'm ready for a platform",desc:"See Forge, Atlas, Echo, and Certify — the only closed-loop AI platform.",tag:"AI Platform",p:"platform"},
  {icon:<Icon name="content" size={20} />,title:"I need content for a launch",desc:"AI-generated or human-led, MLR-compliant content on your timeline.",tag:"Content",p:"content"},
  {icon:<Icon name="lms" size={20} />,title:"I need an LMS first",desc:"Enterprise learning infrastructure built for biopharma compliance.",tag:"InsiteX LMS",p:"insitex"},
  {icon:<Icon name="chat" size={20} />,title:"I'm not sure yet",desc:"30 minutes. No pitch. Tell us where you're stuck.",tag:"Book a Consult",p:"contact",track:"talk"},
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

  const go = (p, track) => {
    setDropOpen(false); setMobileOpen(false); setMobileDropOpen(false);
    if (p === "contact" && track) window.location.hash = track;
    setPage(p);
  };

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
                  <div key={d.title} onClick={() => go(d.p, d.track)} className="ndm-item" style={{ padding: "14px 16px", borderRadius: 10, cursor: "pointer" }}>
                    <div style={{ color: 'var(--o)', marginBottom: 5 }}>{d.icon}</div>
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
          <button className="no" onClick={() => go("contact", "demo")}>Book a Demo</button>
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
              <button key={d.title} onClick={() => go(d.p, d.track)}>
                <span style={{ marginRight: 10 }}>{d.icon}</span>{d.title}
              </button>
            ))}
          </div>
        )}
        {TOP_LINKS.map(([l, p]) => (
          <button key={p} className={page === p ? "on" : ""} onClick={() => go(p)}>{l}</button>
        ))}
        <button className="mobile-cta" onClick={() => go("contact", "demo")}>Book a Demo</button>
      </div>
    </>
  );
};

export default Nav;
