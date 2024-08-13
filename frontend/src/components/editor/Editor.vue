<template>

    <!-- top background  -->
    <div
        class="flex justify-between items-center h-12 w-900 tablet:w-full bg-gray-300 border-b-2 border-gray-200 print:hidden">
        <div class="flex items-center">
            <div class="flex justify-center items-center w-10 h-10 ml-5">
                <RouterLink :to="{ path: '/user' }">
                    <img src="@/images/logo.png" alt="" class="hover:cursor-pointer">
                </RouterLink>
            </div>
            <input type="text" name="title" ref="title"
                class="ml-5 bg-gray-300 font-serif focus:outline-blue-300 focus:border-none text-2xl font-semibold"
                v-model="docTitle">
        </div>

        <div class="flex items-center mr-5">
            <input type="text" name="addUser" id="addUser"
                class="w-48 mr-1 rounded-md font-serif focus:outline-blue-300 focus:border-none"
                :placeholder="$t('addUser')">
            <button class="mr-3 text-2xl ">✅</button>
            <button class="mr-3 w-8 h-8">
                <img src="@/images/userList.png" alt="" class="w-full h-full object:fill"
                    @click="useUserListStore().isShow = true">
            </button>
            <button class="mr-3 w-8 h-8">
                <img src="@/images/delete.png" alt="" class="w-full h-full object:fill"
                    @click="useDeleteStore().isShow = true">
            </button>
            <button class="mr-3 w-8 h-8" @click="exportPDF">
                <img src="@/images/pdf1.png" alt="" class="w-full h-full object:fill">
            </button>
        </div>
    </div>

    <!--editor -->
    <div>
        <div id="editor" ref="editor"></div>
    </div>
    <OnlineList></OnlineList>
    <UserList></UserList>
    <Delete></Delete>
    <LostAccess></LostAccess>

</template>


<script lang='ts' setup>
import { useDeleteStore } from '@/stores/delete';
import { useUserListStore } from '@/stores/user';
import Quill from 'quill';
import QuillResizeImage from 'quill-resize-image';
import 'quill/dist/quill.snow.css';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import Delete from './Delete.vue';
import LostAccess from './LostAccess.vue';
import OnlineList from './OnlineList.vue';
import UserList from './UserList.vue';
const editor = ref();
let docTitle = ref('檔案名稱');

let exportPDF = () => {
    window.print();
}

onMounted(() => {
    Quill.register("modules/resize", QuillResizeImage)
    const quill = new Quill(editor.value, {
        theme: 'snow',
        modules: {
            toolbar: [
                // 工具列列表[註1]
                [{ font: [] }],
                [{ size: ['small', false, 'large', 'huge'] }],
                [{ align: [] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ list: 'ordered' }, { list: 'bullet' }, { 'list': 'check' }],
                ['blockquote', 'code-block'],
                [{ script: 'sub' }, { script: 'super' }],
                [{ indent: '-1' }, { indent: '+1' }],
                [{ color: [] }, { background: [] }],
                ['link', 'image'],
                ['clean']
            ],
            resize: {
                locale: {},
            },
        }
    })
})




</script>


<style scoped></style>