// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCtpK8KB4CwHv7II5av4y3O9gL4i5ROZ4",
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

export const db = getFirestore(app);
export const storage = getStorage(app);
