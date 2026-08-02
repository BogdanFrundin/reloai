"use client";

import Image from "next/image";
import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import Globe3D from "./Globe3D";
import Starfield from "./Starfield";
import { useAuth } from "./AuthProvider";
import { useDashboardProgress } from "./DashboardProgressProvider";
import { useLanguage } from "./LanguageProvider";
import { getFlagUrl } from "../_lib/flags";
import { getCountryName } from "../_lib/countries";
import { COUNTRY_COORDS } from "../_lib/countryCoords";

const COUNTRY_FLAG_CODE: Record<string, string> = { Poland: "pl", Germany: "de", Spain: "es" };
const COUNTRY_ORDER = ["Poland", "Germany", "Spain"];

const FLAG_ORIGIN_POS: [number, number] = [15, 83];
const FLAG_DEST_POS: [number, number] = [85, 83];

// P0/P2 are the flag positions themselves so the path always starts and ends
// exactly at each flag marker — both use the same 0-100 percentage
// coordinate space as the SVG's viewBox, so they can never drift apart.
const P0: [number, number] = FLAG_ORIGIN_POS;
const P1: [number, number] = [50, 15];
const P2: [number, number] = FLAG_DEST_POS;

// Rough numeric estimate of the quadratic bezier's arc length, computable
// synchronously with no DOM (same result on server and client). Used to seed
// pathLength before the exact getTotalLength() measurement lands, so the
// stroke-dasharray's gap value starts already close to correct instead of
// near-zero — animating a dasharray's gap from small to large makes the
// dash/gap pattern repeat along the path while it transitions, which renders
// as multiple disconnected dash fragments until the CSS transition settles.
function estimateQuadraticBezierLength(p0: [number, number], p1: [number, number], p2: [number, number], samples = 24) {
  let length = 0;
  let prevX = p0[0];
  let prevY = p0[1];
  for (let i = 1; i <= samples; i++) {
    const t = i / samples;
    const x = (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t ** 2 * p2[0];
    const y = (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t ** 2 * p2[1];
    length += Math.hypot(x - prevX, y - prevY);
    prevX = x;
    prevY = y;
  }
  return length;
}

const ESTIMATED_PATH_LENGTH = estimateQuadraticBezierLength(P0, P1, P2);

export default function FlightProgress() {
  const { t, lang } = useLanguage();
  const { profile } = useAuth();
  const { progressPercent, country } = useDashboardProgress();
  const planeGradientId = useId();

  const originCode = profile?.citizenship ?? null;
  const destCode = COUNTRY_FLAG_CODE[country] ?? "pl";
  const destIndex = COUNTRY_ORDER.indexOf(country);
  const destName = t.countries.list[destIndex === -1 ? 0 : destIndex]?.name ?? country;
  const originName = originCode ? getCountryName(originCode, lang) : null;

  const originCoords = originCode ? COUNTRY_COORDS[originCode] : null;
  const destCoords = COUNTRY_COORDS[destCode] ?? COUNTRY_COORDS.PL;
  const globeMarkers = useMemo(() => {
    const markers: { location: [number, number]; size: number }[] = [];
    if (originCoords) markers.push({ location: originCoords, size: 0.05 });
    markers.push({ location: destCoords, size: 0.05 });
    return markers;
  }, [originCoords, destCoords]);

  // Starts near the origin and is animated to the real value shortly after
  // mount (below) so the "flying in" transition reliably plays on every
  // visit to this page, instead of depending on incidental render timing.
  const [animatedT01, setAnimatedT01] = useState(0.04);

  useEffect(() => {
    // Clamped away from the very ends: 0.08 keeps the plane clear of the
    // origin flag marker at 0% progress (the most common state), 0.96 keeps
    // it clear of the destination marker at 100%.
    const targetT01 = Math.min(Math.max(progressPercent / 100, 0.08), 0.96);
    // Defer to the next frame so the browser registers the initial (near-origin)
    // position first, guaranteeing the transition to targetT01 is visible on
    // every mount, regardless of which page the user navigated from.
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimatedT01(targetT01));
    });
    return () => cancelAnimationFrame(raf);
  }, [progressPercent]);

  const pathD = `M ${P0[0]} ${P0[1]} Q ${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]}`;

  // The plane's position and the solid progress line's dasharray must both be
  // derived from the same actual rendered arc length (not the bezier t
  // parameter, which isn't linear in arc length) so the plane always sits
  // exactly at the line's tip instead of drifting apart from it.
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(ESTIMATED_PATH_LENGTH);

  useLayoutEffect(() => {
    // getTotalLength() is measured synchronously before the browser paints,
    // so it always reflects real, laid-out path geometry (never 0-by-timing).
    // The retry loop is a defensive fallback only, in case some browser ever
    // hands back 0 for a path that hasn't fully settled yet.
    const measure = () => {
      if (!pathRef.current) return;
      const len = pathRef.current.getTotalLength();
      if (len > 0) {
        setPathLength(len);
      } else {
        requestAnimationFrame(measure);
      }
    };
    measure();
  }, [pathD]);

  const solidLength = animatedT01 * pathLength;
  // Defensive fallback only — pathLength is never really 0 (it starts at the
  // estimate above), but a dasharray of "0 0" would render as a fully solid
  // stroke covering the whole path rather than "invisible" (per the SVG
  // spec, all-zero values disable dashing entirely), so this avoids that
  // degenerate case outright if it were ever hit.
  const dashArrayValue = pathLength > 0 ? `${solidLength} ${pathLength}` : "0 1";

  const plane = useMemo(() => {
    if (!pathRef.current) return { x: P0[0], y: P0[1], angle: 0 };
    const dist = solidLength;
    const point = pathRef.current.getPointAtLength(dist);
    const point2 = pathRef.current.getPointAtLength(Math.min(dist + 0.5, pathLength));
    // The path's viewBox is stretched non-uniformly onto the actual card
    // (preserveAspectRatio="none", wide-but-short container), so a tangent
    // computed directly in viewBox units doesn't match what's visually on
    // screen. Scale dx/dy by the path's screen CTM first so the angle
    // reflects the true rendered slope of the line.
    const ctm = pathRef.current.getScreenCTM();
    const dx = (point2.x - point.x) * (ctm?.a ?? 1);
    const dy = (point2.y - point.y) * (ctm?.d ?? 1);
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    return { x: point.x, y: point.y, angle };
  }, [solidLength, pathLength]);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border-subtle bg-gradient-to-b from-accent/10 via-surface-1 to-surface-1 p-6 sm:p-8">
      <div
        aria-hidden
        className="animate-blob-drift absolute -top-24 left-1/2 -z-0 h-[320px] w-[520px] -translate-x-1/2 rounded-full bg-accent/20 opacity-60 blur-[100px] motion-reduce:animate-none"
      />
      <div className="relative">
        <p className="text-sm font-semibold text-text-primary">{t.dashboard.home.flightHeading}</p>
        <p className="mt-1 text-xs text-text-muted">{t.dashboard.home.flightSub}</p>

        <div
          className="relative mt-6 h-[220px] w-full overflow-hidden sm:h-[260px]"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={t.dashboard.home.flightHeading}
        >
          {/* Sky: canvas-based depth starfield, drifting and twinkling behind the globe. */}
          <Starfield className="pointer-events-none absolute inset-0" />

          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[56%] flex h-[360px] w-[360px] -translate-x-1/2 items-center justify-center overflow-hidden rounded-full sm:top-[62%] sm:h-[620px] sm:w-[620px]"
            style={{ boxShadow: "0 24px 60px -20px rgba(2,6,20,0.65), 0 0 60px -8px rgba(120,170,255,0.5)" }}
          >
            <Globe3D size={620} markers={globeMarkers} />
          </div>

          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d={pathD} fill="none" stroke="var(--border-strong)" strokeWidth="0.6" strokeDasharray="2 2" />
            <path
              ref={pathRef}
              d={pathD}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="0.8"
              strokeDasharray={dashArrayValue}
              strokeLinecap="round"
              style={{ transition: "stroke-dasharray 2000ms var(--ease-out-strong)" }}
            />
          </svg>

          <div
            className="absolute flex flex-col items-center gap-1"
            style={{ left: `${FLAG_ORIGIN_POS[0]}%`, top: `${FLAG_ORIGIN_POS[1]}%`, transform: "translate(-50%, -50%)" }}
          >
            {originCode ? (
              <Image src={getFlagUrl(originCode, "md")} alt={originName ?? ""} width={36} height={27} className="rounded-md shadow-lg" unoptimized />
            ) : (
              <span
                role="img"
                aria-label={t.dashboard.home.flightOriginPlaceholder}
                className="flex h-[27px] w-9 items-center justify-center rounded-md border border-dashed border-border-strong bg-surface-1/80 shadow-lg"
              >
                <svg className="h-3.5 w-3.5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </span>
            )}
            <span className="whitespace-nowrap rounded-full bg-panel/90 px-2.5 py-0.5 text-[11px] font-medium text-text-muted">
              {originName ?? t.dashboard.home.flightOriginPlaceholder}
            </span>
          </div>

          <div
            className="absolute flex flex-col items-center gap-1"
            style={{ left: `${FLAG_DEST_POS[0]}%`, top: `${FLAG_DEST_POS[1]}%`, transform: "translate(-50%, -50%)" }}
          >
            <Image src={getFlagUrl(destCode, "md")} alt={destName} width={36} height={27} className="rounded-md shadow-lg" unoptimized />
            <span className="whitespace-nowrap rounded-full bg-panel/90 px-2.5 py-0.5 text-[11px] font-medium text-text-muted">{destName}</span>
          </div>

          <div
            className="absolute transition-[left,top] duration-[2000ms] ease-[var(--ease-out-strong)]"
            style={{
              left: `${plane.x}%`,
              top: `${plane.y}%`,
              transform: `translate(-50%, -50%) rotate(${plane.angle + 90}deg)`,
              filter: "drop-shadow(0 3px 6px rgba(2,6,20,0.5)) drop-shadow(0 0 10px rgba(91,141,239,0.55))",
            }}
          >
            <svg className="h-10 w-10 sm:h-11 sm:w-11" viewBox="0 0 24 24">
              <defs>
                <linearGradient id={planeGradientId} gradientUnits="userSpaceOnUse" x1="12" y1="0" x2="12" y2="24">
                  <stop offset="0%" stopColor="#f2f7ff" />
                  <stop offset="55%" stopColor="var(--accent-bright)" />
                  <stop offset="100%" stopColor="#2f56c4" />
                </linearGradient>
              </defs>
              <g fill={`url(#${planeGradientId})`}>
                {/* Main wings, swept back, roughly two-thirds down the fuselage */}
                <path d="M13.3,12.4 L22.6,17 L13.3,15.7 Z M10.7,12.4 L1.4,17 L10.7,15.7 Z" />
                {/* Tail wings, smaller, near the back */}
                <path d="M13,18.6 L17.6,21.1 L13,20.2 Z M11,18.6 L6.4,21.1 L11,20.2 Z" />
                {/* Fuselage */}
                <rect x="10.6" y="6" width="2.8" height="14.6" rx="1.4" />
                {/* Nose cone */}
                <path d="M12,1 L10.6,6.5 L13.4,6.5 Z" />
                {/* Vertical tail fin */}
                <path d="M12,18.9 L12.85,21.6 L12,22.6 L11.15,21.6 Z" />
                {/* Engine pods */}
                <ellipse cx="8.5" cy="15.3" rx="0.9" ry="1.9" />
                <ellipse cx="15.5" cy="15.3" rx="0.9" ry="1.9" />
              </g>
            </svg>
          </div>
        </div>

        <p className="mt-2 text-center text-sm font-semibold text-accent-bright">{progressPercent}%</p>
      </div>
    </div>
  );
}
