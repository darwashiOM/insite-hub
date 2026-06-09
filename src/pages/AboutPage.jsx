import EditorialHero from '../components/sections/EditorialHero';
import LongForm from '../components/sections/LongForm';
import StatBand from '../components/sections/StatBand';
import CTABand from '../components/sections/CTABand';

const PROOF_STATS = [
  { n: "1st",  l: "Virtual world for a drug launch — Vanguard Award winner" },
  { n: "100%", l: "Gamified training participation across 600 sales managers" },
  { n: "Only", l: "Closed-loop AI platform in commercial L&D" },
];

export default function AboutPage({ setPage }) {
  return (
    <>
      <EditorialHero
        eyebrow="About Proxa Labs"
        headline={<>Built by someone who's <em>been in your seat.</em></>}
        subhead={`Somewhere in the last few years, every biopharma L&D leader got the same message: "do something with AI." Most of them are still figuring out what that means.`}
        className="about-hero-section"
      />

      <LongForm
        eyebrow="Why Proxa Labs"
        heading="25 years of solving exactly this problem."
        className="about-story-section"
      >
        <p>That message lands differently depending on where you sit. If you're the head of commercial L&D at a mid-size biopharma, it probably means you're fielding vendor solutions before you've defined the problem and launching use cases before your team knows what success looks like. The result? Poor adoption rates, wasted budget, and a leadership team that keeps asking "What's taking so long?" Every month without a clear methodology is another month your commercial team isn't performing at the level AI could enable. The pressure is real. The roadmap to get there isn't.</p>
        <p>John Royer has spent 25 years solving exactly that problem — how to build real capability inside a commercial organization, without chasing vendor hype or skipping the foundational work that makes adoption successful. At AstraZeneca, when the standard approach to a major European drug launch was a $5 million vendor platform, he built something no one had built before — a fully immersive virtual world where 400 sales reps could train, practice, and launch inside a 3D environment — saving the company nearly $10 million while delivering engagement the industry had never seen. Sales performance held. That work won the Vanguard Award for Best Corporate Learning Program in the World. It was proof that when you define the problem before you build the solution, the results will follow.</p>
        <p>After two decades of watching organizations buy solutions before they understood the problem, John built Proxa Labs to be the innovation partner the industry has been missing. Proxa Labs combines the experimentation and rigor of a research lab with 25 years of biopharma-specific expertise to help commercial L&D leaders move from AI pressure to a clear path forward. Every engagement starts the same way: define the problem, assess organizational readiness, and design structured experiments before a dollar is committed to a solution. The result is AI capability that their teams actually adopt and use to drive commercial performance.</p>
      </LongForm>

      <StatBand stats={PROOF_STATS} />

      <CTABand
        heading={<>Work with a team <em>that's been in your seat.</em></>}
        body="No demo. No pitch deck. Just your environment and what you're trying to solve."
        primaryCta={{ label: "Book a Consult", onClick: () => setPage("contact") }}
      />
    </>
  );
}
