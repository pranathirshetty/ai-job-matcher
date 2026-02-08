"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth,db } from "../core/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword

} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };
  const register = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  const createRegister = async (profileData) => {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error("No user logged in");
    const cleanData = JSON.parse(JSON.stringify({
      ...profileData,
      createdAt: new Date().toISOString(),
    }));
    await setDoc(doc(db, "profiles", uid), cleanData);{
 
};
  }
  return (
    <AuthContext.Provider value={{ user, login,loading, register, createRegister }}>
      {children}
    </AuthContext.Provider>
  );};
export const useAuth = () => {
  return useContext(AuthContext);
}
