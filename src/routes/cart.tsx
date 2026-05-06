import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { useCart } from "@/state/cart";
import { stores } from "@/data/stores";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({ meta: [{ title: "Your cart — Hilldash" }] }),
});

function CartPage() {
  const { lines, setQty, remove, subtotal, clear, count, add } = useCart();
  const nav = useNavigate();
  const fee = lines.length ? 1.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + fee + tax;

  if (count === 0) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="mx-auto max-w-md px-6 py-24 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-secondary grid place-items-center">
            <ShoppingBag className="w-7 h-7 text-muted-foreground" />
          </div>
          <h1 className="mt-5 font-display text-3xl font-bold">Your cart is empty</h1>
          <p className="mt-2 text-muted-foreground">Browse stores and start adding things you love.</p>
          <Link to="/browse" className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-primary-foreground font-semibold shadow-pop">
            Find stores
          </Link>
        </div>
      </div>
    );
  }

  // suggestions: other popular items from same store
  const currentStore = stores.find((s) => s.slug === lines[0].storeSlug);
  const inCartIds = new Set(lines.map((l) => l.item.id));
  const suggestions =
    currentStore?.menu.flatMap((s) => s.items).filter((it) => !inCartIds.has(it.id)).slice(0, 3) ?? [];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-5xl px-6 py-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h1 className="font-display text-4xl font-black">Your cart</h1>
          <p className="text-muted-foreground mt-1">From <span className="font-semibold text-foreground">{lines[0].storeName}</span></p>

          <div className="mt-6 space-y-3">
            {lines.map((l) => (
              <div key={l.id} className="flex items-center gap-4 p-3 rounded-2xl bg-card border border-border/60">
                <img src={l.item.image} alt={l.item.name} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold">{l.item.name}</div>
                  {l.selected && l.selected.length > 0 && (
                    <div className="text-xs text-muted-foreground mt-0.5 truncate">
                      {l.selected.map((o) => o.label).join(" · ")}
                    </div>
                  )}
                  <div className="text-sm text-muted-foreground mt-0.5">${l.unitPrice.toFixed(2)}</div>
                </div>
                <div className="flex items-center gap-2 bg-secondary rounded-full p-1">
                  <button onClick={() => setQty(l.id, l.qty - 1)} className="w-8 h-8 grid place-items-center rounded-full hover:bg-background"><Minus className="w-4 h-4" /></button>
                  <span className="w-6 text-center font-semibold">{l.qty}</span>
                  <button onClick={() => setQty(l.id, l.qty + 1)} className="w-8 h-8 grid place-items-center rounded-full hover:bg-background"><Plus className="w-4 h-4" /></button>
                </div>
                <button onClick={() => remove(l.id)} className="p-2 text-muted-foreground hover:text-destructive transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {suggestions.length > 0 && currentStore && (
            <div className="mt-8">
              <div className="text-xs uppercase tracking-wider font-bold text-muted-foreground mb-3">People also add</div>
              <div className="grid sm:grid-cols-3 gap-3">
                {suggestions.map((it) => (
                  <button key={it.id}
                    onClick={() => add(it, { slug: currentStore.slug, name: currentStore.name })}
                    className="group flex flex-col p-3 rounded-2xl bg-card border border-border/60 hover:border-primary/50 text-left">
                    <img src={it.image} alt={it.name} className="w-full h-20 object-cover rounded-lg" />
                    <div className="mt-2 font-semibold text-sm">{it.name}</div>
                    <div className="text-xs text-muted-foreground mt-auto pt-1">${it.price.toFixed(2)} · Tap to add</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button onClick={clear} className="mt-6 text-sm text-muted-foreground hover:text-destructive">Clear cart</button>
        </div>

        <aside className="bg-card border border-border/60 rounded-3xl p-6 h-fit lg:sticky lg:top-24">
          <h2 className="font-display text-xl font-bold">Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
            <Row label="Delivery fee" value={`$${fee.toFixed(2)}`} />
            <Row label="Tax" value={`$${tax.toFixed(2)}`} />
          </div>
          <div className="mt-4 pt-4 border-t border-border flex items-baseline justify-between">
            <span className="font-semibold">Total</span>
            <span className="font-display text-2xl font-bold">${total.toFixed(2)}</span>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <input placeholder="Promo code" className="flex-1 px-3 py-2 rounded-xl bg-secondary border-0 text-sm focus:outline-none" />
            <button className="px-4 py-2 rounded-xl bg-secondary text-sm font-semibold hover:bg-secondary/70">Apply</button>
          </div>

          <button
            onClick={() => nav({ to: "/checkout" })}
            className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-primary-foreground font-semibold shadow-pop hover:scale-[1.01] active:scale-[0.99] transition"
          >
            Continue to checkout
          </button>
          <p className="mt-3 text-xs text-muted-foreground text-center">Estimated arrival 22–32 min</p>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-muted-foreground">
      <span>{label}</span><span className="text-foreground font-medium">{value}</span>
    </div>
  );
}
