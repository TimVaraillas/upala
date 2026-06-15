import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Body / lead paragraph atom with readable measure. */
@Component({
  selector: 'hs-paragraph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<p [class]="classes()"><ng-content /></p>`,
})
export class ParagraphComponent {
  readonly variant = input<'body' | 'lead' | 'muted'>('body');

  protected readonly classes = computed(() => {
    const variants = {
      body: 'text-base leading-relaxed text-stone-700',
      lead: 'text-lg sm:text-xl leading-relaxed text-stone-600',
      muted: 'text-sm leading-relaxed text-stone-500',
    } as const;
    return `max-w-prose ${variants[this.variant()]}`;
  });
}
