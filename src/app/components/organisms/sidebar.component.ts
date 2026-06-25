import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HeadingComponent } from '../atoms/heading.component';
import { TagComponent } from '../atoms/tag.component';
import { ArticleSummary } from '../../core/models/article.model';

/** Sidebar with tag cloud and a list of recent carnets. */
@Component({
  selector: 'hs-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, HeadingComponent, TagComponent],
  template: `
    <aside class="space-y-10">
      <section>
        <hs-heading [level]="4">Catégories</hs-heading>
        <div class="mt-4 flex flex-wrap gap-2">
          @for (entry of tags(); track entry.tag) {
            <hs-tag [label]="entry.tag" [activeTags]="activeTags()" />
          } @empty {
            <p class="text-sm text-stone-500">Aucune catégorie.</p>
          }
        </div>
      </section>

      @if (recent().length) {
        <section>
          <hs-heading [level]="4">Derniers carnets</hs-heading>
          <ul class="mt-4 space-y-4">
            @for (article of recent(); track article.slug) {
              <li>
                <a
                  [routerLink]="['/article', article.slug]"
                  class="group block"
                >
                  <span
                    class="block text-sm font-medium text-stone-800 transition-colors group-hover:text-moss-700"
                  >
                    {{ article.title }}
                  </span>
                  <span class="text-xs text-stone-500">
                    {{ article.readingTime }} min de lecture
                  </span>
                </a>
              </li>
            }
          </ul>
        </section>
      }
    </aside>
  `,
})
export class SidebarComponent {
  readonly tags = input.required<{ tag: string; count: number }[]>();
  readonly recent = input<ArticleSummary[]>([]);
  readonly activeTags = input<string[]>([]);
}
