<template>
  <Table :data="expenses" :columns="columns">
    <template #col.amount="props">{{ props.item.amount }} zł</template>
    <template #col.actions="props">
      <div class="flex gap-4">
        <span
          class="cursor-pointer transition-all hover:text-slate-500"
          @click="editExpense(props.item)"
          @click.stop
        >
          <font-awesome-icon icon="fa-solid fa-pen" />
        </span>
        <span
          class="cursor-pointer transition-all hover:text-slate-500"
          @click="deleteExpense(props.item.id)"
        >
          <font-awesome-icon icon="fa-solid fa-trash" />
        </span>
        <span class="-mx-2 cursor-pointer transition-all hover:text-slate-500">
          <Dropdown>
            <template #button="props">
              <font-awesome-icon
                icon="fa-solid fa-ellipsis-vertical"
                class="px-2"
                @click="props.toggle"
              />
            </template>
            <Button
              v-for="fund in funds"
              :key="fund.id"
              class="block px-4 py-2 text-sm text-gray-700 sm:w-full"
              role="menuitem"
              @click="toggle(props.item.id, fund.id)"
              >{{ fund.name }}</Button
            >
          </Dropdown>
        </span>
      </div>
    </template>
    <template #col.category="props">{{ props.item.category.name }}</template>
    <template #col.spender="props">{{ props.item.spender.name }}</template>
  </Table>
</template>

<script>
import Table from "@/components/shared/Table.vue";
import { mapState } from "pinia";
import Button from "../shared/Button/Button.vue";
import Dropdown from "../shared/Dropdown.vue";
import { useExpensesStore } from "../../stores/useExpensesStore";

export default {
  components: {
    Table,
    Dropdown,
    Button,
  },
  props: {
    expenses: {
      type: Array,
    },
  },
  computed: {
    ...mapState(useExpensesStore, ["funds"]),
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
    toggle(expenseId, fundId) {
      this.$emit("updateExpense", { id: expenseId, fundId });
    },
  },
};
</script>
