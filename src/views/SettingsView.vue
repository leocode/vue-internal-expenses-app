<template>
  <main class="container mx-auto">
    <NewCategory @newCategory="handleNewCategory" />
    <Table :columns="categoriesColumns" :data="categories" />
  </main>
</template>

<script>
import NewCategory from "../components/NewCategory.vue";
import Table from "../components/Table.vue";
import {
  getCategories,
  addCategory,
} from "@/modules/categories/categories.api.js";

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
      categories: [],
    };
  },
  async created() {
    this.categories = await this.fetchCategories();
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
    async fetchCategories() {
      const [error, expenses] = await getCategories();

      if (error) {
        console.error(error);
        return;
      }

      return expenses;
    },
  },
};
</script>
