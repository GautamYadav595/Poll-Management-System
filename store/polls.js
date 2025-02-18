import { defineStore } from "pinia";
import { usePolls } from "~/composables/usePolls";

export const usePollsStore = defineStore("polls", {
  state: () => ({
    polls: [],
  }),
  actions: {
    async fetchPolls() {
      const { getPolls } = usePolls();
      this.polls = await getPolls();
    },
  },
});