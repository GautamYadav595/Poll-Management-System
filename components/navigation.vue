<template>
  
  <UContainer >
    <div class="flex justify-between items-center bg-white py-4">
     
      <div class="text-xl font-bold bg-blue-400 p-4 mr-15 rounded">
        <NuxtLink to="/">Poll Management System</NuxtLink>
      </div>

    
      <div class="flex gap-4 items-center" v-if="authStore.isAuthReady">
      
        <NuxtLink to="/">
          <UButton>Home</UButton>
        </NuxtLink>

        
        <NuxtLink v-if="!isAuthenticated" to="/login">
          <UButton>Login</UButton>
        </NuxtLink>

        <NuxtLink v-if="!isAuthenticated" to="/signup">
          <UButton>Signup</UButton>
        </NuxtLink>

        
        <NuxtLink v-if="!authStore.isAdmin" to="/polls">
  <UButton>Polls</UButton>
</NuxtLink>


        <NuxtLink v-if="authStore.isAdmin" to="/admin">
          <UButton>Poll</UButton>
        </NuxtLink>
        

          
          <UButton v-if="isAuthenticated" @click="logoutUser">Logout</UButton>

          
        <div v-if="isAuthenticated" class="flex items-center gap-4">
          
          <div
            class="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center cursor-pointer"
          >
            <span class="text-white text-xl">U</span> 
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup>
import { useAuthStore } from "~/store/auth";  
import { computed } from "vue";  
import { useRouter } from "vue-router"; 
import { useAuth } from '~/composables/useAuth';
const authStore = useAuthStore();

// watch(() => authStore.user, (newUser) => {
//   console.log(" Navigation UI updated - User:", newUser);
// });

// watch(() => authStore.isAuthReady, (ready) => {
//   console.log("🔄 Navigation UI updated - isAuthReady:", ready);
// });

const { logout } = useAuth();




const isAuthenticated = computed(() => authStore.user !== null);


const logoutUser = async () => {
  
     logout();
 
};



</script>
