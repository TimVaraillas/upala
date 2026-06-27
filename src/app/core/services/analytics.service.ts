import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare let gtag: (...args: unknown[]) => void;

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly platformId = inject(PLATFORM_ID);

  trackPageView(url: string, title?: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    gtag('event', 'page_view', {
      page_path: url,
      page_title: title,
    });
  }

  trackGpxDownload(params: { title?: string; trackName?: string; fileName: string; src: string }): void {
    if (!isPlatformBrowser(this.platformId)) return;

    gtag('event', 'download_gpx', {
      track: params.title || params.trackName || params.fileName,
      file_name: params.fileName,
      gpx_src: params.src,
    });
  }

  trackGalleryOpen(params: {
    article: string;
    index: number;
    src: string;
    caption?: string;
  }): void {
    if (!isPlatformBrowser(this.platformId)) return;

    gtag('event', 'open_gallery', {
      article: params.article,
      photo_position: params.index + 1,
      photo_src: params.src,
      photo_caption: params.caption || undefined,
    });
  }

  trackArticlesFilter(filters: { tags?: string[]; country?: string; region?: string }): void {
    if (!isPlatformBrowser(this.platformId)) return;

    gtag('event', 'filter_articles', {
      tags: filters.tags?.length ? filters.tags.join(',') : undefined,
      country: filters.country || undefined,
      region: filters.region || undefined,
    });
  }
}
