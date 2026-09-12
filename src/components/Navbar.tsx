import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navLinks } from "@/data/site";
import { CursorGrid } from "./CursorGrid";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-40 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <CursorGrid />
      <nav className="container-x relative flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="logo-mark logo-depth" />
          <span className="font-display text-lg font-semibold tracking-tight">tevexxo</span>
        </Link>

        <div className="nav-3d absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="nav-link-3d text-sm text-muted-foreground transition-colors hover:text-foreground [&.active]:text-accent"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <Link to="/contact" className="btn-solid hidden px-5 py-2 text-sm lg:inline-flex">
          Contact us
        </Link>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="rounded-md border border-border p-2 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-xl lg:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground [&.active]:text-accent"
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-solid mt-3 justify-center"
            >
              Contact us
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
