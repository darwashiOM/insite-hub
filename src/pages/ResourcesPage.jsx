import EditorialHero from '../components/sections/EditorialHero';
import CardGrid from '../components/sections/CardGrid';
import LongForm from '../components/sections/LongForm';
import CTABand from '../components/sections/CTABand';
import Icon from '../components/Icon';
import { usePageContent } from '../lib/content';

// Plain-text equivalents of the two headings that carry inline <em> markup.
// When the editable value matches the plain default, render the rich JSX;
// otherwise render the override as a plain string.
const RESOURCES_HERO_HEADLINE_DEFAULT = 'Tools and frameworks you can use before you commit to anything.';
const RESOURCES_CTA_HEADING_DEFAULT = 'The frameworks are free. The conversations matter more.';

export default function ResourcesPage({ setPage }) {
  const c = usePageContent('resources');

  const FRAMEWORKS = [
    { icon: <Icon name="checklist" size={22} />,    tag: c('frameworks.cards.0.tag'), title: c('frameworks.cards.0.title'), body: c('frameworks.cards.0.body'), linkLabel: c('frameworks.cards.0.linkLabel'), onClick: () => setPage("contact") },
    { icon: <Icon name="gap" size={22} />,          tag: c('frameworks.cards.1.tag'), title: c('frameworks.cards.1.title'), body: c('frameworks.cards.1.body'), linkLabel: c('frameworks.cards.1.linkLabel'), onClick: () => setPage("contact") },
    { icon: <Icon name="template" size={22} />,     tag: c('frameworks.cards.2.tag'), title: c('frameworks.cards.2.title'), body: c('frameworks.cards.2.body'), linkLabel: c('frameworks.cards.2.linkLabel'), onClick: () => setPage("contact") },
    { icon: <Icon name="research" size={22} />,     tag: c('frameworks.cards.3.tag'), title: c('frameworks.cards.3.title'), body: c('frameworks.cards.3.body'), linkLabel: c('frameworks.cards.3.linkLabel'), onClick: () => setPage("contact") },
    { icon: <Icon name="compliance" size={22} />,   tag: c('frameworks.cards.4.tag'), title: c('frameworks.cards.4.title'), body: c('frameworks.cards.4.body'), linkLabel: c('frameworks.cards.4.linkLabel'), onClick: () => setPage("contact") },
    { icon: <Icon name="literacy" size={22} />,     tag: c('frameworks.cards.5.tag'), title: c('frameworks.cards.5.title'), body: c('frameworks.cards.5.body'), linkLabel: c('frameworks.cards.5.linkLabel'), onClick: () => setPage("contact") },
  ];

  const RESEARCH = [
    { icon: <Icon name="roleplay" size={22} />,  tag: c('research.cards.0.tag'), title: c('research.cards.0.title'), body: c('research.cards.0.body') },
    { icon: <Icon name="research" size={22} />,  tag: c('research.cards.1.tag'), title: c('research.cards.1.title'), body: c('research.cards.1.body') },
    { icon: <Icon name="readiness" size={22} />, tag: c('research.cards.2.tag'), title: c('research.cards.2.title'), body: c('research.cards.2.body') },
  ];

  const hh = c('hero.headline');
  const heroHeadline = hh === RESOURCES_HERO_HEADLINE_DEFAULT
    ? <>Tools and frameworks you can use <em>before you commit to anything.</em></>
    : hh;

  const ch = c('cta.heading');
  const ctaHeading = ch === RESOURCES_CTA_HEADING_DEFAULT
    ? <>The frameworks are free. <em>The conversations matter more.</em></>
    : ch;

  return (
    <>
      <EditorialHero
        eyebrow={c('hero.eyebrow')}
        headline={heroHeadline}
        subhead={c('hero.subhead')}
        primaryCta={{ label: c('hero.ctaLabel'), onClick: () => setPage("newsletter") }}
      />

      <div id="frameworks">
        <CardGrid
          eyebrow={c('frameworks.eyebrow')}
          heading={c('frameworks.heading')}
          lead={c('frameworks.lead')}
          columns={3}
          cards={FRAMEWORKS}
          cardStyle="feature"
        />
      </div>

      <div id="research">
        <LongForm
          eyebrow={c('research.eyebrow')}
          heading={c('research.heading')}
          background="tinted"
        >
          <p>{c('research.body')}</p>
        </LongForm>

        <CardGrid
          columns={3}
          cards={RESEARCH}
          cardStyle="compact"
          background="tinted"
        />
      </div>

      <CTABand
        heading={ctaHeading}
        body={c('cta.body')}
        primaryCta={{ label: c('cta.ctaLabel'), onClick: () => setPage("contact") }}
      />
    </>
  );
}
