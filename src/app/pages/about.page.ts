import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { SeoService } from '../core/services/seo.service';
import { HeadingComponent } from '../components/atoms/heading.component';
import { ParagraphComponent } from '../components/atoms/paragraph.component';
import { IconComponent } from '../components/atoms/icon.component';

/** Static About page. */
@Component({
  selector: 'hs-about-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeadingComponent, ParagraphComponent, IconComponent],
  template: `
    <section class="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <span class="text-moss-700"><hs-icon name="tent" [size]="40" /></span>
      <div class="mt-6 space-y-6">
        <hs-heading [level]="1">À propos d’Un pas après l’autre</hs-heading>
        <hs-paragraph variant="lead">
          Un pas après l’autre est un carnet d’exploration dédié aux trekkings
          d’aventure, aux traversées sur plusieurs jours et à l’art de marcher
          léger loin des sentiers balisés.
        </hs-paragraph>
        <hs-paragraph>
          On y partage des récits d’expédition honnêtes et des guides pratiques :
          choix d’itinéraires, matériel testé sur le terrain, organisation du
          bivouac et logistique des longues marches. Pas de superflu, juste ce
          qui aide réellement à préparer sa prochaine sortie.
        </hs-paragraph>
        <hs-paragraph>
          Le site est statique, sans base de données ni traqueur. Chaque carnet
          est écrit en Markdown et versionné dans Git — simple, durable et
          rapide.
        </hs-paragraph>
      </div>
    </section>
  `,
})
export default class AboutPage {
  constructor() {
    inject(SeoService).update({
      title: 'À propos',
      description:
        'Un pas après l’autre : un carnet d’exploration dédié au trek d’aventure et aux longues traversées.',
      url: 'https://un-pas-apres-l-autre.example/about',
    });
  }
}
