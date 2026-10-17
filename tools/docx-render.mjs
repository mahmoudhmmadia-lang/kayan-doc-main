// Renders the parsed guide (latex-parse.mjs) into a DOCX that follows the
// RightCode template: dark cover, logo + watermark header, brand footer,
// teal headings, brand tables, callout boxes. Arabic is RTL throughout.

import fs from 'node:fs';
import path from 'node:path';
import {
  AlignmentType, Bookmark, BorderStyle, Document, InternalHyperlink, PageReference, Footer, Header, HeadingLevel, HorizontalPositionRelativeFrom,
  ImageRun, PageNumber, Paragraph, SectionType, ShadingType, Table, TableCell, TableLayoutType,
  TableRow, TextRun, TextWrappingType, VerticalAlign, VerticalPositionRelativeFrom,
  WidthType, HorizontalPositionAlign, VerticalPositionAlign, Packer,
} from 'docx';
import { loadImage } from '@napi-rs/canvas';
import { parseInline } from './latex-parse.mjs';

// ---------------------------------------------------------------- tokens

const C = {
  primary: '00696D', primaryLight: '4FB8AE', text: '0E1F1F', textSecondary: '4A6364',
  muted: '94A8A6', mutedDark: '6A8482', surfaceVar: 'E5EBEB', surfaceElev: 'F1F5F4',
  border: 'D6E0DF', info: '1E5C7F', infoBg: 'E1EEF6', warning: 'A36300', warningBg: 'FBF1DD',
};
export const LATEX_COLORS = {
  rcPrimary: C.primary, rcPrimaryLight: C.primaryLight, rcText: C.text, rcTextSecondary: C.textSecondary,
  rcMuted: C.muted, rcMutedDark: C.mutedDark, white: 'FFFFFF',
};
const FONT = { ascii: 'Lora', hAnsi: 'Lora', cs: 'Noto Naskh Arabic', eastAsia: 'Noto Naskh Arabic' };
const MONO = { ascii: 'Consolas', hAnsi: 'Consolas', cs: 'Consolas', eastAsia: 'Consolas' };
const SYMBOL = { ascii: 'Segoe UI Symbol', hAnsi: 'Segoe UI Symbol', cs: 'Segoe UI Symbol', eastAsia: 'Segoe UI Symbol' };

// A4 with the template's body margins (twips).
const PAGE = { width: 11906, height: 16838 };
const MARGIN = { top: 1474, bottom: 1361, left: 1020, right: 1020, header: 567, footer: 567 };
const TEXT_W = PAGE.width - MARGIN.left - MARGIN.right; // 9866 twips = 17.4 cm
const PX_PER_TWIP = 96 / 1440;
const TEXT_W_PX = Math.floor(TEXT_W * PX_PER_TWIP);
const CM = 567; // twips per cm

const NONE = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const NO_BORDERS = { top: NONE, bottom: NONE, left: NONE, right: NONE, insideHorizontal: NONE, insideVertical: NONE };

// ---------------------------------------------------------------- runs

function textRuns(runs, base = {}) {
  const out = [];
  for (const r of runs) {
    if (r.br) { out.push(new TextRun({ break: 1 })); continue; }
    if (r.badge) {
      out.push(new TextRun({
        text: ` ${r.badge.text} `, bold: true, boldComplexScript: true, color: 'FFFFFF',
        size: 16, sizeComplexScript: 16, font: FONT, rightToLeft: true,
        shading: { type: ShadingType.CLEAR, fill: r.badge.fill, color: 'auto' },
      }));
      continue;
    }
    const bold = r.bold ?? base.bold;
    const size = base.size;
    out.push(new TextRun({
      text: r.text,
      bold, boldComplexScript: bold,
      color: r.color ?? base.color,
      size, sizeComplexScript: size,
      font: r.mono ? MONO : r.symbol ? SYMBOL : FONT,
      rightToLeft: !(r.latin || r.mono),
    }));
  }
  return out;
}

function inline(src, ctx, base) {
  return textRuns(parseInline(src, ctx), base);
}

// Only source-path cells (monospace) are laid out left-to-right; short Latin
// values such as codes stay right-aligned like the PDF.
function isLatinOnly(runs) {
  return runs.length > 0 && runs.every((r) => r.br || (r.mono && !r.badge));
}

