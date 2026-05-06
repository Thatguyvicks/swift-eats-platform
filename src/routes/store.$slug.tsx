import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Clock, MapPin, Plus, Star, X, Minus } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { getStore, type ItemOption, type MenuItem, type Store } from "@/data/stores";
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
          { title: `${loaderData.store.name} — Hilldash` },
          { name: "description", content: `${loaderData.store.cuisine} delivered in ${loaderData.store.eta}.` },
          { property: "og:image", content: loaderData.store.cover },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold">Store not found</h1>
        <Link to="/browse" className="mt-4 inline-block text-primary">Back to browse</Link>
      </div>
    </div>
  ),
});

function StorePage() {
  const { store } = Route.useLoaderData() as { store: Store };
  const { add } = useCart();
  const [active, setActive] = useState<MenuItem | null>(null);

  const onItemClick = (item: MenuItem) => {
    if (item.optionGroups?.length) {
      setActive(item);
    } else {
      add(item, { slug: store.slug, name: store.name });
    }
  };

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
                  onClick={() => onItemClick(item)}
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

      {active && (
        <ItemModal
          item={active}
          onClose={() => setActive(null)}
          onAdd={(selected, qty) => {
            add(active, { slug: store.slug, name: store.name }, { selected, qty });
            setActive(null);
          }}
        />
      )}
    </div>
  );
}

function ItemModal({
  item, onClose, onAdd,
}: {
  item: MenuItem;
  onClose: () => void;
  onAdd: (selected: ItemOption[], qty: number) => void;
}) {
  const [selected, setSelected] = useState<Record<string, ItemOption[]>>(() => {
    const init: Record<string, ItemOption[]> = {};
    item.optionGroups?.forEach((g) => {
      if (g.required && !g.multi && g.options[0]) init[g.id] = [g.options[0]];
    });
    return init;
  });
  const [qty, setQty] = useState(1);

  const toggle = (groupId: string, opt: ItemOption, multi: boolean) => {
    setSelected((cur) => {
      const list = cur[groupId] ?? [];
      if (multi) {
        const has = list.find((o) => o.id === opt.id);
        return { ...cur, [groupId]: has ? list.filter((o) => o.id !== opt.id) : [...list, opt] };
      }
      return { ...cur, [groupId]: [opt] };
    });
  };

  const flat = Object.values(selected).flat();
  const unit = item.price + flat.reduce((s, o) => s + o.price, 0);
  const total = unit * qty;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-0 sm:p-6" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}
        className="bg-card w-full sm:max-w-lg max-h-[90vh] overflow-auto rounded-t-3xl sm:rounded-3xl shadow-soft animate-in slide-in-from-bottom">
        <div className="relative">
          <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
          <button onClick={onClose} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background grid place-items-center">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5">
          <h3 className="font-display text-2xl font-bold">{item.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>

          {item.optionGroups?.map((g) => (
            <div key={g.id} className="mt-5">
              <div className="flex items-baseline justify-between">
                <div className="font-semibold text-sm">{g.label}</div>
                <div className="text-xs text-muted-foreground">{g.required ? "Required" : g.multi ? "Choose any" : "Optional"}</div>
              </div>
              <div className="mt-2 space-y-1.5">
                {g.options.map((opt) => {
                  const active = !!selected[g.id]?.find((o) => o.id === opt.id);
                  return (
                    <button key={opt.id} onClick={() => toggle(g.id, opt, !!g.multi)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border ${active ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
                      <span className={`w-4 h-4 ${g.multi ? "rounded" : "rounded-full"} border-2 grid place-items-center ${active ? "border-primary bg-primary" : "border-border"}`}>
                        {active && <span className="w-1.5 h-1.5 bg-background rounded-full" />}
                      </span>
                      <span className="text-sm font-medium flex-1 text-left">{opt.label}</span>
                      <span className="text-sm text-muted-foreground">{opt.price > 0 ? `+$${opt.price.toFixed(2)}` : ""}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center gap-2 bg-secondary rounded-full p-1">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-8 h-8 grid place-items-center rounded-full hover:bg-background"><Minus className="w-4 h-4" /></button>
              <span className="w-6 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="w-8 h-8 grid place-items-center rounded-full hover:bg-background"><Plus className="w-4 h-4" /></button>
            </div>
            <button onClick={() => onAdd(flat, qty)}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-primary-foreground font-semibold shadow-pop">
              Add to cart · ${total.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
