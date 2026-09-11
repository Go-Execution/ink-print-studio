import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// Replace these with your actual Firebase project config
const firebaseConfig = {
  apiKey: import.meta.env['VITE_FIREBASE_API_KEY'] || "dummy_api_key",
  authDomain: import.meta.env['VITE_FIREBASE_AUTH_DOMAIN'] || "dummy-project.firebaseapp.com",
  projectId: import.meta.env['VITE_FIREBASE_PROJECT_ID'] || "dummy-project",
  storageBucket: import.meta.env['VITE_FIREBASE_STORAGE_BUCKET'] || "dummy-project.appspot.com",
  messagingSenderId: import.meta.env['VITE_FIREBASE_MESSAGING_SENDER_ID'] || "123456789",
  appId: import.meta.env['VITE_FIREBASE_APP_ID'] || "1:123456789:web:abcdef",
  measurementId: import.meta.env['VITE_FIREBASE_MEASUREMENT_ID']
};

// Initialize Firebase (prevent duplicate initialization in dev/SSR)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);

// Initialize Analytics only if we're in the browser
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
