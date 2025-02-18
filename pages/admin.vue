<template>
  <div class="max-h-full max-w-full bg-gray-100 flex flex-col items-center">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">{{ isEditMode ? 'Edit Poll' : 'Create Poll' }}</h2>

    <!-- Create Poll Button -->
    <UButton @click="showPollForm = true" class="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition">
      Create Poll
    </UButton>

    <!-- Poll Creation Form (Modal) -->
    <UModal v-model="showPollForm">
      <div class="p-6 bg-white rounded-xl shadow-lg w-[500px]">
        <h3 class="text-2xl font-semibold text-gray-800 mb-4">{{ isEditMode ? 'Edit Poll' : 'Create New Poll' }}</h3>

        <UForm @submit="submitPoll" class="space-y-4">
          <!-- Poll Title -->
          <UFormGroup label="Poll Title">
            <UInput v-model="poll.title" required class="w-full px-4 py-2 border rounded-lg" />
          </UFormGroup>

          <!-- Poll Options -->
          <div v-for="(option, index) in inputoptions" :key="index">
            <UFormGroup :label="'Option ' + (index + 1)">
              <UInput v-model="poll.options[index]" required class="w-full px-4 py-2 border rounded-lg" />
            </UFormGroup>
          </div>

          <!-- Button to add more options -->
          <UButton @click="handleInputOptions" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Add Option
          </UButton>

          <!-- Form Buttons -->
          <div class="flex justify-end space-x-3 mt-4">
            <UButton color="red" @click="showPollForm = false" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
              Cancel
            </UButton>
            <UButton type="submit" color="green" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
              {{ isEditMode ? 'Update Poll' : 'Submit' }}
            </UButton>
          </div>
        </UForm>
      </div>
    </UModal>

    <!-- Poll List Grid -->
    <div class="w-full max-w-6xl mt-6">
      <PollList @editPoll="editPoll" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { usePolls } from "~/composables/usePolls";
import PollList from "~/components/Admin/PollList.vue";

definePageMeta({
  middleware: "auth",
});

const { createPoll, updatePoll } = usePolls();
const showPollForm = ref(false);
const isEditMode = ref(false); 
const inputoptions = ref([]);
const poll = ref({
  title: "",
  options: [],
});

const editPoll = (pollData) => {
  isEditMode.value = true;
  poll.value = { ...pollData };
  inputoptions.value = pollData.options;
  showPollForm.value = true;
};

const handleInputOptions = () => {
  inputoptions.value.push(""); 
};

const submitPoll = async () => {
  if (!poll.value.title || poll.value.options.some(opt => !opt.trim())) {
    alert("Please fill out all fields.");
    return;
  }

  try {
    const newPoll = {
      title: poll.value.title,
      options: poll.value.options,
      votes: Object.fromEntries(poll.value.options.map(opt => [opt, 0])),
      createdAt: new Date(),
    };

    if (isEditMode.value) {
      await updatePoll(poll.value.id, newPoll); 
      alert("Poll updated successfully!");
    } else {
      await createPoll(newPoll); 
      alert("Poll created successfully!");
    }

    poll.value = { title: "", options: [""] };
    inputoptions.value = [];
    showPollForm.value = false;
    isEditMode.value = false;
  } catch (error) {
    console.error("Error creating/updating poll:", error);
    alert("Failed to create/update poll: " + error.message);
  }
};
</script>
