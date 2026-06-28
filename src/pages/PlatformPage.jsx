import EditorialHero from '../components/sections/EditorialHero';
import ProductShowcase from '../components/sections/ProductShowcase';
import UpgradeComparison from '../components/sections/UpgradeComparison';
import CTABand from '../components/sections/CTABand';
import ForgeShowcase from '../components/showcase/ForgeShowcase';
import AtlasShowcase from '../components/showcase/AtlasShowcase';
import EchoShowcase from '../components/showcase/EchoShowcase';
import CertifyShowcase from '../components/showcase/CertifyShowcase';
import LoopVisual from '../components/LoopVisual';
import { usePageContent } from '../lib/content';

// Plain-text defaults for headings that carry inline markup. When the override
// equals the default, render the rich (italic) JSX; otherwise render the plain string.
const HERO_HEADLINE_DEFAULT = 'One platform. Four products. A closed loop that never breaks.';
const CTA_HEADING_DEFAULT = 'See the closed loop in action.';

export default function PlatformPage({ setPage }) {
  const c = usePageContent('platform');
  const hh = c('hero.headline');
  const heroHeadline = hh === HERO_HEADLINE_DEFAULT
    ? <>One platform. Four products. <em>A closed loop that never breaks.</em></>
    : <>{hh}</>;
  const ch = c('cta.heading');
  const ctaHeading = ch === CTA_HEADING_DEFAULT
    ? <>See the closed loop <em>in action.</em></>
    : <>{ch}</>;
  return (
    <>
      <EditorialHero
        eyebrow={c('hero.eyebrow')}
        headline={heroHeadline}
        subhead={c('hero.subhead')}
        primaryCta={{ label: c('hero.ctaLabel'), onClick: () => setPage("contact") }}
      />

      <section className="section section-light">
        <div className="mw">
          <div className="platform-loop-header">
            <div className="t-eyebrow">{c('loop.eyebrow')}</div>
            <h2 className="t-h2">{c('loop.heading')}</h2>
            <p className="t-lead">{c('loop.lead')}</p>
          </div>
          <div className="platform-loop-slice">
            <div className="platform-loop-visual">
              <LoopVisual />
            </div>
            <div className="platform-loop-copy">
              <p>{c('loop.body1')}</p>
              <p>{c('loop.body2')}</p>
              <p>{c('loop.body3')}</p>
            </div>
          </div>
        </div>
      </section>

      <ProductShowcase
        id="forge"
        product="forge"
        eyebrow={c('forge.eyebrow')}
        tagline={c('forge.tagline')}
        body={c('forge.body')}
        bullets={[
          "Auto-generation from clinical data and PI",
          "Every claim cited — MLR artifacts auto-built",
          "Veeva PromoMats workflow integration",
          "Content Gap Analyzer feeds directly from Stage failures",
        ]}
        mockup={<ForgeShowcase />}
      />

      <ProductShowcase
        product="atlas"
        eyebrow={c('cue.eyebrow')}
        tagline={c('cue.tagline')}
        body={c('cue.body')}
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
        eyebrow={c('stage.eyebrow')}
        tagline={c('stage.tagline')}
        body={c('stage.body')}
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
        eyebrow={c('trace.eyebrow')}
        tagline={c('trace.tagline')}
        body={c('trace.body')}
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
        eyebrow={c('compare.eyebrow')}
        heading={c('compare.heading')}
        lead={c('compare.lead')}
      />

      <CTABand
        heading={ctaHeading}
        body={c('cta.body')}
        primaryCta={{ label: c('cta.ctaLabel'), onClick: () => setPage("contact") }}
      />
    </>
  );
}
