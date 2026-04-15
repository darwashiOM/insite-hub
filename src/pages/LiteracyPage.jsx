import EditorialHero from '../components/sections/EditorialHero';
import LongForm from '../components/sections/LongForm';
import CardGrid from '../components/sections/CardGrid';
import StepRail from '../components/sections/StepRail';
import StatBand from '../components/sections/StatBand';
import SplitFeature from '../components/sections/SplitFeature';
import CTABand from '../components/sections/CTABand';
import Icon from '../components/Icon';

const TRACKS = [
  { icon: <Icon name="literacy" size={22} />,    title: "What AI Actually Does",           body: "How LLMs work, where they fail, and why outputs require human judgment.",                              tag: "All roles" },
  { icon: <Icon name="compliance" size={22} />,  title: "AI in a Regulated Environment",   body: "How AI interacts with MLR review, GxP validation, and compliance requirements.",                       tag: "Medical · Regulatory" },
  { icon: <Icon name="content" size={22} />,     title: "AI for Content Creation",          body: "Prompt design, output review, citation verification, and the human judgment layer.",                  tag: "L&D · Marketing" },
  { icon: <Icon name="roleplay" size={22} />,    title: "AI in Field Conversations",       body: "AI-generated talking points, coached preparation, and HCP persona behaviors.",                         tag: "Commercial · Sales" },
  { icon: <Icon name="readiness" size={22} />,   title: "AI and Performance Data",         body: "How to interpret AI-generated competency scores and readiness predictions.",                           tag: "Managers · Leaders" },
  { icon: <Icon name="strategy" size={22} />,    title: "Building an AI-Ready Mindset",    body: "Experiment-first culture, evaluating vendor claims, and institutional vocabulary.",                    tag: "Leadership · CLO" },
];

const DELIVERY = [
  { n: "01", title: "Role-Targeted Tracks",        body: "Every role gets a literacy track designed for the AI tools and decisions specific to their work — not generic 'what is AI' content." },
  { n: "02", title: "Platform-Agnostic",            body: "Delivered via UMU.com partnership for enterprise-scale rollout. Integrates with existing LMS environments — no rip-and-replace." },
  { n: "03", title: "Measurable Outcomes",          body: "Pre and post assessments track AI literacy gains by role and cohort. Reporting feeds directly into AI readiness planning and deployment sequencing." },
  { n: "04", title: "4–8 Week Deployment",          body: "Cohort-based delivery scales from 50 to 5,000+ learners. Most enterprise rollouts complete in 6 weeks from kickoff to certification." },
];

const OUTCOMES = [
  { n: "+87%",  l: "AI tool adoption rate vs deployments without literacy program" },
  { n: "−72%",  l: "support tickets related to AI tool misuse in first 90 days" },
  { n: "3.8×",  l: "speed to AI value vs technology-first deployments" },
  { n: "100%",  l: "of completing learners pass post-assessment" },
];

export default function LiteracyPage({ setPage }) {
  return (
    <>
      <EditorialHero
        eyebrow="AI Literacy Program"
        headline={<>Your team can't use AI tools they <em>don't understand or trust.</em></>}
        subhead="Before your organization deploys AI, it needs a foundation — the concepts, the vocabulary, the judgment to know when AI is helping and when it isn't. Role-targeted tracks for every part of your commercial structure."
        primaryCta={{ label: "Get the Program Overview", onClick: () => setPage("contact") }}
        secondaryLink={{ label: "See the AI Platform", onClick: () => setPage("platform") }}
      />

      <LongForm
        eyebrow="Why Literacy First"
        heading="Teams that understand AI adopt it. Teams that don't, resist it."
        pullQuote="Every failed pharma AI deployment we've diagnosed had the same root cause: the people expected to use the tools didn't have the vocabulary or judgment to use them well."
      >
        <p>Most AI deployment failures in commercial L&D look like adoption failures, but they're really literacy failures. Reps don't trust AI-generated talking points because no one explained where they come from or how to spot when the AI is wrong. Managers can't interpret AI-generated readiness scores because they don't understand what the model is measuring. Medical and Regulatory teams reject AI content reviews because they have no framework for what "AI-generated" means in their workflow.</p>
        <p>The fix isn't more training on the tool. The fix is foundational AI literacy across the roles that touch AI outputs. Once teams have the conceptual vocabulary — what LLMs do well, what they fail at, where human judgment lives in the loop — adoption stops being a fight and starts being normal use of normal tools.</p>
        <p>That's what this program does. Six role-targeted tracks. Built on 25 years of pharma commercial training methodology. Delivered at scale through UMU.com.</p>
      </LongForm>

      <CardGrid
        eyebrow="Six Role-Targeted Tracks"
        heading="Built for every role that touches AI outputs."
        lead="Each track is calibrated to the AI tools and decisions specific to that role. No generic 'what is AI' modules."
        columns={3}
        cards={TRACKS}
        cardStyle="standard"
        background="tinted"
      />

      <StepRail
        eyebrow="Program Structure"
        heading="Modular. Role-specific. Measurable."
        steps={DELIVERY}
      />

      <StatBand stats={OUTCOMES} tone="light" />

      <SplitFeature
        ratio="60-40"
        eyebrow="Delivery Partnership"
        heading="Powered by UMU.com for enterprise-scale rollout."
        body="InsiteHub's curriculum + UMU's enterprise learning delivery infrastructure. Together we deliver scalable, measurable AI literacy programs to commercial organizations across North America, Europe, and Asia-Pacific. Integrates with InsiteX, existing pharma LMS environments, and UMU's native platform."
        bullets={[
          "Global delivery infrastructure",
          "LMS-agnostic — no rip-and-replace",
          "Pre/post assessment + cohort reporting",
        ]}
        cta={{ label: "Talk to a Program Architect", onClick: () => setPage("contact") }}
        visual={
          <div style={{ background: "linear-gradient(135deg, rgba(0,122,255,.05), rgba(0,122,255,.1))", border: "1.5px solid rgba(0,122,255,.15)", borderRadius: 20, padding: 32, textAlign: "center" }}>
            <div style={{ fontSize: 32, fontFamily: "Manrope,sans-serif", fontWeight: 900, color: "#007AFF", letterSpacing: "-0.03em", marginBottom: 6 }}>UMU.com</div>
            <div style={{ fontSize: 12, color: "#5C6370", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 18 }}>Strategic Partnership · April 2026</div>
            <div style={{ fontSize: 13, color: "#12141A", lineHeight: 1.6 }}>"InsiteHub's biopharma domain expertise meets UMU's enterprise learning infrastructure. Together: the AI literacy backbone every pharma deployment needs."</div>
          </div>
        }
      />

      <CTABand
        heading={<>Build the foundation, <em>then deploy the tools.</em></>}
        body="Teams that adopt AI well started with literacy. Teams that resist it started with the tools. Choose the right order."
        primaryCta={{ label: "Get the Program Overview", onClick: () => setPage("contact") }}
        secondaryLink={{ label: "See the AI Platform", onClick: () => setPage("platform") }}
      />
    </>
  );
}
