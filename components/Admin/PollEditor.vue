<template>
    <div class="bg-white p-6 shadow rounded-lg">
      <h3 class="text-xl font-semibold">Create/Edit Poll</h3>
      <UInput v-model="poll.title" placeholder="Poll Title" />
      
      <div v-for="(option, index) in poll.options" :key="index" class="flex gap-2 mt-2">
        <UInput v-model="poll.options[index]" placeholder="Option" />
        <UButton @click="removeOption(index)" color="red">X</UButton>
      </div>
  
      <UButton @click="addOption" class="mt-2">+ Add Option</UButton>
      <UButton @click="savePoll" class="mt-2">Save Poll</UButton>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { usePolls } from '~/composables/usePolls';
  
  const { createPoll } = usePolls();
  
  const poll = ref({
    title: '',
    options: [''],
    votes: {},
  });
  
  const addOption = () => poll.value.options.push('');
  const removeOption = (index) => poll.value.options.splice(index, 1);
  
  const savePoll = async () => {
    try {
      const formattedPoll = {
        title: poll.value.title,
        votes: Object.fromEntries(poll.value.options.map((opt) => [opt, 0])),
      };
      await createPoll(formattedPoll);
      alert('Poll saved successfully');
    } catch (error) {
      alert('Error saving poll: ' + error.message);
    }
  };
  </script>
  