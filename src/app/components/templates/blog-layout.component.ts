import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { PageHeaderComponent } from '../molecules/page-header.component';

/**
 * Two-column blog layout: main content beside a sidebar slot.
 * Renders an optional page header (when `title` is set) above the projected
 * `[main]` content and projects `[sidebar]` content.
 */
@Component({
  selector: 'upala-blog-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent],
  styles: [
    `
      /* Fond du bandeau qui déborde jusqu'au bord gauche de l'écran,
         tout en gardant son contenu aligné sur la grille (max-w-6xl). */
      .bleed-left {
        margin-left: min(0px, calc((72rem - 100vw) / 2));
        padding-left: calc(max(0px, (100vw - 72rem) / 2) + 1rem);
      }
      @media (min-width: 640px) {
        .bleed-left {
          padding-left: calc(max(0px, (100vw - 72rem) / 2) + 1.5rem);
        }
      }
    `,
  ],
  template: `
    <div>
      <div class="mx-auto grid max-w-6xl lg:grid-cols-[1fr_18rem]">
        <div class="pb-24">
          @if (title()) {
            <div
              class="bleed-left -mb-18 border-b border-sand-200 bg-sand-100 pt-12 pr-4 pb-24 sm:pr-6"
            >
              <upala-page-header [title]="title()" [subtitle]="subtitle()" />
              <ng-content select="[header-extra]" />
            </div>
          }
          <div class="px-4 sm:px-6" [class.pt-12]="!title()">
            <ng-content select="[main]" />
          </div>
        </div>
        <div class="px-4 sm:px-6 lg:border-l lg:border-sand-200">
          <div class="pb-12 lg:sticky lg:top-0 lg:pt-10 lg:pb-24">
            <ng-content select="[sidebar]" />
          </div>
        </div>
      </div>
    </div>
  `,
})
export class BlogLayoutComponent {
  /** Optional page title; when set, a page header is rendered above the main content. */
  readonly title = input<string>('');

  /** Optional page subtitle shown under the title. */
  readonly subtitle = input<string>('');
}
