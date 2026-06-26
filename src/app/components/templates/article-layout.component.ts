import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { PageHeaderComponent } from '../molecules/page-header.component';

/**
 * Centered, reading-optimized layout for a single article.
 * Renders an optional page header (when `title` is set) before the projected
 * `[header]`, default body, `[footer]` and an optional `[aside]` sidebar on the
 * right (e.g. for a table of contents).
 */
@Component({
  selector: 'upala-article-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent],
  template: `
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-[1fr_250px] lg:gap-10">
        <article class="mx-auto w-full max-w-3xl">
          <div class="space-y-10">
            @if (title()) {
              <upala-page-header [title]="title()" [subtitle]="subtitle()" />
            }
            <ng-content select="[header]" />
            <div class="space-y-6">
              <ng-content />
            </div>
            <ng-content select="[footer]" />
          </div>
        </article>
        <div class="hidden lg:block">
          <ng-content select="[aside]" />
        </div>
      </div>
    </div>
  `,
})
export class ArticleLayoutComponent {
  /** Optional page title; when set, a page header is rendered above the content. */
  readonly title = input<string>('');

  /** Optional page subtitle shown under the title. */
  readonly subtitle = input<string>('');
}
