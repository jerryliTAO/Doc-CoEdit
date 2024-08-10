<template>
    <loading v-model:active="isLoading" :is-full-page="true">
        <LoadingTemplate />
    </loading>
    <Header></Header>
    <Menu></Menu>

    <RouterView></RouterView>
</template>


<script lang='ts' setup>
import { onMounted, ref } from 'vue';
import Loading from 'vue-loading-overlay';
import { RouterView } from 'vue-router';
import Header from '../Header.vue';
import LoadingTemplate from '../LoadingTemplate.vue';
import Menu from './Menu.vue';


//mock token
localStorage.setItem('token', 'true');
// localStorage.clear();

let isLoading = ref(false)
onMounted(() => {
    isLoading.value = true;
    setTimeout(() => {
        isLoading.value = false
    }, 2000)
})
</script>


<style scoped></style>