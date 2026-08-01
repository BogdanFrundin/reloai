"use client";

import { useEffect, useRef } from "react";

const STAR_COUNT = 100;

type Star = {
  x: number;
  y: number;
  z: number; // simulated depth, 0.2 (far) .. 1 (near)
  twinklePhase: number;
  twinkleSpeed: number;
  baseOpacity: number;
};

type ShootingStar = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
};

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export default function Starfield({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: rand(0.2, 1),
      twinklePhase: rand(0, Math.PI * 2),
      twinkleSpeed: rand(0.5, 1.6),
      baseOpacity: rand(0.4, 1),
    }));

    let shootingStars: ShootingStar[] = [];
    let nextShootingStarIn = rand(3, 7);

    const drawStar = (star: Star, twinkle: number) => {
      const opacity = star.baseOpacity * twinkle * (0.35 + 0.65 * star.z);
      const radius = 0.4 + star.z * 1.6;
      ctx.beginPath();
      ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${Math.max(0, Math.min(1, opacity))})`;
      if (star.z > 0.75) {
        ctx.shadowColor = "rgba(255,255,255,0.6)";
        ctx.shadowBlur = radius * 2.5;
      } else {
        ctx.shadowBlur = 0;
      }
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const drawShootingStar = (s: ShootingStar) => {
      const t = s.life / s.maxLife;
      const fade = t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85;
      const opacity = Math.max(0, Math.min(1, fade));
      const angle = Math.atan2(s.vy, s.vx);
      const len = 110;
      const tailX = s.x - Math.cos(angle) * len;
      const tailY = s.y - Math.sin(angle) * len;
      const gradient = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
      gradient.addColorStop(0, "rgba(255,255,255,0)");
      gradient.addColorStop(0.7, `rgba(255,255,255,${opacity * 0.5})`);
      gradient.addColorStop(1, `rgba(255,255,255,${opacity})`);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2.2;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(s.x, s.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${opacity})`;
      ctx.shadowColor = "rgba(255,255,255,0.8)";
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    // Static, single-frame render for reduced-motion users: no drift, no
    // twinkle loop, no shooting stars.
    if (prefersReducedMotion) {
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) drawStar(star, 1);
      return () => window.removeEventListener("resize", resize);
    }

    let lastTime = performance.now();
    let rafId = 0;

    const frame = (time: number) => {
      // Capped generously so a slow device or a heavy neighboring WebGL
      // frame doesn't stall the drift/twinkle/shooting-star timers, while
      // still guarding against a huge jump after the tab was backgrounded.
      const dt = Math.min((time - lastTime) / 1000, 0.25);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        // Nearer stars (larger z) drift faster, reinforcing the parallax illusion.
        star.x -= (2 + star.z * 6) * dt;
        if (star.x < -2) {
          star.x = width + 2;
          star.y = Math.random() * height;
        }
        star.twinklePhase += star.twinkleSpeed * dt;
        const twinkle = 0.65 + 0.35 * Math.sin(star.twinklePhase);
        drawStar(star, twinkle);
      }

      nextShootingStarIn -= dt;
      if (nextShootingStarIn <= 0 && shootingStars.length < 2) {
        // Shallow angle so the streak stays within this short sky strip for
        // its whole fade — a steeper angle exits the bottom edge before the
        // fade-out finishes, on a card this short.
        const angle = rand(8, 16) * (Math.PI / 180);
        const speed = rand(280, 380);
        shootingStars.push({
          x: rand(0, width * 0.5),
          y: rand(0, height * 0.25),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: rand(0.6, 0.9),
        });
        nextShootingStarIn = rand(3.5, 8);
      }

      shootingStars = shootingStars.filter((s) => s.life < s.maxLife);
      for (const s of shootingStars) {
        s.life += dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        drawShootingStar(s);
      }

      rafId = requestAnimationFrame(frame);
    };
    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} style={{ width: "100%", height: "100%" }} />;
}
