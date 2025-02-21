<template>
  <div class="max-w-[400px] h-[400px] p-4 bg-white shadow-lg rounded-2xl border border-gray-200 flex-auto mt-8">
  <div>
    <h3 class="text-md font-bold text-gray-800">{{ poll?.title }}</h3>
  </div>
  <div>
    <PollOptions :pollId="poll.id" :userId="userId" @vote="handleVote" />
  </div>
  <!-- <div>
    <p v-if="hasVoted" class="text-sm text-green-500  items-end mt-56 align-text-bottom">You have already voted.</p>
  </div> -->
</div>

</template>

<script setup>
import { computed } from "vue";
import { useAuth } from "~/composables/useAuth";
import { usePolls } from "~/composables/usePolls";
import PollOptions from "./PollOptions.vue"; 
import { useAuthStore } from "~/store/auth";


const useStore = useAuthStore() 
const props = defineProps({ poll: Object, userId: String }); //props are defined here
const emit = defineEmits(["updatePoll"]); // Emit event to update parent component

const { updatePoll } = usePolls();


//const polls = ref([]);


const hasVoted = computed(() => props.poll?.votedUsers?.includes(props.userId) || false);

const handleVote = async (option) => {
  console.log("props user id " + props.userId)
  if (!props.userId) {
    console.error("User ID missing!");
    return;
  }

  try {
    const updatedVotes = { 
      ...(props.poll.votes || {}), 
      [option]: (props.poll.votes?.[option] || 0) + 1 
    };

    const updatedUsers = Array.isArray(props.poll.votedUsers) 
      ? [...props.poll.votedUsers, props.userId] 
      : [props.userId];

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
