import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Reusable button atom. Renders an anchor when `routerLink` or `href`
 * is provided, otherwise a native button.
 */
@Component({
  selector: 'upala-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgTemplateOutlet],
  template: `
    @if (routerLink()) {
      <a [routerLink]="routerLink()" [class]="classes()">
        <ng-container [ngTemplateOutlet]="content" />
      </a>
    } @else if (href()) {
      <a [href]="href()" [class]="classes()">
        <ng-container [ngTemplateOutlet]="content" />
      </a>
    } @else {
      <button [type]="type()" [class]="classes()">
        <ng-container [ngTemplateOutlet]="content" />
      </button>
    }
    <ng-template #content><ng-content /></ng-template>
  `,
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly routerLink = input<string | unknown[] | null>(null);
  readonly href = input<string | null>(null);

  protected readonly classes = computed(() => {
    const base =
      'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-moss-500 focus-visible:ring-offset-2';
    const sizes: Record<ButtonSize, string> = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-7 py-3 text-base',
    };
    const variants: Record<ButtonVariant, string> = {
      primary: 'bg-moss-700 text-sand-50 hover:bg-moss-800',
      secondary: 'bg-sand-200 text-stone-800 hover:bg-sand-300',
      ghost: 'bg-transparent text-stone-700 hover:bg-sand-100',
    };
    return `${base} ${sizes[this.size()]} ${variants[this.variant()]}`;
  });
}
