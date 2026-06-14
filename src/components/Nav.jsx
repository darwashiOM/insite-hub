import { useState, useEffect, useRef } from 'react';
import Icon from './Icon';

const WHERE_ITEMS = [
  {icon:<Icon name="strategy" size={20} />,title:"I need an AI strategy",desc:"Assess your readiness and build a roadmap before any technology decision.",tag:"Advisory",p:"advisory"},
  {icon:<Icon name="pilot" size={20} />,title:"I want to run an AI pilot",desc:"Structure the experiment, define success criteria, build the business case.",tag:"The Lab",p:"proxalab"},
  {icon:<Icon name="literacy" size={20} />,title:"I need AI literacy training",desc:"Build AI fluency across your commercial organization before deploying tools.",tag:"AI Literacy",p:"literacy"},
  {icon:<Icon name="platform" size={20} />,title:"I'm ready for a platform",desc:"See Forge, Cue, Stage, and Trace — the only closed-loop AI platform.",tag:"AI Platform",p:"platform"},
  {icon:<Icon name="content" size={20} />,title:"I need content for a launch",desc:"AI-generated or human-led, MLR-compliant content on your timeline.",tag:"Content",p:"content"},
  {icon:<Icon name="lms" size={20} />,title:"I need an LMS first",desc:"Enterprise learning infrastructure built for biopharma compliance.",tag:"InsiteX LMS",p:"insitex"},
  {icon:<Icon name="chat" size={20} />,title:"I'm not sure yet",desc:"30 minutes. No pitch. Tell us where you're stuck.",tag:"Book a Consult",p:"contact",track:"talk"},
];

const PLATFORM_ITEMS = [
  ["AI Platform", "platform"],
  ["InsiteX LMS", "insitex"],
];

const SOLUTIONS_ITEMS = [
  ["AI Literacy", "literacy"],
  ["Advisory", "advisory"],
  ["Content", "content"],
];

const FLAT_LINKS = [
  ["The Lab", "proxalab"],
  ["Resources", "resources"],
  ["About", "about"],
];

