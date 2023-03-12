import Vue from "vue";
import VueRouter from "vue-router";
import ExpensesView from "../views/ExpensesView.vue";
import { ROUTER } from "./links";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "expenses",
      component: ExpensesView,
      // meta: { authorize: [] }, // @TODO: implement later
    },
    {
      path: ROUTER.login,
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: ROUTER.settings,
      name: "settings",
      component: () => import("../views/settings/SettingsView.vue"),
    },
    {
      path: ROUTER.funds,
      name: "funds",
      component: () => import("../views/settings/FundsView.vue"),
    },
    {
      path: ROUTER.singleFund,
      name: "fund",
      component: () => import("../views/settings/SingleFundView.vue"),
    },

    { path: "*", redirect: "/" },
  ],
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize } = to.meta;
  // const currentUser = authenticationService.currentUserValue;
  const currentUser = null; // @TODO: implement later

  if (authorize) {
    if (!currentUser) {
      // not logged in so redirect to login page with the return url
      return next({ path: "/login", query: { returnUrl: to.path } });
    }

    // check if route is restricted by role
    if (authorize.length && !authorize.includes(currentUser.role)) {
      // role not authorized so redirect to home page
      return next({ path: "/" });
    }
  }

  next();
});

export default router;
