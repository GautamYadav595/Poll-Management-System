<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center ">
  <UForm :schema="schema"  class="space-y-4 w-full max-w-md p-6 bg-white rounded-lg shadow-lg" @submit="handleLogin">
    <h1 class="text-3xl font-semibold text-center mb-6">Signup</h1>
    <UFormGroup label="Email" name="email">
      <UInput v-model="email"  required/>
    </UFormGroup>

    <UFormGroup label="Password" name="password" >
      <UInput v-model="password" type="password" required/>
    </UFormGroup>

    <UButton type="submit">
      Submit
    </UButton>
    <div class="text-center mt-4">
  <p class="text-sm">
    Have an account?
    <NuxtLink to="/login" class="text-blue-600">Login</NuxtLink>
  </p>
</div>
  </UForm>
</div>
</template>


<script setup>
import { ref } from "vue";
import { useAuth } from "~/composables/useAuth";

const email = ref("");
const password = ref("");
const { register } = useAuth();

const handleSignup = async () => {
  try {
    await register(email.value, password.value);
    alert("Account Created! Now login.");
  } catch (error) {
    alert(error.message);
  }
};
</script>



<style scoped>
.auth-container {
  width: 300px;
  margin: auto;
  text-align: center;
}
</style>
