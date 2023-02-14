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
import Navigation from "./components/Navigation.vue";

export default {
  components: {
    Navigation,
  },
};
</script>
