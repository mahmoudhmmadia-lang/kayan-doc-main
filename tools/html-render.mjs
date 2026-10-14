// Renders the parsed guide (latex-parse.mjs) as a small HTML site per
// language, in the KayanOS website theme (web/guide.css, web/guide.js):
// index.html (home: hero + chapter cards) and one page per chapter (c1.html …).
// Every chapter section becomes a "step" with a stable, language-independent
// id (c2-s3) on page c2.html, so links, progress and the language switch keep your place.

import { arrowKinds, renderDiagram } from './html-diagram.mjs'
import { parseInline } from './latex-parse.mjs'

export const UI = {
    ar: {
        dir: 'rtl',
        other: 'en',
        otherName: 'English',
        otherShort: 'EN',
        brand: 'دليل KayanOS',
        contents: 'المحتويات',
        search: 'ابحث في الدليل…',
        searchShort: 'بحث',
        start: 'ابدأ الدليل',
        continue: 'تابع من حيث توقفت',
        paths: 'اختر الفصل',
        chapters: 'فصول',
        steps: 'خطوة',
        minutes: 'دقيقة قراءة',
        progress: 'تقدّمك',
        done: 'أنهيت هذه الخطوة',
        markDone: 'تحديد كمنجزة',
        copyLink: 'نسخ رابط الخطوة',
        copied: 'نُسخ الرابط',
        prev: 'السابق',
        next: 'التالي',
        nextChapter: 'الفصل التالي',
        prevChapter: 'الفصل السابق',
        table: 'جدول',
        figure: 'شكل',
        theme: 'تبديل المظهر',
        lang: 'English',
        top: 'إلى الأعلى',
        noResults: 'لا نتائج. جرّب كلمة أخرى.',
        navHint: 'للتنقل',
        openHint: 'للفتح',
        closeHint: 'للإغلاق',
        reset: 'إعادة ضبط التقدّم',
        resetConfirm: 'هل تريد مسح تقدّمك في هذا الدليل؟',
        legend: { dependsOn: 'يحتاج أولاً (إلزامي)', dependsOnOpt: 'ربط اختياري', flowsTo: 'الخطوة التالية' },
        badges: { req: 'إلزامي تقنياً', rec: 'موصى به', opt: 'اختياري', gen: 'يولّده النظام' },
        boxes: { note: 'ملاحظة', warn: 'تنبيه', check: 'قائمة تحقق' },
        zoom: 'تكبير الصورة',
        close: 'إغلاق',
        menu: 'القائمة',
        of: 'من',
        stepLabel: 'الخطوة',
        chapterDone: 'أكملت هذا الفصل',
        print: 'طباعة',
        home: 'الدليل',
        moreSteps: 'خطوات أخرى',
        chapterNav: 'فصول الدليل',
        open: 'افتح الفصل',
    },
    en: {
        dir: 'ltr',
        other: 'ar',
        otherName: 'العربية',
        otherShort: 'ع',
        brand: 'KayanOS Guide',
        contents: 'Contents',
        search: 'Search the guide…',
        searchShort: 'Search',
        start: 'Start the guide',
        continue: 'Continue where you left off',
        paths: 'Pick a chapter',
        chapters: 'chapters',
        steps: 'steps',
        minutes: 'min read',
        progress: 'Your progress',
        done: 'Step completed',
        markDone: 'Mark as done',
        copyLink: 'Copy link to this step',
        copied: 'Link copied',
        prev: 'Previous',
        next: 'Next',
        nextChapter: 'Next chapter',
        prevChapter: 'Previous chapter',
        table: 'Table',
        figure: 'Figure',
        theme: 'Toggle theme',
        lang: 'العربية',
        top: 'Back to top',
        noResults: 'No results. Try another word.',
        navHint: 'to navigate',
        openHint: 'to open',
        closeHint: 'to close',
        reset: 'Reset progress',
        resetConfirm: 'Clear your progress in this guide?',
        legend: { dependsOn: 'Needs this first (required)', dependsOnOpt: 'Optional link', flowsTo: 'Next step' },
        badges: { req: 'Required', rec: 'Recommended', opt: 'Optional', gen: 'System-generated' },
        boxes: { note: 'Note', warn: 'Caution', check: 'Checklist' },
        zoom: 'Enlarge image',
        close: 'Close',
        menu: 'Menu',
        of: 'of',
        stepLabel: 'Step',
        chapterDone: 'You completed this chapter',
        print: 'Print',
        home: 'Guide',
        moreSteps: 'more steps',
        chapterNav: 'Guide chapters',
        open: 'Open chapter',
    },
}

