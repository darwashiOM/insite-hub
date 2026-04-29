import EditorialHero from '../components/sections/EditorialHero';
import LongForm from '../components/sections/LongForm';
import CardGrid from '../components/sections/CardGrid';
import CTABand from '../components/sections/CTABand';
import Icon from '../components/Icon';

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
  { icon: <Icon name="research" size={22} />, tag: "Early results",       title: "Behavioral Analytics Correlation Study", body: "Early data shows r=0.84 correlation between AI-assessed behavioral competencies and field performance outcomes. Full study ongoing with Echo cohort data." },
  { icon: <Icon name="readiness" size={22} />, tag: "In development",     title: "AI Readiness Predictive Model", body: "Predictive model for pilot success probability based on pre-deployment organizational readiness scores. Training data drawn from 30+ biopharma advisory engagements." },
];

export default function ProxaLabsPage({ setPage }) {
  return (
    <>
      <EditorialHero
        eyebrow="Structured AI Experimentation"
        headline={<>Your AI mandate deserves <em>a properly designed experiment.</em></>}
        subhead="Proxa Labs is the structured AI experimentation practice inside InsiteHub. We define the right use case, design the experiment against your real constraints, measure what matters, and build the business case that turns results into action. Four phases. Each time-bounded."
        primaryCta={{ label: "Book a Consult", onClick: () => setPage("contact") }}
      />

      <LongForm
        eyebrow="Why Structured Experimentation"
        heading="The discipline that matches the environment."
        pullQuote="In biopharma, a failed AI pilot doesn't just cost a budget line — it costs launch momentum and CCO trust. We exist to prevent that outcome."
        pullQuoteAttribution="Nina Patel, Proxa Labs Research Lead, InsiteHub"
      >
        <p>Structured experimentation is the only discipline built for environments where you can't afford to be wrong. It's the approach Bell Labs used to test hypotheses against real constraints before committing to production. It's the approach that shaped 25 years of practitioner biopharma commercial operating decisions — where the constraints are MLR review, launch timelines, and federated commercial structures.</p>
        <p>We apply that discipline to AI pilots: define the hypothesis, design for evidence, measure honestly, decide based on data. The method is old. The application to commercial AI is new. The result is a Lab engagement that produces defensible evidence — not engagement metrics — and business cases the CCO, CFO, and CHRO will fund.</p>
        <p>Every Lab engagement is structured around a single four-phase model. Each phase has a deliverable. Each deliverable feeds the next phase. The engagement produces either a funded AI roadmap or a defensible decision not to invest — both are valid outcomes.</p>
      </LongForm>

      <CardGrid
        eyebrow="Why AI Pilots Fail"
        heading="Three failure patterns account for most pharma AI pilot postmortems."
        lead="Our engagements are designed around these three most common patterns."
        columns={3}
        cards={FAILURE_PATTERNS}
        cardStyle="standard"
        background="tinted"
      />

      <section className="section section-light">
        <div className="mw">
          <div className="proxa-phases-header">
            <div className="t-eyebrow">The Four-Phase Model</div>
            <h2 className="t-h2">Define → Design → Measure → Business Case.</h2>
            <p className="t-lead">Each phase is time-bounded with a concrete deliverable. Most Lab engagements complete in six to ten weeks.</p>
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
        eyebrow="Active Research"
        heading="Research that shapes how we advise."
        lead="Open research projects that inform our engagements and the InsiteHub platform."
        columns={3}
        cards={RESEARCH}
        cardStyle="compact"
        background="tinted"
      />

      <CTABand
        heading={<>Bring us your <em>AI mandate.</em></>}
        body="We'll show you what a properly designed experiment looks like in your environment — and what evidence your CCO needs to fund the next phase."
        primaryCta={{ label: "Book a Consult", onClick: () => setPage("contact") }}
      />
    </>
  );
}
