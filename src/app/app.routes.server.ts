import { RenderMode, ServerRoute } from '@angular/ssr';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Reads the build-time article manifest from disk so every article route
 * can be statically prerendered (SSG). Falls back to an empty list if the
 * manifest is missing (e.g. before `npm run content:index` has run).
 */
async function getArticleSlugs(): Promise<{ slug: string }[]> {
  try {
    const manifestPath = join(process.cwd(), 'content/articles/index.json');
    const raw = await readFile(manifestPath, 'utf-8');
    const articles = JSON.parse(raw) as { slug: string }[];
    return articles.map(({ slug }) => ({ slug }));
  } catch {
    return [];
  }
}

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'blog', renderMode: RenderMode.Prerender },
  { path: 'about', renderMode: RenderMode.Prerender },
  {
    path: 'article/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: getArticleSlugs,
  },
  { path: '**', renderMode: RenderMode.Server },
];
