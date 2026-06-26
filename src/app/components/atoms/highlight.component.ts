import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Inline atom highlighting a snippet of text within a paragraph. */
@Component({
  selector: 'upala-highlight',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span [class]="classes()"><ng-content /></span>`,
})
export class HighlightComponent {
  /** Visual treatment of the highlighted text. */
  readonly variant = input<'marker' | 'underline' | 'badge' | 'bold'>('marker');
  /** Color tone applied to the highlight. */
  readonly tone = input<'moss' | 'sand' | 'amber'>('moss');

  protected readonly classes = computed(() => {
    const base = 'font-medium';

    const tones = {
      moss: {
        marker: 'bg-moss-100 text-moss-900',
        underline: 'text-moss-800 decoration-moss-500',
        badge: 'bg-moss-800 text-sand-50',
        bold: 'text-moss-800',
      },
      sand: {
        marker: 'bg-sand-200 text-stone-800',
        underline: 'text-stone-800 decoration-sand-500',
        badge: 'bg-stone-800 text-sand-50',
        bold: 'text-stone-900',
      },
      amber: {
        marker: 'bg-amber-100 text-amber-900',
        underline: 'text-amber-800 decoration-amber-500',
        badge: 'bg-amber-600 text-white',
        bold: 'text-amber-700',
      },
    } as const;

    const variants = {
      marker: 'rounded px-1 py-0.5',
      underline: 'underline decoration-2 underline-offset-2',
      badge: 'inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-semibold',
      bold: 'font-semibold',
    } as const;

    return `${base} ${variants[this.variant()]} ${tones[this.tone()][this.variant()]}`;
  });
}
