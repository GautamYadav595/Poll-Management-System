<script setup>
import LoginForm from '~/components/Auth/LoginForm.vue';
import { useAuthStore } from "~/store/auth";

definePageMeta({
  middleware: async (to, from) => {
    const authStore = useAuthStore();

    console.log("[Login Page] Running middleware...");

    await authStore.initAuth();

    console.log("[Login Page] User State:", authStore.user ? authStore.user.uid : "No user");

    if (authStore.user !== null) {
      return navigateTo("/");
    
    }
  },
});
</script>

<template>
  <div>
    <LoginForm />
  </div>
</template>

