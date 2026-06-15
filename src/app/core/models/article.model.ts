/**
 * Frontmatter metadata stored at the top of every Markdown article.
 */
export interface ArticleFrontmatter {
  title: string;
  date: string;
  tags: string[];
  coverImage: string;
  slug: string;
  excerpt?: string;
  author?: string;
}

/**
 * Lightweight article representation used for listings (no body).
 */
export interface ArticleSummary extends ArticleFrontmatter {
  excerpt: string;
  readingTime: number;
}

/**
 * Full article including the rendered Markdown body.
 */
export interface Article extends ArticleSummary {
  /** Raw Markdown body (frontmatter stripped). */
  markdown: string;
  /** Rendered, sanitized HTML body. */
  html: string;
}
