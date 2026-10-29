# AGENTS.md — KayanOS Arabic Guide

Read this before touching anything in `kayanos-guide/`. It tells you what this
project is, where it stands, what comes next, and the working rules the user
set. `progress.md` is the live status log; this file is the standing brief.

## Current direction — web only (2026-10-16; supersedes legacy output rules below)

- **Official Correspondence stage 1 authorized (2026-10-21).** The user approved
  the recommended next app. The approved outline is
  `review/correspondence-outline.md`; its first stage is chapter 7, with a
  bilingual overview and three pages: home/responsibilities, capacity/permissions,
  and the tray/lifecycle. Explain starting points by responsibility, without
  equating a workflow responsibility with a named permission role. Preserve the
  Horizon visit example. See `review/correspondence-source-coverage.md` for
  verification and later stages; the first stage is under review.

- **Explain only the numbers that need it (2026-10-22).** In a numbered key, write
  `label: explanation` only when the explanation adds meaning (a non-obvious
  effect, condition, warning, the value shown, or an ambiguous control). When the
  UI label says enough, write just the label (`④ «إنشاء».`). The HTML key shows
  label-only items as compact lines and explained items as cards, on a rail that
  shows the marker order. Do not repeat «الأرقام في الصورة» or «بترتيب الأرقام في الصورة»
  beneath screenshots (2026-10-28); keep the numbered explanations. Same rule in both languages.
- **Numbered screenshots (2026-10-19; applies to every chapter from now on).**
  Each screenshot shows numbered markers (green circles ①, ②, ③ …) drawn on the
  real test2 page at the exact controls the reader must find or use, in the order
  they are used. The note under the image (`\shotnote`) must explain the whole
  image and then give a numbered key: one short sentence per number saying what
  the control is and when to use it, using the same circled numbers and the exact
  UI label. Keep 2–5 markers per image; never mark decoration. The page's Horizon
  example must follow the same numbered steps where a screenshot shows them, so
  the reader can follow the example on the image. Markers are added only by the
  capture script (DOM overlay before capture), never by editing the PNG; record
  the markers in `review/fullpage-manifest.json` (`marks`). Arabic images use
  Arabic-interface screenshots with markers on the Arabic controls.

- **Builder is a separate guide (2026-10-19; supersedes the chapter-6 layout below).**
  At the user's request, chapter 6 of the main guide (`c6.html`) is now only an
  overview: build order, how the tools fit together, terms, and a «دليل أدوات
  البناء» step with one card per Builder chapter plus an «افتح دليل أدوات البناء»
  button. The Builder pages live in a companion document with its own chapters
  numbered from 1: `builder/main.tex` + `builder/chapters/NN-*.tex` (Arabic master)
  and `i18n/en/builder/` (same structure). It builds into the same folder as
  `builder.html` (home), `b1.html … b8.html` (chapter overviews) and the existing
  `builder-<slug>.html` page names. Chapters: 1 Entities, 2 Apps & Navigation,
  3 Forms, 4 Services, 5 Internal SOPs, 6 SOPs and Bots, 7 Documents & printing,
  8 Dashboards & reports. Every chapter now has one page per sub-area (101 pages,
  2026-10-20), written from the production code test2 runs, with numbered test2
  screenshots on almost every page. Check one chapter with
  `node tools/check-builder-chapter.mjs <NN-name>` (safe while others edit). Ids use the
  prefix `b` and progress is stored under `kos-builder-progress`; search, `\ref`
  and routes work across both guides (`renderGuides` in `tools/build-html.mjs`).
  A new Builder page = a `\section` labelled `sec:builder-feature-<slug>` in the
  chapter's `-pages.tex`, a row in its `tab:builder-pages-*` table and the slug in
  `BUILDER_CHAPTERS` in `tools/guide.test.mjs`. Labels must be unique across guides.

- **Builder authorized (2026-10-19).** The user asked to add Builder (chapter 6,
  `c6.html`, `builder-*.html`) in the same design and rules, then to finish all
  phases and explain this complex app as simply and fully as possible. The draft
  has a 3-step overview (result, how the tools fit together, grouped directory)
  and 25 pages; it is under review. Plan, sources and
  limits: `review/builder-source-coverage.md`. No test2 screenshots yet; the
  procedures are source-backed only.
  Fictional example additions: record type «طلبات الزيارة» / “Visit requests”
  in app «خدمات الفروع» / “Branch services”, serial `HZN-VR-0001`; Horizon's
  (unnamed) system administrator builds it, Omar submits requests, Sarah reviews.

