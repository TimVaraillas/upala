import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { BlogService } from '../core/services/blog.service';
import { SeoService } from '../core/services/seo.service';
import { BlockquoteComponent } from '../components/atoms/blockquote.component';
import { ButtonComponent } from '../components/atoms/button.component';
import { HeadingComponent } from '../components/atoms/heading.component';
import { IconComponent } from '../components/atoms/icon.component';
import { LogoComponent } from '../components/atoms/logo.component';
import { ArticleListComponent } from '../components/organisms/article-list.component';

/** Landing page: hero + latest carnets. */
@Component({
  selector: 'upala-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    BlockquoteComponent,
    ButtonComponent,
    HeadingComponent,
    IconComponent,
    LogoComponent,
    ArticleListComponent,
  ],
  template: `
    <section
      #hero
      class="relative flex min-h-[70vh] items-center justify-center overflow-hidden border-b border-sand-200"
    >
      <img
        src="/content/images/home_001.jpg"
        alt=""
        aria-hidden="true"
        class="absolute top-[-20%] left-0 h-[140%] w-full object-cover object-center will-change-transform"
        [style.transform]="'translate3d(0,' + parallaxY() + 'px,0)'"
      />
      <div class="absolute inset-0 bg-moss-700/70"></div>

      <div
        class="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-12 px-4 py-24 text-center sm:px-6"
      >
        <upala-logo variant="full" imgClass="h-44 w-auto sm:h-56" fill="bg-white" alt="Upala" />

        <upala-blockquote tone="light" author="André Gide">
          L’homme ne découvre de nouveaux océans que lorsqu’il a le courage de
          perdre de vue le rivage.
        </upala-blockquote>
      </div>
    </section>

    <section class="border-b border-sand-200 bg-white">
      <div class="mx-auto flex max-w-3xl flex-col items-center gap-8 px-4 py-20 text-center sm:px-6">
        <p
          class="inline-flex items-center gap-2 rounded-full bg-moss-100 px-3 py-1 text-xs font-medium tracking-wide text-moss-800 uppercase"
        >
          <upala-icon name="compass" [size]="14" /> Carnets d’exploration
        </p>

        <upala-heading [level]="1">
          Marcher là où les cartes s’arrêtent.
        </upala-heading>

        <p class="max-w-xl text-lg leading-relaxed text-stone-600">
          Récits d’expédition, guides de trek détaillés et itinéraires sur
          plusieurs jours. Tout ce qu’il faut pour quitter les sentiers
          balisés en confiance.
        </p>

        <div class="mt-2 flex flex-wrap justify-center gap-3">
          <upala-button [routerLink]="'/blog'" size="lg">
            Explorer les carnets
            <upala-icon name="arrow-right" [size]="18" />
          </upala-button>
          <upala-button [routerLink]="'/about'" variant="secondary" size="lg">
            Qui sommes-nous ?
          </upala-button>
        </div>
      </div>
    </section>

    <section class="">
      <div class="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div
          class="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <upala-heading [level]="2">Derniers carnets</upala-heading>
          <upala-button [routerLink]="'/blog'" variant="secondary" size="sm">
            Tout voir <upala-icon name="arrow-right" [size]="16" />
          </upala-button>
        </div>

        <upala-article-list [articles]="(latest$ | async) ?? []" />
      </div>
    </section>
  `,
})
export default class HomePage {
  private readonly blog = inject(BlogService);

  protected readonly latest$ = this.blog.getLatestArticles(6);

  private readonly hero = viewChild<ElementRef<HTMLElement>>('hero');
  protected readonly parallaxY = signal(0);

  @HostListener('window:scroll')
  @HostListener('window:resize')
  protected onScroll(): void {
    const el = this.hero()?.nativeElement;
    if (!el) return;
    // Move the image at ~30% of the scroll speed for a parallax feel.
    this.parallaxY.set(el.getBoundingClientRect().top * -0.3);
  }

  constructor() {
    afterNextRender(() => this.onScroll());

    inject(SeoService).update({
      title: '',
      description:
        'Un pas après l’autre — récits d’expédition et guides de trek pour marcher là où les cartes s’arrêtent.',
      url: 'https://un-pas-apres-l-autre.example/',
    });
  }
}
