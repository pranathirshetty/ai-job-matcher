"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../core/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const register = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  const createRegister = async (profile) => {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error("No user logged in");

    await setDoc(doc(db, "profiles", uid), {
      ...profile,
      createdAt: new Date().toISOString(),
    });

   
    const res = await fetch(
      `http://localhost:5000/users/${uid}/profile`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      }
    );

    return res.json();
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, createRegister }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);