import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDWr8i622Xdido1ELJo8EeGS_3PAvdwCpI",
  authDomain: "hi-expense-tracker.firebaseapp.com",
  projectId: "hi-expense-tracker",
  storageBucket: "hi-expense-tracker.firebasestorage.app",
  messagingSenderId: "1:108256566829:web:23b6fd01d155f7fe09e2a4",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;