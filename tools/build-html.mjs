// Builds the HTML guide into site/:
//   site/index.html      → opens the reader's language (saved choice, then browser language)
//   site/ar/             → Arabic, from main.tex + chapters/ (the master sources)
//   site/en/             → English, from i18n/en/ (a translation with the same structure)
//     index.html = home (hero + chapter cards), c1.html … = one page per chapter
//   site/assets/         → theme (web/), logo and screenshots
// Needs only Node: no TeX engine.

import fs from 'node:fs';
import path from 'node:path';
import { loadDocument } from './latex-parse.mjs';
import { renderSite } from './html-render.mjs';

export const LANGS = { ar: '.', en: 'i18n/en' };

export function buildHtml(root) {
  const site = path.join(root, 'site');
  const assets = path.join(site, 'assets');
  fs.rmSync(site, { recursive: true, force: true });
  fs.mkdirSync(path.join(assets, 'screens'), { recursive: true });

  for (const f of ['guide.css', 'guide.js', 'kayanos-mark.svg', 'favicon.svg']) {
    fs.copyFileSync(path.join(root, 'web', f), path.join(assets, f));
  }
  const version = `?v=${Date.now().toString(36)}`;
  const used = new Set();
  const pages = [];
  for (const [lang, dir] of Object.entries(LANGS)) {
    const doc = loadDocument(path.join(root, dir), { lang });
    const walk = (bs) => bs.forEach((b) => { if (b.image) used.add(b.image); if (b.blocks) walk(b.blocks); });
    walk(doc.blocks);
    fs.mkdirSync(path.join(site, lang), { recursive: true });
    const files = renderSite(doc, { lang, assetsVersion: version });
    for (const [file, html] of Object.entries(files)) fs.writeFileSync(path.join(site, lang, file), html);
    pages.push(`site/${lang}/{${Object.keys(files).join(',')}}`);
  }
  // Screenshots are shared by both languages; paths are relative to the guide root.
  for (const img of used) {
    const src = path.join(root, img);
    if (!fs.existsSync(src)) throw new Error(`Missing screenshot: ${img}`);
    fs.copyFileSync(src, path.join(assets, 'screens', path.basename(img)));
  }
  fs.writeFileSync(path.join(site, 'index.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>KayanOS Guide</title><link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<style>html{background:#05070c;color:#e6edf3;font-family:system-ui,sans-serif}a{color:#2dd4bf}body{display:grid;place-items:center;min-height:100vh;margin:0;gap:12px}</style>
<script>
  var l = null;
  try { l = localStorage.getItem('kos-guide-lang'); } catch (e) {}
  if (l !== 'ar' && l !== 'en') l = /^ar\\b/i.test(navigator.language || '') ? 'ar' : 'en';
  location.replace(l + '/index.html' + location.hash);
</script></head>
<body><p><a href="ar/index.html" lang="ar" dir="rtl">الدليل بالعربية</a> · <a href="en/index.html">Guide in English</a></p></body></html>
`);
  return pages;
}
