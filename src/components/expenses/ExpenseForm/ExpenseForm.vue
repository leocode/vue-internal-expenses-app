<template>
  <div class="flex flex-col items-start gap-1">
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
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useExpensesStore } from "@/stores/useExpensesStore";
import Input from "@/components/Input.vue";

const defaultExpense = {
  what: "test",
  who: "Mateusz",
  amount: "1",
  category: "Jedzenie",
};

export default {
  components: {
    Input,
  },
  props: {
    defaultExpense: Object,
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
  watch: {
    expense: {
      deep: true,
      handler: function (val) {
        this.$emit("updateExpense", val);
      },
    },
    defaultExpense(val) {
      this.expense = { ...val };
    },
  },
};
</script>
