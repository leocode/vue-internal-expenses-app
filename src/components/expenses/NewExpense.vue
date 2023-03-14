<template>
  <ExpenseForm @updateExpense="updateExpense" :defaultExpense="defaultExpense">
    <template #title>
      <Typography as="h2" class="basis-full">Add new expense</Typography>
    </template>
    <template #button>
      <div class="basis-full">
        <Button @click="addNewExpense" type="submit">Add</Button>
      </div>
    </template>
  </ExpenseForm>
</template>

<script>
import Input from "@/components/shared/Input.vue";
import Button from "@/components/shared/Button/Button.vue";
import Label from "@/components/shared/Label.vue";
import Select from "@/components/shared/Select.vue";
import ExpenseForm from "./ExpenseForm.vue";
import Typography from "../shared/Typography.vue";

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
    Typography,
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
