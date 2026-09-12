import { createFileRoute } from "@tanstack/react-router";
import { CatalogCard } from "@/components/CatalogCard";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { services } from "@/data/site";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Software engineering & design | Tevexxo" },
      {
        name: "description",
        content:
          "Web development, mobile applications, UI & UX design and cloud, data & AI — the full Tevexxo service catalogue.",
      },
      { property: "og:title", content: "Services — Software engineering & design | Tevexxo" },
      {
        property: "og:description",
        content: "Four disciplines, one delivery team. Explore what Tevexxo builds.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHeader
        tag="Services"
        title={
          <>
            Capability that spans <span className="text-gradient">the whole build.</span>
          </>
        }
        intro="Strategy, design and engineering under one roof, staffed by senior people who stay on the project."
      />
      <section className="section-y">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 70}>
              <CatalogCard item={s} to="/services/$slug" index={i} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
