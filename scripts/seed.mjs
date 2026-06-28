// One-time seed: write the existing Readiness Gap article into Firestore.
// Run: GCLOUD_TOKEN=$(gcloud auth print-access-token) node scripts/seed.mjs
import { readinessGap } from '../src/data/articles.js';

const PROJECT = 'insite-hub-web';
const token = process.env.GCLOUD_TOKEN;
if (!token) { console.error('GCLOUD_TOKEN env var required'); process.exit(1); }

function toValue(v) {
  if (v === null || v === undefined) return { nullValue: null };
  if (typeof v === 'boolean') return { booleanValue: v };
  if (typeof v === 'number') return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
  if (typeof v === 'string') return { stringValue: v };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(toValue) } };
  if (typeof v === 'object') return { mapValue: { fields: toFields(v) } };
  return { stringValue: String(v) };
}
function toFields(obj) {
  const f = {};
  for (const [k, val] of Object.entries(obj)) f[k] = toValue(val);
  return f;
}

// Drop the placeholder related links (they pointed at '#'); real related wiring
// comes once there are more articles.
const doc = { ...readinessGap, related: [], thumb: '/assets/blog/hero-dial.png', published: true, order: 0 };
const slug = doc.slug;
const url = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents/articles/${slug}`;

const res = await fetch(url, {
  method: 'PATCH',
  headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ fields: toFields(doc) }),
});
const out = await res.json();
if (!res.ok) { console.error('Seed failed', res.status, JSON.stringify(out).slice(0, 600)); process.exit(1); }
console.log('Seeded:', out.name);
