import { defineStore } from "pinia";
import { getCategories } from "@/modules/categories/categories.api.js";
import { getExpenses } from "@/modules/expenses/expenses.api.js";
import { getFunds } from "@/modules/funds/funds.api.js";

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

async function fetchFunds() {
  const [error, funds] = await getFunds();

  if (error) {
    console.error(error);
    return [];
  }

  return funds;
}

export const useExpensesStore = defineStore("expenses", {
  state: () => ({ categories: [], expenses: [], funds: [] }),
  actions: {
    async initialize() {
      this.categories = await fetchCategories();
      this.expenses = await fetchExpenses();
      this.funds = await fetchFunds();
    },
  },
});
