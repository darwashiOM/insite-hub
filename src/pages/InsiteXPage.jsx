import EditorialHero from '../components/sections/EditorialHero';
import SplitFeature from '../components/sections/SplitFeature';
import CardGrid from '../components/sections/CardGrid';
import StatBand from '../components/sections/StatBand';
import CTABand from '../components/sections/CTABand';
import Icon from '../components/Icon';

const CAPABILITIES = [
  { icon: <Icon name="lms" size={22} />,           title: "SCORM, AICC, and PMRC compliance", body: "All major pharma content standards supported out of the box. Drop in your existing libraries. No migration project." },
  { icon: <Icon name="audit" size={22} />,         title: "Credentialing + audit trails",     body: "Role-based credential tracking with full audit trails for regulatory inspection. 10-year retention, SHA-256 immutable logs." },
  { icon: <Icon name="governance" size={22} />,    title: "Veeva integration",                body: "Native bi-directional integration with Veeva PromoMats and Vault. Content state syncs automatically, both directions." },
  { icon: <Icon name="infrastructure" size={22} />, title: "Enterprise SSO + RBAC",           body: "SAML 2.0 and OIDC SSO. Granular role-based permissions across L&D, content, compliance, and IT teams." },
  { icon: <Icon name="content" size={22} />,        title: "Content lifecycle workflows",     body: "MLR routing, version control, and expiration tracking — built around how pharma content actually moves through approval." },
  { icon: <Icon name="readiness" size={22} />,     title: "Manager dashboards + reporting",   body: "Live readiness reporting by team, region, and competency. Pre-built reports for the CCO scorecard, training compliance, and certification expiration tracking." },
];

const COMPARISON_COLUMNS = [
  { label: "InsiteX LMS", accent: "#F4801F" },
  { label: "InsiteHub AI Platform", accent: "#7C3AED" },
];
const COMPARISON_ROWS = [
  { label: "SCORM / AICC content delivery",        values: [true,  true] },
  { label: "Credential + audit trail",             values: [true,  true] },
  { label: "Veeva integration",                    values: [true,  true] },
  { label: "Enterprise SSO + RBAC",                values: [true,  true] },
  { label: "Agentic AI content creation (Forge)",  values: [false, true] },
  { label: "AI roleplay assessment (Echo)",        values: [false, true] },
  { label: "Behavioral certification (Certify)",   values: [false, true] },
  { label: "Closed-loop gap remediation",          values: [false, true] },
  { label: "Best for",                              values: ["Best for teams that need a reliable LMS today.", "Best for teams with an AI mandate now."] },
];

const TRANSITIONS = [
  { from: "InsiteX", to: "Atlas",          body: "Existing learner records flow from InsiteX into Atlas adaptive pathways. No data migration." },
  { from: "Forge",   to: "InsiteX Library", body: "Forge-generated content publishes straight into your InsiteX content library. Teams keep working in the LMS they already know." },
  { from: "Echo",    to: "InsiteX Records", body: "Echo assessment outcomes log to InsiteX as completion and competency records, audit-ready." },
];

const INSITEX_STATS = [
  { n: "4+", l: "Years serving biopharma" },
  { n: "30+", l: "Pharma & health system clients" },
  { n: "SCORM, AICC, and PMRC", l: "compliance" },
  { n: "SOC 2", l: "Type II in progress" },
];

