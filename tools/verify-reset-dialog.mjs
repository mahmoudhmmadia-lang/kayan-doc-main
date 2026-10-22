import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';

const workspace = path.resolve(import.meta.dirname, '../..');
const review = path.join(workspace, 'kayanos-guide/review/reset-dialog');
fs.mkdirSync(review, { recursive: true });
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const file = path.resolve(workspace, '.' + decodeURIComponent(url.pathname));
  if (!file.startsWith(workspace + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404).end(); return; }
  const type = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png' }[path.extname(file)];
  res.setHeader('Content-Type', type || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const errors = [], results = [];
try {
  for (const [guide, lang, file] of [
    ['kayanos-guide', 'ar', 'index.html'], ['kayanos-guide', 'en', 'index.html'],
    ['kayanos-guide', 'ar', 'builder.html'], ['kayanos-guide', 'en', 'builder.html'],
    ['industrial-observatory-guide', 'ar', 'index.html'],
  ]) for (const width of [1440, 390]) for (const theme of ['dark', 'light']) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: theme, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    page.on('pageerror', e => errors.push(e.message));
    page.on('dialog', async dialog => { errors.push('Unexpected native dialog'); await dialog.dismiss(); });
    await page.goto(`${base}/${guide}/site/${lang}/${file}`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      const data = JSON.parse(document.querySelector('#guide-data').textContent);
      const first = data.steps[0].id;
      const last = data.steps.at(-1).id;
      localStorage.setItem(data.store, JSON.stringify({ done: { [first]: 1 }, checks: { example: 1 }, last }));
      for (const key of ['kos-guide-progress', 'kos-builder-progress', 'industrial-observatory-guide-progress']) {
        if (key !== data.store) localStorage.setItem(key, '{"untouched":true}');
      }
    });
    await page.reload({ waitUntil: 'domcontentloaded' });
    const snapshot = () => page.evaluate(() => {
      const data = JSON.parse(document.querySelector('#guide-data').textContent);
      return localStorage.getItem(data.store);
    });
    const before = await snapshot();
    const trigger = page.locator('[data-reset]').first();
    const dialog = page.locator('.reset-dialog');
    const cancel = dialog.locator('[value="cancel"]');
    const confirm = dialog.locator('[value="reset"]');
    await trigger.click();
    await dialog.waitFor({ state: 'visible' });
    assert.ok(await cancel.evaluate(el => el === document.activeElement));
    await page.keyboard.press('Tab');
    assert.ok(await confirm.evaluate(el => el === document.activeElement));
    await page.keyboard.press('Tab');
    assert.ok(await dialog.evaluate(el => el.contains(document.activeElement)));
    await cancel.click();
    await dialog.waitFor({ state: 'hidden' });
    assert.equal(await snapshot(), before);
    assert.ok(await trigger.evaluate(el => el === document.activeElement));
    await trigger.click();
    await page.keyboard.press('Escape');
    await dialog.waitFor({ state: 'hidden' });
    assert.equal(await snapshot(), before);
    await trigger.click();
    await page.mouse.click(4, 4);
    await dialog.waitFor({ state: 'hidden' });
    assert.equal(await snapshot(), before);
    await trigger.click();
    await page.keyboard.press('Control+k');
    assert.ok(await page.locator('.palette').isHidden());
    assert.ok(await dialog.evaluate(el => el.scrollWidth <= el.clientWidth));
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(review, `${guide}-${lang}-${file.replace('.html', '')}-${width}-${theme}.png`) });
    await confirm.click();
    await dialog.waitFor({ state: 'hidden' });
    assert.deepEqual(JSON.parse(await snapshot()), { done: {}, checks: {}, last: null });
    assert.ok(await page.evaluate(() => {
      const data = JSON.parse(document.querySelector('#guide-data').textContent);
      return ['kos-guide-progress', 'kos-builder-progress', 'industrial-observatory-guide-progress']
        .filter(key => key !== data.store).every(key => localStorage.getItem(key) === '{"untouched":true}');
    }));
    const resume = await page.locator('[data-continue]').getAttribute('href');
    assert.ok(resume.includes('-s1'), resume);
    await page.reload({ waitUntil: 'domcontentloaded' });
    assert.deepEqual(JSON.parse(await snapshot()), { done: {}, checks: {}, last: null });
    // Reopening after confirmation must never reuse the previous destructive result.
    await trigger.click();
    await page.keyboard.press('Escape');
    await dialog.waitFor({ state: 'hidden' });
    results.push({ guide, lang, file, width, theme });
    await ctx.close();
  }
  assert.deepEqual(errors, []);
  fs.writeFileSync(path.join(review, 'results.json'), JSON.stringify({ results, errors }, null, 2));
  console.log(`Passed ${results.length} reset-dialog browser scenarios.`);
} finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
