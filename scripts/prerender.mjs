// Build-time prerender: snapshot each route's fully-rendered HTML in headless
// chromium and write it as a static file, so crawlers and social/AI bots that
// don't run JS see complete content + meta + JSON-LD. Run after `vite build`.
//
// Needs NO credentials: routes come from the live /sitemap.xml and content
// overrides from the live /api/content (see SOURCE below), and the rendered SPA
// reads published content through the normal public Firestore rules.
// Deploy: `npm run build:prerender` then `firebase deploy --only hosting`.

import { chromium } from 'playwright-core';
import http from 'node:http';
import { createReadStream, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const PORT = 5055;

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

// Data comes from the LIVE site's own public endpoints — no service account or
// gcloud login needed, so this runs anywhere (laptop, CI). Override the source
// with PRERENDER_SOURCE (e.g. a preview channel) if needed.
const SOURCE = (process.env.PRERENDER_SOURCE || 'https://insite-hub-web.web.app').replace(/\/+$/, '');

// Published dynamic routes, discovered from the live sitemap (the getSitemap
// function lists every published post / case study / built page and already
// excludes noindex items — those simply keep the SPA fallback).
async function dynamicRoutes() {
  try {
    const xml = await (await fetch(`${SOURCE}/sitemap.xml`)).text();
    const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((m) => new URL(m[1]).pathname.replace(/\/+$/, '') || '/');
    const dynamic = paths.filter((p) => !STATIC_ROUTES.includes(p));
    return [...new Set(dynamic)].map((p) => ({ path: p, noindex: false }));
  } catch (e) {
    console.warn('  ⚠ could not read the live sitemap (' + (e.message || e) + ') — prerendering static routes only.');
    return [];
  }
}

// The marketing pages fetch /api/content for their SEO/copy overrides. In prod
// that's a Cloud Function; here we mirror the live payload so per-page SEO
// overrides actually get baked into the snapshot.
async function buildContentPayload() {
  try {
    return await (await fetch(`${SOURCE}/api/content`)).json();
  } catch { return {}; }
}

// --- localStorage seeding -----------------------------------------------
// The blog / case-study / video pages read a localStorage cache first
// (stale-while-revalidate), so seeding it makes them render instantly instead
// of depending on Firestore's flaky in-browser transport under automation.
// Published content is publicly readable, so the REST query needs no auth.
const FIRESTORE_REST = 'https://firestore.googleapis.com/v1/projects/insite-hub-web/databases/(default)/documents:runQuery?key=AIzaSyAiaiu1-ZppLCV8UUqmvGg-Ti5XZGifkn8';

function decodeValue(v) {
  if ('stringValue' in v) return v.stringValue;
  if ('booleanValue' in v) return v.booleanValue;
  if ('integerValue' in v) return Number(v.integerValue);
  if ('doubleValue' in v) return v.doubleValue;
  if ('nullValue' in v) return null;
  if ('timestampValue' in v) { const d = new Date(v.timestampValue); return { seconds: Math.floor(d.getTime() / 1000), nanoseconds: 0 }; }
  if ('arrayValue' in v) return (v.arrayValue.values || []).map(decodeValue);
  if ('mapValue' in v) return Object.fromEntries(Object.entries(v.mapValue.fields || {}).map(([k, x]) => [k, decodeValue(x)]));
  return null;
}

async function fetchPublished(collectionId) {
  const res = await fetch(FIRESTORE_REST, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ structuredQuery: {
      from: [{ collectionId }],
      where: { fieldFilter: { field: { fieldPath: 'published' }, op: 'EQUAL', value: { booleanValue: true } } },
    } }),
  });
  const rows = await res.json();
  return rows.filter((r) => r.document).map((r) => ({
    id: r.document.name.split('/').pop(),
    ...Object.fromEntries(Object.entries(r.document.fields || {}).map(([k, v]) => [k, decodeValue(v)])),
  }));
}

async function buildSeed() {
  try {
    const [articles, caseStudies, videos] = await Promise.all([
      fetchPublished('articles'), fetchPublished('caseStudies'), fetchPublished('videos'),
    ]);
    console.log(`Seed: ${articles.length} articles, ${caseStudies.length} case studies, ${videos.length} videos`);
    return {
      'proxa.articles.v1': articles,
      'proxa.caseStudies.v1': caseStudies,
      'proxa.videos.v1': videos,
    };
  } catch (e) {
    console.warn('  ⚠ could not build the content seed (' + (e.message || e) + ') — pages will fetch live.');
    return {};
  }
}

