<template>
  <div  class="max-h-full max-w-full flex flex-wrap justify-center gap-6 mt-8 bg-white">
    <!-- Display Poll Cards in rows -->
    <div v-for="poll in polls" :key="poll.id" class="flex justify-center">
      <!-- Poll Card Component -->
      <PollCard :poll="poll" :userId="userId" />
      
    </div>
    
  </div>
  <!-- <div v-else class="w-full flex flex-wrap justify-center gap-6 mt-8">Oops You need to Log in</div> -->
</template>

<script setup>
import { ref, onMounted } from "vue";
import { usePolls } from "~/composables/usePolls"; // Ensure this import is correct
import PollCard from "~/components/Poll/PollCard.vue"; 

const { getPolls } = usePolls(); // Destructure getPolls from usePolls()
const polls = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    polls.value = await getPolls();  // Fetch the polls using getPolls
    console.log("Fetched Polls:", polls.value);
  } catch (error) {
    console.error("Error fetching polls:", error);
  } finally {
    loading.value = false;
  }
});

// Function to update poll instantly after vote
const updatePoll = (index, updatedPoll) => {
  polls.value[index] = updatedPoll; // Update the specific poll in the list
};
</script>
