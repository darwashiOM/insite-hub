/*
 * Editable-content fields for the "proxalab" page (The Lab). Defaults are the
 * current in-code copy, copied verbatim. The hero headline and CTA heading keep
 * a rich (italic) JSX default in the component and render a plain string only
 * when overridden — so their defaults below are the plain-text equivalents.
 */
export default {
  label: 'The Lab',
  fields: [
    { key: 'hero.eyebrow', label: 'Hero eyebrow', type: 'text',
      default: 'Structured AI Experimentation' },
    { key: 'hero.heading', label: 'Hero heading', type: 'textarea',
      default: 'Your AI mandate deserves a properly designed experiment.' },
    { key: 'hero.subhead', label: 'Hero subhead', type: 'textarea',
      default: 'The Lab is the structured AI experimentation practice inside Proxa Labs. We define the right use case, design the experiment against your real constraints, measure what matters, and build the business case that turns results into action. Four phases. Each time-bounded.' },
    { key: 'hero.ctaLabel', label: 'Hero button label', type: 'text', default: 'Book a Consult' },

    { key: 'longform.eyebrow', label: 'Why-experimentation eyebrow', type: 'text',
      default: 'Why Structured Experimentation' },
    { key: 'longform.heading', label: 'Why-experimentation heading', type: 'text',
      default: 'The discipline that matches the environment.' },
    { key: 'longform.p1', label: 'Why-experimentation paragraph 1', type: 'textarea',
      default: "Structured experimentation is the only discipline built for environments where you can't afford to be wrong. It's the approach Bell Labs used to test hypotheses against real constraints before committing to production. It's the approach that shaped 25 years of practitioner biopharma commercial operating decisions — where the constraints are MLR review, launch timelines, and federated commercial structures." },
    { key: 'longform.p2', label: 'Why-experimentation paragraph 2', type: 'textarea',
      default: 'We apply that discipline to AI pilots: define the hypothesis, design for evidence, measure honestly, decide based on data. The method is old. The application to commercial AI is new. The result is a Lab engagement that produces defensible evidence — not engagement metrics — and business cases the CCO, CFO, and CHRO will fund.' },
    { key: 'longform.p3', label: 'Why-experimentation paragraph 3', type: 'textarea',
      default: 'Every Lab engagement is structured around a single four-phase model. Each phase has a deliverable. Each deliverable feeds the next phase. The engagement produces either a funded AI roadmap or a defensible decision not to invest — both are valid outcomes.' },
    { key: 'longform.pullQuote', label: 'Why-experimentation pull quote', type: 'textarea',
      default: "In biopharma, a failed AI pilot doesn't just cost a budget line — it costs launch momentum and CCO trust. We exist to prevent that outcome." },
    { key: 'longform.pullQuoteAttribution', label: 'Pull quote attribution', type: 'text',
      default: 'Nina Patel, The Lab Research Lead, Proxa Labs' },

    { key: 'failures.eyebrow', label: 'Why-pilots-fail eyebrow', type: 'text',
      default: 'Why AI Pilots Fail' },
    { key: 'failures.heading', label: 'Why-pilots-fail heading', type: 'textarea',
      default: 'Three failure patterns account for most pharma AI pilot postmortems.' },
    { key: 'failures.lead', label: 'Why-pilots-fail lead', type: 'textarea',
      default: 'Our engagements are designed around these three most common patterns.' },

    { key: 'phases.eyebrow', label: 'Four-phase eyebrow', type: 'text',
      default: 'The Four-Phase Model' },
    { key: 'phases.heading', label: 'Four-phase heading', type: 'text',
      default: 'Define → Design → Measure → Business Case.' },
    { key: 'phases.lead', label: 'Four-phase lead', type: 'textarea',
      default: 'Each phase is time-bounded with a concrete deliverable. Most Lab engagements complete in six to ten weeks.' },

    { key: 'research.eyebrow', label: 'Active-research eyebrow', type: 'text',
      default: 'Active Research' },
    { key: 'research.heading', label: 'Active-research heading', type: 'text',
      default: 'Research that shapes how we advise.' },
    { key: 'research.lead', label: 'Active-research lead', type: 'textarea',
      default: 'Open research projects that inform our engagements and the Proxa Labs platform.' },

    { key: 'cta.heading', label: 'Closing CTA heading', type: 'text',
      default: 'Bring us your AI mandate.' },
    { key: 'cta.body', label: 'Closing CTA paragraph', type: 'textarea',
      default: "We'll show you what a properly designed experiment looks like in your environment — and what evidence your CCO needs to fund the next phase." },
    { key: 'cta.ctaLabel', label: 'Closing CTA button label', type: 'text', default: 'Book a Consult' },
  ],
};
