<template>
    <Header />
    <div class="w-full flex flex-col items-center mt-5" ref="container">
        <div class="w-10/12 mb-10 flex justify-center items-center" ref="describeItem">
            <div class="flex flex-col items-center m-3">
                <div class="describeText py-10">{{ $t('slogan') }}</div>
                <img src="../images/meeting.png" class="w-full ">
            </div>

            <!-- login / sing up -->
            <div class=" flex flex-col items-center m-3">
                <Login v-show="isShow">
                    <div class="text-center mt-10">
                        <p class="">{{ $t("newDoc-CoEdit") }}</p>
                        <div class="font-black hover:underline cursor-pointer" @click="isShow = !isShow">{{
                            $t("sing_up1") }}</div>
                    </div>
                </Login>
                <SignUp v-show="!isShow">
                    <div class="text-center">
                        <div class="font-black hover:underline cursor-pointer " @click="isShow = !isShow">{{
                            $t("backToLogin") }}</div>
                    </div>
                </SignUp>
            </div>
        </div>


        <!-- team -->
        <div class="w-10/12 mb-10 flex justify-evenly items-center" ref="describeItem">
            <div class="flex flex-col items-center m-3">
                <div class="describeText py-10">{{ $t('team1') }}</div>
                <img src="../images/co-editing.png" class="w-full">
            </div>

            <div class=" flex flex-col items-center m-3">
                <img src="../images/cursor.png" class="w-full">
                <div class="describeText pb-10">{{ $t('team2') }}</div>
            </div>
        </div>

        <!-- Privacy -->
        <div class="w-10/12 mb-10 flex justify-evenly items-center" ref="describeItem">
            <div class="flex flex-col items-center m-3">
                <div class="describeText py-10">{{ $t('privacy1') }}</div>
                <img src="../images/security.png" class="w-full">
            </div>

            <div class=" flex flex-col items-center m-3">
                <img src="../images/securePrivacy.gif" class="w-full">
                <div class="describeText pb-10">{{ $t('privacy2') }}</div>
            </div>
        </div>

        <!-- mobile -->
        <div class="w-10/12 mb-10 flex justify-evenly items-center" ref="describeItem">
            <div class="flex flex-col items-center m-3">
                <div class="describeText py-10">{{ $t('mobile1') }}</div>
                <img src="../images/mobileDevice.png" class="w-full">
            </div>

            <div class=" flex flex-col items-center m-3">
                <img src="../images/mobileDeviceActual.png" class="w-full">
                <div class="describeText pb-10">{{ $t('mobile2') }}</div>
            </div>
        </div>

        <!-- pdf -->
        <div class="w-10/12 mb-10 flex justify-evenly items-center" ref="describeItem">
            <div class="flex flex-col items-center m-3">
                <div class="describeText py-10">{{ $t('export1') }}</div>
                <img src="../images/export.png" class="w-full">
            </div>

            <div class=" flex flex-col items-center m-3">
                <img src="../images/exportPDF.png" class="w-full">
                <div class="describeText pb-10">{{ $t('export2') }}</div>
            </div>
        </div>
    </div>



    <footer class="w-full h-20 flex justify-center items-center bg-gray-200">
        <div class="text-20 font-serif text-center">COPYRIGHT © 2024 Jerry Li</div>
    </footer>
</template>


<script lang='ts' setup>
import router from '@/router';
import { ref } from 'vue';
import Header from './Header.vue';
import Login from './Login.vue';
import SignUp from './SignUp.vue';

let isShow = ref(true)

// if user already login, redirect to /user
let token = localStorage.getItem("token");
if (token !== null) {
    router.push('/user')
}
</script>


<style scoped></style>