/*
 * Editable-content manifest for the Resources page. Defaults are the current
 * in-code copy, copied verbatim from src/pages/ResourcesPage.jsx. The page
 * renders an override when present, otherwise the default.
 *
 * Note: hero.headline and cta.heading contain inline <em> markup in the JSX.
 * Their defaults here are the PLAIN-TEXT equivalents; the component renders the
 * rich JSX when the value equals the plain default, and a plain string when
 * overridden (see RESOURCES_HERO_HEADLINE_DEFAULT / RESOURCES_CTA_HEADING_DEFAULT
 * in the component).
 */
export default {
  label: 'Resources',
  fields: [
    // Hero
    { key: 'hero.eyebrow', label: 'Hero eyebrow', type: 'text',
      default: 'Resources' },
    { key: 'hero.headline', label: 'Hero headline', type: 'textarea',
      default: 'Tools and frameworks you can use before you commit to anything.' },
    { key: 'hero.subhead', label: 'Hero subhead', type: 'textarea',
      default: '25 years of practitioner biopharma commercial L&D experience distilled into practical tools. No form required for the frameworks — just thinking you can take into your next leadership conversation.' },
    { key: 'hero.ctaLabel', label: 'Hero button label', type: 'text',
      default: 'Subscribe for New Resources' },

    // Frameworks & Guides section
    { key: 'frameworks.eyebrow', label: 'Frameworks eyebrow', type: 'text',
      default: 'Frameworks & Guides' },
    { key: 'frameworks.heading', label: 'Frameworks heading', type: 'text',
      default: "Start here if you're still figuring out where AI fits." },
    { key: 'frameworks.lead', label: 'Frameworks lead', type: 'textarea',
      default: 'Each framework distills a piece of methodology Proxa Labs uses with paying clients. Free to use. No gating beyond the conversation it sparks.' },

    // Frameworks cards
    { key: 'frameworks.cards.0.tag', label: 'Framework 1 tag', type: 'text', default: 'Framework' },
    { key: 'frameworks.cards.0.title', label: 'Framework 1 title', type: 'text', default: 'AI Readiness Self-Assessment' },
    { key: 'frameworks.cards.0.body', label: 'Framework 1 body', type: 'textarea',
      default: "A 15-question framework for evaluating your organization's readiness to deploy AI in commercial learning. Covers data foundations, governance structure, stakeholder alignment, technology infrastructure, and measurement capability." },
    { key: 'frameworks.cards.0.linkLabel', label: 'Framework 1 link label', type: 'text', default: 'Get the Framework' },

    { key: 'frameworks.cards.1.tag', label: 'Framework 2 tag', type: 'text', default: 'Guide' },
    { key: 'frameworks.cards.1.title', label: 'Framework 2 title', type: 'text', default: 'The AI Pilot Failure Taxonomy' },
    { key: 'frameworks.cards.1.body', label: 'Framework 2 body', type: 'textarea',
      default: 'A breakdown of the four failure patterns that account for 80–95% of pharma AI pilot failures — and what each one looks like from the inside before it becomes a postmortem. Built from first-hand failure observation across 30+ biopharma organizations.' },
    { key: 'frameworks.cards.1.linkLabel', label: 'Framework 2 link label', type: 'text', default: 'Get the Guide' },

    { key: 'frameworks.cards.2.tag', label: 'Framework 3 tag', type: 'text', default: 'Template' },
    { key: 'frameworks.cards.2.title', label: 'Framework 3 title', type: 'text', default: 'Commercial L&D AI Business Case Template' },
    { key: 'frameworks.cards.2.body', label: 'Framework 3 body', type: 'textarea',
      default: 'The ROI model structure Proxa Labs uses with clients to translate pilot evidence into language the CCO, CFO, and CHRO can act on. Includes the metric hierarchy connecting L&D outputs to commercial performance.' },
    { key: 'frameworks.cards.2.linkLabel', label: 'Framework 3 link label', type: 'text', default: 'Get the Template' },

    { key: 'frameworks.cards.3.tag', label: 'Framework 4 tag', type: 'text', default: 'Model' },
    { key: 'frameworks.cards.3.title', label: 'Framework 4 title', type: 'text', default: 'Proxa Labs Experimentation Design Canvas' },
    { key: 'frameworks.cards.3.body', label: 'Framework 4 body', type: 'textarea',
      default: 'The structured canvas used in every Lab engagement to define a use case hypothesis, set success criteria, scope the experiment, and identify governance checkpoints — before a single line of code is written or a vendor is engaged.' },
    { key: 'frameworks.cards.3.linkLabel', label: 'Framework 4 link label', type: 'text', default: 'Get the Canvas' },

    { key: 'frameworks.cards.4.tag', label: 'Framework 5 tag', type: 'text', default: 'Checklist' },
    { key: 'frameworks.cards.4.title', label: 'Framework 5 title', type: 'text', default: 'AI Vendor Evaluation Scorecard' },
    { key: 'frameworks.cards.4.body', label: 'Framework 5 body', type: 'textarea',
      default: 'A 24-point evaluation matrix for assessing AI platform vendors in a biopharma commercial context. Covers compliance architecture, integration complexity, total cost of ownership, and implementation risk — built for the buyer who has been burned by demos.' },
    { key: 'frameworks.cards.4.linkLabel', label: 'Framework 5 link label', type: 'text', default: 'Get the Scorecard' },

    { key: 'frameworks.cards.5.tag', label: 'Framework 6 tag', type: 'text', default: 'Guide' },
    { key: 'frameworks.cards.5.title', label: 'Framework 6 title', type: 'text', default: 'AI Literacy Program Overview' },
    { key: 'frameworks.cards.5.body', label: 'Framework 6 body', type: 'textarea',
      default: "A summary of Proxa Labs' AI Literacy Program — what it covers, how it's delivered, which roles it targets, and how it fits into a broader AI deployment sequence. Includes the partnership with UMU.com for enterprise delivery." },
    { key: 'frameworks.cards.5.linkLabel', label: 'Framework 6 link label', type: 'text', default: 'Get the Overview' },

    // From The Lab section
    { key: 'research.eyebrow', label: 'Research eyebrow', type: 'text',
      default: 'From The Lab' },
    { key: 'research.heading', label: 'Research heading', type: 'text',
      default: 'Active research and early findings.' },
    { key: 'research.body', label: 'Research intro paragraph', type: 'textarea',
      default: 'Open research from The Lab — work in progress that will shape how we advise clients and build products. We publish early because the methodology benefits from peer pressure, and because the people who would benefit from these frameworks should not have to wait for them to be polished.' },

    // Research cards
    { key: 'research.cards.0.tag', label: 'Research 1 tag', type: 'text', default: 'Actively recruiting' },
    { key: 'research.cards.0.title', label: 'Research 1 title', type: 'text', default: 'Open-Source HCP Avatar Engine' },
    { key: 'research.cards.0.body', label: 'Research 1 body', type: 'textarea',
      default: 'Crowdsourcing a real-time, open-source conversational avatar system via hackathon. $10K prize pool. Reduces vendor lock-in for AI roleplay deployments across the industry.' },

    { key: 'research.cards.1.tag', label: 'Research 2 tag', type: 'text', default: 'Early results' },
    { key: 'research.cards.1.title', label: 'Research 2 title', type: 'text', default: 'Behavioral Analytics Correlation Study' },
    { key: 'research.cards.1.body', label: 'Research 2 body', type: 'textarea',
      default: 'Early data shows r=0.84 correlation between AI-assessed behavioral competencies and field performance outcomes. Full study ongoing with Proxa Labs Stage cohort data.' },

    { key: 'research.cards.2.tag', label: 'Research 3 tag', type: 'text', default: 'In development' },
    { key: 'research.cards.2.title', label: 'Research 3 title', type: 'text', default: 'AI Readiness Predictive Model' },
    { key: 'research.cards.2.body', label: 'Research 3 body', type: 'textarea',
      default: 'Building a predictive model for pilot success probability based on pre-deployment organizational readiness scores. Training data drawn from 30+ biopharma advisory engagements.' },

    // Closing CTA
    { key: 'cta.heading', label: 'Closing CTA heading', type: 'textarea',
      default: 'The frameworks are free. The conversations matter more.' },
    { key: 'cta.body', label: 'Closing CTA paragraph', type: 'textarea',
      default: "Use the tools. When you're ready to talk through how they apply in your environment, we're here." },
    { key: 'cta.ctaLabel', label: 'Closing CTA button label', type: 'text',
      default: 'Start a Conversation' },
  ],
};
