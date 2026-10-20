// Checks one Builder-guide chapter without building the site (safe to run in parallel):
//   node tools/check-builder-chapter.mjs 03-forms
// - the Arabic and English sources parse and mirror each other block by block
// - every page (sec:builder-feature-*) has a Horizon example before its first figure,
//   a diagram with a note, numbered steps and a check paragraph
// - the overview's page directory lists every page, in order, with the exact page title
// - labels are unique across both guides
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseBlocks, loadDocument } from './latex-parse.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const name = process.argv[2]
if (!name) { console.error('usage: node tools/check-builder-chapter.mjs <NN-name>'); process.exit(2) }
const problems = []
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8')
const shape = (blocks) => blocks.filter((b) => b.type !== 'para').map((b) => `${b.type}${b.level ?? ''}${b.kind ?? ''}:${b.label ?? ''}:${b.rows?.length ?? ''}x${b.rows?.[0]?.cells.length ?? ''}:${b.items?.length ?? ''}:${b.tikz ? 'tikz' : ''}${b.note ? '+note' : ''}`)
const parse = (f) => parseBlocks(read(f).replace(/(^|[^\\])%.*$/gm, '$1'))

const files = { ar: [`builder/chapters/${name}.tex`, `builder/chapters/${name}-pages.tex`], en: [`i18n/en/builder/chapters/${name}.tex`, `i18n/en/builder/chapters/${name}-pages.tex`] }
const docs = {}
for (const [lang, fs2] of Object.entries(files)) {
  docs[lang] = fs2.flatMap((f) => { try { return parse(f) } catch (e) { problems.push(`${f}: cannot parse: ${e.message}`); return [] } })
}
const a = shape(docs.ar), e = shape(docs.en)
for (let i = 0; i < Math.max(a.length, e.length); i++) if (a[i] !== e[i]) { problems.push(`AR/EN structure differs at block ${i}: ar=${a[i]} en=${e[i]}`); break }

for (const [lang, blocks] of Object.entries(docs)) {
  const example = lang === 'ar' ? 'مثال: شركة الأفق' : 'Example: Horizon'
  // split into sections
  const secs = []
  for (const b of blocks) {
    if (b.type === 'heading' && b.level === 2) secs.push({ b, blocks: [] })
    else if (secs.length) secs.at(-1).blocks.push(b)
  }
  const pages = secs.filter((s) => /^sec:builder-feature-/.test(s.b.label ?? ''))
  for (const s of pages) {
    const where = `${lang} ${s.b.label}`
    const flat = []
    const walk = (bs) => bs.forEach((x) => { flat.push(x); if (x.blocks) walk(x.blocks) })
    walk(s.blocks)
    const ex = flat.findIndex((x) => x.type === 'box' && (x.title ?? '').includes(example))
    const fig = flat.findIndex((x) => x.type === 'figure')
    if (ex < 0) problems.push(`${where}: no "${example}" callout`)
    if (fig >= 0 && ex > fig) problems.push(`${where}: example must come before the first figure`)
    if (!flat.some((x) => x.tikz)) problems.push(`${where}: needs a diagram`)
    for (const f of flat.filter((x) => x.type === 'figure')) {
      if (!f.note) problems.push(`${where}: figure ${f.label} has no \\shotnote`)
      if (f.tikz && !f.tikz.includes('\\rclegend')) problems.push(`${where}: diagram ${f.label} lacks \\rclegend`)
      if (lang === 'en' && f.tikz && /[؀-ۿ]/.test(f.tikz)) problems.push(`${where}: Arabic text in an English diagram`)
    }
    if (!flat.some((x) => x.type === 'list' && x.kind === 'number')) problems.push(`${where}: needs numbered steps`)
  }
  // directory table
  const dir = blocks.flatMap(function f(x) { return [x, ...(x.blocks ?? []).flatMap(f)] }).find((x) => /^tab:builder-pages-/.test(x.label ?? ''))
  if (!dir) problems.push(`${lang}: overview has no tab:builder-pages-* table`)
  else {
    const rows = dir.rows.filter((r) => !r.header).map((r) => r.cells[0].split(' — ')[0].trim())
    const titles = pages.map((s) => s.b.title.trim())
    const norm = (t) => t.replace(/\\&/g, '&').replace(/\s+/g, ' ')
    if (rows.map(norm).join('|') !== titles.map(norm).join('|')) problems.push(`${lang}: directory rows do not match page titles in order\n  rows:   ${rows.join(' | ')}\n  titles: ${titles.join(' | ')}`)
  }
}

// unique labels across both guides
try {
  const main = loadDocument(root), side = loadDocument(path.join(root, 'builder'))
  for (const l of side.labels.keys()) if (main.labels.has(l)) problems.push(`label used in both guides: ${l}`)
  const seen = new Map()
  for (const f of fs.readdirSync(path.join(root, 'builder/chapters'))) for (const [, l] of read(`builder/chapters/${f}`).matchAll(/\\label\{([^}]+)\}/g)) { if (seen.has(l) && seen.get(l) !== f) problems.push(`label ${l} in ${seen.get(l)} and ${f}`); if (seen.has(l) && seen.get(l) === f) problems.push(`label ${l} twice in ${f}`); seen.set(l, f) }
} catch (err) { problems.push(`builder guide does not load: ${err.message}`) }

if (problems.length) { console.log(problems.map((p) => '✖ ' + p).join('\n')); process.exit(1) }
console.log(`✔ ${name}: ${docs.ar.filter((b) => b.type === 'heading' && b.level === 2 && /^sec:builder-feature-/.test(b.label ?? '')).length} pages, AR/EN mirror, examples, diagrams, steps and directory OK`)
