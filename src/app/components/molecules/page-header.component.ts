import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { HeadingComponent } from '../atoms/heading.component';

/** Page header with a title and an optional subtitle / lead describing the page. */
@Component({
  selector: 'upala-page-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeadingComponent],
  template: `
    <header class="mb-8 space-y-3">
      <upala-heading [level]="1">{{ title() }}</upala-heading>
      @if (subtitle()) {
        <p class="max-w-prose leading-relaxed text-stone-600 italic">
          {{ subtitle() }}
        </p>
      }
    </header>
  `,
})
export class PageHeaderComponent {
  /** Main page title. */
  readonly title = input.required<string>();

  /** Optional subtitle / caption summarising what the page is about. */
  readonly subtitle = input<string>('');
}
