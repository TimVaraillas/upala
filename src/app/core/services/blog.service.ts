import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, shareReplay, switchMap } from 'rxjs';

import { Article, ArticleSummary } from '../models/article.model';
import { parseFrontmatter } from '../utils/frontmatter';
import {
  estimateReadingTime,
  excerptFromMarkdown,
  renderMarkdown,
} from '../utils/markdown';

/**
 * Loads Markdown-based content statically served from `/content/articles`.
 *
 * - `index.json` is a build-time generated manifest of article summaries
 *   (see `scripts/generate-articles-index.mjs`).
 * - Individual `.md` files are fetched on demand for the full article body.
 *
 * No backend or database is involved: everything ships as static assets.
 */
@Injectable({ providedIn: 'root' })
export class BlogService {
  private readonly http = inject(HttpClient);

  private readonly contentBase = '/content/articles';

  private readonly summaries$ = this.http
    .get<ArticleSummary[]>(`${this.contentBase}/index.json`)
    .pipe(
      map((articles) =>
        [...articles].sort((a, b) => +new Date(b.date) - +new Date(a.date)),
      ),
      shareReplay({ bufferSize: 1, refCount: false }),
    );

  /** All article summaries, newest first. */
  getArticles(): Observable<ArticleSummary[]> {
    return this.summaries$;
  }

  /** The latest `count` articles for the home page. */
  getLatestArticles(count = 3): Observable<ArticleSummary[]> {
    return this.summaries$.pipe(map((articles) => articles.slice(0, count)));
  }

  /** Articles filtered by tag (case-insensitive). */
  getArticlesByTag(tag: string): Observable<ArticleSummary[]> {
    const needle = tag.toLowerCase();
    return this.summaries$.pipe(
      map((articles) =>
        articles.filter((a) => a.tags.some((t) => t.toLowerCase() === needle)),
      ),
    );
  }

  /** Distinct tags with their article counts, sorted by frequency. */
  getTags(): Observable<{ tag: string; count: number }[]> {
    return this.summaries$.pipe(
      map((articles) => {
        const counts = new Map<string, number>();
        for (const article of articles) {
          for (const tag of article.tags) {
            counts.set(tag, (counts.get(tag) ?? 0) + 1);
          }
        }
        return [...counts.entries()]
          .map(([tag, count]) => ({ tag, count }))
          .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
      }),
    );
  }

  /** Fetch and render a single article by slug. */
  getArticle(slug: string): Observable<Article | null> {
    return this.summaries$.pipe(
      switchMap((summaries) => {
        const summary = summaries.find((a) => a.slug === slug);
        if (!summary) {
          return of(null);
        }
        return this.http
          .get(`${this.contentBase}/${slug}.md`, { responseType: 'text' })
          .pipe(map((raw) => this.toArticle(raw, summary)));
      }),
    );
  }

  private toArticle(raw: string, fallback: ArticleSummary): Article {
    const { data, body } = parseFrontmatter(raw);
    const markdown = body;
    return {
      title: data.title ?? fallback.title,
      date: data.date ?? fallback.date,
      tags: data.tags ?? fallback.tags,
      coverImage: data.coverImage ?? fallback.coverImage,
      slug: data.slug ?? fallback.slug,
      author: data.author ?? fallback.author,
      excerpt: data.excerpt ?? fallback.excerpt ?? excerptFromMarkdown(markdown),
      readingTime: estimateReadingTime(markdown),
      markdown,
      html: renderMarkdown(markdown),
    };
  }
}