function para(src, ctx, opts = {}) {
  const runs = parseInline(src, ctx);
  const ltr = isLatinOnly(runs) && opts.allowLtr;
  return new Paragraph({
    bidirectional: !ltr,
    alignment: ltr ? AlignmentType.LEFT : opts.align,
    spacing: opts.spacing ?? { after: 80, line: 276 },
    indent: opts.indent,
    keepNext: opts.keepNext,
    children: [...(opts.prefix ?? []), ...textRuns(runs, opts.base ?? {})],
  });
}

// ---------------------------------------------------------------- blocks

function caption(kind, block, ctx) {
  const label = kind === 'table' ? 'جدول' : 'شكل';
  return new Paragraph({
    bidirectional: true,
    alignment: AlignmentType.CENTER,
    keepNext: kind === 'table',
    spacing: { before: kind === 'table' ? 160 : 60, after: kind === 'table' ? 80 : 200 },
    children: [
      new TextRun({ text: `${label} `, bold: true, boldComplexScript: true, color: C.muted, size: 18, sizeComplexScript: 18, font: FONT, rightToLeft: true }),
      new TextRun({ text: block.number, bold: true, color: C.muted, size: 18, font: FONT }),
      new TextRun({ text: ': ', color: C.muted, size: 18, sizeComplexScript: 18, font: FONT, rightToLeft: true }),
      ...inline(block.caption, ctx, { color: C.muted, size: 18 }),
    ],
  });
}

function columnWidths(cols) {
  const fixed = cols.reduce((s, c) => s + (c.width ? c.width * CM : 0), 0);
  const flex = cols.filter((c) => !c.width).length;
  const rest = Math.max(TEXT_W - fixed, flex * CM * 2);
  const widths = cols.map((c) => Math.round(c.width ? c.width * CM : rest / flex));
  const total = widths.reduce((s, w) => s + w, 0);
  return widths.map((w) => Math.round((w * TEXT_W) / total)); // scale to text width
}

function brandTable(block, ctx) {
  const widths = columnWidths(block.cols);
  let bodyIndex = 0;
  const rows = block.rows.map((row) => {
    const fill = row.header ? C.primary : (bodyIndex++ % 2 === 1 ? C.surfaceElev : 'FFFFFF');
    return new TableRow({
      tableHeader: row.header,
      cantSplit: true,
      children: row.cells.map((cell, n) => new TableCell({
        width: { size: widths[n] ?? widths[widths.length - 1], type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill, color: 'auto' },
        margins: { top: 50, bottom: 50, left: 100, right: 100 },
        verticalAlign: VerticalAlign.CENTER,
        children: [para(cell, ctx, {
          allowLtr: true,
          spacing: { after: 0, line: 260 },
          base: row.header ? { bold: true, color: 'FFFFFF', size: 20 } : { size: 20 },
        })],
      })),
    });
  });
  const line = { style: BorderStyle.SINGLE, size: 4, color: C.border };
  return new Table({
    visuallyRightToLeft: true,
    layout: TableLayoutType.FIXED,
    width: { size: TEXT_W, type: WidthType.DXA },
    columnWidths: widths,
    borders: { top: line, bottom: line, insideHorizontal: line, left: NONE, right: NONE, insideVertical: NONE },
    rows,
  });
}

const BOX = {
  note: { bar: C.info, bg: C.infoBg, title: C.info },
  warn: { bar: C.warning, bg: C.warningBg, title: C.warning },
  check: { bar: C.primary, bg: C.surfaceElev, title: C.primary },
};

// Callout: a 2-column table; the narrow first column is the coloured bar on
// the right edge (first column is rightmost in an RTL table).
function box(block, ctx, images) {
  const s = BOX[block.kind];
  const inner = [
    new Paragraph({
      bidirectional: true, spacing: { after: 60 },
      children: inline(block.title, ctx, { bold: true, color: s.title }),
    }),
    ...renderBlocks(block.blocks, ctx, images, { inBox: true }),
  ];
  const barW = 80;
  return [new Table({
    visuallyRightToLeft: true,
    layout: TableLayoutType.FIXED,
    width: { size: TEXT_W, type: WidthType.DXA },
    columnWidths: [barW, TEXT_W - barW],
    borders: NO_BORDERS,
    rows: [new TableRow({
      cantSplit: true,
      children: [
        new TableCell({ width: { size: barW, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: s.bar, color: 'auto' }, children: [new Paragraph({ children: [] })] }),
        new TableCell({
          width: { size: TEXT_W - barW, type: WidthType.DXA },
          shading: { type: ShadingType.CLEAR, fill: s.bg, color: 'auto' },
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          children: inner,
        }),
      ],
    })],
  }), new Paragraph({ spacing: { after: 80 }, children: [] })];
}

