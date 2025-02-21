<template>
  <div class="max-h-screen max-w-screen bg-white">
 
    <div class="flex flex-wrap justify-center gap-4 w-full bg-white p-4">
  <div v-for="poll in polls" :key="poll.id" class="flex justify-center">
    <PollCard :poll="poll" :userId="userId" />
  </div>
</div>

    
  
</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuth } from '~/composables/useAuth'
import { usePolls } from "~/composables/usePolls"; 
import PollCard from "~/components/Poll/PollCard.vue"; 


definePageMeta({
  middleware: "guest",
});

const { getPolls } = usePolls(); // Destructuring this getPolls from usePolls()
const { getCurrentUser } = useAuth();


const loading = ref(true);

const { subscribeToPolls, deletePoll } = usePolls();
const polls = ref([]); 

const userId = computed(() => {
  console.log("Checking User ID:", getCurrentUser()?.uid);
  return getCurrentUser()?.uid;
});

onMounted(() => {
  const unsubscribe = subscribeToPolls((newPolls) => {
    polls.value = newPolls;
    console.log("Updated poll.vue Polls Data:", JSON.parse(JSON.stringify(polls.value)));
  });

  return () => unsubscribe();
});

//this is an emit comming from pollcard
const updatePoll = (index, updatedPoll) => {
  polls.value[index] = updatedPoll; 
};


</script>
