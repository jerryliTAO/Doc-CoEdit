import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoadingStore = defineStore("loading", () => {
  let isShow = ref(false);
  return { isShow };
});
