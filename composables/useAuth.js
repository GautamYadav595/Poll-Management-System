import { ref, onMounted } from "vue";
import { auth, db } from "@/plugins/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const user = ref(null);

// Listen to Firebase auth state changes
onAuthStateChanged(auth, (firebaseUser) => {
  user.value = firebaseUser;
  console.log("Auth state updated:", firebaseUser?.uid || "No user");
});

export function useAuth() {
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;
      return userCredential.user;
    } catch (error) {
      console.error("Login error:", error.message);
      throw error;
    }
  };

  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;
      return userCredential.user;
    } catch (error) {
      console.error("Registration error:", error.message);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    user.value = null;
  };

  const getCurrentUser = () => user.value; // Now always up-to-date

  const isAdmin = async () => {
    if (!user.value) return false;

    try {
      const userDoc = await getDoc(doc(db, "users", user.value.uid));
      return userDoc.exists() && userDoc.data().role === "admin";
    } catch (error) {
      console.error("Error fetching user role:", error);
      return false;
    }
  };

  return { login, register, logout, getCurrentUser, isAdmin };
}