- **Projects & planning authorized (2026-10-18).** The user approved the chapter
  5 outline in this conversation. The bilingual web draft now comprises an
  overview and 82 dedicated explanations: six main navigation pages and their
  supporting records. Preserve the existing theme and Horizon people/roles.
  Review `review/projects-source-coverage.md` and the machine-readable inventory
  before extending coverage. Main-screen captures and a saved cost-category
  flow were checked on test2; specialist workflows remain source-backed and
  still need record/tab captures. The next app is not authorized.
  Fictional example additions: project `HZN-PRJ-01`, preparing the Aleppo visit;
  cost category `HZN-C-01`, Travel and transport / «السفر والانتقال».
  Sarah coordinates the visit; Omar prepares its pack; the finance owner manages
  cost classification. These examples are separate from the live QA record.

- **Tasks authorized (2026-10-17).** The user approved the chapter 4 outline.
  Chapter 4 now has an Arabic/English overview and ten dedicated feature pages
  (`tasks-*.html`), under review. The scope includes collections, views, task
  details, follow-up, relationships, epics, suggestions, assignments and shared
  task/status configuration. Distinguish embedded tabs from standalone pages.
  Projects & planning is now authorized and drafted as chapter 5. Earlier notes
  saying Tasks has not started are historical; consult `progress.md`.
  The fictional example is Sarah coordinating a Horizon Aleppo-branch visit,
  with Omar preparing its checklist in “Horizon visits” / «زيارات الأفق».
  The live QA task is separate. See `review/tasks-source-coverage.md` for tested
  behavior and the collection-access limitation.

- **No empty image space (2026-10-17).** Fit screenshots and diagrams to their
  meaningful content. Never add blank canvas, excessive capture height or spacer
  areas. Keep only a small edge margin and preserve all visible controls, labels
  and records. Full-page means all page content, not empty space below it; trim
  blank outer margins when necessary. This supersedes older no-cropping rules.
  Check both languages, inline images and enlarged views on desktop and mobile.
- **Every page needs our example (2026-10-16).** Every HR feature page and
  overview, and every future authorized app page, must include a short, concrete
  Horizon example in both languages. Place a separate **«مثال: شركة الأفق» /
  “Example: Horizon”** callout immediately after the general explanation, before
  the first screenshot. Name the relevant person, record or action and the result
  to understand; a generic heading or link to another page is not enough. Keep
  it to one or two clear sentences. Use the same fictional company and people;
  never imply these records exist in test2. Keep fuller example steps later when
  useful, without repeating the introductory explanation. Check every page for
  coverage before finishing; do not limit examples to selected features.
- **Explanation first, example second (2026-10-16).** Explain what the feature
  means, why it is useful and the general action in short, plain sentences.
  Then put the fictional Horizon scenario in a separate paragraph, callout or
  worked-example subsection labelled **«مثال: شركة الأفق» / “Example: Horizon”**.
  Do not mix Sarah, Omar, HZN codes or fictional values into definitions,
  general instructions, field descriptions or screenshot notes. Keep the same
  fictional company throughout; label example-only diagrams as examples too.
  Practical examples may include their own numbered actions and result check.
  A general procedure must still make sense without the example.
- Apply this separation in both languages with matching structure. Give Arabic
  special editorial care: natural, direct phrasing, one idea per sentence,
  familiar words and exact UI labels. Prefer one or two short explanatory
  sentences followed by a concise example; do not repeat the explanation in it.
  Describe real test2 screenshots as shown, never as fictional Horizon records.
- Work on and build the Arabic and English web guide only. Do not generate,
  inspect, or update PDF, Word or Overleaf outputs unless explicitly requested
  again. Existing print instructions below are archival, not completion criteria.
  Use `cd tools && npm run html`; the default build also produces HTML only.
- Explain shared conventions once in the home page's “How to use this guide”
  panel, with a small link from every page: required-field stars, diagram reading
  direction and arrow meanings, updating work status, and guide progress.
  Do not repeat these instructions or legends in each page or figure. Keep
  page-specific required fields, meaningful exceptions and necessary task steps.
- Every screenshot and diagram must have a short, clear explanation directly
  underneath via `\shotnote{...}`, written to the standard in **Arabic writing
  and documentation quality** below: what the figure represents, why it matters
  and what the reader should take from it, in about two or three sentences.
- Apply edits in both languages, build HTML, run the web/source checks, and
  exercise the changed guide interactions in a real browser on desktop/mobile.
  Guide-only changes are tested on the local guide preview; test2 remains the
  only allowed application environment for product verification and captures.

