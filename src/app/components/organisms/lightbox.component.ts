import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { PhotoItem } from '../../core/utils/markdown';

/**
 * Fullscreen lightbox / carousel overlay.
 * Rendered as a fixed overlay above all page content.
 * Supports keyboard navigation (ArrowLeft / ArrowRight / Escape).
 */
@Component({
  selector: 'upala-lightbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fixed inset-0 z-50',
    role: 'dialog',
    'aria-modal': 'true',
    'aria-label': 'Visionneuse de photos',
  },
  template: `
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/90 backdrop-blur-md" (click)="closed.emit()" aria-hidden="true"></div>

    <!-- Image + controls -->
    <div class="relative z-10 flex h-full w-full flex-col items-center justify-center gap-4 px-16 py-8">
      <img
        [src]="current().src"
        [alt]="current().caption ?? ''"
        class="max-h-[82vh] max-w-full rounded-lg object-contain shadow-2xl"
      />

      @if (current().caption) {
        <p class="text-center text-sm text-stone-300 italic">{{ current().caption }}</p>
      }

      @if (images().length > 1) {
        <!-- Navigation dots -->
        <div class="flex gap-2">
          @for (img of images(); track img.src; let i = $index) {
            <button
              class="h-2 w-2 rounded-full transition-colors"
              [class.bg-white]="i === activeIndex()"
              [class.bg-white/30]="i !== activeIndex()"
              (click)="activeIndex.set(i)"
              [attr.aria-label]="'Image ' + (i + 1)"
            ></button>
          }
        </div>
        <p class="text-xs text-stone-500">{{ activeIndex() + 1 }} / {{ images().length }}</p>
      }
    </div>

    <!-- Close button -->
    <button
      class="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
      (click)="closed.emit()"
      aria-label="Fermer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-5 w-5"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    @if (images().length > 1) {
      <!-- Previous -->
      <button
        class="absolute left-2 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 disabled:opacity-20"
        (click)="prev()"
        [disabled]="activeIndex() === 0"
        aria-label="Image précédente"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <!-- Next -->
      <button
        class="absolute right-2 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 disabled:opacity-20"
        (click)="next()"
        [disabled]="activeIndex() === images().length - 1"
        aria-label="Image suivante"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    }
  `,
})
export class LightboxComponent implements OnInit, OnDestroy {
  private readonly document = inject(DOCUMENT);

  readonly images = input.required<PhotoItem[]>();
  readonly startIndex = input.required<number>();
  readonly closed = output<void>();

  readonly activeIndex = signal(0);
  readonly current = computed(() => this.images()[this.activeIndex()]);

  ngOnInit(): void {
    this.activeIndex.set(this.startIndex());
    this.document.body.style.overflow = 'hidden';
  }

  ngOnDestroy(): void {
    this.document.body.style.overflow = '';
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Escape') this.closed.emit();
    if (e.key === 'ArrowLeft') this.prev();
    if (e.key === 'ArrowRight') this.next();
  }

  prev(): void {
    if (this.activeIndex() > 0) this.activeIndex.update((i) => i - 1);
  }

  next(): void {
    if (this.activeIndex() < this.images().length - 1) this.activeIndex.update((i) => i + 1);
  }
}
