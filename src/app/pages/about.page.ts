import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { SeoService } from '../core/services/seo.service';
import { HeadingComponent } from '../components/atoms/heading.component';
import { ImageComponent } from '../components/atoms/image.component';
import { ParagraphComponent } from '../components/atoms/paragraph.component';

/** Static About page. */
@Component({
  selector: 'hs-about-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeadingComponent, ImageComponent, ParagraphComponent],
  template: `
    <section class="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div class="mt-6 space-y-6">
        <div class="mb-12 grid grid-cols-5 gap-4 h-100">
          <div class="col-span-3 overflow-hidden rounded-lg">
            <hs-image [src]="photos[0].src" [alt]="photos[0].alt" />
          </div>
          <div class="col-span-2 overflow-hidden rounded-lg">
            <hs-image [src]="photos[1].src" [alt]="photos[1].alt" />
          </div>
        </div>

        <hs-heading [level]="1">Qui sommes-nous ?</hs-heading>

        <hs-paragraph>
          Un pas après l'autre, c'est avant tout un carnet d'exploration et l'envie de raconter nos aventures.
        </hs-paragraph>
        <hs-paragraph>
          Nous sommes Tim et Ludivine, deux amis passionnés de trail, de randonnée et de voyages. Depuis plusieurs années, nous parcourons les sentiers, parfois ensemble, parfois chacun de notre côté, toujours avec la même curiosité pour les paysages, les rencontres et les expériences que l'on vit en chemin.
        </hs-paragraph>
        <hs-paragraph>
          Ce blog est né de l'envie de conserver une trace de ces aventures et de les partager. Vous y trouverez des récits de trek en autonomie, des randonnées à la journée, des trails, des bivouacs et quelques projets un peu atypiques que nous imaginons au gré de nos envies.
        </hs-paragraph>
        <hs-paragraph>
          Au-delà des récits, nous souhaitons également partager tout ce que nous apprenons au fil de nos expériences. Préparation d'itinéraires, organisation logistique, choix du matériel, gestion du budget, alimentation en itinérance ou encore retours d'expérience, ... Nous espérons que ces contenus pourront aider celles et ceux qui souhaitent se lancer dans leur propre aventure, quelle qu'en soit l'ampleur.
        </hs-paragraph>
        <hs-paragraph>
          Notre philosophie est simple : avancer un pas après l'autre, prendre le temps de découvrir le monde à notre rythme et profiter du voyage autant que de la destination.
        </hs-paragraph>
        <hs-paragraph>
          Parce qu'au fond, les plus belles aventures commencent souvent par un premier pas.
        </hs-paragraph>
      </div>
    </section>
  `,
})
export default class AboutPage {
  protected readonly photos = [
    { src: '/content/images/about_001.jpg', alt: 'Tim et Lulu devant une cascade' },
    { src: '/content/images/about_004.jpg', alt: 'Photo de Tim et Lulu' },

  ];

  constructor() {
    inject(SeoService).update({
      title: 'Qui sommes-nous ?',
      description:
        'Un pas après l’autre : un carnet d’exploration dédié au trek d’aventure et aux longues traversées.',
      url: 'https://un-pas-apres-l-autre.example/about',
    });
  }
}
