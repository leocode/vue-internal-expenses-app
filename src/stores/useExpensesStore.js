import { defineStore } from "pinia";
import { getCategories } from "@/modules/categories/categories.api.js";
import { getExpenses } from "@/modules/expenses/expenses.api.js";

async function fetchCategories() {
  const [error, expenses] = await getCategories();

  if (error) {
    console.error(error);
    return [];
  }

  return expenses;
}

async function fetchExpenses() {
  const [error, expenses] = await getExpenses();

  if (error) {
    console.error(error);
    return [];
  }

  return expenses;
}

export const useExpensesStore = defineStore("expenses", {
  state: () => ({ categories: [], expenses: [] }),
  actions: {
    async initialize() {
      this.categories = await fetchCategories();
      this.expenses = await fetchExpenses();
    },
  },
});
