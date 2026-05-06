import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { MenuItem } from "@/data/stores";

export type CartLine = {
  item: MenuItem;
  qty: number;
  storeSlug: string;
  storeName: string;
};

type CartCtx = {
  lines: CartLine[];
  add: (item: MenuItem, store: { slug: string; name: string }) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  subtotal: number;
  count: number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart");
      if (raw) setLines(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(lines));
  }, [lines]);

  const value = useMemo<CartCtx>(() => {
    const subtotal = lines.reduce((s, l) => s + l.item.price * l.qty, 0);
    const count = lines.reduce((s, l) => s + l.qty, 0);
    return {
      lines,
      subtotal,
      count,
      add: (item, store) =>
        setLines((cur) => {
          const existing = cur.find((l) => l.item.id === item.id);
          if (existing) return cur.map((l) => l.item.id === item.id ? { ...l, qty: l.qty + 1 } : l);
          return [...cur, { item, qty: 1, storeSlug: store.slug, storeName: store.name }];
        }),
      remove: (id) => setLines((cur) => cur.filter((l) => l.item.id !== id)),
      setQty: (id, qty) =>
        setLines((cur) => qty <= 0 ? cur.filter((l) => l.item.id !== id) : cur.map((l) => l.item.id === id ? { ...l, qty } : l)),
      clear: () => setLines([]),
    };
  }, [lines]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
};
