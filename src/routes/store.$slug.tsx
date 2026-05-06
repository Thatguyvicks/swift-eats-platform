import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, MapPin, Plus, Star } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { getStore, type Store } from "@/data/stores";
import { useCart } from "@/state/cart";

export const Route = createFileRoute("/store/$slug")({
  component: StorePage,
  loader: ({ params }): { store: Store } => {
    const store = getStore(params.slug);
    if (!store) throw notFound();
    return { store };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.store.name} — Forka` },
          { name: "description", content: `${loaderData.store.cuisine} delivered in ${loaderData.store.eta}.` },
          { property: "og:image", content: loaderData.store.cover },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold">Restaurant not found</h1>
        <Link to="/browse" className="mt-4 inline-block text-primary">Back to browse</Link>
      </div>
    </div>
  ),
});

function StorePage() {
  const { store } = Route.useLoaderData() as { store: Store };
  const { add } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img src={store.cover} alt={store.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <Link to="/browse" className="absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-2 rounded-full bg-background/80 backdrop-blur text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Browse
        </Link>
      </div>

      <section className="mx-auto max-w-5xl px-6 -mt-20 relative">
        <div className="bg-card rounded-3xl shadow-soft border border-border/60 p-6 sm:p-8">
          <div className="flex flex-wrap gap-2 mb-3">
            {store.tags.map((t) => (
              <span key={t} className="px-2.5 py-1 text-xs font-semibold rounded-full bg-secondary">{t}</span>
            ))}
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-black">{store.name}</h1>
          <div className="mt-2 text-muted-foreground">{store.cuisine}</div>

          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <div className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-foreground" /> <span className="font-semibold">{store.rating}</span> <span className="text-muted-foreground">({store.reviews})</span></div>
            <div className="flex items-center gap-1.5 text-muted-foreground"><Clock className="w-4 h-4" /> {store.eta}</div>
            <div className="flex items-center gap-1.5 text-muted-foreground"><MapPin className="w-4 h-4" /> {store.distance} · {store.fee} delivery</div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 mt-10 space-y-12 pb-20">
        {store.menu.map((section) => (
          <div key={section.section}>
            <h2 className="font-display text-2xl font-bold mb-4">{section.section}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => add(item, { slug: store.slug, name: store.name })}
                  className="group flex items-stretch gap-4 p-3 rounded-2xl bg-card border border-border/60 hover:border-primary/50 hover:shadow-soft transition text-left"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {item.popular && <span className="text-[10px] uppercase tracking-wider font-bold text-primary">Popular</span>}
                    </div>
                    <div className="font-semibold leading-tight">{item.name}</div>
                    <div className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</div>
                    <div className="mt-2 font-semibold">${item.price.toFixed(2)}</div>
                  </div>
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1.5 right-1.5 w-7 h-7 rounded-full bg-background grid place-items-center shadow-soft group-hover:bg-primary group-hover:text-primary-foreground transition">
                      <Plus className="w-4 h-4" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
