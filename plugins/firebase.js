import { defineNuxtPlugin } from "#app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCc356c8coQgt1sSyR9lQLpiFYMr9n1Liw",
  authDomain: "poll-management-system-7f756.firebaseapp.com",
  projectId: "poll-management-system-7f756",
  storageBucket: "poll-management-system-7f756.appspot.com", 
  messagingSenderId: "438555198200",
  appId: "1:438555198200:web:dc0e59104011671ff9310d"
};


export default defineNuxtPlugin((nuxtApp) => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  nuxtApp.provide("auth", auth);
});
