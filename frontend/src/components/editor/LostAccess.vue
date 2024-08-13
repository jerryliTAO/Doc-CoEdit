<template>
    <div v-if="isWarn">
        <div class="fixed top-0 left-0 flex justify-center items-center w-lvw h-lvh bg-black opacity-40"></div>
        <div class="fixed top-0 left-0 flex justify-center items-center w-lvw h-lvh">
            <div class=" h-60 bg-gray-800 flex flex-col items-center rounded-2xl overflow-auto" ref="deleteWarm">
                <div class="flex flex-col justify-center items-center mx-10 h-60 ">
                    <div class="flex justify-center items-center font-serif text-3xl text-red-600">⚠️{{ $t('deleteWarn')
                        }}</div>
                    <RouterLink :to="{ path: '/user' }"><button
                            class="flex justify-center items-center mt-5 w-48 p-2 rounded-lg text-lg text-white border-2 border-white hover:bg-gray-400">
                            {{ $t('backToHomepage') }}</button></RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang='ts' setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

let deleteWarm = ref();
let isWarn = ref(false);


</script>


<style scoped></style>