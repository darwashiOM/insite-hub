import EditorialHero from '../components/sections/EditorialHero';
import CTABand from '../components/sections/CTABand';
import { usePageContent } from '../lib/content';

const THERAPY_AREAS = ["Oncology","Hematology","Immunology","Cardiology","Endocrinology","Neurology","Rare Disease","Vaccines","Anti-Infectives","Respiratory"];

// Headings keep their rich (italic) defaults, but render a plain string when overridden.
const HERO_HEADLINE_DEFAULT = 'MLR-compliant content. Built for field readiness.';
const CTA_HEADING_DEFAULT = 'Launch on time. MLR clean.';

export default function ContentPage({ setPage }) {
  const c = usePageContent('content');
  const hh = c('hero.headline');
  const heroHeadline = hh === HERO_HEADLINE_DEFAULT
    ? <>MLR-compliant content. <em>Built for field readiness.</em></>
    : hh;
  const ch = c('cta.heading');
  const ctaHeading = ch === CTA_HEADING_DEFAULT
    ? <>Launch on time. <em>MLR clean.</em></>
    : ch;
  return (
    <>
      <EditorialHero
        eyebrow={c('hero.eyebrow')}
        headline={heroHeadline}
        subhead={c('hero.subhead')}
        primaryCta={{ label: c('hero.ctaLabel'), onClick: () => setPage("contact") }}
      />

      <section className="section section-light">
        <div className="mw content-tracks">
          <div className="t-eyebrow">{c('tracks.eyebrow')}</div>
          <h2 className="t-h2">{c('tracks.heading')}</h2>
          <p className="t-lead">{c('tracks.lead')}</p>

          <div className="content-track-system">
            <div className="content-track-cards">
              <div className="content-track-card">
                <div className="content-track-label">Track 01</div>
                <h3>{c('track1.title')}</h3>
                <p>{c('track1.body')}</p>
                <ul>
                  <li>Hours to draft</li>
                  <li>Auto-citation</li>
                  <li>MLR pre-checked</li>
                </ul>
              </div>
              <div className="content-track-card">
                <div className="content-track-label">Track 02</div>
                <h3>{c('track2.title')}</h3>
                <p>{c('track2.body')}</p>
                <ul>
                  <li>Practitioner-authored</li>
                  <li>Field-validated</li>
                  <li>Behavior-change targeted</li>
                </ul>
              </div>
            </div>

            <div className="content-standards-strip">
              <div className="content-standards-label">{c('standards.label')}</div>
              <ul>
                <li>
                  <strong>{c('standards.item1.title')}</strong>
                  <span>{c('standards.item1.desc')}</span>
                </li>
                <li>
                  <strong>{c('standards.item2.title')}</strong>
                  <span>{c('standards.item2.desc')}</span>
                </li>
                <li>
                  <strong>{c('standards.item3.title')}</strong>
                  <span>{c('standards.item3.desc')}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="content-scenario-band">
            <div className="content-scenario-header">
              <div className="t-eyebrow">{c('scenario.eyebrow')}</div>
              <h3>{c('scenario.heading')}</h3>
            </div>
            <div className="content-scenario-timeline">
              <div className="content-scenario-phase">
                <div className="content-scenario-months">Months 1–3</div>
                <h4>{c('scenario.phase1.title')}</h4>
                <p>{c('scenario.phase1.body')}</p>
                <span>Track 02</span>
              </div>
              <div className="content-scenario-phase">
                <div className="content-scenario-months">Months 2–6</div>
                <h4>{c('scenario.phase2.title')}</h4>
                <p>{c('scenario.phase2.body')}</p>
                <span>Track 01</span>
              </div>
              <div className="content-scenario-phase">
                <div className="content-scenario-months">Months 4–7</div>
                <h4>{c('scenario.phase3.title')}</h4>
                <p>{c('scenario.phase3.body')}</p>
                <span>Tracks 01 + 02</span>
              </div>
            </div>
            <div className="content-scenario-outcome">{c('scenario.outcome')}</div>
          </div>
        </div>
      </section>

      <section className="section section-tinted">
        <div className="mw therapeutic-coverage">
          <div className="t-eyebrow">{c('therapeutic.eyebrow')}</div>
          <h2 className="t-h2">{c('therapeutic.heading')}</h2>
          <p className="t-lead">{c('therapeutic.lead')}</p>
          <div className="therapeutic-pill-row">
            {THERAPY_AREAS.map(t => (
              <span key={t} className="therapeutic-pill">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        heading={ctaHeading}
        body={c('cta.body')}
        primaryCta={{ label: c('cta.ctaLabel'), onClick: () => setPage("contact") }}
      />
    </>
  );
}
