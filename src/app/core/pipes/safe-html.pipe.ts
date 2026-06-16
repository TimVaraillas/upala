import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Mark trusted HTML as safe so Angular renders it verbatim via `[innerHTML]`.
 *
 * Angular's default sanitizer strips attributes such as `id` from bound HTML,
 * which breaks in-page anchors (e.g. table-of-contents links). Article content
 * is generated from our own Markdown files, so it is safe to bypass.
 */
@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(value: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
