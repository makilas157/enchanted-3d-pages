import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { RouteSkeleton } from "@/components/RouteSkeleton";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { posts } from "@/data/site";

export const Route = createFileRoute("/blogs/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} | Tevexxo Blog` },
          { name: "description", content: loaderData.excerpt },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.excerpt },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [],
  }),
  pendingComponent: RouteSkeleton,
  component: PostPage,
});

function PostPage() {
  const post = Route.useLoaderData();

  return (
    <>
      <PageHeader
        tag={new Date(post.date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
        title={post.title}
        intro={post.excerpt}
      />
      <article className="section-y">
        <div className="container-x max-w-3xl">
          <Reveal>
            <img
              src={post.image}
              alt={post.title}
              loading="lazy"
              width={1024}
              height={768}
              className="article-image-3d w-full rounded-xl border border-border object-cover"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 space-y-5 text-base leading-relaxed text-muted-foreground">
              {post.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <div className="mt-12">
              <Link to="/blogs" className="btn-outline">
                <ArrowLeft className="h-4 w-4" /> All articles
              </Link>
            </div>
          </Reveal>
        </div>
      </article>
    </>
  );
}
