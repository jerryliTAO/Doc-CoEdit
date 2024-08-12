import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserListStore = defineStore('userList',()=>{
    const isShow = ref(false);
    return {isShow}
})