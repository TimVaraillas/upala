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
        title: 'Un pas après l’autre',
      },
      {
        path: 'blog',
        loadComponent: () => import('./pages/blog.page'),
        title: 'Carnets · Un pas après l’autre',
      },
      {
        path: 'article/:slug',
        loadComponent: () => import('./pages/article.page'),
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/about.page'),
        title: 'À propos · Un pas après l’autre',
      },
      {
        path: '**',
        loadComponent: () => import('./pages/not-found.page'),
        title: 'Page introuvable · Un pas après l’autre',
      },
    ],
  },
];
