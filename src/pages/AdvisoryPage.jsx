import EditorialHero from '../components/sections/EditorialHero';
import LongForm from '../components/sections/LongForm';
import PullQuote from '../components/sections/PullQuote';
import CTABand from '../components/sections/CTABand';

const ENGAGEMENTS = [
  { n: "01", title: "AI Strategy & Roadmap Workshop", body: "Executive alignment on AI priorities, use cases, and implementation roadmap. Half-day workshop with your leadership team — the lowest-risk starting point. Deliverable: prioritized 12-month AI roadmap." },
  { n: "02", title: "AI Readiness & Maturity Assessment", body: "Custom AI maturity model, capability heatmap, technology gap analysis, and prioritized use case roadmap. 4-week engagement. Deliverable: maturity scorecard and readiness gap remediation plan." },
  { n: "03", title: "Learning Technology & GenAI Assessment", body: "Comprehensive vendor evaluation, compliance risk assessment, and integration feasibility study. Built to defend your buying decision against IT, Legal, and Compliance scrutiny." },
  { n: "04", title: "AI Governance & Compliance Framework", body: "End-to-end governance framework for AI-generated commercial content. Role-based guidelines, monitoring protocols, and incident response playbooks — aligned to MLR and FDA guidance." },
  { n: "05", title: "Learning Infrastructure Assessment", body: "Data architecture review, AI infrastructure readiness analysis, and phased modernization roadmap. Identifies the technical prerequisites before AI tools arrive." },
  { n: "06", title: "AI-Optimized Org Design", body: "Organizational structure recommendations for AI-enabled commercial learning at scale. Role redesign, hiring plans for new capabilities, and reporting structure changes." },
];

export default function AdvisoryPage({ setPage }) {
  return (
    <>
      <EditorialHero
        eyebrow="Advisory · Diagnostic-First"
        headline={<>Most vendors lead with a demo. <em>We lead with a diagnosis.</em></>}
        subhead="Every InsiteHub engagement starts with the question your organization actually needs answered: what will determine whether AI succeeds or fails here? Six diagnostic engagements, each time-bounded, each producing a deliverable you can act on. No open-ended retainers."
      />

      <LongForm
        eyebrow="Why Advisory First"
        heading="The thing that determines whether AI works is rarely the technology."
        pullQuote="Pharma AI pilots fail because no one defines what success looks like before the pilot runs."
      >
        <p>AI implementations in biopharma commercial learning fail in predictable ways. The use case is too broad. The pilot is scoped to succeed in controlled conditions that don't match the real environment. There's no path to a defensible business case. The governance gate kills the deployment after a successful technical demo. The business sponsor moves on. These failure patterns account for 80–95% of pharma AI pilot failures.</p>
        <p>InsiteHub's advisory engagements are designed around them. We diagnose where you are in the AI journey, where the specific risks live in your environment, and which engagement gives you the highest-leverage starting point. We don't recommend technology before we understand the constraints it has to operate in.</p>
        <p>Every advisory engagement is time-bounded, produces a concrete deliverable — not a slide deck — and feeds directly into either a structured Proxa Labs experiment or a focused implementation workstream.</p>
      </LongForm>

      <section className="section section-light">
        <div className="mw">
          <div className="advisory-engagements-header">
            <div className="t-eyebrow">Six Advisory Engagements</div>
            <h2 className="t-h2">Pick the engagement that fits where you are.</h2>
            <p className="t-lead">Each is time-bounded with a concrete deliverable. None requires a long-term retainer.</p>
          </div>
          <div className="advisory-engagements-grid">
            <div className="advisory-engagements-column">
              {ENGAGEMENTS.slice(0, 3).map(e => (
                <div key={e.n} className="advisory-engagement-card">
                  <div className="advisory-engagement-num">{e.n}</div>
                  <div>
                    <div className="advisory-engagement-title">{e.title}</div>
                    <div className="advisory-engagement-body">{e.body}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="advisory-engagements-column">
              {ENGAGEMENTS.slice(3).map(e => (
                <div key={e.n} className="advisory-engagement-card">
                  <div className="advisory-engagement-num">{e.n}</div>
                  <div>
                    <div className="advisory-engagement-title">{e.title}</div>
                    <div className="advisory-engagement-body">{e.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PullQuote
        quote="The diagnostic call took 30 minutes and saved us 9 months of building the wrong thing. We had been about to issue an RFP for an AI roleplay vendor. The advisory team showed us our actual blocker was MLR throughput, not roleplay coverage. We funded a Forge pilot instead. Six months later we had measurable launch readiness gains and a CCO-approved AI roadmap."
        author={{ name: "VP, Commercial L&D", title: "Top-10 Global Pharma", company: "Anonymized advisory client", avatarInitials: "VP" }}
      />

      <CTABand
        heading={<>Not sure where to start? <em>That's the right conversation to have.</em></>}
        body="30 minutes. No demo. Tell us about your environment, what you've tried, and where you've been stuck. We'll tell you what we'd look at first."
        primaryCta={{ label: "Book a Consult", onClick: () => setPage("contact") }}
      />
    </>
  );
}
