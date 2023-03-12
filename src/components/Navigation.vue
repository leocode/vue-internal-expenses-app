<template>
  <nav
    class="mr-4 flex min-w-[200px] flex-col gap-2 bg-zinc-800 p-4 px-8 text-sm uppercase text-slate-200"
  >
    <template v-for="item in menuItems">
      <router-link
        v-if="item.url"
        :to="item.url"
        class="block py-3 text-xs font-bold uppercase text-zinc-400 hover:text-zinc-200"
      >
        <Icon v-if="item.icon" :icon="item.icon" class="px-2" />
        {{ item.label }}</router-link
      >
      <template v-else>
        <h6
          class="block pt-1 pb-4 text-xs font-bold uppercase text-zinc-500 no-underline md:min-w-full"
        >
          {{ item.label }}
        </h6>
        <router-link
          v-for="subitem in item.menu"
          :to="subitem.url"
          :key="subitem.url"
          class="block py-3 text-xs font-bold uppercase text-zinc-400 hover:text-zinc-200"
        >
          <Icon v-if="subitem.icon" :icon="subitem.icon" class="px-2" />
          {{ subitem.label }}
        </router-link>
      </template>

      <hr class="my-4 md:min-w-full" />
    </template>
  </nav>
</template>

<script>
import { ROUTER } from "../router/links";
import Icon from "@/components/shared/Icon.vue";

const loggedInMenu = [
  { url: ROUTER.home, label: "Home", icon: "fa-home" },
  {
    label: "Settings",
    menu: [
      { url: ROUTER.settings, label: "Categories", icon: "fa-tag" },
      { url: ROUTER.funds, label: "Funds", icon: "fa-sack-dollar" },
    ],
  },
];

const loggedOutMenu = [{ url: ROUTER.login, label: "Login" }];

export default {
  components: {
    Icon,
  },
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
