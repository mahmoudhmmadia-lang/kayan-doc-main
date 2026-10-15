# KayanOS Arabic Guide (LaTeX)

Arabic, RTL user guide for KayanOS, built with XeLaTeX. Visual identity follows
the RightCode Word template (`temp/نموذج رايت كود - Copy.docx`).

## Editorial purpose

**Current style: less text, easier reading, more useful visuals.** Use short
actions and compact tables. Replace repeated explanations with a diagram or a
verified screenshot. Keep where to click, what to enter, how to save, what to
check, and how to recover. Describe every app page briefly in priority order.
Use readable diagram labels and captions that tell readers what to notice.
Screenshots must come from test2, without blur or masking; label unsaved examples
with short captions. Each language uses its own interface screenshots. Apply this to all current
chapters and both languages, and to future chapters.

Write for a business reader who has never used KayanOS. Teach the business
problem, what the product offers, the useful result, and then the exact workflow.
Use the same fictional company throughout. Separate initial setup from daily
work and monthly review, and explain new terms only when the reader needs them.

Each practical walkthrough needs: **why → who/when → prerequisites → where to
open → what to enter/select → save/confirm → expected result → verification and
recovery**. Use short Arabic sentences and concrete examples. Screen lists and
technical definitions support a workflow; they are not the chapter's main story.
Do not shorten a chapter by removing the steps a beginner needs. Keep implementation
details and verification limitations in the technical appendix and progress log.

## Layout

**Dedicated feature pages (2026-10-15).** Give every user-facing feature or model
its own guide page, linked from the app overview. Use verified screenshots,
simple vertical diagrams and brief text to explain what it is, what it is used
for, its practical benefit, and a concrete example with actions and a visible
result. For example, Nodes needs its own explanation of departments, their
hierarchy and links to positions. Apply this in Arabic and English. Overview
tables use “What this page offers” / “ماذا تقدم هذه الصفحة؟” for concise summaries.
The dedicated-page direction supersedes the former one-HTML-page-per-chapter
layout; preserve existing links and update navigation when implementing it.
PDF/Word retain their approved styling, with each feature's dedicated section
starting on a new page. Full requirements are in AGENTS.md under “A dedicated
guide page for each feature or model”. This is the authoring direction; the
HR now has 21 dedicated feature pages in each language, generated from
`chapters/03-hr-features.tex` and its English counterpart. Other chapters retain
their existing layout. The HR chapter is a directory; walkthroughs live on their dedicated feature pages.

Feature sections use `sec:hr-feature-<slug>` labels. The renderer routes these to
`hr-<slug>.html`, includes their content in search and progress, and keeps the
same filename when switching language. The original chapter anchors remain
available. Add feature sections after the existing HR content to preserve those
anchors. Restart the preview server after editing renderer modules.

For each app, include a prioritized page guide after the business introduction.
Cover every current standalone page, including those introduced in organization
setup. Give its exact UI name and navigation section, purpose, responsible reader,
when it matters, and expected record/result. Reconcile coverage against setup,
navigation and page implementations; document sources in the internal appendix.
Rank foundations before daily operations and specialist setup, explaining how the
reader's goal changes priority. Link existing walkthroughs. Add vertical diagrams
of the main models and their connections, distinguishing required dependencies,
optional links and workflow order. Describe tabs as tabs, not additional pages.
Keep Arabic and English coverage and diagrams identical in structure.

- `preamble.tex` — all design settings (fonts, colors, headings, header/footer,
  tables, checklists, diagram styles). Content files never redefine design.
- `main.tex` — assembles the chapters (created after the design is approved).
- `chapters/NN-name.tex` — one file per chapter. Add an app by adding its file
  and one `\input` line in `main.tex`.
- `fonts/` — Noto Naskh Arabic (SIL OFL) and Lora (SIL OFL).
- `assets/` — cover background, logo and page watermark from the template.
- `figures/`, `examples/`, `references/` — standalone diagrams, sample data,
  technical source references.
- `progress.md` — status of each part.

## Build (PDF + Word)

Every build produces both formats from the same sources:

- `kayanos-guide.pdf` — XeLaTeX output (the reference layout).
- `kayanos-guide.docx` — Word version in the same RightCode style. TikZ
  diagrams are rendered to PNG automatically; screenshots are reused.

```sh
cd tools
npm install                      # once: docx + canvas
node build.mjs                   # both formats
node --test guide.test.mjs        # source/output checks after building
node build.mjs --pdf-only        # or --docx-only
```

