import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';

import { BlogService } from '../core/services/blog.service';
import { SeoService } from '../core/services/seo.service';
import { ButtonComponent } from '../components/atoms/button.component';
import { IconComponent } from '../components/atoms/icon.component';
import { TagComponent } from '../components/atoms/tag.component';
import { CalloutComponent } from '../components/atoms/callout.component';
import { BreadcrumbComponent } from '../components/molecules/breadcrumb.component';
import { ArticleLayoutComponent } from '../components/templates/article-layout.component';
import { ArticleHeaderComponent } from '../components/organisms/article-header.component';
import { ReadingProgressComponent } from '../components/organisms/reading-progress.component';
import { GpxViewerComponent } from '../components/organisms/gpx-viewer.component';
import { PhotoGridComponent } from '../components/organisms/photo-grid.component';
import { FaqComponent } from '../components/organisms/faq.component';
import { TableOfContentsComponent } from '../components/organisms/table-of-contents.component';
import { SafeHtmlPipe } from '../core/pipes/safe-html.pipe';

/** Single article page: renders Markdown content for a given slug. */
@Component({
  selector: 'upala-article-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    IconComponent,
    TagComponent,
    CalloutComponent,
    BreadcrumbComponent,
    ArticleLayoutComponent,
    ArticleHeaderComponent,
    ReadingProgressComponent,
    GpxViewerComponent,
    PhotoGridComponent,
    FaqComponent,
    TableOfContentsComponent,
    SafeHtmlPipe,
  ],
  template: `
    @if (article(); as post) {
      <upala-reading-progress />
      <upala-article-layout [title]="post.title" [subtitle]="post.excerpt">
        <upala-breadcrumb
          breadcrumb
          [items]="[
            { label: 'Accueil', link: '/' },
            { label: 'Carnets', link: '/blog' },
            { label: post.title },
          ]"
        />
        <div tags class="flex flex-wrap gap-2">
          @for (tag of post.tags; track tag) {
            <upala-tag [label]="tag" />
          }
        </div>
        <div header>
          <upala-article-header [article]="post" />
        </div>

        <div class="prose-trail max-w-none text-stone-700">
          @for (block of post.blocks; track $index) {
            @switch (block.type) {
              @case ('gpx') {
                <upala-gpx-viewer [src]="block.src" [title]="block.title" />
              }
              @case ('photos') {
                <upala-photo-grid [layout]="block.layout" [images]="block.images" [maxHeight]="block.maxHeight" [articleSlug]="post.slug" />
              }
              @case ('faq') {
                <upala-faq [items]="block.items" />
              }
              @case ('callout') {
                <upala-callout [variant]="block.variant" [title]="block.title" [bodyHtml]="block.bodyHtml" />
              }
              @default {
                <div [innerHTML]="block.html | safeHtml"></div>
              }
            }
          }
        </div>

        <div footer class="pt-10 pb-12">
          <upala-button [routerLink]="'/blog'" variant="ghost">
            <upala-icon name="arrow-right" [size]="18" class="rotate-180" />
            Retour aux carnets
          </upala-button>
        </div>

        <upala-table-of-contents aside [entries]="post.toc" />
      </upala-article-layout>
    } @else {
      <div class="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <p class="text-stone-600">Carnet introuvable.</p>
        <div class="mt-6">
          <upala-button [routerLink]="'/blog'">Voir tous les carnets</upala-button>
        </div>
      </div>
    }
  `,
})
export default class ArticlePage {
  /** Bound from the `:slug` route param via `withComponentInputBinding`. */
  readonly slug = input.required<string>();

  private readonly blog = inject(BlogService);
  private readonly seo = inject(SeoService);

  protected readonly article = toSignal(
    toObservable(this.slug).pipe(
      switchMap((slug) => this.blog.getArticle(slug)),
      tap((post) => {
        if (post) {
          this.seo.update({
            title: post.title,
            description: post.excerpt,
            image: post.coverImage,
            type: 'article',
            tags: post.tags,
            author: post.author,
            publishedTime: post.date,
            url: `https://un-pas-apres-l-autre.example/article/${post.slug}`,
          });
        }
      }),
    ),
    { initialValue: undefined },
  );
}
