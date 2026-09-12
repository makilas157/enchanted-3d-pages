import { useEffect, useRef } from "react";

type Variant = "hero" | "header" | "ambient";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

const DENSITY: Record<Variant, number> = {
  ambient: 0.00009,
  hero: 0.00014,
  header: 0.00012,
};

const LINK_DIST: Record<Variant, number> = {
  ambient: 130,
  hero: 110,
  header: 100,
};

function Field({ variant }: { variant: Variant }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    const pointer = { x: -9999, y: -9999 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(24, Math.floor(width * height * DENSITY[variant]));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
      }));
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };

    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      const linkDist = LINK_DIST[variant];

      for (const p of particles) {
        // gentle drift + pointer repulsion
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 120 * 120) {
          const d = Math.sqrt(d2) || 1;
          const force = ((120 - d) / 120) * 0.06;
          p.vx += (dx / d) * force;
          p.vy += (dy / d) * force;
        }
        p.vx = Math.max(-0.6, Math.min(0.6, p.vx));
        p.vy = Math.max(-0.6, Math.min(0.6, p.vy));
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
      }

      // connecting lines
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]!;
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkDist * linkDist) {
            const alpha = (1 - Math.sqrt(d2) / linkDist) * 0.28;
            ctx.strokeStyle = `rgba(232, 163, 74, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // glowing dots
      for (const p of particles) {
        ctx.fillStyle = "rgba(240, 178, 92, 0.85)";
        ctx.shadowColor = "rgba(240, 178, 92, 0.9)";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [variant]);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}

export function ParticleField({
  variant = "header",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  const ambient = variant === "ambient";

  return (
    <div
      aria-hidden="true"
      className={`${
        ambient
          ? "pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-45"
          : "pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-70"
      } ${className}`}
    >
      <Field variant={variant} />
    </div>
  );
}
