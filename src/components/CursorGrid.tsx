import { useEffect, useRef } from "react";

/**
 * Subtle dot-grid backdrop with a soft glow that follows the cursor.
 * Purely decorative — pointer events pass through.
 */
export function CursorGrid({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ "--mx": "50%", "--my": "50%" } as React.CSSProperties}
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, oklch(0.72 0.16 70 / 0.35) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(220px circle at var(--mx) var(--my), black 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(220px circle at var(--mx) var(--my), black 0%, transparent 75%)",
        }}
      />
      <div
        className="light-orb -top-24 left-[8%] h-72 w-72"
        style={{ background: "oklch(0.72 0.16 70 / 0.55)" }}
      />
      <div
        className="light-orb top-1/3 right-[6%] h-96 w-96"
        style={{ background: "oklch(0.68 0.19 40 / 0.45)", animationDelay: "-7s" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx) var(--my), oklch(0.68 0.19 40 / 0.14), transparent 70%)",
        }}
      />
    </div>
  );
}
