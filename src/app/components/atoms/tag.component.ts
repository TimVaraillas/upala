import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/** A clickable tag/category pill that toggles itself in the blog filter. */
@Component({
  selector: 'upala-tag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <a
      [routerLink]="['/blog']"
      [queryParams]="queryParams()"
      queryParamsHandling="merge"
      [class]="classes()"
    >
      #{{ label() }}
    </a>
  `,
})
export class TagComponent {
  readonly label = input.required<string>();
  /** Currently active filter tags, used to compute the toggle target. */
  readonly activeTags = input<string[]>([]);

  protected readonly isActive = computed(() =>
    this.activeTags().some((t) => t.toLowerCase() === this.label().toLowerCase()),
  );

  protected readonly queryParams = computed(() => {
    const label = this.label();
    const next = this.isActive()
      ? this.activeTags().filter((t) => t.toLowerCase() !== label.toLowerCase())
      : [...this.activeTags(), label];
    return { tag: next.length ? next.join(',') : null };
  });

  protected readonly classes = computed(() => {
    const base =
      'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide uppercase transition-colors';
    return this.isActive()
      ? `${base} border-transparent bg-moss-700 text-sand-50 hover:bg-moss-800`
      : `${base} border-sand-300 bg-sand-100 text-moss-800 hover:bg-moss-100`;
  });
}

