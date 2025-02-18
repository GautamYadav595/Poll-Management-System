<template>
  <div class="w-full h-screen flex items-center justify-center">
    <UForm @submit="handleSignup" class="min-w-[350px] bg-white p-10 shadow-lg rounded-lg">
      <h2 class="text-center text-xl font-bold">Register</h2>
      <UFormGroup label="Email" name="email" class="mt-4" required>
        <UInput v-model="email" color="text-{color}-500 dark:text-{color}-400" variant="outline" placeholder="Email..."  />
      </UFormGroup>
  
      <UFormGroup label="Password" name="password" class="mt-4" required>
        <UInput v-model="password" type="password" color="text-{color}-500 dark:text-{color}-400" variant="outline" placeholder="Password..."  />
      </UFormGroup>
  
      <UButton type="submit" class="mt-4">Sign Up</UButton>
  
      <div class="text-center mt-4">
        <p class="text-sm">
          Already have an account?
          <NuxtLink to="/login" class="text-blue-600">Login</NuxtLink>
        </p>
      </div>
    </UForm>
  </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useAuth } from '~/composables/useAuth';
  
  const email = ref('');
  const password = ref('');
  const { register } = useAuth();
  
  const handleSignup = async () => {
    try {
      await register(email.value, password.value);
      alert('Signup successful! Please log in.');
    } catch (error) {
      alert(error.message);
    }
  };
  </script>
  