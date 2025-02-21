<template>
  <div class="bg-white text-black p-4 rounded-sm w-[350px] max-h-[50px]" data-color-mode="light" >
    <UCard
      :ui="{
        background: 'bg-white dark:bg-gray-900',
        ring: 'ring-1 ring-gray-300 dark:ring-gray-700',
        divide: 'divide-y divide-gray-200 dark:divide-gray-700',
        header: { base: 'font-bold text-lg' },
        padding: 'p-4 sm:p-6',
      }"
    >
      <!-- Header -->
      <div class="border-b ">
        <h4 class="text-md font-semibold text-gray-900 dark:text-white">
          Select an option:
        </h4>
      </div>

      <!-- Poll Options -->
      <div class="space-y-3 py-1 mt-3">
        <div
          v-for="option in poll.options"
          :key="option.trim()"
          class="flex items-center gap-4  bg-gray-100 dark:bg-gray-800 rounded-md font-normal"
        >
          <URadio
            :id="option.trim()"
            :value="option.trim()"
            v-model="selectedOption"
            :disabled="!isUpdating && hasVoted"
            :ui="{ base: 'w-5 h-5 text-primary focus:ring-primary' }"
          />
          <label
            class="text-gray-900 dark:text-white cursor-pointer"
            :for="option.trim()"
          >
            {{ option.trim() }}
          </label>
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex justify-between items-center border-t pt-6 gap-3">
        <!-- Vote Now (Left) -->
        <UButton
          @click="submitVote"
          :disabled="hasVoted && !isUpdating"
          color="green"
          font= "font-small"
          variant="solid"
          size="xs"
          truncate='text-left break-all line-clamp-1'
          class="w-1/3 text-center"
        >
          Vote Now
        </UButton>

        <!-- Update Vote (Right) -->
        <UButton
          @click="enableUpdate"
          :disabled="!hasVoted"
          color="blue"
          variant="solid"
          size="xs"
          class="w-1/1 text-center"
        >
          Update Vote
        </UButton>
      </div>
    </UCard>
  </div>
</template>


<script setup>
import { ref, watch, computed } from "vue";
import { useAuthStore } from "~/store/auth";

const props = defineProps({ pollId: String, userId: String });
const emit = defineEmits(["vote"]);
const authStore = useAuthStore()
const { subscribeToPolls } = usePolls(); 
const polls = ref([]);

onMounted(() => {
  const unsubscribe = subscribeToPolls((newPolls) => {
    polls.value = newPolls; 
    //console.log("Updated Polls in PollOptions.vue:", JSON.parse(JSON.stringify(polls.value))); 
  });

  return () => unsubscribe(); // Unsubscribe on unmount
});

const poll = computed(() => polls.value.find(p => p.id === props.pollId) || { votes: {} });


const selectedOption = ref(null);
const isUpdating = ref(false);
//const userId = computed(() => auth?.user?.id || null)
const hasVotedLocally = ref(false); // since we can't change the value of computed property directly and here dependancy is a props so then its not possible to change hasVoted so i created a ref

onMounted(() => {
  const unsubscribe = subscribeToPolls((newPolls) => {
    polls.value = newPolls;
    console.log("Updated POllOptions.vue Polls Data:", JSON.parse(JSON.stringify(polls.value)));
  });

  return () => unsubscribe();
});


const hasVoted = computed(() =>
hasVotedLocally.value ||poll.value?.votedUsers?.includes(props.userId) || false);




watch(
  () => poll.value,
  () => {
    if (hasVoted.value) {
      selectedOption.value = Object.keys(poll.value.votes).find(option => 
        poll.value.votes[option] > 0 && poll.value.votedUsers.includes(props.userId)
      ) || null;
    }
  },
  { immediate: true }
);

const submitVote = () => {
  if (!selectedOption.value) return;


  hasVotedLocally.value = true;
  //console.log(hasVotedLocally.value) this was for debugging purpose
  emit("vote", selectedOption.value);
  

  
  isUpdating.value = false;
  //console.log(isUpdating.value) this was for debugging purpose
};


const enableUpdate = () => {
  isUpdating.value = true; 
};
</script>
