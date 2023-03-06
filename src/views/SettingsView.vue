<template>
  <main class="container mx-auto">
    <NewCategory @newCategory="handleNewCategory" />
    <Table :columns="categoriesColumns" :data="categories" />
  </main>
</template>

<script>
import NewCategory from "../components/NewCategory.vue";
import Table from "../components/Table.vue";
import { addCategory } from "@/modules/categories/categories.api.js";
import { mapWritableState } from "pinia";
import { useExpensesStore } from "../stores/useExpensesStore";

export default {
  components: {
    Table,
    NewCategory,
  },
  data() {
    return {
      categoriesColumns: [
        { property: "name", label: "Category" },
        { property: "max", label: "Max" },
        { property: "thisMonth", label: "This month" },
      ],
    };
  },
  computed: {
    ...mapWritableState(useExpensesStore, ["categories"]),
  },
  methods: {
    async handleNewCategory(category) {
      const [error, newCategory] = await addCategory({
        ...category,
        thisMonth: 0,
      });

      if (error) {
        console.error(error);
        return;
      }

      this.categories = [...this.categories, newCategory];
    },
  },
};
</script>
