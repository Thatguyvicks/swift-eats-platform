import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { storesByVertical, verticals, type Store, type Vertical } from "@/data/stores";

export const Route = createFileRoute("/v/$vertical")({
  component: VerticalPage,
  loader: ({ params }) => {
    const v = verticals.find((x) => x.slug === params.vertical);
    if (!v) throw notFound();
    return { vertical: v, stores: storesByVertical(v.slug as Vertical) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.vertical.name} delivery — Hilldash` },
          { name: "description", content: loaderData.vertical.tagline },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold">Vertical not found</h1>
        <Link to="/" className="mt-4 inline-block text-primary">Back home</Link>
      </div>
    </div>
  ),
});

function VerticalPage() {
  const { vertical, stores } = Route.useLoaderData() as { vertical: typeof verticals[number]; stores: Store[] };
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-6 pt-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-5xl">{vertical.emoji}</div>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl font-black">{vertical.name}</h1>
            <p className="text-muted-foreground mt-1">{vertical.tagline}</p>
          </div>
          <div className="flex gap-2">
            {verticals.map((v) => (
              <Link
                key={v.slug} to="/v/$vertical" params={{ vertical: v.slug }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border ${v.slug === vertical.slug ? "bg-foreground text-background border-foreground" : "bg-card border-border hover:bg-secondary"}`}
              >
                {v.emoji} {v.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {stores.map((s) => (
          <Link key={s.slug} to="/store/$slug" params={{ slug: s.slug }} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <img src={s.cover} alt={s.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 left-3 flex gap-1.5">
                {s.tags.map((t) => (
                  <span key={t} className="px-2 py-1 text-[11px] font-semibold rounded-full bg-background/90 backdrop-blur">{t}</span>
                ))}
              </div>
            </div>
            <div className="mt-3 flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold">{s.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.cuisine}</div>
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold">
                <Star className="w-4 h-4 fill-foreground" /> {s.rating}
              </div>
            </div>
            <div className="mt-1.5 text-xs text-muted-foreground flex items-center gap-3">
              <span>{s.eta}</span><span>·</span><span>{s.fee} delivery</span><span>·</span><span>{s.distance}</span>
            </div>
          </Link>
        ))}
        {stores.length === 0 && (
          <div className="col-span-full py-20 text-center text-muted-foreground">No stores yet in this category.</div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
