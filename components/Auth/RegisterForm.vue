<template>
  <div class="w-full h-screen flex items-center justify-center">
    <UForm @submit="handleSignup" class="min-w-[350px] bg-white p-10 shadow-lg border rounded-lg mb-16 mt-0">
      <h2 class="text-center text-xl font-bold text-black">Signup</h2>
      <UFormGroup  name="email" class="mt-4" required>
        <label class="text-black">Email :</label>
        <UInput v-model="email" color="text-{color}-500 dark:text-{color}-400" variant="outline" placeholder="Enter your Email..."  />
      </UFormGroup>
  
      <UFormGroup  name="password" class="mt-4" required>
        <label class="text-black">Password :</label>
        <UInput v-model="password" type="password" color="text-{color}-500 dark:text-{color}-400" variant="outline" placeholder="Enter your Password..."  />
      </UFormGroup>
  
      <UButton type="submit" class="mt-4">Sign Up</UButton>
  
      <div class="text-center mt-4 text-black">
        <p class="text-black">
          Already have an account?
          <NuxtLink to="/login" class="text-blue-600 ml-2 border p-2">Login</NuxtLink>
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
  