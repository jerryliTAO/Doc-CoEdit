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
      path: "/editor",
      name: "editor",
      component: Editor,
    },

    // for not exits URL
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

export default router;
