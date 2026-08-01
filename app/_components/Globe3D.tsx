"use client";

import { useEffect, useRef } from "react";
import createGlobe, { type Marker } from "cobe";

// The installed cobe build exposes `globe.update(state)` rather than the
// `onRender` callback its README documents (absent from both the shipped
// bundle and its type declarations in 2.0.1), so the render loop is driven
// here with our own requestAnimationFrame call.
export default function Globe3D({
  size = 600,
  markers = [],
}: {
  size?: number;
  markers?: Marker[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = canvas.offsetWidth || size;
    let phi = 0;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.13, 0.24, 0.52],
      markerColor: [0.36, 0.55, 0.94],
      glowColor: [0.22, 0.38, 0.72],
      markers,
    });

    let frameId = 0;
    const renderFrame = () => {
      phi += 0.0025;
      globe.update({ phi, width, height: width });
      frameId = requestAnimationFrame(renderFrame);
    };

    const onResize = () => {
      width = canvas.offsetWidth;
      globe.update({ phi, width, height: width });
    };
    window.addEventListener("resize", onResize);

    if (prefersReducedMotion) {
      globe.update({ phi, width, height: width });
    } else {
      frameId = requestAnimationFrame(renderFrame);
    }

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      globe.destroy();
    };
  }, [size, markers]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ width: size, height: size, maxWidth: "100%", aspectRatio: 1 }}
    />
  );
}
