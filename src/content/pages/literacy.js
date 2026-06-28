/*
 * Editable-content manifest for the AI Literacy Program page (pageId: "literacy").
 * Defaults are the current in-code copy, verbatim. The page renders an override
 * when present, otherwise the default. See src/lib/content.js (usePageContent).
 *
 * Note: the hero heading and the closing CTA heading have inline <em> markup in
 * the JSX. Their defaults below are the plain-text equivalents; the component
 * renders the rich JSX default and only swaps in a plain string when overridden
 * (matching the homepage pattern).
 */
export default {
  label: 'AI Literacy Program',
  fields: [
    { key: 'hero.eyebrow', label: 'Hero eyebrow', type: 'text',
      default: 'AI Literacy Program' },
    { key: 'hero.heading', label: 'Hero heading', type: 'textarea',
      default: "Your team can't use AI tools they don't understand or trust." },
    { key: 'hero.subhead', label: 'Hero subhead', type: 'textarea',
      default: "Before your organization deploys AI, your team needs the concepts, the vocabulary, and the judgment to use it well. Role-targeted tracks across reps, managers, medical, regulatory, and leadership — so adoption doesn't stall at the point of use." },
    { key: 'hero.ctaLabel', label: 'Hero button label', type: 'text',
      default: 'Get the Program Overview' },

    { key: 'whyLiteracy.eyebrow', label: 'Why Literacy — eyebrow', type: 'text',
      default: 'Why Literacy First' },
    { key: 'whyLiteracy.heading', label: 'Why Literacy — heading', type: 'textarea',
      default: "Teams that understand AI adopt it. Teams that don't, resist it." },
    { key: 'whyLiteracy.pullQuote', label: 'Why Literacy — pull quote', type: 'textarea',
      default: "Every failed pharma AI deployment we've diagnosed had the same root cause: the people expected to use the tools didn't have the vocabulary or judgment to use them well." },
    { key: 'whyLiteracy.pullQuoteAttribution', label: 'Why Literacy — pull quote attribution', type: 'text',
      default: 'Elena Marquez, AI Literacy Program Lead, Proxa Labs' },
    { key: 'whyLiteracy.body1', label: 'Why Literacy — paragraph 1', type: 'textarea',
      default: `What looks like an AI adoption failure is usually a literacy failure. Reps don't trust AI-generated talking points because no one explained where the content comes from or how to spot when the model is wrong. Managers can't interpret AI readiness scores because they don't know what the model is measuring. Medical and Regulatory teams reject AI-generated content reviews because they have no framework for what "AI-generated" means inside their workflow.` },
    { key: 'whyLiteracy.body2', label: 'Why Literacy — paragraph 2', type: 'textarea',
      default: "More training on the tool doesn't fix this. Foundational literacy does. Once teams have the vocabulary — what LLMs do well, what they fail at, where human judgment belongs in the loop — adoption stops being a fight. It becomes normal use of normal tools." },
    { key: 'whyLiteracy.body3', label: 'Why Literacy — paragraph 3', type: 'textarea',
      default: "That's what this program does. Six role-targeted tracks, built on 25 years of practitioner biopharma commercial training methodology, delivered at enterprise scale through UMU.com." },

    { key: 'tracks.eyebrow', label: 'Tracks — eyebrow', type: 'text',
      default: 'Six Role-Targeted Tracks' },
    { key: 'tracks.heading', label: 'Tracks — heading', type: 'text',
      default: 'Built for every role that touches AI outputs.' },
    { key: 'tracks.lead', label: 'Tracks — lead', type: 'textarea',
      default: "Each track is calibrated to the AI tools and decisions specific to that role. No generic 'what is AI' modules." },

    { key: 'delivery.eyebrow', label: 'Delivery — eyebrow', type: 'text',
      default: 'Delivery Partnership' },
    { key: 'delivery.heading', label: 'Delivery — heading', type: 'text',
      default: 'Built with UMU.com. Deployed at enterprise scale.' },
    { key: 'delivery.body', label: 'Delivery — body', type: 'textarea',
      default: "Proxa Labs' curriculum runs on UMU's enterprise learning infrastructure, giving biopharma commercial teams a scalable way to deploy AI literacy globally through InsiteX, an existing pharma LMS, or UMU's native platform." },

    { key: 'cta.heading', label: 'Closing CTA heading', type: 'text',
      default: 'Literacy first. Tools second.' },
    { key: 'cta.body', label: 'Closing CTA paragraph', type: 'textarea',
      default: "The organizations getting the most out of AI didn't start with the tools. They started with the team's ability to use them well. Book a consult and we'll map a literacy rollout for your organization." },
    { key: 'cta.ctaLabel', label: 'Closing CTA button label', type: 'text',
      default: 'Book a Consult' },
  ],
};
