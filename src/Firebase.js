// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAp2CTMJyvzwgUgoF61eKMDKZXKSIM8hTE",
  authDomain: "react-firebase-f4f73.firebaseapp.com",
  projectId: "react-firebase-f4f73",
  storageBucket: "react-firebase-f4f73.appspot.com",
  messagingSenderId: "1067756261625",
  appId: "1:1067756261625:web:554e64fbd71859d5fa1228"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth =getAuth(app);
export const db =getFirestore(app);