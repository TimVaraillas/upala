import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

type LogoVariant = 'full' | 'inline' | 'type';

const SOURCES: Record<LogoVariant, string> = {
  full: '/content/images/upala-logo-full.svg',
  inline: '/content/images/upala-logo-inline.svg',
  type: '/content/images/upala-logo-type.svg',
};

/** Intrinsic width/height ratio of each SVG (from its viewBox). */
const RATIOS: Record<LogoVariant, string> = {
  full: '238.23 / 129.54',
  inline: '238.26 / 38.59',
  type: '112.2 / 21.86',
};

/** Brand logo atom rendering one of the Upala SVG variants. */
@Component({
  selector: 'upala-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
  template: `
    @if (fill()) {
      <span
        role="img"
        [attr.aria-label]="alt()"
        [class]="maskClass()"
        [style.display]="'inline-block'"
        [style.aspect-ratio]="ratio()"
        [style.-webkit-mask-image]="maskUrl()"
        [style.mask-image]="maskUrl()"
        [style.-webkit-mask-repeat]="'no-repeat'"
        [style.mask-repeat]="'no-repeat'"
        [style.-webkit-mask-position]="'center'"
        [style.mask-position]="'center'"
        [style.-webkit-mask-size]="'contain'"
        [style.mask-size]="'contain'"
      ></span>
    } @else {
      <img [src]="src()" [alt]="alt()" [class]="imgClass()" decoding="async" />
    }
  `,
})
export class LogoComponent {
  /** Which logo asset to render. */
  readonly variant = input<LogoVariant>('inline');
  readonly alt = input('Upala');
  readonly imgClass = input('h-auto w-full');
  /** Tailwind background-color utility used to recolor the SVG logo (e.g. 'bg-emerald-500'). */
  readonly fill = input<string | null>(null);

  protected readonly src = computed(() => SOURCES[this.variant()]);
  protected readonly ratio = computed(() => RATIOS[this.variant()]);
  protected readonly maskUrl = computed(() => `url("${this.src()}")`);
  protected readonly maskClass = computed(() => `${this.imgClass()} ${this.fill()}`.trim());
}
