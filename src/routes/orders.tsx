import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, Clock } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { useRequireAuth } from "@/state/auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/orders")({
  component: Orders,
  head: () => ({ meta: [{ title: "Your orders — Hilldash" }] }),
});

type OrderRow = {
  id: string; store_slug: string; status: string; total: number;
  created_at: string;
  order_items: { name: string; qty: number }[];
  stores: { name: string; cover: string } | null;
};

function Orders() {
  const { user, loading } = useRequireAuth();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    if (!user) return;
    let active = true;
    const load = async () => {
      const { data } = await supabase
        .from("orders")
        .select("id, store_slug, status, total, created_at, order_items(name, qty), stores(name, cover)")
        .order("created_at", { ascending: false });
      if (active) { setOrders((data as unknown as OrderRow[]) ?? []); setBusy(false); }
    };
    load();
    const ch = supabase.channel("orders-list")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, () => load())
      .subscribe();
    return () => { active = false; supabase.removeChannel(ch); };
  }, [user]);

  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="font-display text-4xl font-black">Orders</h1>
        <p className="text-muted-foreground mt-1">Track live and reorder favourites.</p>

        <div className="mt-8 space-y-4">
          {busy && <p className="text-muted-foreground text-sm">Loading…</p>}
          {!busy && orders.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              No orders yet. <Link to="/browse" className="text-primary font-semibold">Start browsing →</Link>
            </div>
          )}
          {orders.map((o) => {
            const live = o.status !== "delivered" && o.status !== "cancelled";
            return (
              <div key={o.id} className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-card border border-border/60">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs">
                    {live ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/15 text-primary font-semibold capitalize"><Clock className="w-3 h-3" /> {o.status}</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary text-foreground font-semibold"><CheckCircle2 className="w-3 h-3" /> Delivered</span>
                    )}
                    <span className="text-muted-foreground">· {new Date(o.created_at).toLocaleString()}</span>
                  </div>
                  <div className="mt-1.5 font-semibold">{o.stores?.name ?? o.store_slug}</div>
                  <div className="text-sm text-muted-foreground">
                    {o.order_items?.map((i) => `${i.qty}× ${i.name}`).join(" · ") || "—"}
                  </div>
                  <div className="mt-1 text-sm font-semibold">${Number(o.total).toFixed(2)}</div>
                </div>
                <div className="flex gap-2 sm:flex-col sm:justify-center">
                  {live ? (
                    <Link to="/track" search={{ orderId: o.id }} className="rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold text-center">Track</Link>
                  ) : (
                    <Link to="/store/$slug" params={{ slug: o.store_slug }} className="rounded-full bg-foreground text-background px-4 py-2 text-sm font-semibold text-center">Reorder</Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
