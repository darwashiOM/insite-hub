/*
 * Editable-content manifest. Each page lists the fields an editor can override
 * in the CMS, with the current copy as the in-code default. The page renders the
 * override when present, otherwise the default — so the site always works even
 * with no overrides. Add a page/fields here, then read them via usePageContent.
 */
import platform from './pages/platform';
import advisory from './pages/advisory';
import literacy from './pages/literacy';
import insitex from './pages/insitex';
import content from './pages/content';
import proxalab from './pages/proxalab';
import about from './pages/about';
import news from './pages/news';
import resources from './pages/resources';
import newsletter from './pages/newsletter';
import contact from './pages/contact';
import futureproof from './pages/futureproof';

export const MANIFEST = {
  home: {
    label: 'Homepage',
    fields: [
      { key: 'hero.eyebrow', label: 'Hero eyebrow', type: 'text',
        default: 'FOR COMMERCIAL L&D LEADERS IN BIOPHARMA' },
      { key: 'hero.headline', label: 'Hero headline', type: 'textarea',
        default: 'The AI commercial learning partner built for biopharma. Not adapted for it.' },
      { key: 'hero.subhead', label: 'Hero subhead', type: 'textarea',
        default: 'Most platforms were built for enterprise sales and retrofitted for pharma. Proxa Labs was built for biopharma from day one: advisory methodology, AI literacy programming, and a closed-loop platform designed around the constraints you actually operate in: MLR review, launch timelines, federated commercial structures.' },
      { key: 'hero.ctaLabel', label: 'Hero button label', type: 'text', default: 'See the Platform' },
      { key: 'logoBand.label', label: 'Logo band label', type: 'text',
        default: 'Trusted across biopharma and health systems' },
      { key: 'cta.body', label: 'Closing CTA paragraph', type: 'textarea',
        default: "Proxa Labs works with commercial L&D leaders who have been told to deliver on AI but haven't found a partner who understands what that actually requires in a biopharma environment. Start with a conversation. We'll tell you what we'd look at first." },
      { key: 'cta.ctaLabel', label: 'Closing CTA button label', type: 'text', default: 'Book a Consult' },
    ],
  },
  platform, advisory, literacy, insitex, content, proxalab,
  about, news, resources, newsletter, contact, futureproof,
};

// Special-case constant so the homepage can render its rich (italic) headline as
// the default but a plain string when overridden.
export const HOME_HERO_HEADLINE_DEFAULT =
  'The AI commercial learning partner built for biopharma. Not adapted for it.';

// Flat { key: default } map for a page.
export function defaultsFor(pageId) {
  const page = MANIFEST[pageId];
  if (!page) return {};
  return Object.fromEntries(page.fields.map((f) => [f.key, f.default]));
}
