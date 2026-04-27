import { HexMark } from './HexMark';

const NAV_COLUMNS = [
  ["AI Platform", [
    ["Forge","platform"], ["Atlas","platform"],
    ["Echo","platform"], ["Certify","platform"],
    ["InsiteX LMS","insitex"], ["AI Literacy Program","literacy"],
  ]],
  ["Services", [
    ["Advisory","advisory"], ["Content Development","content"],
    ["Proxa Labs","proxalab"],
  ]],
  ["Company", [
    ["About","about"], ["Contact","contact"],
  ]],
];

const QUICK_LINKS = [
  {l:"Book a Consult", p:"contact", track:"talk"},
  {l:"Book a Demo", p:"contact", track:"demo"},
];

const Footer = ({ setPage }) => {
  const go = (p, track) => {
    if (p === "contact" && track) window.location.hash = track;
    setPage(p);
  };

  return (
    <footer style={{ background: "#1A1D25", borderTop: "1px solid rgba(255,255,255,.06)" }}>
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
              <p style={{ fontSize: 14, color: "rgba(255,255,255,.3)", lineHeight: 1.72, maxWidth: 280, marginBottom: 20 }}>The AI-native platform and implementation partner built for the organizational complexity of biopharma commercial learning — not adapted for it.</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
                {QUICK_LINKS.map(b => (
                  <button key={b.l} onClick={() => go(b.p, b.track)} style={{ fontSize: 12, fontWeight: 600, padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,.1)", background: "none", color: "rgba(255,255,255,.4)", cursor: "pointer", fontFamily: "DM Sans,sans-serif" }}>{b.l}</button>
                ))}
              </div>
            </div>
            {/* Columns 2-4: Nav links */}
            {NAV_COLUMNS.map(([h, links]) => (
              <div key={h}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".09em", textTransform: "uppercase", color: "rgba(255,255,255,.28)", marginBottom: 16 }}>{h}</div>
                {links.map(([l, p]) => (
                  <div key={l} style={{ fontSize: 13.5, color: "rgba(255,255,255,.25)", marginBottom: 11, cursor: "pointer" }} onClick={() => go(p)}>{l}</div>
                ))}
              </div>
            ))}
          </div>
          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", paddingTop: 26, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.16)" }}>© 2026 InsiteHub, Inc. · Newark, DE · InsiteHub, Inc. is a Delaware S-Corp</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["SOC 2 Type II in progress","NIH Partner","Biopharma Native","University of Delaware Partner"].map(t => (
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
