import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { RouteSkeleton } from "@/components/RouteSkeleton";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { services } from "@/data/site";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const item = services.find((s) => s.slug === params.slug);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Services | Tevexxo` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: `${loaderData.title} — Tevexxo` },
          { property: "og:description", content: loaderData.description },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [],
  }),
  pendingComponent: RouteSkeleton,
  component: ServiceDetail,
});

function ServiceDetail() {
  const item = Route.useLoaderData();

  return (
    <>
      <PageHeader tag="Service" title={item.title} intro={item.description} />
      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <Reveal>
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              width={1024}
              height={768}
              className="article-image-3d w-full rounded-xl border border-border object-cover"
            />
          </Reveal>
          <Reveal delay={90}>
            <p className="text-lg leading-relaxed text-muted-foreground">{item.detail}</p>
            <ul className="mt-8 space-y-3">
              {item.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-solid">
                Start a project <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/services" className="btn-outline">
                <ArrowLeft className="h-4 w-4" /> All services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
