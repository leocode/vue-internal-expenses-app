<template>
  <Table
    :data="filteredExpenses"
    :columns="columns"
    noDataInfo="There are no expenses for this month"
  >
    <template #col.amount="props">{{
      formatAmount(props.item.amount)
    }}</template>
    <template #col.actions="props">
      <div class="flex gap-4">
        <span
          class="cursor-pointer transition-all hover:text-slate-500"
          @click="editExpense(props.item)"
          @click.stop
        >
          <Icon icon="fa-pen" />
        </span>
        <span
          class="cursor-pointer transition-all hover:text-slate-500"
          @click="deleteExpense(props.item.id)"
        >
          <Icon icon="fa-trash" />
        </span>
        <span class="-mx-2 cursor-pointer transition-all hover:text-slate-500">
          <Dropdown>
            <template #button="props">
              <Icon
                icon="fa-ellipsis-vertical"
                class="px-2"
                @click.native="props.toggle"
              />
            </template>
            <Button
              v-for="fund in funds"
              :key="fund.id"
              class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-200 sm:w-full"
              role="menuitem"
              @click="
                toggle(props.item.id, fund.id, props.item.fundId === fund.id)
              "
            >
              {{ fund.name }}
              <Icon
                icon="fa-check"
                v-if="props.item.fundId === fund.id"
                class="-mr-6 w-4 text-green-500"
              />
            </Button>
          </Dropdown>
        </span>
      </div>
    </template>
    <template #col.category="props"
      ><button @click="toggleCategory(props.item.category.id)">
        {{ props.item.category.name }}
      </button></template
    >
    <template #col.spender="props">{{ props.item.spender.name }}</template>
    <template #col.note="props">
      <Truncate :max="20">{{ props.item.note }} <span>test</span></Truncate>
    </template>
    <template #col.spentAt="props">{{
      formatDate(props.item.spentAt)
    }}</template>
  </Table>
</template>

<script>
import dayjs from "dayjs";
import Table from "@/components/shared/Table.vue";
import { mapState } from "pinia";
import Button from "../shared/Button/Button.vue";
import Dropdown from "../shared/Dropdown.vue";
import Truncate from "../shared/Truncate.vue";
import { useExpensesStore } from "../../stores/useExpensesStore";
import Icon from "../shared/Icon.vue";
import { formatAmount } from "@/utils/amount";

export default {
  components: {
    Table,
    Dropdown,
    Button,
    Truncate,
    Icon,
  },
  props: {
    expenses: {
      type: Array,
    },
  },
  computed: {
    ...mapState(useExpensesStore, ["funds"]),
    filteredExpenses() {
      if (!this.selectedCategoryId) {
        return this.expenses;
      }

      return this.expenses.filter(
        (expense) => expense.category.id === this.selectedCategoryId
      );
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
        { property: "note", label: "Comment" },
        { property: "spentAt", label: "Date" },
        { property: "actions", label: "" },
      ],
      selectedCategoryId: null,
    };
  },
  methods: {
    deleteExpense(id) {
      this.$emit("deleteExpense", id);
    },
    editExpense(id) {
      this.$emit("editExpense", id);
    },
    toggle(expenseId, fundId, existing) {
      this.$emit("updateExpense", {
        id: expenseId,
        fundId: existing ? null : fundId,
      });
    },
    formatDate(date) {
      return dayjs(date).format("DD.MM.YYYY");
    },
    formatAmount,
    toggleCategory(categoryId) {
      this.selectedCategoryId =
        this.selectedCategoryId === categoryId ? null : categoryId;
    },
  },
};
</script>
