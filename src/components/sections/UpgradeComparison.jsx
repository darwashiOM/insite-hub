const COLUMNS = [
  { label: "Traditional LMS", type: "traditional" },
  { label: "InsiteX LMS", type: "insitehub" },
  { label: "InsiteHub AI Platform", type: "insitehub" },
];

const ROWS = [
  { label: "SCORM / AICC content delivery", values: [true, true, true] },
  { label: "Credential + audit trail", values: ["partial", true, true] },
  { label: "Veeva integration", values: ["partial", true, true] },
  { label: "Enterprise SSO + RBAC", values: [true, true, true] },
  { label: "Agentic AI content creation (Forge)", values: [false, false, true] },
  { label: "AI roleplay assessment (Echo)", values: [false, false, true] },
  { label: "Behavioral certification (Certify)", values: [false, false, true] },
  { label: "Closed-loop gap remediation", values: [false, false, true] },
  {
    label: "Best for",
    values: [
      "Teams without pharma compliance needs",
      "Teams that need a reliable LMS today",
      "Teams with an AI mandate now",
    ],
    emphasis: true,
  },
];

const FLOWS = [
  { from: "InsiteX", to: "Atlas", body: "Existing learner records flow from InsiteX into Atlas adaptive pathways. No data migration." },
  { from: "Forge", to: "InsiteX Library", body: "Forge-generated content publishes straight into your InsiteX content library. Teams keep working in the LMS they already know." },
  { from: "Echo", to: "InsiteX Records", body: "Echo assessment outcomes log to InsiteX as completion and competency records, audit-ready." },
];

function ComparisonValue({ value, columnType, emphasis }) {
  if (value === true) {
    return <span className={columnType === "insitehub" ? "comparison-yes" : "comparison-yes comparison-yes-dark"}>✓</span>;
  }
  if (value === false) {
    return <span className="comparison-no">—</span>;
  }
  if (value === "partial") {
    return <span className="comparison-partial">partial</span>;
  }
  return <span className={emphasis ? "upgrade-best-for" : "comparison-text"}>{value}</span>;
}

export default function UpgradeComparison({ eyebrow, heading, lead }) {
  return (
    <section className="section section-light">
      <div className="mw">
        <div className="upgrade-comparison-header">
          {eyebrow && <div className="t-eyebrow">{eyebrow}</div>}
          {heading && <h2 className="t-h2">{heading}</h2>}
          {lead && <p className="t-lead">{lead}</p>}
        </div>

        <div className="upgrade-comparison-shell">
          <div className="comparison-rail upgrade-comparison-table" style={{ "--cmp-cols": COLUMNS.length }}>
            <div className="comparison-rail-head">
              <div className="comparison-rail-cell comparison-rail-feature-label">Capability</div>
              {COLUMNS.map(column => (
                <div key={column.label} className={column.type === "insitehub" ? "comparison-rail-cell comparison-rail-col-head comparison-rail-col-head-insitehub" : "comparison-rail-cell comparison-rail-col-head"}>
                  {column.label}
                </div>
              ))}
            </div>
            {ROWS.map(row => (
              <div key={row.label} className={row.emphasis ? "comparison-rail-row upgrade-best-row" : "comparison-rail-row"}>
                <div className="comparison-rail-cell comparison-rail-feature-label">{row.label}</div>
                {row.values.map((value, index) => (
                  <div key={COLUMNS[index].label} className="comparison-rail-cell">
                    <ComparisonValue value={value} columnType={COLUMNS[index].type} emphasis={row.emphasis} />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="upgrade-flow-strip">
            <div className="t-eyebrow">When You Upgrade</div>
            <h3>Your InsiteX data flows into the AI Platform natively.</h3>
            <div className="upgrade-flow-grid">
              {FLOWS.map(flow => (
                <div key={flow.from + flow.to} className="upgrade-flow-card">
                  <div className="upgrade-flow-route">
                    <span>{flow.from}</span>
                    <span>→</span>
                    <span>{flow.to}</span>
                  </div>
                  <p>{flow.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
