<template>
  <main class="container mx-auto">
    <h1>This is settings page.</h1>
    <Table :columns="categoriesColumns" :data="categories" />
  </main>
</template>

<script>
import Table from "../components/Table.vue";

export default {
  components: {
    Table,
  },
  data() {
    return {
      categoriesColumns: [
        { property: "name", label: "Category" },
        { property: "max", label: "Max" },
        { property: "thisMonth", label: "This month" },
      ],
      categories: [
        {
          name: "Jedzenie",
          max: 1200,
          thisMonth: 250,
        },
      ],
    };
  },
};
</script>
