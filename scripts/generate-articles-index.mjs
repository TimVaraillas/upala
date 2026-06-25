// @ts-check
/**
 * Generates `content/articles/index.json` — a manifest of article summaries
 * consumed by `BlogService` for fast listings and by the SSR prerenderer for
 * static article routes.
 *
 * Run via `npm run content:index` (also wired into `prestart` / `prebuild`).
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ARTICLES_DIR = join(__dirname, '..', 'content', 'articles');

/** Minimal YAML frontmatter parser (mirrors src/app/core/utils/frontmatter.ts). */
function parseFrontmatter(raw) {
  const normalized = raw.replace(/\r\n/g, '\n');
  const match = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(normalized);
  if (!match) return { data: {}, body: normalized.trim() };

  const [, frontmatter, body] = match;
  const data = {};
  const lines = frontmatter.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const keyMatch = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(line);
    if (!keyMatch) continue;

    const key = keyMatch[1];
    const value = keyMatch[2].trim();

    if (value === '') {
      const items = [];
      while (i + 1 < lines.length && /^\s*-\s+/.test(lines[i + 1])) {
        items.push(unquote(lines[++i].replace(/^\s*-\s+/, '').trim()));
      }
      data[key] = items;
    } else if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((s) => unquote(s.trim()))
        .filter(Boolean);
    } else {
      data[key] = unquote(value);
    }
  }
  return { data, body: body.trim() };
}

function unquote(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function excerptFromMarkdown(markdown, maxLength = 160) {
  const text = markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, text.lastIndexOf(' ', maxLength)).trim() + '…';
}

function estimateReadingTime(markdown) {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

async function main() {
  const files = (await readdir(ARTICLES_DIR)).filter((f) => f.endsWith('.md'));
  const articles = [];

  for (const file of files) {
    const raw = await readFile(join(ARTICLES_DIR, file), 'utf-8');
    const { data, body } = parseFrontmatter(raw);
    const slug = data.slug || file.replace(/\.md$/, '');

    articles.push({
      title: data.title || slug,
      date: data.date || new Date().toISOString().slice(0, 10),
      tags: data.tags || [],
      coverImage: data.coverImage || '',
      slug,
      author: data.author || 'Un pas après l’autre',
      excerpt: data.excerpt || excerptFromMarkdown(body),
      readingTime: estimateReadingTime(body),
      ...(data.country ? { country: data.country } : {}),
      ...(data.region ? { region: data.region } : {}),
    });
  }

  articles.sort((a, b) => +new Date(b.date) - +new Date(a.date));

  await writeFile(
    join(ARTICLES_DIR, 'index.json'),
    JSON.stringify(articles, null, 2) + '\n',
    'utf-8',
  );

  console.log(`✓ Generated index.json with ${articles.length} article(s).`);
}

main().catch((error) => {
  console.error('Failed to generate article index:', error);
  process.exit(1);
});
