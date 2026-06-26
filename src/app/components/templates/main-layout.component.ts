import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from '../organisms/navbar.component';
import { FooterComponent } from '../organisms/footer.component';

/** Base layout: navbar + routed content + footer. */
@Component({
  selector: 'upala-main-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <div class="flex min-h-screen flex-col bg-sand-50 text-stone-800">
      <upala-navbar />
      <main class="flex-1">
        <router-outlet />
      </main>
      <upala-footer />
    </div>
  `,
})
export class MainLayoutComponent {}
