import EditorialHero from '../components/sections/EditorialHero';
import LongForm from '../components/sections/LongForm';
import StatBand from '../components/sections/StatBand';
import StepRail from '../components/sections/StepRail';
import CTABand from '../components/sections/CTABand';

const PROOF_STATS = [
  { n: "1st",  l: "Virtual world for a drug launch — Vanguard Award winner" },
  { n: "100%", l: "Gamified training participation across 600 sales managers" },
  { n: "2nd",  l: "NIH biomedical accelerator outside a university in the US" },
  { n: "Only", l: "Closed-loop AI platform in commercial L&D" },
];

const TIMELINE = [
  { n: "2010",        title: "InsiteHub Founded",            body: "Incorporated through the University of Delaware Spin-In Program to serve life sciences commercial organizations." },
  { n: "2010s",       title: "Expanded Across Life Sciences", body: "Grew to 30+ organizations including AbbVie, Pfizer, Novartis, Biogen, Sanofi, and major academic medical centers." },
  { n: "2014–2018",   title: "NIH Grant & InsiteXcelerator", body: "Awarded NIH grant. Became the 2nd NIH-partnered biomedical accelerator outside a university in the US." },
  { n: "2018–2022",   title: "InsiteX LMS",                  body: "Enterprise learning management, built for biopharma compliance and credentialing from day one." },
  { n: "2023–Present", title: "The AI Platform",             body: "Forge, Atlas, Echo, and Certify — the only closed-loop AI platform in biopharma commercial learning." },
];

export default function AboutPage({ setPage }) {
  return (
    <>
      <EditorialHero
        eyebrow="About InsiteHub"
        headline={<>Built by practitioners. <em>For practitioners.</em></>}
        subhead="InsiteHub was founded by people who spent 25 years inside biopharma commercial organizations — under the same launch pressure, compliance constraints, and executive scrutiny our clients navigate now. The methodology didn't come from a consulting framework. It came from watching programs succeed and fail from the inside."
        className="about-hero-section"
      />

      <LongForm
        eyebrow="Our Story"
        heading="We built what biopharma didn't have."
        className="about-story-section"
      >
        <p>InsiteHub was founded because existing approaches were failing commercial organizations. Content missed launch windows. Training produced completion metrics instead of behavior change. Certification gave false confidence about field readiness. The industry had accepted these failures as the cost of doing business. We didn't.</p>
        <p>The work that followed became the foundation of how InsiteHub operates. A Vanguard Award for the world's best corporate learning program — built as an immersive virtual world for a drug launch while competitors quoted $5M platforms. An NIH grant and one of only two biomedical accelerators outside a university in the US. Gamification in pharmaceutical training before the category had a name. And the first closed-loop AI platform in biopharma commercial learning.</p>
        <p>Every one of these was the same move: diagnose the problem before building the solution, experiment in the real environment before committing at scale, and measure against field performance — not engagement metrics. That methodology is still how InsiteHub works today.</p>
      </LongForm>

      <StatBand stats={PROOF_STATS} />

      <StepRail
        eyebrow="Our History"
        heading="Since 2010, building from the inside."
        lead="InsiteHub's company history began in 2010. Each stage solved a problem the industry had accepted as unfixable."
        steps={TIMELINE}
        background="tinted"
        orientation="vertical"
        sectionClassName="about-history-section"
        className="about-history-rail"
      />

      <CTABand
        heading={<>Work with a team <em>that's been in your seat.</em></>}
        body="No demo. No pitch deck. Just your environment and what you're trying to solve."
        primaryCta={{ label: "Book a Consult", onClick: () => setPage("contact") }}
      />
    </>
  );
}
