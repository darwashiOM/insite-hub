/*
 * Editable-content manifest for the Newsletter page (pageId: "newsletter").
 * Defaults are the current in-code copy, copied verbatim. The page renders an
 * override when present, otherwise the default. See src/lib/content.js
 * (usePageContent).
 *
 * Note: the hero heading and the closing CTA heading have inline <em> markup in
 * the JSX. Their defaults below are the plain-text equivalents; the component
 * renders the rich JSX default and only swaps in a plain string when overridden
 * (matching the homepage pattern).
 */
export default {
  label: 'Newsletter',
  fields: [
    { key: 'hero.eyebrow', label: 'Hero eyebrow', type: 'text',
      default: 'Newsletter' },
    { key: 'hero.heading', label: 'Hero heading', type: 'text',
      default: 'Stay ahead of AI in biopharma commercial learning.' },
    { key: 'hero.subhead', label: 'Hero subhead', type: 'textarea',
      default: "Frameworks, research, field notes, and announcements from Proxa Labs' practitioners. Sent when there's something worth saying. No vendor noise, no weekly cadence for its own sake." },

    { key: 'receive.eyebrow', label: "What You'll Receive — eyebrow", type: 'text',
      default: "What You'll Receive" },
    { key: 'receive.heading', label: "What You'll Receive — heading", type: 'text',
      default: "Useful thinking. When there's something to say." },

    { key: 'cards.0.title', label: 'Card 1 — title', type: 'text',
      default: 'The Lab Research Updates' },
    { key: 'cards.0.body', label: 'Card 1 — body', type: 'textarea',
      default: 'Early findings, new frameworks, and research milestones from The Lab — before they become full publications.' },
    { key: 'cards.1.title', label: 'Card 2 — title', type: 'text',
      default: 'Partnership & Product Announcements' },
    { key: 'cards.1.body', label: 'Card 2 — body', type: 'textarea',
      default: 'New partnerships (like UMU.com), platform updates, and program launches — directly from the team building them.' },
    { key: 'cards.2.title', label: 'Card 3 — title', type: 'text',
      default: 'New Frameworks & Guides' },
    { key: 'cards.2.body', label: 'Card 3 — body', type: 'textarea',
      default: 'Every new resource Proxa Labs publishes — AI readiness tools, business case templates, vendor evaluation scorecards — sent to subscribers first.' },
    { key: 'cards.3.title', label: 'Card 4 — title', type: 'text',
      default: 'Field Notes from Advisory Engagements' },
    { key: 'cards.3.body', label: 'Card 4 — body', type: 'textarea',
      default: "Anonymized patterns and insights from Proxa Labs' advisory work — what's working, what's failing, and what questions organizations are actually asking right now." },

    { key: 'form.submitLabel', label: 'Subscribe button label', type: 'text',
      default: 'Subscribe →' },
    { key: 'form.submittingLabel', label: 'Subscribe button label (submitting)', type: 'text',
      default: 'Subscribing…' },
    { key: 'form.disclaimer', label: 'Form disclaimer', type: 'textarea',
      default: "No spam. Unsubscribe anytime. We send when there's something worth sending." },

    { key: 'success.title', label: 'Success — title', type: 'text',
      default: "You're subscribed." },
    { key: 'success.body', label: 'Success — body', type: 'textarea',
      default: 'First issue lands when we have something genuinely worth your time. Browse the resources page in the meantime.' },
    { key: 'success.ctaLabel', label: 'Success — button label', type: 'text',
      default: 'Browse Frameworks & Guides' },

    { key: 'cta.heading', label: 'Closing CTA heading', type: 'text',
      default: 'One newsletter. Worth your time.' },
    { key: 'cta.body', label: 'Closing CTA paragraph', type: 'textarea',
      default: "If we ever send something you'd skip — unsubscribe in one click. We promise we'll understand." },
    { key: 'cta.ctaLabel', label: 'Closing CTA button label', type: 'text',
      default: 'Browse the Resources Page' },
  ],
};
