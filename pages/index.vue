<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center ">
    <!-- Hero Section -->
    <div class="text-center max-w-2xl mb-20">
      <h1 class="text-4xl font-extrabold text-gray-800 ">
        Welcome to Poll Management
      </h1>
      <p class="text-lg text-gray-600 mb-6">
        Create, manage, and participate in polls effortlessly. Engage with your audience and make informed decisions!
      </p>
      <NuxtLink to="/login">
        <UButton class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg shadow-md">
          Get Started
        </UButton>
      </NuxtLink>
    </div>

    <!-- Recent Polls Section -->
    <div class="mt-8 w-full max-w-4xl">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Recent Polls</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="poll in recentPolls" 
          :key="poll.id" 
          class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <h3 class="text-lg font-semibold text-gray-800">{{ poll.title }}</h3>
          <p class="text-sm text-gray-600 mt-2">Created by: {{ poll.creator }}</p>
          <NuxtLink to="/login">
            <UButton class="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
              Vote Now
            </UButton>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const recentPolls = [
  { id: 1, title: "What's your favorite programming language?", creator: "Gautam Yadav" },
  { id: 2, title: "Best framework for 2024?", creator: "Gautam Yadav" },
  { id: 3, title: "Should we switch to remote work permanently?", creator: "Gautam Yadav" }
];
</script>
