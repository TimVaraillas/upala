/**
 * Dependency-free GPX parsing utilities.
 *
 * A GPX file is plain XML, so we parse it with the platform `DOMParser`
 * (available in the browser). From the track points we derive the geometry
 * plus useful stats: total distance, elevation gain/loss and an elevation
 * profile suitable for a lightweight SVG sparkline.
 */

export interface GpxPoint {
  lat: number;
  lon: number;
  /** Elevation in metres, when present in the file. */
  ele?: number;
}

export interface GpxTrack {
  name?: string;
  points: GpxPoint[];
  /** Total 2D distance along the track, in metres. */
  distance: number;
  /** Cumulative positive elevation change, in metres. */
  elevationGain: number;
  /** Cumulative negative elevation change, in metres. */
  elevationLoss: number;
  minElevation: number;
  maxElevation: number;
  /** [southWest, northEast] bounds as [lat, lon] pairs. */
  bounds: [[number, number], [number, number]];
}

const EARTH_RADIUS_M = 6_371_000;

/** Parse a GPX XML string into a structured, stat-rich track. */
export function parseGpx(xml: string): GpxTrack {
  const doc = new DOMParser().parseFromString(xml, 'application/xml');

  if (doc.querySelector('parsererror')) {
    throw new Error('Invalid GPX: XML could not be parsed.');
  }

  const name =
    doc.querySelector('trk > name')?.textContent?.trim() ||
    doc.querySelector('metadata > name')?.textContent?.trim() ||
    undefined;

  // Track points (trkpt) first; fall back to route points (rtept).
  const nodes = doc.querySelectorAll('trkpt, rtept');
  const points: GpxPoint[] = [];

  nodes.forEach((node) => {
    const lat = Number(node.getAttribute('lat'));
    const lon = Number(node.getAttribute('lon'));
    if (Number.isNaN(lat) || Number.isNaN(lon)) {
      return;
    }
    const eleText = node.querySelector('ele')?.textContent;
    const ele = eleText != null ? Number(eleText) : undefined;
    points.push({ lat, lon, ele: Number.isNaN(ele as number) ? undefined : ele });
  });

  return buildTrack(name, points);
}

function buildTrack(name: string | undefined, points: GpxPoint[]): GpxTrack {
  let distance = 0;
  let elevationGain = 0;
  let elevationLoss = 0;
  let minElevation = Infinity;
  let maxElevation = -Infinity;
  let minLat = Infinity;
  let minLon = Infinity;
  let maxLat = -Infinity;
  let maxLon = -Infinity;

  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    minLat = Math.min(minLat, p.lat);
    maxLat = Math.max(maxLat, p.lat);
    minLon = Math.min(minLon, p.lon);
    maxLon = Math.max(maxLon, p.lon);

    if (p.ele != null) {
      minElevation = Math.min(minElevation, p.ele);
      maxElevation = Math.max(maxElevation, p.ele);
    }

    if (i > 0) {
      distance += haversine(points[i - 1], p);
      const prevEle = points[i - 1].ele;
      if (prevEle != null && p.ele != null) {
        const delta = p.ele - prevEle;
        if (delta > 0) {
          elevationGain += delta;
        } else {
          elevationLoss += -delta;
        }
      }
    }
  }

  return {
    name,
    points,
    distance,
    elevationGain: Math.round(elevationGain),
    elevationLoss: Math.round(elevationLoss),
    minElevation: minElevation === Infinity ? 0 : Math.round(minElevation),
    maxElevation: maxElevation === -Infinity ? 0 : Math.round(maxElevation),
    bounds: [
      [minLat, minLon],
      [maxLat, maxLon],
    ],
  };
}

/** Great-circle distance between two points, in metres. */
function haversine(a: GpxPoint, b: GpxPoint): number {
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(h));
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * Build an SVG polyline `points` string for an elevation profile fitting a
 * `width` x `height` box. Returns an empty string when no elevation data.
 */
export function elevationProfilePath(
  track: GpxTrack,
  width: number,
  height: number,
): string {
  const elePoints = track.points.filter((p) => p.ele != null) as Required<GpxPoint>[];
  if (elePoints.length < 2 || track.maxElevation === track.minElevation) {
    return '';
  }

  const range = track.maxElevation - track.minElevation;
  const stepX = width / (elePoints.length - 1);

  return elePoints
    .map((p, i) => {
      const x = i * stepX;
      const y = height - ((p.ele - track.minElevation) / range) * height;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

/** A point in the elevation profile with its position along the track. */
export interface ProfilePoint {
  /** Cumulative distance from start, in metres. */
  dist: number;
  /** Elevation in metres. */
  ele: number;
  /** Original index in GpxTrack.points. */
  index: number;
}

/** Compute the elevation profile data with cumulative distance per point. */
export function computeProfileData(track: GpxTrack): ProfilePoint[] {
  const result: ProfilePoint[] = [];
  let cumDist = 0;
  for (let i = 0; i < track.points.length; i++) {
    const p = track.points[i];
    if (i > 0) {
      cumDist += haversine(track.points[i - 1], p);
    }
    if (p.ele != null) {
      result.push({ dist: cumDist, ele: p.ele, index: i });
    }
  }
  return result;
}

/** Format a distance in metres as a human-readable string. */
export function formatDistance(metres: number): string {
  return metres >= 1000
    ? `${(metres / 1000).toFixed(1)} km`
    : `${Math.round(metres)} m`;
}
