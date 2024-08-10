<template>
    <div class="flex justify-center w-full my-10" ref="opened">
        <div class="w-4/5">
            <div class="font-semibold text-3xl">{{ $t("mydoc") }}</div>
            <hr class="w-32">
            <div class="grid grid-cols-G_driver gap-10 mt-5" ref="opened frame">
                <RouterLink :to="{ path: '/' }" v-for="n in 8">
                    <div class="docCard">
                        <div class="w-full h-48 p-2">
                            <img src="@/images/background.jpg" class="w-full h-full object-cover" alt="">
                        </div>
                        <div class="pl-2">
                            <div class="text-xs">標　題:</div>
                            <div class="text-xs">擁有者:</div>
                            <div class="text-xs">最後修改:</div>
                        </div>
                    </div>
                </RouterLink>
            </div>
        </div>
    </div>
</template>


<script lang='ts' setup>
import { RouterLink } from 'vue-router';


</script>


<style scoped></style>