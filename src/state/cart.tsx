import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ItemOption, MenuItem } from "@/data/stores";

export type CartLine = {
  id: string; // unique line id (item + selected options)
  item: MenuItem;
  qty: number;
  storeSlug: string;
  storeName: string;
  selected?: ItemOption[];
  unitPrice: number; // base + options
  notes?: string;
};

type CartCtx = {
  lines: CartLine[];
  add: (
    item: MenuItem,
    store: { slug: string; name: string },
    opts?: { selected?: ItemOption[]; qty?: number; notes?: string },
  ) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  subtotal: number;
  count: number;
};

const Ctx = createContext<CartCtx | null>(null);

const buildLineId = (itemId: string, selected: ItemOption[] = []) =>
  selected.length ? `${itemId}::${selected.map((o) => o.id).sort().join("+")}` : itemId;

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
    const subtotal = lines.reduce((s, l) => s + l.unitPrice * l.qty, 0);
    const count = lines.reduce((s, l) => s + l.qty, 0);
    return {
      lines, subtotal, count,
      add: (item, store, opts = {}) =>
        setLines((cur) => {
          const selected = opts.selected ?? [];
          const id = buildLineId(item.id, selected);
          const unitPrice = item.price + selected.reduce((s, o) => s + o.price, 0);
          const qty = opts.qty ?? 1;
          const existing = cur.find((l) => l.id === id);
          if (existing) return cur.map((l) => l.id === id ? { ...l, qty: l.qty + qty } : l);
          return [
            ...cur,
            { id, item, qty, storeSlug: store.slug, storeName: store.name, selected, unitPrice, notes: opts.notes },
          ];
        }),
      remove: (id) => setLines((cur) => cur.filter((l) => l.id !== id)),
      setQty: (id, qty) =>
        setLines((cur) => qty <= 0 ? cur.filter((l) => l.id !== id) : cur.map((l) => l.id === id ? { ...l, qty } : l)),
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