Requirements: Node 20+, a XeTeX engine and Poppler's `pdftoppm`. Point the
script at them with environment variables if they are not on `PATH`:
`KOS_TEX=/path/to/tectonic` (or `xelatex`) and `KOS_PDFTOPPM=/path/to/pdftoppm`.

Word notes: on first open Word asks to **update fields** — accept, so the table
of contents fills in. Install the Lora and Noto Naskh Arabic fonts (in `fonts/`)
for the exact look.

The Word and HTML converters (`tools/latex-parse.mjs`, `tools/html-render.mjs`)
understand only the macros and environments in this README's authoring rules. A
new macro must be added there too, or its text appears without formatting.
When you edit an Arabic chapter, make the same change in `i18n/en/`.

## HTML guide (Arabic + English)

`site/` is a modern web guide per language in the KayanOS website theme
(kayanos.com colours, Sora/Inter/Cairo, dark and light): a home page, chapter
overview/walkthrough pages (`site/ar/c1.html` …), and dedicated HR feature pages
(`site/ar/hr-nodes.html` …), with chapter tabs and previous/next navigation.
It is generated from the same sources: Arabic from `main.tex` + `chapters/`, English
from `i18n/en/`, which must keep the Arabic structure exactly. Diagrams become themed
SVG, numbered lists become step timelines, and each section is a "step" with
progress, search across the whole guide and deep links.

```sh
cd tools
npm run html        # build site/ only (Node, no TeX needed)
npm run dev         # preview on http://localhost:4321/ with rebuild + reload
```

Open `site/index.html` directly, or serve the `site/` folder from any static host.
The rules for the theme, translation and page design are in `AGENTS.md` §5b.

**Overleaf:** XeLaTeX only — pdfLaTeX cannot compile this project. Set
Menu → Compiler → XeLaTeX and Main document → `main.tex` (the included
`latexmkrc` also forces XeLaTeX). Overleaf builds the PDF only.

## Authoring rules

- Diagrams are vertical trees: root at the top, children below, siblings ordered
  right to left. A sequence is a single vertical branch. Add an Arabic caption,
  a compact legend, and a short explanation of the reading direction and meaning.
- Prefer clear Arabic labels and connected RTL text in both outputs. Word uses
  Arabic language metadata. Keep Latin codes, dates and times in separate LTR runs.
- Solid arrows mean required dependencies; dotted arrows mean optional links;
  dashed open arrows mean the next step. Do not confuse dependency with sequence.
- `\clearpage` and `\newpage` insert a page break in both PDF and Word. Use them
  to separate short learning units; inspect both outputs for nearly empty pages.

- Wrap Latin words in `\en{...}`; use `\kos` for KayanOS and `\key{...}` for a
  technical key on first mention.
- Wrap any number with a separator (`11–50`, `2026-10-13`, `1.2`) in `\en{...}`:
  digits in the Arabic font are shaped right-to-left and come out reversed.
- Inside TikZ nodes, wrap Arabic text in `\RL{...}` (nodes are laid out LTR).
- Never start an RTL paragraph or list item with an inline `\tikz`; put symbols
  in a table column instead.
- Use `\textcolor{..}{..}`, not a bare `\color`, inside running text (it leaks
  across paragraphs under bidi).
- Inline dependency arrow in text: `التعيينات \dep{} الأعضاء`.
- After a `longtable`, add `\addtocounter{table}{-1}`; caption it with
  `\captionof{table}{...}` placed before the table.
- Screenshots go in `figures/screens/` (clear originals; no blur or masking).
- Data classification badges: `\req`, `\rec`, `\opt`, `\gen`.
- Diagram arrows: `dependsOn` (solid) = "requires first"; `dependsOnOpt` (dotted)
  = "optional relation"; `flowsTo` (dashed,
  open head) = "process moves to". Always add `\rclegend` under a diagram.

### Clear images, fewer words (2026-10-14)

Use more screenshots beside the actions they explain. Capture crisp originals at 2× resolution; never blur, mask, reconstruct or invent UI. Use blank forms or safe demo records; capture the entire page without cropping. Replace old masked screenshots with fresh captures. Keep captions short and allow full-size viewing. Cut repeated prose while retaining every page, necessary action and verification. Apply to both languages and future app chapters.

### Full-page captures and Arabic editing

Capture the entire real test2 page at 2×, including content in internal scroll containers. Capture each explained record tab separately. Use matching `chNN-<name>-ar.png` and `chNN-<name>-en.png` images for the same state; never substitute an English interface in Arabic. Use safe demo records without masking or cropping. Keep capture URLs, language, dimensions and dates in `review/fullpage-manifest.json`. Proofread Arabic grammar, hamzas and punctuation; quote verified interface labels with «» and keep terminology consistent.
