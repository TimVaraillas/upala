import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoData {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article';
  tags?: string[];
  publishedTime?: string;
  author?: string;
}

const SITE_NAME = 'Hors Sentier';
const DEFAULT_DESCRIPTION =
  'Récits d’expédition, guides de trek et itinéraires de randonnée sur plusieurs jours.';

/**
 * Centralizes per-page SEO: title, meta description, OpenGraph and
 * Twitter card tags. Works under SSR so crawlers receive full metadata.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  update(data: SeoData): void {
    const fullTitle = data.title
      ? `${data.title} · ${SITE_NAME}`
      : SITE_NAME;
    const description = data.description || DEFAULT_DESCRIPTION;
    const image = data.image ?? '/og-default.jpg';
    const type = data.type ?? 'website';

    this.title.setTitle(fullTitle);

    this.setTag('name', 'description', description);
    if (data.author) {
      this.setTag('name', 'author', data.author);
    }
    if (data.tags?.length) {
      this.setTag('name', 'keywords', data.tags.join(', '));
    }

    // OpenGraph
    this.setTag('property', 'og:site_name', SITE_NAME);
    this.setTag('property', 'og:title', data.title || SITE_NAME);
    this.setTag('property', 'og:description', description);
    this.setTag('property', 'og:type', type);
    this.setTag('property', 'og:image', image);
    if (data.url) {
      this.setTag('property', 'og:url', data.url);
    }
    if (type === 'article') {
      if (data.publishedTime) {
        this.setTag('property', 'article:published_time', data.publishedTime);
      }
      for (const tag of data.tags ?? []) {
        this.meta.addTag({ property: 'article:tag', content: tag });
      }
    }

    // Twitter
    this.setTag('name', 'twitter:card', 'summary_large_image');
    this.setTag('name', 'twitter:title', data.title || SITE_NAME);
    this.setTag('name', 'twitter:description', description);
    this.setTag('name', 'twitter:image', image);

    this.setCanonical(data.url);
  }

  private setTag(
    attr: 'name' | 'property',
    key: string,
    content: string,
  ): void {
    this.meta.updateTag({ [attr]: key, content } as Record<string, string>);
  }

  private setCanonical(url?: string): void {
    if (!url) {
      return;
    }
    let link = this.document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
