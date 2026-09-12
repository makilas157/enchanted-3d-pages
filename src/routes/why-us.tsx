import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Gauge, LifeBuoy, ShieldCheck, Sparkles, Users } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { stats } from "@/data/site";

export const Route = createFileRoute("/why-us")({
  head: () => ({
    meta: [
      { title: "Why Tevexxo — Senior teams, transparent delivery" },
      {
        name: "description",
        content:
          "Senior-only teams, transparent delivery, product thinking and post-launch support — why businesses choose Tevexxo.",
      },
      { property: "og:title", content: "Why Tevexxo" },
      {
        property: "og:description",
        content: "Senior-only teams, transparent delivery and support that outlasts launch.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WhyUsPage,
});

const values = [
  {
    icon: Users,
    title: "Senior-only teams",
    body: "The people in the kickoff are the people writing the code. No hand-off to juniors after the pitch.",
  },
  {
    icon: Gauge,
    title: "Transparent delivery",
    body: "Weekly demos, a visible backlog and honest estimates you can plan a business around.",
  },
  {
    icon: Sparkles,
    title: "Product thinking",
    body: "We push back on features that don't earn their keep, because we run our own products too.",
  },
  {
    icon: LifeBuoy,
    title: "Post-launch support",
    body: "Monitoring, iteration and a named contact after go-live — not a closed ticket.",
  },
  {
    icon: ShieldCheck,
    title: "Built to be handed over",
    body: "Typed, documented codebases your in-house team can take ownership of whenever you want.",
  },
  {
    icon: Compass,
    title: "One accountable partner",
    body: "Design, engineering and infrastructure in one contract, with one person answerable for it.",
  },
];

const process = [
  {
    step: "01",
    title: "Frame",
    body: "Workshops to define the outcome, constraints and success metric.",
  },
  {
    step: "02",
    title: "Shape",
    body: "Prototypes and architecture spikes that de-risk the hard parts early.",
  },
  {
    step: "03",
    title: "Build",
    body: "Two-week cycles with working software at the end of each one.",
  },
  {
    step: "04",
    title: "Scale",
    body: "Hardening, handover and a support rhythm that fits your team.",
  },
];

function WhyUsPage() {
  return (
    <>
      <PageHeader
        tag="Why us"
        title={
          <>
            Fewer surprises, <span className="text-gradient">better software.</span>
          </>
        }
        intro="We work the way we'd want an agency to work with us: small senior teams, visible progress, and no mystery around cost."
      />

      <section className="section-y">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 60}>
              <div className="depth-card h-full p-7">
                <v.icon className="h-6 w-6 text-accent" />
                <h3 className="mt-5 font-display text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-y border-y border-border/60 bg-surface/40">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              tag="How we work"
              title="A rhythm you can plan around."
              intro="Four phases, repeated as long as the product keeps growing."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 70}>
                <div className="glass-panel h-full p-7">
                  <span className="font-display text-3xl font-semibold text-primary">{p.step}</span>
                  <h3 className="mt-4 font-display text-base font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <dl className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-3xl font-semibold text-gradient">{s.value}</dt>
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
        <div className="container-x text-center">
          <Reveal>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Let&apos;s talk about <span className="text-gradient">your build.</span>
            </h2>
            <div className="mt-8 flex justify-center">
              <Link to="/contact" className="btn-solid">
                Start a project <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