function list(block, ctx) {
  return block.items.map((item, n) => {
    const prefix = block.kind === 'bullet'
      ? [new TextRun({ text: '•  ', color: C.primary, bold: true, font: FONT, rightToLeft: true })]
      : block.kind === 'check'
        ? [new TextRun({ text: '☐  ', color: C.primary, font: SYMBOL, size: 24, sizeComplexScript: 24 })]
        : [new TextRun({ text: `${n + 1}`, color: C.primary, bold: true, font: FONT }), new TextRun({ text: '  ', rightToLeft: true })];
    return para(item, ctx, { prefix, indent: { start: 360 }, spacing: { after: 60, line: 276 } });
  });
}

function figure(block, ctx, images) {
  const img = images.get(block);
  if (!img) return [];
  const out = [new Paragraph({
    bidirectional: true, alignment: AlignmentType.CENTER, keepNext: Boolean(block.caption),
    spacing: { before: 120, after: 40 },
    children: [new ImageRun({ type: 'png', data: img.data, transformation: { width: img.width, height: img.height } })],
  })];
  if (block.caption) out.push(caption('figure', block, ctx));
  if (block.note) out.push(para(block.note, ctx, { spacing: { before: 0, after: 240, line: 276 } }));
  return out;
}

function heading(block, ctx) {
  const level = block.level === 2 ? HeadingLevel.HEADING_2 : HeadingLevel.HEADING_3;
  const children = [];
  if (block.number) {
    children.push(new TextRun({ text: block.number, font: FONT }), new TextRun({ text: '  ', rightToLeft: true }));
  }
  children.push(...inline(block.title, ctx, {}));
  const kids = block.bookmark ? [new Bookmark({ id: block.bookmark, children })] : children;
  return new Paragraph({ heading: level, bidirectional: true, keepNext: true, children: kids });
}

function chapter(block, ctx) {
  return [
    new Paragraph({
      bidirectional: true, pageBreakBefore: true, spacing: { after: 40 },
      children: [new TextRun({ text: block.kicker, bold: true, boldComplexScript: true, color: C.primaryLight, size: 24, sizeComplexScript: 24, font: FONT, rightToLeft: true })],
    }),
    new Paragraph({
      heading: HeadingLevel.HEADING_1, bidirectional: true, keepNext: true,
      children: [new Bookmark({ id: block.bookmark, children: inline(block.title, ctx, {}) })],
    }),
    new Paragraph({
      bidirectional: true, spacing: { after: 240 },
      children: [new TextRun({ text: '▬▬▬▬▬', color: C.primary, font: SYMBOL, size: 16 })],
    }),
  ];
}

export function renderBlocks(blocks, ctx, images, opts = {}) {
  const out = [];
  for (const b of blocks) {
    switch (b.type) {
      case 'chapter': out.push(...chapter(b, ctx)); break;
      case 'heading': out.push(heading(b, ctx)); break;
      case 'para': out.push(para(b.src, ctx, { align: b.align === 'center' ? AlignmentType.CENTER : undefined })); break;
      case 'list': out.push(...list(b, ctx)); break;
      case 'box': out.push(...box(b, ctx, images)); break;
      case 'table':
        if (b.caption) out.push(caption('table', b, ctx));
        out.push(brandTable(b, ctx), new Paragraph({ spacing: { after: 120 }, children: [] }));
        break;
      case 'figure': out.push(...figure(b, ctx, images)); break;
      case 'pagebreak': out.push(new Paragraph({ pageBreakBefore: true, spacing: { before: 0, after: 0 }, children: [] })); break;
      default: break; // appendix markers, inputs, etc.
    }
  }
  return out;
}

// ---------------------------------------------------------------- images

export async function imageInfo(file, widthPx) {
  const data = fs.readFileSync(file);
  const img = await loadImage(data);
  // Same cap as the LaTeX figures (0.72\textheight) so a tall full-page
  // screenshot, its caption and its note fit on one page.
  const maxHeight = (PAGE.height - MARGIN.top - MARGIN.bottom) * PX_PER_TWIP * 0.72;
  const width = Math.min(widthPx, TEXT_W_PX, (maxHeight * img.width) / img.height);
  return { data, width: Math.round(width), height: Math.round((img.height * width) / img.width) };
}

// ---------------------------------------------------------------- page furniture

