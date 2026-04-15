import EditorialHero from '../components/sections/EditorialHero';
import LongForm from '../components/sections/LongForm';
import ProductShowcase from '../components/sections/ProductShowcase';
import ComparisonRail from '../components/sections/ComparisonRail';
import SplitFeature from '../components/sections/SplitFeature';
import CTABand from '../components/sections/CTABand';
import ForgeShowcase from '../components/showcase/ForgeShowcase';
import AtlasShowcase from '../components/showcase/AtlasShowcase';
import EchoShowcase from '../components/showcase/EchoShowcase';
import CertifyShowcase from '../components/showcase/CertifyShowcase';
import LoopVisual from '../components/LoopVisual';
import LoopMobile from '../components/LoopMobile';

const COMPARISON_COLUMNS = [
  { label: "InsiteHub AI Platform", accent: "#F4801F" },
  { label: "Traditional LMS" },
];
const COMPARISON_ROWS = [
  { label: "Agentic content creation",                 values: [true,  false] },
  { label: "Real-time HCP roleplay assessment",        values: [true,  false] },
  { label: "Behavioral certification (not attendance)", values: [true,  false] },
  { label: "MLR-integrated authoring",                  values: [true,  "manual"] },
  { label: "Closed-loop gap remediation",              values: [true,  false] },
  { label: "SCORM / AICC compliance",                  values: [true,  true]  },
  { label: "Veeva integration",                        values: [true,  "partial"] },
  { label: "SOC 2 Type II",                            values: [true,  "partial"] },
];

export default function PlatformPage({ setPage }) {
  return (
    <>
      <EditorialHero
        dark
        eyebrow="AI-First Platform · Closed Loop"
        headline={<>One closed-loop AI platform for biopharma <em>commercial learning.</em></>}
        subhead="Forge builds content. Atlas delivers learning. Echo assesses readiness in HCP roleplay. Certify confirms behavioral competency. Every assessment failure feeds back into Forge to rebuild content automatically. No human handoffs."
        primaryCta={{ label: "Book a Demo", onClick: () => setPage("contact") }}
        secondaryLink={{ label: "Start with Advisory", onClick: () => setPage("advisory") }}
        visual={<div className="platform-loop-dark"><div className="hero-loop-desktop"><LoopVisual /></div><div className="hero-loop-mobile"><LoopMobile /></div></div>}
      />

      <LongForm
        eyebrow="The Closed Loop"
        heading="Why a closed loop matters."
        background="tinted"
      >
        <p>Most pharma learning platforms are unidirectional. Content flows from authors to learners, assessments measure who completed what, and that's where the loop ends. When a rep can't handle an HCP objection in the field, the platform never knows. The next cohort gets the same content. The same gaps appear again.</p>
        <p>InsiteHub's platform inverts this. Echo's behavioral assessments produce structured gap signals — specific competency areas where reps underperform against industry benchmarks. Those signals flow into Forge as a content brief. Forge's AI agents draft remediation content overnight, route through MLR pre-checks, and publish to Atlas before the next training cycle. The loop closes.</p>
        <p>This is the only platform in biopharma commercial learning that does this. Not because it's hard to build — because no one else has the closed-loop methodology behind it.</p>
      </LongForm>

      <ProductShowcase
        product="forge"
        eyebrow="InsiteHub Forge"
        tagline="Agentic content creation."
        body="AI agents build MLR-compliant training content from your PI, CSRs, and brand assets. Hours instead of months. Every claim cited to source. No instructional designer required for the first draft."
        bullets={[
          "Auto-generation from clinical data and PI",
          "Every claim cited — MLR artifacts auto-built",
          "Veeva PromoMats workflow integration",
          "Content Gap Analyzer feeds directly from Echo failures",
        ]}
        mockup={<ForgeShowcase />}
      />

      <ProductShowcase
        product="atlas"
        eyebrow="InsiteHub Atlas"
        tagline="AI-powered adaptive learning."
        body="Personalized learning pathways mapped to competencies and role requirements, with real-time gap detection that adjusts before reps reach the field."
        bullets={[
          "Competency-role mapping with behavioral rubrics",
          "Adaptive pathways that respond dynamically to gaps",
          "Manager dashboards with predictive readiness scoring",
          "Integrates with InsiteX LMS and Veeva",
        ]}
        mockup={<AtlasShowcase />}
        reverse
        background="tinted"
      />

      <ProductShowcase
        product="echo"
        eyebrow="InsiteHub Echo"
        tagline="AI roleplay & behavioral assessment."
        body="Live HCP roleplay with AI physician avatars and real-time compliance monitoring — flagging off-label language and unsupported claims before they become field issues."
        bullets={[
          "8 HCP digital twin avatars with behavioral models",
          "ComplianceGuard: real-time compliance flagging",
          "Behavioral scorecard + industry benchmarks",
          "Gap payload triggers Forge auto-rebuild pipeline",
        ]}
        mockup={<EchoShowcase />}
      />

      <ProductShowcase
        product="certify"
        eyebrow="Certify"
        tagline="Demonstrated field readiness."
        body="Certification earned through demonstrated behavioral competency — not attendance. Audit-ready records tied to specific evidence, retained for 10 years."
        bullets={[
          "Competency-gated — no attendance shortcuts",
          "Behavioral evidence for every issued certification",
          "SOC 2 Type II compliant, SHA-256 audit logs",
          "10-year retention for regulatory inspection",
        ]}
        mockup={<CertifyShowcase />}
        reverse
        background="tinted"
      />

      <ComparisonRail
        eyebrow="Why It's Different"
        heading="What InsiteHub does that traditional LMS can't."
        columns={COMPARISON_COLUMNS}
        rows={COMPARISON_ROWS}
      />

      <SplitFeature
        ratio="50-50"
        eyebrow="Not Ready for AI Yet?"
        heading="Start with InsiteX LMS."
        body="InsiteX is our enterprise learning management system — SCORM-compliant, Veeva-integrated, and built for life sciences teams that need a reliable platform today with a clear upgrade path to AI when the time is right."
        bullets={[
          "Full SCORM, AICC, and PMRC compliance",
          "Veeva, ServiceNow, and Workday integration",
          "Migration path to InsiteHub AI when ready",
        ]}
        cta={{ label: "Learn About InsiteX", onClick: () => setPage("insitex") }}
        visual={
          <div style={{ background: "linear-gradient(135deg, #FFFAF6, #FFF4E8)", border: "1.5px solid rgba(244,128,31,.18)", borderRadius: 20, padding: 32, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#F4801F", marginBottom: 10 }}>Traditional LMS</div>
            <div style={{ fontFamily: "Manrope,sans-serif", fontSize: 22, fontWeight: 800, color: "#12141A", letterSpacing: "-.035em", marginBottom: 12, lineHeight: 1.2 }}>Enterprise learning. Built for biopharma.</div>
            <div style={{ fontSize: 13, color: "#5C6370", lineHeight: 1.6 }}>4+ years serving biopharma. 30+ pharma & health system clients. SOC 2 Type II in progress.</div>
          </div>
        }
        background="tinted"
      />

      <CTABand
        heading={<>See the closed loop <em>in action.</em></>}
        body="We'll walk you through Forge, Atlas, and Echo in the context of your commercial organization — not a generic product tour."
        primaryCta={{ label: "Book a Demo", onClick: () => setPage("contact") }}
        secondaryLink={{ label: "Start with Advisory", onClick: () => setPage("advisory") }}
      />
    </>
  );
}