export default function InsiteXPage({ setPage }) {
  return (
    <>
      <EditorialHero
        dark
        eyebrow="InsiteX LMS · Enterprise Learning Infrastructure"
        headline={<>The LMS that becomes <em>the AI foundation.</em></>}
        subhead="InsiteX is the enterprise learning platform underneath InsiteHub's AI. Purpose-built for biopharma — SCORM, AICC, and PMRC compliance, Veeva integration, credentialing workflows, and 10-year audit trails. When your organization is ready for AI, Forge, Atlas, and Echo layer on top. No migration. No rip-and-replace."
        primaryCta={{ label: "Book a Demo", onClick: () => setPage("contact") }}
      />

      <SplitFeature
        ratio="50-50"
        eyebrow="When InsiteX Is the Right Choice"
        heading="Not every team is ready for AI. InsiteX is built for where you actually are."
        body="If your organization needs reliable enterprise learning infrastructure today — with compliance built in, Veeva integration working, and credentialing audit-ready — InsiteX is purpose-built for it. When your organization is ready for AI, Forge, Atlas, and Echo layer on top of the same system. Your learners, your content, your audit trail all carry forward."
        bullets={[
          "4+ years serving biopharma",
          "30+ pharma & health system clients",
          "SCORM, AICC, and PMRC compliance",
          "SOC 2 Type II in progress",
        ]}
        visual={
          <div style={{ background: "linear-gradient(135deg, #FFFAF6, #FFF4E8)", border: "1.5px solid rgba(244,128,31,.18)", borderRadius: 20, padding: 32 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#F4801F", marginBottom: 10 }}>InsiteX LMS</div>
            <div style={{ fontFamily: "Manrope,sans-serif", fontSize: 24, fontWeight: 800, color: "#12141A", letterSpacing: "-.035em", marginBottom: 14, lineHeight: 1.15 }}>Compliance-ready infrastructure today. AI-ready architecture tomorrow.</div>
            <div style={{ fontSize: 13, color: "#5C6370", lineHeight: 1.65 }}>Use InsiteX as the operating layer for learning records, content libraries, credentialing, and audit trails before adding closed-loop AI.</div>
          </div>
        }
      />

      <StatBand stats={INSITEX_STATS} tone="light" />

      <CardGrid
        eyebrow="Six Capability Areas"
        heading="Everything biopharma L&D actually needs from an LMS."
        columns={2}
        cards={CAPABILITIES}
        cardStyle="standard"
        background="tinted"
      />

      <section className="section section-light">
        <div className="mw">
          <div className="insitex-platform-header">
            <div className="t-eyebrow">InsiteX + The AI Platform</div>
            <h2 className="t-h2">Pick the right starting point. Upgrade when you're ready.</h2>
            <p className="t-lead">InsiteX is the LMS foundation. The AI Platform adds Forge, Atlas, Echo, and Certify on top. Same system, different readiness — and when you're ready to bridge them, the integration is native.</p>
          </div>
          <div className="comparison-rail" style={{ '--cmp-cols': COMPARISON_COLUMNS.length }}>
            <div className="comparison-rail-head">
              <div className="comparison-rail-cell comparison-rail-feature-label" />
              {COMPARISON_COLUMNS.map(c => (
                <div key={c.label} className="comparison-rail-cell comparison-rail-col-head" style={{ color: c.accent }}>{c.label}</div>
              ))}
            </div>
            {COMPARISON_ROWS.map((r, i) => (
              <div key={i} className="comparison-rail-row">
                <div className="comparison-rail-cell comparison-rail-feature-label">{r.label}</div>
                {r.values.map((v, j) => (
                  <div key={j} className="comparison-rail-cell">
                    {v === true && <span className="comparison-yes">✓</span>}
                    {v === false && <span className="comparison-no">—</span>}
                    {typeof v === 'string' && <span style={{ fontSize: 13, color: 'var(--bd)' }}>{v}</span>}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <p className="insitex-bridge-intro">Here's how your InsiteX data flows into the AI Platform when you're ready.</p>
          <div className="insitex-bridge-grid">
            {TRANSITIONS.map(t => (
              <div key={t.from + t.to} className="insitex-bridge-card">
                <div className="insitex-bridge-route">
                  <span>{t.from}</span>
                  <span>→</span>
                  <span>{t.to}</span>
                </div>
                <div className="insitex-bridge-body">{t.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        heading={<>Get the LMS that becomes <em>the AI foundation.</em></>}
        body="Bring your launch calendar to the demo. We'll show you your existing content library inside InsiteX, and map what the upgrade path to AI looks like over the next 18 months."
        primaryCta={{ label: "Book a Demo", onClick: () => setPage("contact") }}
      />
    </>
  );
}
