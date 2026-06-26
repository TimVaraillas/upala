import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { SeoService } from '../core/services/seo.service';
import { ImageComponent } from '../components/atoms/image.component';
import { ParagraphComponent } from '../components/atoms/paragraph.component';
import { PageHeaderComponent } from '../components/molecules/page-header.component';

/** Static About page. */
@Component({
  selector: 'upala-about-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ImageComponent, ParagraphComponent, PageHeaderComponent],
  template: `
    <section class="mx-auto max-w-3xl px-4 sm:px-6">
      <div class="mt-6 space-y-6">
        <upala-page-header
          title="Qui sommes-nous ?"
          subtitle="Deux amis passionnés de trail, de randonnée et de voyages, qui racontent et partagent leurs aventures."
        />
        <div class="mb-12 grid grid-cols-1 gap-4 h-100 sm:grid-cols-5">
          <div class="overflow-hidden rounded-lg sm:col-span-3">
            <upala-image [src]="photos[0].src" [alt]="photos[0].alt" />
          </div>
          <div class="hidden overflow-hidden rounded-lg sm:col-span-2 sm:block">
            <upala-image [src]="photos[1].src" [alt]="photos[1].alt" />
          </div>
        </div>

        <upala-paragraph>
          Un pas après l'autre, c'est avant tout un carnet d'exploration et l'envie de raconter nos aventures.
        </upala-paragraph>
        <upala-paragraph>
          Nous sommes Tim et Ludivine, deux amis passionnés de trail, de randonnée et de voyages. Depuis plusieurs années, nous parcourons les sentiers, parfois ensemble, parfois chacun de notre côté, toujours avec la même curiosité pour les paysages, les rencontres et les expériences que l'on vit en chemin.
        </upala-paragraph>
        <upala-paragraph>
          Ce blog est né de l'envie de conserver une trace de ces aventures et de les partager. Vous y trouverez des récits de trek en autonomie, des randonnées à la journée, des trails, des bivouacs et quelques projets un peu atypiques que nous imaginons au gré de nos envies.
        </upala-paragraph>
        <upala-paragraph>
          Au-delà des récits, nous souhaitons également partager tout ce que nous apprenons au fil de nos expériences. Préparation d'itinéraires, organisation logistique, choix du matériel, gestion du budget, alimentation en itinérance ou encore retours d'expérience, ... Nous espérons que ces contenus pourront aider celles et ceux qui souhaitent se lancer dans leur propre aventure, quelle qu'en soit l'ampleur.
        </upala-paragraph>
        <upala-paragraph>
          Notre philosophie est simple : avancer un pas après l'autre, prendre le temps de découvrir le monde à notre rythme et profiter du voyage autant que de la destination.
        </upala-paragraph>
        <upala-paragraph>
          Parce qu'au fond, les plus belles aventures commencent souvent par un premier pas.
        </upala-paragraph>
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
