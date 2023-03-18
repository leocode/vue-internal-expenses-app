<template>
  <form class="flex flex-wrap gap-2" v-bind="$attrs" @submit.prevent>
    <slot name="title" />
    <div>
      <Label id="name">Name</Label>
      <Input v-model="expense.name" name="name" id="name" ref="expenseName" />
    </div>

    <div>
      <Label id="amount">Amount</Label>
      <Input v-model="expense.amount" type="number" name="amount" />
    </div>

    <div>
      <Label id="category">Category</Label>
      <Select
        v-model="expense.categoryId"
        name="category"
        :options="
          categories.map((category) => ({
            label: category.name,
            value: category.id,
          }))
        "
      />
    </div>

    <div>
      <Label id="spentAt">Date</Label>
      <Input v-model="expense.spentAt" type="date" name="spentAt" />
    </div>

    <div>
      <Label id="note">Comment</Label>
      <Input v-model="expense.note" name="note" />
    </div>

    <div>
      <Label id="spender">Spender</Label>
      <Select
        v-model="expense.spenderId"
        name="spender"
        :options="
          spenders.map((spender) => ({
            label: spender.name,
            value: spender.id,
          }))
        "
      />
    </div>

    <slot name="button" />
  </form>
</template>

<script>
import { mapState } from "pinia";
import { useExpensesStore } from "@/stores/useExpensesStore";
import Input from "@/components/shared/Input.vue";
import Select from "@/components/shared/Select.vue";
import Label from "@/components/shared/Label.vue";

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
      expense: { ...this.defaultExpense },
      spenders: [{ name: "Mateusz", id: 1 }], // todo: fetch from backend
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
