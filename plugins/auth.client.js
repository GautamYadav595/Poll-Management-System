import { useAuthStore } from "@/store/auth";

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();
  console.log(" Running initAuth() in Nuxt plugin...");
  await authStore.initAuth(); // Ensure we wait for Firebase to restore auth
  console.log(" Auth initialized before rendering UI inside plugins");
});
