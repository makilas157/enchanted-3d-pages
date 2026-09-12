import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { projects } from "@/data/site";
import { Button } from "@/components/ui/button";

export function ProjectCarousel() {
  const track = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-6 flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Previous projects"
          onClick={() => scrollBy(-1)}
          className="rounded-full hover:border-accent/60"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Next projects"
          onClick={() => scrollBy(1)}
          className="rounded-full hover:border-accent/60"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div
        ref={track}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((p) => (
          <article
            key={p.slug}
            className="depth-card w-[85%] shrink-0 snap-start overflow-hidden sm:w-[60%] lg:w-[38%]"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                width={1024}
                height={768}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              <span className="section-tag absolute bottom-4 left-5">{p.sector}</span>
            </div>
            <div className="p-6">
              <h3 className="font-display text-lg font-semibold">{p.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.result}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
