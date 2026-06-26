import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Article } from '../../core/models/article.model';
import { ImageComponent } from '../atoms/image.component';
import { AuthorInfoComponent } from '../molecules/author-info.component';

/** Hero header for an article: author metadata and cover image. */
@Component({
  selector: 'upala-article-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ImageComponent, AuthorInfoComponent],
  template: `
    <div class="space-y-6 pt-8">
      <upala-author-info
        [author]="article().author ?? 'Un pas après l’autre'"
        [date]="article().date"
        [readingTime]="article().readingTime"
      />

      <div
        class="aspect-video overflow-hidden rounded-xl my-3  border border-sand-200"
      >
        <upala-image
          [src]="article().coverImage"
          [alt]="article().title"
          [width]="1280"
          [height]="720"
          [priority]="true"
        />
      </div>
    </div>
  `,
})
export class ArticleHeaderComponent {
  readonly article = input.required<Article>();
}
