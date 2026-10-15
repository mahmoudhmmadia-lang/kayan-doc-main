// Local preview of the HTML guide: builds site/, serves it, and rebuilds and
// reloads the browser when a chapter, translation, theme file or screenshot
// changes. Restart it after editing the renderer (tools/*.mjs).
//   cd tools && npm run dev      → http://localhost:4321/
// Set PORT to use another port.

import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildHtml } from './build-html.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = path.join(ROOT, 'site');
const PORT = Number(process.env.PORT) || 4321;
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json' };
const clients = new Set();

function build() {
  try {
    buildHtml(ROOT);
    console.log(`[${new Date().toLocaleTimeString()}] built`);
    for (const res of clients) res.write('data: reload\n\n');
  } catch (err) {
    console.error(`build failed: ${err.message}`);
  }
}

// Close the stream when leaving a page. Otherwise cached pages can retain the
// browser's per-origin connections and delay images after several navigations.
const RELOAD = '<script>(()=>{let stream;const connect=()=>{stream=new EventSource("/__reload");stream.onmessage=()=>location.reload()};connect();addEventListener("pagehide",()=>stream.close());addEventListener("pageshow",e=>{if(e.persisted)connect()})})()</script>';

http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  if (url === '/__reload') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
    clients.add(res); req.on('close', () => clients.delete(res));
    return;
  }
  let file = path.join(SITE, url);
  if (!file.startsWith(SITE)) { res.writeHead(403).end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) { res.writeHead(404).end('Not found'); return; }
  const ext = path.extname(file);
  let body = fs.readFileSync(file);
  if (ext === '.html') body = body.toString().replace('</body>', `${RELOAD}</body>`);
  res.writeHead(200, { 'Content-Type': TYPES[ext] ?? 'application/octet-stream', 'Cache-Control': 'no-store' }).end(body);
}).listen(PORT, () => console.log(`KayanOS guide → http://localhost:${PORT}/  (ar: /ar/, en: /en/)`));

let timer;
const watch = (dir) => fs.watch(path.join(ROOT, dir), { recursive: true }, (_e, f) => {
  if (f && !/\.(tex|css|js|svg|png)$/.test(f)) return;
  clearTimeout(timer); timer = setTimeout(build, 150);
});
['chapters', 'references', 'i18n', 'web', 'figures'].forEach((d) => { if (fs.existsSync(path.join(ROOT, d))) watch(d); });
fs.watch(ROOT, (_e, f) => { if (f === 'main.tex') { clearTimeout(timer); timer = setTimeout(build, 150); } });
build();
