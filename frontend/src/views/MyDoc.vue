<template>
    <div class="flex justify-center w-full my-10" ref="opened">
        <div class="w-4/5">
            <div class="font-semibold text-3xl">{{ $t("mydoc") }}</div>
            <hr class="w-32">
            <div class="grid grid-cols-G_driver gap-10 mt-5" ref="opened frame">
                <DocCard v-for="doc in myDoc" :id="doc._id" :title="doc.title" :owner="doc.owner.name"
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

let mockData = reactive([
    { id: '123', title: '1', owner: 'jerry', lastmodified: '123-1561', image: '/src/images/meeting.png' },
    { id: '456', title: '2', owner: 'jey', lastmodified: '123-1561', image: '/src/images/meeting.png' },
    { id: '789', title: '3', owner: 'rry', lastmodified: '123-1561', image: '/src/images/meeting.png' },
    { id: '1011', title: '4', owner: 'jry', lastmodified: '123-1561', image: '/src/images/meeting.png' },
    { id: '1012', title: '5', owner: 'jerry444', lastmodified: '123-1561', image: '/src/images/meeting.png' },
])

const API_URL = import.meta.env.VITE_APP_BASE_URL;
let userId = localStorage.getItem("userId") || ''
let myDoc: Array<doc> = reactive([])

const getMyDoc = async (userId: string) => {
    useLoadingStore().isShow = true
    let result = await axios.get(API_URL + "/api/doc/myDoc/" + userId).then((res) => {
        return res.data
    }).catch(error => {
        console.log(error)
        return {}
    })
    return result
}



onMounted(async () => {
    let result = await getMyDoc(userId)
    if (result.status === "success") {
        Object.assign(myDoc, result.data)
    } else {
        alert(result.msg)
    }
    setTimeout(() => {
        useLoadingStore().isShow = false
    }, 500)

})
</script>


<style scoped></style>