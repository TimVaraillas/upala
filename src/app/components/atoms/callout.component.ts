import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { SafeHtmlPipe } from '../../core/pipes/safe-html.pipe';

/** Supported callout variants. */
export type CalloutVariant = 'info' | 'warning' | 'danger' | 'tip' | 'success';

/**
 * Highlighted "note"-style callout box (atom).
 *
 * Use it anywhere in the app with projected content:
 * ```html
 * <upala-callout variant="tip" title="Astuce">
 *   <p>Pensez à réserver tôt.</p>
 * </upala-callout>
 * ```
 * Or feed it pre-rendered HTML via [bodyHtml] (used by the ` ```tip ` /
 * ` ```warning ` … Markdown shortcodes). Styles are intentionally global
 * (ViewEncapsulation.None) so the box renders identically inside and outside
 * article prose.
 */
@Component({
  selector: 'upala-callout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [SafeHtmlPipe],
  styles: [
    `
      .callout {
        display: flex;
        gap: 0.85rem;
        margin-top: 1.75rem;
        margin-bottom: 1.75rem;
        padding: 1.1rem 1.25rem;
        border: 1px solid var(--callout-border);
        border-left: 4px solid var(--callout-accent);
        border-radius: 0.65rem;
        background-color: var(--callout-bg);
      }
      .callout__icon {
        flex: none;
        display: flex;
        margin-top: 0.1rem;
        color: var(--callout-accent);
      }
      .callout__body {
        min-width: 0;
      }
      .callout__body > :first-child,
      .callout__content > :first-child {
        margin-top: 0;
      }
      .callout__content > :last-child {
        margin-bottom: 0;
      }
      .callout__title {
        font-family: var(--font-display);
        font-weight: 600;
        color: var(--callout-title);
      }

      .callout--tip {
        --callout-border: var(--color-moss-200);
        --callout-accent: var(--color-moss-400);
        --callout-bg: var(--color-moss-50);
        --callout-title: var(--color-moss-900);
      }
      .callout--info {
        --callout-border: #bcd6e6;
        --callout-accent: #3a82a6;
        --callout-bg: #eef6fa;
        --callout-title: #1d4d63;
      }
      .callout--success {
        --callout-border: #bcdcae;
        --callout-accent: #5a9244;
        --callout-bg: #eef6e8;
        --callout-title: #2f4d22;
      }
      .callout--warning {
        --callout-border: #f0dca8;
        --callout-accent: #cf9a2b;
        --callout-bg: #fdf6e6;
        --callout-title: #8a5a14;
      }
      .callout--danger {
        --callout-border: #ecc0bb;
        --callout-accent: #d15b4f;
        --callout-bg: #fbeeec;
        --callout-title: #8a322b;
      }
    `,
  ],
  template: `
    <aside class="callout not-prose" [class]="'callout--' + variant()">
      <span class="callout__icon" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          @switch (variant()) {
            @case ('info') {
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            }
            @case ('warning') {
              <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            }
            @case ('danger') {
              <circle cx="12" cy="12" r="10" />
              <path d="m15 9-6 6" />
              <path d="m9 9 6 6" />
            }
            @case ('tip') {
              <path d="M9 18h6" />
              <path d="M10 22h4" />
              <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1v.2h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2Z" />
            }
            @case ('success') {
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="m9 11 3 3L22 4" />
            }
          }
        </svg>
      </span>
      <div class="callout__body">
        @if (title()) {
          <p class="callout__title">{{ title() }}</p>
        }
        @if (bodyHtml()) {
          <div class="callout__content" [innerHTML]="(bodyHtml() ?? '') | safeHtml"></div>
        }
        <ng-content />
      </div>
    </aside>
  `,
})
export class CalloutComponent {
  /** Visual variant driving colours and icon. */
  readonly variant = input.required<CalloutVariant>();

  /** Optional bold title shown above the body. */
  readonly title = input<string>();

  /** Pre-rendered, sanitized HTML body (alternative to projected content). */
  readonly bodyHtml = input<string>();
}
