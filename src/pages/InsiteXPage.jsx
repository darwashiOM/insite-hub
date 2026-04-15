import EditorialHero from '../components/sections/EditorialHero';
import SplitFeature from '../components/sections/SplitFeature';
import CardGrid from '../components/sections/CardGrid';
import ComparisonRail from '../components/sections/ComparisonRail';
import CTABand from '../components/sections/CTABand';
import Icon from '../components/Icon';

const CAPABILITIES = [
  { icon: <Icon name="lms" size={22} />,           title: "SCORM, AICC, PMRC compliant",      body: "All major pharma content standards supported out of the box. Drop-in compatibility with existing libraries — no migration project required." },
  { icon: <Icon name="audit" size={22} />,         title: "Credentialing + audit trails",     body: "Role-based credential tracking with full audit trail for regulatory inspection. 10-year retention. SHA-256 immutable logs." },
  { icon: <Icon name="governance" size={22} />,    title: "Veeva integration",                 body: "Native bi-directional integration with Veeva PromoMats and Vault. Content state syncs both directions automatically." },
  { icon: <Icon name="infrastructure" size={22} />, title: "Enterprise SSO + RBAC",            body: "SAML 2.0 + OIDC SSO support. Granular role-based permissions for L&D, content, compliance, and IT teams." },
  { icon: <Icon name="content" size={22} />,        title: "Content lifecycle workflows",      body: "MLR routing, version control, expiration tracking. Built around how pharma content actually moves through approval." },
  { icon: <Icon name="readiness" size={22} />,     title: "Manager dashboards + reporting",    body: "Live readiness reporting by team, region, and competency. Pre-built reports for the CCO scorecard, training compliance, and certification expiration." },
];

const COMPARISON_COLUMNS = [
  { label: "InsiteX LMS", accent: "#F4801F" },
  { label: "AI Platform", accent: "#7C3AED" },
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
  { label: "Best for",                              values: ["Today: stable LMS", "Today: AI mandate"] },
];

const TRANSITIONS = [
  { from: "InsiteX", to: "Atlas",          body: "Existing InsiteX learner records carry forward into Atlas adaptive pathways. No data migration." },
  { from: "Forge",   to: "InsiteX Library", body: "Forge-generated content publishes into your existing InsiteX content library. Teams keep working in the LMS they know." },
  { from: "Echo",    to: "InsiteX Records", body: "Echo behavioral assessment outcomes log to InsiteX as completion + competency records, audit-ready." },
];

export default function InsiteXPage({ setPage }) {
  return (
    <>
      <EditorialHero
        dark
        eyebrow="InsiteX LMS · Enterprise Learning Infrastructure"
        headline={<>Enterprise learning. <em>Built for biopharma.</em></>}
        subhead="A cloud-based learning platform with the compliance architecture, credentialing workflows, and content controls life sciences requires. The foundation the AI platform builds on — and the upgrade path is seamless when your team is ready."
        primaryCta={{ label: "Request a Demo", onClick: () => setPage("contact") }}
        secondaryLink={{ label: "See the AI Platform", onClick: () => setPage("platform") }}
      />

      <SplitFeature
        ratio="50-50"
        eyebrow="When InsiteX Is the Right Choice"
        heading="Not every team is ready for AI. That's fine."
        body="If your organization needs reliable enterprise learning infrastructure today — with compliance built in, Veeva integration working, and credentialing audit-ready — InsiteX is purpose-built for it. The AI platform layers on top when you're ready, without rip-and-replace."
        bullets={[
          "4+ years serving biopharma",
          "30+ pharma & health system clients",
          "SCORM / AICC / PMRC compliant",
          "SOC 2 Type II in progress",
        ]}
        cta={{ label: "Talk to Sales", onClick: () => setPage("contact") }}
        visual={
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[{n:"4+",l:"Years serving biopharma"},{n:"30+",l:"Pharma & health system clients"},{n:"SCORM / AICC",l:"& PMRC compliant"},{n:"SOC 2",l:"Type II in progress"}].map(s=>(
              <div key={s.n} style={{display:"flex",alignItems:"center",gap:16,padding:"14px 18px",background:"#fff",borderRadius:12,border:"1px solid rgba(244,128,31,.12)"}}>
                <div style={{fontSize:22,fontWeight:900,color:"#F4801F",fontFamily:"Manrope,sans-serif",letterSpacing:"-.04em",minWidth:80}}>{s.n}</div>
                <div style={{fontSize:13,color:"#5C6370"}}>{s.l}</div>
              </div>
            ))}
          </div>
        }
      />

      <CardGrid
        eyebrow="Six Capability Areas"
        heading="Everything biopharma L&D actually needs from an LMS."
        columns={2}
        cards={CAPABILITIES}
        cardStyle="standard"
        background="tinted"
      />

      <ComparisonRail
        eyebrow="InsiteX vs AI Platform"
        heading="Pick the right starting point."
        columns={COMPARISON_COLUMNS}
        rows={COMPARISON_ROWS}
      />

      <SplitFeature
        ratio="60-40"
        eyebrow="When You're Ready for AI"
        heading="The upgrade path is built in."
        body="Every InsiteX deployment is designed as the foundation layer for the AI platform. When your team is ready to add Forge, Atlas, or Echo, the integration is native — no migration, no re-platforming. Existing learner records, credentials, and content libraries flow forward automatically."
        cta={{ label: "See the AI Platform", onClick: () => setPage("platform") }}
        visual={
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {TRANSITIONS.map(t => (
              <div key={t.from + t.to} style={{ background: "linear-gradient(90deg, rgba(244,128,31,.06) 0%, rgba(124,58,237,.06) 100%)", border: "1.5px solid rgba(244,128,31,.18)", borderRadius: 12, padding: 18, display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#F4801F", fontFamily: "Manrope,sans-serif" }}>{t.from}</div>
                <div style={{ color: "#7C3AED", fontWeight: 800 }}>→</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#7C3AED", fontFamily: "Manrope,sans-serif" }}>{t.to}</div>
                <div style={{ fontSize: 12, color: "#5C6370", marginLeft: "auto", maxWidth: 280, textAlign: "right" }}>{t.body}</div>
              </div>
            ))}
          </div>
        }
        background="tinted"
        reverse
      />

      <CTABand
        heading={<>Get the LMS that becomes <em>the AI foundation.</em></>}
        body="Demo InsiteX with your launch calendar in mind. We'll show you what your existing content library looks like inside, and what the upgrade path to AI would look like in 18 months."
        primaryCta={{ label: "Request a Demo", onClick: () => setPage("contact") }}
        secondaryLink={{ label: "Talk Strategy First", onClick: () => setPage("advisory") }}
      />
    </>
  );
}
