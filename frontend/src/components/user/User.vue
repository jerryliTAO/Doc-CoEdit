<template>
    <loading v-model:active="useLoadingStore().isShow" :is-full-page="true">
        <LoadingTemplate />
    </loading>
    <Header></Header>
    <Menu class="z-10"></Menu>

    <RouterView></RouterView>
</template>


<script lang='ts' setup>
import { useLoadingStore } from '@/stores/loading';
import { onMounted } from 'vue';
import Loading from 'vue-loading-overlay';
import { RouterView } from 'vue-router';
import Header from '../Header.vue';
import LoadingTemplate from '../LoadingTemplate.vue';
import Menu from './Menu.vue';


onMounted(() => {

})
</script>


<style scoped></style>