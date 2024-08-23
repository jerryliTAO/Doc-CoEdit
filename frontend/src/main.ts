import "./index.css";
import { i18n } from "./plugins/i18n";

import { createPinia } from "pinia";
import { createApp } from "vue";

import "vue-loading-overlay/dist/css/index.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(i18n);
app.use(createPinia());
app.use(router);

app.mount("#app");

// Let page at the top of itself after jumping
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});
