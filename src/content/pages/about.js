/*
 * Editable-content manifest for the About page. Defaults are the current in-code
 * copy, copied verbatim. The page renders an override when present, otherwise the
 * default. Rich headings (with inline <em>) keep their JSX default in the
 * component and render a plain string only when overridden.
 */
export default {
  label: 'About',
  fields: [
    { key: 'hero.eyebrow', label: 'Hero eyebrow', type: 'text',
      default: 'About Proxa Labs' },
    { key: 'hero.headline', label: 'Hero headline', type: 'text',
      default: "Built by someone who's been in your seat." },
    { key: 'hero.subhead', label: 'Hero subhead', type: 'textarea',
      default: 'Somewhere in the last few years, every biopharma L&D leader got the same message: "do something with AI." Most of them are still figuring out what that means.' },

    { key: 'story.eyebrow', label: 'Story eyebrow', type: 'text',
      default: 'Why Proxa Labs' },
    { key: 'story.heading', label: 'Story heading', type: 'text',
      default: '25 years of solving exactly this problem.' },
    { key: 'story.p1', label: 'Story paragraph 1', type: 'textarea',
      default: `That message lands differently depending on where you sit. If you're the head of commercial L&D at a mid-size biopharma, it probably means you're fielding vendor solutions before you've defined the problem and launching use cases before your team knows what success looks like. The result? Poor adoption rates, wasted budget, and a leadership team that keeps asking "What's taking so long?" Every month without a clear methodology is another month your commercial team isn't performing at the level AI could enable. The pressure is real. The roadmap to get there isn't.` },
    { key: 'story.p2', label: 'Story paragraph 2', type: 'textarea',
      default: `John Royer has spent 25 years solving exactly that problem — how to build real capability inside a commercial organization, without chasing vendor hype or skipping the foundational work that makes adoption successful. At AstraZeneca, when the standard approach to a major European drug launch was a $5 million vendor platform, he built something no one had built before — a fully immersive virtual world where 400 sales reps could train, practice, and launch inside a 3D environment — saving the company nearly $10 million while delivering engagement the industry had never seen. Sales performance held. That work won the Vanguard Award for Best Corporate Learning Program in the World. It was proof that when you define the problem before you build the solution, the results will follow.` },
    { key: 'story.p3', label: 'Story paragraph 3', type: 'textarea',
      default: `After two decades of watching organizations buy solutions before they understood the problem, John built Proxa Labs to be the innovation partner the industry has been missing. Proxa Labs combines the experimentation and rigor of a research lab with 25 years of biopharma-specific expertise to help commercial L&D leaders move from AI pressure to a clear path forward. Every engagement starts the same way: define the problem, assess organizational readiness, and design structured experiments before a dollar is committed to a solution. The result is AI capability that their teams actually adopt and use to drive commercial performance.` },

    { key: 'stats.0.n', label: 'Proof stat 1 — number', type: 'text', default: '1st' },
    { key: 'stats.0.l', label: 'Proof stat 1 — label', type: 'text',
      default: 'Virtual world for a drug launch — Vanguard Award winner' },
    { key: 'stats.1.n', label: 'Proof stat 2 — number', type: 'text', default: '100%' },
    { key: 'stats.1.l', label: 'Proof stat 2 — label', type: 'text',
      default: 'Gamified training participation across 600 sales managers' },
    { key: 'stats.2.n', label: 'Proof stat 3 — number', type: 'text', default: 'Only' },
    { key: 'stats.2.l', label: 'Proof stat 3 — label', type: 'text',
      default: 'Closed-loop AI platform in commercial L&D' },

    { key: 'cta.heading', label: 'Closing CTA heading', type: 'text',
      default: "Work with a team that's been in your seat." },
    { key: 'cta.body', label: 'Closing CTA paragraph', type: 'textarea',
      default: "No demo. No pitch deck. Just your environment and what you're trying to solve." },
    { key: 'cta.ctaLabel', label: 'Closing CTA button label', type: 'text',
      default: 'Book a Consult' },
  ],
};
