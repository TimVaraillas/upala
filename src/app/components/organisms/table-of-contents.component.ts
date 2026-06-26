import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  OnChanges,
  inject,
  input,
  signal,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { TocEntry } from '../../core/utils/markdown';

/** Interactive table of contents that highlights the current section on scroll. */
@Component({
  selector: 'upala-table-of-contents',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (entries().length) {
      <nav
        aria-label="Table des matières"
        class="sticky top-10 flex max-h-[calc(100vh-5rem)] flex-col"
      >
        <p class="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-400">
          Sommaire
        </p>
        <ul class="space-y-1 overflow-y-auto overscroll-contain border-l border-sand-200 pr-2">
          @for (entry of entries(); track entry.id) {
            <li>
              <a
                [href]="'#' + entry.id"
                (click)="scrollTo($event, entry.id)"
                [class]="linkClasses(entry)"
                [style.padding-left.rem]="indentFor(entry)"
              >
                {{ entry.text }}
              </a>
            </li>
          }
        </ul>
      </nav>
    }
  `,
})
export class TableOfContentsComponent implements AfterViewInit, OnChanges {
  readonly entries = input.required<TocEntry[]>();

  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly activeId = signal<string>('');

  private observer: IntersectionObserver | null = null;

  ngAfterViewInit(): void {
    this.observe();
  }

  ngOnChanges(): void {
    this.observe();
  }

  protected scrollTo(event: Event, id: string): void {
    event.preventDefault();
    const el = this.document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${id}`);
    }
  }

  /** Padding (rem) reflecting the heading depth relative to the shallowest one. */
  protected indentFor(entry: TocEntry): number {
    const depth = entry.level - this.minLevel();
    return 0.75 + depth * 0.875;
  }

  protected linkClasses(entry: TocEntry): string {
    const depth = entry.level - this.minLevel();
    const active = this.activeId() === entry.id;
    const base = 'block py-1 leading-snug transition-colors border-l-2 -ml-px';
    // Top-level entries read as headings; deeper ones get smaller and lighter.
    const scale =
      depth === 0
        ? 'text-sm font-medium'
        : depth === 1
          ? 'text-sm'
          : 'text-[0.8125rem]';
    const color = active
      ? 'border-moss-600 text-moss-700 font-medium'
      : 'border-transparent text-stone-500 hover:text-stone-800 hover:border-stone-300';
    return `${base} ${scale} ${color}`;
  }

  /** Shallowest heading level present, used as the indentation baseline. */
  private minLevel(): number {
    return this.entries().reduce((min, e) => Math.min(min, e.level), 6);
  }

  private observe(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.observer?.disconnect();

    const headings = this.entries()
      .map((e) => this.document.getElementById(e.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!headings.length) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        // Pick the first intersecting heading from top.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) {
          this.activeId.set(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 1 },
    );

    for (const heading of headings) {
      this.observer.observe(heading);
    }

    this.destroyRef.onDestroy(() => this.observer?.disconnect());
  }
}
