import Navigation from './components/Navigation.vue';

<template>
  <div id="app">
    <header>
      <Navigation />
    </header>

    <router-view />
  </div>
</template>

<script>
import { mapStores } from "pinia";
import Navigation from "./components/Navigation.vue";
import { useExpensesStore } from "./stores/useExpensesStore";

export default {
  components: {
    Navigation,
  },
  computed: {
    ...mapStores(useExpensesStore),
  },
  async beforeMount() {
    await this.expensesStore.initialize();
  },
};
</script>
