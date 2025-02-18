<template>
  <!-- <div class="min-h-screen flex items-center justify-center">
    <UForm @submit="handleSignup" class="max-w-md bg-white p-6 shadow-lg rounded-lg">
      <h2 class="text-center text-xl font-bold">Signup</h2>
      <UInput v-model="email" placeholder="Email" />
      <UInput v-model="password" type="password" placeholder="Password" />
      <UButton type="submit">Signup</UButton>
    </UForm>
  </div> -->
  <div>
    <RegisterForm />
  </div>
</template>

<script setup>
import RegisterForm from '~/components/Auth/RegisterForm.vue'
</script>


<!-- <script setup>
import { ref } from 'vue';
import { useAuth } from '~/composables/useAuth';

const email = ref('');
const password = ref('');
const { register } = useAuth();

const handleSignup = async () => {
  try {
    await register(email.value, password.value);
    alert('Signup successful');
  } catch (error) {
    alert(error.message);
  }
};
</script> -->
