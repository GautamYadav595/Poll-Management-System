import { defineStore } from "pinia";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loggedIn: false,
    isAdmin: false,  // New state for admin access
  }),
  actions: {
    setUser(user) {
      this.user = user;
      this.loggedIn = !!user;
      this.isAdmin = user?.email === "test@admin.com"; // Set admin status based on email
    },

    async login(email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        this.setUser(user);
      } catch (error) {
        throw new Error("Login failed: " + error.message);
      }
    },

    async logout() {
      await signOut(auth);
      this.setUser(null);
      alert("You are logged out Succesfully")
      useRouter().push("/");
    },

    initAuth() {
      onAuthStateChanged(auth, (user) => {
        this.setUser(user);
      });
    },
  },
});
