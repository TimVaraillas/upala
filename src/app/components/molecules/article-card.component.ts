import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ArticleSummary } from '../../core/models/article.model';
import { ImageComponent } from '../atoms/image.component';
import { TagComponent } from '../atoms/tag.component';
import { IconComponent } from '../atoms/icon.component';

/** Card combining cover image, title, excerpt, tags and metadata. */
@Component({
  selector: 'hs-article-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, DatePipe, ImageComponent, TagComponent, IconComponent],
  template: `
    <article
      class="group flex h-full flex-col overflow-hidden rounded-2xl border border-sand-200 bg-white transition-shadow hover:shadow-lg hover:shadow-stone-200/60"
    >
      <a
        [routerLink]="['/article', article().slug]"
        class="block aspect-[16/10] overflow-hidden"
      >
        <hs-image
          [src]="article().coverImage"
          [alt]="article().title"
          [width]="640"
          [height]="400"
          imgClass="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </a>

      <div class="flex flex-1 flex-col gap-3 p-5">
        <div class="flex flex-wrap gap-2">
          @for (tag of article().tags.slice(0, 3); track tag) {
            <hs-tag [label]="tag" />
          }
        </div>

        <h3 class="font-display text-xl font-semibold text-stone-900">
          <a
            [routerLink]="['/article', article().slug]"
            class="transition-colors hover:text-moss-700"
          >
            {{ article().title }}
          </a>
        </h3>

        <p class="line-clamp-3 text-sm leading-relaxed text-stone-600">
          {{ article().excerpt }}
        </p>

        <div
          class="mt-auto flex items-center gap-4 pt-2 text-xs text-stone-500"
        >
          <span class="inline-flex items-center gap-1.5">
            <hs-icon name="calendar" [size]="14" />
            {{ article().date | date: 'mediumDate' }}
          </span>
          <span class="inline-flex items-center gap-1.5">
            <hs-icon name="clock" [size]="14" />
            {{ article().readingTime }} min
          </span>
        </div>
      </div>
    </article>
  `,
})
export class ArticleCardComponent {
  readonly article = input.required<ArticleSummary>();
}
