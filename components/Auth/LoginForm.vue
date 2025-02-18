<template>
  <div class="w-full h-screen flex items-center justify-center">
    <UForm @submit="handleLogin" class="min-w-[350px] bg-white p-12 shadow-lg rounded-lg ">
      <h2 class="text-center text-xl font-bold">Login</h2>
      <UFormGroup label="Email" name="email">
        <UInput v-model="email" color="text-{color}-500 dark:text-{color}-400" variant="outline" placeholder="Email..." required />
      </UFormGroup>

      <UFormGroup label="Password" name="password" class="mt-4">
        <UInput v-model="password" color="text-{color}-500 dark:text-{color}-400" variant="outline" placeholder="Password..." required />
      </UFormGroup>

      <UButton type="submit" class="mt-4">Login</UButton>

      <div class="text-center mt-4">
        <p class="text-sm">
          Don't have an account?</p>
          <NuxtLink to="/register" class="text-blue-600">Sign up</NuxtLink>
        
      </div>
    </UForm>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "~/store/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const authStore = useAuthStore();
const router = useRouter();

// Simple email validation function
const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

// Handle login form submission
const handleLogin = async () => {
  if (!isValidEmail(email.value)) {
    alert("Please enter a valid email address.");
    return;
  }

  try {
    await authStore.login(email.value, password.value );

    // If login is successful, check if user is admin
    if (authStore.isAdmin) {
      alert("Admin login successful");
      router.push("/admin");
    } else {
      alert("Login successful");
      router.push("/polls");
    }
  } catch (error) {
    alert(error.message);
  }
};
</script>
