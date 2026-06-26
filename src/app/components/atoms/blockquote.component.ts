import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Pull-quote atom rendering a quote with an optional author. */
@Component({
  selector: 'upala-blockquote',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <blockquote class="max-w-2xl">
      <p [class]="quoteClass()">« <ng-content /> »</p>
      @if (author()) {
        <footer [class]="authorClass()">{{ author() }}</footer>
      }
    </blockquote>
  `,
})
export class BlockquoteComponent {
  /** Quote author displayed below the text. */
  readonly author = input<string | null>(null);
  /** Color tone: 'dark' for light backgrounds, 'light' for dark backgrounds. */
  readonly tone = input<'dark' | 'light'>('dark');

  protected readonly quoteClass = computed(() => {
    const color = this.tone() === 'light' ? 'text-sand-100' : 'text-stone-700';
    return `font-display text-md leading-relaxed italic sm:text-lg ${color}`;
  });

  protected readonly authorClass = computed(() => {
    const color = this.tone() === 'light' ? 'text-sand-200' : 'text-stone-500';
    return `mt-4 text-sm font-medium tracking-wide uppercase ${color}`;
  });
}
