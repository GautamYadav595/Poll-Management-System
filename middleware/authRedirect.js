// import { useAuthStore } from "~/store/auth";
// import { navigateTo } from "#app";

// export default defineNuxtRouteMiddleware(async (to, from) => {
//   const authStore = useAuthStore();

//   console.log("[Middleware] Running on:", to.path);

//   // Ensure Firebase auth state is initialized
//   await authStore.initAuth();

//   console.log("[Middleware] User State:", authStore.user ? authStore.user.uid : "No user");

//  
//   if (to.path === "/login" && authStore.user !== null) {
//     console.log("[Middleware] Redirecting to home...");
//     return navigateTo("/");
//   } else {f
//     console.log("[Middleware] Access to /login allowed.");
//   }
// });
