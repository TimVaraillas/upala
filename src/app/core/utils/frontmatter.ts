import { ArticleFrontmatter } from '../models/article.model';

export interface ParsedMarkdown {
  data: Partial<ArticleFrontmatter>;
  body: string;
}

/**
 * Minimal, dependency-free YAML frontmatter parser.
 *
 * Supports the subset of YAML used by Hors Sentier articles:
 * - `key: value` scalars
 * - inline arrays: `tags: [a, b, c]`
 * - block arrays:
 *     tags:
 *       - a
 *       - b
 */
export function parseFrontmatter(raw: string): ParsedMarkdown {
  const normalized = raw.replace(/\r\n/g, '\n');
  const match = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(normalized);

  if (!match) {
    return { data: {}, body: normalized.trim() };
  }

  const [, frontmatter, body] = match;
  const data: Record<string, unknown> = {};
  const lines = frontmatter.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith('#')) {
      continue;
    }

    const keyMatch = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(line);
    if (!keyMatch) {
      continue;
    }

    const key = keyMatch[1];
    let value = keyMatch[2].trim();

    // Block-style array (items on following indented lines).
    if (value === '') {
      const items: string[] = [];
      while (i + 1 < lines.length && /^\s*-\s+/.test(lines[i + 1])) {
        items.push(unquote(lines[++i].replace(/^\s*-\s+/, '').trim()));
      }
      data[key] = items;
      continue;
    }

    // Inline array: [a, b, c]
    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((item) => unquote(item.trim()))
        .filter(Boolean);
      continue;
    }

    data[key] = unquote(value);
  }

  return { data: data as Partial<ArticleFrontmatter>, body: body.trim() };
}

function unquote(value: string): string {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}
