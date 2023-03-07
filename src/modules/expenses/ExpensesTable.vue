<template>
  <Table :data="expenses" :columns="columns">
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
        { property: "what", label: "What" },
        {
          property: "amount",
          label: "Amount",
        },
        { property: "who", label: "Spender" },
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
