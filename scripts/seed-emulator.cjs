// Seed the Firestore EMULATOR with sample content for local testing.
// Run: NODE_PATH=functions/node_modules FIRESTORE_EMULATOR_HOST=127.0.0.1:8080 \
//        node scripts/seed-emulator.cjs
const admin = require('firebase-admin');
admin.initializeApp({ projectId: 'insite-hub-web' });
const db = admin.firestore();

const para = (html) => ({ type: 'p', html });

const articles = [
  { slug: 'the-readiness-gap', pillar: 'Methodology', topic: 'Commercial Readiness', tags: ['readiness', 'evidence'], featured: true, order: 1,
    title: 'The Readiness Gap', description: 'Why no biopharma leader can tell you if the field is ready.', summary: 'The gap between training and a field that can perform.',
    author: { name: 'John Royer', role: 'Founder', bio: '', headshot: '' }, date: 'June 21, 2026', readTime: '7 min read',
    body: [para('The readiness gap is the distance between what training delivers and what the field can actually do.')], toc: [], related: [], thumb: '', published: true },
  { slug: 'evidence-over-assumptions', pillar: 'Evidence', topic: 'AI Evidence', tags: ['evidence', 'measurement'], featured: false, order: 2,
    title: 'Evidence Over Assumptions', description: 'Measuring what matters instead of assuming readiness.', summary: 'Why measurement beats assumption.',
    author: { name: 'Mercy Ehrler', role: 'Marketing', bio: '', headshot: '' }, date: 'June 14, 2026', readTime: '5 min read',
    body: [para('Assumptions are expensive. Evidence is cheaper than being wrong.')], toc: [], related: [], thumb: '', published: true },
  { slug: 'a-field-that-can-perform', pillar: 'Field', topic: 'Commercial Readiness', tags: ['field', 'performance'], featured: true, order: 3,
    title: 'A Field That Can Perform', description: 'Closing the gap between ambition and performance.', summary: 'From training to performance.',
    author: { name: 'John Royer', role: 'Founder', bio: '', headshot: '' }, date: 'May 30, 2026', readTime: '6 min read',
    body: [para('A field that can perform is the only metric that matters.')], toc: [], related: [], thumb: '', published: true },
  { slug: 'draft-in-progress', pillar: 'Methodology', topic: 'AI Evidence', tags: ['draft'], featured: false, order: 4,
    title: 'Draft In Progress', description: 'An unpublished draft.', summary: '', author: { name: '', role: '', bio: '', headshot: '' },
    date: 'June 28, 2026', readTime: '', body: [para('Work in progress.')], toc: [], related: [], thumb: '', published: false },
];

(async () => {
  for (const a of articles) await db.collection('articles').doc(a.slug).set(a);
  console.log('Seeded', articles.length, 'articles');
  process.exit(0);
})();
