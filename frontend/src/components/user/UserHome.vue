<template>
    <div class="border-b-2 w-full bg-black">
        <img src="@/images/meeting.png" class="object-none  w-full h-40" alt="">
    </div>
    <div class="flex flex-col items-center sm:justify-start sm:flex-row ">
        <div class="rounded-full w-48 h-48 -mt-24  border-2 flex sm:w-32 sm:h-32 sm:ml-10 sm:-mt-8">
            <img src="@/images/background.jpg" class="w-full h-full rounded-full object-cover" alt="">
        </div>
        <div class="mt-3 font-semibold text-2xl sm:ml-8">王曉明</div>
    </div>

    <!-- recently modified -->
    <div class="flex justify-center w-full mt-10" ref="modified">
        <div class="w-4/5">
            <div>{{ $t("modify") }}</div>
            <hr class="w-20">
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


    <!-- recently opened -->
    <div class="flex justify-center w-full my-10" ref="opened">
        <div class="w-4/5">
            <div>{{ $t("open") }}</div>
            <hr class="w-20">
            <div class="grid grid-cols-G_driver gap-10 mt-5" ref="opened frame">
                <RouterLink :to="{ path: '/' }" v-for="n in 5">
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