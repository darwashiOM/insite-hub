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
  { n: "+87%",  l: "AI tool adoption rate vs deployments without literacy program" },
  { n: "−72%",  l: "support tickets related to AI tool misuse in first 90 days" },
  { n: "3.8×",  l: "speed to AI value vs technology-first deployments" },
  { n: "100%",  l: "of completing learners pass post-assessment" },
];

function DeliveryInfrastructureCard() {
  const stats = [
    { n: "5,000+", l: "learners per cohort" },
    { n: "6 wks", l: "kickoff to certification" },
    { n: "3", l: "deployment regions" },
    { n: "LMS", l: "agnostic delivery" },
  ];
  const regions = ["North America", "Europe", "Asia-Pacific"];

  return (
    <div className="delivery-card">
      <div className="delivery-lockup">
        <div className="delivery-insite-logo" aria-label="InsiteHub">
          <span>INSITE</span><strong>HUB</strong>
        </div>
        <span className="delivery-lockup-x">×</span>
        <div className="delivery-umu-logo">UMU.com</div>
      </div>
      <div className="delivery-card-label">Enterprise AI literacy delivery infrastructure</div>

      <div className="delivery-stat-grid">
        {stats.map(stat => (
          <div key={stat.n} className="delivery-stat">
            <div className="delivery-stat-n">{stat.n}</div>
            <div className="delivery-stat-l">{stat.l}</div>
          </div>
        ))}
      </div>

      <div className="delivery-reach">
        <div className="delivery-reach-title">Global Reach</div>
        <div className="delivery-region-grid">
          {regions.map(region => (
            <div key={region} className="delivery-region">
              <div className="delivery-region-pin" />
              <span>{region}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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
        pullQuoteAttribution="Elena Marquez, AI Literacy Program Lead, InsiteHub"
      >
        <p>What looks like an AI adoption failure is usually a literacy failure. Reps don't trust AI-generated talking points because no one explained where the content comes from or how to spot when the model is wrong. Managers can't interpret AI readiness scores because they don't know what the model is measuring. Medical and Regulatory teams reject AI-generated content reviews because they have no framework for what "AI-generated" means inside their workflow.</p>
        <p>More training on the tool doesn't fix this. Foundational literacy does. Once teams have the vocabulary — what LLMs do well, what they fail at, where human judgment belongs in the loop — adoption stops being a fight. It becomes normal use of normal tools.</p>
        <p>That's what this program does. Six role-targeted tracks, built on 25 years of practitioner biopharma commercial training methodology, delivered at enterprise scale through UMU.com.</p>
      </LongForm>

      <CardGrid
        eyebrow="Six Role-Targeted Tracks"
        heading="Built for every role that touches AI outputs."
        lead="Each track is calibrated to the AI tools and decisions specific to that role. No generic 'what is AI' modules."
        columns={3}
        cards={TRACKS}
        cardStyle="standard"
        background="tinted"
        centerHeader
      />

      <StatBand stats={OUTCOMES} />

      <SplitFeature
        ratio="50-50"
        eyebrow="Delivery Partnership"
        heading="Built with UMU.com. Deployed at enterprise scale."
        body="InsiteHub's curriculum runs on UMU's enterprise learning infrastructure, giving biopharma commercial teams a scalable way to deploy AI literacy globally through InsiteX, an existing pharma LMS, or UMU's native platform."
        visual={<DeliveryInfrastructureCard />}
      >
        <div className="delivery-proof-strip">
          <div>
            <span>Delivery model</span>
            <strong>Curriculum + infrastructure</strong>
          </div>
          <div>
            <span>Integration path</span>
            <strong>InsiteX, existing LMS, or UMU</strong>
          </div>
          <div>
            <span>Measurement</span>
            <strong>Pre/post assessment + cohort reporting</strong>
          </div>
        </div>
      </SplitFeature>

      <CTABand
        heading={<>Literacy first. <em>Tools second.</em></>}
        body="The organizations getting the most out of AI didn't start with the tools. They started with the team's ability to use them well. Book a consult and we'll map a literacy rollout for your organization."
        primaryCta={{ label: "Book a Consult", onClick: () => setPage("contact") }}
      />
    </>
  );
}
