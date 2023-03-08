<template>
  <div class="flex flex-wrap gap-4" v-bind="$attrs">
    <slot name="title" />
    <div>
      <Label id="name">What</Label>
      <Input v-model="expense.what" name="what" id="what" />
    </div>

    <div>
      <Label id="amount">Amount</Label>
      <Input v-model="expense.amount" type="number" name="amount" />
    </div>

    <div>
      <Label id="who">Spender</Label>
      <Select
        v-model="expense.who"
        name="who"
        :options="
          spenders.map((spender) => ({ label: spender, value: spender }))
        "
      />
    </div>

    <div>
      <Label id="category">Category</Label>
      <Select
        v-model="expense.category"
        name="category"
        :options="
          categories.map((category) => ({
            label: category.name,
            value: category.name,
          }))
        "
      />
    </div>

    <slot name="button" />
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useExpensesStore } from "@/stores/useExpensesStore";
import Input from "@/components/Input.vue";
import Select from "@/components/shared/Select.vue";
import Label from "@/components/shared/Label.vue";

const defaultExpense = {
  what: "test",
  who: "Mateusz",
  amount: "1",
  category: "Jedzenie",
};

export default {
  components: {
    Input,
    Select,
    Label,
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
