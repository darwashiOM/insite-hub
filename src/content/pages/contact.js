/*
 * Editable-content manifest for the Contact page. Defaults are the current copy,
 * verbatim from ContactPage.jsx. The page renders an override when present,
 * otherwise the default. Keep keys dot-namespaced to mirror the page sections.
 */
export default {
  label: 'Contact',
  fields: [
    { key: 'hero.eyebrow', label: 'Hero eyebrow', type: 'text',
      default: 'Start a Conversation' },
    { key: 'hero.headline', label: 'Hero headline', type: 'textarea',
      default: "Tell us where you are. We'll meet you there." },
    { key: 'hero.subhead', label: 'Hero subhead', type: 'textarea',
      default: "Whether you want a demo, a diagnostic conversation, or just the frameworks — pick your track and we'll route you to the right starting point. Hear back within one business day." },
    { key: 'track.eyebrow', label: 'Track section eyebrow', type: 'text',
      default: 'Step 1 — Pick Your Track' },
    { key: 'track.heading', label: 'Track section heading', type: 'text',
      default: "What's the right starting point for you?" },
    { key: 'track.lead', label: 'Track section lead', type: 'textarea',
      default: 'Pick the option that fits your situation. The form below will pre-fill based on your selection.' },
    { key: 'expect.eyebrow', label: 'What to Expect eyebrow', type: 'text',
      default: 'What to Expect' },
    { key: 'expect.heading', label: 'What to Expect heading', type: 'text',
      default: 'We respond within one business day.' },
    { key: 'expect.mutedTitle', label: 'Expect panel (no track) title', type: 'text',
      default: 'Pick a track above' },
    { key: 'expect.mutedBody', label: 'Expect panel (no track) body', type: 'textarea',
      default: 'Select the starting point that fits your situation and this panel will show what happens next.' },
    { key: 'diagnostic.title', label: 'Diagnostic note title', type: 'text',
      default: 'The first conversation is always diagnostic.' },
    { key: 'diagnostic.body', label: 'Diagnostic note body', type: 'textarea',
      default: "Your environment, your constraints, what you've already tried. No sales pitch. No deck. Just whether Proxa Labs is the right fit for where you are." },
  ],
};
