import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Article } from '../../core/models/article.model';
import { ImageComponent } from '../atoms/image.component';
import { TagComponent } from '../atoms/tag.component';
import { HeadingComponent } from '../atoms/heading.component';
import { AuthorInfoComponent } from '../molecules/author-info.component';

/** Hero header for an article: cover image, title and metadata. */
@Component({
  selector: 'hs-article-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ImageComponent, TagComponent, HeadingComponent, AuthorInfoComponent],
  template: `
    <header class="space-y-6">
      <div class="flex flex-wrap gap-2">
        @for (tag of article().tags; track tag) {
          <hs-tag [label]="tag" />
        }
      </div>

      <hs-heading [level]="1">{{ article().title }}</hs-heading>

      <p class="max-w-2xl text-md italic leading-relaxed text-stone-600">
        {{ article().excerpt }}
      </p>

      <hs-author-info
        [author]="article().author ?? 'Hors Sentier'"
        [date]="article().date"
        [readingTime]="article().readingTime"
      />

      <div
        class="aspect-video overflow-hidden rounded-xl my-3  border border-sand-200"
      >
        <hs-image
          [src]="article().coverImage"
          [alt]="article().title"
          [width]="1280"
          [height]="720"
          [priority]="true"
        />
      </div>
    </header>
  `,
})
export class ArticleHeaderComponent {
  readonly article = input.required<Article>();
}
