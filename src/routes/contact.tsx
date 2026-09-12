import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SocialSection } from "@/components/SocialSection";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Tevexxo — Start a project" },
      {
        name: "description",
        content:
          "Tell us about your product or platform and we'll come back within one working day. Contact the Tevexxo studio.",
      },
      { property: "og:title", content: "Contact Tevexxo" },
      {
        property: "og:description",
        content: "Start a project with the Tevexxo studio — we reply within one working day.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const details = [
  { icon: Mail, label: "Email", value: "hello@tevexxo.com" },
  { icon: Phone, label: "Phone", value: "+1 (000) 000-0000" },
  { icon: MapPin, label: "Studio", value: "Remote-first, worldwide" },
];

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <Toaster />
      <PageHeader
        tag="Contact"
        title={
          <>
            Tell us what you&apos;re <span className="text-gradient">building.</span>
          </>
        }
        intro="Share the shape of the problem and we'll reply within one working day with next steps."
      />

      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <form
              className="glass-panel space-y-5 p-8"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                toast.success("Thanks — we'll be in touch within one working day.");
                (e.currentTarget as HTMLFormElement).reset();
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs tracking-wide text-muted-foreground uppercase">
                    Name
                  </span>
                  <input
                    required
                    name="name"
                    className="mt-2 w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                    placeholder="Your name"
                  />
                </label>
                <label className="block">
                  <span className="text-xs tracking-wide text-muted-foreground uppercase">
                    Email
                  </span>
                  <input
                    required
                    type="email"
                    name="email"
                    className="mt-2 w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                    placeholder="you@company.com"
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-xs tracking-wide text-muted-foreground uppercase">
                  Project details
                </span>
                <textarea
                  required
                  name="message"
                  rows={6}
                  className="mt-2 w-full resize-none rounded-lg border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                  placeholder="What are you building, and what does success look like?"
                />
              </label>
              <button type="submit" className="btn-solid">
                Send message <ArrowRight className="h-4 w-4" />
              </button>
              {sent ? (
                <p className="text-xs text-accent">
                  Message noted. Connect a backend later to deliver these to your inbox.
                </p>
              ) : null}
            </form>
          </Reveal>

          <Reveal delay={90}>
            <div className="space-y-4">
              {details.map((d) => (
                <div key={d.label} className="depth-card flex items-start gap-4 p-6">
                  <d.icon className="mt-0.5 h-5 w-5 text-accent" />
                  <div>
                    <p className="text-xs tracking-wide text-muted-foreground uppercase">
                      {d.label}
                    </p>
                    <p className="mt-1 text-sm font-medium">{d.value}</p>
                  </div>
                </div>
              ))}
              <div className="depth-card p-6">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Prefer a call? Mention a couple of time windows in your message and we&apos;ll
                  send an invite.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SocialSection />
    </>
  );
}
