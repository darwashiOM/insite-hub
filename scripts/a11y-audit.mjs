// Runs axe-core (WCAG 2 A/AA) against key pages of a deployed site in headless
// chromium and prints the violations. Usage: node scripts/a11y-audit.mjs [baseUrl]
import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const axePath = require.resolve('axe-core/axe.min.js');
const axeSource = readFileSync(axePath, 'utf8');

const BASE = process.argv[2] || 'https://insite-hub-web.web.app';
const PAGES = ['/', '/blog', '/case-studies', '/videos', '/contact', '/search?q=a', '/noonewillfindthis'];

const run = async (browser, path) => {
  const page = await browser.newPage();
  try {
    await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1200);
    await page.evaluate(axeSource);
    const res = await page.evaluate(async () => window.axe.run(document, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
    }));
    return res.violations.map((v) => ({ id: v.id, impact: v.impact, n: v.nodes.length, help: v.help }));
  } catch (e) {
    return [{ id: 'PAGE_ERROR', impact: 'error', n: 0, help: e.message }];
  } finally {
    await page.close();
  }
};

(async () => {
  const browser = await chromium.launch();
  let total = 0, serious = 0;
  for (const p of PAGES) {
    const violations = await run(browser, p);
    console.log(`\n${p} — ${violations.length ? violations.length + ' violation type(s)' : '✓ no violations'}`);
    for (const v of violations) {
      total += v.n;
      if (v.impact === 'serious' || v.impact === 'critical') serious += v.n;
      console.log(`  [${v.impact}] ${v.id} ×${v.n} — ${v.help}`);
    }
  }
  await browser.close();
  console.log(`\n==== ${total} total issue nodes, ${serious} serious/critical, across ${PAGES.length} pages ====`);
})();
