import EditorialHero from '../components/sections/EditorialHero';
import LongForm from '../components/sections/LongForm';
import PullQuote from '../components/sections/PullQuote';
import CTABand from '../components/sections/CTABand';
import { usePageContent } from '../lib/content';

// Plain-string defaults for headings that carry inline markup: render the rich
// (italic) JSX as the default, but a plain string when an editor overrides it.
const HERO_HEADLINE_DEFAULT = 'Most vendors lead with a demo. We lead with a diagnosis.';
const CTA_HEADING_DEFAULT = "Not sure where to start? That's the right conversation to have.";

const ENGAGEMENTS = [
  { n: "01", title: "AI Strategy & Roadmap Workshop", body: "Executive alignment on AI priorities, use cases, and implementation roadmap. Half-day workshop with your leadership team — the lowest-risk starting point. Deliverable: prioritized 12-month AI roadmap." },
  { n: "02", title: "AI Readiness & Maturity Assessment", body: "Custom AI maturity model, capability heatmap, technology gap analysis, and prioritized use case roadmap. 4-week engagement. Deliverable: maturity scorecard and readiness gap remediation plan." },
  { n: "03", title: "Learning Technology & GenAI Assessment", body: "Comprehensive vendor evaluation, compliance risk assessment, and integration feasibility study. Built to defend your buying decision against IT, Legal, and Compliance scrutiny." },
  { n: "04", title: "AI Governance & Compliance Framework", body: "End-to-end governance framework for AI-generated commercial content. Role-based guidelines, monitoring protocols, and incident response playbooks — aligned to MLR and FDA guidance." },
  { n: "05", title: "Learning Infrastructure Assessment", body: "Data architecture review, AI infrastructure readiness analysis, and phased modernization roadmap. Identifies the technical prerequisites before AI tools arrive." },
  { n: "06", title: "AI-Optimized Org Design", body: "Organizational structure recommendations for AI-enabled commercial learning at scale. Role redesign, hiring plans for new capabilities, and reporting structure changes." },
];

export default function AdvisoryPage({ setPage }) {
  const c = usePageContent('advisory');
  // Headings keep their rich (italic) default, but render a plain string if overridden.
  const hh = c('hero.headline');
  const heroHeadline = hh === HERO_HEADLINE_DEFAULT
    ? <>Most vendors lead with a demo. <em>We lead with a diagnosis.</em></>
    : hh;
  const ch = c('cta.heading');
  const ctaHeading = ch === CTA_HEADING_DEFAULT
    ? <>Not sure where to start? <em>That's the right conversation to have.</em></>
    : ch;
  return (
    <>
      <EditorialHero
        eyebrow={c('hero.eyebrow')}
        headline={heroHeadline}
        subhead={c('hero.subhead')}
      />

      <LongForm
        eyebrow={c('why.eyebrow')}
        heading={c('why.heading')}
        pullQuote={c('why.pullQuote')}
        pullQuoteAttribution={c('why.pullQuoteAttribution')}
      >
        <p>{c('why.body1')}</p>
        <p>{c('why.body2')}</p>
        <p>{c('why.body3')}</p>
      </LongForm>

      <section className="section section-light">
        <div className="mw">
          <div className="advisory-engagements-header">
            <div className="t-eyebrow">{c('engagements.eyebrow')}</div>
            <h2 className="t-h2">{c('engagements.heading')}</h2>
            <p className="t-lead">{c('engagements.lead')}</p>
          </div>
          <div className="advisory-engagements-grid">
            {ENGAGEMENTS.map((e, i) => (
              <div key={e.n} className="advisory-engagement-card">
                <div className="advisory-engagement-num">{e.n}</div>
                <div>
                  <div className="advisory-engagement-title">{c(`engagements.${i}.title`)}</div>
                  <div className="advisory-engagement-body">{c(`engagements.${i}.body`)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PullQuote
        quote={c('testimonial.quote')}
        author={{ name: c('testimonial.author.name'), title: c('testimonial.author.title'), company: c('testimonial.author.company') }}
      />

      <CTABand
        heading={ctaHeading}
        body={c('cta.body')}
        primaryCta={{ label: c('cta.label'), onClick: () => setPage("contact") }}
      />
    </>
  );
}
