<template>
  <ExpenseForm @updateExpense="updateExpense" :defaultExpense="defaultExpense">
    <template #title><h2 class="basis-full">Add new expense</h2></template>
    <template #button>
      <div class="basis-full">
        <Button @click="addNewExpense" type="submit">Add</Button>
      </div>
    </template>
  </ExpenseForm>
</template>

<script>
import Input from "../components/Input.vue";
import Button from "@/components/shared/Button/Button.vue";
import Label from "./shared/Label.vue";
import Select from "./shared/Select.vue";
import ExpenseForm from "./expenses/ExpenseForm/ExpenseForm.vue";

const defaultExpense = {
  name: "test",
  spenderId: 1,
  amount: "1",
  categoryId: 1,
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
      defaultExpense,
      expense: { ...defaultExpense },
    };
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
    updateExpense(expense) {
      this.expense = expense;
    },
    resetExpense() {
      this.defaultExpense = { ...defaultExpense };
    },
  },
};
</script>
