import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';

const HERE = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Z]:)/, '$1');
const STATE = path.join(HERE, 'state.json'); // login session; never commit
const AGENTS = 'd:/stuff/right-code/taskflow/AGENTS.md';

export async function open({ lang = 'en', width = 1440, height = 900, scale = 1, theme = 'light' } = {}) {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const ctx = await browser.newContext({
    viewport: { width, height }, deviceScaleFactor: scale,
    storageState: fs.existsSync(STATE) ? STATE : undefined,
    locale: lang === 'ar' ? 'ar' : 'en-US', colorScheme: theme,
  });
  await ctx.addInitScript(l => { try { localStorage.setItem('language', l); localStorage.setItem('i18nextLng', l); } catch {} }, lang);
  const page = await ctx.newPage();
  await page.goto('https://test2.kayanos.app/', { waitUntil: 'domcontentloaded' });
  for (let i = 0; i < 40; i++) {
    await page.waitForTimeout(1500);
    if (await page.locator('input[type=email]').count()) break;
    if (!page.url().includes('login') && await page.locator('nav, aside, main a').count() > 3) break;
  }
  if (await page.locator('input[type=email]').count()) {
    const txt = fs.readFileSync(AGENTS, 'utf8');
    const email = txt.match(/Email: `([^`]+)`/)[1];
    const password = txt.match(/Password: `([^`]+)`/)[1];
    await page.locator('input[type=email]').fill(email);
    await page.locator('input[type=password]').fill(password);
    await page.locator('button[type=submit]').first().click();
    await page.waitForURL(u => !u.pathname.includes('login'), { timeout: 60000 });
    await page.waitForTimeout(3000);
    await ctx.storageState({ path: STATE });
  }
  return { browser, ctx, page };
}

export async function setLang(page, lang) {
  await page.evaluate(l => {
    for (const k of Object.keys(localStorage)) if (/lang|locale|i18n/i.test(k)) localStorage.setItem(k, typeof localStorage.getItem(k) === 'string' && localStorage.getItem(k).startsWith('"') ? JSON.stringify(l) : l);
  }, lang);
}

export async function dump(page) {
  return page.evaluate(() => {
    const t = s => [...document.querySelectorAll(s)].map(e => e.innerText.trim().replace(/\s+/g, ' ')).filter(Boolean);
    return {
      url: location.href, title: document.title, dir: document.documentElement.dir,
      headings: t('h1,h2,h3,h4'),
      buttons: [...new Set(t('button,[role=tab],[role=button]'))].slice(0, 120),
      links: [...new Set([...document.querySelectorAll('a[href]')].map(a => `${a.innerText.trim().replace(/\s+/g, ' ').slice(0, 60)} -> ${a.getAttribute('href')}`))].slice(0, 150),
      labels: [...new Set(t('label'))].slice(0, 120),
    };
  });
}

export const wait = (page, ms) => page.waitForTimeout(ms);

export async function settle(page, max = 90000) {
  const t0 = Date.now();
  let last = '';
  let stable = 0;
  while (Date.now() - t0 < max) {
    await page.waitForTimeout(2000);
    const txt = await page.evaluate(() => (document.querySelector('main') || document.body).innerText.length + ':' + document.querySelectorAll('[role=progressbar],.animate-spin,[aria-busy=true]').length);
    const [len, busy] = txt.split(':').map(Number);
    if (len > 80 && busy === 0 && txt === last) { if (++stable >= 2) return; } else stable = 0;
    last = txt;
  }
}

// Content is ready when the main area holds stable, real text.
export async function ready(page, max = 180000, minText = 150) {
  const t0 = Date.now(); let last = -1, stable = 0;
  while (Date.now() - t0 < max) {
    await page.waitForTimeout(2000);
    const n = await page.evaluate(() => { const m = document.querySelector('main'); return m ? m.innerText.length : 0; });
    if (n >= minText && n === last) { if (++stable >= 2) return true; } else stable = 0;
    last = n;
  }
  return false;
}

// In-app navigation keeps the loaded application shell (full reloads are slow on test2).
export async function go(page, url) {
  const cur = new URL(page.url());
  if (cur.hostname !== 'test2.kayanos.app' || !(await page.locator('main, header').count())) {
    await page.goto('https://test2.kayanos.app' + url, { waitUntil: 'domcontentloaded' });
  } else {
    await page.evaluate(u => { history.pushState({}, '', u); dispatchEvent(new PopStateEvent('popstate', { state: {} })); }, url);
  }
  return ready(page);
}
