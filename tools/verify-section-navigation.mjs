import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';
const root = path.resolve(import.meta.dirname, '../site');
const shots = path.resolve(import.meta.dirname, '../review/html/section-navigation');
fs.mkdirSync(shots, {recursive:true});
const server = http.createServer((req,res)=>{
 const file = path.resolve(root, '.' + new URL(req.url,'http://localhost').pathname);
 if(!file.startsWith(root + path.sep) || !fs.existsSync(file)) return res.writeHead(404).end();
 res.setHeader('Content-Type', {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.png':'image/png'}[path.extname(file)] || 'application/octet-stream');
 fs.createReadStream(file).pipe(res);
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser = await chromium.launch({channel:'msedge',headless:true});
const errors=[];
try {
 for(const lang of ['en','ar']) for(const width of [1440,390]) for(const theme of ['dark','light']) {
  const context = await browser.newContext({viewport:{width,height:width===390?844:900},colorScheme:theme,reducedMotion:'reduce'});
  const page = await context.newPage();
  page.on('pageerror',e=>errors.push(e.message));
  const base=`http://127.0.0.1:${server.address().port}/${lang}/`;
  await page.goto(base+'c3.html');
  if(width===390) await page.locator('[data-open-toc]').click();
  const groups=page.locator('.toc-ch.current .toc-section');
  assert.equal(await groups.count(),6);
  await groups.nth(1).locator('summary').click();
  await groups.nth(1).locator('a').first().click();
  await page.waitForURL(/hr-members.html/);
  assert.equal(await page.locator('.toc-ch.current .toc-section[open] a[aria-current="page"]').count(),1);
  await page.locator('[data-done]').first().click();
  await page.reload();
  assert.equal(await page.locator('[data-done]').first().getAttribute('aria-pressed'),'true');
  await page.locator('[data-open-search]').click();
  await page.locator('.palette input').fill(lang==='en'?'payroll':'الرواتب');
  await page.locator('.palette-list a').first().waitFor();
  await page.keyboard.press('Escape');
  await page.locator('[data-lang-switch]').click();
  await page.waitForURL(new RegExp(`/${lang==='ar'?'en':'ar'}/hr-members.html`));
  await page.goto(base+'c5.html');
  // Every chapter page/step occurs exactly once in its section tree.
  const data=JSON.parse(await page.locator('#guide-data').textContent());
  const ids=await page.locator('.toc [data-toc]').evaluateAll(as=>as.map(a=>a.dataset.toc));
  assert.equal(new Set(ids).size,ids.length);
  assert.deepEqual([...ids].sort(), data.steps.map(s=>s.id).sort());
  assert.ok(ids.length>100);
  if(width===390) await page.locator('[data-open-toc]').click();
  const lastGroup=page.locator('.toc-ch.current .toc-section').last();
  await lastGroup.locator('summary').click();
  await lastGroup.locator('a').last().click();
  await page.waitForURL(/projects-.*html/);
  assert.equal(await page.locator('.toc-ch.current .toc-section[open] a[aria-current="page"]').count(),1);
  await page.goto(base+'b1.html');
  if(width===390) await page.locator('[data-open-toc]').click();
  await page.locator('.toc-ch.current .toc-section').last().locator('summary').click();
  await page.locator('.toc-ch.current .toc-section').last().locator('a').last().click();
  await page.waitForURL(/builder-.*html/);
  await page.goto(base+'hr-members.html');
  if(width===390) await page.locator('[data-open-toc]').click();
  await page.evaluate(()=>document.fonts.ready);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.screenshot({path:path.join(shots,`${lang}-${width}-${theme}.png`)});
  if(width===390) {
   await page.locator('[data-close-toc]').first().click();
   await page.screenshot({path:path.join(shots,`${lang}-${width}-${theme}-reader.png`)});
  }
  await context.close();
 }
 assert.deepEqual(errors,[]);
 console.log('Passed 8 browser combinations: section disclosure, page navigation, active ancestors, long chapters, Builder, progress, search, language switching, overflow.');
} finally {await browser.close(); await new Promise(r=>server.close(r));}
