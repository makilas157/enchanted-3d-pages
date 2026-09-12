import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import { navDestinations } from "@/data/site";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const NavConstellationScene = lazy(() => import("./three/NavConstellationScene"));

export function NavConstellation() {
  const [mounted, setMounted] = useState(false);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  const active = navDestinations.find((d) => d.slug === activeSlug) ?? navDestinations[0]!;

  return (
    <section className="section-y border-y border-border/60 bg-surface/40">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            tag="Explore"
            title={
              <>
                Every orbit opens <span className="text-gradient">its own page.</span>
              </>
            }
            intro="Hover a shard to preview the section, then click to open the full page."
          />
        </Reveal>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="nav-constellation">
            {mounted ? (
              <Suspense fallback={null}>
                <NavConstellationScene activeSlug={activeSlug} onHover={setActiveSlug} />
              </Suspense>
            ) : null}
          </div>

          <div className="glass-panel p-7">
            <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
              {activeSlug ? "Selected" : "Start here"}
            </p>
            <h3 className="font-display mt-3 text-2xl font-semibold">{active.label}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{active.blurb}</p>
            <Link to={active.to} className="btn-solid mt-6">
              Open {active.label} <ArrowRight className="h-4 w-4" />
            </Link>

            <ul className="mt-7 grid grid-cols-2 gap-2">
              {navDestinations.map((d) => (
                <li key={d.slug}>
                  <Link
                    to={d.to}
                    onPointerEnter={() => setActiveSlug(d.slug)}
                    onFocus={() => setActiveSlug(d.slug)}
                    className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground [&.active]:text-accent"
                  >
                    {d.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
