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
            <input type="text" name="title"
                class="ml-5 bg-gray-300 font-serif focus:outline-blue-300 focus:border-none text-2xl font-semibold"
                v-model="title" :placeholder="$t('notNull')" @focus="isTitleChangeByUser = true;">
            <div class="flex items-center" v-show="isSync">
                <img src="@/images/cloudSync.png" alt="" class="w-10 h-10">
                <div class="flex justify-center items-center ml-5 text-teal-500 font-serif font-semibold text-2xl"
                    v-show="isSaving">{{
                        $t("saving") }}
                </div>
                <div class="flex justify-center items-center ml-5 text-teal-500 font-serif font-semibold text-2xl"
                    v-show="!isSaving">{{
                        $t("saved") }}
                </div>
            </div>
        </div>

        <div class="flex items-center mr-5">
            <div class="flex items-center" ref="onlyForOwner" v-if="userId == doc.owner._id">
                <input type="text" name="addUser" id="addUser"
                    class="w-48 mr-1 rounded-md font-serif focus:outline-blue-300 focus:border-none"
                    :placeholder="$t('addUser')" ref="grantedEmailElement" @keydown.enter="grantAccess">
                <button class="mr-3 text-2xl " @click="grantAccess">✅</button>
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
    <UserList :userList="usersInfo.userList" :onlineList="usersInfo.onlineList" :docId="docId" :socket="socket">
    </UserList>
    <Delete :socket="socket" :docId="docId"></Delete>
    <LostAccess :isLostAccess="isLostAccess"></LostAccess>

</template>

<script lang="ts">
Quill.register("modules/resize", QuillResizeImage)
Quill.register("modules/cursors", QuillCursors)
</script>

<script lang='ts' setup>
import router from '@/router';
import { useDeleteStore } from '@/stores/delete';
import { useUserListStore } from '@/stores/user';
import axios from '@/utils/axios';
import { COLOR_REPOSITORY } from '@/utils/colorRepository';
import moment from 'moment';
import Quill from 'quill';
import QuillCursors from 'quill-cursors';
import QuillResizeImage from 'quill-resize-image';
import 'quill/dist/quill.snow.css';
import { io } from 'socket.io-client';
import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import Delete from './Delete.vue';
import LostAccess from './LostAccess.vue';
import OnlineList from './OnlineList.vue';
import UserList from './UserList.vue';
const COLOR_INDEX = Math.floor(Math.random() * (COLOR_REPOSITORY.length + 1))
const editor = ref();
const grantedEmailElement = ref();
const SOCKET_URL = import.meta.env.VITE_APP_SOCKET_URL;
const API_URL = import.meta.env.VITE_APP_BASE_URL;
const docId = location.pathname.split('/')[2]
const userId = localStorage.getItem("userId") || '';
const userName = ref();
let quill: Quill
let title = ref('')
let newUserName = ref('');
let leaveUserName = ref('');
let isUserIn = ref(false)
let isUserOut = ref(false)
let isSync = ref(false)
let isSaving = ref(false)
let isLostAccess = ref(false)
let isTitleChangeByUser = ref(true);
let timerElement1 = ref();
let timerElement2 = ref();
// change timer for debounce
let changeContentsTimer: number;
let changeTitleTimer: number;

