import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import test from 'node:test';
import JSZip from 'jszip';
import {loadDocument, parseBlocks, parseInline} from './latex-parse.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const doc=loadDocument(root);

test('explicit page breaks preserve Arabic paragraphs on both sides',()=>{
 const blocks=parseBlocks('قبل الفاصل\n\\clearpage\nبعد الفاصل\n\\newpage\nالنهاية');
 assert.deepEqual(blocks.map(b=>b.type),['para','pagebreak','para','pagebreak','para']);
 assert.equal(blocks[2].src,'بعد الفاصل');
});

test('Arabic text and Latin time ranges retain separate directions',()=>{
 const runs=parseInline('المدة \\en{07:30} بعد الاستراحة',{labels:doc.labels});
 assert.ok(runs.some(r=>r.text==='07:30' && r.latin));
 assert.ok(runs.some(r=>r.text.includes('المدة') && !r.latin));
});

test('all chapter references resolve and diagrams carry Arabic legends',()=>{
 const files=['main.tex',...fs.readdirSync(path.join(root,'chapters')).filter(f=>f.endsWith('.tex')).map(f=>`chapters/${f}`),'references/sources.tex'];
 const source=files.map(f=>fs.readFileSync(path.join(root,f),'utf8')).join('\n');
 for(const [,label] of source.matchAll(/\\ref\{([^}]+)\}/g)) assert.ok(doc.labels.has(label),`Missing ${label}`);
 const figures=doc.blocks.filter(b=>b.tikz);
 assert.equal(figures.length,(source.match(/\\begin\{tikzpicture\}/g)||[]).length);
 for(const figure of figures) { assert.ok(figure.tikz.includes('\\rclegend')); assert.ok(figure.caption); }
 assert.ok(doc.blocks.some(b=>b.type==='chapter' && b.label==='ch:hr'));
});

test('built Word contains HR, Arabic language metadata, diagrams and page breaks',async()=>{
 const zip=await JSZip.loadAsync(fs.readFileSync(path.join(root,'kayanos-guide.docx')));
 const xml=await zip.file('word/document.xml').async('string');
 const styles=await zip.file('word/styles.xml').async('string');
 assert.ok(styles.includes('w:bidi="ar-SA"'));
 for(const text of ['كيف تصل الوردية إلى الموظف؟','HZN-S-01','07:30']) assert.ok(xml.includes(text),`Missing ${text}`);
 assert.ok(xml.includes('<w:bidi'));
 assert.ok(xml.includes('<w:rtl'));
 assert.ok((xml.match(/<w:pageBreakBefore/g)||[]).length>=5);
 assert.equal((xml.match(/<wp:inline/g)||[]).length,doc.blocks.filter(b=>b.tikz||b.image).length);
 assert.ok(!xml.includes('??'));
});

test('PDF build has no missing Arabic glyphs, overflow or unresolved references',()=>{
 const log=fs.readFileSync(path.join(root,'build/main.log'),'utf8');
 assert.doesNotMatch(log,/Missing character:|Overfull \\[hv]box|undefined references|Reference .* undefined/);
 assert.ok(fs.statSync(path.join(root,'kayanos-guide.pdf')).size>100000);
});

// ---------------------------------------------------------------- HTML guide (site/)
const en=loadDocument(path.join(root,'i18n/en'),{lang:'en'});
const shape=(d)=>d.blocks.map(b=>b.type==='para'?'p':`${b.type}${b.level??''}${b.kind??''}:${b.label??''}:${b.rows?.length??''}x${b.rows?.[0]?.cells.length??''}:${b.items?.length??''}:${(b.image??'').replace(/-(ar|en).png$/,'.png')}${b.tikz?'tikz':''}`);

test('English HTML sources mirror the Arabic structure',()=>{
 const ar=shape(doc).filter(s=>s!=='p'), e=shape(en).filter(s=>s!=='p');
 assert.deepEqual(e,ar);
 assert.deepEqual([...en.labels.keys()].sort(),[...doc.labels.keys()].sort());
 for(const b of en.blocks.filter(b=>b.tikz)) assert.doesNotMatch(b.tikz,/[\u0600-\u06FF]/,'Arabic left in an English diagram');
});

test('screenshots use matching full-page captures in each interface language',()=>{
 const manifest=JSON.parse(fs.readFileSync(path.join(root,'review/fullpage-manifest.json'),'utf8'));
 for(const [lang,source] of [['ar',doc],['en',en]]) {
  for(const block of source.blocks.filter(b=>b.image)) {
   assert.ok(block.image.endsWith(`-${lang}.png`),`Wrong screenshot language: ${block.image}`);
   const name=path.basename(block.image,'.png'), capture=manifest[name];
   assert.ok(capture,`Missing capture evidence: ${name}`);
   assert.equal(new URL(capture.url).hostname,'test2.kayanos.app');
   assert.equal(capture.lang,lang);
   assert.equal(capture.scale,2);
   assert.equal(capture.width,1440);
   assert.ok(capture.height>=900);
   const png=fs.readFileSync(path.join(root,block.image));
   assert.equal(png.readUInt32BE(16),capture.width*2);
   assert.equal(png.readUInt32BE(20),capture.height*2);
  }
  const tabs=source.blocks.filter(b=>/ch03-member-tab\d+-/.test(b.image??'')).map(b=>manifest[path.basename(b.image,'.png')]);
  assert.equal(tabs.length,15);
  assert.equal(new Set(tabs.map(v=>new URL(v.url).searchParams.get('tab'))).size,15,'Member tabs must show distinct content');
 }
});

