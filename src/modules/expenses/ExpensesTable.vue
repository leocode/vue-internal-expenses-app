<template>
  <Table :data="expenses" :columns="columns">
    <template #col.amount="props">{{ props.item.amount }} zł</template>
    <template #col.actions="props">
      <span
        class="mr-4 cursor-pointer transition-all hover:text-slate-500"
        @click="editExpense(props.item)"
      >
        <font-awesome-icon icon="fa-solid fa-pen" />
      </span>
      <span
        class="cursor-pointer transition-all hover:text-slate-500"
        @click="deleteExpense(props.item.id)"
      >
        <font-awesome-icon icon="fa-solid fa-trash" />
      </span>
    </template>
    <template #col.category="props">{{ props.item.category.name }}</template>
    <template #col.spender="props">{{ props.item.spender.name }}</template>
  </Table>
</template>

<script>
import Table from "@/components/Table.vue";

export default {
  components: {
    Table,
  },
  props: {
    expenses: {
      type: Array,
    },
  },
  data() {
    return {
      columns: [
        { property: "name", label: "Name" },
        {
          property: "amount",
          label: "Amount",
        },
        { property: "spender", label: "Spender" },
        { property: "category", label: "Category" },
        { property: "actions", label: "" },
      ],
    };
  },
  methods: {
    deleteExpense(id) {
      this.$emit("deleteExpense", id);
    },
    editExpense(id) {
      this.$emit("editExpense", id);
    },
  },
};
</script>
