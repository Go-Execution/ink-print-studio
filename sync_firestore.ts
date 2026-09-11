import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';
import { T_SHIRT_COLORS, T_SHIRT_COLORS_ALWAYS } from './src/lib/tshirt-colors.ts';

const envText = fs.readFileSync('.env.local', 'utf-8');
const envConfig = Object.fromEntries(
  envText.split('\n')
    .filter(line => line && !line.startsWith('#'))
    .map(line => line.split('=').map(s => s.trim()))
);

const firebaseConfig = {
  apiKey: envConfig.VITE_FIREBASE_API_KEY,
  authDomain: envConfig.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: envConfig.VITE_FIREBASE_PROJECT_ID,
  storageBucket: envConfig.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: envConfig.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: envConfig.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// recreate INITIAL_PRODUCTS here so we don't have to compile it
const products = [
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
  }
];

async function sync() {
    for (const p of products) {
        await setDoc(doc(db, 'products', p.id), p, { merge: true });
        console.log('Synced', p.id);
    }
}
sync().catch(console.error);