function coverSection(args, ctx, assets) {
  const runs = (src, base) => inline(src, ctx, base);
  const center = (children, spacing) => new Paragraph({ bidirectional: true, alignment: AlignmentType.CENTER, spacing, children });
  const metaCell = (label, value) => new TableCell({
    width: { size: 4.6 * CM, type: WidthType.DXA }, borders: { top: NONE, bottom: NONE, left: NONE, right: NONE },
    children: [
      center(runs(label, { bold: true, color: C.mutedDark, size: 15 }), { after: 40 }),
      center(runs(value, { color: C.surfaceVar, size: 19 }), { after: 0 }),
    ],
  });
  return {
    properties: {
      page: { size: PAGE, margin: { ...MARGIN, top: 1474 } },
    },
    headers: { default: new Header({ children: [new Paragraph({ children: [] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ children: [] })] }) },
    children: [
      new Paragraph({
        children: [new ImageRun({
          type: 'png', data: assets.coverBg,
          transformation: { width: 794, height: 1123 },
          floating: {
            horizontalPosition: { relative: HorizontalPositionRelativeFrom.PAGE, offset: 0 },
            verticalPosition: { relative: VerticalPositionRelativeFrom.PAGE, offset: 0 },
            behindDocument: true, allowOverlap: true, wrap: { type: TextWrappingType.NONE },
          },
        })],
      }),
      // template: top margin 7.2cm + 2.1cm before the kicker
      center(runs(args[0], { bold: true, color: C.primaryLight, size: 20 }), { before: 3600, after: 280 }),
      center(runs(args[1], { bold: true, color: 'FFFFFF', size: 44 }), { after: 160 }),
      center(runs(args[2], { bold: true, color: C.primaryLight, size: 20 }), { after: 2950 }),
      new Table({
        visuallyRightToLeft: true, alignment: AlignmentType.CENTER, layout: TableLayoutType.FIXED,
        width: { size: 3 * 4.6 * CM, type: WidthType.DXA }, columnWidths: [4.6 * CM, 4.6 * CM, 4.6 * CM],
        borders: NO_BORDERS,
        rows: [new TableRow({ children: [metaCell('التاريخ', args[3]), metaCell('الإصدار', args[4]), metaCell('أُعدّ بواسطة', args[5])] })],
      }),
    ],
  };
}

function bodyHeader(assets) {
  const half = Math.round(TEXT_W / 2);
  return new Header({
    children: [
      // page watermark (pre-faded image, behind text, centred on the page)
      new Paragraph({
        spacing: { after: 0 },
        children: [new ImageRun({
          type: 'png', data: assets.watermark,
          transformation: { width: 706, height: 998 },
          floating: {
            horizontalPosition: { relative: HorizontalPositionRelativeFrom.PAGE, align: HorizontalPositionAlign.CENTER },
            verticalPosition: { relative: VerticalPositionRelativeFrom.PAGE, align: VerticalPositionAlign.CENTER },
            behindDocument: true, allowOverlap: true, wrap: { type: TextWrappingType.NONE },
          },
        })],
      }),
      new Table({
        visuallyRightToLeft: true, layout: TableLayoutType.FIXED,
        width: { size: TEXT_W, type: WidthType.DXA }, columnWidths: [half, TEXT_W - half], borders: NO_BORDERS,
        rows: [new TableRow({
          children: [
            new TableCell({
              width: { size: half, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ bidirectional: true, children: [
                new TextRun({ text: 'دليل ', size: 18, sizeComplexScript: 18, font: FONT, rightToLeft: true, color: C.text }),
                new TextRun({ text: 'KayanOS', size: 18, font: FONT, color: C.text }),
              ] })],
            }),
            new TableCell({
              width: { size: TEXT_W - half, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [
                new ImageRun({ type: 'png', data: assets.logo, transformation: { width: 118, height: 30 } }),
              ] })],
            }),
          ],
        })],
      }),
    ],
  });
}

function bodyFooter() {
  const half = Math.round(TEXT_W * 0.7);
  const small = { size: 16, sizeComplexScript: 16, color: C.muted, font: FONT };
  return new Footer({
    children: [new Table({
      visuallyRightToLeft: true, layout: TableLayoutType.FIXED,
      width: { size: TEXT_W, type: WidthType.DXA }, columnWidths: [half, TEXT_W - half], borders: NO_BORDERS,
      rows: [new TableRow({
        children: [
          new TableCell({
            width: { size: half, type: WidthType.DXA },
            children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [
              new TextRun({ ...small, text: 'rightcode.io  ·  KayanOS ' }),
              new TextRun({ ...small, text: 'دليل', rightToLeft: true }),
              new TextRun({ ...small, text: '  ·  RightCode' }),
            ] })],
          }),
          new TableCell({
            width: { size: TEXT_W - half, type: WidthType.DXA },
            children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [
              new TextRun({ ...small, children: [PageNumber.CURRENT, ' / ', PageNumber.TOTAL_PAGES] }),
            ] })],
          }),
        ],
      })],
    })],
  });
}

