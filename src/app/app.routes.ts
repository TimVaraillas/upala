import { Routes } from '@angular/router';

import { MainLayoutComponent } from './components/templates/main-layout.component';

/**
 * Application routes. Pages are lazy-loaded via `loadComponent` so each
 * route ships as its own chunk; the shared shell (navbar/footer) is the
 * `MainLayoutComponent` parent.
 */
export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./pages/home.page'),
        title: 'Hors Sentier',
      },
      {
        path: 'blog',
        loadComponent: () => import('./pages/blog.page'),
        title: 'Carnets · Hors Sentier',
      },
      {
        path: 'article/:slug',
        loadComponent: () => import('./pages/article.page'),
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/about.page'),
        title: 'À propos · Hors Sentier',
      },
      {
        path: '**',
        loadComponent: () => import('./pages/not-found.page'),
        title: 'Page introuvable · Hors Sentier',
      },
    ],
  },
];
