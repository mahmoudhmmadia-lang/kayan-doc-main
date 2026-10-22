import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import {chromium} from 'playwright-core';
const root=path.resolve(import.meta.dirname,'..');
const site=path.join(root,'site');
const server=http.createServer((req,res)=>{
 const file=path.resolve(site,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
 if(!file.startsWith(site+path.sep)||!fs.existsSync(file)){res.writeHead(404).end();return;}
 const type={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml'}[path.extname(file)];
 res.setHeader('Content-Type',type||'application/octet-stream');fs.createReadStream(file).pipe(res);
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({channel:'msedge',headless:true});
const evidence=[];const errors=[];
const screenshotsOnly=process.argv.includes('--screenshots-only');
try{
 for(const lang of ['ar','en'])for(const width of [1440,390])for(const theme of ['dark','light']){
  const ctx=await browser.newContext({viewport:{width,height:width===390?844:900},colorScheme:theme,reducedMotion:'reduce'});
  const page=await ctx.newPage();page.on('pageerror',e=>errors.push(e.message));
  for(const file of screenshotsOnly?[]:['c7','correspondence-home','correspondence-capacity','correspondence-tray']){
   await page.goto(`${base}/${lang}/${file}.html`);
   await page.evaluate(()=>document.fonts.ready);
   for(const img of await page.locator('main img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(e=>e.decode());}
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${lang} ${file} ${width} overflow`);
   assert.ok((await page.locator('main').innerText()).includes(lang==='ar'?'مثال: شركة الأفق':'Example: Horizon'));
   if(file==='c7'){
    assert.equal(await page.locator('.page-card').count(),3);
    await page.locator('.page-card').first().click();
    assert.ok(page.url().includes('correspondence-home.html'));
   }
   const done=page.locator('[data-done]').first();await done.click();
   assert.equal(await done.getAttribute('aria-pressed'),'true');
   await page.reload();assert.equal(await page.locator('[data-done]').first().getAttribute('aria-pressed'),'true');
   await page.locator('[data-done]').first().click();
   const shot=page.locator('[data-zoom]').first();
   if(await shot.count()){
    await shot.click();assert.ok(await page.locator('.lightbox').isVisible());
    await page.keyboard.press('Escape');assert.ok(!(await page.locator('.lightbox').isVisible()));
   }
   await page.locator('[data-lang-switch]').click();
   assert.ok(page.url().includes(`/${lang==='ar'?'en':'ar'}/`));
   await page.goBack();
   await page.locator('[data-open-search]').first().click();
   await page.locator('.palette input').fill(lang==='ar'?'الصفة والصلاحيات':'Capacity and permissions');
   await page.locator('.palette-list a[data-id="c7-s4"]').click();
   assert.ok(page.url().includes('correspondence-capacity.html'));
   evidence.push({lang,width,theme,file,passed:true});
   console.log('OK',lang,width,theme,file);
  }
  await page.goto(`${base}/${lang}/correspondence-tray.html`);
  await page.evaluate(()=>document.fonts.ready);
  await page.locator('figure.shot').first().scrollIntoViewIfNeeded();
  await page.locator('figure.shot img').evaluate(e=>e.decode());
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.waitForTimeout(300);
  await page.screenshot({path:path.join(root,`review/html/correspondence-${lang}-${width}-${theme}.png`)});
  await ctx.close();
 }
 assert.deepEqual(errors,[]);
 if(!screenshotsOnly)fs.writeFileSync(path.join(root,'review/correspondence-browser-verification.json'),JSON.stringify({checks:['32 page/language/width/theme cases','directory card opens feature','no horizontal overflow','images decode','completion persists after reload','language switching','search opens capacity page','image lightbox opens/closes'],evidence,errors},null,2));
 console.log('PASS',screenshotsOnly?'8 final screenshots, image decoding and overflow checks':`${evidence.length} page cases and guide interactions`);
}finally{await browser.close();server.close();}
