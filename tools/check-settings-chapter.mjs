// Checks one group of the Settings chapter without building the site (safe to run in parallel):
//   node tools/check-settings-chapter.mjs access [--manifest review/ch08-manifest-access.json]
// - the Arabic and English sources parse and mirror each other block by block
// - every page has a Horizon example before its first figure, numbered steps and a check
// - every screenshot has a note, a numbered key matching its captured markers, and its file
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseBlocks } from './latex-parse.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const name = process.argv[2]
if (!name) { console.error('usage: node tools/check-settings-chapter.mjs <group> [--manifest file]'); process.exit(2) }
const at = process.argv.indexOf('--manifest')
const manifestFile = at > 0 ? process.argv[at + 1] : `review/ch08-manifest-${name}.json`
const manifest = fs.existsSync(path.join(root, manifestFile)) ? JSON.parse(fs.readFileSync(path.join(root, manifestFile), 'utf8')) : {}
const problems = []
const parse = (f) => parseBlocks(fs.readFileSync(path.join(root, f), 'utf8').replace(/(^|[^\\])%.*$/gm, '$1'))
const shape = (blocks) => blocks.filter((b) => b.type !== 'para').map((b) => `${b.type}${b.level ?? ''}${b.kind ?? ''}:${b.label ?? ''}:${b.rows?.length ?? ''}:${b.items?.length ?? ''}`)
const walk = (bs, out = []) => { bs.forEach((x) => { out.push(x); if (x.blocks) walk(x.blocks, out) }); return out }
const docs = {}
for (const [lang, f] of [['ar', `chapters/08-settings-${name}.tex`], ['en', `i18n/en/chapters/08-settings-${name}.tex`]]) {
  try { docs[lang] = parse(f) } catch (e) { problems.push(`${f}: cannot parse: ${e.message}`); docs[lang] = [] }
}
const a = shape(walk(docs.ar)), e = shape(walk(docs.en))
for (let i = 0; i < Math.max(a.length, e.length); i++) if (a[i] !== e[i]) { problems.push(`AR/EN structure differs at block ${i}: ar=${a[i]} en=${e[i]}`); break }

const circled = '①②③④⑤⑥⑦⑧⑨'
let pageCount = 0
for (const [lang, blocks] of Object.entries(docs)) {
  const example = lang === 'ar' ? 'مثال: شركة الأفق' : 'Example: Horizon'
  const check = lang === 'ar' ? 'تحقق:' : 'Check:'
  const secs = []
  for (const b of blocks) {
    if (b.type === 'heading' && b.level === 2) secs.push({ b, blocks: [] })
    else if (secs.length) secs.at(-1).blocks.push(b)
  }
  pageCount = secs.length
  for (const s of secs) {
    const where = `${lang} ${s.b.label}`
    if (!/^sec:settings-feature-/.test(s.b.label ?? '')) problems.push(`${where}: label must start sec:settings-feature-`)
    const flat = walk(s.blocks)
    const ex = flat.findIndex((x) => x.type === 'box' && (x.title ?? '').includes(example))
    const figs = flat.filter((x) => x.type === 'figure')
    const firstFig = flat.findIndex((x) => x.type === 'figure')
    if (ex < 0) problems.push(`${where}: no "${example}" callout`)
    if (firstFig >= 0 && ex > firstFig) problems.push(`${where}: example must come before the first figure`)
    if (!flat.some((x) => x.type === 'list' && x.kind === 'number')) problems.push(`${where}: needs numbered steps`)
    if (!JSON.stringify(s.blocks).includes(check)) problems.push(`${where}: needs a "${check}" paragraph`)
    if (!figs.length) problems.push(`${where}: needs a screenshot`)
    for (const f of figs) {
      if (!f.note) problems.push(`${where}: figure ${f.label} has no \shotnote`)
      if (f.tikz) {
        if (lang === 'en' && /[؀-ۿ]/.test(f.tikz)) problems.push(`${where}: Arabic text in an English diagram`)
        continue
      }
      if (!f.image) continue
      const src = path.basename(f.image, '.png')
      if (!fs.existsSync(path.join(root, 'figures/screens', `${src}.png`))) { problems.push(`${where}: missing image ${src}.png`); continue }
      if (!src.endsWith(`-${lang}`)) problems.push(`${where}: ${src} is not the ${lang} image`)
      const marks = manifest[src]?.marks
      if (!marks) { problems.push(`${where}: ${src} is not in ${manifestFile}`); continue }
      const note = JSON.stringify(f.note)
      if (marks.length < 2 || marks.length > 5) problems.push(`${where}: ${src} has ${marks.length} markers; keep 2–5`)
      for (let i = 0; i < marks.length; i++) if (!note.includes(circled[i])) problems.push(`${where}: note of ${src} has no ${circled[i]}`)
      if (note.includes(circled[marks.length])) problems.push(`${where}: note of ${src} has more numbers than markers`)
    }
  }
}
if (problems.length) { console.log(problems.map((p) => '✖ ' + p).join('\n')); process.exit(1) }
console.log(`✔ ${name}: ${pageCount} pages, AR/EN mirror, examples, steps, checks, images and numbered keys`)
