import Editor from "@/components/editor/Editor.vue";
import NotFound from "@/components/error/NotFound.vue";
import HomePage from "@/components/Homepage.vue";
import User from "@/components/user/User.vue";
import UserHome from "@/components/user/UserHome.vue";
import CreateDoc from "@/views/CreateDoc.vue";
import MyDoc from "@/views/MyDoc.vue";
import MyProfile from "@/views/MyProfile.vue";

import Shared from "@/views/Shared.vue";
import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/user",
      redirect: "/user/home",
      name: "user",
      component: User,
      meta: { requireAuth: true },
      children: [
        {
          path: "home",
          name: "userHome",
          component: UserHome,
        },
        {
          path: "profile",
          name: "profile",
          component: MyProfile,
        },
        {
          path: "mydoc",
          name: "mydoc",
          component: MyDoc,
        },
        {
          path: "shared",
          name: "shared",
          component: Shared,
        },
        {
          path: "create",
          name: "create",
          component: CreateDoc,
        },
      ],
    },
    {
      path: "/editor/:docId",
      name: "editor",
      component: Editor,
      meta: { requireAuth: true },
    },

    // for not exits URL
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

// Let page at the top of itself after jumping
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  // if user don't sing in, redirect to sing in
  let token = localStorage.getItem("token");
  if (to.meta.requireAuth && !token) {
    next("/");
  } else {
    // if user sing in, continue
    next();
  }
});
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);

  // after push to new route, auto hidden menu
  // useMenuStore().isShow = false;
});

export default router;
