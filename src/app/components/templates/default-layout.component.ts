import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { PageHeaderComponent } from '../molecules/page-header.component';

/**
 * Simple single-column page layout.
 * Renders an optional page header (when `title` is set) on a sand background
 * that bleeds to both edges of the screen, above the projected `[main]` content.
 */
@Component({
  selector: 'upala-default-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent],
  styles: [
    `
      /* Fond du bandeau qui déborde jusqu'aux bords de l'écran,
         tout en gardant son contenu centré sur la grille. */
      .bleed-full {
        margin-left: calc((100% - 100vw) / 2);
        margin-right: calc((100% - 100vw) / 2);
        padding-left: calc((100vw - 100%) / 2);
        padding-right: calc((100vw - 100%) / 2);
      }
    `,
  ],
  template: `
    <div class="pb-24">
      @if (title()) {
        <div class="bleed-full border-b border-sand-200 bg-sand-100 pt-12 pb-12">
          <upala-page-header [title]="title()" [subtitle]="subtitle()" />
          <ng-content select="[header-extra]" />
        </div>
      }
      <div [class.pt-12]="!title()">
        <ng-content select="[main]" />
      </div>
    </div>
  `,
})
export class DefaultLayoutComponent {
  /** Optional page title; when set, a page header is rendered above the main content. */
  readonly title = input<string>('');

  /** Optional page subtitle shown under the title. */
  readonly subtitle = input<string>('');
}
