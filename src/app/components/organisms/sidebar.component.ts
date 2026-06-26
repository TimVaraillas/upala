import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HeadingComponent } from '../atoms/heading.component';
import { TagComponent } from '../atoms/tag.component';
import { ArticleSummary, DestinationNode } from '../../core/models/article.model';

/** Sidebar with tag cloud and a list of recent carnets. */
@Component({
  selector: 'upala-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, HeadingComponent, TagComponent],
  template: `
    <aside class="space-y-10">
      @if (destinations().length) {
        <section>
          <upala-heading [level]="4">Destinations</upala-heading>
          <ul class="mt-4 space-y-2">
            @for (dest of destinations(); track dest.country) {
              <li>
                <a
                  [routerLink]="['/blog']"
                  [queryParams]="{ country: dest.country, region: null }"
                  queryParamsHandling="merge"
                  class="flex items-center justify-between rounded-md px-2 py-1 text-sm font-medium transition-colors"
                  [class.bg-moss-100]="isCountryActive(dest.country)"
                  [class.text-moss-800]="isCountryActive(dest.country)"
                  [class.text-stone-700]="!isCountryActive(dest.country)"
                  [class.hover:bg-sand-100]="!isCountryActive(dest.country)"
                >
                  <span>{{ dest.country }}</span>
                  <span class="text-xs text-stone-400">{{ dest.count }}</span>
                </a>
                @if (dest.regions.length) {
                  <ul class="mt-1 ml-2 space-y-1 border-l border-sand-200 pl-3">
                    @for (r of dest.regions; track r.region) {
                      <li>
                        <a
                          [routerLink]="['/blog']"
                          [queryParams]="{ country: dest.country, region: r.region }"
                          queryParamsHandling="merge"
                          class="flex items-center justify-between rounded-md px-2 py-1 text-sm transition-colors"
                          [class.bg-moss-100]="isRegionActive(dest.country, r.region)"
                          [class.text-moss-800]="isRegionActive(dest.country, r.region)"
                          [class.text-stone-600]="!isRegionActive(dest.country, r.region)"
                          [class.hover:bg-sand-100]="!isRegionActive(dest.country, r.region)"
                        >
                          <span>{{ r.region }}</span>
                          <span class="text-xs text-stone-400">{{ r.count }}</span>
                        </a>
                      </li>
                    }
                  </ul>
                }
              </li>
            }
          </ul>
        </section>
      }

      <section>
        <upala-heading [level]="4">Catégories</upala-heading>
        <div class="mt-4 flex flex-wrap gap-2">
          @for (entry of tags(); track entry.tag) {
            <upala-tag [label]="entry.tag" [activeTags]="activeTags()" />
          } @empty {
            <p class="text-sm text-stone-500">Aucune catégorie.</p>
          }
        </div>
      </section>

      @if (recent().length) {
        <section>
          <upala-heading [level]="4">Derniers carnets</upala-heading>
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
  readonly destinations = input<DestinationNode[]>([]);
  readonly activeCountry = input<string>('');
  readonly activeRegion = input<string>('');

  protected isCountryActive(country: string): boolean {
    return (
      this.activeCountry().toLowerCase() === country.toLowerCase() &&
      !this.activeRegion()
    );
  }

  protected isRegionActive(country: string, region: string): boolean {
    return (
      this.activeCountry().toLowerCase() === country.toLowerCase() &&
      this.activeRegion().toLowerCase() === region.toLowerCase()
    );
  }
}
