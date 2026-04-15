import EditorialHero from '../components/sections/EditorialHero';
import SplitFeature from '../components/sections/SplitFeature';
import CardGrid from '../components/sections/CardGrid';
import LongForm from '../components/sections/LongForm';
import CTABand from '../components/sections/CTABand';
import Icon from '../components/Icon';

const CAPABILITIES = [
  { icon: <Icon name="agent" size={22} />,        title: "AI-Powered Content (Forge)",   body: "Forge agents generate MLR-compliant modules from PI, CSRs, and brand assets. Every claim cited. Development drops from months to hours. Best for high-volume, time-sensitive launch content." },
  { icon: <Icon name="content" size={22} />,      title: "Traditional Instructional Design", body: "Full-service content by practitioners with deep biopharma commercial backgrounds. Human-led, compliance-first, field-validated. Best for nuanced therapeutic content and high-stakes launches." },
  { icon: <Icon name="compliance" size={22} />,   title: "MLR-Integrated Design",         body: "Compliance as a design input, not a last gate. Fewer revision cycles. Faster time-to-field. We embed MLR considerations from day one of content design." },
  { icon: <Icon name="checklist" size={22} />,    title: "AI-Assisted Human Review",      body: "Forge drafts the structure, citations, and compliance scaffolding. InsiteHub practitioners review and validate. Best of both worlds for organizations not ready for full AI authoring." },
];

const THERAPY_AREAS = ["Oncology","Hematology","Immunology","Cardiology","Endocrinology","Neurology","Rare Disease","Vaccines","Anti-Infectives","Respiratory"];

export default function ContentPage({ setPage }) {
  return (
    <>
      <EditorialHero
        eyebrow="Content Development · Two Tracks"
        headline={<>MLR-compliant content. <em>Built for field readiness.</em></>}
        subhead="Whether you need AI-generated content at speed or human-led instructional design for high-stakes launches, InsiteHub delivers MLR-compliant training built by practitioners with deep biopharma commercial backgrounds. Pick the track that fits the moment."
        primaryCta={{ label: "Talk to a Content Lead", onClick: () => setPage("contact") }}
        secondaryLink={{ label: "See Forge", onClick: () => setPage("platform") }}
      />

      <SplitFeature
        ratio="50-50"
        eyebrow="Two Tracks. One Standard."
        heading="AI-powered, human-led, or both."
        body="Forge accelerates content development from months to hours when speed matters. Traditional instructional design protects the depth and nuance complex therapeutic content requires. Most launches benefit from both — Forge for foundational modules, human-led for the high-stakes objection handling."
        bullets={[
          "Compliance-first design — every output MLR-routable",
          "Field-validated — built by people who've ridden along",
          "Behavior-change targeted — completion is not the metric",
        ]}
        cta={{ label: "See How Forge Works", onClick: () => setPage("platform") }}
        visual={
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: "rgba(244,128,31,.07)", border: "1.5px solid rgba(244,128,31,.18)", borderRadius: 14, padding: 22 }}>
              <div style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 14, color: "#F4801F", marginBottom: 8 }}>AI-Powered (Forge)</div>
              <div style={{ fontSize: 13, color: "#5C6370", lineHeight: 1.6 }}>Hours to draft. Auto-citation. MLR pre-checked.</div>
            </div>
            <div style={{ background: "rgba(124,58,237,.07)", border: "1.5px solid rgba(124,58,237,.18)", borderRadius: 14, padding: 22 }}>
              <div style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 14, color: "#7C3AED", marginBottom: 8 }}>Traditional ID</div>
              <div style={{ fontSize: 13, color: "#5C6370", lineHeight: 1.6 }}>Practitioner-authored. Field-validated. Behavior-change targeted.</div>
            </div>
          </div>
        }
      />

      <CardGrid
        eyebrow="Four Capability Areas"
        heading="Pick the right track for the moment."
        columns={2}
        cards={CAPABILITIES}
        cardStyle="standard"
        background="tinted"
      />

      <LongForm
        eyebrow="Example Scenario"
        heading="A 9-month launch window. Three therapeutic indications. One content team."
      >
        <p>The brand team needs MLR-compliant launch training for the field force across three approved indications. The launch window is 9 months. The content team has bandwidth for one indication using traditional instructional design. The other two indications would either be late or skipped entirely.</p>
        <p>InsiteHub's mixed approach: Forge agents draft foundational training modules for indications two and three from PI, CSRs, and brand assets. Each draft includes auto-cited claims and an MLR pre-check pass. InsiteHub practitioners validate the drafts (typically 1-2 week review per module) and the brand team focuses traditional ID effort on the lead indication's high-stakes objection handling and HCP scenario work.</p>
        <p>Result: all three indications launch with MLR-cleared training on time. The content team's bandwidth gets directed to the highest-value, hardest-to-automate work. Forge handles the foundational lift.</p>
      </LongForm>

      <SplitFeature
        ratio="60-40"
        eyebrow="Therapeutic Area Coverage"
        heading="We've worked across the major therapeutic areas pharma sells into."
        body="InsiteHub's content practitioners have authored launch training across oncology, hematology, immunology, cardiology, endocrinology, neurology, rare disease, vaccines, anti-infectives, and respiratory. The therapeutic depth shows in the work: nuanced PI handling, accurate MOA framing, and HCP persona behaviors that match real specialty conversations."
        cta={{ label: "Discuss Your Launch", onClick: () => setPage("contact") }}
        visual={
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {THERAPY_AREAS.map(t => (
              <span key={t} style={{ padding: "8px 16px", borderRadius: 100, background: "#fff", border: "1.5px solid #E3E5EA", fontSize: 13, fontWeight: 600, color: "#12141A", fontFamily: "DM Sans,sans-serif" }}>{t}</span>
            ))}
          </div>
        }
        reverse
        background="tinted"
      />

      <CTABand
        heading={<>Launch on time. <em>MLR clean.</em></>}
        body="Tell us about your launch window and content backlog. We'll show you the mix of AI-powered and human-led work that fits."
        primaryCta={{ label: "Start a Conversation", onClick: () => setPage("contact") }}
        secondaryLink={{ label: "See Forge", onClick: () => setPage("platform") }}
      />
    </>
  );
}
