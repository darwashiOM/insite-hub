import EditorialHero from '../components/sections/EditorialHero';
import LongForm from '../components/sections/LongForm';
import CardGrid from '../components/sections/CardGrid';
import UpgradeComparison from '../components/sections/UpgradeComparison';
import CTABand from '../components/sections/CTABand';
import Icon from '../components/Icon';

const PROOF_NUMBERS = [
  { n: "4+",  l: "Years serving biopharma" },
  { n: "30+", l: "Pharma & health system clients" },
];

const CREDENTIALS = [
  { name: "SCORM, AICC, and PMRC",       status: "Compliant",       tone: "live" },
  { name: "SOC 2 Type II",               status: "In progress",     tone: "live" },
  { name: "Veeva PromoMats integration", status: "Native",          tone: "live" },
  { name: "Enterprise SSO + RBAC",       status: "SAML 2.0 / OIDC", tone: "live" },
];

const CAPABILITIES = [
  { icon: <Icon name="lms" size={22} />,           title: "SCORM, AICC, and PMRC compliance", body: "All major pharma content standards supported out of the box. Drop in your existing libraries. No migration project." },
  { icon: <Icon name="audit" size={22} />,         title: "Credentialing + audit trails",     body: "Role-based credential tracking with full audit trails for regulatory inspection. 10-year retention, SHA-256 immutable logs." },
  { icon: <Icon name="governance" size={22} />,    title: "Veeva integration",                body: "Native bi-directional integration with Veeva PromoMats and Vault. Content state syncs automatically, both directions." },
  { icon: <Icon name="infrastructure" size={22} />, title: "Enterprise SSO + RBAC",           body: "SAML 2.0 and OIDC SSO. Granular role-based permissions across L&D, content, compliance, and IT teams." },
  { icon: <Icon name="content" size={22} />,        title: "Content lifecycle workflows",     body: "MLR routing, version control, and expiration tracking — built around how pharma content actually moves through approval." },
  { icon: <Icon name="readiness" size={22} />,     title: "Manager dashboards + reporting",   body: "Live readiness reporting by team, region, and competency. Pre-built reports for the CCO scorecard, training compliance, and certification expiration tracking." },
];

function InsiteXProofPanel() {
  return (
    <section className="insitex-proof">
      <div className="insitex-proof-glow" aria-hidden="true" />
      <div className="insitex-proof-inner">
        <div className="insitex-proof-numbers">
          <div className="insitex-proof-label">By the Numbers</div>
          <div className="insitex-proof-number-row">
            {PROOF_NUMBERS.map(s => (
              <div key={s.n} className="insitex-proof-stat">
                <div className="insitex-proof-n">{s.n}</div>
                <div className="insitex-proof-l">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="insitex-proof-divider" aria-hidden="true" />
        <div className="insitex-proof-creds">
          <div className="insitex-proof-label">Credentials & Compliance</div>
          <ul className="insitex-cred-list">
            {CREDENTIALS.map(c => (
              <li key={c.name} className="insitex-cred-row">
                <span className={`insitex-cred-check insitex-cred-check-${c.tone}`} aria-hidden="true">
                  {c.tone === 'progress' ? (
                    <svg width="11" height="11" viewBox="0 0 12 12"><circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="20 12" strokeLinecap="round" /></svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2.5 6.2 L5 8.6 L9.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  )}
                </span>
                <div className="insitex-cred-text">
                  <strong>{c.name}</strong>
                  <span className="insitex-cred-sep">·</span>
                  <span className={`insitex-cred-status insitex-cred-status-${c.tone}`}>{c.status}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function InsiteXPage({ setPage }) {
  return (
    <>
      <EditorialHero
        eyebrow="InsiteX LMS · Enterprise Learning Infrastructure"
        headline={<>The LMS that becomes <em>the AI foundation.</em></>}
        subhead="InsiteX is the enterprise learning platform underneath InsiteHub's AI. Purpose-built for biopharma — SCORM, AICC, and PMRC compliance, Veeva integration, credentialing workflows, and 10-year audit trails. When your organization is ready for AI, Forge, Atlas, and Echo layer on top. No migration. No rip-and-replace."
        primaryCta={{ label: "Book a Demo", onClick: () => setPage("contact") }}
      />

      <LongForm
        eyebrow="When InsiteX Is the Right Choice"
        heading="Not every team is ready for AI. InsiteX is built for where you actually are."
      >
        <p>If your organization needs reliable enterprise learning infrastructure today — with compliance built in, Veeva integration working, and credentialing audit-ready — InsiteX is purpose-built for it. When your organization is ready for AI, Forge, Atlas, and Echo layer on top of the same system. Your learners, your content, your audit trail all carry forward.</p>
      </LongForm>

      <InsiteXProofPanel />

      <CardGrid
        eyebrow="Six Capability Areas"
        heading="Everything biopharma L&D actually needs from an LMS."
        columns={2}
        cards={CAPABILITIES}
        cardStyle="standard"
        background="tinted"
      />

      <UpgradeComparison
        eyebrow="Pick Your Starting Point"
        heading={<>Pick the right starting point.<br />Upgrade when you're ready.</>}
        lead="InsiteX is the LMS foundation. The AI Platform adds Forge, Atlas, Echo, and Certify on top. Same system, different readiness — and when you're ready to bridge them, the integration is native."
      />

      <CTABand
        heading={<>Get the LMS that becomes <em>the AI foundation.</em></>}
        body="Bring your launch calendar to the demo. We'll show you your existing content library inside InsiteX, and map what the upgrade path to AI looks like over the next 18 months."
        primaryCta={{ label: "Book a Demo", onClick: () => setPage("contact") }}
      />
    </>
  );
}
