
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ADD fb auth import
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// fb config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "foodiegem-6da5b.firebaseapp.com",
  projectId: "foodiegem-6da5b",
  storageBucket: "foodiegem-6da5b.firebasestorage.app",
  messagingSenderId: "245025477320",
  appId: "1:245025477320:web:1bcfe668825ce243fdcbfd",
  measurementId: "G-Q9MXE46SEY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize and export auth
export const auth = getAuth(app); // ADD THIS LINE
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;