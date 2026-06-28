import EditorialHero from '../components/sections/EditorialHero';
import LongForm from '../components/sections/LongForm';
import CardGrid from '../components/sections/CardGrid';
import StatBand from '../components/sections/StatBand';
import SplitFeature from '../components/sections/SplitFeature';
import CTABand from '../components/sections/CTABand';
import Icon from '../components/Icon';
import { usePageContent } from '../lib/content';

// Headings with inline <em> markup keep their rich JSX default but render a plain
// string when overridden. These constants must match the manifest defaults so the
// component can detect "no override".
const LITERACY_HERO_HEADING_DEFAULT = "Your team can't use AI tools they don't understand or trust.";
const LITERACY_CTA_HEADING_DEFAULT = 'Literacy first. Tools second.';

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
        <div className="delivery-insite-logo" aria-label="Proxa Labs">
          <span>PROXA</span><strong>LABS</strong>
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
  const c = usePageContent('literacy');
  // Rich (italic) headings keep their JSX default, but render a plain string if overridden.
  const heroH = c('hero.heading');
  const heroHeadline = heroH === LITERACY_HERO_HEADING_DEFAULT
    ? <>Your team can't use AI tools they <em>don't understand or trust.</em></>
    : heroH;
  const ctaH = c('cta.heading');
  const ctaHeading = ctaH === LITERACY_CTA_HEADING_DEFAULT
    ? <>Literacy first. <em>Tools second.</em></>
    : ctaH;
  return (
    <>
      <EditorialHero
        eyebrow={c('hero.eyebrow')}
        headline={heroHeadline}
        subhead={c('hero.subhead')}
        primaryCta={{ label: c('hero.ctaLabel'), onClick: () => setPage("contact") }}
      />

      <LongForm
        eyebrow={c('whyLiteracy.eyebrow')}
        heading={c('whyLiteracy.heading')}
        pullQuote={c('whyLiteracy.pullQuote')}
        pullQuoteAttribution={c('whyLiteracy.pullQuoteAttribution')}
      >
        <p>{c('whyLiteracy.body1')}</p>
        <p>{c('whyLiteracy.body2')}</p>
        <p>{c('whyLiteracy.body3')}</p>
      </LongForm>

      <CardGrid
        eyebrow={c('tracks.eyebrow')}
        heading={c('tracks.heading')}
        lead={c('tracks.lead')}
        columns={3}
        cards={TRACKS}
        cardStyle="standard"
        background="tinted"
        centerHeader
      />

      <StatBand stats={OUTCOMES} />

      <SplitFeature
        ratio="50-50"
        eyebrow={c('delivery.eyebrow')}
        heading={c('delivery.heading')}
        body={c('delivery.body')}
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
        heading={ctaHeading}
        body={c('cta.body')}
        primaryCta={{ label: c('cta.ctaLabel'), onClick: () => setPage("contact") }}
      />
    </>
  );
}
