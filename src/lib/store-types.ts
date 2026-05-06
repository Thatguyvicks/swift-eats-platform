// Domain types matching the DB rows + local UI shape.

export type Vertical = "food" | "groceries" | "pharmacy" | "drinks";

export type ItemOption = { id: string; label: string; price: number };
export type ItemOptionGroup = {
  id: string;
  label: string;
  required?: boolean;
  multi?: boolean;
  options: ItemOption[];
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string; // resolved URL
  popular?: boolean;
  optionGroups?: ItemOptionGroup[];
};

export type Store = {
  slug: string;
  name: string;
  cuisine: string;
  vertical: Vertical;
  rating: number;
  reviews: number;
  eta: string;
  fee: string;
  distance: string;
  cover: string; // resolved URL
  tags: string[];
  priceLevel: 1 | 2 | 3;
  menu: { section: string; items: MenuItem[] }[];
};
