import VueRouter from "vue-router";
import { useUserStore } from "@/stores/useUserStore";
import { ROUTER } from "./links";

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "expenses",
      component: () => import("../views/expenses/ExpensesView.vue"),
      // meta: { authorize: [] }, // @TODO: implement later
    },
    {
      path: ROUTER.login,
      name: "login",
      component: () => import("../views/auth/LoginView.vue"),
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
  const userStore = useUserStore();

  if (!userStore.user) {
    if (to.name !== "login") {
      // not logged in so redirect to login page with the return url
      return next({ path: ROUTER.login, query: { returnUrl: to.path } });
    } else {
      return next();
    }
  }

  // check if route is restricted by role
  if (authorize?.length && !authorize.includes(userStore.user.role)) {
    // role not authorized so redirect to home page
    return next({ path: "/" });
  }

  next();
});

export default router;
