import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { IconComponent } from '../atoms/icon.component';

/** Author + publication metadata block shown on articles. */
@Component({
  selector: 'upala-author-info',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, IconComponent],
  template: `
    <div class="flex items-center gap-3">
      <span
        class="flex h-10 w-10 items-center justify-center rounded-full bg-moss-100 font-display text-sm font-semibold text-moss-800"
      >
        {{ initials() }}
      </span>
      <div class="text-sm">
        <p class="font-medium text-stone-800">{{ author() }}</p>
        <p class="flex items-center gap-3 text-stone-500">
          <span class="inline-flex items-center gap-1">
            <upala-icon name="calendar" [size]="13" />
            {{ date() | date: 'mediumDate' }}
          </span>
          @if (readingTime()) {
            <span class="inline-flex items-center gap-1">
              <upala-icon name="clock" [size]="13" />
              {{ readingTime() }} min de lecture
            </span>
          }
        </p>
      </div>
    </div>
  `,
})
export class AuthorInfoComponent {
  readonly author = input('Un pas après l’autre');
  readonly date = input.required<string>();
  readonly readingTime = input<number | null>(null);

  protected initials(): string {
    return this.author()
      .split(/\s+/)
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }
}
