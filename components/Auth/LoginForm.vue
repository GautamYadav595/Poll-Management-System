<template>
  <div class="w-full h-screen flex items-center justify-center  ">
    <UForm @submit="handleLogin" class="min-w-[350px] bg-white p-12 shadow-lg rounded-lg border mb-20">
      <h2 class="text-center text-xl font-bold text-black mb-4 ">Login</h2>
      
      <UFormGroup label="Email" name="email" required>
        
        <UInput v-model="email" color="text-{color}-500 dark:text-{color}-400" variant="outline" placeholder="Enter your Email..." />
      </UFormGroup>

      <UFormGroup  label="Password" color="primary"  variant="outlined" name="password" class="mt-4" required>
        <UInput v-model="password" color="z" variant="outline" placeholder="Enter your Password..." />
      </UFormGroup>

      <UButton type="submit" class="mt-4">Login</UButton>

      <div class="text-center mt-4">
        <p class="text-sm text-black">
          Don't have an account?</p>
          <NuxtLink to="/register" class="text-blue-600 border p-0.5">Sign up</NuxtLink>
        
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


const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};


const handleLogin = async () => {
  if (!isValidEmail(email.value)) {
    alert("Please enter a valid email address.");
    return;
  }

  try {
    await authStore.login(email.value, password.value );

    if (authStore.isAdmin) {
      //alert("Admin login successful");
      router.push("/admin");
    } else {
      //alert("Login successful");
      router.push("/polls");
    }
  } catch (error) {
    alert(error.message);
  }
};
</script>
