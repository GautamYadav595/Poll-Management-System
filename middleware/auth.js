import { useAuthStore } from "~/store/auth";
import { navigateTo } from "#app";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();

  
  while (!authStore.isAuthReady) {                                //will wait for authstore to reload or firebase to send data to authstore
    await new Promise((resolve) => setTimeout(resolve, 100));
  }


  if (to.path.startsWith("/admin") && !authStore.isAdmin) {
    //alert("You don't have admin access.");
    return navigateTo("/");
  }
});