test('built HTML site: chapter and feature pages, language, direction and working links',()=>{
 for(const [lang,dir] of [['ar','rtl'],['en','ltr']]){
  const folder=path.join(root,'site',lang);
  const pages=Object.fromEntries(fs.readdirSync(folder).filter(f=>f.endsWith('.html')).map(f=>[f,fs.readFileSync(path.join(folder,f),'utf8')]));
  const sourceDoc=lang==='ar'?doc:en;
  const featureFiles=sourceDoc.blocks.filter(b=>b.label?.startsWith('sec:hr-feature-')).map(b=>`hr-${b.label.slice('sec:hr-feature-'.length)}.html`);
  assert.equal(featureFiles.length,21);
  assert.deepEqual(Object.keys(pages).sort(),['c1.html','c2.html','c3.html','index.html',...featureFiles].sort());
  const ids=Object.fromEntries(Object.entries(pages).map(([f,h])=>[f,new Set([...h.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]))]));
  let diagrams=0;
  for(const [file,html] of Object.entries(pages)){
   const where=`${lang}/${file}`;
   assert.match(html,new RegExp(`<html lang="${lang}" dir="${dir}"`));
   for(const [,href] of html.matchAll(/href="([^"]*)"/g)){
    if(/^https?:/.test(href)) continue;
    if(href.startsWith('../')) { assert.ok(fs.existsSync(path.join(folder,href.split(/[?#]/)[0])),`${where}: missing ${href}`); continue; }
    const [target,hash]=href.split('#');
    const page=target||file;
    assert.ok(pages[page],`${where}: link to missing page ${href}`);
    if(hash) assert.ok(ids[page].has(hash),`${where}: broken link ${href}`);
   }
   for(const [,src] of html.matchAll(/src="(\.\.\/[^"?]+)/g)) assert.ok(fs.existsSync(path.join(folder,src)),`${where}: missing ${src}`);
   assert.doesNotMatch(html,/<a\b(?:(?!<\/a>)[\s\S])*<a\b/,`${where}: a link nested inside a link`);
   assert.ok(!html.includes('>??<'),`${where}: unresolved reference`);
   diagrams+=(html.match(/<svg class="diagram"/g)||[]).length;
  }
  assert.equal(diagrams,sourceDoc.blocks.filter(b=>b.tikz).length);
 }
});

test('dedicated HR pages preserve bilingual coverage, routes, media and overview links',()=>{
 const hrShape=d=>shape({...d,blocks:d.blocks.slice(d.blocks.findIndex(b=>b.label==='sec:hr-feature-members')-1)});
 assert.deepEqual(hrShape(doc),hrShape(en));
 for(const lang of ['ar','en']) {
  const folder=path.join(root,'site',lang);
  const overview=fs.readFileSync(path.join(folder,'c3.html'),'utf8');
  const data=JSON.parse(overview.match(/<script id="guide-data" type="application\/json">([\s\S]*?)<\/script>/)[1]);
  const features=data.steps.filter(s=>s.p.startsWith('hr-'));
  assert.equal(features.length,21);
  for(const feature of features) {
   const html=fs.readFileSync(path.join(folder,feature.p),'utf8');
   assert.match(overview,new RegExp(`href="${feature.p}#${feature.id}"`));
   assert.equal(data.routes[feature.id],feature.p);
   assert.ok(data.search.some(s=>s.id===feature.id&&s.p===feature.p&&s.x.length>100));
   assert.ok(html.includes(`data-done="${feature.id}"`));
   assert.ok(html.includes(`../${lang==='ar'?'en':'ar'}/${feature.p}`));
   assert.equal((html.match(/class="step reveal-step"/g)||[]).length,1);
   assert.match(html,/<figure class="shot/);
   assert.match(html,/<svg class="diagram"/);
   assert.match(html,/class="steps"/);
  }
  // The overview keeps its two steps; old walkthrough anchors redirect to the page that now holds them.
  for(let n=1;n<=2;n++) assert.ok(overview.includes(`id="c3-s${n}"`));
  for(let n=3;n<=11;n++) {
   const target=data.legacy[`c3.html#c3-s${n}`];
   assert.ok(target,`No redirect for c3-s${n}`);
   const [page,hash]=target.split('#');
   assert.ok(fs.readFileSync(path.join(folder,page),'utf8').includes(`id="${hash}"`),`Broken redirect ${target}`);
  }
  // The overview offers every page as a button, a start button and no walkthrough steps.
  assert.equal((overview.match(/class="page-card"/g)||[]).length,21);
  assert.match(overview,/class="pager-card start"/);
  assert.equal((overview.match(/class="step reveal-step"/g)||[]).length,2);
 }
});
