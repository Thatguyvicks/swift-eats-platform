import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, CreditCard, MapPin, Wallet, Banknote, Clock } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { useCart } from "@/state/cart";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
  head: () => ({ meta: [{ title: "Checkout — Hilldash" }] }),
});

const addresses = [
  { id: "home", label: "Home", line: "221B Baker Street, Apt 4", note: "Leave at door" },
  { id: "work", label: "Work", line: "12 King Street, Floor 3", note: "Reception" },
];

const tips = [0, 1, 2, 3, 5];

function Checkout() {
  const nav = useNavigate();
  const { lines, subtotal, count, clear } = useCart();
  const [addr, setAddr] = useState("home");
  const [pay, setPay] = useState<"card" | "wallet" | "cash">("card");
  const [tip, setTip] = useState(2);
  const [when, setWhen] = useState<"now" | "schedule">("now");
  const [scheduleAt, setScheduleAt] = useState("19:30");
  const [placing, setPlacing] = useState(false);

  const fee = lines.length ? 1.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + fee + tax + tip;

  if (count === 0) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="max-w-md mx-auto py-24 text-center">
          <h1 className="font-display text-3xl font-bold">Cart is empty</h1>
          <Link to="/browse" className="mt-4 inline-block text-primary">Browse stores</Link>
        </div>
      </div>
    );
  }

  const place = () => {
    setPlacing(true);
    setTimeout(() => {
      clear();
      nav({ to: "/track" });
    }, 700);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-5xl px-6 py-8">
        <Link to="/cart" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> Back to cart
        </Link>
        <h1 className="mt-3 font-display text-4xl font-black">Checkout</h1>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
            {/* Address */}
            <Card title="Delivery address" icon={MapPin}>
              <div className="space-y-2">
                {addresses.map((a) => (
                  <button key={a.id} onClick={() => setAddr(a.id)}
                    className={`w-full text-left flex items-start gap-3 p-3 rounded-xl border ${addr === a.id ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
                    <Radio active={addr === a.id} />
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{a.label}</div>
                      <div className="text-sm text-muted-foreground">{a.line}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{a.note}</div>
                    </div>
                  </button>
                ))}
                <button className="w-full text-sm text-primary font-semibold py-2">+ Add new address</button>
              </div>
            </Card>

            {/* Time */}
            <Card title="Delivery time" icon={Clock}>
              <div className="grid grid-cols-2 gap-2">
                <ToggleBtn active={when === "now"} onClick={() => setWhen("now")}>ASAP · ~25 min</ToggleBtn>
                <ToggleBtn active={when === "schedule"} onClick={() => setWhen("schedule")}>Schedule</ToggleBtn>
              </div>
              {when === "schedule" && (
                <input type="time" value={scheduleAt} onChange={(e) => setScheduleAt(e.target.value)}
                  className="mt-3 w-full px-3 py-2 rounded-xl bg-secondary border-0 text-sm focus:outline-none" />
              )}
            </Card>

            {/* Payment */}
            <Card title="Payment method" icon={CreditCard}>
              <div className="grid sm:grid-cols-3 gap-2">
                <PayBtn active={pay === "card"} onClick={() => setPay("card")} icon={CreditCard} label="Card" sub="Visa •••• 4321" />
                <PayBtn active={pay === "wallet"} onClick={() => setPay("wallet")} icon={Wallet} label="Wallet" sub="$24.50 balance" />
                <PayBtn active={pay === "cash"} onClick={() => setPay("cash")} icon={Banknote} label="Cash" sub="On delivery" />
              </div>
            </Card>

            {/* Tip */}
            <Card title="Tip your courier">
              <div className="flex gap-2 flex-wrap">
                {tips.map((t) => (
                  <button key={t} onClick={() => setTip(t)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border ${tip === t ? "bg-foreground text-background border-foreground" : "bg-card border-border hover:bg-secondary"}`}>
                    {t === 0 ? "None" : `$${t}`}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Summary */}
          <aside className="bg-card border border-border/60 rounded-3xl p-6 h-fit lg:sticky lg:top-24">
            <h2 className="font-display text-xl font-bold">Order summary</h2>
            <div className="mt-4 space-y-2 text-sm max-h-48 overflow-auto pr-1">
              {lines.map((l) => (
                <div key={l.id} className="flex justify-between gap-3">
                  <span className="text-muted-foreground">{l.qty}× {l.item.name}</span>
                  <span className="font-medium">${(l.unitPrice * l.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border space-y-1.5 text-sm">
              <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
              <Row label="Delivery fee" value={`$${fee.toFixed(2)}`} />
              <Row label="Tax" value={`$${tax.toFixed(2)}`} />
              <Row label="Courier tip" value={`$${tip.toFixed(2)}`} />
            </div>
            <div className="mt-4 pt-4 border-t border-border flex items-baseline justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-display text-2xl font-bold">${total.toFixed(2)}</span>
            </div>
            <button
              disabled={placing}
              onClick={place}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-primary-foreground font-semibold shadow-pop hover:scale-[1.01] active:scale-[0.99] transition disabled:opacity-60"
            >
              {placing ? "Placing…" : `Place order · $${total.toFixed(2)}`}
            </button>
            <p className="mt-3 text-xs text-muted-foreground text-center">By placing this order you agree to Hilldash terms.</p>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Card({ title, icon: Icon, children }: { title: string; icon?: typeof MapPin; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border/60 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3">
        {Icon && <Icon className="w-4 h-4 text-primary" />}
        <h3 className="font-semibold">{title}</h3>
      </div>
      {children}
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

function Radio({ active }: { active: boolean }) {
  return (
    <span className={`mt-0.5 w-5 h-5 rounded-full grid place-items-center border-2 ${active ? "border-primary" : "border-border"}`}>
      {active && <span className="w-2.5 h-2.5 rounded-full bg-primary" />}
    </span>
  );
}

function ToggleBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick}
      className={`px-4 py-2.5 rounded-xl text-sm font-semibold border ${active ? "bg-foreground text-background border-foreground" : "bg-card border-border hover:bg-secondary"}`}>
      {children}
    </button>
  );
}

function PayBtn({ active, onClick, icon: Icon, label, sub }: { active: boolean; onClick: () => void; icon: typeof CreditCard; label: string; sub: string }) {
  return (
    <button onClick={onClick}
      className={`p-3 rounded-xl border text-left ${active ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4" />
        <span className="font-semibold text-sm">{label}</span>
        {active && <Check className="w-4 h-4 text-primary ml-auto" />}
      </div>
      <div className="text-xs text-muted-foreground mt-1">{sub}</div>
    </button>
  );
}
