import EditorialHero from '../components/sections/EditorialHero';
import LongForm from '../components/sections/LongForm';
import CardGrid from '../components/sections/CardGrid';
import UpgradeComparison from '../components/sections/UpgradeComparison';
import CTABand from '../components/sections/CTABand';
import Icon from '../components/Icon';
import { usePageContent } from '../lib/content';

// Plain-text defaults for the headings that carry inline markup. While the
// content value equals one of these, the page renders the rich JSX version;
// once overridden in the CMS, it renders the (plain) override string. Keep these
// in sync with the matching `default`s in src/content/pages/insitex.js.
const HERO_HEADLINE_DEFAULT = 'The LMS that becomes the AI foundation.';
const UPGRADE_HEADING_DEFAULT = "Pick the right starting point. Upgrade when you're ready.";
const CTA_HEADING_DEFAULT = 'Get the LMS that becomes the AI foundation.';

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
  const c = usePageContent('insitex');

  // Headings with inline markup: keep the rich JSX default, render plain string
  // when overridden.
  const heroH = c('hero.headline');
  const heroHeadline = heroH === HERO_HEADLINE_DEFAULT
    ? <>The LMS that becomes <em>the AI foundation.</em></>
    : heroH;
  const upgradeH = c('upgrade.heading');
  const upgradeHeading = upgradeH === UPGRADE_HEADING_DEFAULT
    ? <>Pick the right starting point.<br />Upgrade when you're ready.</>
    : upgradeH;
  const ctaH = c('cta.heading');
  const ctaHeading = ctaH === CTA_HEADING_DEFAULT
    ? <>Get the LMS that becomes <em>the AI foundation.</em></>
    : ctaH;

  // Capability cards keep their in-code icons; title/body are CMS-overridable.
  const capabilityCards = CAPABILITIES.map((card, i) => ({
    ...card,
    title: c(`capabilities.cards.${i}.title`),
    body: c(`capabilities.cards.${i}.body`),
  }));

  return (
    <>
      <EditorialHero
        eyebrow={c('hero.eyebrow')}
        headline={heroHeadline}
        subhead={c('hero.subhead')}
        primaryCta={{ label: c('hero.ctaLabel'), onClick: () => setPage("contact") }}
      />

      <LongForm
        eyebrow={c('whenRight.eyebrow')}
        heading={c('whenRight.heading')}
      >
        <p>{c('whenRight.body')}</p>
      </LongForm>

      <InsiteXProofPanel />

      <CardGrid
        eyebrow={c('capabilities.eyebrow')}
        heading={c('capabilities.heading')}
        columns={2}
        cards={capabilityCards}
        cardStyle="standard"
        background="tinted"
      />

      <UpgradeComparison
        eyebrow={c('upgrade.eyebrow')}
        heading={upgradeHeading}
        lead={c('upgrade.lead')}
      />

      <CTABand
        heading={ctaHeading}
        body={c('cta.body')}
        primaryCta={{ label: c('cta.ctaLabel'), onClick: () => setPage("contact") }}
      />
    </>
  );
}
