/**
 * Tiny, dependency-free Markdown -> HTML renderer.
 *
 * Intentionally covers the common subset used by trekking guides and
 * expedition stories: headings, paragraphs, bold/italic/code, links,
 * images (lazy-loaded), ordered/unordered lists, blockquotes, horizontal
 * rules and fenced code blocks. For richer needs swap in a library such as
 * `marked` behind this same function signature.
 */

/** A rendered chunk of an article: either inline HTML or an embed. */
export type ArticleBlock =
  | { type: 'html'; html: string }
  | { type: 'gpx'; src: string; title?: string };

/** A single entry in the table of contents. */
export interface TocEntry {
  id: string;
  text: string;
  level: number;
}

/**
 * Split a Markdown document into renderable blocks, extracting custom
 * ` ```gpx ` fenced shortcodes so they can be rendered by an Angular
 * component (a GPX map viewer) instead of being injected as raw HTML.
 *
 * GPX shortcode syntax:
 * ```gpx
 * src: /content/tracks/my-trek.gpx
 * title: Optional caption
 * ```
 */
export function parseBlocks(markdown: string): ArticleBlock[] {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks: ArticleBlock[] = [];
  let buffer: string[] = [];
  // Shared across every block so duplicate headings get globally-unique ids
  // that stay in sync with `extractToc`.
  const headingSlugs = new Map<string, number>();

  const flushMarkdown = () => {
    const text = buffer.join('\n').trim();
    if (text) {
      blocks.push({ type: 'html', html: renderMarkdown(text, headingSlugs) });
    }
    buffer = [];
  };

  for (let i = 0; i < lines.length; i++) {
    if (/^```gpx\s*$/.test(lines[i].trim())) {
      flushMarkdown();
      const meta: Record<string, string> = {};
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i].trim())) {
        const kv = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(lines[i].trim());
        if (kv) {
          meta[kv[1]] = kv[2].trim();
        }
        i++;
      }
      if (meta['src']) {
        blocks.push({ type: 'gpx', src: meta['src'], title: meta['title'] });
      }
      continue;
    }
    buffer.push(lines[i]);
  }

  flushMarkdown();
  return blocks;
}

export function renderMarkdown(
  markdown: string,
  headingSlugs: Map<string, number> = new Map<string, number>(),
): string {
  const source = markdown.replace(/\r\n/g, '\n');
  const lines = source.split('\n');
  const html: string[] = [];

  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let paragraph: string[] = [];
  let tableBuffer: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      html.push(`<p>${inline(paragraph.join(' '))}</p>`);
      paragraph = [];
    }
  };

  const closeList = () => {
    if (listType) {
      html.push(`</${listType}>`);
      listType = null;
    }
  };

  const isTableRow = (value: string) => /^\s*\|.*\|\s*$/.test(value);

  const tableCells = (row: string) =>
    row
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((cell) => cell.trim());

  const flushTable = () => {
    if (!tableBuffer.length) return;
    const rows = tableBuffer;
    tableBuffer = [];

    const delimiterCells = rows.length > 1 ? tableCells(rows[1]) : [];
    const isTable =
      rows.length >= 2 &&
      delimiterCells.length > 0 &&
      delimiterCells.every((cell) => /^:?-+:?$/.test(cell));

    if (!isTable) {
      for (const row of rows) html.push(`<p>${inline(row.trim())}</p>`);
      return;
    }

    const aligns = delimiterCells.map((cell) => {
      const left = cell.startsWith(':');
      const right = cell.endsWith(':');
      if (left && right) return 'center';
      if (right) return 'right';
      if (left) return 'left';
      return '';
    });
    const alignAttr = (index: number) =>
      aligns[index] ? ` style="text-align:${aligns[index]}"` : '';

    const header = tableCells(rows[0]);
    const bodyRows = rows.slice(2).map(tableCells);

    let table = '<table><thead><tr>';
    header.forEach((cell, index) => {
      table += `<th${alignAttr(index)}>${inline(cell)}</th>`;
    });
    table += '</tr></thead><tbody>';
    for (const row of bodyRows) {
      table += '<tr>';
      for (let index = 0; index < header.length; index++) {
        table += `<td${alignAttr(index)}>${inline(row[index] ?? '')}</td>`;
      }
      table += '</tr>';
    }
    table += '</tbody></table>';
    html.push(table);
  };

  for (const line of lines) {
    // Flush any pending table once the current line is no longer a table row.
    if (tableBuffer.length && (inCodeBlock || !isTableRow(line))) {
      flushTable();
    }

    // Fenced code blocks.
    const fence = /^```(.*)$/.exec(line);
    if (fence) {
      if (inCodeBlock) {
        html.push(`<pre><code>${escapeHtml(codeBuffer.join('\n'))}</code></pre>`);
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        flushParagraph();
        closeList();
        inCodeBlock = true;
      }
      continue;
    }
    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    // Blank line ends paragraphs and lists.
    if (!line.trim()) {
      flushParagraph();
      closeList();
      continue;
    }

    // Horizontal rule.
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
      flushParagraph();
      closeList();
      html.push('<hr />');
      continue;
    }

    // Headings.
    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    if (heading) {
      flushParagraph();
      closeList();
      const level = heading[1].length;
      const text = heading[2].trim();
      let id = slugify(text);
      const count = headingSlugs.get(id) ?? 0;
      headingSlugs.set(id, count + 1);
      if (count > 0) id += `-${count}`;
      html.push(`<h${level} id="${id}">${inline(text)}</h${level}>`);
      continue;
    }

    // Blockquote.
    const quote = /^>\s?(.*)$/.exec(line);
    if (quote) {
      flushParagraph();
      closeList();
      html.push(`<blockquote>${inline(quote[1])}</blockquote>`);
      continue;
    }

    // Unordered list item.
    const ul = /^\s*[-*+]\s+(.*)$/.exec(line);
    if (ul) {
      flushParagraph();
      if (listType !== 'ul') {
        closeList();
        html.push('<ul>');
        listType = 'ul';
      }
      html.push(`<li>${inline(ul[1])}</li>`);
      continue;
    }

    // Ordered list item.
    const ol = /^\s*\d+\.\s+(.*)$/.exec(line);
    if (ol) {
      flushParagraph();
      if (listType !== 'ol') {
        closeList();
        html.push('<ol>');
        listType = 'ol';
      }
      html.push(`<li>${inline(ol[1])}</li>`);
      continue;
    }

    // Table row (GFM pipe tables).
    if (isTableRow(line)) {
      flushParagraph();
      closeList();
      tableBuffer.push(line);
      continue;
    }

    paragraph.push(line.trim());
  }

  flushParagraph();
  closeList();
  flushTable();
  if (inCodeBlock) {
    html.push(`<pre><code>${escapeHtml(codeBuffer.join('\n'))}</code></pre>`);
  }

  return html.join('\n');
}

