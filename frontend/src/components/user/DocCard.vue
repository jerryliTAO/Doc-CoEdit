<template>
    <div class="docCard">
        <div class="flex justify-start">
            <label :for="id"
                class="absolute z-auto mt-2 ml-2 p-1 bg-gray-200 rounded-lg text-center text-xs hover:cursor-pointer hover:bg-red-100 opacity-20 hover:opacity-100 ">{{
                    $t('changeCover') }}</label>
            <input type="file" name="cover" :id="id" class="hidden" ref="modifiedCover">
        </div>
        <RouterLink :to="{
            name: 'editor', params: {
                docId: id
            }
        }">
            <div class="w-full h-48 p-2">
                <img :src="image" class="w-full h-full object-cover" alt="" ref="displayCover">
            </div>
            <div class="pl-2">
                <div class="text-xs">{{ $t('title') }}：{{ title }}</div>
                <div class="text-xs">{{ $t('owner') }}：{{ owner }}</div>
                <slot></slot>
            </div>
        </RouterLink>
    </div>
</template>


<script lang='ts' setup>
import { coverEventListener } from '@/hooks/useChangeCover';
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';

const { t } = useI18n();
const API_URL = import.meta.env.VITE_APP_BASE_URL
let modifiedCover = ref();
let displayCover = ref();
let watchImage = ref('');
const props = defineProps(['id', 'title', 'owner', 'lastmodified', 'image'])

onMounted(() => {
    coverEventListener(modifiedCover.value, displayCover.value, watchImage);
    // monitor if modified cover
    watch(watchImage, async (newValue) => {
        //to update the cover data into DB
        let result = await axios.patch(API_URL + "/api/doc/updateCover", { docId: props.id, cover: newValue }).then((res) => {
            return res.data
        }).catch((error) => {
            alert(error.response.data.msg)
            return {}
        })


    })
})
</script>


<style scoped></style>