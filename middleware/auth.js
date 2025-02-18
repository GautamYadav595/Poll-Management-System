import { useAuthStore } from "~/store/auth";
import { navigateTo } from "#app";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();

  // Wait for authentication state to be initialized
  while (authStore.user === null) {
    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait until user is set
  }

  // If user is not an admin and trying to access admin panel, redirect
  if (to.path.startsWith("/admin") && !authStore.isAdmin) {
    alert("You don't have admin access.");
    return navigateTo("/");
  }
});
