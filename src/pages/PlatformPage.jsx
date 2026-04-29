import EditorialHero from '../components/sections/EditorialHero';
import ProductShowcase from '../components/sections/ProductShowcase';
import UpgradeComparison from '../components/sections/UpgradeComparison';
import CTABand from '../components/sections/CTABand';
import ForgeShowcase from '../components/showcase/ForgeShowcase';
import AtlasShowcase from '../components/showcase/AtlasShowcase';
import EchoShowcase from '../components/showcase/EchoShowcase';
import CertifyShowcase from '../components/showcase/CertifyShowcase';
import LoopVisual from '../components/LoopVisual';

export default function PlatformPage({ setPage }) {
  return (
    <>
      <EditorialHero
        eyebrow="AI Platform"
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
              <LoopVisual />
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

      <UpgradeComparison
        eyebrow="Side by Side"
        heading="How the three options compare."
        lead="Two InsiteHub paths. One reason traditional LMS falls short."
      />

      <CTABand
        heading={<>See the closed loop <em>in action.</em></>}
        body="We'll walk you through Forge, Atlas, and Echo in the context of your commercial organization — not a generic product tour."
        primaryCta={{ label: "Book a Demo", onClick: () => setPage("contact") }}
      />
    </>
  );
}