## Arabic writing and documentation quality (2026-10-17; applies to all Arabic text)

The user found AI-written Arabic in this guide telegraphic, mechanical and
weak beneath figures. These rules apply to every Arabic chapter, table, list,
callout, caption, diagram label and figure note, now and in future chapters.

### Language
- Write professional Modern Standard Arabic (الفصحى المعاصرة), never dialect:
  complete, natural sentences with correct grammar, spelling, hamzas and Arabic
  punctuation («،» «؛» «؟»). Rewrite whole sentences when a word fix is not enough.
- Avoid literal translation, AI-sounding phrasing, filler («تجدر الإشارة»، «من
  المهم أن»), promotional or academic tone, vague verbs and repeated wording.
  Telegraphic fragments («النتيجة: مؤسسة…») are not acceptable as prose; a short
  bold lead-in such as «المسار:» or «تحقق:» must be followed by a clear sentence.
- Prefer verbal, active sentences and link ideas with appropriate connectives
  (ثم، لذلك، أما… فـ، وبذلك). One complete idea per paragraph. Keep the guide
  short: improve clarity, do not add length.
- Keep code identifiers, paths, keys, product names and Latin values unchanged
  (in `\en{}`); keep exact UI labels in «» as the app shows them, verified in
  `../src/locales/*.ar.ts`, `../common/locales/ar.ts` or the entity seeds.
- One term per concept across the guide: «المؤسسة» (not «المنظمة» outside a UI
  label); «العضو/الأعضاء» for the person's record and page, «الموظف» for the
  person; «المنصب» for the position record; «اضغط» (not «انقر»); «الوحدة
  التنظيمية»، «الوردية»، «التعيين». Explain a term in plain Arabic on first use.
- Headings must describe what follows. Explain concepts before relying on them
  and connect each section to the previous one where a transition is needed.

### Figure explanations (`\shotnote`)
- About two or three concise sentences per figure, adapted to its complexity:
  (1) what the figure represents, (2) what it enables or communicates, and
  (3) what the reader should understand from it in this page's context.
- Do not narrate positions («في الأعلى»، «في الجهة اليمنى/اليسرى»، «تحته…») or
  inventory every field. Mention location only when needed to find a control,
  and name only the one to three labels that matter.
- Add meaning beyond the caption and surrounding paragraph; never write a note
  that could fit any screenshot («توضح الصورة واجهة النظام»).
- Diagrams: explain the dependency, sequence or relationship and its practical
  consequence; do not re-explain the arrow legend (it lives on the home page) or
  present a workflow step as automatic processing.
- Before writing a note, open the actual image and, when its meaning is unclear,
  the page component, entity seed or locale. Never invent functionality; state
  test or empty states honestly; keep the fictional Horizon example out of notes.

### Process
- Before editing, read the whole affected page (definition, example, figures,
  tables, steps) so changes keep its logical flow and avoid repetition.
- Mirror any change in meaning, and every rewritten figure note, in `i18n/en/`.
- After editing, re-read the entire affected section, check each figure against
  its note, and do a final Arabic proofreading pass (grammar, punctuation,
  terminology, UI labels) before calling documentation work complete.
- Language work never changes facts, structure, labels/anchors, table row or
  list item counts, or figure order; verify any factual correction in the code.

## 1. What this is

An Arabic (RTL) user guide for KayanOS, written in LaTeX and delivered as
**PDF + Word (.docx)** and as a **modern HTML guide** (Arabic + English, see §5b).
Since 2026-10-14 the user's focus is the HTML guide; PDF, Word and LaTeX keep
the same rules and are not to be redesigned. It follows the journey of setting up and running an
organization, not the code or menu order. Readers: business owners, department
managers, administrators and employees who know NOTHING about KayanOS. Assume
business experience, but no product vocabulary, setup knowledge or technical skills.

The guide must answer, in order: What business problem do I have? What does
KayanOS offer for it? What useful result will I get? Who does the work? How do
I do it, exactly? How do I know it worked? It is a practical business onboarding
guide, not a menu inventory, schema explanation or promotional feature list.

## 2. Where we are (2026-10-13)

| Part | File | Status |
| --- | --- | --- |
| Design (cover, colours, fonts, tables, diagrams) | `preamble.tex` | **Approved — frozen** |
| 1. Business introduction and first use | `chapters/01-introduction.tex` | Under review — rewritten for beginners |
| 2. Creating & initializing the organization | `chapters/02-organization-setup.tex` | Under review |
| 3. HR | `chapters/03-hr.tex` | Under review — authorized draft |
| Appendix A: technical sources | `references/sources.tex` | Updated with each chapter |
| 4. Tasks · 5. Projects · 6. Other apps · 7. Scenarios · 8. Checklists | — | Not started |

