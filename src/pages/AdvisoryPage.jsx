import EditorialHero from '../components/sections/EditorialHero';
import LongForm from '../components/sections/LongForm';
import StepRail from '../components/sections/StepRail';
import SplitFeature from '../components/sections/SplitFeature';
import PullQuote from '../components/sections/PullQuote';
import CTABand from '../components/sections/CTABand';
import Icon from '../components/Icon';

const ENGAGEMENTS = [
  { n: "01", title: "AI Strategy & Roadmap Workshop", body: "Executive alignment on AI priorities, use cases, and implementation roadmap. The lowest-risk starting point — half-day workshop with leadership team. Deliverable: prioritized 12-month AI roadmap." },
  { n: "02", title: "AI Readiness & Maturity Assessment", body: "Custom AI maturity model, capability heatmap, technology gap analysis, and prioritized use case roadmap. 4-week engagement. Deliverable: maturity scorecard + readiness gap remediation plan." },
  { n: "03", title: "Learning Technology & GenAI Assessment", body: "Comprehensive vendor evaluation, compliance risk assessment, and integration feasibility study. Defends your buying decision against IT, Legal, and Compliance scrutiny." },
  { n: "04", title: "AI Governance & Compliance Framework", body: "End-to-end governance framework for AI-generated commercial content. Role-based guidelines, monitoring protocols, and incident response playbooks aligned to MLR and FDA guidance." },
  { n: "05", title: "Learning Infrastructure Assessment", body: "Data architecture review, AI infrastructure readiness analysis, and phased modernization roadmap. Identifies the technical prerequisites before AI tools land." },
  { n: "06", title: "AI-Optimized Org Design", body: "Organizational structure recommendations for AI-enabled commercial learning at scale. Role redesign, capability hiring plans, and reporting structure changes." },
];

const PROOF_CARDS = [
  { icon: <Icon name="award" size={26} />, title: "World's Best Corporate Learning Program", body: "Vanguard Award for an immersive virtual world built for a European drug launch. Done while competitors quoted $5M platform builds." },
  { icon: <Icon name="research" size={26} />, title: "NIH-Backed Methodology", body: "InsiteHub's experimentation methodology evolved from running one of only two NIH-partnered biomedical accelerators outside a university in the US." },
];

export default function AdvisoryPage({ setPage }) {
  return (
    <>
      <EditorialHero
        eyebrow="Advisory · Diagnostic-First"
        headline={<>Most vendors lead with a demo. <em>We lead with a diagnosis.</em></>}
        subhead="Every InsiteHub engagement starts with the question your organization actually needs answered: what will determine whether AI succeeds or fails here? Six diagnostic engagements, each time-bounded, each producing a deliverable you can act on."
        primaryCta={{ label: "Start a Diagnostic Conversation", onClick: () => setPage("contact") }}
        secondaryLink={{ label: "See the Platform", onClick: () => setPage("platform") }}
      />

      <LongForm
        eyebrow="Why Advisory First"
        heading="The thing that determines whether AI works is rarely the technology."
        pullQuote="Most pharma AI pilots fail not because the tools don't work, but because no one defined what success would look like before the pilot ran."
      >
        <p>AI implementations in biopharma commercial learning fail in predictable ways. The use case is too broad. The pilot is scoped to succeed in controlled conditions that don't match the real environment. There's no path to a defensible business case. The governance gate kills the deployment after a successful technical demo. The business sponsor moves on. Three of these failure patterns account for 80–95% of pharma AI pilot failures.</p>
        <p>InsiteHub's advisory engagements are designed around these failure patterns. We diagnose where you are in the AI journey, where the specific risks live in your environment, and which engagement gives you the highest-leverage starting point. We never recommend technology before we've understood the constraints it has to operate in.</p>
        <p>The result: every advisory engagement is time-bounded, produces a concrete deliverable (not a slide deck), and feeds directly into either a structured Proxa Labs experiment or a focused implementation workstream. No open-ended consulting retainers.</p>
      </LongForm>

      <StepRail
        eyebrow="Six Advisory Engagements"
        heading="Pick the engagement that fits where you are."
        lead="Each is time-bounded with a concrete deliverable. None requires a long-term retainer."
        steps={ENGAGEMENTS}
      />

      <SplitFeature
        ratio="50-50"
        eyebrow="Why InsiteHub"
        heading="The methodology behind the engagements."
        body="InsiteHub built award-winning innovation at companies most vendors are still trying to figure out how to sell to. Our advisory practice is informed by 25 years of operating inside biopharma commercial environments — not adapting generic frameworks to them."
        bullets={[
          "25 years of pharma commercial L&D operating experience",
          "30+ engagements with global pharma + health systems",
          "Methodology incubated at the University of Delaware Spin-In Program",
          "NIH-partnered biomedical accelerator alumnus",
        ]}
        cta={{ label: "Read About InsiteHub", onClick: () => setPage("about") }}
        visual={
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {PROOF_CARDS.map(c => (
              <div key={c.title} style={{ background: "#fff", border: "1.5px solid #E3E5EA", borderRadius: 14, padding: 24, borderLeft: "3px solid #F4801F" }}>
                <div style={{ color: "#F4801F", marginBottom: 12 }}>{c.icon}</div>
                <div style={{ fontFamily: "Manrope,sans-serif", fontSize: 16, fontWeight: 700, color: "#12141A", marginBottom: 8, letterSpacing: "-.02em" }}>{c.title}</div>
                <div style={{ fontSize: 13, color: "#5C6370", lineHeight: 1.6 }}>{c.body}</div>
              </div>
            ))}
          </div>
        }
        background="tinted"
        reverse
      />

      <PullQuote
        quote="The diagnostic call took 30 minutes and saved us 9 months of building the wrong thing. We had been about to issue an RFP for an AI roleplay vendor. The advisory team showed us our actual blocker was MLR throughput, not roleplay coverage. We funded a Forge pilot instead. Six months later we had measurable launch readiness gains and a CCO-approved AI roadmap."
        author={{ name: "VP, Commercial L&D", title: "Top-10 Global Pharma", company: "Anonymized advisory client", avatarInitials: "VP" }}
      />

      <CTABand
        heading={<>Not sure where to start? <em>That's the right conversation to have.</em></>}
        body="30 minutes. No demo. Tell us about your environment, what you've tried, and where you've been stuck. We'll tell you what we'd look at first."
        primaryCta={{ label: "Book a Discovery Call", onClick: () => setPage("contact") }}
        secondaryLink={{ label: "Explore the Platform", onClick: () => setPage("platform") }}
      />
    </>
  );
}
