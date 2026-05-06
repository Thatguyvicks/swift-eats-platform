import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search as SearchIcon, Mic, Star, X } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { stores } from "@/data/stores";

export const Route = createFileRoute("/search")({
  component: SearchPage,
  head: () => ({ meta: [{ title: "Search — Hilldash" }] }),
});

const recent = ["Pizza", "Avocado", "Paracetamol", "Cold cola"];
const trending = ["Ramen", "Sushi", "Donut", "Eggs", "Vitamin D"];

function SearchPage() {
  const [q, setQ] = useState("");

  const { storeMatches, itemMatches } = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return { storeMatches: [], itemMatches: [] };
    const sm = stores.filter((s) => (s.name + s.cuisine).toLowerCase().includes(term));
    const im: { storeSlug: string; storeName: string; itemId: string; itemName: string; price: number; image: string }[] = [];
    for (const s of stores) {
      for (const sec of s.menu) {
        for (const it of sec.items) {
          if (it.name.toLowerCase().includes(term) || it.description.toLowerCase().includes(term)) {
            im.push({ storeSlug: s.slug, storeName: s.name, itemId: it.id, itemName: it.name, price: it.price, image: it.image });
          }
        }
      }
    }
    return { storeMatches: sm, itemMatches: im.slice(0, 12) };
  }, [q]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 py-8">
        <h1 className="font-display text-3xl sm:text-4xl font-black">Search</h1>

        <div className="mt-5 relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            autoFocus value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search restaurants, dishes, groceries…"
            className="w-full pl-12 pr-12 py-4 rounded-2xl bg-card border border-border text-base focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          {q ? (
            <button onClick={() => setQ("")} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-secondary">
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button title="Voice search" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-secondary">
              <Mic className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
        </div>

        {!q && (
          <div className="mt-8 space-y-7">
            <Section title="Recent">
              <Chips items={recent} onPick={setQ} />
            </Section>
            <Section title="Trending">
              <Chips items={trending} onPick={setQ} />
            </Section>
          </div>
        )}

        {q && (
          <div className="mt-8 space-y-8">
            <Section title={`Stores (${storeMatches.length})`}>
              {storeMatches.length === 0 ? (
                <p className="text-sm text-muted-foreground">No stores match “{q}”.</p>
              ) : (
                <div className="space-y-2">
                  {storeMatches.map((s) => (
                    <Link key={s.slug} to="/store/$slug" params={{ slug: s.slug }} className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border/60 hover:border-primary/50">
                      <img src={s.cover} alt={s.name} className="w-14 h-14 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold truncate">{s.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{s.cuisine} · {s.eta}</div>
                      </div>
                      <div className="text-sm font-semibold flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-foreground" />{s.rating}</div>
                    </Link>
                  ))}
                </div>
              )}
            </Section>
            <Section title={`Items (${itemMatches.length})`}>
              {itemMatches.length === 0 ? (
                <p className="text-sm text-muted-foreground">No items match.</p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-2">
                  {itemMatches.map((m) => (
                    <Link key={`${m.storeSlug}-${m.itemId}`} to="/store/$slug" params={{ slug: m.storeSlug }} className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border/60 hover:border-primary/50">
                      <img src={m.image} alt={m.itemName} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm truncate">{m.itemName}</div>
                        <div className="text-xs text-muted-foreground truncate">{m.storeName}</div>
                      </div>
                      <div className="text-sm font-semibold">${m.price.toFixed(2)}</div>
                    </Link>
                  ))}
                </div>
              )}
            </Section>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider font-bold text-muted-foreground mb-3">{title}</div>
      {children}
    </div>
  );
}

function Chips({ items, onPick }: { items: string[]; onPick: (s: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((i) => (
        <button key={i} onClick={() => onPick(i)} className="px-3 py-1.5 rounded-full bg-card border border-border hover:bg-secondary text-sm">
          {i}
        </button>
      ))}
    </div>
  );
}
