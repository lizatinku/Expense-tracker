import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from '../firebase/firebaseConfig';

const auth = getAuth();

export const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error during sign in:", error.code, error.message);
    throw error;
  }
};

export { auth };