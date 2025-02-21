import { ref } from "vue";
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
      console.log("Login User credentials" + user.value)
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
    console.log("User is getting logged out")
     await signOut(auth);
     user.value = null;
     console.log(user.value)
     alert("You are logged out successfully");
     navigateTo("/")
   };

  const getCurrentUser = () => user.value; 

  return { login, register, logout, getCurrentUser };
}