Always check `progress.md` for the latest status; update it whenever a status
changes (لم يبدأ / مسودة / قيد المراجعة / معتمد).

## 3. What's next

Current direction (2026-10-14): revise all existing chapters (1–3) in both
languages with minimal text, simpler explanations and more explanatory diagrams
and screenshots. This explicitly authorizes edits across these chapters without
another outline approval. Rebuild the outputs; do not start unwritten chapters.

1. On 2026-10-13 the user authorized updating chapters 1 and 2 with vertical
   diagrams and stronger Arabic support, then writing chapter 3. This authorizes
   the HR draft without another outline approval; it does not approve later chapters.
2. Chapter 3, **HR (الموارد البشرية)**: research the sources first,
   write the authorized draft, build both formats, and submit for review. Scope: the
   HR app sections — workforce (members, groups, positions, assignments),
   salary scale, time (**shifts — full explanation belongs here**, timesheets,
   attendance, holidays, leave types, leaves), payment (salary slips, payrolls,
   payroll inputs).
3. Continue in order: Tasks → Projects & planning → each other available app
   (one chapter per app; confirm which apps exist on test2 first) → cross-app
   scenarios → checklists & quick references.

Open items carried forward (not yet verified in the live system):
- The Excel import screen (the UI lives in the `src/@hypatia-ui` submodule,
  which is not checked out): exact button labels and whether "delete records
  missing from the file" is offered.
- That a member invitation actually arrives (code says email/WhatsApp, 48 h).

## 4. Working rules (agreed with the user — follow exactly)

**Process**
- Build **one part at a time**. For each part: review its sources → propose a
  short outline → **stop and wait** → write it → build → **stop and wait**.
- Never move to the next part without the user's **explicit approval**.
- When asked for edits, change only the current part; never rewrite approved
  parts. Add approved parts to this same project and update the TOC, internal
  links (`\label`/`\ref`) and `progress.md`.
- When information is missing, ask a **few specific questions**. Do not guess.

**Accuracy**
- Sources of truth: the actual code, current settings, the original import
  templates (`../temp/*.xlsx`), the official docs (`../docs/start/`), and what
  the user tells you. Do not infer behaviour from a page name alone.
- The old draft `../دليل-نظام-KayanOS.md` contains errors — never copy from it
  without checking the code.
- Always distinguish: technically required (`\req`) · recommended (`\rec`) ·
  optional (`\opt`) · generated by the system (`\gen`).
- Distinguish a standalone page from a tab inside another record; and a
  reference list from a setting, an operational transaction, and a result/report.
- A relation between two records does **not** make it mandatory.
- Never claim something was tested in the system when you only read code.
  Say which facts were checked on test2 and which come from code only.
- If templates, the live system and the code disagree, explain the difference
  before writing it up.
- Priority depends on the goal (e.g. payroll is optional for building the
  structure but essential for running payroll).
- Technical references (file paths, keys) go **only** in the appendix
  (`references/sources.tex`), never in the main text.

**Style** (the user explicitly asked for this)
- **Minimum text, maximum clarity (2026-10-14).** Prefer a short diagram or
  screenshot plus concise actions over paragraphs. Remove repeated explanations,
  long introductions and narration that the visual already explains. Aim for
  one idea per sentence and one short purpose/result per page description.
- Every visual must teach something: a navigation path, relationship, sequence,
  input example or visible result. Use verified, clear test2 screenshots, never
  invented UI images. Label unsaved examples; use the matching interface language in each guide. Keep labels readable on phones; split long node text into lines.
- Keep the essentials: where to open, sample inputs, save/confirm, expected result,
  and recovery. Keep all app pages in priority order; shorten descriptions instead
  of omitting pages. Introduce shared responsibility once when possible. A diagram
  replaces explanation, but does not replace the actions needed to complete a task.
- **Complete app page coverage (2026-10-14).** After the business introduction,
  name and describe every current standalone page, including foundational pages
  introduced during organization initialization. Reconcile the setup chapter with
  current navigation, native page implementations and UI translations; keep a
  source-backed coverage record in the internal appendix. Do not silently omit
  setup pages or count tabs, disabled pages or internal models as standalone pages.
