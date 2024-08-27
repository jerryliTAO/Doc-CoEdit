<template>
    <Transition name="slide">
        <div class="fixed top-5 left-2/5 flex flex-col justify-center items-center font-serif font-semibold bg-blue-300 rounded-md p-2 text-white"
            v-show="isUserIn">
            {{ newUserName }} {{
                $t("join") }}
            <div class="flex justify-start items-center w-full">
                <div class="flex bg-yellow-100 h-1" ref="timerElement1"></div>
            </div>
        </div>
    </Transition>

    <Transition name="slide">
        <div class="fixed top-5 left-2/5 flex flex-col justify-center items-center font-serif font-semibold bg-red-300 rounded-md p-2 text-white"
            v-show="isUserOut">
            {{ leaveUserName }} {{ $t("leave") }}
            <div class="flex justify-start items-center w-full">
                <div class="flex bg-yellow-100 h-1" ref="timerElement2"></div>
            </div>
        </div>

    </Transition>


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
                :value="doc.title">
        </div>

        <div class="flex items-center mr-5">
            <div class="flex items-center" ref="onlyForOwner" v-if="userId == doc.owner._id">
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
            </div>
            <button class="mr-3 w-8 h-8" @click="exportPDF">
                <img src="@/images/pdf1.png" alt="" class="w-full h-full object:fill">
            </button>
        </div>
    </div>

    <!--editor -->
    <div>
        <div id="editor" ref="editor"></div>
    </div>
    <OnlineList :onlineList="usersInfo.onlineList" :docOwner="doc.owner"></OnlineList>
    <UserList :userList="usersInfo.userList"></UserList>
    <Delete></Delete>
    <LostAccess></LostAccess>

</template>

<script lang="ts">
Quill.register("modules/resize", QuillResizeImage)
</script>

<script lang='ts' setup>
import router from '@/router';
import { useDeleteStore } from '@/stores/delete';
import { useUserListStore } from '@/stores/user';
import Quill from 'quill';
import QuillResizeImage from 'quill-resize-image';
import 'quill/dist/quill.snow.css';
import { io } from 'socket.io-client';
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { RouterLink } from 'vue-router';
import Delete from './Delete.vue';
import LostAccess from './LostAccess.vue';
import OnlineList from './OnlineList.vue';
import UserList from './UserList.vue';
const editor = ref();
const SOCKET_URL = import.meta.env.VITE_APP_SOCKET_URL;
const docId = location.pathname.split('/')[2]
const userId = localStorage.getItem("userId");
let newUserName = ref('');
let leaveUserName = ref('');
let isUserIn = ref(false)
let isUserOut = ref(false)
let timerElement1 = ref();
let timerElement2 = ref();

let doc = reactive({
    _id: "",
    owner: {
        _id: "",
        email: "",
        name: ""
    },
    title: ""
});
let usersInfo = reactive({
    onlineList: [],
    userList: []
});

let exportPDF = () => {
    window.print();
}

const timerInterval = (element: HTMLElement) => {
    // 2 second
    const duration = 2000;
    // update interval
    const interval = 10;
    //update times
    const steps = duration / interval;
    let currentStep = 0;

    function updateProgressBar() {
        // calculate remain percent
        const percentage = (1 - (currentStep / steps)) * 100;
        element.style.width = `${percentage}%`;
        currentStep++;

        if (currentStep > steps) {
            clearInterval(timer);
        }
    }

    //set timer
    const timer = setInterval(updateProgressBar, interval);
};

const socket = io(SOCKET_URL);
onMounted(async () => {


    socket.emit("join", { userId: userId, docId: docId })

    // for not exist doc
    socket.on("doc-not-exist", () => {
        router.replace({ name: "NotFound" })
    })

    socket.on("join-finish", (data) => {
        Object.assign(doc, data.doc);
        Object.assign(usersInfo, data.usersInfo)
    })

    socket.on("new-user", (data) => {
        const { newUser, newOnlineList } = data
        newUserName.value = newUser;
        usersInfo.onlineList = newOnlineList;

        if (newUser == "") {

        }
        isUserIn.value = true;
        timerInterval(timerElement1.value)
        setTimeout(() => {
            isUserIn.value = false;
        }, 2000)
    })

    socket.on("user-leave", (data) => {
        const { name, onlineList } = data
        usersInfo.onlineList = onlineList
        leaveUserName.value = name

        isUserOut.value = true;
        timerInterval(timerElement2.value)
        setTimeout(() => {
            isUserOut.value = false;
        }, 2000)

    })

    // console.log(usersInfo.userList)




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
});

onBeforeUnmount(() => {

    // leave the doc and disconnect the socket
    socket.emit('leave', { userId: userId, docId: docId });
    socket.disconnect();
})

</script>


<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: 0.8s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateY(-100%);
}
</style>