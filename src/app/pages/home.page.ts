import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { BlogService } from '../core/services/blog.service';
import { SeoService } from '../core/services/seo.service';
import { ButtonComponent } from '../components/atoms/button.component';
import { HeadingComponent } from '../components/atoms/heading.component';
import { IconComponent } from '../components/atoms/icon.component';
import { ArticleListComponent } from '../components/organisms/article-list.component';

/** Landing page: hero + latest carnets. */
@Component({
  selector: 'hs-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    ButtonComponent,
    HeadingComponent,
    IconComponent,
    ArticleListComponent,
  ],
  template: `
    <section class="relative overflow-hidden border-b border-sand-200">
      <div
        class="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2"
      >
        <div class="space-y-6">
          <p
            class="inline-flex items-center gap-2 rounded-full bg-moss-100 px-3 py-1 text-xs font-medium tracking-wide text-moss-800 uppercase"
          >
            <hs-icon name="compass" [size]="14" /> Carnets d’exploration
          </p>
          <hs-heading [level]="1">
            Marcher là où les cartes s’arrêtent.
          </hs-heading>
          <p class="max-w-xl text-lg leading-relaxed text-stone-600">
            Récits d’expédition, guides de trek détaillés et itinéraires sur
            plusieurs jours. Tout ce qu’il faut pour quitter les sentiers
            balisés en confiance.
          </p>
          <div class="flex flex-wrap gap-3">
            <hs-button [routerLink]="'/blog'" size="lg">
              Explorer les carnets
              <hs-icon name="arrow-right" [size]="18" />
            </hs-button>
            <hs-button [routerLink]="'/about'" variant="secondary" size="lg">
              À propos
            </hs-button>
          </div>
        </div>

        <div
          class="relative hidden aspect-square rounded-4xl bg-linear-to-br from-moss-200 via-sand-200 to-sand-100 lg:block"
        >
          <span
            class="absolute inset-0 flex items-center justify-center text-moss-700/40"
          >
            <hs-icon name="mountain" [size]="160" />
          </span>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div class="mb-8 flex items-end justify-between">
        <hs-heading [level]="2">Derniers carnets</hs-heading>
        <hs-button [routerLink]="'/blog'" variant="ghost" size="sm">
          Tout voir <hs-icon name="arrow-right" [size]="16" />
        </hs-button>
      </div>

      <hs-article-list [articles]="(latest$ | async) ?? []" />
    </section>
  `,
})
export default class HomePage {
  private readonly blog = inject(BlogService);

  protected readonly latest$ = this.blog.getLatestArticles(6);

  constructor() {
    inject(SeoService).update({
      title: '',
      description:
        'Un pas après l’autre — récits d’expédition et guides de trek pour marcher là où les cartes s’arrêtent.',
      url: 'https://un-pas-apres-l-autre.example/',
    });
  }
}
