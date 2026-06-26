import { ChangeDetectionStrategy, Component, input } from '@angular/core';

type IconName =
  | 'mountain'
  | 'map'
  | 'compass'
  | 'tent'
  | 'arrow-right'
  | 'clock'
  | 'calendar'
  | 'tag'
  | 'menu'
  | 'close';

const PATHS: Record<IconName, string> = {
  mountain: 'M3 20h18L14 7l-3.5 6L8 9z',
  map: 'M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14',
  compass: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm3.5 6.5-2 5-5 2 2-5 5-2z',
  tent: 'M12 4 3 20h18L12 4zM12 4v16',
  'arrow-right': 'M5 12h14M13 6l6 6-6 6',
  clock: 'M12 7v5l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z',
  calendar:
    'M7 3v3M17 3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z',
  tag: 'M3 12V5a2 2 0 0 1 2-2h7l9 9-9 9-9-9zM7.5 7.5h.01',
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'M6 6l12 12M18 6 6 18',
};

/** Minimal inline SVG icon atom (no icon-font dependency). */
@Component({
  selector: 'upala-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path [attr.d]="path()" />
    </svg>
  `,
})
export class IconComponent {
  readonly name = input.required<IconName>();
  readonly size = input(20);

  protected path(): string {
    return PATHS[this.name()];
  }
}
