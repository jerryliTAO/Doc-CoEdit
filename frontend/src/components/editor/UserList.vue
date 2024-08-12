<template>
    <div v-if="useUserListStore().isShow">
        <div class="fixed top-0 left-0 flex justify-center items-center w-lvw h-lvh bg-black opacity-40"></div>
        <div class="fixed top-0 left-0 flex justify-center items-center w-lvw h-lvh">
            <div class="w-96 h-60 bg-yellow-200 flex flex-col items-center rounded-2xl overflow-auto" ref="userList">
                <div class="flex justify-end w-full">
                    <button
                        class="flex justify-center items-center w-5 h-5 mt-2 mr-3 hover:rounded-full hover:bg-gray-400"
                        @click="useUserListStore().isShow = false">X</button>
                </div>
                <div class="flex justify-center items-center mb-7 w-80 h-60 font-serif text-xl" ref="withoutSharedUser"
                    v-show="hasSharedUser">
                    🔔{{ $t('userList2') }}
                </div>

                <div class="flex flex-col justify-center items-center" ref="withSharedUser" v-show="!hasSharedUser">
                    <div class="flex items-center mb-2">
                        <div class="flex justify-center items-center w-10 h-10">
                            <img src="@/images/userList.png" alt="" class="w-full h-full object-cover">
                        </div>
                        <div class="ml-3">{{ $t('userList1') }}</div>
                    </div>

                    <!-- with user list -->
                    <div class="flex justify-between w-80 ">
                        <div class="border-b-2 mb-2 border-gray-500 flex-auto overflow-auto truncate">
                            thisistestemail@gmail.com</div>
                        <button class="w-5 h-5 ml-3">❌</button>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>


<script lang='ts' setup>
import { useUserListStore } from '@/stores/user';
import { onMounted, ref } from 'vue';
let userList = ref()
let hasSharedUser = ref(false)

let clickOutside = () => {
    window.addEventListener('click', (e: Event) => {
        if (userList.value) {
            if (!userList.value.contains(e.target)) {
                useUserListStore().isShow = false;
            }
        }
    }, true)
}

onMounted(() => {
    clickOutside();
})

</script>


<style scoped></style>