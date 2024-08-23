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