// ---------------------------------------------------------------- contents

function contents(blocks, ctx) {
  const entries = blocks.filter((b) => b.bookmark);
  const pageW = 1100;
  const rows = entries.map((b) => {
    const top = b.type === 'chapter';
    const base = top ? { bold: true, size: 22 } : { size: 21 };
    const label = top ? [new TextRun({ text: `${b.kicker}:  `, bold: true, boldComplexScript: true, color: C.primary, font: FONT, rightToLeft: true })]
      : [new TextRun({ text: b.number, font: FONT }), new TextRun({ text: '   ', rightToLeft: true })];
    return new TableRow({
      cantSplit: true,
      children: [
        new TableCell({
          width: { size: TEXT_W - pageW, type: WidthType.DXA },
          margins: { top: top ? 120 : 30, bottom: 30 },
          children: [new Paragraph({
            bidirectional: true, indent: top ? undefined : { start: 420 }, spacing: { after: 0 },
            children: [new InternalHyperlink({ anchor: b.bookmark, children: [...label, ...inline(b.title, ctx, base)] })],
          })],
        }),
        new TableCell({
          width: { size: pageW, type: WidthType.DXA },
          margins: { top: top ? 120 : 30, bottom: 30 },
          children: [new Paragraph({ alignment: AlignmentType.LEFT, spacing: { after: 0 },
            children: [new PageReference(b.bookmark, { hyperlink: true })] })],
        }),
      ],
    });
  });
  const dots = { style: BorderStyle.DOTTED, size: 4, color: C.border };
  return [
    new Paragraph({ bidirectional: true, spacing: { after: 240 }, children: [
      new TextRun({ text: 'المحتويات', size: 48, sizeComplexScript: 48, bold: true, boldComplexScript: true, color: C.text, font: FONT, rightToLeft: true }),
    ] }),
    new Table({
      visuallyRightToLeft: true, layout: TableLayoutType.FIXED,
      width: { size: TEXT_W, type: WidthType.DXA }, columnWidths: [TEXT_W - pageW, pageW],
      borders: { ...NO_BORDERS, insideHorizontal: dots },
      rows,
    }),
  ];
}

// ---------------------------------------------------------------- document

export async function renderDocx(doc, { root, images, outFile }) {
  const ctx = { labels: doc.labels, colors: LATEX_COLORS };
  let mark = 0;
  for (const b of doc.blocks) {
    if (b.type === 'chapter' || (b.type === 'heading' && b.level === 2)) b.bookmark = `kos_toc_${++mark}`;
  }
  const assets = {
    coverBg: fs.readFileSync(path.join(root, 'assets/cover-bg.png')),
    watermark: fs.readFileSync(path.join(root, 'assets/watermark-40.png')),
    logo: fs.readFileSync(path.join(root, 'assets/logo.png')),
  };
  const headingRun = (size, color) => ({ size, sizeComplexScript: size, bold: true, boldComplexScript: true, color, font: FONT, rightToLeft: true });
  const document = new Document({
    creator: 'RightCode',
    title: 'دليل KayanOS',
    features: { updateFields: true },
    styles: {
      default: {
        document: {
          run: { font: FONT, size: 22, sizeComplexScript: 22, color: C.text, language: { value: 'ar-SA', bidirectional: 'ar-SA' } },
          paragraph: { spacing: { after: 80, line: 276 } },
        },
        heading1: { run: headingRun(48, C.text), paragraph: { spacing: { before: 0, after: 80 }, keepNext: true } },
        heading2: { run: headingRun(36, C.primary), paragraph: { spacing: { before: 320, after: 120 }, keepNext: true } },
        heading3: { run: headingRun(28, C.text), paragraph: { spacing: { before: 200, after: 80 }, keepNext: true } },
      },
    },
    sections: [
      coverSection(doc.coverArgs, ctx, assets),
      {
        properties: { type: SectionType.NEXT_PAGE, page: { size: PAGE, margin: MARGIN } },
        headers: { default: bodyHeader(assets) },
        footers: { default: bodyFooter() },
        children: [
          ...contents(doc.blocks, ctx),
          ...renderBlocks(doc.blocks, ctx, images),
        ],
      },
    ],
  });
  fs.writeFileSync(outFile, await Packer.toBuffer(document));
}
