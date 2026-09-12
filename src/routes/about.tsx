import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import cardDesign from "@/assets/card-design.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Tevexxo — Our story, mission and values" },
      {
        name: "description",
        content:
          "Tevexxo is a software and product studio building systems businesses depend on. Our story, values and the way we work.",
      },
      { property: "og:title", content: "About Tevexxo" },
      {
        property: "og:description",
        content: "Build. Learn. Scale. The story behind the Tevexxo studio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const timeline = [
  {
    year: "2020",
    body: "Two engineers, one contract and a rented desk. First client platform shipped in eleven weeks.",
  },
  {
    year: "2021",
    body: "Design joined the team. We stopped taking briefs we couldn't shape ourselves.",
  },
  {
    year: "2023",
    body: "FlowDesk launched as an internal tool, then became our first commercial product.",
  },
  {
    year: "2024",
    body: "Cloud and data practice formed to support platforms that had outgrown their infrastructure.",
  },
  {
    year: "2026",
    body: "Thirty products shipped, forty clients, and the same rule: senior people, start to finish.",
  },
];

const values = [
  { title: "Craft over volume", body: "We take fewer projects so each one gets real attention." },
  {
    title: "Plain language",
    body: "No jargon shields. If we can't explain a decision, we reconsider it.",
  },
  {
    title: "Own the outcome",
    body: "We measure ourselves on what the software changed, not hours logged.",
  },
];

function AboutPage() {
  return (
    <>
      <PageHeader
        tag="About"
        title={
          <>
            Build. Learn. <span className="text-gradient">Scale.</span>
          </>
        }
        intro="Tevexxo is a studio of engineers and designers who like the unglamorous part of software: making it last."
      />

      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading
              tag="Our mission"
              title="Software that carries real weight."
              intro="We exist for the systems people use every day at work — the ones where a slow page or a broken flow costs money."
            />
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                Tevexxo started in 2020 with a simple frustration: too much business software was
                being delivered by whoever was cheapest, then quietly abandoned. We wanted to build
                the other kind — systems with owners, documentation and a future.
              </p>
              <p>
                Today we split our time between client platforms and our own product suite. Running
                products keeps us honest: we live with the same decisions we recommend, including
                the maintenance.
              </p>
              <p>
                We stay deliberately small. Every engagement is staffed by senior practitioners who
                stay from the first workshop to the handover, which is the only way we know to keep
                quality predictable.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <img
              src={cardDesign}
              alt="Tevexxo studio design work"
              loading="lazy"
              width={1024}
              height={768}
              className="article-image-3d w-full rounded-xl border border-border object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="section-y border-y border-border/60 bg-surface/40">
        <div className="container-x">
          <Reveal>
            <SectionHeading tag="Timeline" title="How we got here." />
          </Reveal>
          <ol className="mt-12 space-y-0 border-l border-border">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 60}>
                <li className="relative pb-10 pl-8">
                  <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
                  <span className="font-display text-sm font-semibold text-primary">{t.year}</span>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {t.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <Reveal>
            <SectionHeading tag="Values" title="Three things we don't trade away." />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <div className="depth-card h-full p-7">
                  <h3 className="font-display text-lg font-semibold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-12">
              <Link to="/contact" className="btn-solid">
                Work with us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
