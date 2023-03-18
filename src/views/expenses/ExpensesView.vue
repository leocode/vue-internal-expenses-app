<template>
  <main class="flex flex-col gap-4">
    <NewExpense @newExpense="handleNewExpense" />
    <div class="flex items-center justify-center">
      <button @click="previousMonth" class="p-2">
        <font-awesome-icon icon="fa-solid fa-arrow-right" class="rotate-180" />
      </button>
      <h2 class="min-w-[8rem] text-center">
        {{ currentMonth.format("MMMM YYYY") }}
      </h2>
      <button @click="nextMonth" class="p-2">
        <font-awesome-icon icon="fa-solid fa-arrow-right" />
      </button>
    </div>
    <ExpensesTable
      :expenses="expenses"
      @deleteExpense="deleteExpense"
      @editExpense="editExpense"
      @updateExpense="updateExpense"
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
import dayjs from "dayjs";
import { mapWritableState } from "pinia";
import NewExpense from "@/components/expenses/NewExpense.vue";
import ExpensesTable from "@/components/expenses/ExpensesTable.vue";
import {
  addExpense,
  deleteExpense,
  patchExpense,
} from "@/modules/expenses/expenses.api";
import { useExpensesStore } from "@/stores/useExpensesStore";
import EditExpenseModal from "@/components/expenses/EditExpenseModal.vue";
import { getExpenses } from "../../modules/expenses/expenses.api";

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
      currentMonth: dayjs().startOf("month"),
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

      this.expenses = [newExpense, ...this.expenses].sort(
        (a, b) => new Date(b.spentAt) - new Date(a.spentAt)
      );
    },
    editExpense(expense) {
      this.open = true;
      this.editableExpense = {
        ...expense,
        spentAt: dayjs(expense.spentAt).format("YYYY-MM-DD"),
      };
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
    previousMonth() {
      const previousMonth = this.currentMonth.subtract(1, "month");
      this.currentMonth = previousMonth;
    },
    nextMonth() {
      const nextMonth = this.currentMonth.add(1, "month");
      this.currentMonth = nextMonth;
    },
  },
  watch: {
    async currentMonth(val) {
      const [error, data] = await getExpenses({
        date: this.currentMonth.format("YYYY-MM-DD"),
      });

      if (data) {
        this.expenses = data;
      }
    },
  },
};
</script>
