// One-off generator for the default social share image (1200x630) — a branded
// card in the site palette, screenshotted from HTML in headless chromium.
// Run: node scripts/make-og-image.mjs   → writes public/og-default.png
import { chromium } from 'playwright-core';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'og-default.png');
const html = `<!doctype html><html><head><meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@800&family=DM+Sans:wght@500&display=swap');
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #0c1218; font-family: 'Manrope', sans-serif;
         display: flex; flex-direction: column; justify-content: space-between; padding: 72px 80px; overflow: hidden; }
  .bars { display: flex; gap: 10px; align-items: flex-end; height: 54px; }
  .bars i { display: block; width: 13px; border-radius: 4px; background: #f5825f; }
  .bars i:nth-child(1) { height: 34px; opacity: .75; }
  .bars i:nth-child(2) { height: 54px; }
  .bars i:nth-child(3) { height: 44px; opacity: .9; }
  h1 { color: #ffffff; font-size: 78px; line-height: 1.08; letter-spacing: -0.02em; max-width: 980px; }
  h1 em { font-style: normal; color: #f5825f; }
  .foot { display: flex; justify-content: space-between; align-items: center; font-family: 'DM Sans', sans-serif; }
  .wordmark { color: #fff; font-size: 34px; font-weight: 500; letter-spacing: .01em; }
  .wordmark span { color: #8a94a1; font-weight: 500; letter-spacing: .22em; font-size: 26px; margin-left: 8px; }
  .url { color: #8a94a1; font-size: 26px; }
  .glow { position: fixed; right: -220px; top: -220px; width: 640px; height: 640px; border-radius: 50%;
          background: radial-gradient(circle, rgba(245,130,95,.28), transparent 65%); }
</style></head><body>
  <div class="glow"></div>
  <div class="bars"><i></i><i></i><i></i></div>
  <h1>The AI commercial learning partner <em>built for biopharma</em>.</h1>
  <div class="foot"><div class="wordmark">Proxa<span>LABS</span></div><div class="url">www.proxalabs.com</div></div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.waitForTimeout(600); // fonts
await page.screenshot({ path: OUT, type: 'png' });
await browser.close();
console.log('wrote', OUT);