/** Render inline-level Markdown (bold, italic, code, links, images). */
function inline(text: string): string {
  let out = escapeHtml(text);

  // Images: ![alt](src) — lazy-loaded.
  out = out.replace(
    /!\[([^\]]*)\]\(([^)\s]+)\)/g,
    (_m, alt, src) => `<img src="${src}" alt="${alt}" loading="lazy" decoding="async" />`,
  );

  // Links: [label](href)
  out = out.replace(
    /\[([^\]]+)\]\(([^)\s]+)\)/g,
    (_m, label, href) => `<a href="${href}">${label}</a>`,
  );

  // Inline code.
  out = out.replace(/`([^`]+)`/g, (_m, code) => `<code>${code}</code>`);

  // Bold then italic.
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  out = out.replace(/_([^_]+)_/g, '<em>$1</em>');

  return out;
}

/** Turn a heading text into a URL-friendly slug. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Extract a table of contents from Markdown source. */
export function extractToc(markdown: string): TocEntry[] {
  const toc: TocEntry[] = [];
  const slugCounts = new Map<string, number>();
  let inCodeBlock = false;
  for (const line of markdown.replace(/\r\n/g, '\n').split('\n')) {
    // Skip fenced code blocks (including ```gpx shortcodes) so the TOC stays
    // aligned with the headings that are actually rendered.
    if (/^```/.test(line.trim())) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = /^(#{1,6})\s+(.*)$/.exec(line);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      let id = slugify(text);
      const count = slugCounts.get(id) ?? 0;
      slugCounts.set(id, count + 1);
      if (count > 0) id += `-${count}`;
      toc.push({ id, text, level });
    }
  }
  return toc;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Build a plain-text excerpt from a Markdown body. */
export function excerptFromMarkdown(markdown: string, maxLength = 160): string {
  const text = markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, text.lastIndexOf(' ', maxLength)).trim() + '…';
}

/** Estimate reading time in minutes (~200 words/minute). */
export function estimateReadingTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
