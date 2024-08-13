<template>
    <Transition name="header">
        <nav class="fixed top-0 left-0 w-full" v-show="isActive">
            <div class="w-full h-12 flex justify-between items-center bg-gray-700" ref="container">
                <img src="../images/menu.png" class="h-10 ml-3 hover:cursor-pointer" alt="" v-if="token"
                    @click="showMenu" />
                <img src="../images/logo.png" class="h-11 ml-3" alt="" v-else />

                <div class="text-base text-center md:text-2xl font-bold" v-show="!token">{{ $t('welcome') }}</div>
                <div class="flex items-center">
                    <select class="item" @change="handleChangeLanguage" ref="language_option">
                        <option value="zh-tw">繁體中文</option>
                        <option value="en-us">English</option>
                    </select>
                    <RouterLink :to="{ path: '/' }" @click="logout">
                        <button class="item px-2 hover:bg-yellow-300 font-serif" v-show="token">
                            {{ $t('logout') }}
                        </button>
                    </RouterLink>

                </div>
            </div>
        </nav>
    </Transition>


    <!--  -->
    <div class="h-12"></div>
</template>


<script lang='ts' setup>
import { ChangeLanguage, setLanguage } from '@/hooks/useI18n';
import { useMenuStore } from '@/stores/menu';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';


let language_option = ref();
const i18n = useI18n();
let locale: string | null
let token = ref(localStorage.getItem("token"))
let container = ref()


// handle change language
let handleChangeLanguage = (e: Event) => {
    ChangeLanguage(e, i18n, locale)
}
// control menu display
let showMenu = () => {
    useMenuStore().isShow = true
}

// scroll effect
let isActive = ref(true);
let lastScrollPosition = ref(window.scrollY)
window.addEventListener('scroll', () => {
    const pageY = window.scrollY;
    //on the top
    if (pageY <= 48) {
        isActive.value = true;
    } else {
        // on scrolling
        if (lastScrollPosition.value < pageY) {
            isActive.value = false;
        } else {
            isActive.value = true;
        }
        lastScrollPosition.value = pageY
    }
})

//logout
const logout = () => {
    localStorage.clear();
}

onMounted(() => {
    console.log(token.value)
    setLanguage(i18n, locale)
    language_option.value.value = i18n.locale.value

    // setting background color
    if (token.value == null) {
        container.value.style.background = "white";
    }

})
</script>

<style scoped>
.header-enter-active,
.header-leave-active {
    transition: 0.5s ease-in-out;
}

.header-enter-from,
.header-leave-to {
    transform: translateY(-48px);
}
</style>