- Present pages in an explicit order of importance for the reader's goal:
  foundational people/structure, recurring operations, then optional specialist
  setup. Explain when priorities change (for example, payroll). For each page give
  its exact UI name, navigation section, plain-language purpose, who uses it/when,
  and the record or result to review. Link existing setup walkthroughs instead of
  repeating them; page descriptions supplement the practical walkthroughs.
- Include vertical diagrams of the app's main pages/models and their verified
  connections. Explain each relationship in prose with the shared example.
  Distinguish required dependencies, optional relationships and workflow sequence;
  a workflow arrow must never imply a database relation or automatic processing.
  Use multiple small diagrams when needed. Apply this to HR now and every future
  app chapter, in Arabic and English, without starting the next chapter early.
- **Business first, beginner friendly, actionable.** Start from a recognizable
  problem (lost requests, unclear responsibility, repeated employee data), explain
  the capability and its practical benefit, then teach the task. Avoid promises
  about automatic results, cost savings or compliance unsupported by evidence.
- **Simple and complete.** Short paragraphs, small tables, checklists. Aim for
  ~4–6 pages per chapter, but split into short learning units or allow more pages
  when needed to give complete instructions. Never omit necessary steps merely
  to hit a page count. Short does not mean vague.
- Clear, direct Arabic. Explain a term before using it. English name or key
  only on first mention.
- Organize chapters around business jobs, not pages. Each major walkthrough
  includes: the problem and benefit; who uses it and when; prerequisites; the
  Arabic navigation path; numbered actions with concrete sample inputs; the
  save/confirm action; the visible expected result; a check and recovery step.
- Separate one-time administrator setup, recurring manager work and employee
  daily work. State what the reader may skip when their organization is already set up.
- Use one continuous fictional business, شركة الأفق للخدمات, from the initial
  problem through setup, employee onboarding, a working day and monthly review.
  Introduce a term at the point it is needed, with an everyday explanation first.
  Do not open with entities, fields, relationships or a glossary dump.
- The introduction must explain problems solved, capabilities, who benefits,
  a realistic before/after story, first login/navigation, and where each reader starts.
- Every procedure must be executable without guessing. Do not write only
  "configure", "link", "review" or "create": name where, what to select/type,
  how to finish, and what to see next. Match verified Arabic UI labels. Explain
  alternatives and organization-specific choices without inventing button labels.
- Distinguish an overview from a full walkthrough; link prerequisites already
  explained. Identify unverified steps in the technical appendix and review log.
- Before completion, review as a first-time business user: Can I explain why
  I need it, find the starting point, follow the example, save, verify the outcome,
  and recover from a common failure? A list of features alone does not pass.
- Diagrams must be vertical trees, read from top to bottom, with the root above
  its children. Sequential flows use a single vertical branch. Arrange siblings
  right to left; avoid crossing connectors, sideways flows and rotated text.
- Use short Arabic labels, a caption, `\rclegend`, and one or two sentences
  explaining how to read the figure and what to do next. Solid arrow = required
  dependency; dotted arrow = optional relation; dashed open arrow = next step.
  A branching dependency diagram is not an instruction to create its root first.
- Arabic must remain connected and RTL in PDF and Word, including tables,
  captions, lists and diagram labels. Set Word's complex-script language to Arabic;
  isolate Latin codes, times and dates in LTR runs. Use Arabic terms first and
  explain unfamiliar terms through a concrete example, not literal translations.
- Keep diagram text at a readable size; wrap labels into explicit Arabic lines
  rather than shrinking an entire diagram. Check every changed page in both outputs.
- Screenshots from test2 only, without blur or masking; save them in
  `figures/screens/chNN-*.png`.

**Shared example data** (use the same names and codes in every chapter)
- Organization: شركة الأفق للخدمات · code `HZN` · subdomain `hzn` · Syria · 11–50 staff.
- Locations: `HZN-DAM` المقر الرئيسي، دمشق · `HZN-ALP` فرع حلب.
- Units: `HZN-GM` الإدارة العامة · `HZN-HR` الموارد البشرية (parent: HZN-GM).
- Positions: `HZN-P-01` مدير الموارد البشرية (HZN-HR, HZN-DAM) · `HZN-P-02` منسق عمليات (HZN-ALP).
- Members: `0001` سارة الخطيب · `0002` عمر حداد (both full seat).
- Assignments: سارة → مدير الموارد البشرية · عمر → منسق عمليات.
Extend this list (here and in the chapter) when a new chapter needs more data.
- Shift: `HZN-S-01` الدوام الإداري, Sunday–Thursday, `09:00–17:00`,
  break `13:00–13:30`, `Asia/Damascus`, net duration `07:30`.
  Guide examples are fictional; never imply they were created in test2.

