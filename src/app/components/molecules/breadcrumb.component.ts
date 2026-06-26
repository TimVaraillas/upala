import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IconComponent } from '../atoms/icon.component';

export interface BreadcrumbItem {
  label: string;
  link?: string;
}

/** Breadcrumb trail molecule for nested pages. */
@Component({
  selector: 'upala-breadcrumb',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IconComponent],
  template: `
    <nav aria-label="Fil d'ariane">
      <ol class="flex flex-wrap items-center gap-1.5 text-sm text-stone-500">
        @for (item of items(); track item.label; let last = $last) {
          <li class="inline-flex items-center gap-1.5">
            @if (item.link && !last) {
              <a
                [routerLink]="item.link"
                class="transition-colors hover:text-moss-700"
              >
                {{ item.label }}
              </a>
            } @else {
              <span class="text-stone-700">{{ item.label }}</span>
            }
            @if (!last) {
              <upala-icon name="arrow-right" [size]="14" class="text-stone-300" />
            }
          </li>
        }
      </ol>
    </nav>
  `,
})
export class BreadcrumbComponent {
  readonly items = input.required<BreadcrumbItem[]>();
}
