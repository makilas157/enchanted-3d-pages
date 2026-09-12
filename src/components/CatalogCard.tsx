import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import type { CatalogItem } from "@/data/site";

export function CatalogCard({
  item,
  to,
  index = 0,
}: {
  item: CatalogItem;
  to: "/services/$slug" | "/products/$slug";
  index?: number;
}) {
  const card = useRef<HTMLAnchorElement>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    event.currentTarget.style.setProperty("--tilt-x", `${(0.5 - y) * 7}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${(x - 0.5) * 8}deg`);
    event.currentTarget.style.setProperty("--light-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--light-y", `${y * 100}%`);
  };

  const resetTilt = () => {
    card.current?.style.setProperty("--tilt-x", "0deg");
    card.current?.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <div className="card-perspective float-soft h-full" style={{ animationDelay: `${(index % 4) * 0.45}s` }}>
    <Link
      ref={card}
      to={to}
      params={{ slug: item.slug }}
      className="catalog-card depth-tilt group glow-hover block h-full"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onBlur={resetTilt}
    >
      <span aria-hidden="true" className="card-specular" />
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-lg font-semibold">{item.title}</h3>
          <ArrowUpRight className="mt-1 h-4 w-4 text-accent transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
      </div>
    </Link>
    </div>
  );
}
