import LoopVisual from '../components/LoopVisual';
import LoopMobile from '../components/LoopMobile';
import EditorialHero from '../components/sections/EditorialHero';
import StatBand from '../components/sections/StatBand';
import CardGrid from '../components/sections/CardGrid';
import PullQuote from '../components/sections/PullQuote';
import StepRail from '../components/sections/StepRail';
import CTABand from '../components/sections/CTABand';
import AnnouncementBand from '../components/AnnouncementBand';
import Icon from '../components/Icon';

const CLIENT_LOGOS = ["AbbVie","Allergan","Amgen","AstraZeneca","Bayer","Biogen","BMS","Genentech","GSK","Janssen","Merck","Novartis","Novo Nordisk","Pfizer","Roche","Sanofi","Takeda","Teva","Gilead","Mass General","Penn Medicine","MD Anderson"];

const STATS = [
  { n: "80–95%", l: "of pharma AI pilots never scale or deliver measurable value", source: "Source: Saama / Forbes, 2025" },
  { n: "11 mo",  l: "average ramp to full rep productivity in biopharma", source: "Source: Salesforce State of Sales, 2024" },
  { n: "84%",    l: "of pharma reps missed quota last year", source: "Source: Salesforce State of Sales, 2024" },
  { n: "25 yrs", l: "biopharma commercial L&D expertise behind our methodology", source: "InsiteHub" },
];

const DIFFERENTIATORS = [
  { icon: <Icon name="methodology" size={26} />, tag: "01 — Methodology", title: "We diagnose before we prescribe.", body: "Every engagement starts with the question your organization actually needs answered: what will determine whether any AI implementation succeeds or fails here? Most vendors skip this. We never do." },
  { icon: <Icon name="compliance" size={26} />,  tag: "02 — Compliance",  title: "Their compliance story is a retrofit. Ours is not.", body: "MLR review, GxP validation, and compressed launch windows are the operating conditions InsiteHub was designed around from day one." },
  { icon: <Icon name="award" size={26} />,        tag: "03 — Insider",     title: "We don't need you to explain pharma to us.", body: "InsiteHub's practitioners have operated inside the environments they now advise. The failure modes are already known. That's a 25-year track record, not a talking point." },
  { icon: <Icon name="pilot" size={26} />,       tag: "04 — Experiment",  title: "You don't commit until you have evidence.", body: "InsiteHub's model inverts the typical vendor sequence. We run structured experiments to test fit in your environment before you stake your credibility on it." },
];

const SITUATION_CARDS = [
  { icon: <Icon name="strategy" size={22} />, title: "You have an AI mandate with no clear path forward",   body: "Your CCO wants results. Your IT and compliance teams want governance. Your budget requires ROI. You're navigating all three without a methodology." },
  { icon: <Icon name="gap" size={22} />,      title: "You've run a pilot that didn't scale",                body: "It worked in the demo. It looked good in the pilot report. And then it died at the governance gate or got quietly deprioritized." },
  { icon: <Icon name="launch" size={22} />,   title: "You have a launch in 6–9 months and content isn't ready", body: "The commercial team needs field-ready reps. The content pipeline is behind. MLR review adds 60 days on a good day." },
  { icon: <Icon name="research" size={22} />, title: "You're evaluating AI vendors and can't tell who to trust", body: "Every vendor says they're built for biopharma. Every demo looks polished. You've been burned before." },
  { icon: <Icon name="readiness" size={22} />, title: "Your L&D team is measuring completion, not performance", body: "You know the CCO scorecard tracks rep readiness, call quality, and launch execution speed — not module completion." },
  { icon: <Icon name="infrastructure" size={22} />, title: "You're building AI capability from scratch",   body: "No existing platform. No governance framework. No internal AI literacy. You need a structured starting point." },
];

const STEPS = [
  { n: "01", title: "Start where you are", body: "InsiteX LMS or traditional content. Proven, compliant, built for pharma." },
  { n: "02", title: "Assess your AI readiness", body: "Advisory team maps your constraints before recommending anything. No technology pitch." },
  { n: "03", title: "Build AI literacy across your team", body: "Equip every role — reps, managers, medical affairs — with the fluency to adopt AI tools effectively.", highlight: true },
  { n: "04", title: "Experiment before committing", body: "Structured pilots generate evidence in your environment before you scale." },
  { n: "05", title: "Deploy with confidence", body: "Forge, Atlas, and Echo built to survive your governance environment." },
];

