<template>
  <div class="w-auto h-auto flex flex-col bg-white p-4 rounded-lg shadow-md">
    <h4 class="text-md font-semibold text-black">Select an option:</h4>

    <!-- Poll Options -->
    <div v-for="(count, option) in poll?.votes" :key="option" class="flex items-center gap-2 p-2 rounded-md">
      <input 
        type="radio" 
        :id="option" 
        :value="option" 
        v-model="selectedOption" 
        :disabled="!isUpdating && hasVoted" 
        class="accent-white focus:ring-0 focus:shadow-none"  
      />
      <label class="text-black" :for="option">{{ option }}</label> 
    </div>

    <!-- Buttons -->
    <div class="flex justify-between mt-4">
      <button 
        class="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition" 
        @click="submitVote" 
        :disabled="!isUpdating && hasVoted || !selectedOption"
      >
        Vote Now
      </button>
      <button 
        class="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition" 
        @click="enableUpdate"
        :disabled="!hasVoted"
      >
        Update Vote
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";

const props = defineProps({ poll: Object, userId: String });
const emit = defineEmits(["vote"]);

// Reactive state
const selectedOption = ref(null);
const isUpdating = ref(false);

// Check if user has voted
const hasVoted = computed(() => props.poll?.votedUsers?.includes(props.userId) || false);

// Retrieve user's previous vote
watch(
  () => props.poll,
  () => {
    if (hasVoted.value) {
      // Find the user's last voted option
      selectedOption.value = Object.keys(props.poll.votes).find(
        (option) => props.poll.votes[option] > 0 && props.poll.votedUsers.includes(props.userId)
      ) || null;
    }
  },
  { immediate: true }
);

// Function to handle vote submission
const submitVote = () => {
  if (!selectedOption.value) return;

  // Emit the vote event so the parent can handle it (e.g., update Firestore)
  emit("vote", selectedOption.value);

  // Disable voting after selection
  isUpdating.value = false;
};

// Function to enable updating the vote
const enableUpdate = () => {
  isUpdating.value = true; // Enable voting options
};
</script>
