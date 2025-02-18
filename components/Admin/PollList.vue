<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div 
      v-for="poll in polls" 
      :key="poll.id" 
      class="bg-white p-6 shadow-lg rounded-xl flex flex-col gap-4"
    >
      <h3 class="text-xl font-semibold text-gray-800">{{ poll.title }}</h3>

      <div v-for="(count, option) in poll?.votes" :key="option" class="w-full">
        <button
          @click="emitVote(option)"
          :disabled="hasVoted"
          class="w-full bg-blue-500 text-white mt-2 px-4 py-2 rounded-lg border-2 border-blue-600 disabled:bg-gray-400 hover:bg-blue-600 transition"
        >
          {{ option }} ({{ count }} votes)
        </button>
      </div>

      <div class="flex justify-between mt-4">
        <UButton 
          @click="editPoll(poll)" 
          class="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
        >
          Edit
        </UButton>
        <UButton 
          @click="deletePoll(poll.id)" 
          color="red" 
          class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Delete
        </UButton>
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
onMounted(() => {
  const unsubscribe = subscribeToPolls((newPolls) => {
    polls.value = newPolls;
  });

  return () => unsubscribe(); 
});

const editPoll = (poll) => {
  emit('editPoll', poll); 
};
</script>
