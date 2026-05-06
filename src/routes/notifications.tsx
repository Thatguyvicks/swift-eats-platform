import { createFileRoute } from "@tanstack/react-router";
import { Bell, Tag, Truck, AlertCircle } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/notifications")({
  component: Notifications,
  head: () => ({ meta: [{ title: "Notifications — Hilldash" }] }),
});

const items = [
  { type: "order", icon: Truck, title: "Marco picked up your order", body: "Order #4129 from Ratacia · arriving in 18 min", time: "2m", unread: true },
  { type: "promo", icon: Tag, title: "20% off groceries this weekend", body: "Use code FRESH20 at Freshline Market.", time: "1h", unread: true },
  { type: "order", icon: Truck, title: "Order #4012 delivered", body: "Rate Fornace Pizzeria — earn 50 points.", time: "Yesterday" },
  { type: "system", icon: AlertCircle, title: "New address saved", body: "Work · 12 King Street added to your profile.", time: "Mon" },
];

function Notifications() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-6 py-10">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-4xl font-black">Inbox</h1>
          <button className="text-sm text-muted-foreground hover:text-foreground">Mark all read</button>
        </div>

        <ul className="mt-6 divide-y divide-border bg-card border border-border/60 rounded-2xl overflow-hidden">
          {items.map((n, i) => {
            const Icon = n.icon;
            return (
              <li key={i} className={`flex items-start gap-3 p-4 ${n.unread ? "bg-primary/[0.04]" : ""}`}>
                <div className="w-10 h-10 rounded-xl bg-secondary grid place-items-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold text-sm">{n.title}</div>
                    {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  </div>
                  <div className="text-sm text-muted-foreground mt-0.5">{n.body}</div>
                </div>
                <div className="text-xs text-muted-foreground shrink-0">{n.time}</div>
              </li>
            );
          })}
        </ul>

        {items.length === 0 && (
          <div className="mt-10 text-center text-muted-foreground">
            <Bell className="w-8 h-8 mx-auto mb-3 opacity-50" />
            No notifications yet.
          </div>
        )}
      </div>
    </div>
  );
}
