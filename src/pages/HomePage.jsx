import useReveal from '../hooks/useReveal';
import LoopVisual from '../components/LoopVisual';
import LoopMobile from '../components/LoopMobile';
import EditorialHero from '../components/sections/EditorialHero';
import StatBand from '../components/sections/StatBand';
import SplitFeature from '../components/sections/SplitFeature';
import CardGrid from '../components/sections/CardGrid';
import PullQuote from '../components/sections/PullQuote';
import StepRail from '../components/sections/StepRail';
import CTABand from '../components/sections/CTABand';
import ProductShowcase from '../components/sections/ProductShowcase';
import ForgeShowcase from '../components/showcase/ForgeShowcase';
import AtlasShowcase from '../components/showcase/AtlasShowcase';
import EchoShowcase from '../components/showcase/EchoShowcase';
import CertifyShowcase from '../components/showcase/CertifyShowcase';
import AnnouncementBand from '../components/AnnouncementBand';
import Icon from '../components/Icon';

const CLIENT_LOGOS = ["AbbVie","Allergan","Amgen","AstraZeneca","Bayer","Biogen","BMS","Genentech","GSK","Janssen","Merck","Novartis","Novo Nordisk","Pfizer","Roche","Sanofi","Takeda","Teva","Gilead","Mass General","Penn Medicine","MD Anderson"];

const STATS = [
  { n: "80–95%", l: "of pharma AI pilots never scale or deliver measurable value" },
  { n: "11 mo",  l: "average ramp to full rep productivity in biopharma" },
  { n: "84%",    l: "of pharma reps missed quota last year" },
  { n: "25 yrs", l: "biopharma commercial L&D expertise behind our methodology" },
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
  useReveal();
  return (
    <>
      <EditorialHero
        eyebrow="AI-First · Innovation-Led · Purpose-Built for Biopharma"
        headline={<>The <em>strategy, literacy,<br />and platform</em> to turn<br />your AI mandate into results.</>}
        subhead="The only closed-loop AI platform built for biopharma — and the only partner with the advisory methodology, AI literacy program, and implementation track record to make it stick."
        primaryCta={{ label: "Book a Demo", onClick: () => setPage("contact") }}
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
        tag="New Program"
        title="AI Literacy Program — the prerequisite every AI deployment needs."
        description="Build AI fluency across every role before tools go live. Teams that understand AI adopt it. Teams that don't, resist it."
        primaryCta={{ label: "See the Program", onClick: () => setPage("literacy") }}
        secondaryCta={{ label: "Get the Overview", onClick: () => setPage("contact") }}
      />

      <CardGrid
        eyebrow="The InsiteHub Difference"
        heading="Innovation isn't a talking point here. It's a track record."
        lead="Methodology before technology. Compliance by design. Insider credibility. Experimentation before commitment. The same four principles behind 25 years of award-winning work."
        columns={2}
        cards={DIFFERENTIATORS}
        cardStyle="feature"
        background="tinted"
      />

      <ProductShowcase
        product="forge"
        eyebrow="InsiteHub Forge"
        tagline="Agentic content creation."
        body="AI agents build MLR-compliant training from your PI, CSRs, and brand assets. Hours, not months. Every claim traced to source."
        bullets={["Auto-generation from clinical data and PI", "Every claim cited — MLR artifacts auto-built", "Veeva workflow integration", "Content Gap Analyzer closes the loop from Echo"]}
        mockup={<ForgeShowcase />}
      />

      <ProductShowcase
        product="atlas"
        eyebrow="InsiteHub Atlas"
        tagline="AI-powered adaptive learning."
        body="Personalized pathways closing knowledge gaps in real time, ensuring reps are field-ready before the launch window closes."
        bullets={["Competency-mapped personalized pathways", "Gap-aware adaptive remediation engine", "Manager dashboards with predictive readiness", "Integrates with InsiteX LMS and Veeva"]}
        mockup={<AtlasShowcase />}
        reverse
        background="tinted"
      />

      <ProductShowcase
        product="echo"
        eyebrow="InsiteHub Echo"
        tagline="AI roleplay & behavioral assessment."
        body="Reps practice live HCP conversations with AI physician avatars. ComplianceGuard monitors every message in real time."
        bullets={["8 HCP digital twin avatars", "ComplianceGuard real-time flagging", "Behavioral scorecard + industry benchmarks", "Gap payload feeds Forge auto-rebuild"]}
        mockup={<EchoShowcase />}
      />

      <ProductShowcase
        product="certify"
        eyebrow="Certify"
        tagline="Demonstrated field readiness."
        body="Certification earned through demonstrated competency — not attendance. Behavioral evidence tied to every credential. 10-year audit trail."
        bullets={["Competency-gated — no attendance shortcuts", "Behavioral evidence for every credential", "SHA-256 immutable 10-year audit log", "SOC 2 Type II compliant"]}
        mockup={<CertifyShowcase />}
        reverse
        background="tinted"
      />

      <PullQuote
        quote="We had been trying to make AI work for 18 months. Two pilots, two postmortems, and a CCO who was starting to ask whether L&D could actually lead this. What Proxa Labs did differently was refuse to let us skip the hard part — defining what success actually looked like before we built anything. We walked into our budget review with evidence, not a pitch deck."
        author={{ name: "Sarah Chen", title: "VP, Commercial Learning & Development", company: "Mid-Size Oncology Biopharma · Series C", avatarInitials: "SC" }}
        stats={[
          { n: "23%", l: "improvement in manager-assessed call quality" },
          { n: "0",   l: "MLR compliance flags across all sessions" },
          { n: "3 wks", l: "from pilot conclusion to CCO approval" },
          { n: "6 mo", l: "full AI roadmap funded and in execution" },
        ]}
      />

      <CardGrid
        eyebrow="Who InsiteHub Is For"
        heading="Built for the commercial L&D leader who's done with pilots that go nowhere."
        lead="If any of these sound like your situation, you're in the right place."
        columns={3}
        cards={SITUATION_CARDS}
        cardStyle="standard"
        centerHeader
      />

      <StepRail
        eyebrow="For Every Stage of the Journey"
        heading="AI is where we're headed. But we meet you where you are."
        lead="InsiteHub has been delivering enterprise learning infrastructure for biopharma commercial teams for over four years. The AI platform is our destination. Your timeline is yours to set."
        steps={STEPS}
        background="tinted"
      />

      <CTABand
        heading={<>The mandate is clear.<br /><em>The platform is ready.</em></>}
        body="InsiteHub works with commercial L&D leaders who have an AI imperative and no reliable way to execute it. Let's figure out what your actual next step is."
        primaryCta={{ label: "Book a Discovery Call", onClick: () => setPage("contact") }}
        secondaryLink={{ label: "Request a Platform Demo", onClick: () => setPage("contact") }}
      />
    </>
  );
}
