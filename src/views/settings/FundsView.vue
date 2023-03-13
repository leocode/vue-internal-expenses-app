<template>
  <main class="container mx-auto">
    <NewFund @newFund="handleNewFund" />
    <Table :columns="columns" :data="funds">
      <template #col.name="props">
        <router-link :to="fundUrl(props.item.id)" :key="props.item.id">{{
          props.item.name
        }}</router-link>
      </template>
      <template #col.summary="props"> {{ props.item.summary }} zł </template>
      <template #col.actions="props">
        <span
          class="cursor-pointer transition-all hover:text-slate-500"
          @click="handleDeleteFund(props.item.id)"
        >
          <font-awesome-icon icon="fa-solid fa-trash" />
        </span>
      </template>
    </Table>
  </main>
</template>

<script>
import { mapWritableState } from "pinia";
import Table from "@/components/shared/Table.vue";
import { useExpensesStore } from "../../stores/useExpensesStore";
import NewFund from "@/components/settings/funds/NewFund.vue";
import { addFund, deleteFund } from "../../modules/funds/funds.api";
import { ROUTER, getUrl } from "../../router/links";

export default {
  components: {
    Table,
    NewFund,
  },
  data() {
    return {
      columns: [
        { property: "name", label: "Fund" },
        { property: "summary", label: "Summary (this month)" },
        { property: "actions", label: "" },
      ],
    };
  },
  computed: {
    ...mapWritableState(useExpensesStore, ["funds"]),
  },
  methods: {
    async handleNewFund(fund) {
      const [error, newFund] = await addFund(fund);

      if (error) {
        console.error(error);
        return;
      }

      this.funds = [...this.funds, { ...newFund, summary: 0 }];
    },
    fundUrl(id) {
      return getUrl(ROUTER.singleFund, { id });
    },
    async handleDeleteFund(id) {
      const [error] = await deleteFund(id);

      if (error) {
        console.error("Error deleting the fund");
        return;
      }

      this.funds = this.funds.filter((fund) => fund.id !== id);
    },
  },
};
</script>
