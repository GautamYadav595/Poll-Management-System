<template>
  <div class="min-h-screen min-w-screen bg-white">
    <div class="max-h-full max-w-full flex flex-col items-center bg-white">
      <h2 class="text-3xl font-bold text-gray-800 mb-6">
        {{ isEditMode ? "Edit Poll" : "Create Poll" }}
      </h2>

      <UButton @click="openCreatePollForm"> Create Poll </UButton>

      <UModal v-model="showPollForm" :ui="{ background: 'bg-white' }">
        <div class="p-6 bg-white rounded-sm shadow-lg w-[570px]">
          <h3 class="text-2xl font-semibold text-gray-800 mb-4">
            {{ isEditMode ? "Edit Poll" : "Create New Poll" }}
          </h3>
          <UForm v-on:submit.prevent="">
            <UFormGroup label="Poll Title">
              <UInput v-model="poll.title" required />
            </UFormGroup>

            <div
              v-for="(option, index) in poll.options"
              :key="index"
              class="items-center flex justify-between"
            >
              <div>
                <UFormGroup :label="'Option ' + (index + 1)">
                  <UInput
                    v-model="poll.options[index]"
                   
                    v-on:keydown.enter.prevent="handleEnterKey(index)"
                    required
                  />
                </UFormGroup>
              </div>
              <div class="flex justify-between gap-3 mt-1">
                <button
                  @click="editPoll(pollId)"
                  class="text-black hover:text-blue-700"
                >
                  <Icon name="mdi:pencil-outline" size="24px" />
                </button>
                <button
                  class="text-black border p-1 rounded-md"
                  v-on:click="deleteOption(index)"
                >
                  <Icon name="mdi:trash-can-outline" size="24px" />
                </button>
              </div>
            </div>

            <UButton @click.prevent="handleInputOptions"> Add Option </UButton>

            <div class="flex justify-end space-x-3 mt-4">
              <UButton @click="resetForm"> Cancel </UButton>
              <UButton @click="submitPoll" type="submit" color="green">
                {{ isEditMode ? "Update Poll" : "Submit" }}
              </UButton>
            </div>
          </UForm>
        </div>
      </UModal>

      <div class="w-full max-w-6xl mt-6">
        <PollList @editPoll="editPoll" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { usePolls } from "~/composables/usePolls";
import PollList from "~/components/Admin/PollList.vue";
import { onMounted, onUnmounted } from "vue";

definePageMeta({
  middleware: "auth",
});
const unsubscribe = ref(null);
const { createPoll, updatePollData, polls, getPolls, subscribeToPolls } =
  usePolls();
const showPollForm = ref(false);
const isEditMode = ref(false);
const poll = ref({ id: null, title: "", options: [""] });
const isEditingInput = false;

onMounted(() => {
  unsubscribe.value = subscribeToPolls((updatedPolls) => {
    polls.value = updatedPolls;
  });
});

onUnmounted(() => {
  if (unsubscribe.value) unsubscribe.value();
});

const openCreatePollForm = () => {
  resetForm();
  showPollForm.value = true;
};


const editPoll = (pollData) => {
  
  console.log("Editing poll:", pollData);
  isEditMode.value = true;
  poll.value = {
    id: pollData.id,
    title: pollData.title,
    options: [...pollData.options],
  };
  showPollForm.value = true;
};

const handleInputOptions = () => {
  console.log("ENter button clicked");
  poll.value.options.push("");
};
const handleEnterKey = (index) => {
  console.log("Enter botton pressed");
  poll.value.options.push("");
};

const deleteOption = (index) => {
  console.log("Delete button clicked");
  poll.value.options.splice(index, 1);
};

const resetForm = () => {
  poll.value = { id: null, title: "", options: [""] };
  showPollForm.value = false;
  isEditMode.value = false;
};

const submitPoll = async () => {
  if (!poll.value.title || poll.value.options.some((opt) => !opt.trim())) {
    alert("Please fill out all fields.");
    return;
  }

  try {
    if (isEditMode.value) {
      console.log("Updating poll in Firestore:", poll.value);
      const updatedPoll = await updatePollData(poll.value.id, {
        title: poll.value.title,
        options: [...poll.value.options],
      });

      console.log(updatedPoll, "admin data");

      alert("Poll updated successfully!");
    } else {
      const newPoll = {
        title: poll.value.title,
        options: [...poll.value.options],
        votes: Object.fromEntries(poll.value.options.map((opt) => [opt, 0])),
        createdAt: new Date(),
      };
      await createPoll(newPoll);
      alert("Poll created successfully!");
    }

    resetForm();
  } catch (error) {
    console.error("Error creating/updating poll:", error);
    alert("Failed to create/update poll: " + error.message);
  }
};
</script>
