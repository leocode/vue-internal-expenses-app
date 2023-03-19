import { defineStore } from "pinia";

export const useUserStore = defineStore("auth", {
  state: () => ({ isLoggedIn: true, user: {} }),
  actions: {
    async login(email, password) {
      console.log("login in user");
    },
    async logout() {
      console.log("logout user");
    },
  },
});
