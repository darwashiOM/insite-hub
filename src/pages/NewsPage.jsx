import EditorialHero from '../components/sections/EditorialHero';
import SplitFeature from '../components/sections/SplitFeature';
import CardGrid from '../components/sections/CardGrid';
import CTABand from '../components/sections/CTABand';
import Icon from '../components/Icon';

const SECONDARY_NEWS = [
  { icon: <Icon name="update" size={22} />,      tag: "March 2026 · Platform Update", title: "InsiteHub Echo — ComplianceGuard v2 Released",                 body: "Real-time compliance monitoring now includes enhanced MLR flag categorization, automated rephrasing suggestions, and expanded banned phrase detection across all six commercial verticals. Available to all Echo clients immediately." },
  { icon: <Icon name="research" size={22} />,    tag: "February 2026 · Research",       title: "Proxa Labs publishes AI Readiness Scoring Model beta",         body: "The Proxa Labs team has released a beta version of the AI Readiness Scoring Model — an 8-dimension maturity framework for measuring commercial L&D AI readiness. Available to advisory engagement clients as part of Phase 1 diagnostics." },
  { icon: <Icon name="partnership" size={22} />, tag: "January 2026 · Partnership",      title: "InsiteHub named University of Delaware AI Center BPIR",         body: "InsiteHub has been appointed Business Partner in Residence at the University of Delaware's AI Center of Excellence — deepening the academic research relationship behind the Proxa Labs experimentation methodology." },
  { icon: <Icon name="launch" size={22} />,      tag: "December 2025 · Platform Launch", title: "InsiteHub Forge v4.0 — General Availability",                  body: "Forge's agentic content creation platform reaches general availability, including the Content Gap Analyzer, MLR Package Builder, and Knowledge Session dual-track sourcing engine. Available to enterprise commercial L&D teams now." },
];

export default function NewsPage({ setPage }) {
  return (
    <>
      <EditorialHero
        eyebrow="Latest from InsiteHub"
        headline={<>What's new at <em>InsiteHub.</em></>}
        subhead="Partnerships, product launches, research milestones, and news from the team building the first closed-loop AI platform in biopharma commercial learning."
        primaryCta={{ label: "Subscribe to Updates", onClick: () => setPage("newsletter") }}
      />

      <SplitFeature
        ratio="50-50"
        eyebrow="April 2026 · Featured Partnership Announcement"
        heading="InsiteHub partners with UMU.com to power AI Literacy delivery at scale."
        body="A strategic partnership combining InsiteHub's biopharma domain expertise and curriculum design with UMU's enterprise learning delivery infrastructure — enabling scalable, measurable AI literacy programs that integrate with existing LMS environments."
        bullets={[
          "Global delivery infrastructure across NA, EU, APAC",
          "LMS-integrated — works with InsiteX, Veeva, and existing pharma LMS environments",
          "Pre/post assessments tracking AI literacy gains by role and cohort",
        ]}
        cta={{ label: "See the AI Literacy Program", onClick: () => setPage("literacy") }}
        visual={
          <div style={{ background: "linear-gradient(135deg, #F8F8FF, #F0F4FF)", border: "1.5px solid rgba(0,122,255,.2)", borderRadius: 20, padding: 32 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#007AFF", marginBottom: 16 }}>NEW PARTNERSHIP</div>
            <div style={{ fontFamily: "Manrope,sans-serif", fontWeight: 900, fontSize: 28, color: "#007AFF", letterSpacing: "-0.03em", marginBottom: 4 }}>UMU.com</div>
            <div style={{ fontFamily: "Manrope,sans-serif", fontWeight: 700, fontSize: 14, color: "#12141A", marginBottom: 20 }}>× InsiteHub</div>
            <div style={{ fontSize: 13, color: "#5C6370", lineHeight: 1.7 }}>"The biopharma domain expertise meets enterprise learning infrastructure. Together: the AI literacy backbone every pharma deployment needs."</div>
          </div>
        }
      />

      <CardGrid
        eyebrow="Recent Announcements"
        heading="More from InsiteHub and Proxa Labs."
        columns={2}
        cards={SECONDARY_NEWS}
        cardStyle="standard"
        background="tinted"
      />

      <CTABand
        heading={<>Get the announcements <em>before they're public.</em></>}
        body="Frameworks, research, and partnerships from InsiteHub and Proxa Labs. Sent when there's something genuinely worth your time."
        primaryCta={{ label: "Subscribe", onClick: () => setPage("newsletter") }}
      />
    </>
  );
}
