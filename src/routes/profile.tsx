import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, CreditCard, Gift, Globe, MapPin, Moon, Settings, User } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/profile")({
  component: Profile,
  head: () => ({ meta: [{ title: "Your profile — Hilldash" }] }),
});

function Profile() {
  const items = [
    { icon: MapPin, label: "Addresses", desc: "Home · Work · 2 saved", to: "/profile" },
    { icon: CreditCard, label: "Payment methods", desc: "Visa •••• 4321 · Apple Pay", to: "/profile" },
    { icon: Gift, label: "Promotions", desc: "1 active code · WELCOME10", to: "/profile" },
    { icon: Bell, label: "Notifications", desc: "Push · Email · 2 unread", to: "/notifications" },
    { icon: Globe, label: "Language", desc: "English (US)", to: "/profile" },
    { icon: Moon, label: "Dark mode", desc: "System default", to: "/profile" },
    { icon: Settings, label: "Account settings", desc: "Security, data, privacy", to: "/profile" },
  ];
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/15 grid place-items-center">
            <User className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-black">Maya Rao</h1>
            <div className="text-muted-foreground text-sm">maya@hilldash.app · Hilldash One member</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { v: "47", l: "Orders" },
            { v: "$612", l: "Spent" },
            { v: "4.9★", l: "Avg rating" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl bg-card border border-border/60 p-4 text-center">
              <div className="font-display text-2xl font-bold">{s.v}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl bg-card border border-border/60 divide-y divide-border">
          {items.map((it) => (
            <Link key={it.label} to={it.to} className="w-full flex items-center gap-4 p-4 text-left hover:bg-secondary/40 transition">
              <div className="w-10 h-10 rounded-xl bg-secondary grid place-items-center">
                <it.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{it.label}</div>
                <div className="text-xs text-muted-foreground">{it.desc}</div>
              </div>
              <div className="text-muted-foreground">›</div>
            </Link>
          ))}
        </div>

        <button className="mt-6 w-full rounded-full border border-border py-3 text-sm font-semibold hover:bg-secondary">Sign out</button>
      </div>
    </div>
  );
}
