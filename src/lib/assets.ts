// Maps filename strings stored in the DB to bundled asset URLs.
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

const map: Record<string, string> = {
  "store-1.jpg": store1,
  "store-2.jpg": store2,
  "store-3.jpg": store3,
  "store-4.jpg": store4,
  "store-grocery.jpg": storeGrocery,
  "store-pharmacy.jpg": storePharmacy,
  "cat-burger.jpg": burger,
  "cat-sushi.jpg": sushi,
  "cat-pizza.jpg": pizza,
  "cat-healthy.jpg": healthy,
  "cat-dessert.jpg": dessert,
  "cat-grocery.jpg": grocery,
  "cat-pharmacy.jpg": pharmacy,
  "cat-drinks.jpg": drinks,
};

export const asset = (name: string) => map[name] ?? name;
