<template>
  <main>
    <NewExpense @newExpense="handleNewExpense" />
    <ExpensesTable
      :expenses="expenses"
      @deleteExpense="deleteExpense"
      @editExpense="editExpense"
    />
    <EditExpenseModal
      :expense="editableExpense"
      :open="open"
      @close="open = false"
      @updateExpense="updateExpense"
    />
  </main>
</template>

<script>
import { mapWritableState } from "pinia";
import NewExpense from "@/components/NewExpense.vue";
import ExpensesTable from "@/modules/expenses/ExpensesTable.vue";
import {
  addExpense,
  deleteExpense,
  patchExpense,
} from "@/modules/expenses/expenses.api";
import { useExpensesStore } from "../stores/useExpensesStore";
import EditExpenseModal from "@/components/expenses/EditExpenseModal.vue";

export default {
  components: {
    NewExpense,
    ExpensesTable,
    EditExpenseModal,
  },
  data() {
    return {
      open: false,
      editableExpense: undefined,
    };
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
    editExpense(expense) {
      this.open = true;
      this.editableExpense = expense;
    },
    async updateExpense(newExpense) {
      const [error, updatedExpense] = await patchExpense(newExpense);

      if (error) {
        console.error(error);
        return;
      }

      const indexToUpdate = this.expenses.findIndex(
        ({ id }) => id === updatedExpense.id
      );

      this.expenses = [
        ...this.expenses.slice(0, indexToUpdate),
        updatedExpense,
        ...this.expenses.slice(indexToUpdate + 1),
      ];
    },
  },
};
</script>
