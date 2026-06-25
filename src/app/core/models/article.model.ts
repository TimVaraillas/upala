/**
 * Frontmatter metadata stored at the top of every Markdown article.
 */
import { ArticleBlock, TocEntry } from '../utils/markdown';

export interface ArticleFrontmatter {
  title: string;
  date: string;
  tags: string[];
  coverImage: string;
  slug: string;
  excerpt?: string;
  author?: string;
  /** Destination country (top level of the destination hierarchy). */
  country?: string;
  /** Destination region within the country (second level). */
  region?: string;
}

/** A country node with its regions, used for the destination filter. */
export interface DestinationNode {
  country: string;
  count: number;
  regions: { region: string; count: number }[];
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
  /** Body split into renderable blocks (HTML + embeds such as GPX viewers). */
  blocks: ArticleBlock[];
  /** Table of contents extracted from headings. */
  toc: TocEntry[];
}
