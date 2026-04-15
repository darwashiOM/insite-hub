import EditorialHero from '../components/sections/EditorialHero';
import LongForm from '../components/sections/LongForm';
import StatBand from '../components/sections/StatBand';
import StepRail from '../components/sections/StepRail';
import PullQuote from '../components/sections/PullQuote';
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
  { n: "2018–2022",   title: "Enterprise LMS Platform",      body: "Developed and launched InsiteX — enterprise learning management built for biopharma compliance and credentialing." },
  { n: "2023–Present", title: "AI-First Transformation",      body: "Launched Forge, Atlas, Echo, and Certify — the only closed-loop AI platform in commercial L&D." },
];

export default function AboutPage({ setPage }) {
  return (
    <>
      <EditorialHero
        eyebrow="About InsiteHub"
        headline={<>We've been solving problems biopharma <em>didn't have solutions for yet.</em></>}
        subhead="The best solutions in commercial learning come from practitioners who've worked inside the environment — not vendors adapting generic products for pharma. 25 years inside biopharma. Methodology built from first-hand failure observation."
        primaryCta={{ label: "Start a Conversation", onClick: () => setPage("contact") }}
        secondaryLink={{ label: "Explore Our Services", onClick: () => setPage("advisory") }}
      />

      <LongForm
        eyebrow="Our Story"
        heading="Innovation that comes from the inside."
      >
        <p>InsiteHub was founded on a track record of building things that didn't exist yet — because existing approaches were failing commercial organizations. Content missing launch windows. Training producing completion metrics instead of behavior change. Certification giving false confidence about field readiness.</p>
        <p>Along the way we won the Vanguard Award for the world's best corporate learning program — building an immersive virtual world for a drug launch when competitors quoted $5M platforms. We secured an NIH grant and launched one of only two biomedical accelerators outside a university in the US. We pioneered gamification in pharmaceutical training before it had a name. And we built the first closed-loop AI platform in biopharma commercial learning.</p>
        <p>The result is an organization that leads with diagnosis, experiments before it commits, and measures success against field performance — not engagement metrics. The methodology behind every engagement is the same: define the real problem, experiment before you commit, and never ship something you haven't stress-tested in the actual environment.</p>
      </LongForm>

      <StatBand stats={PROOF_STATS} tone="light" />

      <StepRail
        eyebrow="Our History"
        heading="Built from the inside of biopharma."
        lead="Not looking in from outside. Operating in the environment we now advise."
        steps={TIMELINE}
        background="tinted"
        orientation="vertical"
      />

      <PullQuote
        quote="The best things we've built came from refusing to skip the diagnosis. From treating the methodology as more important than the technology. That's the only thing that's stayed constant across 25 years of pharma commercial learning."
        author={{ name: "InsiteHub", title: "Founding methodology principle", company: "Incorporated 2010 · Newark, DE", avatarInitials: "IH" }}
      />

      <CTABand
        heading={<>Ready to work with a team <em>that's been in your seat?</em></>}
        body="Start with a conversation. No demo. No pitch deck. Just your environment and what you're trying to solve."
        primaryCta={{ label: "Start a Conversation", onClick: () => setPage("contact") }}
        secondaryLink={{ label: "Explore Services", onClick: () => setPage("advisory") }}
      />
    </>
  );
}
