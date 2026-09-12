import { useRouterState } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";

const AmbientScene = lazy(() => import("./three/AmbientScene"));

export function ThreeBackdrop() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div aria-hidden="true" className="three-backdrop">
      <Suspense fallback={null}>
        <AmbientScene pathname={pathname} />
      </Suspense>
    </div>
  );
}