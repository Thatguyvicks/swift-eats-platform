import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Search, ShoppingBag, ListOrdered, User } from "lucide-react";
import { useCart } from "@/state/cart";

const items = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/search", label: "Search", icon: Search },
  { to: "/cart", label: "Cart", icon: ShoppingBag },
  { to: "/orders", label: "Orders", icon: ListOrdered },
  { to: "/profile", label: "Profile", icon: User },
];

export function MobileTabBar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { count } = useCart();
  return (
    <>
      <div className="md:hidden h-20" aria-hidden />
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur border-t border-border/60">
        <ul className="grid grid-cols-5">
          {items.map((it) => {
            const active = it.exact ? path === it.to : path.startsWith(it.to);
            const Icon = it.icon;
            return (
              <li key={it.to}>
                <Link
                  to={it.to}
                  className={`relative flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium ${
                    active ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {it.label}
                  {it.to === "/cart" && count > 0 && (
                    <span className="absolute top-1 right-[28%] inline-flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                      {count}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
