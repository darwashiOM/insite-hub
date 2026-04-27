import EditorialHero from '../components/sections/EditorialHero';
import LongForm from '../components/sections/LongForm';
import CardGrid from '../components/sections/CardGrid';
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

const OUTCOMES = [
  { n: "+87%",  l: "AI tool adoption rate vs deployments without literacy program", source: "Source pending — confirm with John" },
  { n: "−72%",  l: "support tickets related to AI tool misuse in first 90 days", source: "Source pending — confirm with John" },
  { n: "3.8×",  l: "speed to AI value vs technology-first deployments", source: "Source pending — confirm with John" },
  { n: "100%",  l: "of completing learners pass post-assessment", source: "Source pending — confirm with John" },
];

export default function LiteracyPage({ setPage }) {
  return (
    <>
      <EditorialHero
        eyebrow="AI Literacy Program"
        headline={<>Your team can't use AI tools they <em>don't understand or trust.</em></>}
        subhead="Before your organization deploys AI, your team needs the concepts, the vocabulary, and the judgment to use it well. Role-targeted tracks across reps, managers, medical, regulatory, and leadership — so adoption doesn't stall at the point of use."
        primaryCta={{ label: "Get the Program Overview", onClick: () => setPage("contact") }}
      />

      <LongForm
        eyebrow="Why Literacy First"
        heading="Teams that understand AI adopt it. Teams that don't, resist it."
        pullQuote="Every failed pharma AI deployment we've diagnosed had the same root cause: the people expected to use the tools didn't have the vocabulary or judgment to use them well."
      >
        <p>What looks like an AI adoption failure is usually a literacy failure. Reps don't trust AI-generated talking points because no one explained where the content comes from or how to spot when the model is wrong. Managers can't interpret AI readiness scores because they don't know what the model is measuring. Medical and Regulatory teams reject AI-generated content reviews because they have no framework for what "AI-generated" means inside their workflow.</p>
        <p>More training on the tool doesn't fix this. Foundational literacy does. Once teams have the vocabulary — what LLMs do well, what they fail at, where human judgment belongs in the loop — adoption stops being a fight. It becomes normal use of normal tools.</p>
        <p>That's what this program does. Six role-targeted tracks, built on 25 years of biopharma commercial training methodology, delivered at enterprise scale through UMU.com.</p>
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

      <SplitFeature
        ratio="60-40"
        eyebrow="Delivery Partnership"
        heading="Built with UMU.com. Deployed at enterprise scale."
        body="InsiteHub's curriculum runs on UMU's enterprise learning infrastructure, reaching commercial organizations across North America, Europe, and Asia-Pacific. Cohorts scale from 50 to 5,000+ learners, and most enterprise rollouts complete in six weeks, kickoff to certification. Integrates with InsiteX, your existing pharma LMS, or UMU's native platform."
        bullets={[
          "Global delivery infrastructure",
          "LMS-agnostic, no rip-and-replace",
          "Pre- and post-assessment with cohort reporting",
          "Cohorts from 50 to 5,000+ learners",
          "Six-week rollout, kickoff to certification",
        ]}
        visual={
          <div style={{ background: "linear-gradient(135deg, rgba(0,122,255,.05), rgba(0,122,255,.1))", border: "1.5px solid rgba(0,122,255,.15)", borderRadius: 20, padding: 32, textAlign: "center" }}>
            <div style={{ fontSize: 32, fontFamily: "Manrope,sans-serif", fontWeight: 900, color: "#007AFF", letterSpacing: "-0.03em", marginBottom: 6 }}>UMU.com</div>
            <div style={{ fontSize: 12, color: "#5C6370", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 18 }}>Strategic Partnership · April 2026</div>
            <div style={{ fontSize: 13, color: "#12141A", lineHeight: 1.6 }}>"InsiteHub's biopharma domain expertise meets UMU's enterprise learning infrastructure. Together: the AI literacy backbone every pharma deployment needs."</div>
          </div>
        }
      />

      <StatBand stats={OUTCOMES} tone="light" />

      <CTABand
        heading={<>Literacy first. <em>Tools second.</em></>}
        body="The organizations getting the most out of AI didn't start with the tools. They started with the team's ability to use them well. Book a consult and we'll map a literacy rollout for your organization."
        primaryCta={{ label: "Book a Consult", onClick: () => setPage("contact") }}
      />
    </>
  );
}
