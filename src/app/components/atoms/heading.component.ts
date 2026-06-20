import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Typographic heading atom with consistent scale across the site. */
@Component({
  selector: 'hs-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  template: `
    <ng-template #content><ng-content /></ng-template>
    @switch (level()) {
      @case (1) {
        <h1 [class]="classes()"><ng-container [ngTemplateOutlet]="content" /></h1>
      }
      @case (2) {
        <h2 [class]="classes()"><ng-container [ngTemplateOutlet]="content" /></h2>
      }
      @case (3) {
        <h3 [class]="classes()"><ng-container [ngTemplateOutlet]="content" /></h3>
      }
      @default {
        <h4 [class]="classes()"><ng-container [ngTemplateOutlet]="content" /></h4>
      }
    }
  `,
})
export class HeadingComponent {
  readonly level = input<1 | 2 | 3 | 4>(2);

  protected readonly classes = computed(() => {
    const base = 'mb-6 font-display font-semibold tracking-tight text-stone-900';
    const scale: Record<number, string> = {
      1: 'text-4xl sm:text-5xl leading-tight',
      2: 'text-3xl sm:text-4xl',
      3: 'text-2xl',
      4: 'text-xl',
    };
    return `${base} ${scale[this.level()]}`;
  });
}