## 5. Design of the PDF and Word outputs (frozen)

The PDF/Word design follows the RightCode Word template (`../temp/نموذج رايت كود - Copy.docx`)
and was approved. **Do not change `preamble.tex` styling unless the user asks.**
Approved choices: heading sizes 24/18/14 pt; Noto Naskh Bold for the cover
title; RightCode-style tables; header "دليل KayanOS / chapter name".
The user authorized vertical diagram layouts and stronger Arabic support on
2026-10-13, including the compact vertical legend and distinct optional-link style.
Technical rules that keep Arabic correct (numbers, TikZ, colours, longtable)
are in `README.md` → *Authoring rules*. Read them before writing LaTeX.

## 5b. The HTML guide (current focus, requested 2026-10-14)

The user asked for a modern, single-page web guide in the **KayanOS website
theme** (`https://kayanos.com/en`, `/ar`), not the RightCode theme. It is
generated from the same LaTeX sources; never edit `site/` by hand.

**Theme (from kayanos.com; keep it in sync with the site, not with RightCode)**
- Dark first, light on request. Dark: background `#05070c`, surface `#0c111b`,
  text `#e6edf3`, brand `#1bc47d`/`#3dd68c`, accent `#2dd4bf`. Light: background
  `#f3eee5`, surface `#fbf9f5`, text `#1c1a15`, brand `#12a368`/`#0e7a4e`, accent `#0e8c8c`.
  Brand gradient brand-strong → accent; glass cards; orbs and a faint grid in the hero.
- Fonts (Google Fonts, as on the site): **Sora** headings, **Inter** Latin text,
  **Cairo** Arabic text. Logo: the green KayanOS mark (`web/kayanos-mark.svg`).
- All colours are tokens in `web/guide.css`; text on brand fills uses `--on-brand`.

**Languages (same as the site: Arabic and English)**
- Arabic (`chapters/`, `references/`, `main.tex`) is the **master**. English lives in
  `i18n/en/` with the **same structure**: same sections, labels, tables (rows and
  columns), lists (item counts), boxes, figures, `\clearpage` and macros. The test
  `English HTML sources mirror the Arabic structure` enforces it.
- **Any change to an Arabic chapter needs the same change in its English file**
  in the same task. A new chapter needs both files and an `\input` in both `main.tex`.
- English UI labels must be the app's real English labels: find the Arabic label in
  `../src/locales/*.ar.ts` or `../common/locales/ar.ts` and use the same key in the
  English file. Example names: Horizon Services Co., Sarah Al-Khatib, Omar Haddad,
  Head Office Damascus, Aleppo Branch, General Management, HR Manager,
  Operations Coordinator, Office Hours. In English diagrams write plain text (no `\RL`).
- Pages per language (`site/ar/`, `site/en/`): `index.html` (home), chapter
  overview/walkthrough pages `c1.html` …, and 21 dedicated HR pages
  `hr-<slug>.html`. HR feature sources are `chapters/03-hr-features.tex` and the
  matching English file. `site/index.html` opens the saved or
  browser language. The language switch keeps the page and step (`c2.html#c2-s4`).

**Page design rules** (separate chapter pages, requested 2026-10-14)
- Home: hero (title, stats, overall progress, start/continue) and one card per
  chapter listing its first steps, with progress and an "Open chapter" link.
- Chapter page: breadcrumb (Guide / Chapter N), chapter tabs to jump to any chapter,
  sticky contents (all chapters; the current one expanded, with scroll-spy and
  progress rings), every `\section` a numbered **step** card with "mark as done",
  and previous/next chapter cards at the end.
- The floating step navigator and the `[` `]` keys move step by step and continue
  onto the next or previous chapter page at the edges. Ctrl+K (or `/`) searches
  the whole guide and opens the right chapter page. Old single-page links
  (`index.html#c2-s4`) redirect to the chapter page.
- Titles shown inside navigation (contents, cards, tabs, pager) render `\ref` as
  plain text: never put a link inside a link (a test checks this).
- Numbered lists render as step timelines; checklists are interactive and saved
  in the browser; tables become stacked cards on phones; screenshots open in a lightbox.
- Diagrams are native SVG drawn from the TikZ source (`tools/html-diagram.mjs`):
  vertical tree, siblings right to left in Arabic and mirrored in English, same
  arrow meanings as the PDF, with a legend of the arrows used.
- Motion: scroll reveals, diagram draw-in, theme cross-fade. Always respect
  `prefers-reduced-motion`; deep links must land exactly under the top bar.
