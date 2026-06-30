import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

/**
 * A single collapsible accordion item (atom).
 *
 * Renders a clickable question header with a chevron that rotates when
 * expanded, plus a projected panel revealed on toggle. Stateless beyond its
 * own open/closed signal so it can be reused for FAQs, details lists, etc.
 */
@Component({
  selector: 'upala-accordion-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: flow-root;
      }

      .accordion-panel {
        animation: accordion-reveal 220ms ease-out;
      }

      @keyframes accordion-reveal {
        from {
          opacity: 0;
          transform: translateY(-0.25rem);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .accordion-panel {
          animation: none;
        }
      }
    `,
  ],
  template: `
    <div class="border-b border-stone-200 last:border-b-0">
      <h3 class="m-0">
        <button
          type="button"
          class="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-base font-medium text-stone-800 transition-colors hover:text-emerald-800 sm:px-6 cursor-pointer"
          [attr.aria-expanded]="open()"
          (click)="toggle()"
        >
          <span>{{ question() }}</span>
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="shrink-0 text-stone-400 transition-transform duration-300"
            [class.rotate-180]="open()"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </h3>
      @if (open()) {
        <div class="accordion-panel px-4 pb-4 text-stone-600 sm:px-6">
          <ng-content />
        </div>
      }
    </div>
  `,
})
export class AccordionItemComponent {
  /** Question/label shown in the always-visible header. */
  readonly question = input.required<string>();

  /** Whether the panel is currently expanded. */
  readonly open = signal(false);

  toggle(): void {
    this.open.update((value) => !value);
  }
}