// data type structure
let doc = reactive({
    _id: "",
    owner: {
        _id: "",
        email: "",
        name: ""
    },
    title: ""
});
let usersInfo = reactive<usersInfo>({
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

// ===== grant access =====
const grantAccess = () => {
    socket.emit("grant-access", {
        userId: userId,
        docId: docId,
        email: grantedEmailElement.value.value
    })
    grantedEmailElement.value.value = '';
}


// ===== check if the user have access to the document =====
let getAccessResult = async () => {
    await axios.get(API_URL + '/api/doc/' + userId + '/' + docId).then(res => {
        return res.data
    }).catch(error => {
        if (error.response.status == "404") {
            return router.replace({ name: "NotFound" })
        }
        alert(error.response.data.msg)
        router.replace('/user');
    })
}
getAccessResult();


// ===== socket =====
const socket = io(SOCKET_URL);
onMounted(() => {

    // ===== join =====
    socket.emit("join", { userId: userId, docId: docId, lastOpened: moment().format("YYYY-MM-DD HH:mm:ss") })

    // for not exist doc
    socket.on("doc-not-exist", () => {
        router.replace({ name: "NotFound" })
    })

    socket.on("join-finish", (data) => {
        Object.assign(doc, data.doc);
        Object.assign(usersInfo, data.usersInfo)
        title.value = doc.title
        userName.value = usersInfo.onlineList.find((user) => user?._id === userId)?.name
        quill.setContents(data.doc.content)
    })

    // ===== new user join and inform to every online user =====
    socket.on("new-user", (data) => {
        const { newUser, newOnlineList } = data
        newUserName.value = newUser;
        usersInfo.onlineList = newOnlineList;

        //  inform to all online user except this new user
        if (usersInfo.onlineList.find((user) => user?._id === userId)?.name !== newUser) {
            isUserIn.value = true;
            timerInterval(timerElement1.value)
            setTimeout(() => {
                isUserIn.value = false;
            }, 2000)
        }

    })

    // ===== receive grant =====
    socket.on("receive-granted", (data) => {
        if (data.status === "success") {
            usersInfo.userList = data.updateUserList
            alert("Success add a new user.")
        } else if (data.status === "failed") {
            alert("User not found or User already been shared this doc.")
        } else {
            alert(data.status)
        }
    })

    // ===== delete shared user =====
    socket.on("delete-user", (data) => {
        const { deleteId, deleteName } = data;

        Object.assign(usersInfo, data.usersInfo)
        // if user is deleted user
        if (deleteId === userId) {
            quill.disable();
            socket.disconnect();
            isLostAccess.value = true;
            return;
        }

        //
        if (data.isDeletedUserOnline) {
            leaveUserName.value = deleteName;
            isUserOut.value = true;
            timerInterval(timerElement2.value)
            setTimeout(() => {
                isUserOut.value = false;
            }, 2000)
        }
    })

    // ===== inform every online user that somebody left =====
    socket.on("user-leave", (data) => {
        const { userId, name, onlineList } = data
        usersInfo.onlineList = onlineList
        leaveUserName.value = name
        cursors.removeCursor(userId);

        isUserOut.value = true;
        timerInterval(timerElement2.value)
        setTimeout(() => {
            isUserOut.value = false;
        }, 2000)

    })



    quill = new Quill(editor.value, {
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
            cursors: {
                transformOnTextChange: true
            },
            resize: {
                locale: {},
            },
        }
    })





    // ===== content change =====
    quill.on("text-change", (delta, oldContent, source) => {
        // update by user not by api like quill.updateContents
        if (source == "user") {
            isSync.value = true;
            isSaving.value = true;
            socket.emit("send-change", { docId: docId, delta: delta })
            clearTimeout(changeContentsTimer)
            changeContentsTimer = window.setTimeout(() => {
                isSaving.value = false;
                socket.emit("save-contents", { docId: docId, contents: quill.getContents(), lastModified: moment().format("YYYY-MM-DD HH:mm:ss") });
                setTimeout(() => {
                    isSync.value = false;
                }, 2000)
            }, 2000)
        }

    })

    socket.on("receive-contents", (delta) => {
        quill.updateContents(delta);
    })



    // ===== title change =====
    watch(() => title.value, (newTitle, oldTitle) => {
        // this is the debounce function
        clearTimeout(changeTitleTimer)

        // to check the change is from user not from api. true=> from user / false => from api
        if (isTitleChangeByUser.value) {
            changeTitleTimer = window.setTimeout(() => {
                socket.emit("title-changed", {
                    docId: docId,
                    title: newTitle
                })
            }, 2000)
        }

    })


    socket.on("receive-title", (data) => {
        // to mark title is change by api
        isTitleChangeByUser.value = false;
        title.value = data;
    })

    // ===== receive delete =====
    socket.on("receive-delete-document", () => {
        if (userId == doc.owner._id) {
            useDeleteStore().isShow = false
            router.replace("/user/home")
        } else {
            isLostAccess.value = true;
            socket.disconnect();
        }
    })



    // ================== cursors related ====================
    const cursors = quill.getModule('cursors') as QuillCursors

    // ===== create cursors =====
    quill.on("selection-change", (range, oldRange, source) => {
        if (range) {
            socket.emit("user-editing", {
                userId: userId,
                userName: userName.value,
                range: range,
                color: COLOR_REPOSITORY[COLOR_INDEX],
                docId: docId
            })
        }
    })
    socket.on("receive-cursor", (cursorInfo) => {
        const { userId, userName, range, color, docId } = cursorInfo
        cursors.createCursor(userId, userName, color)
        cursors.moveCursor(userId, range)
    })








});

onBeforeUnmount(() => {
    // ===== leave the doc and disconnect the socket =====
    socket.emit('leave', { userId: userId, docId: docId }, () => {
        // make sure the leave event is sent before disconnect
        socket.disconnect();
    });

    // avoid net speed too slow to run callback
    setTimeout(() => {
        socket.disconnect();
    }, 500);

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