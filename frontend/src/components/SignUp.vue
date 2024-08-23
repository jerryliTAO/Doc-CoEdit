<template>
    <div class="w-full rounded-md bg-red-100 opacity-30 bg-login bg-cover font-sans ">
        <div class="flex flex-col gap-3 md:gap-5 mt-3 my-5 mx-2 md:mx-10 md:my-10 md:text-3xl">
            <div class="font-black md:text-4xl ">{{
                $t('sign_up2') }}
            </div>
            <div class="text-red-700 font-semibold" v-show="isShow">{{ errorMsg }}</div>
            <input type="text" class=" loginItem pl-3 bg-gray-700 opacity-80 w-36 md:w-auto" :placeholder="$t('email')"
                ref="emailElement"></input>
            <input type="password" class=" loginItem pl-3 bg-gray-700 opacity-80 w-36 md:w-auto"
                :placeholder="$t('password')" ref="passwordElement"></input>
            <input type="text" class=" loginItem pl-3 bg-gray-700 opacity-80 w-36 md:w-auto" :placeholder="$t('name')"
                ref="nameElement"></input>
            <button class=" loginItem bg-lime-500 cursor-pointer hover:bg-lime-600" @click="singUp">{{
                $t("sign_up2") }}</button>
            <slot></slot>
        </div>
    </div>
</template>


<script lang='ts' setup>
import router from '@/router';
import axios from 'axios';
import { onMounted, ref } from 'vue';
const errorMsg = ref();
const emailElement = ref();
const passwordElement = ref();
const nameElement = ref();
const isShow = ref(false)



let API_URL = import.meta.env.VITE_APP_BASE_URL

const singUp = async () => {
    let email = emailElement.value.value;
    let password = passwordElement.value.value;
    let name = nameElement.value.value
    let loginResult = await axios.post(API_URL + '/api/auth/singup', { email: email, password: password, name: name }).then((res) => {
        return res.data
    }).catch((error) => {
        errorMsg.value = error.response.data.msg;
        isShow.value = true;
    })
    if (loginResult.status === "success") {
        localStorage.setItem("token", loginResult.data.token)
        localStorage.setItem("userId", loginResult.data.userId)
        console.log(localStorage.getItem("token"))
        console.log(localStorage.getItem("userId"))

        router.push('/user')
    }
}

onMounted(() => {

})

</script>


<style scoped></style>