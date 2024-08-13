<template>
    <div class="flex justify-center w-full my-10" ref="opened">
        <div class="w-4/5">
            <div class="font-semibold text-3xl">{{ $t("mydoc") }}</div>
            <hr class="w-32">
            <div class="grid grid-cols-G_driver gap-10 mt-5" ref="opened frame">
                <DocCard v-for="doc in mockData" :id="doc.id" :title="doc.title" :owner="doc.owner"
                    :lastmodified="doc.lastmodified" :image="doc.image">
                </DocCard>
            </div>
        </div>
    </div>
</template>


<script lang='ts' setup>
import DocCard from '@/components/user/DocCard.vue';
import { reactive } from 'vue';
let mockData = reactive([
    { id: '123', title: '1', owner: 'jerry', lastmodified: '123-1561', image: '/src/images/meeting.png' },
    { id: '456', title: '2', owner: 'jey', lastmodified: '123-1561', image: '/src/images/meeting.png' },
    { id: '789', title: '3', owner: 'rry', lastmodified: '123-1561', image: '/src/images/meeting.png' },
    { id: '1011', title: '4', owner: 'jry', lastmodified: '123-1561', image: '/src/images/meeting.png' },
    { id: '1012', title: '5', owner: 'jerry444', lastmodified: '123-1561', image: '/src/images/meeting.png' },
])

</script>


<style scoped></style>