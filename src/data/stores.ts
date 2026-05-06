import store1 from "@/assets/store-1.jpg";
import store2 from "@/assets/store-2.jpg";
import store3 from "@/assets/store-3.jpg";
import store4 from "@/assets/store-4.jpg";
import storeGrocery from "@/assets/store-grocery.jpg";
import storePharmacy from "@/assets/store-pharmacy.jpg";
import burger from "@/assets/cat-burger.jpg";
import sushi from "@/assets/cat-sushi.jpg";
import pizza from "@/assets/cat-pizza.jpg";
import healthy from "@/assets/cat-healthy.jpg";
import dessert from "@/assets/cat-dessert.jpg";
import grocery from "@/assets/cat-grocery.jpg";
import pharmacy from "@/assets/cat-pharmacy.jpg";
import drinks from "@/assets/cat-drinks.jpg";

export type Vertical = "food" | "groceries" | "pharmacy" | "drinks";

export const verticals: { slug: Vertical; name: string; emoji: string; tagline: string }[] = [
  { slug: "food", name: "Food", emoji: "🍔", tagline: "Hot meals from local kitchens" },
  { slug: "groceries", name: "Groceries", emoji: "🛒", tagline: "Fresh produce in 30 minutes" },
  { slug: "pharmacy", name: "Pharmacy", emoji: "💊", tagline: "Meds & wellness, no queue" },
  { slug: "drinks", name: "Drinks", emoji: "🍹", tagline: "Cold drinks at your door" },
];

export const categories = [
  { slug: "burgers", name: "Burgers", img: burger, vertical: "food" as const },
  { slug: "sushi", name: "Sushi", img: sushi, vertical: "food" as const },
  { slug: "pizza", name: "Pizza", img: pizza, vertical: "food" as const },
  { slug: "healthy", name: "Healthy", img: healthy, vertical: "food" as const },
  { slug: "dessert", name: "Dessert", img: dessert, vertical: "food" as const },
  { slug: "grocery", name: "Groceries", img: grocery, vertical: "groceries" as const },
  { slug: "pharmacy", name: "Pharmacy", img: pharmacy, vertical: "pharmacy" as const },
  { slug: "drinks", name: "Drinks", img: drinks, vertical: "drinks" as const },
];

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
  image: string;
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
  cover: string;
  tags: string[];
  priceLevel: 1 | 2 | 3;
  menu: { section: string; items: MenuItem[] }[];
};

const sizeGroup: ItemOptionGroup = {
  id: "size", label: "Size", required: true,
  options: [
    { id: "reg", label: "Regular", price: 0 },
    { id: "lg", label: "Large", price: 2.5 },
  ],
};
const addonGroup: ItemOptionGroup = {
  id: "add", label: "Add extras", multi: true,
  options: [
    { id: "cheese", label: "Extra cheese", price: 1.5 },
    { id: "bacon", label: "Crispy bacon", price: 2.0 },
    { id: "avo", label: "Avocado", price: 1.75 },
  ],
};

