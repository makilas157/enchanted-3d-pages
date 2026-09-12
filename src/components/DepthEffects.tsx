import { useEffect } from "react";

const SELECTOR = ".depth-card, .glass-panel, .article-image-3d";

export function DepthEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const surface = target.closest<HTMLElement>(SELECTOR);
      if (!surface || surface.classList.contains("depth-tilt")) return;
      const rect = surface.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      surface.style.setProperty("--surface-rx", `${y * -5}deg`);
      surface.style.setProperty("--surface-ry", `${x * 6}deg`);
      surface.style.setProperty("--surface-x", `${(x + 0.5) * 100}%`);
      surface.style.setProperty("--surface-y", `${(y + 0.5) * 100}%`);
    };

    const onOut = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const surface = target.closest<HTMLElement>(SELECTOR);
      if (!surface || surface.contains(event.relatedTarget as Node)) return;
      surface.style.removeProperty("--surface-rx");
      surface.style.removeProperty("--surface-ry");
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerout", onOut);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onOut);
    };
  }, []);

  return null;
}