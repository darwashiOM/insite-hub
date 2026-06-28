/*
 * Editable-content manifest entry for the InsiteX LMS marketing page.
 * Each field's `default` is the current in-code copy (verbatim) and is rendered
 * unless an override is set in the CMS. Read via usePageContent('insitex').
 *
 * Note: the three headings with inline markup (hero.headline, upgrade.heading,
 * cta.heading) keep their rich JSX as the default — their `default` here is the
 * plain-text version, and the page renders the rich JSX while the value equals
 * that plain default, otherwise the (overridden) plain string. The matching
 * comparison constants live in src/pages/InsiteXPage.jsx and MUST stay in sync.
 */
export default {
  label: 'InsiteX LMS',
  fields: [
    // Hero
    { key: 'hero.eyebrow', label: 'Hero eyebrow', type: 'text',
      default: 'InsiteX LMS' },
    { key: 'hero.headline', label: 'Hero headline', type: 'text',
      default: 'The LMS that becomes the AI foundation.' },
    { key: 'hero.subhead', label: 'Hero subhead', type: 'textarea',
      default: "InsiteX is the enterprise learning platform underneath Proxa Labs' AI. Purpose-built for biopharma — SCORM, AICC, and PMRC compliance, Veeva integration, credentialing workflows, and 10-year audit trails. When your organization is ready for AI, Forge, Cue, and Stage layer on top. No migration. No rip-and-replace." },
    { key: 'hero.ctaLabel', label: 'Hero button label', type: 'text',
      default: 'Book a Demo' },

    // "When InsiteX Is the Right Choice" long-form section
    { key: 'whenRight.eyebrow', label: 'Right-choice eyebrow', type: 'text',
      default: 'When InsiteX Is the Right Choice' },
    { key: 'whenRight.heading', label: 'Right-choice heading', type: 'textarea',
      default: 'Not every team is ready for AI. InsiteX is built for where you actually are.' },
    { key: 'whenRight.body', label: 'Right-choice paragraph', type: 'textarea',
      default: 'If your organization needs reliable enterprise learning infrastructure today — with compliance built in, Veeva integration working, and credentialing audit-ready — InsiteX is purpose-built for it. When your organization is ready for AI, Forge, Cue, and Stage layer on top of the same system. Your learners, your content, your audit trail all carry forward.' },

    // Capabilities card grid
    { key: 'capabilities.eyebrow', label: 'Capabilities eyebrow', type: 'text',
      default: 'Six Capability Areas' },
    { key: 'capabilities.heading', label: 'Capabilities heading', type: 'textarea',
      default: 'Everything biopharma L&D actually needs from an LMS.' },
    { key: 'capabilities.cards.0.title', label: 'Capability 1 title', type: 'text',
      default: 'SCORM, AICC, and PMRC compliance' },
    { key: 'capabilities.cards.0.body', label: 'Capability 1 body', type: 'textarea',
      default: 'All major pharma content standards supported out of the box. Drop in your existing libraries. No migration project.' },
    { key: 'capabilities.cards.1.title', label: 'Capability 2 title', type: 'text',
      default: 'Credentialing + audit trails' },
    { key: 'capabilities.cards.1.body', label: 'Capability 2 body', type: 'textarea',
      default: 'Role-based credential tracking with full audit trails for regulatory inspection. 10-year retention, SHA-256 immutable logs.' },
    { key: 'capabilities.cards.2.title', label: 'Capability 3 title', type: 'text',
      default: 'Veeva integration' },
    { key: 'capabilities.cards.2.body', label: 'Capability 3 body', type: 'textarea',
      default: 'Native bi-directional integration with Veeva PromoMats and Vault. Content state syncs automatically, both directions.' },
    { key: 'capabilities.cards.3.title', label: 'Capability 4 title', type: 'text',
      default: 'Enterprise SSO + RBAC' },
    { key: 'capabilities.cards.3.body', label: 'Capability 4 body', type: 'textarea',
      default: 'SAML 2.0 and OIDC SSO. Granular role-based permissions across L&D, content, compliance, and IT teams.' },
    { key: 'capabilities.cards.4.title', label: 'Capability 5 title', type: 'text',
      default: 'Content lifecycle workflows' },
    { key: 'capabilities.cards.4.body', label: 'Capability 5 body', type: 'textarea',
      default: 'MLR routing, version control, and expiration tracking — built around how pharma content actually moves through approval.' },
    { key: 'capabilities.cards.5.title', label: 'Capability 6 title', type: 'text',
      default: 'Manager dashboards + reporting' },
    { key: 'capabilities.cards.5.body', label: 'Capability 6 body', type: 'textarea',
      default: 'Live readiness reporting by team, region, and competency. Pre-built reports for the CCO scorecard, training compliance, and certification expiration tracking.' },

    // Upgrade comparison section
    { key: 'upgrade.eyebrow', label: 'Upgrade eyebrow', type: 'text',
      default: 'Pick Your Starting Point' },
    { key: 'upgrade.heading', label: 'Upgrade heading', type: 'text',
      default: "Pick the right starting point. Upgrade when you're ready." },
    { key: 'upgrade.lead', label: 'Upgrade lead', type: 'textarea',
      default: "InsiteX is the LMS foundation. The AI Platform adds Forge, Cue, Stage, and Trace on top. Same system, different readiness — and when you're ready to bridge them, the integration is native." },

    // Closing CTA band
    { key: 'cta.heading', label: 'Closing CTA heading', type: 'text',
      default: 'Get the LMS that becomes the AI foundation.' },
    { key: 'cta.body', label: 'Closing CTA paragraph', type: 'textarea',
      default: "Bring your launch calendar to the demo. We'll show you your existing content library inside InsiteX, and map what the upgrade path to AI looks like over the next 18 months." },
    { key: 'cta.ctaLabel', label: 'Closing CTA button label', type: 'text',
      default: 'Book a Demo' },
  ],
};
