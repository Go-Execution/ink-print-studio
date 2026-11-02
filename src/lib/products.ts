import { T_SHIRT_COLORS, T_SHIRT_COLORS_ALWAYS } from "./tshirt-colors";

export const COLOR_HEX_MAP: Record<string, string> = {
  'Black': '#1e1e1e',
  'White': '#f0f0f0',
  'Navy': '#141e3c',
  'Royal Blue': '#1e3296',
  'Red': '#b41e1e',
  'Maroon': '#641414',
  'Heather Grey': '#969696',
  'Charcoal': '#464646',
  'Forest Green': '#1e5028',
  'Kelly Green': '#288c32',
  'Olive': '#64643c',
  'Yellow': '#e6c832',
  'Gold': '#c8961e',
  'Orange': '#dc6414',
  'Purple': '#5a2878',
  'Pink': '#e682aa',
  'Light Blue': '#82b4dc',
  'Teal': '#1e828c',
  'Brown': '#50321e',
  'Sand': '#c8b496',
  'Burgundy': '#6e1428',
  'Mustard': '#b4961e',
  'Mint': '#96dcB4',
  'Coral': '#e6645a',
  'Lime': '#96d232',
  'Natural': '#f2eee6',
  'Marble': '#eae7e1',
};

export const getHexForColorName = (colorName: string): string => {
  if (COLOR_HEX_MAP[colorName]) return COLOR_HEX_MAP[colorName];
  const baseMatch = colorName.match(/^([A-Za-z\s]+)\s*\d*$/);
  if (baseMatch && baseMatch[1]) {
    const baseName = baseMatch[1].trim();
    if (COLOR_HEX_MAP[baseName]) return COLOR_HEX_MAP[baseName];
  }
  return '#cccccc';
};

export type ProductColor = {
  name: string;
  image: string;
};

export type Product = {
  id: string;
  img: string;
  alt: string;
  eyebrow: string;
  title: string;
  price: number;
  unit: string;
  body: string;
  colors: (string | ProductColor)[];
  sizes: string[];
  category: "T-Shirt" | "Mug" | "Bags" | string;
  isFeatured?: boolean;
  isBestSeller?: boolean;
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "aint-the-lord-alright",
    img: "/products/aint-the-lord-alright/1.jpeg",
    alt: "Ain't the Lord Alright T-Shirt",
    eyebrow: "100% Cotton / Premium",
    title: "Ain't the Lord Alright Tee",
    price: 32,
    unit: "/ per shirt",
    body: "Heavyweight premium cotton featuring the 'Ain't the Lord Alright' exclusive print.",
    colors: T_SHIRT_COLORS,
    sizes: ["S", "M", "L", "XL"],
    category: "T-Shirt",
    isBestSeller: true,
    isFeatured: true,
  },
  {
    id: "aint-the-lord-alright-tote-bag",
    img: "/products/tote-bag.jpeg",
    alt: "Ain't the Lord Alright Tote Bag",
    eyebrow: "100% Canvas / Heavy Duty",
    title: "Ain't the Lord Alright Tote Bag",
    price: 24,
    unit: "/ per bag",
    body: "Heavyweight premium canvas tote bag with reinforced handles, featuring the signature 'Ain't the Lord Alright' graphic print on an elegant marble textured finish.",
    colors: ["Natural"],
    sizes: ["One Size"],
    category: "Bags",
    isBestSeller: true,
    isFeatured: true,
  },
  {
    id: "always-bet-on-yourself",
    img: "/products/always-bet-on-yourself/1.jpeg",
    alt: "Always Bet on Yourself T-Shirt",
    eyebrow: "100% Cotton / Premium",
    title: "Always Bet on Yourself Tee",
    price: 32,
    unit: "/ per shirt",
    body: "Heavyweight premium cotton featuring the 'Always Bet on Yourself' exclusive print.",
    colors: T_SHIRT_COLORS_ALWAYS,
    sizes: ["S", "M", "L", "XL"],
    category: "T-Shirt",
    isBestSeller: true,
    isFeatured: true,
  },
  {
    id: "custom-mug",
    img: "/products/mug.jpeg",
    alt: "Classic ceramic coffee mug",
    eyebrow: "11oz Ceramic / Dishwasher Safe",
    title: "Classic Ceramic Mug",
    price: 16,
    unit: "/ per mug",
    body: "Glossy white ceramic with a wrap-around exclusive print. Safe in the dishwasher and the microwave.",
    colors: ["White"],
    sizes: ["11oz", "15oz"],
    category: "Mug",
    isBestSeller: false,
    isFeatured: true,
  },
];

import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);
    if (snapshot.empty) {
      return INITIAL_PRODUCTS; // Fallback for before seeding
    }
    const firestoreProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));

    // Ensure any initial products (like newly added Bags) are included even if Firestore hasn't synced yet
    const productMap = new Map<string, Product>();
    for (const p of INITIAL_PRODUCTS) {
      productMap.set(p.id, p);
    }
    for (const p of firestoreProducts) {
      const normalized: Product = {
        ...p,
        img: p.img || (p as any).image,
        title: p.title || (p as any).name,
        body: p.body || (p as any).description,
        category: p.category || "T-Shirt",
        colors: p.colors || ["Natural"],
        sizes: p.sizes || ["One Size"],
      };
      productMap.set(p.id, normalized);
    }

    const merged = Array.from(productMap.values());
    // Ensure 'Ain't the Lord Alright' is the front staple product
    merged.sort((a, b) => {
      if (a.id === "aint-the-lord-alright") return -1;
      if (b.id === "aint-the-lord-alright") return 1;
      if (a.id === "aint-the-lord-alright-tote-bag") return -1;
      if (b.id === "aint-the-lord-alright-tote-bag") return 1;
      return 0;
    });
    return merged;
  } catch (error) {
    console.error("Error fetching products:", error);
    return INITIAL_PRODUCTS; // Fallback on error
  }
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        img: data['img'] || data['image'],
        title: data['title'] || data['name'],
        body: data['body'] || data['description'],
        category: data['category'] || "T-Shirt",
      } as Product;
    }
    return INITIAL_PRODUCTS.find(p => p.id === id);
  } catch (error) {
    console.error("Error fetching product:", error);
    return INITIAL_PRODUCTS.find(p => p.id === id);
  }
};
