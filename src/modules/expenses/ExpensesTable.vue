<template>
  <Table :data="expenses" :columns="columns">
    <template #col.actions="props">
      <span
        class="mr-2 cursor-pointer transition-all hover:text-slate-500"
        @click="deleteExpense(props.item.id)"
      >
        X
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
  },
};
</script>
