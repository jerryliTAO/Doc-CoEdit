import { defineStore } from "pinia";
import { ref } from "vue";

export const useDeleteStore = defineStore('delete',()=>{
    let isShow = ref(false);
    return {isShow}
})