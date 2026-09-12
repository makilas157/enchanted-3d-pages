import type { ReactNode } from "react";
import { CursorGrid } from "./CursorGrid";
import { ParticleField } from "./ParticleField";
import { SectionTag } from "./SectionHeading";

export function PageHeader({
  tag,
  title,
  intro,
}: {
  tag: string;
  title: ReactNode;
  intro?: string;
}) {
  return (
    <section className="page-header-depth relative overflow-hidden border-b border-border/60 pt-32 pb-16 lg:pt-40 lg:pb-24">
      <CursorGrid />
      <ParticleField variant="header" />
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(60%_100%_at_50%_0%,oklch(0.68_0.19_40/0.14),transparent)]" />
      <div aria-hidden="true" className="header-depth-rings">
        <span />
        <span />
        <span />
      </div>
      <div className="container-x relative z-10 max-w-3xl">
        <div className="rise-in"><SectionTag>{tag}</SectionTag></div>
        <h1 className="blur-in mt-4 text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl"
          style={{ animationDelay: "90ms" }}>
          {title}
        </h1>
        {intro ? (
          <p
            className="rise-in accent-rule mt-6 max-w-xl text-base text-muted-foreground"
            style={{ animationDelay: "200ms" }}
          >{intro}</p>
        ) : null}
      </div>
    </section>
  );
}
