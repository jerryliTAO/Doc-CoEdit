import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMenuStore = defineStore('menu',()=>{
    const isShow = ref(false);
    return {isShow}
})