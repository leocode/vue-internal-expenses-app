<template>
  <main class="container mx-auto">
    <NewExpense @newExpense="handleNewExpense" />
    <ExpensesTable :expenses="expenses" @deleteExpense="deleteExpense" />
  </main>
</template>

<script>
import NewExpense from "../components/NewExpense.vue";
import ExpensesTable from "@/modules/expenses/ExpensesTable.vue";
import { addExpense, deleteExpense } from "@/modules/expenses/expenses.api";
import { useExpensesStore } from "../stores/useExpensesStore";
import { mapWritableState } from "pinia";

export default {
  components: {
    NewExpense,
    ExpensesTable,
  },
  computed: {
    ...mapWritableState(useExpensesStore, ["expenses"]),
  },
  methods: {
    async deleteExpense(id) {
      const [error] = await deleteExpense(id);

      if (error) {
        console.error("Error deleting the expense");
        return;
      }

      this.expenses = this.expenses.filter((expense) => expense.id !== id);
    },
    async handleNewExpense(expense) {
      const [error, newExpense] = await addExpense(expense);

      if (error) {
        console.error(error);
        return;
      }

      this.expenses = [...this.expenses, newExpense];
    },
  },
};
</script>
