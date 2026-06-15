import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Two-column blog layout: main content beside a sidebar slot.
 * Projects `[main]` and `[sidebar]` content.
 */
@Component({
  selector: 'hs-blog-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div class="grid gap-12 lg:grid-cols-[1fr_18rem]">
        <div class="min-w-0">
          <ng-content select="[main]" />
        </div>
        <div class="lg:border-l lg:border-sand-200 lg:pl-10">
          <ng-content select="[sidebar]" />
        </div>
      </div>
    </div>
  `,
})
export class BlogLayoutComponent {}
