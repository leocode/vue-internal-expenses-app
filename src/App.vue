import Navigation from './components/Navigation.vue';

<template>
  <div id="app">
    <div class="grid min-h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
      <Header />
      <Navigation />

      <div class="m-4"><router-view /></div>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import Header from "./components/layout/Header.vue";
import Navigation from "./components/Navigation.vue";
import { useExpensesStore } from "./stores/useExpensesStore";

export default {
  components: {
    Navigation,
    Header,
  },
  computed: {
    ...mapStores(useExpensesStore),
  },
  async beforeMount() {
    await this.expensesStore.initialize();
  },
};
</script>
