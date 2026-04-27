import EditorialHero from '../components/sections/EditorialHero';
import LongForm from '../components/sections/LongForm';
import CTABand from '../components/sections/CTABand';

const THERAPY_AREAS = ["Oncology","Hematology","Immunology","Cardiology","Endocrinology","Neurology","Rare Disease","Vaccines","Anti-Infectives","Respiratory"];

export default function ContentPage({ setPage }) {
  const goToForge = () => {
    setPage("platform", { hash: "forge" });
  };

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

          <div className="content-track-cards">
            <div className="content-track-card">
              <h3>AI-Powered (Forge)</h3>
              <ul>
                <li>Hours to draft</li>
                <li>Auto-citation</li>
                <li>MLR pre-checked</li>
              </ul>
            </div>
            <div className="content-track-card">
              <h3>Traditional ID</h3>
              <ul>
                <li>Practitioner-authored</li>
                <li>Field-validated</li>
                <li>Behavior-change targeted</li>
              </ul>
            </div>
          </div>

          <div className="content-transition">Two approaches run across both tracks.</div>

          <div className="content-approach-grid">
            <div className="content-approach">
              <h3>MLR-Integrated Design</h3>
              <p>Compliance as a design input, not a last gate. Fewer revision cycles. Faster time-to-field. MLR considerations are embedded from day one — whichever track you choose.</p>
            </div>
            <div className="content-approach">
              <h3>AI-Assisted Human Review</h3>
              <p>Forge drafts the structure, citations, and compliance scaffolding. InsiteHub practitioners review and validate every output. The best of both tracks for organizations not ready for full AI authoring.</p>
            </div>
          </div>

          <div className="content-quality-box">
            <div className="t-eyebrow">Every Output, Every Track</div>
            <ul>
              <li>Compliance-first design — every output MLR-routable</li>
              <li>Field-validated — built by people who've ridden along</li>
              <li>Behavior-change targeted — completion is not the metric</li>
            </ul>
          </div>

          <a
            className="bp"
            href="#forge"
            onClick={(e) => {
              e.preventDefault();
              goToForge();
            }}
          >
            See How Forge Works
          </a>
        </div>
      </section>

      <LongForm
        eyebrow="Example Scenario"
        heading="A 9-month launch window. Three therapeutic indications. One content team."
      >
        <p>The brand team needs MLR-compliant launch training for the field force across three approved indications. The launch window is nine months. The content team has bandwidth for one indication using traditional instructional design. Without help, the other two would launch late or not at all.</p>
        <p>Here's how the tracks work together. Forge drafts foundational training modules for indications two and three from PI, CSRs, and brand assets — every claim auto-cited, every draft MLR pre-checked. InsiteHub practitioners validate each draft in one to two weeks. The brand team directs traditional ID effort at the lead indication's high-stakes objection handling and HCP scenario work.</p>
        <p>All three indications launch on time, MLR-cleared. The content team's bandwidth goes to the highest-value, hardest-to-automate work. Forge handles the foundational lift.</p>
      </LongForm>

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
