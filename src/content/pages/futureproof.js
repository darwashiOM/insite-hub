/*
 * Editable-content fields for the Future-Proof landing page. Defaults are the
 * current in-code copy, copied verbatim from FutureProofPage.jsx. The page
 * renders an override when present, otherwise the default. For the hero heading
 * (which has inline <em> markup) the default is the plain-text version;
 * FutureProofPage compares against it to decide whether to render the rich JSX
 * or a plain override string.
 */
export default {
  label: 'Future-Proof Landing',
  fields: [
    { key: 'hero.heading', label: 'Hero heading', type: 'text',
      default: 'Future-proof your organization' },
    { key: 'hero.standfirst', label: 'Hero standfirst', type: 'textarea',
      default: 'An in-depth perspective on AI readiness, and what you really should be getting ready for.' },
    { key: 'hero.body', label: 'Hero body paragraph', type: 'textarea',
      default: 'Most biopharma commercial learning teams are getting ready for the wrong thing. This perspective lays out what you’re actually getting ready for, why most AI pilots die, and the order of operations for leading the shift instead of being assigned to it.' },

    { key: 'points.0', label: 'Bullet point 1', type: 'text',
      default: 'Why literacy, governance, and compliance are just the starting line' },
    { key: 'points.1', label: 'Bullet point 2', type: 'text',
      default: 'The four shifts that redefine the work: content, process, personalization, and self-serve creation' },
    { key: 'points.2', label: 'Bullet point 3', type: 'text',
      default: 'Why pilots die, and the single change that makes AI stick' },
    { key: 'points.3', label: 'Bullet point 4', type: 'text',
      default: 'A practical order of operations to put your function in front of the brand team and its agency' },

    { key: 'cta.htmlLabel', label: 'View HTML button label', type: 'text',
      default: 'View as HTML Page' },
    { key: 'cta.pdfLabel', label: 'Download PDF button label', type: 'text',
      default: 'Download PDF' },

    { key: 'form.disclaimer', label: 'Form disclaimer', type: 'textarea',
      default: 'We’ll only use your email to send you the occasional perspective on AI readiness, company update or announcement worth your time. Unsubscribe anytime.' },
  ],
};
