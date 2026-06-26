import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

import { PhotoItem } from '../../core/utils/markdown';
import { LightboxComponent } from './lightbox.component';

/**
 * Renders a responsive photo grid embedded inside an article.
 *
 * Supports three layouts driven by the `layout` input:
 *  - `1` — single photo, full width with optional caption.
 *  - `2` — two photos side by side (equal columns).
 *  - `3` — three photos: one large left + two stacked right.
 */
@Component({
  selector: 'upala-photo-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LightboxComponent],
  template: `
    <figure class="not-prose my-8">
      @switch (layout()) {
        @case (2) {
          <div class="grid grid-cols-2 gap-2 sm:gap-3">
            @for (photo of images(); track photo.src; let i = $index) {
              <div
                class="overflow-hidden rounded-lg cursor-pointer"
                role="button"
                tabindex="0"
                (click)="openLightbox(i)"
                (keyup.enter)="openLightbox(i)"
              >
                <img
                  [src]="photo.src"
                  [alt]="photo.caption ?? ''"
                  loading="lazy"
                  decoding="async"
                  [style.height]="maxHeight() ?? '18rem'"
                  class="w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            }
          </div>
          @if (hasAnyCaptions()) {
            <figcaption class="mt-2 grid grid-cols-2 gap-2 sm:gap-3">
              @for (photo of images(); track photo.src) {
                <p class="text-center text-xs text-stone-500 italic">{{ photo.caption ?? '' }}</p>
              }
            </figcaption>
          }
        }

        @case (3) {
          <div class="grid grid-cols-3 gap-2 sm:gap-3">
            @for (photo of images(); track photo.src; let i = $index) {
              <div
                class="overflow-hidden rounded-lg cursor-pointer"
                role="button"
                tabindex="0"
                (click)="openLightbox(i)"
                (keyup.enter)="openLightbox(i)"
              >
                <img
                  [src]="photo.src"
                  [alt]="photo.caption ?? ''"
                  loading="lazy"
                  decoding="async"
                  [style.height]="maxHeight() ?? '18rem'"
                  class="w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            }
          </div>
          @if (hasAnyCaptions()) {
            <figcaption class="mt-2 grid grid-cols-3 gap-2 sm:gap-3">
              @for (photo of images(); track photo.src) {
                <p class="text-center text-xs text-stone-500 italic">{{ photo.caption ?? '' }}</p>
              }
            </figcaption>
          }
        }

        @default {
          <!-- layout: 1 — single photo -->
          <div
            class="overflow-hidden rounded-lg cursor-pointer"
            role="button"
            tabindex="0"
            (click)="openLightbox(0)"
            (keyup.enter)="openLightbox(0)"
          >
            <img
              [src]="images()[0].src"
              [alt]="images()[0].caption ?? ''"
              loading="lazy"
              decoding="async"
              [style.height]="maxHeight() ?? null"
              class="w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          @if (images()[0].caption) {
            <figcaption class="mt-2 text-center text-xs text-stone-500 italic">
              {{ images()[0].caption }}
            </figcaption>
          }
        }
      }

      @if (lightboxIndex() !== null) {
        <upala-lightbox
          [images]="images()"
          [startIndex]="lightboxIndex() ?? 0"
          (closed)="lightboxIndex.set(null)"
        />
      }
    </figure>
  `,
})
export class PhotoGridComponent {
  readonly layout = input<1 | 2 | 3>(1);
  readonly images = input.required<PhotoItem[]>();
  /** CSS height value applied to every image (e.g. '18rem', '256px'). Defaults to 18rem. */
  readonly maxHeight = input<string>();

  readonly lightboxIndex = signal<number | null>(null);

  openLightbox(index: number): void {
    this.lightboxIndex.set(index);
  }

  hasAnyCaptions(): boolean {
    return this.images().some((img) => !!img.caption);
  }
}
