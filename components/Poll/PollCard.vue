<template>
  <div class="bg-white p-6 shadow-lg rounded-xl w-[300px] h-auto gap-4 flex flex-col">
    <h3 class="text-xl font-semibold text-gray-800">{{ poll?.title }}</h3>

    <!-- Poll Options -->
    <PollOptions v-if="poll" :poll="poll" :userId="userId" @vote="handleVote" />

    <!-- Show only one message when user has already voted -->
    <p v-if="hasVoted" class="text-sm text-green-500 mt-4">You have already voted.</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuth } from "~/composables/useAuth";
import { usePolls } from "~/composables/usePolls";
import PollOptions from "./PollOptions.vue";

const props = defineProps({ poll: Object });
const emit = defineEmits(["updatePoll"]); // Emit event to update parent component

const { updatePoll } = usePolls();
const { getCurrentUser } = useAuth();

const userId = computed(() => {
  console.log("Checking User ID:", getCurrentUser()?.uid);
  return getCurrentUser()?.uid;
});
const hasVoted = computed(() => props.poll?.votedUsers?.includes(userId.value) || false);

const handleVote = async (option) => {
  if (!userId.value) {
    console.error("User ID missing!");
    return;
  }

  try {
    const updatedVotes = { 
      ...(props.poll.votes || {}), 
      [option]: (props.poll.votes?.[option] || 0) + 1 
    };

    const updatedUsers = Array.isArray(props.poll.votedUsers) 
      ? [...props.poll.votedUsers, userId.value] 
      : [userId.value];

    await updatePoll(props.poll.id, { 
      votes: updatedVotes, 
      votedUsers: updatedUsers 
    });

    emit("updatePoll", { ...props.poll, votes: updatedVotes, votedUsers: updatedUsers });
    alert("Your vote has been recorded!");
  } catch (error) {
    alert("Error voting: " + error.message);
  }
};

</script>