- Stable ids: chapter `c2`, step `c2-s4`, sub-heading `c2-s4-1`, table `c2-t3`,
  figure `c2-f1`. The prefix normally names the chapter page (`c2.html`). Sections
  labelled `sec:hr-feature-<slug>` and their figures/headings use an explicit
  route map to `hr-<slug>.html`; search, progress and navigation share that map.
  HR feature sections follow the two overview steps (c3-s1, c3-s2); old walkthrough
  anchors c3-s3…c3-s11 redirect through the `LEGACY` map in `tools/html-render.mjs`.
  Their ids and filenames match across languages; do not change the scheme.

## 6. Build and verify — every time

- One command builds all outputs: `cd tools && node build.mjs`
  → `kayanos-guide.pdf`, `kayanos-guide.docx` and `site/`. The user requires PDF and
  Word too. `node build.mjs --html-only` (or `npm run html`) needs only Node.
- Preview the HTML guide: `cd tools && npm run dev` → `http://localhost:4321/`
  (rebuilds and reloads on changes to chapters, translations, theme or screenshots;
  restart it after editing `tools/*.mjs`).
- **HTML verification:** `node --test guide.test.mjs` (structure parity, links,
  diagrams, assets); then open both languages in a real browser at 1440×900 and
  390×844, in dark and light, and check every changed step: RTL/LTR order,
  diagrams, tables on mobile, search, mark-as-done, the language switch and deep
  links. Save screenshots in `review/html/`.
- Tools: a XeTeX engine (`KOS_TEX`, Tectonic or xelatex) and Poppler
  `pdftoppm` (`KOS_PDFTOPPM`). They were run from a temporary scratchpad in the
  last session, so you may need to fetch them again (Tectonic and Poppler are
  portable zips; no install needed).
- If you add a LaTeX macro or environment, teach it to `tools/latex-parse.mjs`
  and `tools/html-render.mjs` too, or it loses formatting in Word and HTML.
- **Verify before reporting:** build with zero errors; render the PDF pages to
  PNG and look at every changed page (RTL order, numbers, tables, diagrams,
  overflow); convert the .docx to PDF (LibreOffice headless) and look at it too.
  If a build or check fails, say so — never claim success you did not see.
- Test environment for live checks: see the repository root `AGENTS.md`
  (test2 account). Use only test2.
- Overleaf: XeLaTeX only (`latexmkrc` forces it). Overleaf makes the PDF only;
  the .docx comes from the local build.

## 7. Files

```
kayanos-guide/
├── AGENTS.md          ← this brief
├── progress.md        ← live status + decision log
├── README.md          ← build steps + LaTeX authoring rules
├── main.tex           ← assembles chapters (add one \input per new chapter)
├── preamble.tex       ← design (frozen)
├── chapters/          ← one file per chapter (Arabic master)
├── references/        ← appendix: technical sources per chapter
├── i18n/en/           ← English translation for the HTML guide (same structure)
├── figures/screens/   ← full-page screenshots in both interface languages
├── assets/, fonts/    ← template images, Lora + Noto Naskh Arabic
├── web/               ← HTML theme: guide.css, guide.js, KayanOS logo
├── tools/             ← build.mjs, latex-parse.mjs, docx-render.mjs,
│                        build-html.mjs, html-render.mjs, html-diagram.mjs, serve-html.mjs
├── site/              ← generated HTML guide: ar/ and en/ (index.html + c1…c4.html), assets/
└── kayanos-guide.pdf / .docx   ← latest outputs
```

### Clear images, fewer words (2026-10-14)

Use more screenshots beside the actions they explain. Capture crisp originals at 2× resolution; never blur, mask, reconstruct or invent UI. Use blank forms or safe demo records; capture the entire page without cropping. Replace old masked screenshots with fresh captures. Keep captions short and allow full-size viewing. Cut repeated prose while retaining every page, necessary action and verification. Apply to both languages and future app chapters.

### A dedicated guide page for each feature or model (2026-10-15)

- Split app chapters into smaller, dedicated guide pages: each user-facing feature
  page or model gets its own explanation page, starting with HR (for example,
  Nodes / organizational units). A table row or a section on a long chapter page
  does not replace this dedicated page. Keep an app overview that links to them.
- Explain in plain language: what it is, what it is used for, the business problem
  it solves, and when it is useful. Describe concrete benefits without invented
  savings, usefulness scores, or unsupported promises.
