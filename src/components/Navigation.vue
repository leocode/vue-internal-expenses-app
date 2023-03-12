<template>
  <nav
    class="mr-4 flex min-w-[200px] flex-col gap-8 bg-zinc-800 p-4 px-8 text-sm uppercase text-slate-200"
  >
    <router-link v-for="link in menuItems" :to="link.url" :key="link.url">{{
      link.label
    }}</router-link>
  </nav>
</template>

<script>
import { ROUTER } from "../router/links";

const loggedInMenu = [
  { url: ROUTER.home, label: "Home" },
  { url: ROUTER.settings, label: "Settings" },
  { url: ROUTER.funds, label: "Funds" },
];

const loggedOutMenu = [{ url: ROUTER.login, label: "Login" }];

export default {
  data() {
    return {
      isAuthorized: true, // TODO: handle login state
    };
  },
  computed: {
    menuItems: function () {
      return this.isAuthorized ? loggedInMenu : loggedOutMenu;
    },
  },
};
</script>
