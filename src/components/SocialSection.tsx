import { ArrowRight, Facebook, Instagram, MessageCircle, Twitter } from "lucide-react";
import { useRef } from "react";
import { socials } from "@/data/site";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const icons = [Instagram, MessageCircle, Facebook, Twitter];

export function SocialSection() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--gx", `${e.clientX - r.left}px`);
        el.style.setProperty("--gy", `${e.clientY - r.top}px`);
      }}
      className="section-y relative overflow-hidden bg-surface"
      style={{ "--gx": "50%", "--gy": "50%" } as React.CSSProperties}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(400px circle at var(--gx) var(--gy), oklch(0.68 0.19 40 / 0.12), transparent 70%)",
        }}
      />
      <div className="container-x relative">
        <Reveal>
          <SectionHeading
            tag="Connect"
            title={
              <>
                Follow what we&apos;re <span className="text-gradient">building.</span>
              </>
            }
            intro="Process notes, product releases and the occasional build teardown."
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {socials.map((s, i) => {
            const Icon = icons[i % icons.length]!;
            return (
              <Reveal key={s.name} delay={i * 70}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="depth-card group flex items-center justify-between gap-4 p-6"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-accent" />
                    <span>
                      <span className="block text-sm font-semibold">{s.name}</span>
                      <span className="block text-xs text-muted-foreground">{s.handle}</span>
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-accent transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
