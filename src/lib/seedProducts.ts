import { collection, writeBatch, doc } from "firebase/firestore";
import { db } from "./firebase";
import { INITIAL_PRODUCTS } from "./products";

export const seedProductsToFirestore = async () => {
  try {
    const batch = writeBatch(db);
    const productsRef = collection(db, "products");
    
    for (const product of INITIAL_PRODUCTS) {
      const docRef = doc(productsRef, product.id);
      batch.set(docRef, product);
    }
    
    console.log("Successfully seeded products to Firestore!");
  } catch (error) {
    console.error("Error seeding products:", error);
  }
};
