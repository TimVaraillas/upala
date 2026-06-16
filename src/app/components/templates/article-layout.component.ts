import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Centered, reading-optimized layout for a single article.
 * Projects `[header]`, default body, `[footer]` and an optional `[aside]`
 * sidebar on the right (e.g. for a table of contents).
 */
@Component({
  selector: 'hs-article-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-[1fr_250px] lg:gap-10">
        <article class="mx-auto w-full max-w-3xl">
          <div class="space-y-10">
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
export class ArticleLayoutComponent {}
