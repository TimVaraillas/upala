import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NavbarItemComponent } from '../molecules/navbar-item.component';
import { IconComponent } from '../atoms/icon.component';

/** Top site navigation with responsive mobile menu. */
@Component({
  selector: 'hs-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NavbarItemComponent, IconComponent],
  template: `
    <header
      class="sticky top-0 z-40 border-b border-sand-200/80 bg-sand-50/85 backdrop-blur"
    >
      <div
        class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6"
      >
        <a
          routerLink="/"
          class="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-stone-900"
        >
          <span class="text-moss-700"><hs-icon name="mountain" [size]="26" /></span>
          Un&nbsp;pas&nbsp;après&nbsp;l'autre
        </a>

        <nav class="hidden items-center gap-8 md:flex">
          <hs-navbar-item link="/" [exact]="true">Accueil</hs-navbar-item>
          <hs-navbar-item link="/blog">Carnets</hs-navbar-item>
          <hs-navbar-item link="/about">À propos</hs-navbar-item>
        </nav>

        <button
          type="button"
          class="text-stone-700 md:hidden"
          [attr.aria-expanded]="open()"
          aria-label="Ouvrir le menu"
          (click)="toggle()"
        >
          <hs-icon [name]="open() ? 'close' : 'menu'" [size]="24" />
        </button>
      </div>

      @if (open()) {
        <nav
          class="flex flex-col gap-1 border-t border-sand-200 bg-sand-50 px-4 py-3 md:hidden"
        >
          <a routerLink="/" class="py-2 text-stone-700" (click)="close()">Accueil</a>
          <a routerLink="/blog" class="py-2 text-stone-700" (click)="close()">Carnets</a>
          <a routerLink="/about" class="py-2 text-stone-700" (click)="close()">À propos</a>
        </nav>
      }
    </header>
  `,
})
export class NavbarComponent {
  protected readonly open = signal(false);

  protected toggle(): void {
    this.open.update((v) => !v);
  }

  protected close(): void {
    this.open.set(false);
  }
}
