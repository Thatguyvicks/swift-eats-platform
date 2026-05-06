import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Star, SlidersHorizontal, Search } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { categories, stores } from "@/data/stores";

export const Route = createFileRoute("/browse")({
  component: Browse,
  head: () => ({
    meta: [
      { title: "Browse restaurants — Forka" },
      { name: "description", content: "Discover the best restaurants delivering to you right now." },
    ],
  }),
});

function Browse() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [sort, setSort] = useState<"rating" | "eta" | "fee">("rating");

  const filtered = stores
    .filter((s) => (q ? (s.name + s.cuisine).toLowerCase().includes(q.toLowerCase()) : true))
    .filter((s) => (cat ? s.cuisine.toLowerCase().includes(cat) : true))
    .sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "eta") return parseInt(a.eta) - parseInt(b.eta);
      return a.fee.localeCompare(b.fee);
    });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-6 pt-8">
        <h1 className="font-display text-4xl sm:text-5xl font-black">Browse</h1>
        <p className="text-muted-foreground mt-1">{filtered.length} kitchens delivering near you</p>

        <div className="mt-6 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search restaurants or cuisines"
              className="w-full pl-9 pr-4 py-3 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card border border-border">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
            <select
              value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}
              className="bg-transparent text-sm focus:outline-none"
            >
              <option value="rating">Top rated</option>
              <option value="eta">Fastest</option>
              <option value="fee">Lowest fee</option>
            </select>
          </div>
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          <button onClick={() => setCat(null)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border ${!cat ? "bg-foreground text-background border-foreground" : "bg-card border-border hover:bg-secondary"}`}>
            All
          </button>
          {categories.map((c) => (
            <button key={c.slug} onClick={() => setCat(c.slug === cat ? null : c.slug)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border ${cat === c.slug ? "bg-foreground text-background border-foreground" : "bg-card border-border hover:bg-secondary"}`}>
              {c.name}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
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
                <span className="text-muted-foreground font-normal">({s.reviews})</span>
              </div>
            </div>
            <div className="mt-1.5 text-xs text-muted-foreground flex items-center gap-3">
              <span>{s.eta}</span><span>·</span><span>{s.fee} delivery</span><span>·</span><span>{s.distance}</span>
            </div>
          </Link>
        ))}
      </section>

      <SiteFooter />
    </div>
  );
}
