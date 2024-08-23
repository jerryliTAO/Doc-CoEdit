<template>
    <div class="border-b-2 w-full bg-black">
        <img :src="userAllInfo.cover" class="object-cover  w-full h-40" alt="">
    </div>
    <div class="flex flex-col items-center sm:justify-start sm:flex-row ">
        <div class="rounded-full w-48 h-48 -mt-24  border-2 flex sm:w-32 sm:h-32 sm:ml-10 sm:-mt-8">
            <img :src="userAllInfo.photoSticker" class="w-full h-full rounded-full object-cover" alt=""
                ref="photoSticker">
        </div>
        <div class="mt-3 font-semibold text-2xl sm:ml-8">{{ userAllInfo.name }}</div>
    </div>

    <!-- recently modified -->
    <div class="flex justify-center w-full mt-10" ref="modified">
        <div class="w-4/5">
            <div>{{ $t("modify") }}</div>
            <hr class="w-20">
            <div class="grid grid-cols-G_driver gap-10 mt-5" ref="modified frame">
                <DocCard v-for="doc in userAllInfo.shared" :id="doc._id" :title="doc.title" :owner="doc.owner.name"
                    :lastmodified="doc.lastmodified" :image="doc.cover" :key="doc._id">
                    <div class="text-xs">{{ $t('lastModified') }}：{{ doc.lastmodified }}</div>
                </DocCard>
            </div>
        </div>
    </div>


    <!-- recently opened -->
    <div class="flex justify-center w-full my-10" ref="opened">
        <div class="w-4/5">
            <div>{{ $t("open") }}</div>
            <hr class="w-20">
            <div class="grid grid-cols-G_driver gap-10 mt-5" ref="opened frame">
                <DocCard v-for="doc in mockDataOpened" :id="doc.id" :title="doc.title" :owner="doc.owner"
                    :lastmodified="doc.lastmodified" :image="doc.image">
                    <div class="text-xs">{{ $t('lastOpened') }}：{{ doc.lastmodified }}</div>
                </DocCard>
            </div>
        </div>
    </div>
</template>


<script lang='ts' setup>
import DocCard from '@/components/user/DocCard.vue';
import { useLoadingStore } from '@/stores/loading';
import axios from 'axios';
import { onMounted, reactive } from 'vue';

const API_URL = import.meta.env.VITE_APP_BASE_URL;
let userId = localStorage.getItem("userId") || ''
let userAllInfo: userAllInfo = reactive({})

const getUserAllInfo = async (userId: string) => {
    useLoadingStore().isShow = true
    let result = await axios.get(API_URL + "/api/user/" + userId).then((res) => {
        return res.data
    }).catch(error => {
        console.log(error)
        return {}
    })
    useLoadingStore().isShow = false
    return result
}



onMounted(async () => {
    let result = await getUserAllInfo(userId)
    if (result.status === "success") {
        Object.assign(userAllInfo, result.data)
    } else {
        alert(result.msg)
    }


})






//this is for testing
let mockDataModified = reactive([
    { id: '123', title: '1', owner: 'jerry', lastmodified: '123-1561', image: '/src/images/background.jpg' },
    { id: '456', title: '2', owner: 'jey', lastmodified: '123-1561', image: '/src/images/background.jpg' },
    { id: '789', title: '3', owner: 'rry', lastmodified: '123-1561', image: '/src/images/background.jpg' },
    { id: '1011', title: '4', owner: 'jry', lastmodified: '123-1561', image: '/src/images/background.jpg' },
    { id: '1012', title: '5', owner: 'jerry444', lastmodified: '123-1561', image: '/src/images/background.jpg' },
])
let mockDataOpened = reactive([
    { id: '987', title: '1', owner: 'jerry', lastmodified: '123-1561', image: '/src/images/meeting.png' },
    { id: '654', title: '2', owner: 'jey', lastmodified: '123-1561', image: '/src/images/meeting.png' },
    { id: '321', title: '3', owner: 'rry', lastmodified: '123-1561', image: '/src/images/meeting.png' },
    { id: '321654', title: '4', owner: 'jry', lastmodified: '123-1561', image: '/src/images/meeting.png' },
    { id: '987456312', title: '5', owner: 'jerry444', lastmodified: '123-1561', image: '/src/images/meeting.png' },
    { id: '4521', title: '5', owner: 'jerry444', lastmodified: '123-1561', image: '/src/images/meeting.png' },
    { id: '3254234', title: '5', owner: 'jerry444', lastmodified: '123-1561', image: '/src/images/meeting.png' },
    { id: '45245342', title: '5', owner: 'jerry444', lastmodified: '123-1561', image: '/src/images/meeting.png' },
    { id: '452148345584', title: '5', owner: 'jerry444', lastmodified: '123-1561', image: '/src/images/meeting.png' },
])
</script>


<style scoped></style>