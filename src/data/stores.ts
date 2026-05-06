import store1 from "@/assets/store-1.jpg";
import store2 from "@/assets/store-2.jpg";
import store3 from "@/assets/store-3.jpg";
import store4 from "@/assets/store-4.jpg";
import burger from "@/assets/cat-burger.jpg";
import sushi from "@/assets/cat-sushi.jpg";
import pizza from "@/assets/cat-pizza.jpg";
import healthy from "@/assets/cat-healthy.jpg";
import dessert from "@/assets/cat-dessert.jpg";

export const categories = [
  { slug: "burgers", name: "Burgers", img: burger },
  { slug: "sushi", name: "Sushi", img: sushi },
  { slug: "pizza", name: "Pizza", img: pizza },
  { slug: "healthy", name: "Healthy", img: healthy },
  { slug: "dessert", name: "Dessert", img: dessert },
];

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  popular?: boolean;
};

export type Store = {
  slug: string;
  name: string;
  cuisine: string;
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

export const stores: Store[] = [
  {
    slug: "ratacia-bar",
    name: "Ratacia Bar & Kitchen",
    cuisine: "American · Burgers",
    rating: 4.8,
    reviews: 1240,
    eta: "20–30 min",
    fee: "$1.99",
    distance: "0.6 mi",
    cover: store1,
    tags: ["Top Rated", "Free delivery $25+"],
    priceLevel: 2,
    menu: [
      {
        section: "Signature Burgers",
        items: [
          { id: "b1", name: "Double Smash", description: "Two seared patties, american cheese, house sauce, brioche.", price: 13.5, image: burger, popular: true },
          { id: "b2", name: "Truffle Mushroom", description: "Swiss, sautéed mushrooms, truffle aioli.", price: 15.0, image: burger },
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
    rating: 4.7,
    reviews: 890,
    eta: "25–35 min",
    fee: "$0.99",
    distance: "1.1 mi",
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
    rating: 4.9,
    reviews: 2103,
    eta: "30–40 min",
    fee: "$2.49",
    distance: "1.4 mi",
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
    rating: 4.6,
    reviews: 540,
    eta: "15–25 min",
    fee: "Free",
    distance: "0.4 mi",
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
];

export const getStore = (slug: string) => stores.find((s) => s.slug === slug);
