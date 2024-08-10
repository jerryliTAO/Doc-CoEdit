<template>
    <div class="w-full rounded-md bg-red-100 opacity-30 bg-login bg-cover font-sans ">
        <div class="flex flex-col gap-3 md:gap-5 mt-3 my-5 mx-2 md:mx-10 md:my-10 md:text-3xl">
            <div class="font-black md:text-4xl ">{{
                $t('login') }}
            </div>
            <input type="text" class=" loginItem pl-3 bg-gray-700 opacity-80 w-36 md:w-auto"
                :placeholder="$t('email')"></input>
            <input type="password" class=" loginItem pl-3 bg-gray-700 opacity-80 w-36 md:w-auto"
                :placeholder="$t('password')"></input>
            <button class=" loginItem bg-lime-500 cursor-pointer hover:bg-lime-600">{{
                $t("login") }}</button>
            <div class=" flex justify-center items-center h-10 font-black hover:underline cursor-pointer">
                {{ $t("forgotPassword") }}</div>
            <div class="text-center ">
                <p class="">{{ $t("newDoc-CoEdit") }}</p>
                <div class="font-black hover:underline cursor-pointer ">{{ $t("sing up") }}</div>
            </div>
        </div>
    </div>
</template>


<script lang='ts' setup>

</script>


<style scoped></style>