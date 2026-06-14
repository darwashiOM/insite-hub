const PREVIEWS = [
  { c: "#f5825f", name: "Proxa Labs Forge", sub: "Content creation agent session",
    rows: [
      { label: "Launch Content Agent",  pct: 88,  c: "#f5825f", bg: "rgba(245,130,95,.12)" },
      { label: "MLR citation check",     pct: 100, c: "#9ca979", bg: "rgba(156,169,121,.12)" },
      { label: "Veeva routing queued",   pct: 62,  c: "#75abc0", bg: "rgba(117,171,192,.12)" },
    ],
    status: "3 artifacts ready for MLR review" },
  { c: "#9ca979", name: "Proxa Labs Cue", sub: "Rep pathway dashboard",
    rows: [
      { label: "Sarah Chen · Oncology pathway", pct: 74,  c: "#75abc0", bg: "rgba(117,171,192,.12)" },
      { label: "Knowledge gap detected · MOA",  pct: 41,  c: "#F59E0B", bg: "rgba(245,158,11,.12)" },
      { label: "Stage readiness threshold",       pct: 90,  c: "#9ca979", bg: "rgba(156,169,121,.12)" },
    ],
    status: "Stage assessment unlocked" },
  { c: "#5e6b7a", name: "Proxa Labs Stage", sub: "HCP roleplay session · Dr. Kim",
    rows: [
      { label: "Clinical accuracy score",     pct: 82,  c: "#5e6b7a", bg: "rgba(94,107,122,.12)" },
      { label: "Compliance guard · clean",     pct: 100, c: "#9ca979", bg: "rgba(156,169,121,.12)" },
      { label: "Objection handling",           pct: 67,  c: "#F59E0B", bg: "rgba(245,158,11,.12)" },
    ],
    status: "Scorecard generating…" },
  { c: "#75abc0", name: "Trace", sub: "Certification audit record",
    rows: [
      { label: "Competency threshold met",   pct: 100, c: "#9ca979", bg: "rgba(156,169,121,.12)" },
      { label: "Behavioral evidence logged", pct: 100, c: "#9ca979", bg: "rgba(156,169,121,.12)" },
      { label: "SHA-256 audit trail",         pct: 100, c: "#9ca979", bg: "rgba(156,169,121,.12)" },
    ],
    status: "Certification issued · 10yr record" },
];

export default function PlatformPreviews({ eyebrow = "Platform Previews", heading = "What it looks like inside." }) {
  return (
    <section className="section section-light">
      <div className="mw">
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          {eyebrow && <div className="t-eyebrow" style={{ marginBottom: 10 }}>{eyebrow}</div>}
          {heading && <h2 className="t-h2">{heading}</h2>}
        </div>
        <div className="platform-previews-grid">
          {PREVIEWS.map(p => (
            <div key={p.name} className="prod-preview">
              <div className="pp-topbar">
                {["#FF5F57", "#FEBC2E", "#28C840"].map(c => <div key={c} className="pp-dot" style={{ background: c }} />)}
                <div style={{ marginLeft: 8, fontSize: 11, color: "rgba(255,255,255,.28)", fontFamily: "DM Sans,sans-serif" }}>{p.name} · {p.sub}</div>
              </div>
              <div className="pp-content">
                <div style={{ fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: p.c, fontWeight: 700, marginBottom: 12, opacity: .85 }}>{p.sub}</div>
                {p.rows.map(r => (
                  <div key={r.label} className="pp-row" style={{ background: r.bg }}>
                    <div className="pp-label" style={{ color: "rgba(255,255,255,.72)", minWidth: 180, fontSize: 11 }}>{r.label}</div>
                    <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,.08)", borderRadius: 2 }}>
                      <div className="pp-bar" style={{ width: r.pct + "%", background: r.c, opacity: .85 }} />
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,.42)", minWidth: 32, textAlign: "right" }}>{r.pct}%</div>
                  </div>
                ))}
                <div style={{ marginTop: 14, padding: "8px 12px", background: "rgba(255,255,255,.03)", borderRadius: 8, border: "1px solid rgba(255,255,255,.06)", fontSize: 11, color: p.c, fontWeight: 600 }}>⬤ {p.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
