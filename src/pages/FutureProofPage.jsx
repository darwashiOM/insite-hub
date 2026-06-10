import EditorialHero from '../components/sections/EditorialHero';
import CTABand from '../components/sections/CTABand';

/*
 * PLACEHOLDER / DUMMY LANDING PAGE — /future-proof-your-organization
 * Purpose: give the QR code (printed for John at LTEN) a live URL to resolve to.
 * Structure mirrors Mercy's plan: executive summary -> CTA -> form -> PDF download.
 * TODO (awaiting Mercy): final executive-summary copy, the form, and the PDF download link.
 * The page is set to noindex (see App.jsx NOINDEX_PAGES) while it's a placeholder.
 */
export default function FutureProofPage({ setPage }) {
  const scrollToDownload = () => {
    const el = document.getElementById('download');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <EditorialHero
        badge="Proxa Labs · Executive Brief"
        eyebrow="For Biopharma Commercial Leaders"
        headline={<>Future-proof <em>your organization.</em></>}
        subhead="Placeholder executive summary — final copy to be supplied. A short overview of how commercial L&D leaders build durable AI capability: define the problem before the solution, prove it with structured experiments, and scale what works. Methodology first, compliance by design."
        primaryCta={{ label: "Download the brief", onClick: scrollToDownload }}
      />

      <div id="download">
        <CTABand
          heading={<>Get the <em>executive brief.</em></>}
          body="Add your details and we'll send the PDF. (Placeholder — the form and PDF download will be wired up once provided.)"
          primaryCta={{ label: "Download the PDF", onClick: () => setPage("contact") }}
        />
      </div>
    </>
  );
}
