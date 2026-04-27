import EditorialHero from '../components/sections/EditorialHero';
import ProductShowcase from '../components/sections/ProductShowcase';
import ComparisonRail from '../components/sections/ComparisonRail';
import SplitFeature from '../components/sections/SplitFeature';
import CTABand from '../components/sections/CTABand';
import ForgeShowcase from '../components/showcase/ForgeShowcase';
import AtlasShowcase from '../components/showcase/AtlasShowcase';
import EchoShowcase from '../components/showcase/EchoShowcase';
import CertifyShowcase from '../components/showcase/CertifyShowcase';
import closedLoopOval from '../../insitehub_closed_loop_oval.svg';

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
        eyebrow="AI Platform · Closed Loop"
        headline={<>One platform. Four products. <em>A closed loop that never breaks.</em></>}
        subhead="Forge builds MLR-compliant content. Atlas delivers adaptive learning. Echo assesses readiness in live HCP roleplay. Certify confirms behavioral competency. When a rep falls short, the system rebuilds the content automatically — no human handoffs, no stalled remediation cycles."
        primaryCta={{ label: "Book a Demo", onClick: () => setPage("contact") }}
      />

      <section className="section section-light">
        <div className="mw">
          <div className="platform-loop-header">
            <div className="t-eyebrow">The Closed Loop</div>
            <h2 className="t-h2">Build → Deliver → Assess → Certify → Repeat. Most learning platforms stop where ours begins.</h2>
            <p className="t-lead">Forge builds the content. Atlas delivers the learning. Echo assesses the readiness. Certify verifies the competency. When a gap appears, the loop closes itself.</p>
          </div>
          <div className="platform-loop-slice">
            <div className="platform-loop-visual">
              <img src={closedLoopOval} alt="InsiteHub closed-loop AI platform diagram" />
            </div>
            <div className="platform-loop-copy">
              <p>Most pharma learning platforms are one-way. Content flows from authors to learners, assessments measure completion, and that's where the loop ends. When a rep can't handle an HCP objection in the field, the platform doesn't know. The next cohort gets the same content. The same gaps appear.</p>
              <p>InsiteHub inverts the sequence. Echo's behavioral assessments surface structured gap signals — specific competencies where reps underperform against benchmarks. Those signals flow into Forge as a content brief. Forge drafts remediation content overnight, routes it through MLR pre-checks, and publishes to Atlas before the next training cycle. The loop closes itself.</p>
              <p>No other platform in biopharma commercial learning does this. Not because it's hard to build, but because no one else has the methodology behind it.</p>
            </div>
          </div>
        </div>
      </section>

      <ProductShowcase
        id="forge"
        product="forge"
        eyebrow="Forge"
        tagline="Agentic content creation."
        body="AI agents build MLR-compliant training content from your PI, CSRs, and brand assets — every claim cited to source. Hours, not months. No instructional designer required to get to a first draft."
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
        eyebrow="Atlas"
        tagline="AI-powered adaptive learning."
        body="Personalized learning pathways mapped to competencies and role requirements. Real-time gap detection adjusts the path before reps reach the field."
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
        eyebrow="Echo"
        tagline="AI roleplay & behavioral assessment."
        body="Live HCP roleplay with AI physician avatars. Real-time compliance monitoring flags off-label language and unsupported claims before they reach the field."
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
        body="Certification earned through behavioral competency, not attendance. Every record is audit-ready, tied to specific behavioral evidence, and retained for 10 years."
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
        heading="What a closed-loop platform does that a traditional LMS can't."
        columns={COMPARISON_COLUMNS}
        rows={COMPARISON_ROWS}
      />

      <SplitFeature
        ratio="50-50"
        eyebrow="Not Ready for AI Yet"
        heading="Start with the LMS. Add AI when you're ready."
        body="InsiteX is our enterprise LMS — SCORM-compliant, Veeva-integrated, and built for life sciences teams that need a reliable platform today. When the organization is ready for AI, Forge, Atlas, and Echo layer on top. No migration project. No rip-and-replace."
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
      />
    </>
  );
}
