import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Centered, reading-optimized layout for a single article.
 * Projects `[header]`, default body and `[footer]` content.
 */
@Component({
  selector: 'hs-article-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div class="space-y-10">
        <ng-content select="[header]" />
        <div class="space-y-6">
          <ng-content />
        </div>
        <ng-content select="[footer]" />
      </div>
    </article>
  `,
})
export class ArticleLayoutComponent {}
