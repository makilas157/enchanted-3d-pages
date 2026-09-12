import { Link } from "@tanstack/react-router";
import { navLinks } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface">
      <div className="container-x grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="logo-mark" />
            <span className="font-display text-lg font-semibold">tevexxo</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Build. Learn. Scale.</p>
        </div>
        <div className="flex flex-wrap items-start gap-x-6 gap-y-3 md:justify-center">
          {navLinks.slice(0, 5).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <p className="text-sm text-muted-foreground md:text-right">
          © {new Date().getFullYear()} Tevexxo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
