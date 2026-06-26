import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import {
  GpxTrack,
  ProfilePoint,
  computeProfileData,
  formatDistance,
  parseGpx,
} from '../../core/utils/gpx';
import { IconComponent } from '../atoms/icon.component';

/**
 * Renders a GPX track on an interactive Leaflet map with an elevation
 * profile, key stats and a download link.
 *
 * SSR-safe: Leaflet touches `window`/`document`, so the map is initialised
 * only in the browser (`afterNextRender` + dynamic `import('leaflet')`).
 * During prerender a graceful fallback (caption + download button) is
 * emitted, then progressively enhanced on the client.
 */
@Component({
  selector: 'upala-gpx-viewer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
    <figure
      class="not-prose my-8 overflow-hidden rounded-2xl border border-sand-200 bg-white"
    >
      <div class="flex items-center justify-between gap-4 px-4 py-3">
        <figcaption
          class="flex items-center gap-2 text-sm font-medium text-stone-700"
        >
          <span class="text-moss-700"><upala-icon name="map" [size]="18" /></span>
          {{ title() || track()?.name || 'Trace GPX' }}
        </figcaption>
        <a
          [href]="src()"
          [download]="downloadName()"
          class="inline-flex items-center gap-1.5 rounded-full bg-moss-700 px-3 py-1.5 text-xs font-medium text-sand-50! transition-colors hover:bg-moss-800"
        >
          <upala-icon name="arrow-right" [size]="14" class="rotate-90" />
          Télécharger le GPX
        </a>
      </div>

      <!-- Map container (populated in the browser). -->
      <div
        #map
        class="h-72 w-full bg-sand-100"
        [class.hidden]="!isBrowser"
        role="img"
        [attr.aria-label]="'Carte de la trace ' + (title() || '')"
      ></div>

      @if (error()) {
        <p class="px-4 py-3 text-sm text-stone-500">
          La carte n'a pas pu être chargée. Vous pouvez télécharger la trace
          ci-dessus.
        </p>
      }

      @if (track(); as t) {
        <dl
          class="grid grid-cols-2 gap-px border-t border-sand-200 bg-sand-200 text-center sm:grid-cols-4"
        >
          <div class="bg-white px-3 py-3">
            <dt class="text-xs text-stone-500">Distance</dt>
            <dd class="text-sm font-semibold text-stone-800">
              {{ distanceLabel() }}
            </dd>
          </div>
          <div class="bg-white px-3 py-3">
            <dt class="text-xs text-stone-500">D+</dt>
            <dd class="text-sm font-semibold text-stone-800">
              {{ t.elevationGain }} m
            </dd>
          </div>
          <div class="bg-white px-3 py-3">
            <dt class="text-xs text-stone-500">D-</dt>
            <dd class="text-sm font-semibold text-stone-800">
              {{ t.elevationLoss }} m
            </dd>
          </div>
          <div class="bg-white px-3 py-3">
            <dt class="text-xs text-stone-500">Alt. max</dt>
            <dd class="text-sm font-semibold text-stone-800">
              {{ t.maxElevation }} m
            </dd>
          </div>
        </dl>

        @if (profileData().length > 1) {
          <div
            #profileContainer
            class="relative border-t border-sand-200 bg-white px-4 pt-3 pb-6"
            (mousemove)="onProfileMouseMove($event)"
            (mouseleave)="onProfileMouseLeave()"
          >
            <!-- Y-axis labels -->
            <div
              class="pointer-events-none absolute top-3 bottom-6 flex flex-col justify-between pl-1 text-[10px] text-stone-400"
              style="left: 4px; width: 36px"
            >
              <span>{{ t.maxElevation }} m</span>
              <span>{{ midElevation() }} m</span>
              <span>{{ t.minElevation }} m</span>
            </div>

            <!-- Profile SVG -->
            <svg
              #profileSvg
              [attr.viewBox]="profileViewBox()"
              preserveAspectRatio="none"
              class="ml-9 h-24 w-[calc(100%-2.25rem)]"
              aria-label="Profil d'élévation"
            >
              <!-- Filled area -->
              <polygon
                [attr.points]="filledProfilePath()"
                fill="var(--color-moss-100)"
                stroke="none"
              />
              <!-- Line -->
              <polyline
                [attr.points]="profileLinePath()"
                fill="none"
                stroke="var(--color-moss-500)"
                stroke-width="2"
                vector-effect="non-scaling-stroke"
              />
              <!-- Cursor indicator -->
              @if (cursorIndex() >= 0) {
                <line
                  [attr.x1]="cursorSvgX()"
                  [attr.x2]="cursorSvgX()"
                  y1="0"
                  [attr.y2]="profileHeight"
                  stroke="var(--color-moss-700)"
                  stroke-width="1"
                  vector-effect="non-scaling-stroke"
                  stroke-dasharray="3 2"
                />
                <circle
                  [attr.cx]="cursorSvgX()"
                  [attr.cy]="cursorSvgY()"
                  r="4"
                  fill="var(--color-moss-700)"
                  stroke="white"
                  stroke-width="1.5"
                  vector-effect="non-scaling-stroke"
                />
              }
            </svg>

            <!-- Cursor tooltip -->
            @if (cursorIndex() >= 0) {
              <div
                class="pointer-events-none absolute -top-1 rounded bg-stone-800 px-1.5 py-0.5 text-[10px] text-white whitespace-nowrap"
                [style.left.px]="cursorTooltipLeft()"
              >
                {{ cursorElevation() }} m · {{ cursorDistance() }}
              </div>
            }

            <!-- X-axis labels -->
            <div class="ml-9 flex justify-between text-[10px] text-stone-400">
              <span>0</span>
              <span>{{ distanceMid() }}</span>
              <span>{{ distanceLabel() }}</span>
            </div>
          </div>
        }
      }
    </figure>
  `,
})
export class GpxViewerComponent {
  readonly src = input.required<string>();
  readonly title = input<string>();

  protected readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly mapEl = viewChild<ElementRef<HTMLElement>>('map');
  private readonly profileContainer = viewChild<ElementRef<HTMLElement>>('profileContainer');
  private readonly profileSvg = viewChild<ElementRef<SVGElement>>('profileSvg');

  protected readonly track = signal<GpxTrack | null>(null);
  protected readonly error = signal(false);
  protected readonly cursorIndex = signal(-1);

  protected readonly profileWidth = 600;
  protected readonly profileHeight = 120;

  private leafletMap: import('leaflet').Map | null = null;
  private cursorMapMarker: import('leaflet').CircleMarker | null = null;
  private L: typeof import('leaflet') | null = null;

  protected readonly distanceLabel = computed(() => {
    const t = this.track();
    return t ? formatDistance(t.distance) : '—';
  });

  protected readonly profileData = computed<ProfilePoint[]>(() => {
    const t = this.track();
    return t ? computeProfileData(t) : [];
  });

  protected readonly midElevation = computed(() => {
    const t = this.track();
    if (!t) return 0;
    return Math.round((t.maxElevation + t.minElevation) / 2);
  });

  protected readonly distanceMid = computed(() => {
    const t = this.track();
    if (!t) return '—';
    return formatDistance(t.distance / 2);
  });

  protected readonly profileViewBox = computed(
    () => `0 0 ${this.profileWidth} ${this.profileHeight}`,
  );

  protected readonly profileLinePath = computed(() => {
    const data = this.profileData();
    const t = this.track();
    if (data.length < 2 || !t || t.maxElevation === t.minElevation) return '';
    const range = t.maxElevation - t.minElevation;
    const totalDist = data[data.length - 1].dist;
    if (totalDist === 0) return '';
    return data
      .map((p) => {
        const x = (p.dist / totalDist) * this.profileWidth;
        const y = this.profileHeight - ((p.ele - t.minElevation) / range) * this.profileHeight;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  });

  protected readonly filledProfilePath = computed(() => {
    const line = this.profileLinePath();
    if (!line) return '';
    return `0,${this.profileHeight} ${line} ${this.profileWidth},${this.profileHeight}`;
  });

  protected readonly cursorSvgX = computed(() => {
    const idx = this.cursorIndex();
    const data = this.profileData();
    if (idx < 0 || data.length < 2) return 0;
    const totalDist = data[data.length - 1].dist;
    return totalDist > 0 ? (data[idx].dist / totalDist) * this.profileWidth : 0;
  });

  protected readonly cursorSvgY = computed(() => {
    const idx = this.cursorIndex();
    const data = this.profileData();
    const t = this.track();
    if (idx < 0 || !t || data.length < 2 || t.maxElevation === t.minElevation) return 0;
    const range = t.maxElevation - t.minElevation;
    return this.profileHeight - ((data[idx].ele - t.minElevation) / range) * this.profileHeight;
  });

  protected readonly cursorElevation = computed(() => {
    const idx = this.cursorIndex();
    const data = this.profileData();
    if (idx < 0 || idx >= data.length) return 0;
    return Math.round(data[idx].ele);
  });

  protected readonly cursorDistance = computed(() => {
    const idx = this.cursorIndex();
    const data = this.profileData();
    if (idx < 0 || idx >= data.length) return '—';
    return formatDistance(data[idx].dist);
  });

  protected readonly cursorTooltipLeft = computed(() => {
    const idx = this.cursorIndex();
    const data = this.profileData();
    const container = this.profileContainer()?.nativeElement;
    if (idx < 0 || !data.length || !container) return 0;
    const totalDist = data[data.length - 1].dist;
    const ratio = totalDist > 0 ? data[idx].dist / totalDist : 0;
    // 36px for Y-axis labels + 16px left padding
    const svgLeft = 52;
    const svgWidth = container.clientWidth - svgLeft - 16;
    return svgLeft + ratio * svgWidth;
  });

  protected readonly downloadName = computed(() => {
    const parts = this.src().split('/');
    return parts[parts.length - 1] || 'trace.gpx';
  });

  constructor() {
    afterNextRender(() => void this.load());
  }

  protected onProfileMouseMove(event: MouseEvent): void {
    const svg = this.profileSvg()?.nativeElement;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, x / rect.width));
    const data = this.profileData();
    if (data.length < 2) return;
    const targetDist = ratio * data[data.length - 1].dist;
    const idx = this.findClosestProfileIndex(targetDist);
    this.cursorIndex.set(idx);
    this.updateMapCursor(idx);
  }

  protected onProfileMouseLeave(): void {
    this.cursorIndex.set(-1);
    this.removeMapCursor();
  }

  private findClosestProfileIndex(targetDist: number): number {
    const data = this.profileData();
    let lo = 0;
    let hi = data.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (data[mid].dist < targetDist) lo = mid + 1;
      else hi = mid;
    }
    if (lo > 0 && targetDist - data[lo - 1].dist < data[lo].dist - targetDist) {
      return lo - 1;
    }
    return lo;
  }

  private updateMapCursor(profileIdx: number): void {
    const data = this.profileData();
    const t = this.track();
    if (!this.leafletMap || !this.L || !t || profileIdx < 0 || profileIdx >= data.length) return;
    const pointIdx = data[profileIdx].index;
    const p = t.points[pointIdx];
    const latlng: [number, number] = [p.lat, p.lon];

    if (this.cursorMapMarker) {
      this.cursorMapMarker.setLatLng(latlng);
    } else {
      this.cursorMapMarker = this.L.circleMarker(latlng, {
        radius: 7,
        color: '#2f3e26',
        fillColor: '#faf7f0',
        fillOpacity: 1,
        weight: 2,
      }).addTo(this.leafletMap);
    }
  }

  private removeMapCursor(): void {
    if (this.cursorMapMarker) {
      this.cursorMapMarker.remove();
      this.cursorMapMarker = null;
    }
  }

  private onMapMouseMove(
    event: import('leaflet').LeafletMouseEvent,
    map: import('leaflet').Map,
  ): void {
    const data = this.profileData();
    const t = this.track();
    if (!t || data.length < 2) return;
    const { lat, lng } = event.latlng;

    // Find closest track point by squared geographic distance.
    let minDist = Infinity;
    let closestProfileIdx = 0;
    for (let i = 0; i < data.length; i++) {
      const p = t.points[data[i].index];
      const d = (p.lat - lat) ** 2 + (p.lon - lng) ** 2;
      if (d < minDist) {
        minDist = d;
        closestProfileIdx = i;
      }
    }

    // Only show cursor if mouse is close enough to the trace (within ~15px).
    const closestPt = t.points[data[closestProfileIdx].index];
    const ptScreen = map.latLngToContainerPoint([closestPt.lat, closestPt.lon]);
    const mouseScreen = map.latLngToContainerPoint(event.latlng);
    const screenDist = ptScreen.distanceTo(mouseScreen);

    if (screenDist < 15) {
      this.cursorIndex.set(closestProfileIdx);
      this.updateMapCursor(closestProfileIdx);
    } else {
      this.cursorIndex.set(-1);
      this.removeMapCursor();
    }
    this.cdr.markForCheck();
  }

  private onMapMouseLeave(): void {
    this.cursorIndex.set(-1);
    this.removeMapCursor();
    this.cdr.markForCheck();
  }

  private async load(): Promise<void> {
    try {
      const response = await fetch(this.src());
      if (!response.ok) {
        throw new Error(`GPX fetch failed: ${response.status}`);
      }
      const track = parseGpx(await response.text());
      this.track.set(track);
      await this.renderMap(track);
    } catch {
      this.error.set(true);
    }
  }

  private async renderMap(track: GpxTrack): Promise<void> {
    const host = this.mapEl()?.nativeElement;
    if (!host || track.points.length < 2) {
      return;
    }

    // Leaflet ships as a CommonJS module: in the optimized production build it
    // is bundled with a single `default` export, whereas the dev server exposes
    // named exports directly. Unwrap `default` so `L.map`/`L.tileLayer` exist in
    // both environments.
    const leaflet = await import('leaflet');
    const L = leaflet.default ?? leaflet;
    this.L = L;

    const map = L.map(host, { scrollWheelZoom: false });
    this.leafletMap = map;

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 18,
      crossOrigin: true,
    }).addTo(map);

    const latlngs = track.points.map((p) => [p.lat, p.lon] as [number, number]);
    L.polyline(latlngs, { color: '#475f36', weight: 4 }).addTo(map);

    // Map-level mouse tracking for bidirectional profile ↔ map interaction.
    map.on('mousemove', (e: import('leaflet').LeafletMouseEvent) => {
      this.onMapMouseMove(e, map);
    });
    map.on('mouseout', () => this.onMapMouseLeave());

    // Start / end markers as SVG circles (no image assets to resolve).
    L.circleMarker(latlngs[0], {
      radius: 6,
      color: '#2f3e26',
      fillColor: '#74945b',
      fillOpacity: 1,
    }).addTo(map);
    L.circleMarker(latlngs[latlngs.length - 1], {
      radius: 6,
      color: '#2f3e26',
      fillColor: '#b5482e',
      fillOpacity: 1,
    }).addTo(map);

    const fit = () => map.fitBounds(track.bounds, { padding: [24, 24] });
    fit();

    requestAnimationFrame(() => {
      map.invalidateSize({ animate: false });
      fit();
    });
  }
}
