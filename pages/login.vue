<script setup >
import LoginForm from '~/components/Auth/LoginForm.vue';


</script>

<template>
  <!-- <div class="min-h-screen flex items-center justify-center">
    <UForm @submit="handleLogin" class="max-w-md bg-white p-6 shadow-lg rounded-lg">
      <h2 class="text-center text-xl font-bold">Login</h2>
      <UInput v-model="email" placeholder="Email" />
      <UInput v-model="password" type="password" placeholder="Password" />
      <UButton type="submit">Login</UButton>
    </UForm>
  </div> -->
  <div>
    <LoginForm />
  </div>
</template>

<!-- <script setup>
import { ref } from 'vue';
import { useAuth } from '~/composables/useAuth';



const email = ref('');
const password = ref('');
const { login, register } = useAuth();

const handleLogin = async () => {
    try {
      await login(email.value, password.value);
      
      alert('Login successful');
          authStore.setUser(user);
      navigateTo('/admin')
    } catch (error) {
      alert(error.message);
    }
  };
</script> -->