// Serve dist, but always return index.html for page routes so every route renders
// the SPA fresh (ignoring any per-route file written earlier this run).
function startServer(contentJson) {
  const server = http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    if (p === '/api/content') {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(contentJson);
      return;
    }
    const ext = extname(p);
    let filePath = (ext && MIME[ext]) ? join(DIST, p) : join(DIST, 'index.html');
    if (!existsSync(filePath)) filePath = join(DIST, 'index.html');
    res.writeHead(200, { 'content-type': MIME[extname(filePath)] || 'text/html' });
    createReadStream(filePath).pipe(res);
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

async function snapshot(browser, route, seed) {
  // A fresh context per route: pages share the browser's per-host connection
  // pool, and Firestore's long-poll sockets from closed pages can starve it —
  // isolated contexts keep every route's network clean.
  const context = await browser.newContext();
  await context.addInitScript((data) => {
    for (const [k, v] of Object.entries(data)) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ } }
  }, seed);
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  // Wait until the SPA has rendered real content — nav/footer alone can exceed
  // 200 chars, so also require every "Loading…" placeholder to be gone (data
  // pages fetch from Firestore, which can take a few seconds cold).
  await page.waitForFunction(() => {
    const root = document.querySelector('#root');
    const t = root ? (root.innerText || '').replace(/\s+/g, ' ').trim() : '';
    return t.length > 200 && !/Loading…|Loading\.\.\./.test(t);
  }, { timeout: 25000 }).catch(() => {});
  await page.waitForTimeout(1200); // let meta + JSON-LD finish injecting
  const html = '<!doctype html>\n' + await page.evaluate(() => document.documentElement.outerHTML);
  const stuck = await page.evaluate(() => /Loading…|Couldn’t load/.test(document.querySelector('#root')?.innerText || ''));
  await context.close();
  return { html, errors, stuck };
}

function writeRoute(route, html) {
  const dir = route === '/' ? DIST : join(DIST, route.replace(/^\//, ''));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
}

(async () => {
  if (!existsSync(join(DIST, 'index.html'))) {
    console.error('No dist/index.html — run `vite build` first.');
    process.exit(1);
  }
  const server = await startServer(JSON.stringify(await buildContentPayload()));
  const seed = await buildSeed();
  const routes = [...STATIC_ROUTES.map((p) => ({ path: p, noindex: false })), ...(await dynamicRoutes())];
  console.log(`Prerendering ${routes.length} routes...`);
  let browser = await chromium.launch();
  const attempt = async (route) => {
    const { html, errors, stuck } = await snapshot(browser, route.path, seed);
    const textLen = html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().length;
    const ok = !errors.length && !stuck && textLen >= 200;
    return { ok, html, textLen, errors, stuck };
  };
  let skipped = 0;
  const retryQueue = [];
  for (const route of routes) {
    const r = await attempt(route);
    if (r.ok) {
      console.log(`  ${route.path} — ${r.textLen} chars`);
      writeRoute(route.path, r.html);
    } else {
      retryQueue.push(route);
    }
  }
  // Long Firestore polls can starve the browser's connection pool over a run —
  // give any stuck routes a second chance in a completely fresh browser each.
  for (const route of retryQueue) {
    await browser.close();
    browser = await chromium.launch();
    const r = await attempt(route);
    const ok = r.ok;
    console.log(`  ${route.path} (retry) — ${r.textLen} chars${r.errors.length ? ' ⚠ ' + r.errors.length + ' page errors' : ''}${r.stuck ? ' ⚠ still loading' : ''}${ok ? '' : ' ⚠ SKIPPED (keeping the SPA fallback)'}`);
    if (!ok) { skipped++; continue; } // never bake a loading/error page into a 200
    writeRoute(route.path, r.html);
  }
  // The sitemap is served live by the getSitemap Cloud Function (/sitemap.xml),
  // so it's always current without a rebuild — nothing to write here.
  await browser.close();
  await new Promise((r) => server.close(r));
  console.log(`Done — ${routes.length - skipped} routes prerendered${skipped ? `, ${skipped} skipped (left as SPA fallback)` : ''}.`);
})();