export default function HomePage({ setPage }) {
  return (
    <>
      <EditorialHero
        eyebrow="FOR COMMERCIAL L&D LEADERS IN BIOPHARMA"
        headline={<>The AI commercial learning partner <em>built for biopharma</em> — not adapted for it.</>}
        subhead="Most platforms were built for enterprise sales and retrofitted for pharma. InsiteHub was built for biopharma from day one: advisory methodology, AI literacy programming, and a closed-loop platform designed around the constraints you actually operate in: MLR review, launch timelines, federated commercial structures."
        secondaryLink={{ label: "See the Platform", onClick: () => setPage("platform") }}
        visual={<><div className="hero-loop-desktop"><LoopVisual /></div><div className="hero-loop-mobile"><LoopMobile /></div></>}
      />

      <div className="logo-band">
        <div className="lb-label">Trusted across biopharma and health systems</div>
        <div className="lb-row">
          {CLIENT_LOGOS.map(n => <span key={n} className="lb-co">{n}</span>)}
        </div>
      </div>

      <StatBand stats={STATS} tone="dark" />

      <AnnouncementBand
        icon={<Icon name="literacy" size={24} color="#D97706" />}
        tag="New"
        title="AI Literacy Program — the prerequisite every AI deployment needs."
        description="Build AI fluency across every role before tools go live. Teams that understand AI adopt it. Teams that don't, resist it."
        primaryCta={{ label: "See the Program", onClick: () => setPage("literacy") }}
      />

      <CardGrid
        eyebrow="Four Principles for Evaluating Any AI Partner"
        heading="How do you know if AI is actually working in your organization?"
        lead={<>Most biopharma L&D leaders can't answer that question with confidence because the data that matters isn't in the dashboard.<br /><br />These four principles are how InsiteHub diagnoses whether AI is actually delivering, and how we've built 25-years of award-winning work around them.</>}
        columns={2}
        cards={DIFFERENTIATORS}
        cardStyle="feature"
        background="tinted"
      />

      <CardGrid
        eyebrow="The AI Platform"
        heading="Four products. One closed loop."
        lead={<>Content published in Forge → delivered by Atlas → assessed by Echo → verified in Certify. Every gap automatically restarts the loop.<br /><br /><a href="https://www.notion.so/98543fc20d0b4edcabc5c033bb1ae295?pvs=21" target="_blank" rel="noopener noreferrer">See the full platform for product detail and UI previews.</a></>}
        columns={2}
        cards={[
          { icon: <Icon name="agent"    size={26} color="#F4801F" />, tag: "Forge",   tagColor: "#F4801F", title: "Agentic content creation.",      body: "AI agents build MLR-compliant training from your PI, CSRs, and brand assets. Hours, not months." },
          { icon: <Icon name="pathway"  size={26} color="#007AFF" />, tag: "Atlas",   tagColor: "#007AFF", title: "AI-powered adaptive learning.",  body: "Personalized pathways that close knowledge gaps in real time, ensuring reps are field-ready." },
          { icon: <Icon name="roleplay" size={26} color="#7C3AED" />, tag: "Echo",    tagColor: "#7C3AED", title: "AI roleplay + compliance guard.", body: "Live HCP conversations with AI physician avatars. ComplianceGuard monitors every message in real time." },
          { icon: <Icon name="audit"    size={26} color="#059669" />, tag: "Certify", tagColor: "#059669", title: "Demonstrated field readiness.",   body: "Certification earned through behavioral competency — not attendance. 10-year audit trail." },
        ]}
        cardStyle="feature"
        background="tinted"
        centerHeader
      />

      <PullQuote
        quote="We had been trying to make AI work for 18 months. Two pilots, two postmortems, and a CCO who was starting to ask whether L&D could actually lead this. What InsiteHub did differently was refuse to let us skip the hard part — defining what success actually looked like before we built anything. We walked into our budget review with evidence, not a pitch deck."
        author={{ name: "Sarah Chen", title: "VP, Commercial Learning & Development", company: "Mid-Size Oncology Biopharma · Series C", avatarInitials: "SC" }}
        stats={[
          { n: "23%", l: "improvement in manager-assessed call quality" },
          { n: "0",   l: "MLR compliance flags across all sessions" },
          { n: "3 wks", l: "from pilot conclusion to CCO approval" },
          { n: "6 mo", l: "full AI roadmap funded and in execution" },
        ]}
      />

      <CardGrid
        eyebrow="When to Call Us"
        heading="Built for the commercial L&D leader who's done with pilots that go nowhere."
        lead="If any of these sound like your situation, you're in the right place."
        columns={3}
        cards={SITUATION_CARDS}
        cardStyle="standard"
        centerHeader
      />

      <StepRail
        eyebrow="For Every Stage of the Journey"
        heading="From where you are to AI-ready."
        lead="Four years of enterprise learning infrastructure in biopharma. A closed-loop AI platform built on top of it. You decide when and how fast to move."
        steps={STEPS}
        background="tinted"
      />

      <CTABand
        heading={<>The mandate is clear.<br /><em>The path forward isn't always.</em></>}
        body="InsiteHub works with commercial L&D leaders who have been told to deliver on AI but haven't found a partner who understands what that actually requires in a biopharma environment. Start with a conversation. We'll tell you what we'd look at first."
        primaryCta={{ label: "Book a Consult", onClick: () => setPage("contact") }}
      />
    </>
  );
}
