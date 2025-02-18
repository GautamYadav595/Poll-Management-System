import { defineNuxtPlugin } from "#app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import config from "~/utils/firebaseConfig";

export default defineNuxtPlugin((nuxtApp) => {
  const app = initializeApp(config);
  const auth = getAuth(app);
  const db = getFirestore(app);

  nuxtApp.provide("auth", auth);
  nuxtApp.provide("db", db);
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Correctly export auth & db
export { auth, db };