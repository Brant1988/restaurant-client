import { createApp } from "vue";
import { BootstrapVue3, BToastPlugin } from "bootstrap-vue-3";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { store } from "./store";

createApp(App)
  .use(BootstrapVue3)
  .use(BToastPlugin)
  .use(store)
  .use(router)
  .mount("#app");
