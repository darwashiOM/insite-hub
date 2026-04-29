import EditorialHero from '../components/sections/EditorialHero';
import CTABand from '../components/sections/CTABand';

const THERAPY_AREAS = ["Oncology","Hematology","Immunology","Cardiology","Endocrinology","Neurology","Rare Disease","Vaccines","Anti-Infectives","Respiratory"];

export default function ContentPage({ setPage }) {
  return (
    <>
      <EditorialHero
        eyebrow="Content Development"
        headline={<>MLR-compliant content. <em>Built for field readiness.</em></>}
        subhead="Every output is MLR-compliant, built by practitioners with deep biopharma commercial backgrounds, and measured by what reps can do in the field — not completion rates. Whether your launch needs speed or nuance, there's a track built for the moment."
        primaryCta={{ label: "Book a Consult", onClick: () => setPage("contact") }}
      />

      <section className="section section-light">
        <div className="mw content-tracks">
          <div className="t-eyebrow">Two Tracks. One Standard.</div>
          <h2 className="t-h2">AI-powered, human-led, or both.</h2>
          <p className="t-lead">Forge is our AI-powered track. It compresses content development from months to hours when speed matters. Traditional instructional design is our human-led track. It protects the depth and nuance that complex therapeutic content requires. Most launches use both — Forge for foundational modules, human-led for high-stakes objection handling.</p>

          <div className="content-track-system">
            <div className="content-track-cards">
              <div className="content-track-card">
                <div className="content-track-label">Track 01</div>
                <h3>AI-Powered Forge</h3>
                <p>Speed for foundational modules when launch timelines compress.</p>
                <ul>
                  <li>Hours to draft</li>
                  <li>Auto-citation</li>
                  <li>MLR pre-checked</li>
                </ul>
              </div>
              <div className="content-track-card">
                <div className="content-track-label">Track 02</div>
                <h3>Human-Led ID</h3>
                <p>Practitioner depth for high-stakes, nuanced field conversations.</p>
                <ul>
                  <li>Practitioner-authored</li>
                  <li>Field-validated</li>
                  <li>Behavior-change targeted</li>
                </ul>
              </div>
            </div>

            <div className="content-standards-strip">
              <div className="content-standards-label">Every Output, Every Track</div>
              <ul>
                <li>
                  <strong>Compliance-first design</strong>
                  <span>Every output MLR-routable</span>
                </li>
                <li>
                  <strong>Field-validated</strong>
                  <span>Built by people who've ridden along</span>
                </li>
                <li>
                  <strong>Behavior-change targeted</strong>
                  <span>Completion is not the metric</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="content-scenario-band">
            <div className="content-scenario-header">
              <div className="t-eyebrow">Example Scenario</div>
              <h3>A 9-month launch window. Three therapeutic indications. One content team.</h3>
            </div>
            <div className="content-scenario-timeline">
              <div className="content-scenario-phase">
                <div className="content-scenario-months">Months 1–3</div>
                <h4>Lead indication gets human-led depth.</h4>
                <p>Traditional ID focuses on high-stakes objection handling and HCP scenario work.</p>
                <span>Track 02</span>
              </div>
              <div className="content-scenario-phase">
                <div className="content-scenario-months">Months 2–6</div>
                <h4>Forge drafts the foundational lift.</h4>
                <p>Indications two and three are drafted from PI, CSRs, and brand assets with cited claims.</p>
                <span>Track 01</span>
              </div>
              <div className="content-scenario-phase">
                <div className="content-scenario-months">Months 4–7</div>
                <h4>Practitioners validate before MLR.</h4>
                <p>InsiteHub reviewers validate accuracy, nuance, and field readiness before routing.</p>
                <span>Tracks 01 + 02</span>
              </div>
            </div>
            <div className="content-scenario-outcome">All three indications launch on time, MLR-cleared.</div>
          </div>
        </div>
      </section>

      <section className="section section-tinted">
        <div className="mw therapeutic-coverage">
          <div className="t-eyebrow">Therapeutic Area Coverage</div>
          <h2 className="t-h2">We've built launch training across the major therapeutic areas.</h2>
          <p className="t-lead">Our content practitioners have authored launch training across ten therapeutic areas. The depth shows in the work: nuanced PI handling, accurate MOA framing, and HCP persona behaviors that match real specialty conversations.</p>
          <div className="therapeutic-pill-row">
            {THERAPY_AREAS.map(t => (
              <span key={t} className="therapeutic-pill">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        heading={<>Launch on time. <em>MLR clean.</em></>}
        body="Tell us about your launch window and content backlog. We'll show you the mix of AI-powered and human-led work that fits."
        primaryCta={{ label: "Book a Consult", onClick: () => setPage("contact") }}
      />
    </>
  );
}
