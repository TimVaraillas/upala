import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** Fixed top reading-progress bar driven by scroll position. */
@Component({
  selector: 'hs-reading-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onScroll()',
    '(window:resize)': 'onScroll()',
  },
  template: `
    <div
      class="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-moss-600 transition-transform duration-75"
      [style.transform]="'scaleX(' + progress() + ')'"
      role="progressbar"
      aria-label="Progression de lecture"
    ></div>
  `,
})
export class ReadingProgressComponent {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  protected readonly progress = signal(0);

  protected onScroll(): void {
    if (!this.isBrowser) {
      return;
    }
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - doc.clientHeight;
    this.progress.set(scrollable > 0 ? doc.scrollTop / scrollable : 0);
  }
}
