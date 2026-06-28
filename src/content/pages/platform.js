/*
 * Editable-content fields for the Platform page. Defaults are the current in-code
 * copy, copied verbatim from PlatformPage.jsx. The page renders an override when
 * present, otherwise the default. For headings with inline markup (hero.headline,
 * cta.heading) the default is the plain-text version; PlatformPage compares against
 * it to decide whether to render the rich (italic) JSX or a plain override string.
 */
export default {
  label: 'Platform',
  fields: [
    { key: 'hero.eyebrow', label: 'Hero eyebrow', type: 'text',
      default: 'AI Platform' },
    { key: 'hero.headline', label: 'Hero headline', type: 'textarea',
      default: 'One platform. Four products. A closed loop that never breaks.' },
    { key: 'hero.subhead', label: 'Hero subhead', type: 'textarea',
      default: 'Forge builds MLR-compliant content. Cue delivers adaptive learning. Stage assesses readiness in live HCP roleplay. Trace confirms behavioral competency. When a rep falls short, the system rebuilds the content automatically — no human handoffs, no stalled remediation cycles.' },
    { key: 'hero.ctaLabel', label: 'Hero button label', type: 'text',
      default: 'Book a Demo' },

    { key: 'loop.eyebrow', label: 'Closed Loop eyebrow', type: 'text',
      default: 'The Closed Loop' },
    { key: 'loop.heading', label: 'Closed Loop heading', type: 'textarea',
      default: 'Build → Deliver → Assess → Trace → Repeat. Most learning platforms stop where ours begins.' },
    { key: 'loop.lead', label: 'Closed Loop lead', type: 'textarea',
      default: 'Forge builds the content. Cue delivers the learning. Stage assesses the readiness. Trace verifies the competency. When a gap appears, the loop closes itself.' },
    { key: 'loop.body1', label: 'Closed Loop paragraph 1', type: 'textarea',
      default: "Most pharma learning platforms are one-way. Content flows from authors to learners, assessments measure completion, and that's where the loop ends. When a rep can't handle an HCP objection in the field, the platform doesn't know. The next cohort gets the same content. The same gaps appear." },
    { key: 'loop.body2', label: 'Closed Loop paragraph 2', type: 'textarea',
      default: "Proxa Labs inverts the sequence. Stage's behavioral assessments surface structured gap signals — specific competencies where reps underperform against benchmarks. Those signals flow into Forge as a content brief. Forge drafts remediation content overnight, routes it through MLR pre-checks, and publishes to Cue before the next training cycle. The loop closes itself." },
    { key: 'loop.body3', label: 'Closed Loop paragraph 3', type: 'textarea',
      default: "No other platform in biopharma commercial learning does this. Not because it's hard to build, but because no one else has the methodology behind it." },

    { key: 'forge.eyebrow', label: 'Forge eyebrow', type: 'text',
      default: 'Forge' },
    { key: 'forge.tagline', label: 'Forge tagline', type: 'text',
      default: 'Agentic content creation.' },
    { key: 'forge.body', label: 'Forge body', type: 'textarea',
      default: 'AI agents build MLR-compliant training content from your PI, CSRs, and brand assets — every claim cited to source. Hours, not months. No instructional designer required to get to a first draft.' },

    { key: 'cue.eyebrow', label: 'Cue eyebrow', type: 'text',
      default: 'Cue' },
    { key: 'cue.tagline', label: 'Cue tagline', type: 'text',
      default: 'AI-powered adaptive learning.' },
    { key: 'cue.body', label: 'Cue body', type: 'textarea',
      default: 'Personalized learning pathways mapped to competencies and role requirements. Real-time gap detection adjusts the path before reps reach the field.' },

    { key: 'stage.eyebrow', label: 'Stage eyebrow', type: 'text',
      default: 'Stage' },
    { key: 'stage.tagline', label: 'Stage tagline', type: 'text',
      default: 'AI roleplay & behavioral assessment.' },
    { key: 'stage.body', label: 'Stage body', type: 'textarea',
      default: 'Live HCP roleplay with AI physician avatars. Real-time compliance monitoring flags off-label language and unsupported claims before they reach the field.' },

    { key: 'trace.eyebrow', label: 'Trace eyebrow', type: 'text',
      default: 'Trace' },
    { key: 'trace.tagline', label: 'Trace tagline', type: 'text',
      default: 'Demonstrated field readiness.' },
    { key: 'trace.body', label: 'Trace body', type: 'textarea',
      default: 'Certification earned through behavioral competency, not attendance. Every record is audit-ready, tied to specific behavioral evidence, and retained for 10 years.' },

    { key: 'compare.eyebrow', label: 'Comparison eyebrow', type: 'text',
      default: 'Side by Side' },
    { key: 'compare.heading', label: 'Comparison heading', type: 'text',
      default: 'How the three options compare.' },
    { key: 'compare.lead', label: 'Comparison lead', type: 'textarea',
      default: 'Two Proxa Labs paths. One reason traditional LMS falls short.' },

    { key: 'cta.heading', label: 'Closing CTA heading', type: 'text',
      default: 'See the closed loop in action.' },
    { key: 'cta.body', label: 'Closing CTA paragraph', type: 'textarea',
      default: "We'll walk you through Forge, Cue, and Stage in the context of your commercial organization — not a generic product tour." },
    { key: 'cta.ctaLabel', label: 'Closing CTA button label', type: 'text',
      default: 'Book a Demo' },
  ],
};
