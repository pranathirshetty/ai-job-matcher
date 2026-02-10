"use client";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAvuYX0iIhFKaF9qfXDQt90BENabVLCEeU",
  authDomain: "skill60job.firebaseapp.com",
  projectId: "skill60job",
  storageBucket: "skill60job.firebasestorage.app",
  messagingSenderId: "342875231007",
  appId: "1:342875231007:web:6130883d3b1d8577d2d62a",
  measurementId: "G-272G5MH7X4"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

let analytics;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
  } catch (err) {
    console.warn("Firebase analytics not initialized:", err.message || err);
  }
}