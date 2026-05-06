import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Clock } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { stores } from "@/data/stores";

export const Route = createFileRoute("/orders")({
  component: Orders,
  head: () => ({ meta: [{ title: "Your orders — Forka" }] }),
});

const past = [
  { id: "4129", store: stores[0], items: ["Double Smash", "Hand-cut Fries"], total: 21.49, status: "in_progress", date: "Today" },
  { id: "4012", store: stores[2], items: ["Margherita D.O.P."], total: 16.0, status: "delivered", date: "Tue" },
  { id: "3997", store: stores[1], items: ["Tonkotsu Classic", "Salmon Nigiri"], total: 30.0, status: "delivered", date: "Sat" },
];

function Orders() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="font-display text-4xl font-black">Orders</h1>
        <p className="text-muted-foreground mt-1">Reorder your favourites in a tap.</p>

        <div className="mt-8 space-y-4">
          {past.map((o) => (
            <div key={o.id} className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-card border border-border/60">
              <img src={o.store.cover} alt={o.store.name} className="w-full sm:w-32 h-28 object-cover rounded-xl" />
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs">
                  {o.status === "in_progress" ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/15 text-primary font-semibold"><Clock className="w-3 h-3" /> Out for delivery</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary text-foreground font-semibold"><CheckCircle2 className="w-3 h-3" /> Delivered</span>
                  )}
                  <span className="text-muted-foreground">· {o.date}</span>
                </div>
                <div className="mt-1.5 font-semibold">{o.store.name}</div>
                <div className="text-sm text-muted-foreground">{o.items.join(" · ")}</div>
                <div className="mt-1 text-sm font-semibold">${o.total.toFixed(2)}</div>
              </div>
              <div className="flex gap-2 sm:flex-col sm:justify-center">
                {o.status === "in_progress" ? (
                  <Link to="/track" className="rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold text-center">Track</Link>
                ) : (
                  <Link to="/store/$slug" params={{ slug: o.store.slug }} className="rounded-full bg-foreground text-background px-4 py-2 text-sm font-semibold text-center">Reorder</Link>
                )}
                <Link to="/store/$slug" params={{ slug: o.store.slug }} className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-center">Receipt</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
