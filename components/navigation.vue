<template>
  <UContainer>
    <div class="flex justify-between items-center bg-white py-4">
      <!-- Left side: Logo or brand name -->
      <div class="text-xl font-bold bg-blue-400 p-4 mr-15 rounded">
        <NuxtLink to="/">Poll Management System</NuxtLink>
      </div>

      <!-- Right side: Navigation links -->
      <div class="flex gap-4 items-center">
        <!-- Home link always visible -->
        <NuxtLink to="/">
          <UButton>Home</UButton>
        </NuxtLink>

        <!-- Login and Register links only visible when not authenticated -->
        <NuxtLink v-if="!isAuthenticated" to="/login">
          <UButton>Login</UButton>
        </NuxtLink>

        <NuxtLink v-if="!isAuthenticated" to="/signup">
          <UButton>Register</UButton>
        </NuxtLink>

        <!-- Polls link always visible -->
        <NuxtLink v-if="isAuthenticated && user?.email !== 'test@admin.com'" to="/polls">
  <UButton>Polls</UButton>
</NuxtLink>

        <NuxtLink to="/admin">
          <UButton>Admin</UButton>
        </NuxtLink>
        

          <!-- Logout button only visible when authenticated -->
          <UButton v-if="isAuthenticated" @click="logout">Logout</UButton>

          <!-- User icon and Logout button only visible when authenticated -->
        <div v-if="isAuthenticated" class="flex items-center gap-4">
          <!-- Profile icon - round -->
          <div
            @click="goToProfile"
            class="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center cursor-pointer"
          >
            <span class="text-white text-xl">U</span> <!-- User Initials or Profile Image -->
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup>
import { useAuthStore } from "~/store/auth";  // Import the Pinia store
import { computed } from "vue";  // Import the 'computed' function
import { useRouter } from "vue-router";  // Import the useRouter for redirection

// Initialize the Pinia store
const authStore = useAuthStore();

// Computed property to check if the user is authenticated
const isAuthenticated = computed(() => authStore.user !== null);

// Handle logout functionality
const logout = async () => {
  await authStore.logout();  // Call the logout method from the Pinia store
    // Redirect to homepage after logout
};

// Redirect to user profile page (optional)
const goToProfile = () => {
  useRouter().push("/profile");  // Add a profile page if needed
};
</script>
