import EditorialHero from '../components/sections/EditorialHero';
import LongForm from '../components/sections/LongForm';
import CardGrid from '../components/sections/CardGrid';
import StepRail from '../components/sections/StepRail';
import PullQuote from '../components/sections/PullQuote';
import CTABand from '../components/sections/CTABand';
import Icon from '../components/Icon';

const FAILURE_PATTERNS = [
  { icon: <Icon name="gap" size={26} />, title: "The use case is too broad", body: "'Use AI in training' is not a use case. It's a mandate. Organizations that succeed with AI start with a specific problem that has a measurable outcome — and they validate that problem before building anything." },
  { icon: <Icon name="pilot" size={26} />, title: "The experiment isn't designed for evidence", body: "A pilot scoped to succeed in controlled conditions proves nothing. A properly designed experiment tests the solution against your actual constraints — governance, data, workflow, compliance — so the results are defensible." },
  { icon: <Icon name="checklist" size={26} />, title: "There's no path to a business case", body: "Even pilots that work fail to scale because no one built the business case while the evidence was fresh. Leadership needs ROI framing, risk assessment, and a credible implementation path — not learning metrics." },
];

const PHASES = [
  { n: "01", title: "Define the Right Use Case", body: "Map your landscape, identify where AI creates value, and produce a prioritized use case hypothesis. Deliverable: validated 1-paragraph use case statement with success criteria, scope boundaries, and known risks." },
  { n: "02", title: "Design the Experiment",      body: "Structure a pilot against your real constraints — compliance, IT, governance — not a controlled demo. Deliverable: experiment design canvas, success/failure thresholds, governance checkpoints, exit criteria." },
  { n: "03", title: "Measure Success",             body: "Define metrics before the experiment runs. Commercial performance, not engagement theater. Deliverable: pre-pilot baseline, instrumented measurement plan, and pre-registered analysis approach." },
  { n: "04", title: "Build the Business Case",    body: "Translate results into a leadership-ready ROI model and implementation roadmap. Deliverable: CCO-ready business case with phased rollout plan, investment model, and go/no-go decision points." },
];

const RESEARCH = [
  { icon: <Icon name="roleplay" size={22} />, tag: "Actively recruiting", title: "Open-Source HCP Avatar Engine", body: "Crowdsourcing a real-time, open-source conversational avatar system via hackathon. $10K prize pool. Reduces vendor lock-in for AI roleplay deployments across the industry." },
  { icon: <Icon name="research" size={22} />, tag: "Early results",       title: "Behavioral Analytics Correlation Study", body: "Early data shows r=0.84 correlation between AI-assessed behavioral competencies and field performance outcomes. Full study ongoing with InsiteHub Echo cohort data." },
  { icon: <Icon name="readiness" size={22} />, tag: "In development",     title: "AI Readiness Predictive Model", body: "Building a predictive model for pilot success probability based on pre-deployment organizational readiness scores. Training data drawn from 30+ biopharma advisory engagements." },
];

export default function ProxaLabsPage({ setPage }) {
  return (
    <>
      <EditorialHero
        eyebrow="Proxa Labs · Structured AI Experimentation"
        headline={<>Your AI mandate deserves <em>a properly designed experiment.</em></>}
        subhead="Proxa Labs helps you define the right AI use case, design a structured experiment, measure success against criteria that matter — and build the business case that turns results into action. 4-phase model. Each phase is time-bounded."
        primaryCta={{ label: "Talk to a Lab Architect", onClick: () => setPage("contact") }}
        secondaryLink={{ label: "See the Platform", onClick: () => setPage("platform") }}
      />

      <LongForm
        eyebrow="What Is Proxa Labs"
        heading="The structured experimentation arm of InsiteHub."
        pullQuote="In biopharma, a failed AI pilot doesn't just cost a budget line — it costs launch momentum and CCO trust. We exist to prevent that outcome."
      >
        <p>Proxa Labs is the structured AI experimentation practice inside InsiteHub. We help biopharma commercial L&D leaders design AI pilots that produce defensible evidence — not engagement metrics — and translate that evidence into business cases the CCO, CFO, and CHRO will fund.</p>
        <p>The methodology came from running one of only two NIH-partnered biomedical accelerators outside a university in the US. We learned how to design experiments that survive scientific scrutiny. We've since adapted that methodology to commercial AI pilots, where the constraints are different but the discipline is the same: define the hypothesis, design for evidence, measure honestly, decide based on data.</p>
        <p>Every Proxa Labs engagement is structured around a single 4-phase model. Each phase has a deliverable. Each deliverable feeds the next phase. The whole thing produces either a funded AI roadmap or a defensible decision to not invest — both are valid outcomes.</p>
      </LongForm>

      <CardGrid
        eyebrow="Why AI Pilots Fail"
        heading="Three failure patterns account for most pharma AI pilot postmortems."
        lead="Proxa Labs engagements are designed around these patterns."
        columns={3}
        cards={FAILURE_PATTERNS}
        cardStyle="standard"
        background="tinted"
      />

      <StepRail
        eyebrow="The 4-Phase Model"
        heading="Define → Design → Measure → Business Case."
        lead="Each phase is time-bounded with a concrete deliverable. Most engagements complete in 6–10 weeks."
        steps={PHASES}
      />

      <PullQuote
        quote="What Proxa Labs did differently was refuse to let us skip the hard part — defining what success actually looked like before we built anything. That single decision changed everything. We walked into our budget review with evidence, not a pitch deck."
        author={{ name: "Sarah Chen", title: "VP, Commercial Learning & Development", company: "Mid-Size Oncology Biopharma · Series C", avatarInitials: "SC" }}
        stats={[
          { n: "23%",   l: "improvement in manager-assessed call quality" },
          { n: "0",     l: "MLR compliance flags across all sessions" },
          { n: "3 wks", l: "from pilot conclusion to CCO approval" },
          { n: "6 mo",  l: "full AI roadmap funded and in execution" },
        ]}
      />

      <CardGrid
        eyebrow="Active Research"
        heading="From the Proxa Labs research team."
        lead="Open research that shapes how we advise clients and build products."
        columns={3}
        cards={RESEARCH}
        cardStyle="compact"
        background="tinted"
      />

      <CTABand
        heading={<>Bring us your <em>AI mandate.</em></>}
        body="We'll show you what a properly designed experiment looks like in your environment — and what evidence your CCO needs to fund the next phase."
        primaryCta={{ label: "Start a Conversation", onClick: () => setPage("contact") }}
        secondaryLink={{ label: "Read the Methodology", onClick: () => setPage("advisory") }}
      />
    </>
  );
}
