// Reads the marketer-managed redirects (siteContent/redirects in Firestore) and
// writes them into firebase.json as Hosting 301 redirects, so they're true 301s
// for search engines. Run before `firebase deploy --only hosting`. The client-side
// redirect (App.jsx) still forwards humans instantly between deploys, so a redirect
// works the moment it's added; this step makes it a real 301 on the next deploy.
//
//   NODE_PATH="$(pwd)/functions/node_modules" node scripts/sync-redirects.mjs
//
// Needs Application Default Credentials to read production Firestore
// (gcloud auth application-default login), or the emulator host env for local.
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

(async () => {
  const admin = require('firebase-admin');
  if (!admin.apps.length) admin.initializeApp({ projectId: 'insite-hub-web' });
  const doc = await admin.firestore().collection('siteContent').doc('redirects').get();
  const rules = (doc.exists && Array.isArray(doc.data().rules)) ? doc.data().rules : [];
  const redirects = rules
    .filter((r) => r && r.from && r.to)
    .map((r) => ({ source: r.from, destination: r.to, type: 301 }));

  const cfg = JSON.parse(readFileSync('firebase.json', 'utf8'));
  cfg.hosting.redirects = redirects;
  writeFileSync('firebase.json', JSON.stringify(cfg, null, 2) + '\n');
  console.log(`Wrote ${redirects.length} Hosting 301 redirect(s) into firebase.json.`);
  process.exit(0);
})();
