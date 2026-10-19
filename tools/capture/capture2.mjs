// Captures Builder chapter screenshots from test2 at 1440px and 2x, sized to the page content,
// and records each capture in the guide's fullpage-manifest.json.
// Usage: node capture.mjs <ar|en> [name ...]
import fs from 'node:fs';
import { open, go, ready } from './lib.mjs';

const GUIDE = 'D:/stuff/right-code/taskflow/kayanos-guide';
const MANIFEST = `${GUIDE}/review/fullpage-manifest.json`;


// Draws numbered markers on the live page. Each mark finds the smallest visible element whose
// text (or aria-label/placeholder) matches `t` (a regex source matching EN|AR), or a CSS `sel`.
async function mark(page, marks) {
  return page.evaluate((marks) => {
    document.querySelectorAll('.guide-mark').forEach((n) => n.remove());
    const rtl = document.documentElement.dir === 'rtl';
    const visible = (e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 4 && r.height > 4 && cs.visibility !== 'hidden' && cs.display !== 'none' && r.top < innerHeight && r.bottom > 0; };
    const textOf = (e) => (e.getAttribute('aria-label') || e.getAttribute('placeholder') || e.innerText || e.value || '').trim().replace(/\s+/g, ' ');
    const out = [], missing = [];
    marks.forEach((m, i) => {
      let el = null;
      if (m.sel) el = [...document.querySelectorAll(m.sel)].filter(visible)[m.nth ?? 0] || null;
      if (!el && m.t) {
        const re = new RegExp(m.t);
        const cands = [...document.querySelectorAll('button,a,[role=button],[role=tab],input,textarea,h1,h2,h3,h4,label,th,li,p,span,strong,b,dt,div')]
          .filter(visible).filter((e) => re.test(textOf(e)) && textOf(e).length <= (m.max ?? 80));
        if (m.dom !== undefined) { const c = cands.filter((e) => !cands.some((o) => o !== e && e.contains(o)))[m.dom]; el = c ? (c.closest('button,a,[role=button],[role=tab]') || c) : null; } else {
        cands.sort((a, b) => a.getBoundingClientRect().width * a.getBoundingClientRect().height - b.getBoundingClientRect().width * b.getBoundingClientRect().height);
        // Prefer the interactive ancestor of the smallest match.
        el = cands[0] ? (cands[0].closest('button,a,[role=button],[role=tab]') || cands[0]) : null; }
      }
      if (!el) { missing.push(m.t || m.sel); return; }
      const r = el.getBoundingClientRect();
      const box = document.createElement('div');
      box.className = 'guide-mark';
      Object.assign(box.style, { position: 'fixed', left: `${r.left - 3}px`, top: `${r.top - 3}px`, width: `${r.width + 6}px`, height: `${r.height + 6}px`, border: '3px solid #12a368', borderRadius: '10px', zIndex: 2147483646, pointerEvents: 'none', boxSizing: 'border-box' });
      const n = document.createElement('div');
      n.className = 'guide-mark';
      n.textContent = String(i + 1);
      const x = rtl ? r.right - 14 : r.left - 14;
      Object.assign(n.style, { position: 'fixed', left: `${Math.max(2, Math.min(innerWidth - 32, x))}px`, top: `${Math.max(2, r.top - 16)}px`, width: '30px', height: '30px', borderRadius: '50%', background: '#12a368', color: '#fff', font: '700 17px/30px Arial, sans-serif', textAlign: 'center', border: '2px solid #fff', boxShadow: '0 2px 6px rgba(0,0,0,.35)', zIndex: 2147483647, pointerEvents: 'none' });
      document.body.append(box, n);
      out.push({ n: i + 1, label: textOf(el).slice(0, 60) });
    });
    return { marks: out, missing };
  }, marks);
}

const [, , shotsFile, lang = 'en', ...only] = process.argv;
const { SHOTS, THEME = 'light' } = await import(`./${shotsFile}`);
const list = only.length ? SHOTS.filter((s) => only.includes(s.name)) : SHOTS;
const { browser, page } = await open({ lang, scale: 2, theme: THEME });
await go(page, '/dashboards');
const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));

for (const shot of list) {
  try {
    await page.setViewportSize({ width: 1440, height: 900 });
    let ok; if (shot.reload) { await page.goto("https://test2.kayanos.app" + shot.url, { waitUntil: "domcontentloaded" }); ok = await ready(page); } else { ok = await go(page, shot.url); }
    await page.waitForTimeout(shot.wait ?? 3000);
    for (const n of ['Not Now', 'ليس الآن']) await page.getByRole('button', { name: n }).click({ timeout: 1000 }).catch(() => {});
    if (shot.search) {
      const box = page.locator('main input[type=text], main input[type=search], main input[placeholder]').first();
      await box.fill(typeof shot.search === 'string' ? shot.search : shot.search[lang]).catch(() => {});
      await page.waitForTimeout(2500);
    }
    for (const step of shot.prep ?? []) {
      const re = new RegExp(step.t);
      const target = page.locator(step.sel ?? 'button,[role=tab],[role=button],a,[role=menuitem],[role=option]').filter({ hasText: re }).nth(step.nth ?? 0);
      await target.click({ timeout: 8000 }).catch((e) => console.log('PREP FAIL', shot.name, step.t, e.message.slice(0, 80)));
      await page.waitForTimeout(step.wait ?? 2500);
    }
    if (shot.click) {
      await page.locator('[role=group] button').filter({ hasText: shot.click }).first().click({ timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(2000);
    }
    // Height of all content, including content inside internal scroll containers.
    const height = await page.evaluate(() => {
      let h = document.scrollingElement.scrollHeight;
      for (const el of document.querySelectorAll('*')) {
        const cs = getComputedStyle(el);
        if (/(auto|scroll)/.test(cs.overflowY) && el.scrollHeight > el.clientHeight + 4 && el.clientHeight > 200) {
          h = Math.max(h, innerHeight + (el.scrollHeight - el.clientHeight));
        }
      }
      return Math.min(Math.max(h, 600), 9000);
    });
    await page.setViewportSize({ width: 1440, height });
    await page.waitForTimeout(2500);
    const placed = await mark(page, (shot.marks ?? []).map((m) => ({ ...m, t: typeof m.t === 'object' ? m.t[lang] : m.t, dom: m.dom && typeof m.dom === 'object' ? m.dom[lang] : m.dom })));
    if (placed.missing.length) console.log('MARK MISSING', shot.name, lang, JSON.stringify(placed.missing));
    const dir = await page.evaluate(() => document.documentElement.dir);
    const file = `figures/screens/${shot.name}-${lang}.png`;
    await page.screenshot({ path: `${GUIDE}/${file}` });
    manifest[`${shot.name}-${lang}`] = {
      file: `kayanos-guide/${file}`, url: page.url(), lang, width: 1440, height, scale: 2,
      capturedAt: new Date().toISOString(),
      marks: placed.marks,
    };
    fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
    console.log('OK', shot.name, lang, dir, height, ok ? '' : '(content wait timed out)');
  } catch (e) {
    console.log('FAIL', shot.name, lang, e.message.split('\n')[0].slice(0, 120));
  }
}
await browser.close();
