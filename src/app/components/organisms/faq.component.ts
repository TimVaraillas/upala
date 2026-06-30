import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { FaqItem } from '../../core/utils/markdown';
import { AccordionItemComponent } from '../atoms/accordion-item.component';
import { SafeHtmlPipe } from '../../core/pipes/safe-html.pipe';

/**
 * Renders a list of question/answer pairs as collapsible accordions inside an
 * article. Backed by the ` ```faq ` Markdown shortcode (see `parseBlocks`),
 * each answer is pre-rendered, sanitized HTML.
 */
@Component({
  selector: 'upala-faq',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AccordionItemComponent, SafeHtmlPipe],
  template: `
    <div class="not-prose my-8 overflow-hidden rounded-xl border border-stone-200">
      @for (item of items(); track item.question) {
        <upala-accordion-item class="odd:bg-sand-50 even:bg-sand-100" [question]="item.question">
          <div class="prose-trail max-w-none text-stone-600" [innerHTML]="item.answerHtml | safeHtml"></div>
        </upala-accordion-item>
      }
    </div>
  `,
})
export class FaqComponent {
  /** Question/answer pairs to render as accordion items. */
  readonly items = input.required<FaqItem[]>();
}
