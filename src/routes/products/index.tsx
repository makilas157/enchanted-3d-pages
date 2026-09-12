import { createFileRoute } from "@tanstack/react-router";
import { CatalogCard } from "@/components/CatalogCard";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { products } from "@/data/site";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Products — FlowDesk, Pulseboard & CartSuite | Tevexxo" },
      {
        name: "description",
        content:
          "In-house Tevexxo products: FlowDesk project workspace, Pulseboard live dashboards, CartSuite headless commerce and custom platforms.",
      },
      { property: "og:title", content: "Products — Tevexxo" },
      {
        property: "og:description",
        content: "Tools shaped by real work — the Tevexxo product suite.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <>
      <PageHeader
        tag="Products"
        title={
          <>
            Software we built <span className="text-gradient">for ourselves first.</span>
          </>
        }
        intro="Each product came out of a gap in our own delivery work, then earned its place with clients."
      />
      <section className="section-y">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <CatalogCard item={p} to="/products/$slug" index={i} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
