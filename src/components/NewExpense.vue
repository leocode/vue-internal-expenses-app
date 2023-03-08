<template>
  <div class="flex flex-col items-start gap-1">
    <h2>Add new expense</h2>
    <Input v-model="expense.what" name="what" id="what" />
    <select
      v-model="expense.who"
      name="who"
      id="who"
      class="rounded-none border border-black p-2 text-slate-700"
    >
      <option v-for="spender in spenders" :value="spender">
        {{ spender }}
      </option>
    </select>
    <Input v-model="expense.amount" type="number" name="amount" />
    <select
      v-model="expense.category"
      name="category"
      id="category"
      class="rounded-none border border-black p-2 text-slate-700"
    >
      <option v-for="category in categories" :value="category.name">
        {{ category.name }}
      </option>
    </select>

    <Button @click="addNewExpense()"> Add </Button>
  </div>
</template>

<script>
import { mapState } from "pinia";
import Input from "../components/Input.vue";
import { useExpensesStore } from "../stores/useExpensesStore";
import Button from "@/components/shared/Button/Button.vue";

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
