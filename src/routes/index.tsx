import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import { CursorGrid } from "@/components/CursorGrid";
import { ParticleField } from "@/components/ParticleField";
import { CatalogCard } from "@/components/CatalogCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading, SectionTag } from "@/components/SectionHeading";
import { SocialSection } from "@/components/SocialSection";
import { NavConstellation } from "@/components/NavConstellation";
import { products, services, stats } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tevexxo — We build the tech your business runs on" },
      {
        name: "description",
        content:
          "Tevexxo is a next-gen tech studio: web and mobile engineering, product design, cloud and AI, plus our own suite of digital products.",
      },
      { property: "og:title", content: "Tevexxo — We build the tech your business runs on" },
      {
        property: "og:description",
        content:
          "Engineering that moves business forward. Custom software, product design and in-house tools from the Tevexxo studio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-24">
        <img
          src={heroImage}
          alt="Abstract luminous technology waves"
          width={1920}
          height={1088}
          className="float-soft absolute inset-0 h-full w-full scale-110 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/75 to-background" />
        <CursorGrid />
        <ParticleField variant="hero" />
        <div className="container-x relative z-10 py-20 text-center">
          <Reveal>
            <SectionTag>Next-gen tech studio</SectionTag>
          </Reveal>
          <Reveal delay={90}>
            <div className="relative">
              <span
                aria-hidden="true"
                className="heading-glow -top-16 -left-10 h-64 w-[32rem] max-w-full"
              />
              <h1 className="relative mx-auto mt-6 max-w-4xl text-4xl leading-[1.03] font-semibold sm:text-6xl lg:text-7xl">
                We build the tech <span className="text-gradient">your business runs on.</span>
              </h1>
            </div>
          </Reveal>
          <Reveal delay={180}>
            <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Tevexxo is a software and product studio. We design, engineer and ship the systems
              that carry real operations — then keep them sharp long after launch.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="btn-solid">
                Start a project <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/products" className="btn-outline">
                See our products <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={340}>
<dl className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="glass-panel float-soft glow-hover px-5 py-4"
                  style={{ animationDelay: `${i * 0.35}s` }}
                >
                  <dt className="font-display text-2xl font-semibold text-primary">{s.value}</dt>
                  <dd className="mt-1 text-xs tracking-wide text-muted-foreground uppercase">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              tag="What we do"
              title={
                <>
                  Engineering that moves <span className="text-gradient">business forward.</span>
                </>
              }
              intro="Four disciplines, one delivery team — so strategy, design and engineering never argue across a wall."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.slice(0, 3).map((s, i) => (
              <Reveal key={s.slug} delay={i * 80}>
                <CatalogCard item={s} to="/services/$slug" index={i} />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-10">
              <Link to="/services" className="btn-outline">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-y border-y border-border/60 bg-surface/40">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              tag="Our products"
              title={
                <>
                  Tools shaped by <span className="text-gradient">real work.</span>
                </>
              }
              intro="Everything we sell started as something we needed ourselves."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {products.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <CatalogCard item={p} to="/products/$slug" index={i} />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-10">
              <Link to="/products" className="btn-outline">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <NavConstellation />

      <SocialSection />
    </>
  );
}
