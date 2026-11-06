import { useId } from 'react';

/*
 * ESN star outline — a vector redraw of the ESN logo star (public/esn_ukraine_star_logo.jpg):
 * eight rounded arms around a regular octagonal hole. Each arm starts on one side of the
 * octagon, bevels out to its full width and ends in rounded corners.
 *
 * Proportions measured from the logo (centre → outer tip = 96 units):
 *   octagon apothem 18.7 · half side 7.5 · arm half-width 14.4 · bevel ends 34.3 from centre
 *   · outer corner radius 5.7
 *
 * Arms are pre-rotated in JS (no SVG transforms), so the stroke gradient below stays in one
 * shared coordinate space and the light falls evenly from the top-left across the whole star.
 */

const ARM: [number, number][] = [
  [-7.5, -18.7], // inner edge on the octagon
  [7.5, -18.7],
  [14.4, -34.3], // bevel out to full width
  [14.4, -90.3], // outer end, before the rounded corner
  [8.7, -96],
  [-8.7, -96],
  [-14.4, -90.3],
  [-14.4, -34.3],
];
const CORNER_RADIUS = 5.7;

function armPath(angleDeg: number): string {
  const a = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(a);
  const sin = Math.sin(a);
  const p = ARM.map(([x, y]) => {
    const rx = x * cos - y * sin;
    const ry = x * sin + y * cos;
    return `${rx.toFixed(2)} ${ry.toFixed(2)}`;
  });
  const r = CORNER_RADIUS;
  return (
    `M ${p[0]} L ${p[1]} L ${p[2]} L ${p[3]} ` +
    `A ${r} ${r} 0 0 0 ${p[4]} L ${p[5]} A ${r} ${r} 0 0 0 ${p[6]} L ${p[7]} Z`
  );
}

const ARM_PATHS = Array.from({ length: 8 }, (_, i) => armPath(i * 45));

interface EsnStarOutlineProps {
  className?: string;
  /** Stroke opacity where the light hits (top-left); it fades to ~20% of this bottom-right */
  strokeOpacity?: number;
  /** Fill opacity of the arms (top-left), fading out bottom-right */
  fillOpacity?: number;
}

export default function EsnStarOutline({
  className,
  strokeOpacity = 0.16,
  fillOpacity = 0.035,
}: EsnStarOutlineProps) {
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox="-100 -100 200 200" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-stroke`} gradientUnits="userSpaceOnUse" x1="-100" y1="-100" x2="100" y2="100">
          <stop offset="0" stopColor="#fff" stopOpacity={strokeOpacity} />
          <stop offset="1" stopColor="#fff" stopOpacity={strokeOpacity * 0.2} />
        </linearGradient>
        <linearGradient id={`${id}-fill`} gradientUnits="userSpaceOnUse" x1="-100" y1="-100" x2="100" y2="100">
          <stop offset="0" stopColor="#fff" stopOpacity={fillOpacity} />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {ARM_PATHS.map((d) => (
        <path
          key={d}
          d={d}
          fill={`url(#${id}-fill)`}
          stroke={`url(#${id}-stroke)`}
          strokeWidth={1.5}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
