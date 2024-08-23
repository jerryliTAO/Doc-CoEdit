<template>

</template>


<script lang='ts' setup>
import router from '@/router';
import axios from 'axios';
import { onMounted } from 'vue';

const API_URL = import.meta.env.VITE_APP_BASE_URL;
const userId = localStorage.getItem("userId");
console.log(userId)

onMounted(async () => {
    let result = await axios.post(API_URL + '/api/doc/createDoc/' + userId).then((res) => {
        return res.data
    }).catch((error) => {
        console.log(error);
        return {}
    })
    if (result.status === "success") {
        router.replace({
            name: 'editor', params: {
                docId: result.data._id
            }
        })
    } else {
        router.replace({ name: "user" })
    }
})
</script>


<style scoped></style>