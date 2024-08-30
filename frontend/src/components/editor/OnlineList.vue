<template>
    <div class="fixed bottom-5 right-10 w-10 h-10 bg-black rounded-full hover:cursor-pointer print:hidden"
        @click="isShow = !isShow">
        <img src="@/images/user.png" alt="">
        <div class="fixed bottom-1 right-6 flex justify-center items-center w-10 h-10 font-serif text-xl text-yellow-800 font-semibold"
            ref="online_number">
            {{ onlineList.length }}</div>
    </div>

    <div class="flex flex-col fixed bottom-10 right-16 w-36 h-60 bg-blue-100 opacity-80 rounded-xl overflow-auto print:hidden"
        ref="onlineListElement" v-if="isShow">
        <div class="flex flex-col mt-3" v-for="user in onlineList">
            <!-- owner -->
            <div class="flex items-center w-28 h-5 mb-3 ml-2" ref="owner" v-if="user.name === docOwner.name">
                ⭐
                <div class="w-6 h-6  rounded-full">
                    <img :src="user.photoSticker" class="w-6 h-6 rounded-full object-cover" alt="">
                </div>
                <div class="ml-1 flex items-center font-serif w-16">{{ docOwner.name }}</div>
            </div>

            <!-- shared user -->
            <div class="flex items-center w-28 h-5 mb-3 ml-2" ref="shared_user" v-else>
                <div class="w-6 h-6  rounded-full">
                    <img :src="user.photoSticker" class="w-6 h-6 rounded-full object-cover" alt="">
                </div>
                <div class="ml-1 flex items-center font-serif w-20">{{ user.name }}</div>
            </div>
        </div>
    </div>
</template>


<script lang='ts' setup>
import { ref } from 'vue';

const { onlineList, docOwner } = defineProps(["onlineList", "docOwner"])
let isShow = ref(false);
</script>


<style scoped></style>