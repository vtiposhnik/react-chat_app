import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "chat-a7251.firebaseapp.com",
  projectId: "chat-a7251",
  storageBucket: "chat-a7251.appspot.com",
  messagingSenderId: "1038300873425",
  appId: "1:1038300873425:web:a209a1d496c4dff50ffbf0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()