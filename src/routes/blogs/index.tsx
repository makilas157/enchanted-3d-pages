import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { posts } from "@/data/site";

export const Route = createFileRoute("/blogs/")({
  head: () => ({
    meta: [
      { title: "Blog — Notes on building software | Tevexxo" },
      {
        name: "description",
        content:
          "Field notes from the Tevexxo studio on engineering, design systems, applied AI and performance.",
      },
      { property: "og:title", content: "Tevexxo Blog" },
      {
        property: "og:description",
        content: "Field notes on engineering, design systems, applied AI and performance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogsPage,
});

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function BlogsPage() {
  return (
    <>
      <PageHeader
        tag="Blogs"
        title={
          <>
            Notes from <span className="text-gradient">the build.</span>
          </>
        }
        intro="What we're learning while shipping — written for the people who have to maintain it afterwards."
      />
      <section className="section-y">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <Link to="/blogs/$slug" params={{ slug: p.slug }} className="catalog-card group">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <time dateTime={p.date}>{formatDate(p.date)}</time>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span>{p.readTime}</span>
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-4">
                    <h2 className="font-display text-lg leading-snug font-semibold">{p.title}</h2>
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
