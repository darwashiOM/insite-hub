import EditorialHero from '../components/sections/EditorialHero';
import CardGrid from '../components/sections/CardGrid';
import LongForm from '../components/sections/LongForm';
import CTABand from '../components/sections/CTABand';
import Icon from '../components/Icon';

export default function ResourcesPage({ setPage }) {
  const FRAMEWORKS = [
    { icon: <Icon name="checklist" size={22} />,    tag: "Framework", title: "AI Readiness Self-Assessment",                body: "A 15-question framework for evaluating your organization's readiness to deploy AI in commercial learning. Covers data foundations, governance structure, stakeholder alignment, technology infrastructure, and measurement capability.", linkLabel: "Get the Framework",  onClick: () => setPage("contact") },
    { icon: <Icon name="gap" size={22} />,          tag: "Guide",     title: "The AI Pilot Failure Taxonomy",               body: "A breakdown of the four failure patterns that account for 80–95% of pharma AI pilot failures — and what each one looks like from the inside before it becomes a postmortem. Built from first-hand failure observation across 30+ biopharma organizations.",            linkLabel: "Get the Guide",      onClick: () => setPage("contact") },
    { icon: <Icon name="template" size={22} />,     tag: "Template",  title: "Commercial L&D AI Business Case Template",     body: "The ROI model structure InsiteHub uses with clients to translate pilot evidence into language the CCO, CFO, and CHRO can act on. Includes the metric hierarchy connecting L&D outputs to commercial performance.",                                                  linkLabel: "Get the Template",   onClick: () => setPage("contact") },
    { icon: <Icon name="research" size={22} />,     tag: "Model",     title: "Proxa Labs Experimentation Design Canvas",     body: "The structured canvas used in every Proxa Labs engagement to define a use case hypothesis, set success criteria, scope the experiment, and identify governance checkpoints — before a single line of code is written or a vendor is engaged.",                  linkLabel: "Get the Canvas",     onClick: () => setPage("contact") },
    { icon: <Icon name="compliance" size={22} />,   tag: "Checklist", title: "AI Vendor Evaluation Scorecard",               body: "A 24-point evaluation matrix for assessing AI platform vendors in a biopharma commercial context. Covers compliance architecture, integration complexity, total cost of ownership, and implementation risk — built for the buyer who has been burned by demos.", linkLabel: "Get the Scorecard",  onClick: () => setPage("contact") },
    { icon: <Icon name="literacy" size={22} />,     tag: "Guide",     title: "AI Literacy Program Overview",                  body: "A summary of InsiteHub's AI Literacy Program — what it covers, how it's delivered, which roles it targets, and how it fits into a broader AI deployment sequence. Includes the partnership with UMU.com for enterprise delivery.",                                linkLabel: "Get the Overview",   onClick: () => setPage("contact") },
  ];

  const RESEARCH = [
    { icon: <Icon name="roleplay" size={22} />,  tag: "Actively recruiting", title: "Open-Source HCP Avatar Engine",         body: "Crowdsourcing a real-time, open-source conversational avatar system via hackathon. $10K prize pool. Reduces vendor lock-in for AI roleplay deployments across the industry." },
    { icon: <Icon name="research" size={22} />,  tag: "Early results",       title: "Behavioral Analytics Correlation Study", body: "Early data shows r=0.84 correlation between AI-assessed behavioral competencies and field performance outcomes. Full study ongoing with InsiteHub Echo cohort data." },
    { icon: <Icon name="readiness" size={22} />, tag: "In development",      title: "AI Readiness Predictive Model",         body: "Building a predictive model for pilot success probability based on pre-deployment organizational readiness scores. Training data drawn from 30+ biopharma advisory engagements." },
  ];

  return (
    <>
      <EditorialHero
        eyebrow="Resources · Frameworks & Tools"
        headline={<>Tools and frameworks you can use <em>before you commit to anything.</em></>}
        subhead="25 years of biopharma commercial L&D experience distilled into practical tools. No form required for the frameworks — just thinking you can take into your next leadership conversation."
        primaryCta={{ label: "Subscribe for New Resources", onClick: () => setPage("newsletter") }}
        secondaryLink={{ label: "Explore Proxa Labs Research", onClick: () => setPage("proxalab") }}
      />

      <CardGrid
        eyebrow="Frameworks & Guides"
        heading="Start here if you're still figuring out where AI fits."
        lead="Each framework distills a piece of methodology InsiteHub uses with paying clients. Free to use. No gating beyond the conversation it sparks."
        columns={3}
        cards={FRAMEWORKS}
        cardStyle="feature"
      />

      <LongForm
        eyebrow="From Proxa Labs"
        heading="Active research and early findings."
        background="tinted"
      >
        <p>Open research from InsiteHub's AI lab — work in progress that will shape how we advise clients and build products. We publish early because the methodology benefits from peer pressure, and because the people who would benefit from these frameworks should not have to wait for them to be polished.</p>
      </LongForm>

      <CardGrid
        columns={3}
        cards={RESEARCH}
        cardStyle="compact"
        background="tinted"
      />

      <CTABand
        heading={<>The frameworks are free. <em>The conversations matter more.</em></>}
        body="Use the tools. When you're ready to talk through how they apply in your environment, we're here."
        primaryCta={{ label: "Start a Conversation", onClick: () => setPage("contact") }}
        secondaryLink={{ label: "Subscribe for New Resources", onClick: () => setPage("newsletter") }}
      />
    </>
  );
}
