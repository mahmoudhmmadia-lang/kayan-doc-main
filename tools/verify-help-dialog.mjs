import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';

const root = path.resolve(import.meta.dirname, '../..');
const shots = path.join(root, 'kayanos-guide/review/html/help-dialog');
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
  for (const [guide, lang, file] of [['industrial-observatory-guide', 'ar', 'c1'], ['kayanos-guide', 'ar', 'index'], ['kayanos-guide', 'en', 'c1'], ['kayanos-guide', 'ar', 'b1']]) {
    for (const width of [1440, 390]) for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({ viewport: { width, height: 844 }, reducedMotion: 'reduce', colorScheme: theme });
      const page = await context.newPage();
      page.on('pageerror', e => errors.push(e.message));
      const url = `http://127.0.0.1:${server.address().port}/${guide}/site/${lang}/${file}.html`;
      await page.goto(url);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('details.guide-help').count(), 0);
      await page.evaluate(() => scrollTo({ top: 500, behavior: 'instant' }));
      const scroll = await page.evaluate(() => scrollY);
      const button = page.locator('[data-open-help]');
      // Click the visible sticky navbar without locator auto-scrolling it.
      const box = await button.boundingBox();
      assert.ok(box.y >= 0 && box.y + box.height <= 844);
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      const dialog = page.locator('.help-dialog');
      assert.ok(await dialog.isVisible());
      assert.equal(page.url(), url);
      assert.equal(await dialog.locator('.help-card').count(), 3);
      assert.ok(await dialog.evaluate(el => el.scrollWidth <= el.clientWidth));
      await page.keyboard.press('Tab');
      assert.ok(await page.evaluate(() => document.activeElement.closest('.help-dialog') !== null));
      await page.screenshot({ path: path.join(shots, `${guide}-${lang}-${file}-${width}-${theme}.png`) });
      await page.keyboard.press('Escape');
      await page.waitForFunction(expected => window.scrollY === expected, scroll, { timeout: 2000 });
      assert.ok(await dialog.isHidden());
      assert.ok(await button.evaluate(el => el === document.activeElement));
      assert.equal(await page.evaluate(() => scrollY), scroll);
      await button.click();
      await dialog.locator('.help-dialog-foot button').click();
      assert.ok(await dialog.isHidden());
      await button.click();
      await page.mouse.click(2, 2);
      assert.ok(await dialog.isHidden());
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      assert.equal(await page.evaluate(() => scrollY), 0);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      await page.goto(url + '#guide-help');
      assert.ok(await dialog.isVisible());
      await page.keyboard.press('Escape');
      assert.equal(page.url(), url);
      await context.close();
      checks++;
    }
  }
  assert.deepEqual(errors, []);
  console.log(`Passed ${checks} help dialog combinations: no navigation, preserved scroll, focus containment/return, Escape, close button, backdrop, legacy links and mobile overflow.`);
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}

