<template>
    <div v-if="useUserListStore().isShow">
        <div class="fixed top-0 left-0 flex justify-center items-center w-lvw h-lvh bg-black opacity-40"></div>
        <div class="fixed top-0 left-0 flex justify-center items-center w-lvw h-lvh">
            <div class="w-96 h-60 bg-white flex flex-col items-center rounded-2xl overflow-auto" ref="userListElement">
                <div class="flex justify-end w-full">
                    <button
                        class="flex justify-center items-center w-5 h-5 mt-2 mr-3 hover:rounded-full hover:bg-gray-400"
                        @click="useUserListStore().isShow = false">X</button>
                </div>
                <div class="flex justify-center items-center mb-7 w-80 h-60 font-serif text-xl" ref="withoutSharedUser"
                    v-show="userList.length === 0">
                    🔔{{ $t('userList2') }}
                </div>

                <div class="flex flex-col justify-center items-center" ref="withSharedUser"
                    v-show="userList.length !== 0">
                    <div class="flex items-center mb-2">
                        <div class="flex justify-center items-center w-10 h-10">
                            <img src="@/images/userList.png" alt="" class="w-full h-full object-cover">
                        </div>
                        <div class="ml-3 font-serif font-semibold">{{ $t('userList1') }}</div>
                    </div>

                    <!-- with user list -->
                    <div class="flex justify-between w-80" v-for="user in userList">
                        <div class="border-b-2 mb-2 border-gray-500 flex-auto overflow-auto truncate">
                            {{ user.email }}</div>
                        <button class="w-5 h-5 ml-3" @click="deleteUser(user._id)">❌</button>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>


<script lang='ts' setup>
import { useUserListStore } from '@/stores/user';
import { onMounted, ref } from 'vue';
const { userList, docId, socket } = defineProps(["userList", "docId", "socket"])
let userListElement = ref()


let clickOutside = () => {
    window.addEventListener('click', (e: Event) => {
        if (userListElement.value) {
            if (!userListElement.value.contains(e.target)) {
                useUserListStore().isShow = false;
            }
        }
    }, true)
}

let deleteUser = (userId: string) => {
    const data = {
        userId: userId,
        docId: docId
    }
    socket.emit("delete-user", data)
}

onMounted(async () => {
    clickOutside();
})

</script>


<style scoped></style>