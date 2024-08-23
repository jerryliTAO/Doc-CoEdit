<template>
    <div class="flex justify-center w-full my-10" ref="modified">
        <div class="w-4/5">
            <div class="font-semibold text-3xl">{{ $t("shared") }}</div>
            <hr class="w-52">
            <div class="grid grid-cols-G_driver gap-10 mt-5" ref="modified frame">
                <DocCard v-for="doc in myShared" :id="doc._id" :title="doc.title" :owner="doc.owner.name"
                    :lastmodified="doc.lastmodified" :image="doc.cover">
                    <div class="text-xs">{{ $t('lastModified') }}：{{ doc.lastmodified }}</div>
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

//this is for testing
let mockData = reactive([
    { id: '123', title: '1', owner: 'jerry', lastmodified: '123-1561', image: '/src/images/background.jpg' },
    { id: '456', title: '2', owner: 'jey', lastmodified: '123-1561', image: '/src/images/background.jpg' },
    { id: '789', title: '3', owner: 'rry', lastmodified: '123-1561', image: '/src/images/background.jpg' },
    { id: '1011', title: '4', owner: 'jry', lastmodified: '123-1561', image: '/src/images/background.jpg' },
    { id: '1012', title: '5', owner: 'jerry444', lastmodified: '123-1561', image: '/src/images/background.jpg' },
])





const API_URL = import.meta.env.VITE_APP_BASE_URL;
let userId = localStorage.getItem("userId") || ''
let myShared: Array<doc> = reactive([])

const getMyShared = async (userId: string) => {
    useLoadingStore().isShow = true
    let result = await axios.get(API_URL + "/api/doc/myShared/" + userId).then((res) => {
        return res.data
    }).catch(error => {
        console.log(error)
        return {}
    })
    useLoadingStore().isShow = false
    return result
}



onMounted(async () => {
    let result = await getMyShared(userId)
    if (result.status === "success") {
        Object.assign(myShared, result.data)
    } else {
        alert(result.msg)
    }
})
</script>


<style scoped></style>