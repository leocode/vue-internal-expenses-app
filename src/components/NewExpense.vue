<template>
  <ExpenseForm @updatedExpense="addNewExpense">
    <template #title><h2 class="basis-full">Add new expense</h2></template>
    <template #button>
      <div class="basis-full">
        <Button @click="addNewExpense()" type="submit">Add</Button>
      </div>
    </template>
  </ExpenseForm>
</template>

<script>
import { mapState } from "pinia";
import Input from "../components/Input.vue";
import { useExpensesStore } from "../stores/useExpensesStore";
import Button from "@/components/shared/Button/Button.vue";
import Label from "./shared/Label.vue";
import Select from "./shared/Select.vue";
import ExpenseForm from "./expenses/ExpenseForm/ExpenseForm.vue";

const defaultExpense = {
  what: "test",
  who: "Mateusz",
  amount: "1",
  category: "Jedzenie",
};

export default {
  components: {
    Input,
    Button,
    Label,
    Select,
    ExpenseForm,
  },
  data() {
    return {
      expense: { ...defaultExpense },
      spenders: ["Mateusz", "Hania"],
    };
  },
  computed: {
    ...mapState(useExpensesStore, ["categories"]),
  },
  methods: {
    addNewExpense() {
      const amount = Number(this.expense.amount);
      if (amount <= 0) {
        this.resetExpense();
        return;
      }
      this.$emit("newExpense", this.expense);
      this.resetExpense();
    },
    resetExpense() {
      this.expense = { ...defaultExpense };
    },
  },
};
</script>
