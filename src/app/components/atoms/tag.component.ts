import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/** A clickable tag/category pill linking to the filtered blog listing. */
@Component({
  selector: 'hs-tag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <a
      [routerLink]="['/blog']"
      [queryParams]="{ tag: label() }"
      class="inline-flex items-center rounded-full bg-sand-100 px-3 py-1 text-xs font-medium tracking-wide text-moss-800 uppercase transition-colors hover:bg-moss-100"
    >
      #{{ label() }}
    </a>
  `,
})
export class TagComponent {
  readonly label = input.required<string>();
}
