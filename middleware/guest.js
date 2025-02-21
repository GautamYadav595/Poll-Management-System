import { useAuthStore } from "~/store/auth";
import { navigateTo } from "#app";
import { computed } from "vue";  

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  if (!authStore.user) {
    return navigateTo("/login");
  }

})