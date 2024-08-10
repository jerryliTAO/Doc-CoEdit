<template>
    <Transition name="slide">
        <div class="fixed left-0 top-0 bottom-0 w-0.2lvw bg-gray-500 font-serif text-xs sm:text-base font-medium animate-fade"
            ref="container" v-if="useMenuStore().isShow" id="test">
            <div class="flex justify-end">
                <img :src="arrowLeft" alt="" class="ml-3 w-10 hover:cursor-pointer hover:bg-gray-200 rounded-full "
                    @click="useMenuStore().isShow = false">
            </div>
            <div class="gap-20 mx-2 mt-1 sm:mx-5">
                <div class="menuItem">
                    <div class="truncate">
                        <RouterLink :to="{ path: '/user' }">🏚️ {{ $t("home") }}</RouterLink>
                    </div>
                </div>
                <div class="menuItem">
                    <div class="truncate">
                        <RouterLink :to="{ path: '/user/profile' }">✍️ {{ $t("profile") }}</RouterLink>
                    </div>
                </div>
                <div class="menuItem">
                    <div class="truncate">
                        <RouterLink :to="{ path: '/user/mydoc' }">📜 {{ $t("mydoc") }}</RouterLink>
                    </div>
                </div>
                <div class="menuItem">
                    <div class="truncate">
                        <RouterLink :to="{ path: '/user/shared' }">📚 {{ $t("shared") }}</RouterLink>
                    </div>
                </div>
                <div class="menuItem">
                    <div class="w-5 mr-1">
                        <img src="@/images/addDoc.png" alt="" class="w-full h-full object-cover">
                    </div>
                    <div class="truncate">
                        <RouterLink :to="{ path: '/user/create' }">{{ $t("create") }}</RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </Transition>



</template>


<script lang='ts' setup>
import arrowLeft from '@/images/arrowLeft.png';
import { useMenuStore } from '@/stores/menu';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

let container = ref();
let con = ref();


onMounted(() => {

    // click outside hidden the menu
    window.addEventListener('click', (e) => {
        if (container.value) {
            if (!container.value.contains(e.target)) {
                useMenuStore().isShow = false;
            }
        }
    }, true)
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: 0.8s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(-100%);
}
</style>