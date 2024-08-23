<template>
    <div class="w-full rounded-md bg-red-100 opacity-30 bg-login bg-cover font-sans ">
        <div class="flex flex-col gap-3 md:gap-5 mt-3 my-5 mx-2 md:mx-10 md:my-10 md:text-3xl">
            <div class="font-black md:text-4xl ">{{
                $t('login') }}
            </div>
            <div class="text-red-700 font-semibold" v-show="isShow">{{ errorMsg }}</div>
            <input type="text" class=" loginItem pl-3 bg-gray-700 opacity-80 w-36 md:w-auto" :placeholder="$t('email')"
                ref="emailElement" @keydown.enter="login" value="test123@gmail.com"></input>
            <input type="password" class=" loginItem pl-3 bg-gray-700 opacity-80 w-36 md:w-auto"
                :placeholder="$t('password')" ref="passwordElement" @keydown.enter="login" value="zxc123"></input>
            <button class=" loginItem bg-lime-500 cursor-pointer hover:bg-lime-600" @click="login">{{
                $t("login") }}</button>
            <slot></slot>
        </div>
    </div>
</template>


<script lang='ts' setup>
import router from '@/router';
import axios from 'axios';
import { ref } from 'vue';

let errorMsg = ref('')
let isShow = ref(false)
let emailElement = ref();
let passwordElement = ref();
let API_URL = import.meta.env.VITE_APP_BASE_URL

const login = async () => {
    let email = emailElement.value.value;
    let password = passwordElement.value.value;
    let loginResult = await axios.post(API_URL + '/api/auth/singin', { email: email, password: password }).then((res) => {
        return res.data
    }).catch((error) => {
        errorMsg.value = error.response.data.msg;
        isShow.value = true;
    })
    if (loginResult.status === "success") {
        localStorage.setItem("token", loginResult.data.token)
        localStorage.setItem("userId", loginResult.data.userId)

        router.push('/user')
    }
}


</script>


<style scoped></style>