import EditorialHero from '../components/sections/EditorialHero';
import SplitFeature from '../components/sections/SplitFeature';
import CardGrid from '../components/sections/CardGrid';
import CTABand from '../components/sections/CTABand';
import Icon from '../components/Icon';
import { usePageContent } from '../lib/content';

// Plain-string defaults for the two headings that carry inline <em> markup.
// When the override still equals these, we render the rich JSX; otherwise the
// editor's plain string.
const NEWS_HERO_HEADLINE_DEFAULT = "What's new at Proxa Labs.";
const NEWS_CTA_HEADING_DEFAULT = "Get the announcements before they're public.";

const SECONDARY_NEWS = [
  { icon: <Icon name="update" size={22} />,      tag: "March 2026 · Platform Update", title: "Proxa Labs Stage — ComplianceGuard v2 Released",                 body: "Real-time compliance monitoring now includes enhanced MLR flag categorization, automated rephrasing suggestions, and expanded banned phrase detection across all six commercial verticals. Available to all Stage clients immediately." },
  { icon: <Icon name="research" size={22} />,    tag: "February 2026 · Research",       title: "The Lab publishes AI Readiness Scoring Model beta",         body: "The Lab team has released a beta version of the AI Readiness Scoring Model — an 8-dimension maturity framework for measuring commercial L&D AI readiness. Available to advisory engagement clients as part of Phase 1 diagnostics." },
  { icon: <Icon name="launch" size={22} />,      tag: "December 2025 · Platform Launch", title: "Proxa Labs Forge v4.0 — General Availability",                  body: "Forge's agentic content creation platform reaches general availability, including the Content Gap Analyzer, MLR Package Builder, and Knowledge Session dual-track sourcing engine. Available to enterprise commercial L&D teams now." },
];

export default function NewsPage({ setPage }) {
  const c = usePageContent('news');
  const hh = c('hero.headline');
  const heroHeadline = hh === NEWS_HERO_HEADLINE_DEFAULT
    ? <>What's new at <em>Proxa Labs.</em></>
    : hh;
  const ch = c('cta.heading');
  const ctaHeading = ch === NEWS_CTA_HEADING_DEFAULT
    ? <>Get the announcements <em>before they're public.</em></>
    : ch;
  return (
    <>
      <EditorialHero
        eyebrow={c('hero.eyebrow')}
        headline={heroHeadline}
        subhead={c('hero.subhead')}
        primaryCta={{ label: c('hero.ctaLabel'), onClick: () => setPage("newsletter") }}
      />

      <SplitFeature
        ratio="50-50"
        eyebrow={c('featured.eyebrow')}
        heading={c('featured.heading')}
        body={c('featured.body')}
        bullets={[
          c('featured.bullets.0'),
          c('featured.bullets.1'),
          c('featured.bullets.2'),
        ]}
        cta={{ label: c('featured.ctaLabel'), onClick: () => setPage("literacy") }}
        visual={
          <div style={{ background: "linear-gradient(135deg, #F8F8FF, #F0F4FF)", border: "1.5px solid rgba(117,171,192,.2)", borderRadius: 20, padding: 32 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#75abc0", marginBottom: 16 }}>{c('featured.visual.badge')}</div>
            <div style={{ fontFamily: "Manrope,sans-serif", fontWeight: 900, fontSize: 28, color: "#75abc0", letterSpacing: "-0.03em", marginBottom: 4 }}>{c('featured.visual.brand')}</div>
            <div style={{ fontFamily: "Manrope,sans-serif", fontWeight: 700, fontSize: 14, color: "#12141A", marginBottom: 20 }}>{c('featured.visual.brandSub')}</div>
            <div style={{ fontSize: 13, color: "#5C6370", lineHeight: 1.7 }}>{c('featured.visual.quote')}</div>
          </div>
        }
      />

      <CardGrid
        eyebrow={c('recent.eyebrow')}
        heading={c('recent.heading')}
        columns={2}
        cards={SECONDARY_NEWS.map((card, i) => ({
          ...card,
          tag: c(`recent.cards.${i}.tag`),
          title: c(`recent.cards.${i}.title`),
          body: c(`recent.cards.${i}.body`),
        }))}
        cardStyle="standard"
        background="tinted"
      />

      <CTABand
        heading={ctaHeading}
        body={c('cta.body')}
        primaryCta={{ label: c('cta.ctaLabel'), onClick: () => setPage("newsletter") }}
      />
    </>
  );
}
