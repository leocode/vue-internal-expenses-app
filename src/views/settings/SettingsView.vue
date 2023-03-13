<template>
  <main class="container mx-auto">
    <NewCategory @newCategory="handleNewCategory" />
    <Table :columns="categoriesColumns" :data="categories">
      <template #col.actions="props">
        <span
          class="cursor-pointer transition-all hover:text-slate-500"
          @click="handleDeleteCategory(props.item.id)"
        >
          <font-awesome-icon icon="fa-solid fa-trash" />
        </span>
      </template>
    </Table>
  </main>
</template>

<script>
import NewCategory from "@/components/settings/categories/NewCategory.vue";
import Table from "@/components/shared/Table.vue";
import {
  addCategory,
  deleteCategory,
} from "@/modules/categories/categories.api.js";
import { mapWritableState } from "pinia";
import { useExpensesStore } from "../../stores/useExpensesStore";

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
        { property: "actions", label: "" },
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
    async handleDeleteCategory(id) {
      const [error] = await deleteCategory(id);

      if (error) {
        console.error("Error deleting the category");
        return;
      }

      this.categories = this.categories.filter(
        (category) => category.id !== id
      );
    },
  },
};
</script>
