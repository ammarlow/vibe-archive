import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  drift: number;
  hue: number;
};

type Shooting = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
};

export function BackgroundFX() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars: Star[] = [];
    let shootingStars: Shooting[] = [];
    let rafId = 0;
    let lastTime = performance.now();
    let nextShootingAt = performance.now() + 2500;
    let running = true;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = prefersReducedMotion ? 0.00009 : 0.00018;
      const count = Math.max(60, Math.floor(width * height * density));
      stars = new Array(count).fill(0).map(() => makeStar(width, height));
    };

    const makeStar = (w: number, h: number): Star => {
      const depth = Math.random();
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.3 + depth * 1.6,
        baseAlpha: 0.25 + depth * 0.65,
        twinkleSpeed: 0.6 + Math.random() * 1.8,
        twinkleOffset: Math.random() * Math.PI * 2,
        drift: 0.005 + depth * 0.035,
        hue: 210 + Math.random() * 80,
      };
    };

    const spawnShootingStar = () => {
      const fromLeft = Math.random() > 0.5;
      const y = Math.random() * height * 0.6;
      const speed = 600 + Math.random() * 400;
      const angle = (Math.PI / 6) * (fromLeft ? 1 : -1) + Math.PI / 12;
      shootingStars.push({
        x: fromLeft ? -40 : width + 40,
        y,
        vx: Math.cos(angle) * speed * (fromLeft ? 1 : -1),
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 0.9 + Math.random() * 0.5,
      });
    };

    const render = (time: number) => {
      if (!running) return;
      const dt = Math.min(0.05, (time - lastTime) / 1000);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      for (const s of stars) {
        s.y += s.drift * 60 * dt;
        if (s.y > height + 2) {
          s.y = -2;
          s.x = Math.random() * width;
        }

        const twinkle = prefersReducedMotion
          ? 1
          : 0.55 +
            0.45 *
              Math.sin(
                (time / 1000) * s.twinkleSpeed + s.twinkleOffset
              );
        const alpha = s.baseAlpha * twinkle;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${s.hue}, 90%, 85%, ${alpha})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        if (s.r > 1.2) {
          ctx.beginPath();
          ctx.fillStyle = `hsla(${s.hue}, 90%, 85%, ${alpha * 0.15})`;
          ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!prefersReducedMotion && time >= nextShootingAt) {
        spawnShootingStar();
        nextShootingAt = time + 3500 + Math.random() * 5000;
      }

      shootingStars = shootingStars.filter((sh) => {
        sh.life += dt;
        sh.x += sh.vx * dt;
        sh.y += sh.vy * dt;
        const t = sh.life / sh.maxLife;
        if (t >= 1) return false;

        const fade = Math.sin(Math.PI * t);
        const tailLen = 120;
        const tx = sh.x - (sh.vx / 600) * tailLen;
        const ty = sh.y - (sh.vy / 600) * tailLen;

        const grad = ctx.createLinearGradient(sh.x, sh.y, tx, ty);
        grad.addColorStop(0, `rgba(255,255,255,${0.95 * fade})`);
        grad.addColorStop(0.4, `rgba(167,139,250,${0.55 * fade})`);
        grad.addColorStop(1, "rgba(167,139,250,0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${0.9 * fade})`;
        ctx.arc(sh.x, sh.y, 1.6, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      rafId = requestAnimationFrame(render);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
      } else if (!running) {
        running = true;
        lastTime = performance.now();
        rafId = requestAnimationFrame(render);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    rafId = requestAnimationFrame(render);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-ink-950" />

      <div className="aurora" />
      <div className="aurora-conic" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
      />

      <div className="grid-overlay" />

      <div className="vignette" />
    </div>
  );
}
