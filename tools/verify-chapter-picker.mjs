import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';

const root = path.resolve(import.meta.dirname, '../..');
const shots = path.join(root, 'kayanos-guide/review/html/chapter-picker');
fs.mkdirSync(shots, { recursive: true });
const server = http.createServer((req, res) => {
  const file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) return res.writeHead(404).end();
  res.setHeader('Content-Type', { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png' }[path.extname(file)] || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const errors = [];
let checks = 0;
try {
  for (const [guide, lang, chapter] of [['industrial-observatory-guide', 'ar', 'c1'], ['kayanos-guide', 'ar', 'c1'], ['kayanos-guide', 'en', 'c1'], ['kayanos-guide', 'ar', 'b1']]) {
    for (const width of [1440, 390]) for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce', colorScheme: theme });
      const page = await context.newPage();
      page.on('pageerror', e => errors.push(e.message));
      const base = `http://127.0.0.1:${server.address().port}/${guide}/site/${lang}/`;
      await page.goto(base + chapter + '.html');
      await page.evaluate(() => document.fonts.ready);
      const picker = page.locator('.chapter-picker');
      const summary = picker.locator('summary');
      assert.equal(await picker.getAttribute('open'), null);
      await summary.focus();
      await page.keyboard.press('Enter');
      assert.notEqual(await picker.getAttribute('open'), null);
      assert.ok(await picker.locator('.ch-tab-t').evaluateAll(labels => labels.every(el => el.clientHeight > 0 && el.scrollWidth <= el.clientWidth + 1)));
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      await page.screenshot({ path: path.join(shots, `${guide}-${lang}-${chapter}-${width}-${theme}-open.png`) });
      await picker.locator('.ch-tab').nth(1).click();
      await page.waitForURL(base + (chapter === 'b1' ? 'b2' : 'c2') + '.html');
      assert.equal(await page.locator('.ch-tab[aria-current="page"]').count(), 1);
      const done = page.locator('[data-done]').first();
      await done.click();
      await page.reload();
      assert.equal(await page.locator('[data-done]').first().getAttribute('aria-pressed'), 'true');
      await page.locator('[data-open-search]').first().click();
      await page.locator('.palette input').fill(lang === 'en' ? 'organization' : 'العمل');
      await page.locator('.palette-list a').first().waitFor();
      await page.keyboard.press('Escape');
      await page.goto(base + chapter + '.html');
      await page.screenshot({ path: path.join(shots, `${guide}-${lang}-${chapter}-${width}-${theme}.png`) });
      await context.close();
      checks++;
    }
  }
  assert.deepEqual(errors, []);
  console.log(`Passed ${checks} reader combinations: keyboard picker, full titles, chapter navigation, progress persistence, search, overflow.`);
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
