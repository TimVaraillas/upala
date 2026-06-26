import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { filter } from 'rxjs';
import { AnalyticsService } from './core/services/analytics.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class App implements OnInit {
  private readonly router = inject(Router);
  private readonly analytics = inject(AnalyticsService);
  private readonly document = inject(DOCUMENT);

  ngOnInit(): void {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => {
      const event = e as NavigationEnd;
      this.analytics.trackPageView(event.urlAfterRedirects, this.document.title);
    });
  }
}
