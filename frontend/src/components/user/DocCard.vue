<template>
    <div class="docCard">
        <div class="flex justify-end">
            <label :for="id"
                class="absolute z-auto mt-2 mr-3 p-1 bg-gray-200 rounded-lg text-center text-xs hover:cursor-pointer hover:bg-red-100">{{
                    $t('changeCover') }}</label>
            <input type="file" name="cover" :id="id" class="hidden" ref="modifiedCover">
        </div>
        <RouterLink :to="{ path: '/' }">
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
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';
const { t } = useI18n();

let modifiedCover = ref();
let displayCover = ref();
let watchImage = ref('');
defineProps(['id', 'title', 'owner', 'lastmodified', 'image'])

onMounted(() => {
    coverEventListener(modifiedCover.value, displayCover.value, watchImage);

    // monitor if modified cover
    watch(watchImage, () => {
        //調用api更新資料 *********************** ToDo

    })
})
</script>


<style scoped></style>