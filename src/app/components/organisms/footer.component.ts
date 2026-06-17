import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IconComponent } from '../atoms/icon.component';

/** Site footer with navigation and credits. */
@Component({
  selector: 'hs-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent],
  template: `
    <footer class="mt-24 border-t border-sand-200 bg-sand-100/60">
      <div
        class="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3"
      >
        <div>
          <p
            class="flex items-center gap-2 font-display text-lg font-semibold text-stone-900"
          >
            <span class="text-moss-700"><hs-icon name="compass" [size]="22" /></span>
            Un pas après l’autre
          </p>
          <p class="mt-3 max-w-xs text-sm leading-relaxed text-stone-600">
            Récits d’expédition et guides de trek pour ceux qui marchent là où
            les cartes s’arrêtent.
          </p>
        </div>

        <div>
          <h4
            class="text-xs font-semibold tracking-wider text-stone-500 uppercase"
          >
            Explorer
          </h4>
          <ul class="mt-3 space-y-2 text-sm text-stone-600">
            <li><a routerLink="/" class="hover:text-moss-700">Accueil</a></li>
            <li><a routerLink="/blog" class="hover:text-moss-700">Carnets</a></li>
            <li><a routerLink="/about" class="hover:text-moss-700">À propos</a></li>
          </ul>
        </div>

        <div>
          <h4
            class="text-xs font-semibold tracking-wider text-stone-500 uppercase"
          >
            Suivre la trace
          </h4>
          <p class="mt-3 text-sm text-stone-600">
            Pas de newsletter, pas de tracker. Juste des sentiers et des mots.
          </p>
        </div>
      </div>

      <div class="border-t border-sand-200">
        <p
          class="mx-auto max-w-6xl px-4 py-5 text-xs text-stone-500 sm:px-6"
        >
          © {{ year }} Un pas après l’autre — Conçu pour marcher léger.
        </p>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  protected readonly year = new Date().getFullYear();
}
