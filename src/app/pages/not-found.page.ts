import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { SeoService } from '../core/services/seo.service';
import { ButtonComponent } from '../components/atoms/button.component';
import { HeadingComponent } from '../components/atoms/heading.component';
import { IconComponent } from '../components/atoms/icon.component';

/** 404 page. */
@Component({
  selector: 'upala-not-found-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, HeadingComponent, IconComponent],
  template: `
    <section
      class="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center sm:px-6"
    >
      <span class="text-moss-600"><upala-icon name="compass" [size]="56" /></span>
      <p class="mt-6 font-display text-6xl font-semibold text-stone-300">404</p>
      <div class="mt-4 space-y-4">
        <upala-heading [level]="2">Hors carte</upala-heading>
        <p class="text-stone-600">
          Cette page n’existe pas ou a quitté le sentier. Revenons sur un chemin
          balisé.
        </p>
      </div>
      <div class="mt-8">
        <upala-button [routerLink]="'/'">Retour à l’accueil</upala-button>
      </div>
    </section>
  `,
})
export default class NotFoundPage {
  constructor() {
    inject(SeoService).update({
      title: 'Page introuvable',
      description: 'Cette page n’existe pas.',
    });
  }
}
