import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

/**
 * Lazy-loaded, responsive image atom.
 *
 * Wraps `NgOptimizedImage` for automatic lazy loading, async decoding
 * and layout-stable rendering via explicit dimensions.
 */
@Component({
  selector: 'hs-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  template: `
    <img
      [ngSrc]="src()"
      [alt]="alt()"
      [width]="width()"
      [height]="height()"
      [priority]="priority()"
      [class]="imgClass()"
    />
  `,
})
export class ImageComponent {
  readonly src = input.required<string>();
  readonly alt = input('');
  readonly width = input(1200);
  readonly height = input(800);
  /** Set true only for above-the-fold hero images. */
  readonly priority = input(false);
  readonly imgClass = input('h-full w-full object-cover');
}
