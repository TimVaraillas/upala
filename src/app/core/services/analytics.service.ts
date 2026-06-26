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

  trackGpxDownload(stage: string | number): void {
    if (!isPlatformBrowser(this.platformId)) return;

    gtag('event', 'download_gpx', { stage });
  }

  trackGalleryOpen(article: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    gtag('event', 'open_gallery', { article });
  }
}
