<template>
  <div class="container mx-auto mb-8">
    <nav class="flex gap-8 py-4">
      <router-link v-for="link in menuItems" :to="link.url">{{
        link.label
      }}</router-link>
    </nav>
  </div>
</template>

<script>
const loggedInMenu = [
  { url: "/", label: "Home" },
  { url: "/settings", label: "Settings" },
];

const loggedOutMenu = [{ url: "/login", label: "Login" }];

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
