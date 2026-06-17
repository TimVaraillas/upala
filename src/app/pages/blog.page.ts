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
  selector: 'hs-blog-page',
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
    <hs-blog-layout>
      <div main>
        <div class="mb-8 space-y-3">
          <hs-heading [level]="1">Carnets de route</hs-heading>
          @if (activeTag()) {
            <p class="flex flex-wrap items-center gap-2 text-stone-600">
              Filtré par
              <span
                class="inline-flex items-center gap-1 rounded-full bg-moss-100 px-3 py-1 text-sm font-medium text-moss-800"
              >
                #{{ activeTag() }}
              </span>
              <a
                routerLink="/blog"
                class="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-moss-700"
              >
                <hs-icon name="close" [size]="14" /> réinitialiser
              </a>
            </p>
          } @else {
            <p class="text-stone-600">
              Tous les récits d’expédition et guides de trek, du plus récent au
              plus ancien.
            </p>
          }
        </div>

        <hs-article-list
          [articles]="filtered()"
          emptyMessage="Aucun carnet ne correspond à ce filtre."
        />
      </div>

      <div sidebar>
        <hs-sidebar [tags]="tags()" [recent]="recent()" />
      </div>
    </hs-blog-layout>
  `,
})
export default class BlogPage {
  private readonly blog = inject(BlogService);
  private readonly route = inject(ActivatedRoute);

  private readonly articles = toSignal(this.blog.getArticles(), {
    initialValue: [],
  });
  protected readonly tags = toSignal(this.blog.getTags(), { initialValue: [] });

  protected readonly activeTag = toSignal(
    this.route.queryParamMap.pipe(map((p) => p.get('tag') ?? '')),
    { initialValue: '' },
  );

  protected readonly filtered = computed(() => {
    const tag = this.activeTag().toLowerCase();
    const list = this.articles();
    if (!tag) {
      return list;
    }
    return list.filter((a) => a.tags.some((t) => t.toLowerCase() === tag));
  });

  protected readonly recent = computed(() => this.articles().slice(0, 4));

  constructor() {
    inject(SeoService).update({
      title: 'Carnets de route',
      description:
        'Récits d’expédition et guides de trek : itinéraires, matériel, bivouac et logistique.',
      url: 'https://un-pas-apres-l-autre.example/blog',
    });
  }
}