- Teach mainly through clear, verified test2 screenshots and simple vertical
  diagrams, with short supporting text and captions. Show the page, a practical
  example, and its relevant relationships; distinguish optional links, required
  dependencies, and workflow steps. Do not invent relationships to fill a diagram.
- Include where to open it, who uses it and when, essential setup or actions,
  and the result to check. Retain the shared Horizon example and existing
  accuracy, walkthrough, screenshot, accessibility, and verification rules.
- For example, the Nodes page should explain an organizational unit, show how
  departments fit into a hierarchy, illustrate a department and its parent,
  and explain how linking positions helps organize the team.
- Keep overview tables concise: their second column is “What this page offers”
  (Arabic: “ماذا تقدم هذه الصفحة؟”), with a quick feature explanation, rather
  than the former purpose/reader/result format. Link to dedicated explanations.
- Apply the same page coverage in Arabic and English, across current and future
  authorized app chapters. A model explained in the guide is not necessarily a
  standalone app screen: accurately label tabs and embedded settings, and do not
  expose internal implementation models as user-facing features.
- This direction supersedes the HTML rule limiting content to one page per
  chapter. When implementing the split, keep chapter overview pages, preserve
  existing deep links, and update navigation, search, progress, language switching,
  and tests for dedicated pages. In PDF/Word, give each feature/model a dedicated
  section beginning on a new page while preserving the approved design.
- HR's 21 dedicated pages are implemented and remain under review. This does not
  authorize starting unwritten app chapters. Track further implementation and
  verification separately in progress.md.

### App overview = directory; pages = complete coverage (2026-10-15)

- An app chapter page holds only: a short "what you will achieve" (result, who does
  what, the core model diagram) and the page directory. Directory tables
  (`tab:hr-pages-*`) render as numbered page buttons in the HTML. The pager offers
  "Start with the pages" and the next chapter. No walkthroughs on the overview:
  every procedure lives on the page it belongs to (shift creation and inheritance on
  Shifts, day review on My attendance, slip steps on Salary Slips…). Never repeat it.
- Each dedicated page shows **everything the page can hold or do**, not just the
  basic form: a short "What do you record?" table covering every tab, section and
  sub-record (e.g. Members: personal, contact, qualifications, conflict of interest,
  financial, employment/attendance, account & security), then "What can you do?"
  (special actions, views, statuses), then one diagram, steps and a check.
  Source the inventory from `scripts/seed-entities/entities/`, the page components
  and locales; mention shared list features (views, filters, Excel) once on the overview.
- Feature pages link previous/next page; the last links to the next chapter or overview.
- Wanted next: test2 screenshots of each record's full tabs (not only the blank
  basic form), captured when browser access to test2 works.

### Full-page screenshots and clear, correct Arabic (2026-10-15)

- Every screenshot is a **full-page capture** of the real test2 page: the whole
  scroll height of the list or record page, not a cropped form, dialog fragment
  or viewport slice. For records with tabs, capture each tab the page explains
  (one full-page image per tab when the tab changes the content).
- The **Arabic guide uses Arabic-interface screenshots** and the English guide uses
  English-interface screenshots of the same page and state (`chNN-<name>-ar.png`,
  `chNN-<name>-en.png`). Capture at 2× so Arabic text is sharp; never use an
  English-interface image in the Arabic guide.
- Arabic must be clear and correct: proofread every Arabic sentence, caption and
  table cell for grammar, spelling, hamzas and punctuation (Arabic comma «،» and
  semicolon «؛»); use the exact Arabic UI labels from `src/locales/ar.ts`,
  `common/locales/ar.ts` and the entity seeds, quoted with «»; keep one term per
  concept across the guide; no literal translations or mixed-language sentences.
- Use records whose data is safe to show (test2 is a test organization); do not
  blur or mask. Where real personal rows would appear, open a test record instead.

### Every image is explained directly under it (2026-10-15)

- Pattern on every page, in every chapter and both languages: **image → its
  explanation → next image → its explanation**. Never put a block of text first
  and then a run of images (for example a gallery of tabs) with no explanation.
- Write the explanation inside the figure with `\shotnote{...}`, after `\caption`
  and `\label`. It renders under the image in PDF, Word and HTML (`.fig-note`).
- Each note is about 2–3 short sentences on what the figure represents, why it
  matters and what to take from it, naming key labels exactly; see **Arabic
  writing and documentation quality** (that section supersedes positional
  descriptions). Do not repeat the caption, invent UI, or describe a test record
  as the Horizon example.
- Applies to screenshots and diagrams, HR now and every future chapter. A figure
  without a note fails the test `every figure has an explanation under it`.
