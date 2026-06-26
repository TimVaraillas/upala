import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { BlogService } from '../core/services/blog.service';
import { SeoService } from '../core/services/seo.service';
import { HeadingComponent } from '../components/atoms/heading.component';
import { IconComponent } from '../components/atoms/icon.component';
import { BlogLayoutComponent } from '../components/templates/blog-layout.component';
import { ArticleListComponent } from '../components/organisms/article-list.component';
import { SidebarComponent } from '../components/organisms/sidebar.component';

/** Blog listing with tag filtering driven by the `?tag=` query param. */
@Component({
  selector: 'upala-blog-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    HeadingComponent,
    IconComponent,
    BlogLayoutComponent,
    ArticleListComponent,
    SidebarComponent,
  ],
  template: `
    <upala-blog-layout>
      <div main>
        <div class="mb-8 space-y-3">
          <upala-heading [level]="1">Carnets d'exploration</upala-heading>
          @if (hasFilters()) {
            <p class="flex flex-wrap items-center gap-2 text-stone-600">
              Filtré par
              @if (activeCountry()) {
                <span
                  class="inline-flex items-center gap-1 rounded-full bg-sand-200 px-3 py-1 text-sm font-medium text-stone-800"
                >
                  {{ activeCountry()
                  }}{{ activeRegion() ? ' › ' + activeRegion() : '' }}
                </span>
              }
              @for (tag of activeTags(); track tag) {
                <span
                  class="inline-flex items-center gap-1 rounded-full bg-moss-100 px-3 py-1 text-sm font-medium text-moss-800"
                >
                  #{{ tag }}
                </span>
              }
              <a
                routerLink="/blog"
                class="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-moss-700"
              >
                <upala-icon name="close" [size]="14" /> réinitialiser
              </a>
            </p>
          } @else {
            <p class="text-stone-600">
              Tous les récits d’expédition et guides de trek, du plus récent au
              plus ancien.
            </p>
          }
        </div>

        <upala-article-list
          [articles]="filtered()"
          emptyMessage="Aucun carnet ne correspond à ce filtre."
        />
      </div>

      <div sidebar>
        <upala-sidebar
          [tags]="tags()"
          [recent]="recent()"
          [activeTags]="activeTags()"
          [destinations]="destinations()"
          [activeCountry]="activeCountry()"
          [activeRegion]="activeRegion()"
        />
      </div>
    </upala-blog-layout>
  `,
})
export default class BlogPage {
  private readonly blog = inject(BlogService);
  private readonly route = inject(ActivatedRoute);

  private readonly articles = toSignal(this.blog.getArticles(), {
    initialValue: [],
  });
  protected readonly tags = toSignal(this.blog.getTags(), { initialValue: [] });
  protected readonly destinations = toSignal(this.blog.getDestinations(), {
    initialValue: [],
  });

  protected readonly activeTags = toSignal(
    this.route.queryParamMap.pipe(
      map((p) =>
        (p.get('tag') ?? '')
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      ),
    ),
    { initialValue: [] as string[] },
  );

  protected readonly activeCountry = toSignal(
    this.route.queryParamMap.pipe(map((p) => p.get('country') ?? '')),
    { initialValue: '' },
  );

  protected readonly activeRegion = toSignal(
    this.route.queryParamMap.pipe(map((p) => p.get('region') ?? '')),
    { initialValue: '' },
  );

  protected readonly hasFilters = computed(
    () =>
      this.activeTags().length > 0 ||
      !!this.activeCountry() ||
      !!this.activeRegion(),
  );

  protected readonly filtered = computed(() => {
    const tags = this.activeTags().map((t) => t.toLowerCase());
    const country = this.activeCountry().toLowerCase();
    const region = this.activeRegion().toLowerCase();
    return this.articles().filter((a) => {
      const matchTags =
        !tags.length || a.tags.some((t) => tags.includes(t.toLowerCase()));
      const matchCountry =
        !country || (a.country ?? '').toLowerCase() === country;
      const matchRegion = !region || (a.region ?? '').toLowerCase() === region;
      return matchTags && matchCountry && matchRegion;
    });
  });

  protected readonly recent = computed(() => this.articles().slice(0, 4));

  constructor() {
    inject(SeoService).update({
      title: 'Carnets d\'exploration',
      description:
        'Récits d’expédition et guides de trek : itinéraires, matériel, bivouac et logistique.',
      url: 'https://un-pas-apres-l-autre.example/blog',
    });
  }
}
