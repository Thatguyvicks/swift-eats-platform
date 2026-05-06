import { Link, useRouterState } from "@tanstack/react-router";
import { MapPin, Search, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/state/cart";

export function SiteHeader() {
  const { count } = useCart();
  const path = useRouterState({ select: (s) => s.location.pathname });

  const nav = [
    { to: "/browse", label: "Browse" },
    { to: "/search", label: "Search" },
    { to: "/orders", label: "Orders" },
    { to: "/profile", label: "Profile" },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 font-display text-2xl font-black tracking-tight">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary" />
          hilldash
        </Link>

        <Link to="/profile" className="hidden md:flex items-center gap-1.5 ml-2 px-3 py-1.5 rounded-full bg-secondary text-sm hover:bg-secondary/70 transition">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="font-medium">221B Baker St</span>
          <span className="text-muted-foreground">· now</span>
        </Link>

        <Link to="/search" className="hidden lg:flex flex-1 max-w-md ml-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <div className="w-full pl-9 pr-4 py-2 rounded-full bg-secondary/80 text-sm text-muted-foreground">
            Search restaurants, dishes, groceries…
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1 ml-auto lg:ml-4">
          {nav.map((n) => (
            <Link
              key={n.to} to={n.to}
              className={`px-3 py-2 text-sm font-medium rounded-full transition-colors ${
                path.startsWith(n.to) ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <Link to="/cart" className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition">
          <ShoppingBag className="w-4 h-4" />
          <span className="hidden sm:inline">Cart</span>
          {count > 0 && (
            <span className="ml-1 inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
              {count}
            </span>
          )}
        </Link>
        <Link to="/profile" className="md:hidden p-2 rounded-full bg-secondary">
          <User className="w-4 h-4" />
        </Link>
      </div>
    </header>
  );
}