const Chevron = ({ open }) => (
  <svg width="11" height="7" viewBox="0 0 12 8" fill="none" style={{ marginLeft: 4, transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform .2s" }}>
    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Nav = ({ page, setPage, scrolled }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    if (!openDropdown) return;
    const handler = (e) => { if (navRef.current && !navRef.current.contains(e.target)) setOpenDropdown(null); };
    const esc = (e) => { if (e.key === "Escape") setOpenDropdown(null); };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", handler); document.removeEventListener("keydown", esc); };
  }, [openDropdown]);

  const go = (p, track) => {
    setOpenDropdown(null); setMobileOpen(false); setMobileAccordion(null);
    setPage(p, track ? { hash: track } : undefined);
  };

  const toggle = (k) => setOpenDropdown(o => o === k ? null : k);
  const toggleMobile = (k) => setMobileAccordion(o => o === k ? null : k);
  const isActive = (items) => items.some(([, p]) => p === page);

  return (
    <>
      <nav ref={navRef} className={"nav" + (scrolled ? " up" : "")}>
        <div className="nav-logo" onClick={() => go("home")}>
          <img className="nav-logo-img" src="/assets/proxa_horiz.png" alt="Proxa Labs" />
        </div>
        <div className="nav-links">
          {/* Where to Start (mega) */}
          <div style={{ position: "relative" }}>
            <button
              className="nl nl-drop"
              onClick={() => toggle("where")}
              style={{ color: openDropdown === "where" ? "var(--o)" : undefined }}
            >
              Where to Start
              <Chevron open={openDropdown === "where"} />
            </button>
            {openDropdown === "where" && (
              <div className="nav-mega-menu">
                {WHERE_ITEMS.map(d => (
                  <div key={d.title} onClick={() => go(d.p, d.track)} className="ndm-item">
                    <div style={{ color: 'var(--o)', marginBottom: 5 }}>{d.icon}</div>
                    <div className="ndm-title">{d.title}</div>
                    <div className="ndm-desc">{d.desc}</div>
                    <span className="ndm-tag">{d.tag}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Platform */}
          <div style={{ position: "relative" }}>
            <button
              className={"nl nl-drop" + (isActive(PLATFORM_ITEMS) ? " on" : "")}
              onClick={() => toggle("platform")}
              style={{ color: openDropdown === "platform" ? "var(--o)" : undefined }}
            >
              Platform
              <Chevron open={openDropdown === "platform"} />
            </button>
            {openDropdown === "platform" && (
              <div className="nav-mini-menu">
                {PLATFORM_ITEMS.map(([l, p]) => (
                  <button key={p} className={"nav-mini-item" + (page === p ? " on" : "")} onClick={() => go(p)}>{l}</button>
                ))}
              </div>
            )}
          </div>

          {/* Solutions */}
          <div style={{ position: "relative" }}>
            <button
              className={"nl nl-drop" + (isActive(SOLUTIONS_ITEMS) ? " on" : "")}
              onClick={() => toggle("solutions")}
              style={{ color: openDropdown === "solutions" ? "var(--o)" : undefined }}
            >
              Solutions
              <Chevron open={openDropdown === "solutions"} />
            </button>
            {openDropdown === "solutions" && (
              <div className="nav-mini-menu">
                {SOLUTIONS_ITEMS.map(([l, p]) => (
                  <button key={p} className={"nav-mini-item" + (page === p ? " on" : "")} onClick={() => go(p)}>{l}</button>
                ))}
              </div>
            )}
          </div>

          {/* Flat links */}
          {FLAT_LINKS.map(([l, p, type]) => (
            type === "external" ? (
              <a key={p} className="nl" href={p} target="_blank" rel="noopener noreferrer">{l}</a>
            ) : (
              <button key={p} className={"nl" + (page === p ? " on" : "")} onClick={() => go(p)}>{l}</button>
            )
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
        <button className="mobile-accordion-head" onClick={() => toggleMobile("where")}>
          <span>Where to Start</span>
          <span style={{ transform: mobileAccordion === "where" ? "rotate(180deg)" : "rotate(0)", transition: "transform .2s" }}>▾</span>
        </button>
        {mobileAccordion === "where" && (
          <div className="mobile-accordion-body">
            {WHERE_ITEMS.map(d => (
              <button key={d.title} onClick={() => go(d.p, d.track)}>
                <span style={{ marginRight: 10 }}>{d.icon}</span>{d.title}
              </button>
            ))}
          </div>
        )}

        <button className="mobile-accordion-head" onClick={() => toggleMobile("platform")}>
          <span>Platform</span>
          <span style={{ transform: mobileAccordion === "platform" ? "rotate(180deg)" : "rotate(0)", transition: "transform .2s" }}>▾</span>
        </button>
        {mobileAccordion === "platform" && (
          <div className="mobile-accordion-body">
            {PLATFORM_ITEMS.map(([l, p]) => (
              <button key={p} className={page === p ? "on" : ""} onClick={() => go(p)}>{l}</button>
            ))}
          </div>
        )}

        <button className="mobile-accordion-head" onClick={() => toggleMobile("solutions")}>
          <span>Solutions</span>
          <span style={{ transform: mobileAccordion === "solutions" ? "rotate(180deg)" : "rotate(0)", transition: "transform .2s" }}>▾</span>
        </button>
        {mobileAccordion === "solutions" && (
          <div className="mobile-accordion-body">
            {SOLUTIONS_ITEMS.map(([l, p]) => (
              <button key={p} className={page === p ? "on" : ""} onClick={() => go(p)}>{l}</button>
            ))}
          </div>
        )}

        {FLAT_LINKS.map(([l, p, type]) => (
          type === "external" ? (
            <a key={p} href={p} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>{l}</a>
          ) : (
            <button key={p} className={page === p ? "on" : ""} onClick={() => go(p)}>{l}</button>
          )
        ))}
        <button className="mobile-cta" onClick={() => go("contact", "demo")}>Book a Demo</button>
      </div>
    </>
  );
};

export default Nav;
