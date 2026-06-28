/*
 * Editable-content manifest for the Content Development page (id "content").
 * Each field's `default` is the current in-code copy, copied verbatim from
 * ContentPage.jsx. The page renders an override when present, else the default.
 */
export default {
  label: 'Content Development',
  fields: [
    // Hero
    { key: 'hero.eyebrow', label: 'Hero eyebrow', type: 'text',
      default: 'Content Development' },
    { key: 'hero.headline', label: 'Hero headline', type: 'textarea',
      default: 'MLR-compliant content. Built for field readiness.' },
    { key: 'hero.subhead', label: 'Hero subhead', type: 'textarea',
      default: "Every output is MLR-compliant, built by practitioners with deep biopharma commercial backgrounds, and measured by what reps can do in the field — not completion rates. Whether your launch needs speed or nuance, there's a track built for the moment." },
    { key: 'hero.ctaLabel', label: 'Hero button label', type: 'text',
      default: 'Book a Consult' },

    // Tracks section header
    { key: 'tracks.eyebrow', label: 'Tracks eyebrow', type: 'text',
      default: 'Two Tracks. One Standard.' },
    { key: 'tracks.heading', label: 'Tracks heading', type: 'text',
      default: 'AI-powered, human-led, or both.' },
    { key: 'tracks.lead', label: 'Tracks lead paragraph', type: 'textarea',
      default: 'Forge is our AI-powered track. It compresses content development from months to hours when speed matters. Traditional instructional design is our human-led track. It protects the depth and nuance that complex therapeutic content requires. Most launches use both — Forge for foundational modules, human-led for high-stakes objection handling.' },

    // Track cards
    { key: 'track1.title', label: 'Track 1 title', type: 'text',
      default: 'AI-Powered Forge' },
    { key: 'track1.body', label: 'Track 1 body', type: 'text',
      default: 'Speed for foundational modules when launch timelines compress.' },
    { key: 'track2.title', label: 'Track 2 title', type: 'text',
      default: 'Human-Led ID' },
    { key: 'track2.body', label: 'Track 2 body', type: 'text',
      default: 'Practitioner depth for high-stakes, nuanced field conversations.' },

    // Standards strip
    { key: 'standards.label', label: 'Standards label', type: 'text',
      default: 'Every Output, Every Track' },
    { key: 'standards.item1.title', label: 'Standard 1 title', type: 'text',
      default: 'Compliance-first design' },
    { key: 'standards.item1.desc', label: 'Standard 1 description', type: 'text',
      default: 'Every output MLR-routable' },
    { key: 'standards.item2.title', label: 'Standard 2 title', type: 'text',
      default: 'Field-validated' },
    { key: 'standards.item2.desc', label: 'Standard 2 description', type: 'text',
      default: "Built by people who've ridden along" },
    { key: 'standards.item3.title', label: 'Standard 3 title', type: 'text',
      default: 'Behavior-change targeted' },
    { key: 'standards.item3.desc', label: 'Standard 3 description', type: 'text',
      default: 'Completion is not the metric' },

    // Example scenario band
    { key: 'scenario.eyebrow', label: 'Scenario eyebrow', type: 'text',
      default: 'Example Scenario' },
    { key: 'scenario.heading', label: 'Scenario heading', type: 'text',
      default: 'A 9-month launch window. Three therapeutic indications. One content team.' },
    { key: 'scenario.phase1.title', label: 'Scenario phase 1 title', type: 'text',
      default: 'Lead indication gets human-led depth.' },
    { key: 'scenario.phase1.body', label: 'Scenario phase 1 body', type: 'text',
      default: 'Traditional ID focuses on high-stakes objection handling and HCP scenario work.' },
    { key: 'scenario.phase2.title', label: 'Scenario phase 2 title', type: 'text',
      default: 'Forge drafts the foundational lift.' },
    { key: 'scenario.phase2.body', label: 'Scenario phase 2 body', type: 'text',
      default: 'Indications two and three are drafted from PI, CSRs, and brand assets with cited claims.' },
    { key: 'scenario.phase3.title', label: 'Scenario phase 3 title', type: 'text',
      default: 'Practitioners validate before MLR.' },
    { key: 'scenario.phase3.body', label: 'Scenario phase 3 body', type: 'text',
      default: 'Proxa Labs reviewers validate accuracy, nuance, and field readiness before routing.' },
    { key: 'scenario.outcome', label: 'Scenario outcome', type: 'text',
      default: 'All three indications launch on time, MLR-cleared.' },

    // Therapeutic coverage section header
    { key: 'therapeutic.eyebrow', label: 'Therapeutic eyebrow', type: 'text',
      default: 'Therapeutic Area Coverage' },
    { key: 'therapeutic.heading', label: 'Therapeutic heading', type: 'text',
      default: "We've built launch training across the major therapeutic areas." },
    { key: 'therapeutic.lead', label: 'Therapeutic lead paragraph', type: 'textarea',
      default: 'Our content practitioners have authored launch training across ten therapeutic areas. The depth shows in the work: nuanced PI handling, accurate MOA framing, and HCP persona behaviors that match real specialty conversations.' },

    // Closing CTA band
    { key: 'cta.heading', label: 'Closing CTA heading', type: 'textarea',
      default: 'Launch on time. MLR clean.' },
    { key: 'cta.body', label: 'Closing CTA paragraph', type: 'textarea',
      default: "Tell us about your launch window and content backlog. We'll show you the mix of AI-powered and human-led work that fits." },
    { key: 'cta.ctaLabel', label: 'Closing CTA button label', type: 'text',
      default: 'Book a Consult' },
  ],
};
