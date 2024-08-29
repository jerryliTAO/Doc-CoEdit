<template>
    <div v-if="useDeleteStore().isShow">
        <div class="fixed top-0 left-0 flex justify-center items-center w-lvw h-lvh bg-black opacity-40"></div>
        <div class="fixed top-0 left-0 flex justify-center items-center w-lvw h-lvh">
            <div class=" h-60 bg-gray-800 flex flex-col items-center rounded-2xl overflow-auto" ref="deleteDoc">
                <div class="flex justify-end w-full">
                    <button
                        class="flex justify-center items-center w-5 h-5 mt-2 mr-3 text-white hover:rounded-full hover:bg-gray-400"
                        @click="useDeleteStore().isShow = false">X</button>
                </div>
                <div class="flex flex-col justify-center items-center mb-7 mx-10 h-60 ">
                    <div class="flex justify-center items-center font-serif text-3xl text-red-600">⚠️{{ $t('sure')
                        }}</div>
                    <div class="flex ">
                        <button
                            class="flex justify-center items-center mt-5 mx-3 w-20 p-2 rounded-lg text-lg text-white border-2 border-white hover:bg-gray-400"
                            @click="deleteDocument(docId, socket)">
                            ✅</button>
                        <button
                            class="flex justify-center items-center mt-5 mx-3 w-20 p-2 rounded-lg text-lg text-white border-2 border-white hover:bg-gray-400"
                            @click="useDeleteStore().isShow = false">
                            ❌</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang='ts' setup>
import { useDeleteStore } from '@/stores/delete';
import type { Socket } from 'socket.io-client';
import { onMounted, ref } from 'vue';

let { socket, docId } = defineProps(["socket", "docId"])
let deleteDoc = ref();

let clickOutside = () => {
    window.addEventListener('click', (e: Event) => {
        if (deleteDoc.value) {
            if (!deleteDoc.value.contains(e.target)) {
                useDeleteStore().isShow = false;
            }
        }
    }, true)
}

// ===== delete document =====
const deleteDocument = (docId: string, socket: Socket) => {
    socket.emit("delete-document", docId)


}

onMounted(() => {
    clickOutside();
})
</script>


<style scoped></style>