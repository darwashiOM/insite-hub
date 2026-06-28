import EditorialHero from '../components/sections/EditorialHero';
import LongForm from '../components/sections/LongForm';
import CardGrid from '../components/sections/CardGrid';
import CTABand from '../components/sections/CTABand';
import Icon from '../components/Icon';
import { usePageContent } from '../lib/content';

// Plain-text equivalents of the two rich (italic) headings. When the content
// getter returns one of these, render the rich JSX default; otherwise render the
// override as a plain string.
const HERO_HEADLINE_DEFAULT = 'Your AI mandate deserves a properly designed experiment.';
const CTA_HEADING_DEFAULT = 'Bring us your AI mandate.';

const FAILURE_PATTERNS = [
  { icon: <Icon name="gap" size={26} />, title: "The use case is too broad", body: "\"Use AI in training\" is not a use case. It's a mandate. Organizations that succeed with AI start with a specific problem, a measurable outcome, and validation that the problem is real — before they build anything." },
  { icon: <Icon name="pilot" size={26} />, title: "The experiment isn't designed for evidence", body: "A pilot scoped to succeed in controlled conditions proves nothing. A properly designed experiment tests the solution against your real constraints — governance, data, workflow, compliance — so the results hold up outside the demo." },
  { icon: <Icon name="checklist" size={26} />, title: "There's no path to a business case", body: "Pilots that work still fail to scale because no one built the business case while the evidence was fresh. Leadership doesn't fund learning metrics. They fund ROI framing, risk assessment, and a credible implementation path." },
];

const PHASES = [
  { n: "01", title: "Define the Right Use Case", body: "Map your landscape, identify where AI creates value, and produce a prioritized use case hypothesis. Deliverable: validated one-paragraph use case statement with success criteria, scope boundaries, and known risks." },
  { n: "02", title: "Design the Experiment",      body: "Structure a pilot against your real constraints — compliance, IT, governance — not a controlled demo. Deliverable: experiment design canvas, success and failure thresholds, governance checkpoints, and exit criteria." },
  { n: "03", title: "Measure Success",             body: "Define metrics before the experiment runs. Commercial performance, not engagement theater. Deliverable: pre-pilot baseline, instrumented measurement plan, and pre-registered analysis approach." },
  { n: "04", title: "Build the Business Case",    body: "Translate results into a leadership-ready ROI model and implementation roadmap. Deliverable: CCO-ready business case with a phased rollout plan, investment model, and go/no-go decision points." },
];

const RESEARCH = [
  { icon: <Icon name="roleplay" size={22} />, tag: "Actively recruiting", title: "Open-Source HCP Avatar Engine", body: "Crowdsourcing a real-time, open-source conversational avatar system via hackathon. $10K prize pool. Goal: reduce vendor lock-in for AI roleplay deployments across the industry." },
  { icon: <Icon name="research" size={22} />, tag: "Early results",       title: "Behavioral Analytics Correlation Study", body: "Early data shows r=0.84 correlation between AI-assessed behavioral competencies and field performance outcomes. Full study ongoing with Stage cohort data." },
  { icon: <Icon name="readiness" size={22} />, tag: "In development",     title: "AI Readiness Predictive Model", body: "Predictive model for pilot success probability based on pre-deployment organizational readiness scores. Training data drawn from 30+ biopharma advisory engagements." },
];

export default function ProxaLabsPage({ setPage }) {
  const c = usePageContent('proxalab');
  // Rich headings keep their italic default but render a plain string if overridden.
  const hh = c('hero.heading');
  const heroHeadline = hh === HERO_HEADLINE_DEFAULT
    ? <>Your AI mandate deserves <em>a properly designed experiment.</em></>
    : hh;
  const ch = c('cta.heading');
  const ctaHeading = ch === CTA_HEADING_DEFAULT
    ? <>Bring us your <em>AI mandate.</em></>
    : ch;
  return (
    <>
      <EditorialHero
        eyebrow={c('hero.eyebrow')}
        headline={heroHeadline}
        subhead={c('hero.subhead')}
        primaryCta={{ label: c('hero.ctaLabel'), onClick: () => setPage("contact") }}
      />

      <LongForm
        eyebrow={c('longform.eyebrow')}
        heading={c('longform.heading')}
        pullQuote={c('longform.pullQuote')}
        pullQuoteAttribution={c('longform.pullQuoteAttribution')}
      >
        <p>{c('longform.p1')}</p>
        <p>{c('longform.p2')}</p>
        <p>{c('longform.p3')}</p>
      </LongForm>

      <CardGrid
        eyebrow={c('failures.eyebrow')}
        heading={c('failures.heading')}
        lead={c('failures.lead')}
        columns={3}
        cards={FAILURE_PATTERNS}
        cardStyle="standard"
        background="tinted"
      />

      <section className="section section-light">
        <div className="mw">
          <div className="proxa-phases-header">
            <div className="t-eyebrow">{c('phases.eyebrow')}</div>
            <h2 className="t-h2">{c('phases.heading')}</h2>
            <p className="t-lead">{c('phases.lead')}</p>
          </div>
          <div className="proxa-phases-grid">
            {PHASES.map(p => (
              <div key={p.n} className="proxa-phase-card">
                <div className="proxa-phase-num">{p.n}</div>
                <div>
                  <div className="proxa-phase-title">{p.title}</div>
                  <div className="proxa-phase-body">{p.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CardGrid
        eyebrow={c('research.eyebrow')}
        heading={c('research.heading')}
        lead={c('research.lead')}
        columns={3}
        cards={RESEARCH}
        cardStyle="compact"
        background="tinted"
      />

      <CTABand
        heading={ctaHeading}
        body={c('cta.body')}
        primaryCta={{ label: c('cta.ctaLabel'), onClick: () => setPage("contact") }}
      />
    </>
  );
}
