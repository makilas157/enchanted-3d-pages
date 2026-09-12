import type { ReactNode } from "react";

export function SectionTag({ children }: { children: ReactNode }) {
  return <span className="section-tag">{children}</span>;
}

export function SectionHeading({
  tag,
  title,
  intro,
  align = "left",
}: {
  tag: string;
  title: ReactNode;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <SectionTag>{tag}</SectionTag>
      <h2 className="mt-4 text-3xl leading-[1.1] font-semibold sm:text-4xl lg:text-5xl">{title}</h2>
      {intro ? <p className="mt-4 text-base text-muted-foreground">{intro}</p> : null}
    </div>
  );
}