export const stores: Store[] = [
  {
    slug: "ratacia-bar",
    name: "Ratacia Bar & Kitchen",
    cuisine: "American · Burgers",
    vertical: "food",
    rating: 4.8, reviews: 1240, eta: "20–30 min", fee: "$1.99", distance: "0.6 mi",
    cover: store1,
    tags: ["Top Rated", "Free delivery $25+"],
    priceLevel: 2,
    menu: [
      {
        section: "Signature Burgers",
        items: [
          { id: "b1", name: "Double Smash", description: "Two seared patties, american cheese, house sauce, brioche.", price: 13.5, image: burger, popular: true, optionGroups: [sizeGroup, addonGroup] },
          { id: "b2", name: "Truffle Mushroom", description: "Swiss, sautéed mushrooms, truffle aioli.", price: 15.0, image: burger, optionGroups: [sizeGroup, addonGroup] },
          { id: "b3", name: "Garden Stack", description: "Charred portobello, avocado, heirloom tomato.", price: 12.0, image: healthy },
        ],
      },
      {
        section: "Sides & Sweets",
        items: [
          { id: "s1", name: "Hand-cut Fries", description: "Sea salt, rosemary, garlic aioli.", price: 5.5, image: burger },
          { id: "s2", name: "Glazed Donut Trio", description: "Three rotating flavours from our pastry chef.", price: 7.0, image: dessert },
        ],
      },
    ],
  },
  {
    slug: "okami-ramen",
    name: "Okami Ramen House",
    cuisine: "Japanese · Ramen",
    vertical: "food",
    rating: 4.7, reviews: 890, eta: "25–35 min", fee: "$0.99", distance: "1.1 mi",
    cover: store2,
    tags: ["Trending", "Spicy"],
    priceLevel: 2,
    menu: [
      {
        section: "Signature Bowls",
        items: [
          { id: "r1", name: "Tonkotsu Classic", description: "12hr pork broth, chashu, ajitama, scallions.", price: 16.0, image: sushi, popular: true },
          { id: "r2", name: "Spicy Miso", description: "Ground pork, chili oil, corn, butter.", price: 17.0, image: sushi },
        ],
      },
      {
        section: "Sushi",
        items: [
          { id: "u1", name: "Salmon Nigiri (6pc)", description: "Fresh salmon over warm seasoned rice.", price: 14.0, image: sushi },
          { id: "u2", name: "Rainbow Roll", description: "Crab, avocado, topped with assorted sashimi.", price: 18.0, image: sushi },
        ],
      },
    ],
  },
  {
    slug: "fornace-pizzeria",
    name: "Fornace Pizzeria",
    cuisine: "Italian · Wood-fired",
    vertical: "food",
    rating: 4.9, reviews: 2103, eta: "30–40 min", fee: "$2.49", distance: "1.4 mi",
    cover: store3,
    tags: ["Top Rated"],
    priceLevel: 2,
    menu: [
      {
        section: "Pizze",
        items: [
          { id: "p1", name: "Margherita D.O.P.", description: "San Marzano, fior di latte, basil, EVOO.", price: 16.0, image: pizza, popular: true },
          { id: "p2", name: "Diavola", description: "Spicy salami, calabrese chili, mozzarella.", price: 18.5, image: pizza },
        ],
      },
    ],
  },
  {
    slug: "verde-bowls",
    name: "Verde Bowls",
    cuisine: "Healthy · Bowls",
    vertical: "food",
    rating: 4.6, reviews: 540, eta: "15–25 min", fee: "Free", distance: "0.4 mi",
    cover: store4,
    tags: ["Healthy", "Free delivery"],
    priceLevel: 1,
    menu: [
      {
        section: "Bowls",
        items: [
          { id: "v1", name: "Salmon Poke Bowl", description: "Sushi rice, avocado, edamame, ponzu.", price: 14.5, image: healthy, popular: true },
          { id: "v2", name: "Harvest Grain Bowl", description: "Quinoa, roasted veg, tahini-lemon dressing.", price: 12.0, image: healthy },
        ],
      },
    ],
  },
  {
    slug: "freshline-market",
    name: "Freshline Market",
    cuisine: "Groceries · Fresh produce",
    vertical: "groceries",
    rating: 4.8, reviews: 980, eta: "25–40 min", fee: "$2.99", distance: "0.9 mi",
    cover: storeGrocery,
    tags: ["Daily essentials"],
    priceLevel: 2,
    menu: [
      {
        section: "Fresh Produce",
        items: [
          { id: "g1", name: "Avocado (each)", description: "Hass, ripe & ready.", price: 1.8, image: grocery, popular: true },
          { id: "g2", name: "Organic Eggs (12pc)", description: "Free-range, local farm.", price: 6.5, image: grocery },
          { id: "g3", name: "Sourdough Loaf", description: "Slow-fermented, baked this morning.", price: 7.0, image: grocery },
        ],
      },
      {
        section: "Pantry",
        items: [
          { id: "g4", name: "Whole Milk 1L", description: "Glass bottle, locally sourced.", price: 3.2, image: grocery },
          { id: "g5", name: "Pasta de Cecco 500g", description: "Bronze-cut, Italian classic.", price: 4.5, image: grocery },
        ],
      },
    ],
  },
  {
    slug: "cityaid-pharmacy",
    name: "CityAid Pharmacy",
    cuisine: "Pharmacy · Wellness",
    vertical: "pharmacy",
    rating: 4.9, reviews: 612, eta: "20–30 min", fee: "$1.49", distance: "0.7 mi",
    cover: storePharmacy,
    tags: ["24/7", "Licensed"],
    priceLevel: 1,
    menu: [
      {
        section: "Pain Relief",
        items: [
          { id: "ph1", name: "Paracetamol 500mg (20)", description: "Fast pain relief, blister pack.", price: 4.5, image: pharmacy, popular: true },
          { id: "ph2", name: "Ibuprofen 200mg (24)", description: "Anti-inflammatory tablets.", price: 5.2, image: pharmacy },
        ],
      },
      {
        section: "Wellness",
        items: [
          { id: "ph3", name: "Vitamin D3 (60)", description: "Daily immune support.", price: 12.0, image: pharmacy },
          { id: "ph4", name: "Digital Thermometer", description: "Fast, accurate readings.", price: 14.5, image: pharmacy },
        ],
      },
    ],
  },
  {
    slug: "barril-drinks",
    name: "Barril Drinks Co.",
    cuisine: "Drinks · Soft & craft",
    vertical: "drinks",
    rating: 4.7, reviews: 322, eta: "15–25 min", fee: "Free", distance: "0.5 mi",
    cover: store4,
    tags: ["Free delivery"],
    priceLevel: 1,
    menu: [
      {
        section: "Bottles",
        items: [
          { id: "d1", name: "Craft Cola 330ml", description: "Cane sugar, real spices.", price: 3.5, image: drinks, popular: true },
          { id: "d2", name: "Cold-pressed Orange 500ml", description: "100% juice, pressed today.", price: 5.5, image: drinks },
          { id: "d3", name: "Sparkling Water 750ml", description: "Glass bottle, lightly carbonated.", price: 2.8, image: drinks },
        ],
      },
    ],
  },
];

export const getStore = (slug: string) => stores.find((s) => s.slug === slug);
export const storesByVertical = (v: Vertical) => stores.filter((s) => s.vertical === v);
