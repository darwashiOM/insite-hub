const FOOTER_COLUMNS = [
  ["Platform", [
    ["AI Platform", "platform"],
    ["InsiteX LMS", "insitex"],
  ]],
  ["Solutions", [
    ["AI Literacy", "literacy"],
    ["Advisory", "advisory"],
    ["Content", "content"],
  ]],
  ["The Lab", [
    ["Overview", "proxalab"],
  ]],
  ["Resources", [
    ["Frameworks & Guides", "resources", "frameworks"],
    ["Research", "resources", "research"],
  ]],
  ["About", [
    ["About Proxa Labs", "about"],
  ]],
];

const CREDENTIALS = [
  { full: "SOC 2 Type II in progress", short: "SOC 2 in progress" },
];

const Footer = ({ setPage }) => {
  const go = (p, track) => {
    if (!p) return;
    setPage(p, track ? { hash: track } : undefined);
  };

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo-wrap" onClick={() => go("home")}>
              <img className="footer-logo-img" src="/assets/proxa_horiz_overdark.png" alt="Proxa Labs" />
            </div>
            <p className="footer-tagline">The AI-native platform and implementation partner built for the organizational complexity of biopharma commercial learning — not adapted for it.</p>
            <div className="footer-cta-row">
              <button className="footer-cta-primary" onClick={() => go("contact", "demo")}>Book a Demo</button>
              <button className="footer-cta-secondary" onClick={() => go("contact", "talk")}>Book a Consult</button>
            </div>
          </div>
          {FOOTER_COLUMNS.map(([h, links]) => (
            <div key={h} className="footer-col">
              <div className="footer-col-head">{h}</div>
              {links.map(([l, p, hash], i) => (
                <div
                  key={typeof l === "string" ? l : i}
                  className={"footer-col-link" + (p ? "" : " footer-col-link-disabled")}
                  onClick={() => go(p, hash)}
                >
                  {l}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="footer-divider" />

        <div className="footer-mid">
          <div className="footer-hq">
            <div className="footer-col-head">Headquarters</div>
            <div className="footer-hq-name">Newark, Delaware</div>
            <div className="footer-hq-addr">Proxa Labs LLC · 591 Collaboration Way, Suite 613</div>
          </div>
          <div className="footer-credentials">
            <div className="footer-col-head" style={{ textAlign: "right" }}>Credentials</div>
            <div className="footer-credentials-row">
              {CREDENTIALS.map(t => (
                <span key={t.full} className="footer-credential-pill">
                  <span className="footer-credential-full">{t.full}</span>
                  <span className="footer-credential-short">{t.short}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <div className="footer-copyright">© 2026 Proxa Labs LLC · Proxa Labs LLC is a Delaware limited liability company</div>
          <div className="footer-legal">
            <a href="/privacy" onClick={(e) => { e.preventDefault(); }}>Privacy Policy</a>
            <a href="/terms" onClick={(e) => { e.preventDefault(); }}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
