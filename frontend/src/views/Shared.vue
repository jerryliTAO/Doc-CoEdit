<template>
    <div class="flex justify-center w-full mt-10" ref="modified">
        <div class="w-4/5">
            <div class="font-semibold text-3xl">{{ $t("shared") }}</div>
            <hr class="w-52">
            <div class="grid grid-cols-G_driver gap-10 mt-5" ref="modified frame">
                <RouterLink :to="{ path: '/' }" v-for="n in 5">
                    <div class="docCard">
                        <div class="w-full h-48 p-2">
                            <img src="@/images/meeting.png" class="w-full h-full object-cover" alt="">
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