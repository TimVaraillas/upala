# Un pas après l'autre

A fast, SEO-friendly, statically generated travel & trekking blog built with
Angular 21 (standalone components + SSR/SSG) and Tailwind CSS 4. Content is
Markdown-based, stored in Git, with **no backend and no database**.

## Architecture (Atomic Design)

```
src/app/
  components/
    atoms/        button, icon, tag, heading, paragraph, image
    molecules/    article-card, navbar-item, breadcrumb, author-info
    organisms/    navbar, footer, article-list, article-header, sidebar, reading-progress
    templates/    main-layout, blog-layout, article-layout
  pages/          home, blog, article, about, not-found  (lazy-loaded routes)
  core/
    models/       article.model.ts
    services/     blog.service.ts (Markdown loading), seo.service.ts (OG/Twitter)
    utils/        frontmatter.ts, markdown.ts (dependency-free parsers)
content/articles/ *.md + generated index.json
scripts/          generate-articles-index.mjs, generate-sitemap.mjs
```

## Routes

| Path              | Page          | Render mode |
| ----------------- | ------------- | ----------- |
| `/`               | Home          | Prerender   |
| `/blog`           | Blog listing  | Prerender   |
| `/article/:slug`  | Article       | Prerender   |
| `/about`          | About         | Prerender   |
| `**`              | 404           | Server      |

## Content workflow

Articles live in `content/articles/*.md` with YAML frontmatter:

```markdown
---
title: "My trek"
date: 2026-05-28
tags: [expédition, itinéraire]
coverImage: https://example.com/cover.jpg
slug: my-trek
author: Un pas après l'autre
excerpt: "Optional short summary."
---

Markdown body here…
```

`npm run content:index` scans the folder and regenerates
`content/articles/index.json` (the manifest used for listings and
prerendering). It runs automatically on `prestart` / `prebuild`.
`npm run content:sitemap` regenerates `public/sitemap.xml`.

### GPX tracks

Drop `.gpx` files in `content/tracks/` (served at `/content/tracks/`) and embed
an interactive Leaflet map + elevation profile + download button anywhere in an
article with a `gpx` shortcode:

````markdown
```gpx
src: /content/tracks/my-trek.gpx
title: Optional caption
```
````

The map is loaded only in the browser (SSR-safe); the track is parsed with a
dependency-free GPX parser in `core/utils/gpx.ts`.

## Commands

```bash
npm start                       # dev server (regenerates the manifest first)
npm run build                   # SSG/SSR production build (prerenders all routes)
npm test                        # unit tests
npm run serve:ssr:un-pas-apres-l-autre  # run the SSR server after a build
```

## Development server


To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
