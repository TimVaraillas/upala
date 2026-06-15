// @ts-check
/**
 * Generates `public/sitemap.xml` from the article manifest plus the static
 * routes. Run via `npm run content:sitemap` (wired into `prebuild`).
 *
 * Set the canonical origin through the `SITE_URL` env var, e.g.
 *   SITE_URL=https://hors-sentier.com npm run build
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ORIGIN = (process.env.SITE_URL || 'https://hors-sentier.example').replace(
  /\/$/,
  '',
);

async function main() {
  /** @type {{ slug: string; date: string }[]} */
  let articles = [];
  try {
    const raw = await readFile(
      join(ROOT, 'content/articles/index.json'),
      'utf-8',
    );
    articles = JSON.parse(raw);
  } catch {
    // No manifest yet — emit a sitemap with static routes only.
  }

  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    { loc: '/', lastmod: today, priority: '1.0' },
    { loc: '/blog', lastmod: today, priority: '0.8' },
    { loc: '/about', lastmod: today, priority: '0.5' },
    ...articles.map((a) => ({
      loc: `/article/${a.slug}`,
      lastmod: a.date || today,
      priority: '0.7',
    })),
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(
      (u) =>
        `  <url>\n    <loc>${ORIGIN}${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>`,
    ),
    '</urlset>',
    '',
  ].join('\n');

  await mkdir(join(ROOT, 'public'), { recursive: true });
  await writeFile(join(ROOT, 'public', 'sitemap.xml'), xml, 'utf-8');
  console.log(`✓ Generated sitemap.xml with ${urls.length} URL(s).`);
}

main().catch((error) => {
  console.error('Failed to generate sitemap:', error);
  process.exit(1);
});
