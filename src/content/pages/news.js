/*
 * Editable-content fields for the News page. Defaults are the current in-code
 * copy, copied verbatim. The page renders an override when present, else the
 * default. Headlines with inline markup keep a plain-string default here and
 * the page swaps in the rich JSX when the value still equals that default.
 */
export default {
  label: 'News',
  fields: [
    // Hero
    { key: 'hero.eyebrow', label: 'Hero eyebrow', type: 'text',
      default: 'Latest from Proxa Labs' },
    { key: 'hero.headline', label: 'Hero headline', type: 'textarea',
      default: "What's new at Proxa Labs." },
    { key: 'hero.subhead', label: 'Hero subhead', type: 'textarea',
      default: 'Partnerships, product launches, research milestones, and news from the team building the first closed-loop AI platform in biopharma commercial learning.' },
    { key: 'hero.ctaLabel', label: 'Hero button label', type: 'text',
      default: 'Subscribe to Updates' },

    // Featured partnership (SplitFeature)
    { key: 'featured.eyebrow', label: 'Featured eyebrow', type: 'text',
      default: 'April 2026 · Featured Partnership Announcement' },
    { key: 'featured.heading', label: 'Featured heading', type: 'textarea',
      default: 'Proxa Labs partners with UMU.com to power AI Literacy delivery at scale.' },
    { key: 'featured.body', label: 'Featured body', type: 'textarea',
      default: "A strategic partnership combining Proxa Labs' biopharma domain expertise and curriculum design with UMU's enterprise learning delivery infrastructure — enabling scalable, measurable AI literacy programs that integrate with existing LMS environments." },
    { key: 'featured.bullets.0', label: 'Featured bullet 1', type: 'text',
      default: 'Global delivery infrastructure across NA, EU, APAC' },
    { key: 'featured.bullets.1', label: 'Featured bullet 2', type: 'text',
      default: 'LMS-integrated — works with InsiteX, Veeva, and existing pharma LMS environments' },
    { key: 'featured.bullets.2', label: 'Featured bullet 3', type: 'text',
      default: 'Pre/post assessments tracking AI literacy gains by role and cohort' },
    { key: 'featured.ctaLabel', label: 'Featured button label', type: 'text',
      default: 'See the AI Literacy Program' },
    { key: 'featured.visual.badge', label: 'Featured card badge', type: 'text',
      default: 'NEW PARTNERSHIP' },
    { key: 'featured.visual.brand', label: 'Featured card brand', type: 'text',
      default: 'UMU.com' },
    { key: 'featured.visual.brandSub', label: 'Featured card brand sub', type: 'text',
      default: '× Proxa Labs' },
    { key: 'featured.visual.quote', label: 'Featured card quote', type: 'textarea',
      default: '"The biopharma domain expertise meets enterprise learning infrastructure. Together: the AI literacy backbone every pharma deployment needs."' },

    // Recent announcements (CardGrid)
    { key: 'recent.eyebrow', label: 'Recent eyebrow', type: 'text',
      default: 'Recent Announcements' },
    { key: 'recent.heading', label: 'Recent heading', type: 'text',
      default: 'More from Proxa Labs and The Lab.' },
    { key: 'recent.cards.0.tag', label: 'Recent card 1 tag', type: 'text',
      default: 'March 2026 · Platform Update' },
    { key: 'recent.cards.0.title', label: 'Recent card 1 title', type: 'text',
      default: 'Proxa Labs Stage — ComplianceGuard v2 Released' },
    { key: 'recent.cards.0.body', label: 'Recent card 1 body', type: 'textarea',
      default: 'Real-time compliance monitoring now includes enhanced MLR flag categorization, automated rephrasing suggestions, and expanded banned phrase detection across all six commercial verticals. Available to all Stage clients immediately.' },
    { key: 'recent.cards.1.tag', label: 'Recent card 2 tag', type: 'text',
      default: 'February 2026 · Research' },
    { key: 'recent.cards.1.title', label: 'Recent card 2 title', type: 'text',
      default: 'The Lab publishes AI Readiness Scoring Model beta' },
    { key: 'recent.cards.1.body', label: 'Recent card 2 body', type: 'textarea',
      default: 'The Lab team has released a beta version of the AI Readiness Scoring Model — an 8-dimension maturity framework for measuring commercial L&D AI readiness. Available to advisory engagement clients as part of Phase 1 diagnostics.' },
    { key: 'recent.cards.2.tag', label: 'Recent card 3 tag', type: 'text',
      default: 'December 2025 · Platform Launch' },
    { key: 'recent.cards.2.title', label: 'Recent card 3 title', type: 'text',
      default: 'Proxa Labs Forge v4.0 — General Availability' },
    { key: 'recent.cards.2.body', label: 'Recent card 3 body', type: 'textarea',
      default: "Forge's agentic content creation platform reaches general availability, including the Content Gap Analyzer, MLR Package Builder, and Knowledge Session dual-track sourcing engine. Available to enterprise commercial L&D teams now." },

    // Closing CTA (CTABand)
    { key: 'cta.heading', label: 'Closing CTA heading', type: 'textarea',
      default: "Get the announcements before they're public." },
    { key: 'cta.body', label: 'Closing CTA body', type: 'textarea',
      default: "Frameworks, research, and partnerships from Proxa Labs and The Lab. Sent when there's something genuinely worth your time." },
    { key: 'cta.ctaLabel', label: 'Closing CTA button label', type: 'text',
      default: 'Subscribe' },
  ],
};
