import Vue from "vue";
import { createPinia, PiniaVuePlugin } from "pinia";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPen,
  faTrash,
  faEllipsisVertical,
  faGear,
  faSackDollar,
  faTag,
  faHome,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

// Add pinia support
Vue.use(PiniaVuePlugin);
const pinia = createPinia();

// Add font awesome icons
library.add(
  faPen,
  faTrash,
  faEllipsisVertical,
  faGear,
  faSackDollar,
  faTag,
  faHome,
  faArrowRight
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.directive("click-outside", {
  bind: (el, binding, vnode) => {
    // assign event to the element
    el.clickOutsideEvent = function (event) {
      // here we check if the click event is outside the element and it's children
      if (!(el == event.target || el.contains(event.target))) {
        // if clicked outside, call the provided method
        vnode.context[binding.expression](event);
      }
    };
    // register click and touch events
    document.body.addEventListener("click", el.clickOutsideEvent);
    document.body.addEventListener("touchstart", el.clickOutsideEvent);
  },
  unbind: function (el) {
    // unregister click and touch events before the element is unmounted
    document.body.removeEventListener("click", el.clickOutsideEvent);
    document.body.removeEventListener("touchstart", el.clickOutsideEvent);
  },
  stopProp(event) {
    event.stopPropagation();
  },
});

new Vue({
  router,
  render: (h) => h(App),
  pinia,
}).$mount("#app");
