import EditorialHero from '../components/sections/EditorialHero';
import StatBand from '../components/sections/StatBand';
import CardGrid from '../components/sections/CardGrid';
import CTABand from '../components/sections/CTABand';
import SplitFeature from '../components/sections/SplitFeature';
import PullQuote from '../components/sections/PullQuote';
import FaqSection from '../components/sections/FaqSection';

/*
 * The "kit of ready-made sections" (Mercy's S3). Each section type wraps a real
 * on-brand site component: it declares the fields a marketer fills and how to
 * turn that data into the component's props. `go(pageKey)` navigates (setPage).
 */
export const SECTION_KIT = {
  hero: {
    label: 'Hero banner',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow (small label)', type: 'text' },
      { key: 'headline', label: 'Headline', type: 'text' },
      { key: 'subhead', label: 'Subheading', type: 'textarea' },
      { key: 'ctaLabel', label: 'Button text', type: 'text' },
      { key: 'ctaPage', label: 'Button links to', type: 'page' },
      { key: 'dark', label: 'Dark background', type: 'boolean' },
    ],
    render: (d, go) => (
      <EditorialHero eyebrow={d.eyebrow} headline={d.headline} subhead={d.subhead} dark={!!d.dark}
        primaryCta={d.ctaLabel ? { label: d.ctaLabel, onClick: () => go(d.ctaPage) } : undefined} />
    ),
  },
  split: {
    label: 'Text + image',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'body', label: 'Body text', type: 'textarea' },
      { key: 'image', label: 'Image', type: 'image' },
      { key: 'reverse', label: 'Put the image on the left', type: 'boolean' },
    ],
    render: (d) => (
      <SplitFeature eyebrow={d.eyebrow} heading={d.heading} body={d.body} reverse={!!d.reverse}
        visual={d.image ? <img src={d.image} alt="" style={{ width: '100%', borderRadius: 16, display: 'block' }} /> : null} />
    ),
  },
  cards: {
    label: 'Feature cards',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'lead', label: 'Intro text', type: 'textarea' },
      { key: 'cards', label: 'Cards', type: 'cardlist' },
    ],
    render: (d) => (
      <CardGrid eyebrow={d.eyebrow} heading={d.heading} lead={d.lead} centerHeader
        cards={(d.cards || []).map((c) => ({ title: c.title, body: c.body }))} />
    ),
  },
  stats: {
    label: 'Stat band',
    fields: [{ key: 'stats', label: 'Stats', type: 'statlist' }],
    render: (d) => <StatBand stats={(d.stats || []).map((s) => ({ n: s.value, l: s.label, source: s.source || undefined }))} />,
  },
  quote: {
    label: 'Pull quote',
    fields: [
      { key: 'quote', label: 'Quote', type: 'textarea' },
      { key: 'author', label: 'Author', type: 'text' },
    ],
    render: (d) => <PullQuote quote={d.quote} author={d.author} />,
  },
  cta: {
    label: 'Call to action',
    fields: [
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'body', label: 'Body text', type: 'textarea' },
      { key: 'ctaLabel', label: 'Button text', type: 'text' },
      { key: 'ctaPage', label: 'Button links to', type: 'page' },
    ],
    render: (d, go) => (
      <CTABand heading={d.heading} body={d.body}
        primaryCta={d.ctaLabel ? { label: d.ctaLabel, onClick: () => go(d.ctaPage) } : undefined} />
    ),
  },
  faq: {
    label: 'FAQ',
    fields: [
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'items', label: 'Questions & answers', type: 'faqlist' },
    ],
    render: (d) => <FaqSection heading={d.heading} items={d.items} />,
  },
};

export const SECTION_TYPES = Object.keys(SECTION_KIT);
