// Plain check builders shared by the editors' SeoChecklist and the SEO-health tab.
const len = (s) => (s || '').trim().length;

export function articleChecks(form) {
  const words = (form.body || []).map((b) => b.html || b.text || '').join(' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  const hasH2 = (form.body || []).some((b) => b.type === 'h2' && (b.text || '').trim());
  const hasAeo = (form.body || []).some((b) => (b.type === 'faq' || b.type === 'takeaways') && (b.items || []).length);
  return [
    { ok: len(form.title) > 0 && len(form.metaTitle || form.title) <= 70, label: 'Title set and not too long', hint: 'keep the search title under ~60–70 characters' },
    { ok: len(form.description) >= 50 && len(form.description) <= 170, label: 'Search description 50–160 characters', hint: 'this is your pitch on Google — 1–2 full sentences' },
    { ok: len(form.thumb) > 0, label: 'Thumbnail image set', hint: 'posts with images get shared and clicked more' },
    { ok: words >= 300, label: 'At least ~300 words', hint: `currently ~${words} — thin pages rarely rank`, soft: true },
    { ok: words < 400 || hasH2, label: 'Headings break up long posts', hint: 'add a Heading block every few paragraphs', soft: true },
    { ok: hasAeo, label: 'Key takeaways or FAQ block (AI answers)', hint: 'these are what ChatGPT / Google AI quote', soft: true },
    { ok: len(form.author?.name) > 0, label: 'Author set', hint: 'bylines build trust signals', soft: true },
  ];
}

export function pageChecks(form) {
  return [
    { ok: len(form.title) > 0, label: 'Page title set' },
    { ok: len(form.description) >= 50 && len(form.description) <= 170, label: 'Search description 50–160 characters', hint: 'this is your pitch on Google' },
    { ok: (form.sections || []).length > 0, label: 'Page has content sections' },
    { ok: (form.sections || []).some((s) => s.type === 'faq' && (s.data?.items || []).length), label: 'FAQ section (AI answers)', hint: 'a short Q&A helps AI tools quote this page', soft: true },
  ];
}

export function caseStudyChecks(form) {
  return [
    { ok: len(form.title) > 0, label: 'Title set' },
    { ok: len(form.summary) >= 50, label: 'Summary written (used in search results)', hint: 'a couple of sentences' },
    { ok: len(form.heroImage) > 0, label: 'Hero image set', soft: true },
    { ok: (form.stats || []).some((s) => (s.value || '').trim()), label: 'At least one result stat', hint: 'numbers make case studies quotable', soft: true },
  ];
}

export function videoChecks(v) {
  return [
    { ok: len(v.description) > 0, label: 'Description written', hint: 'used in search results and the gallery' },
    { ok: len(v.transcript) > 0, label: 'Transcript added', hint: 'lets Google and AI tools read the video', soft: true },
    { ok: len(v.thumbnail) > 0, label: 'Thumbnail set', soft: true },
  ];
}
