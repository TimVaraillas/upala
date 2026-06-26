import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/** A single navigation entry with active-route styling. */
@Component({
  selector: 'upala-navbar-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <a
      [routerLink]="link()"
      routerLinkActive="text-moss-700 after:scale-x-100"
      [routerLinkActiveOptions]="{ exact: exact() }"
      class="relative py-1 text-sm font-medium text-stone-600 transition-colors hover:text-moss-700 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-moss-600 after:transition-transform after:content-['']"
    >
      <ng-content />
    </a>
  `,
})
export class NavbarItemComponent {
  readonly link = input.required<string>();
  readonly exact = input(false);
}
