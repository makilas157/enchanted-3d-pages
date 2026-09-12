import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

/**
 * Re-mounts its children on every pathname change so the entrance
 * animation replays as the visitor moves between pages.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