const esc = (s) =>
    String(s ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')

const ICONS = {
    note: '<path d="M12 8h.01M11 12h1v4h1"/><circle cx="12" cy="12" r="9"/>',
    warn: '<path d="M12 9v4m0 4h.01"/><path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>',
    check: '<path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
    tick: '<path d="M20 6 9 17l-5-5"/>',
    zoom: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3M11 8v6M8 11h6"/>',
}
const icon = (name, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`

// ---------------------------------------------------------------- structure

// Groups the flat block list into chapters → sections, assigns stable ids and
// a label → id map for \ref links.
export function structure(doc) {
    const chapters = []
    let appendix = false
    let ch = null,
        sec = null,
        sub = 0
    const ids = new Map()
    for (const b of doc.blocks) {
        if (b.type === 'appendix') {
            appendix = true
            continue
        }
        if (b.type === 'chapter') {
            ch = { ...b, appendix, id: `c${chapters.length + 1}`, intro: [], sections: [], tables: 0, figures: 0 }
            chapters.push(ch)
            sec = null
            sub = 0
            if (b.label) ids.set(b.label, ch.id)
            continue
        }
        if (!ch) continue
        if (b.type === 'heading' && b.level === 2) {
            sec = { ...b, id: `${ch.id}-s${ch.sections.length + 1}`, blocks: [] }
            ch.sections.push(sec)
            sub = 0
            if (b.label) ids.set(b.label, sec.id)
            continue
        }
        const target = sec ? sec.blocks : ch.intro
        if (b.type === 'heading') {
            b.id = `${sec ? sec.id : ch.id}-${++sub}`
            if (b.label) ids.set(b.label, b.id)
        }
        if (b.type === 'pagebreak') continue
        target.push(b)
    }
    // Number-carrying floats get ids too (c1-t2, c1-f1).
    for (const c of chapters) {
        const all = [...c.intro, ...c.sections.flatMap((s) => s.blocks)]
        const walk = (bs) =>
            bs.forEach((b) => {
                if (b.type === 'table' && b.caption) {
                    b.id = `${c.id}-t${++c.tables}`
                    if (b.label) ids.set(b.label, b.id)
                }
                if (b.type === 'figure' && b.caption) {
                    b.id = `${c.id}-f${++c.figures}`
                    if (b.label) ids.set(b.label, b.id)
                }
                if (b.blocks) walk(b.blocks)
            })
        walk(all)
    }
    return { chapters, ids }
}

// ---------------------------------------------------------------- links

// Every id starts with its chapter id (c2, c2-s4, c2-t1), which names its page.
export const pageOf = (id) => `${id.split('-')[0]}.html`
const link = (id, page) => {
    const target = pageOf(id)
    if (target === page) return `#${id}`
    return id.includes('-') ? `${target}#${id}` : target
}

// ---------------------------------------------------------------- inline

function inline(src, ctx) {
    const runs = parseInline(src, ctx)
    return runs
        .map((r) => {
            if (r.br) return '<br>'
            if (r.badge) return `<span class="badge badge-${r.badge.key}">${esc(ctx.ui.badges[r.badge.key])}</span>`
            let t = esc(r.text)
            if (r.symbol) return `<span class="dep" aria-hidden="true">${ctx.lang === 'ar' ? '←' : '→'}</span>`
            if (r.ref) {
                const id = ctx.ids.get(r.ref)
                if (!id || ctx.nolink) return `<span dir="ltr">${t}</span>` // nolink: titles inside navigation links
                return `<a class="xref" href="${link(id, ctx.page)}" dir="ltr">${t}</a>`
            }
            if (r.mono) t = `<code>${t}</code>`
            else if (r.color === '00696D') t = `<code class="key">${t}</code>`
            else if (r.latin && ctx.lang === 'ar') t = `<span dir="ltr">${t}</span>`
            if (r.bold) t = `<strong>${t}</strong>`
            return t
        })
        .join('')
}

const plain = (src, ctx) =>
    inline(src, ctx)
        .replace(/<[^>]+>/g, '')
        .replace(/\s+/g, ' ')
        .trim()

// ---------------------------------------------------------------- blocks

let diagramSeq = 0

function renderList(b, ctx) {
    if (b.kind === 'number') {
        return `<ol class="steps">${b.items.map((it, i) => `<li class="reveal" style="--d:${i}"><span class="steps-no">${i + 1}</span><div class="steps-body">${inline(it, ctx)}</div></li>`).join('')}</ol>`
    }
    if (b.kind === 'check') {
        return `<ul class="checks">${b.items
            .map((it, i) => {
                const key = `${ctx.sectionId}-k${i + 1}`
                return `<li><label class="check"><input type="checkbox" data-check="${key}"><span class="check-box">${icon('tick')}</span><span class="check-text">${inline(it, ctx)}</span></label></li>`
            })
            .join('')}</ul>`
    }
    return `<ul class="bullets">${b.items.map((it) => `<li>${inline(it, ctx)}</li>`).join('')}</ul>`
}

function renderTable(b, ctx) {
    const head = b.rows.find((r) => r.header) ?? null
    const body = b.rows.filter((r) => !r.header)
    const labels = head ? head.cells.map((c) => plain(c, ctx)) : []
    const caption = b.caption
        ? `<figcaption><span class="cap-no">${ctx.ui.table} ${esc(b.number)}</span>${inline(b.caption, ctx)}</figcaption>`
        : ''
    const thead = head
        ? `<thead><tr>${head.cells.map((c) => `<th scope="col">${inline(c, ctx)}</th>`).join('')}</tr></thead>`
        : ''
    const tbody = `<tbody>${body.map((r) => `<tr>${r.cells.map((c, i) => `<td data-label="${esc(labels[i] ?? '')}">${inline(c, ctx)}</td>`).join('')}</tr>`).join('')}</tbody>`
    const cls = labels.length >= 2 && labels.length <= 3 ? 'stackable' : ''
    return `<figure class="table-card reveal"${b.id ? ` id="${b.id}"` : ''}>${caption}<div class="table-scroll"><table class="${cls}">${thead}${tbody}</table></div></figure>`
}

function renderFigure(b, ctx) {
    const cap = b.caption
        ? `<figcaption><span class="cap-no">${ctx.ui.figure} ${esc(b.number)}</span>${inline(b.caption, ctx)}</figcaption>`
        : ''
    const id = b.id ? ` id="${b.id}"` : ''
    if (b.image) {
        const file = b.image.split('/').pop()
        const alt = b.caption ? plain(b.caption, ctx) : ''
        return `<figure class="shot reveal"${id}><button class="shot-btn" type="button" data-zoom aria-label="${esc(ctx.ui.zoom)}"><img src="../assets/screens/${esc(file)}" alt="${esc(alt)}" loading="lazy" decoding="async" style="--w:${Math.round((b.imageWidth ?? 1) * 100)}%"><span class="shot-zoom">${icon('zoom')}</span></button>${cap}</figure>`
    }
    if (b.tikz) {
        const svg = renderDiagram(b.tikz, { dir: ctx.ui.dir, id: `dg${++diagramSeq}` })
        const kinds = /\\rclegend/.test(b.tikz) ? arrowKinds(b.tikz) : []
        const legend = kinds.length
            ? `<ul class="legend">${kinds.map((k) => `<li><svg viewBox="0 0 36 10" aria-hidden="true"><line class="dg-edge dg-${k} static" x1="2" y1="5" x2="30" y2="5"/><path class="dg-head dg-head-${k}" d="${k === 'flowsTo' ? 'M27 1 L34 5 L27 9' : 'M27 1 L34 5 L27 9 Z'}"/></svg>${esc(ctx.ui.legend[k])}</li>`).join('')}</ul>`
            : ''
        return `<figure class="diagram-card reveal"${id}><div class="diagram-wrap">${svg}</div>${legend}${cap}</figure>`
    }
    return ''
}

function renderBlock(b, ctx) {
    switch (b.type) {
        case 'para':
            return `<p>${inline(b.src, ctx)}</p>`
        case 'heading':
            return `<h3 id="${b.id}" class="sub">${inline(b.title, ctx)}</h3>`
        case 'list':
            return renderList(b, ctx)
        case 'table':
            return renderTable(b, ctx)
        case 'figure':
            return renderFigure(b, ctx)
        case 'box': {
            const title = b.title ? inline(b.title, ctx) : esc(ctx.ui.boxes[b.kind])
            return `<aside class="callout callout-${b.kind} reveal"><div class="callout-head">${icon(b.kind)}<span>${title}</span></div><div class="callout-body">${b.blocks.map((x) => renderBlock(x, ctx)).join('')}</div></aside>`
        }
        default:
            return ''
    }
}

// ---------------------------------------------------------------- pages

const words = (html) =>
    html
        .replace(/<[^>]+>/g, ' ')
        .split(/\s+/)
        .filter(Boolean).length
const ARROW = '<svg class="ic flip" viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>'
const ring = (id) =>
    `<span class="toc-ring" data-ring="${id}" aria-hidden="true"><svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="8"/><circle class="ring-val" cx="10" cy="10" r="8" pathLength="100"/></svg></span>`

// Head, top bar, search palette, lightbox and data shared by every page.
function shell({ ui, lang, page, title, description, body, data, assetsVersion }) {
    return `<!doctype html>
<html lang="${lang}" dir="${ui.dir}" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="color-scheme" content="dark light">
<link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
<link rel="alternate" hreflang="${ui.other}" href="../${ui.other}/${page}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&family=Cairo:wght@400;500;700;800&display=swap">
<script>try{var t=localStorage.getItem('kos-guide-theme');if(!t)t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.dataset.theme=t;localStorage.setItem('kos-guide-lang','${lang}')}catch(e){}</script>
<link rel="stylesheet" href="../assets/guide.css${assetsVersion}">
</head>
<body class="${page === 'index.html' ? 'page-home' : 'page-chapter'}">
<a class="skip" href="#main">${esc(ui.start)}</a>
<div class="read-progress" aria-hidden="true"><span></span></div>
<header class="topbar">
  <div class="topbar-in">
    ${page === 'index.html' ? '' : `<button class="icon-btn menu-btn" type="button" data-open-toc aria-label="${esc(ui.menu)}"><svg class="ic" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h10"/></svg></button>`}
    <a class="brand" href="index.html" aria-label="${esc(ui.brand)}"><img src="../assets/kayanos-mark.svg" alt="" width="34" height="23"><span class="brand-name">Kayan<b>OS</b></span><span class="brand-sep"></span><span class="brand-sub">${esc(ui.brand)}</span></a>
    <button class="search-btn" type="button" data-open-search><svg class="ic" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg><span>${esc(ui.search)}</span><kbd dir="ltr">Ctrl K</kbd></button>
    <a class="lang-btn" href="../${ui.other}/${page}" data-lang-switch="${ui.other}" hreflang="${ui.other}" lang="${ui.other}">${esc(ui.otherName)}</a>
    <button class="icon-btn theme-btn" type="button" data-theme-toggle aria-label="${esc(ui.theme)}" title="${esc(ui.theme)}"><svg class="ic sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg><svg class="ic moon" viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg></button>
  </div>
</header>
${body}
<div class="palette" role="dialog" aria-modal="true" aria-label="${esc(ui.searchShort)}" hidden>
  <div class="palette-box">
    <div class="palette-input"><svg class="ic" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg><input type="search" placeholder="${esc(ui.search)}" autocomplete="off" spellcheck="false" aria-label="${esc(ui.search)}"><kbd>Esc</kbd></div>
    <ul class="palette-list" role="listbox"></ul>
    <div class="palette-foot"><span><kbd>↑</kbd><kbd>↓</kbd> ${esc(ui.navHint)}</span><span><kbd>Enter</kbd> ${esc(ui.openHint)}</span><span><kbd>Esc</kbd> ${esc(ui.closeHint)}</span></div>
  </div>
</div>
<div class="lightbox" hidden><button class="icon-btn lightbox-close" type="button" aria-label="${esc(ui.close)}"><svg class="ic" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button><img alt=""></div>
<div class="toast" role="status" aria-live="polite"></div>
<script id="guide-data" type="application/json">${JSON.stringify({ ...data, page }).replace(/</g, '\\u003c')}</script>
<script src="../assets/guide.js${assetsVersion}" defer></script>
</body>
</html>
`
}

// Returns { 'index.html': html, 'c1.html': html, … } for one language.
export function renderSite(doc, { lang, assetsVersion = '' }) {
    const ui = UI[lang]
    const { chapters, ids } = structure(doc)
    const base = { ui, lang, ids, labels: doc.labels, colors: { rcPrimary: '00696D' } }
    diagramSeq = 0

    // Render every chapter body first: it gives the step list, search index and word count.
    let totalWords = 0
    const steps = []
    const search = []
    const bodies = chapters.map((c) => {
        const page = pageOf(c.id)
        const intro = c.intro.map((b) => renderBlock(b, { ...base, page, sectionId: c.id })).join('')
        search.push({ id: c.id, p: page, c: '', t: plain(c.title, base), n: c.kicker, x: '', chapter: true })
        const sections = c.sections
            .map((s) => {
                const ctx = { ...base, page, sectionId: s.id }
                const body = s.blocks.map((b) => renderBlock(b, ctx)).join('')
                totalWords += words(body)
                steps.push({ id: s.id, p: page, c: c.id, t: plain(s.title, ctx), n: s.number ?? '' })
                search.push({
                    id: s.id,
                    p: page,
                    c: plain(c.title, base),
                    t: plain(s.title, ctx),
                    n: s.number ?? '',
                    x: body
                        .replace(/<svg[\s\S]*?<\/svg>/g, ' ')
                        .replace(/<[^>]+>/g, ' ')
                        .replace(/\s+/g, ' ')
                        .trim()
                        .slice(0, 1600),
                })
                for (const b of s.blocks)
                    if (b.type === 'heading')
                        search.push({
                            id: b.id,
                            p: page,
                            c: plain(c.title, base),
                            t: plain(b.title, ctx),
                            n: b.number ?? '',
                            x: '',
                            sub: true,
                        })
                return `<section class="step reveal-step" id="${s.id}" data-chapter="${c.id}" aria-labelledby="${s.id}-h">
<header class="step-head">
  <span class="step-no" dir="ltr">${esc(s.number ?? '')}</span>
  <h2 id="${s.id}-h">${inline(s.title, ctx)}</h2>
  <div class="step-tools">
    <button class="icon-btn copy-link" type="button" data-copy="${s.id}" title="${esc(ui.copyLink)}" aria-label="${esc(ui.copyLink)}">${icon('link')}</button>
  </div>
</header>
<div class="step-body">${body}</div>
<footer class="step-foot"><button class="done-btn" type="button" data-done="${s.id}" aria-pressed="false"><span class="done-box">${icon('tick')}</span><span class="done-off">${esc(ui.markDone)}</span><span class="done-on">${esc(ui.done)}</span></button></footer>
</section>`
            })
            .join('\n')
        return { intro, sections }
    })

    const data = {
        lang,
        ui: { copied: ui.copied, noResults: ui.noResults, resetConfirm: ui.resetConfirm, chapterDone: ui.chapterDone },
        chapters: chapters.map((c) => ({ id: c.id, p: pageOf(c.id) })),
        steps,
        search,
    }
    const title = plain(doc.coverArgs?.[1] ?? ui.brand, base)
    const description = plain(doc.coverArgs?.[2] ?? '', base)
    const pages = {}

    // ---- home
    const [kicker, coverTitle, subtitle, date, version, org] = (doc.coverArgs ?? []).map((a) => inline(a, base))
    const minutes = Math.max(1, Math.round(totalWords / 180))
    const cards = chapters
        .map((c, i) => {
            const page = pageOf(c.id)
            const shown = c.sections.slice(0, 4)
            const more = c.sections.length - shown.length
            return `<article class="path-card reveal" style="--d:${i}">
<a class="path-link" href="${page}"><span class="path-no">${esc(c.kicker)}</span>${ring(c.id)}
<span class="path-title">${inline(c.title, { ...base, nolink: true })}</span></a>
<ol class="path-steps">${shown.map((s) => `<li><a href="${page}#${s.id}" data-toc="${s.id}"><span class="toc-dot" aria-hidden="true"></span><span>${inline(s.title, { ...base, page: 'index.html', nolink: true })}</span></a></li>`).join('')}${more > 0 ? `<li class="path-more"><a href="${page}">+${more} ${esc(ui.moreSteps)}</a></li>` : ''}</ol>
<div class="path-foot"><span class="path-meta">${c.sections.length} ${esc(ui.steps)}</span><a class="path-open" href="${page}">${esc(ui.open)} ${ARROW}</a></div>
<span class="path-bar" aria-hidden="true"><span data-chapter-bar="${c.id}"></span></span>
</article>`
        })
        .join('')
    pages['index.html'] = shell({
        ui,
        lang,
        page: 'index.html',
        title,
        description,
        data,
        assetsVersion,
        body: `
<main id="main">
<section class="hero">
  <div class="hero-bg" aria-hidden="true"><span class="orb o1"></span><span class="orb o2"></span><span class="orb o3"></span><span class="grid"></span></div>
  <div class="hero-in">
    <p class="eyebrow reveal">${kicker ?? ''}</p>
    <h1 class="hero-title reveal"><span class="grad">${coverTitle ?? ''}</span></h1>
    <p class="hero-sub reveal">${subtitle ?? ''}</p>
    <div class="hero-cta reveal">
      <a class="btn btn-primary" href="${link(steps[0]?.id ?? 'c1', 'index.html')}" data-continue><span class="cta-start">${esc(ui.start)}</span><span class="cta-cont">${esc(ui.continue)}</span>${ARROW}</a>
      <button class="btn btn-ghost" type="button" data-open-search>${esc(ui.searchShort)} <kbd dir="ltr">Ctrl K</kbd></button>
    </div>
  </div>
  <div class="paths">
    <h2 class="paths-title reveal">${esc(ui.paths)}</h2>
    <div class="paths-grid">${cards}</div>
    <button class="reset-btn home-reset" type="button" data-reset>${esc(ui.reset)}</button>
  </div>
</section>
</main>`,
    })

    // ---- one page per chapter
    chapters.forEach((c, ci) => {
        const page = pageOf(c.id)
        const ctx = { ...base, page }
        const nav = { ...ctx, nolink: true }
        const toc = chapters
            .map((x) => {
                const here = x === c
                return `<li class="toc-ch${here ? ' current' : ''}">
<a class="toc-ch-link" href="${here ? `#${x.id}` : pageOf(x.id)}"${here ? ' aria-current="page"' : ''}><span class="toc-ch-no">${esc(x.number)}</span><span class="toc-ch-title">${inline(x.title, nav)}</span>${ring(x.id)}</a>
${here ? `<ol class="toc-secs">${x.sections.map((s) => `<li><a href="#${s.id}" data-toc="${s.id}"><span class="toc-dot" aria-hidden="true"></span><span>${inline(s.title, nav)}</span></a></li>`).join('')}</ol>` : ''}
</li>`
            })
            .join('')
        const tabs = chapters
            .map(
                (x) =>
                    `<a class="ch-tab${x === c ? ' current' : ''}" href="${x === c ? `#${x.id}` : pageOf(x.id)}"${x === c ? ' aria-current="page"' : ''} title="${esc(plain(x.title, ctx))}"><span dir="ltr">${esc(x.number)}</span><span class="ch-tab-t">${inline(x.title, nav)}</span></a>`
            )
            .join('')
        const prev = chapters[ci - 1],
            next = chapters[ci + 1]
        const pager = `<nav class="chapter-pager">${prev ? `<a class="pager-card prev" href="${pageOf(prev.id)}"><small>${esc(ui.prevChapter)} · ${esc(prev.kicker)}</small><span>${inline(prev.title, nav)}</span></a>` : `<a class="pager-card prev" href="index.html"><small>${esc(ui.home)}</small><span>${title}</span></a>`}${next ? `<a class="pager-card next" href="${pageOf(next.id)}"><small>${esc(ui.nextChapter)} · ${esc(next.kicker)}</small><span>${inline(next.title, nav)}</span></a>` : ''}</nav>`
        const { intro, sections } = bodies[ci]
        pages[page] = shell({
            ui,
            lang,
            page,
            title: `${plain(c.title, ctx)} · ${ui.brand}`,
            description,
            data,
            assetsVersion,
            body: `
<div class="layout" id="main">
  <aside class="toc" id="toc" aria-label="${esc(ui.contents)}">
    <div class="toc-head"><span>${esc(ui.contents)}</span><span class="toc-total" dir="ltr" data-total-count>0/${steps.length}</span><button class="icon-btn toc-close" type="button" data-close-toc aria-label="${esc(ui.close)}"><svg class="ic" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
    <div class="toc-bar" aria-hidden="true"><span data-total-bar></span></div>
    <ol class="toc-list">${toc}</ol>
    <button class="reset-btn" type="button" data-reset>${esc(ui.reset)}</button>
  </aside>
  <div class="toc-scrim" data-close-toc></div>
  <main class="content">
    <article class="chapter${c.appendix ? ' appendix' : ''}" id="${c.id}" aria-labelledby="${c.id}-h">
      <header class="chapter-head">
        <nav class="crumbs reveal" aria-label="${esc(ui.home)}"><a href="index.html">${esc(ui.home)}</a><span aria-hidden="true">/</span><span>${esc(c.kicker)}</span></nav>
        <nav class="ch-tabs reveal" aria-label="${esc(ui.chapterNav)}">${tabs}</nav>
        <div class="chapter-kicker reveal"><span class="chip">${esc(c.kicker)}</span><span class="chapter-meta">${c.sections.length} ${esc(ui.steps)}</span></div>
        <h1 id="${c.id}-h" class="chapter-title reveal">${inline(c.title, ctx)}</h1>
        <div class="chapter-progress" aria-hidden="true"><span data-chapter-bar="${c.id}"></span></div>
      </header>
      ${intro ? `<div class="chapter-intro">${intro}</div>` : ''}
      ${sections}
      ${pager}
    </article>
  </main>
</div>
<nav class="stepper" aria-label="${esc(ui.stepLabel)}">
  <button class="icon-btn" type="button" data-step-prev aria-label="${esc(ui.prev)}" title="${esc(ui.prev)} ( [ )"><svg class="ic flip" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg></button>
  <button class="stepper-mid" type="button" data-open-toc-mobile><span class="stepper-count" dir="ltr" data-step-count></span><span class="stepper-title" data-step-title></span></button>
  <button class="icon-btn" type="button" data-step-next aria-label="${esc(ui.next)}" title="${esc(ui.next)} ( ] )"><svg class="ic flip" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg></button>
</nav>`,
        })
    })
    return pages
}
