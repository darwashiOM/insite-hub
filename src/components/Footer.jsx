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
