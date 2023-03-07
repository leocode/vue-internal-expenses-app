import Vue from "vue";
import { createPinia, PiniaVuePlugin } from "pinia";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

// Add pinia support
Vue.use(PiniaVuePlugin);
const pinia = createPinia();

// Add font awesome icons
library.add(faPen, faTrash);
Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  router,
  render: (h) => h(App),
  pinia,
}).$mount("#app");
