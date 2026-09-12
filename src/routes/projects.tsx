import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { projects } from "@/data/site";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Case studies & client work | Tevexxo" },
      {
        name: "description",
        content:
          "Selected Tevexxo case studies across logistics, commerce, healthcare, fintech and industrial software.",
      },
      { property: "og:title", content: "Projects — Tevexxo case studies" },
      {
        property: "og:description",
        content: "Client platforms, portals and products delivered by Tevexxo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <>
      <PageHeader
        tag="Projects"
        title={
          <>
            Work measured by <span className="text-gradient">what changed after.</span>
          </>
        }
        intro="A selection of platforms we've delivered, with the outcome that mattered to the business."
      />

      <section className="section-y">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              tag="Featured"
              title="Recent delivery"
              intro="Swipe through a few of the systems currently running in production."
            />
          </Reveal>
          <div className="mt-12">
            <ProjectCarousel />
          </div>
        </div>
      </section>

      <section className="section-y border-t border-border/60 bg-surface/40">
        <div className="container-x">
          <Reveal>
            <SectionHeading tag="Archive" title="All case studies" />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <article className="depth-card h-full overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="aspect-[16/10] w-full object-cover"
                  />
                  <div className="p-6">
                    <span className="section-tag">{p.sector}</span>
                    <h3 className="mt-3 font-display text-lg font-semibold">{p.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.result}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
