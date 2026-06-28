import EditorialHero from '../components/sections/EditorialHero';
import LongForm from '../components/sections/LongForm';
import StatBand from '../components/sections/StatBand';
import CTABand from '../components/sections/CTABand';
import { usePageContent } from '../lib/content';

// Plain-text defaults for the two rich (italic) headings — when an editor
// overrides them we render a plain string; otherwise the JSX default is kept.
const ABOUT_HERO_HEADLINE_DEFAULT = "Built by someone who's been in your seat.";
const ABOUT_CTA_HEADING_DEFAULT = "Work with a team that's been in your seat.";

export default function AboutPage({ setPage }) {
  const c = usePageContent('about');

  const heroHeadlineRaw = c('hero.headline');
  const heroHeadline = heroHeadlineRaw === ABOUT_HERO_HEADLINE_DEFAULT
    ? <>Built by someone who's <em>been in your seat.</em></>
    : <>{heroHeadlineRaw}</>;

  const ctaHeadingRaw = c('cta.heading');
  const ctaHeading = ctaHeadingRaw === ABOUT_CTA_HEADING_DEFAULT
    ? <>Work with a team <em>that's been in your seat.</em></>
    : <>{ctaHeadingRaw}</>;

  const proofStats = [
    { n: c('stats.0.n'), l: c('stats.0.l') },
    { n: c('stats.1.n'), l: c('stats.1.l') },
    { n: c('stats.2.n'), l: c('stats.2.l') },
  ];

  return (
    <>
      <EditorialHero
        eyebrow={c('hero.eyebrow')}
        headline={heroHeadline}
        subhead={c('hero.subhead')}
        className="about-hero-section"
      />

      <LongForm
        eyebrow={c('story.eyebrow')}
        heading={c('story.heading')}
        className="about-story-section"
      >
        <p>{c('story.p1')}</p>
        <p>{c('story.p2')}</p>
        <p>{c('story.p3')}</p>
      </LongForm>

      <StatBand stats={proofStats} />

      <CTABand
        heading={ctaHeading}
        body={c('cta.body')}
        primaryCta={{ label: c('cta.ctaLabel'), onClick: () => setPage("contact") }}
      />
    </>
  );
}
