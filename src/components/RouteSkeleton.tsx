/**
 * Placeholder shown while a detail route's loader resolves, so navigation
 * never flashes a blank screen.
 */
export function RouteSkeleton() {
  return (
    <div aria-hidden className="animate-pulse">
      <section className="section-y">
        <div className="container-x">
          <div className="h-4 w-24 rounded bg-muted" />
          <div className="mt-6 h-10 w-2/3 rounded bg-muted md:h-12" />
          <div className="mt-5 h-4 w-full max-w-xl rounded bg-muted" />
          <div className="mt-3 h-4 w-4/5 max-w-md rounded bg-muted" />
        </div>
      </section>

      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div className="aspect-[4/3] w-full rounded-xl bg-muted" />
          <div className="space-y-4">
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-11/12 rounded bg-muted" />
            <div className="h-4 w-10/12 rounded bg-muted" />
            <div className="h-4 w-9/12 rounded bg-muted" />
            <div className="pt-6 space-y-3">
              <div className="h-4 w-3/4 rounded bg-muted" />
              <div className="h-4 w-2/3 rounded bg-muted" />
              <div className="h-4 w-1/2 rounded bg-muted" />
            </div>
            <div className="flex gap-3 pt-6">
              <div className="h-11 w-40 rounded-full bg-muted" />
              <div className="h-11 w-32 rounded-full bg-muted" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
