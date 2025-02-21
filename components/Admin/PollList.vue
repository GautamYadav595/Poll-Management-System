<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white">
    <div 
      v-for="poll in polls" 
      :key="poll.id" 
      class="bg-white p-6 shadow-lg rounded-xl flex flex-col gap-4"
    >
      <h3 class="text-xl font-semibold text-gray-800">{{ poll.title }}</h3>

      <div v-for="option in poll?.options" :key="option.trim()" class="w-full">
        <div class="flex justify-between items-center">
          <p class="text-black">{{ option.trim() }}</p>
          <p>{{ poll.votes[option.trim()] || 0 }} Votes</p>
        </div>

       
        <div class="relative w-full h-3 bg-gray-200 rounded-lg overflow-hidden mt-1">
          <div 
            class="h-full transition-all duration-500" 
            :class="getProgressColor(poll, option.trim())"
            :style="{ width: calculatePercentage(poll, option.trim()) + '%' }"
          ></div>
        </div>
        
      </div>
      <div class="flex justify-between mt-4">
        <UButton @click="editPoll(poll)"> Edit </UButton>
        <UButton @click="deletePoll(poll.id)" color="red"> Delete </UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { usePolls } from '~/composables/usePolls';

const { subscribeToPolls, deletePoll } = usePolls();
const polls = ref([]); 
const emit = defineEmits();

// Subscribe to polls on mounted
//here we are assigning data to polls
onMounted(() => {
  const unsubscribe = subscribeToPolls((newPolls) => {
    polls.value = newPolls;
  });

  return () => unsubscribe();
});

const editPoll = (poll) => {
  emit('editPoll', poll); 
};
const calculatePercentage = (poll, option) => {
  if (!poll || !poll.votes) return 0;
  const totalVotes = Object.values(poll.votes).reduce((acc, count) => acc + count, 0);

  console.log("Total votes for poll:", totalVotes);
  
  if (totalVotes === 0) return 0; 
  return ((poll.votes[option] || 0) / totalVotes) * 100;
};


const getProgressColor = (poll, option) => {
  const percentage = calculatePercentage(poll, option);

  console.log("Percentage for", option, ":", percentage);

  if (percentage >= 75) return "bg-green-500";  
  if (percentage >= 50) return "bg-green-500"; 
  if (percentage >= 25) return "bg-green-500"; 
  return "bg-green-500"; 
};


</script>
