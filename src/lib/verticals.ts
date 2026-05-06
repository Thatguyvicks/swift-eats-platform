import type { Vertical } from "@/lib/store-types";
import burger from "@/assets/cat-burger.jpg";
import sushi from "@/assets/cat-sushi.jpg";
import pizza from "@/assets/cat-pizza.jpg";
import healthy from "@/assets/cat-healthy.jpg";
import dessert from "@/assets/cat-dessert.jpg";
import grocery from "@/assets/cat-grocery.jpg";
import pharmacy from "@/assets/cat-pharmacy.jpg";
import drinks from "@/assets/cat-drinks.jpg";

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
