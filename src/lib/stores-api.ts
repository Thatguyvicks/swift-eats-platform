import { supabase } from "@/integrations/supabase/client";
import { asset } from "@/lib/assets";
import type { MenuItem, Store, Vertical } from "@/lib/store-types";

type Row = {
  slug: string; name: string; cuisine: string; vertical: string;
  rating: number; reviews: number; eta: string; fee: string; distance: string;
  cover: string; tags: string[]; price_level: number; menu: unknown;
};

function rowToStore(r: Row): Store {
  const menu = (r.menu as { section: string; items: MenuItem[] }[]).map((sec) => ({
    section: sec.section,
    items: sec.items.map((it) => ({ ...it, image: asset(it.image) })),
  }));
  return {
    slug: r.slug, name: r.name, cuisine: r.cuisine, vertical: r.vertical as Vertical,
    rating: Number(r.rating), reviews: r.reviews, eta: r.eta, fee: r.fee, distance: r.distance,
    cover: asset(r.cover), tags: r.tags ?? [], priceLevel: (r.price_level as 1 | 2 | 3) ?? 1, menu,
  };
}

export async function fetchStores(): Promise<Store[]> {
  const { data, error } = await supabase.from("stores").select("*");
  if (error) throw error;
  return (data as Row[]).map(rowToStore);
}

export async function fetchStore(slug: string): Promise<Store | null> {
  const { data, error } = await supabase.from("stores").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data ? rowToStore(data as Row) : null;
}
