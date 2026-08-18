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
      default: 'Speak to a Proxa Labs Expert' },
    { key: 'hero.subhead', label: 'Hero subhead', type: 'textarea',
      default: "Tell us where you are and what you're trying to solve. We'll take it from there." },
    { key: 'expect.eyebrow', label: 'What to Expect eyebrow', type: 'text',
      default: 'What to Expect' },
    { key: 'diagnostic.title', label: 'What to Expect heading', type: 'text',
      default: 'The first conversation is always diagnostic.' },
    { key: 'diagnostic.body', label: 'What to Expect body', type: 'textarea',
      default: "Your environment, your constraints, what you've already tried. No sales pitch. No deck. Just whether Proxa Labs is the right fit for where you are." },
  ],
};
