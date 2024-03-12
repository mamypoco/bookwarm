// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAE39j-90pZvK4HQCcDX9B-5GwkmnwVSQ",
  authDomain: "bookwarm-d2f36.firebaseapp.com",
  projectId: "bookwarm-d2f36",
  storageBucket: "bookwarm-d2f36.appspot.com",
  messagingSenderId: "701169565870",
  appId: "1:701169565870:web:77217227f053b5609c6d3f",
  measurementId: "G-2KZVXHPRER",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

//db creation
export const db = getFirestore(app);
