import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';

const root = path.resolve(import.meta.dirname, '../site');
const shots = path.resolve(import.meta.dirname, '../review/html/chapter-overviews');
fs.mkdirSync(shots, { recursive: true });
const server = http.createServer((req, res) => {
  const file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
  if (path.relative(root, file).startsWith('..') || !fs.existsSync(file) || !fs.statSync(file).isFile()) return res.writeHead(404).end();
  res.setHeader('Content-Type', { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp' }[path.extname(file)] || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const errors = [];
let count = 0;
const visibleSteps = page => page.evaluate(() => [...document.querySelectorAll('.chapter > .step, .chapter > .chapter-intro')].filter(el => el.getClientRects().length).length);
try {
  for (const lang of ['ar', 'en']) for (const chapter of [1, 2, 3, 4, 5, 6, 7]) for (const width of [1440, 390]) for (const theme of ['dark', 'light']) {
    const context = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 900 }, reducedMotion: 'reduce' });
    await context.addInitScript(theme => localStorage.setItem('kos-guide-theme', theme), theme);
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    const url = `${base}/${lang}/c${chapter}.html`;
    const shoot = width === 1440 ? theme === 'dark' : theme === 'light';
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    const overview = page.locator('.chapter-overview');
    const summary = overview.locator('summary');
    const dialog = page.locator('.overview-dialog');
    assert.equal(await overview.getAttribute('open'), null);
    assert.ok(await visibleSteps(page) > 0, 'Chapter is readable while shorthand is off');

    // Turning shorthand on leaves only the diagram, the chapter title and the pager.
    await summary.focus();
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => document.documentElement.hasAttribute('data-overview-focus'));
    assert.equal(await visibleSteps(page), 0, 'Shorthand hides the chapter sections');
    assert.equal(await page.locator('.stepper').isVisible(), false);
    assert.ok(await page.locator('.chapter-pager').isVisible());
    assert.equal(await overview.locator('.overview-step').count(), 5);
    assert.equal(await overview.locator('.overview-example').count(), 4);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'No horizontal overflow');
    const thumb = await overview.locator('.overview-switch-thumb').evaluate(el => el.getBoundingClientRect().left);
    assert.ok(Number.isFinite(thumb));
    if (shoot) {
      await page.evaluate(() => document.fonts.ready);
      await overview.screenshot({ path: path.join(shots, `${lang}-c${chapter}-${width}-${theme}.png`) });
    }

    // Each explanation opens in a dialog, in place, with idea-to-idea navigation.
    const first = overview.locator('[data-overview-open]').first();
    const target = new URL(await first.getAttribute('href'), url);
    await first.click();
    await dialog.waitFor({ state: 'visible' });
    await page.waitForFunction(() => document.querySelector('.overview-dialog [data-ov-body] .step-body'));
    assert.equal(page.url(), url, 'Opening an explanation does not leave the page');
    assert.ok((await dialog.locator('[data-ov-title]').textContent()).trim().length > 0);
    assert.equal((await dialog.locator('[data-ov-count]').textContent()).trim(), '1 / 4');
    assert.ok(await dialog.locator('[data-ov-step="-1"]').isDisabled());
    const marked = dialog.locator('[data-ov-target]');
    if (await marked.count()) assert.ok(await marked.isVisible(), 'The linked table or figure is shown');
    assert.equal(await page.evaluate(() => [...document.querySelectorAll('.overview-dialog [marker-end]')].every(el => {
      const id = el.getAttribute('marker-end').match(/#([^)]+)/)[1];
      return document.querySelector('.overview-dialog').querySelector(`[id="${id}"]`);
    })), true, 'Diagram arrowheads point inside the dialog');
    assert.ok(await page.evaluate(() => {
      const d = document.querySelector('.overview-dialog').getBoundingClientRect();
      return d.left >= 0 && d.right <= innerWidth + 0.5 && d.bottom <= innerHeight + 0.5;
    }), 'Dialog fits the viewport');
    if (shoot) {
      await page.waitForFunction(() => { const box = document.querySelector(".overview-dialog [data-ov-body]").getBoundingClientRect(); return [...document.querySelectorAll(".overview-dialog [data-ov-body] img")].filter(img => img.getBoundingClientRect().top < box.bottom).every(img => img.complete && img.naturalWidth); });
      await page.evaluate(() => Promise.all([...document.querySelectorAll(".overview-dialog [data-ov-body] img")].map(img => img.decode().catch(() => {}))));
      await page.screenshot({ path: path.join(shots, `${lang}-c${chapter}-${width}-${theme}-dialog.png`) });
    }
    await dialog.locator('[data-ov-step="1"]').click();
    await page.waitForFunction(() => document.querySelector('[data-ov-count]').textContent.trim() === '2 / 4' && document.querySelector('.overview-dialog [data-ov-body] .step-body'));
    // A screenshot enlarges above the dialog; Escape closes it first, then the dialog.
    const zoom = dialog.locator('[data-zoom]').first();
    if (await zoom.count()) {
      await zoom.click();
      await page.locator('.lightbox:not([hidden])').waitFor();
      await page.keyboard.press('Escape');
      await page.locator('.lightbox').waitFor({ state: 'hidden' });
      assert.ok(await dialog.isVisible(), 'Escape on the enlarged picture keeps the dialog open');
    }
    await page.keyboard.press('Escape');
    await dialog.waitFor({ state: 'hidden' });
    assert.ok(await page.evaluate(() => document.documentElement.hasAttribute('data-overview-focus')));

    // The contents list opens hidden sections in the dialog while shorthand is on.
    if (width === 1440) {
      await page.locator('.toc-list a[href^="#"]').nth(1).click();
      await dialog.waitFor({ state: 'visible' });
      assert.ok(await dialog.locator('[data-ov-nav]').isHidden());
      await dialog.locator('[data-ov-close]').click();
      await dialog.waitFor({ state: 'hidden' });
    }

    // "Open it in the chapter" turns shorthand off and lands on the explanation.
    await first.click();
    await page.waitForFunction(() => document.querySelector('.overview-dialog [data-ov-body] .step-body'));
    await dialog.locator('[data-ov-full]').click();
    if (target.pathname === new URL(url).pathname) {
      await page.waitForFunction(() => !document.documentElement.hasAttribute('data-overview-focus'));
      assert.ok(await page.locator(`[id="${target.hash.slice(1)}"]`).isVisible());
      assert.ok(await page.locator('.stepper').isVisible());
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      assert.equal(await overview.getAttribute('open'), null, 'Reading the chapter switched shorthand off');
      await summary.click();
    } else {
      await page.waitForURL(target.href, { waitUntil: 'domcontentloaded' });
      assert.ok(await page.locator(`[id="${target.hash.slice(1)}"]`).isVisible());
      await page.goto(url, { waitUntil: 'domcontentloaded' });
    }
    await page.waitForFunction(() => document.querySelector('.chapter-overview').open);

    // Shared language state preserves the shorthand without marking any steps done.
    await page.locator('[data-lang-switch]').click();
    await page.waitForURL(new RegExp(`/${lang === 'ar' ? 'en' : 'ar'}/c${chapter}\\.html`), { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => document.querySelector('.chapter-overview').open);
    assert.equal(await page.locator('[data-done][aria-pressed="true"]').count(), 0);
    // "Show the full chapter" brings every section back, and so does a deep link.
    await page.locator('[data-overview-full]').click();
    await page.waitForFunction(() => !document.documentElement.hasAttribute('data-overview-focus'));
    assert.ok(await visibleSteps(page) > 0);
    await page.reload({ waitUntil: 'domcontentloaded' });
    assert.equal(await page.locator('.chapter-overview').getAttribute('open'), null);
    await page.locator('.chapter-overview > summary').click();
    await page.goto(`${url}?deep#c${chapter}-s1`, { waitUntil: 'domcontentloaded' });
    assert.equal(await overview.getAttribute('open'), null, 'A deep link shows the full chapter');
    assert.ok(await page.locator(`#c${chapter}-s1`).isVisible());
    // Opening this chapter must not open another chapter's overview.
    await page.locator('.chapter-overview > summary').click();
    await page.goto(`${base}/${lang}/c${chapter === 7 ? 1 : chapter + 1}.html`, { waitUntil: 'domcontentloaded' });
    assert.equal(await page.locator('.chapter-overview').getAttribute('open'), null);
    await context.close();
    count++;
    console.log(`Passed ${lang} chapter ${chapter}, ${width}px, ${theme}`);
  }
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${base}/en/c1.html`, { waitUntil: 'domcontentloaded' });
  await page.locator('.chapter-overview > summary').click();
  assert.ok(await page.locator('.overview-flow').isVisible(), 'Overview works without JavaScript');
  assert.ok(await visibleSteps(page) > 0, 'Without JavaScript the chapter stays readable');
  await context.close();
  assert.deepEqual(errors, []);
  console.log(`Passed ${count} combinations plus no-JavaScript fallback.`);
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
