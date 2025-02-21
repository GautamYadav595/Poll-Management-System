import { defineStore } from "pinia";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { navigateTo } from "#app"; 
import firebaseConfig from "@/utils/firebaseConfig"; 


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAdmin: false,
    isAuthReady: false,
  }),

  actions: {
    setUser(user) {
      this.user = user;
      this.isAdmin = user?.email === "test@admin.com";
      console.log("Checking before refreshing the admin.vue page")
      this.isAuthReady = true; 
    },

    async login(email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        this.setUser(userCredential.user);
      } catch (error) {
        throw new Error("Login failed: " + error.message);
      }
    },

    
    async initAuth() {
      console.log("Starting initAuth()...");
      return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
          console.log("Firebase Auth State Changing here in initAuth:", user ? user.uid : "No user");
          this.setUser(user);
          this.isAuthReady = true; 
          console.log(" isAuthReady is set to true");
          resolve(user);
        });
      });
    }
    
  },
});
