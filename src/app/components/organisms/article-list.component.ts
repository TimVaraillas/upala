import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ArticleSummary } from '../../core/models/article.model';
import { ArticleCardComponent } from '../molecules/article-card.component';

/** Responsive grid of article cards with an empty state. */
@Component({
  selector: 'hs-article-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArticleCardComponent],
  template: `
    @if (articles().length) {
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        @for (article of articles(); track article.slug) {
          <hs-article-card [article]="article" />
        }
      </div>
    } @else {
      <div
        class="rounded-2xl border border-dashed border-sand-300 bg-sand-50 p-12 text-center"
      >
        <p class="text-stone-600">{{ emptyMessage() }}</p>
      </div>
    }
  `,
})
export class ArticleListComponent {
  readonly articles = input.required<ArticleSummary[]>();
  readonly emptyMessage = input('Aucun carnet pour le moment.');
}
