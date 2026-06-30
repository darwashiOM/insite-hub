// Build-time prerender: snapshot each route's fully-rendered HTML in headless
// chromium and write it as a static file, so crawlers and social/AI bots that
// don't run JS see complete content + meta + JSON-LD. Also regenerates the
// sitemap. Run after `vite build`.
//
// Local verify: build with VITE_PRERENDER=1 + emulators running, then
//   NODE_PATH="$(pwd)/functions/node_modules" FIRESTORE_EMULATOR_HOST=127.0.0.1:8080 node scripts/prerender.mjs
// Deploy: `npm run build:prerender` (reads production Firestore for slugs).

import { chromium } from 'playwright-core';
import http from 'node:http';
import { createReadStream, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const PORT = 5055;
const ORIGIN = process.env.PRERENDER_ORIGIN || 'https://www.insitehub.com';

// Indexable static marketing routes (mirrors App.jsx PAGE_PATHS minus NOINDEX_PAGES).
const STATIC_ROUTES = [
  '/', '/platform', '/advisory', '/ai-literacy', '/insitex-lms', '/content-development',
  '/the-lab', '/about', '/announcements', '/resources', '/newsletter', '/contact',
  '/blog', '/case-studies', '/videos',
];

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff': 'font/woff',
  '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain', '.map': 'application/json',
};

// Published dynamic routes from Firestore (emulator locally, production at deploy).
// Returns { path, noindex } — noindex pages are still prerendered (with their
// robots meta) but excluded from the sitemap.
async function dynamicRoutes() {
  try {
    const admin = require('firebase-admin');
    if (!admin.apps.length) admin.initializeApp({ projectId: 'insite-hub-web' });
    const db = admin.firestore();
    const routes = [];
    for (const [col, prefix] of [['articles', '/blog/'], ['caseStudies', '/case-studies/']]) {
      const snap = await db.collection(col).where('published', '==', true).get();
      snap.forEach((d) => routes.push({ path: prefix + (d.data().slug || d.id), noindex: !!d.data().noindex }));
    }
    const pages = await db.collection('pages').where('published', '==', true).get();
    pages.forEach((d) => routes.push({ path: '/' + (d.data().slug || d.id), noindex: !!d.data().noindex }));
    return routes;
  } catch (e) {
    console.warn('  ⚠ could not read dynamic routes from Firestore (' + (e.message || e) + ') — prerendering static routes only.');
    return [];
  }
}

// Serve dist, but always return index.html for page routes so every route renders
// the SPA fresh (ignoring any per-route file written earlier this run).
function startServer() {
  const server = http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const ext = extname(p);
    let filePath = (ext && MIME[ext]) ? join(DIST, p) : join(DIST, 'index.html');
    if (!existsSync(filePath)) filePath = join(DIST, 'index.html');
    res.writeHead(200, { 'content-type': MIME[extname(filePath)] || 'text/html' });
    createReadStream(filePath).pipe(res);
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

async function snapshot(browser, route) {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  // Wait until the SPA (lazy chunk + data) has rendered real content.
  await page.waitForFunction(() => {
    const root = document.querySelector('#root');
    return root && (root.innerText || '').replace(/\s+/g, ' ').trim().length > 200;
  }, { timeout: 20000 }).catch(() => {});
  await page.waitForTimeout(800); // let meta + JSON-LD finish injecting
  const html = '<!doctype html>\n' + await page.evaluate(() => document.documentElement.outerHTML);
  await page.close();
  return { html, errors };
}

function writeRoute(route, html) {
  const dir = route === '/' ? DIST : join(DIST, route.replace(/^\//, ''));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
}

function writeSitemap(routes) {
  const urls = routes
    .map((r) => `  <url><loc>${ORIGIN}${r}</loc></url>`)
    .join('\n');
  writeFileSync(join(DIST, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
}

(async () => {
  if (!existsSync(join(DIST, 'index.html'))) {
    console.error('No dist/index.html — run `vite build` first.');
    process.exit(1);
  }
  const server = await startServer();
  const routes = [...STATIC_ROUTES.map((p) => ({ path: p, noindex: false })), ...(await dynamicRoutes())];
  console.log(`Prerendering ${routes.length} routes...`);
  const browser = await chromium.launch();
  let skipped = 0;
  const sitemap = [];
  for (const route of routes) {
    const { html, errors } = await snapshot(browser, route.path);
    const textLen = html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().length;
    const ok = !errors.length && textLen >= 200;
    console.log(`  ${route.path} — ${textLen} chars${errors.length ? ' ⚠ ' + errors.length + ' page errors' : ''}${ok ? '' : ' ⚠ SKIPPED (thin/error — keeping the SPA fallback)'}`);
    if (!ok) { skipped++; continue; } // never bake an error/not-found page into a 200
    writeRoute(route.path, html);
    if (!route.noindex) sitemap.push(route.path); // noindex pages stay out of the sitemap
  }
  writeSitemap(sitemap);
  await browser.close();
  await new Promise((r) => server.close(r));
  console.log(`Done — ${routes.length - skipped} routes prerendered, ${sitemap.length} in sitemap${skipped ? `, ${skipped} skipped (left as SPA fallback)` : ''}.`);
})();
