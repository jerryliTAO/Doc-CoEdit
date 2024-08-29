<template>

</template>


<script lang='ts' setup>
import router from '@/router';
import { useLoadingStore } from '@/stores/loading';
import { useMenuStore } from '@/stores/menu';
import axios from '@/utils/axios';
import { unauthenticate } from '@/utils/unauthenticate';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const API_URL = import.meta.env.VITE_APP_BASE_URL;
const userId = localStorage.getItem("userId") || '';
console.log(userId)


const createDoc = async (userId: string) => {
    useLoadingStore().isShow = true
    let result = await axios.post(API_URL + '/api/doc/createDoc/' + userId).then((res) => {
        return res.data
    }).catch((error) => {
        console.log(error);
        return {}
    })
    useLoadingStore().isShow = false
    return result
}

onMounted(async () => {

    let result = await createDoc(userId)
    // create doc success, redirect to editor
    if (result.status === "success") {
        useMenuStore().isShow = false
        router.replace({
            name: 'editor', params: {
                docId: result.data._id
            }
        })
    } else if (result.status === "token failed") {
        unauthenticate(result, t);
    } else {
        router.replace({ name: "user" })
    }
})
</script>


<style scoped></style>