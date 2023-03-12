<template>
  <main class="container mx-auto">
    <NewFund @newFund="handleNewFund" />
    <Table :columns="columns" :data="funds">
      <template #col.name="props">
        <router-link :to="fundUrl(props.item.id)" :key="props.item.id">{{
          props.item.name
        }}</router-link>
      </template>
      <template #col.summary="props">
        {{ props.item.summary }} zł
      </template></Table
    >
  </main>
</template>

<script>
import { mapWritableState } from "pinia";
import Table from "../../components/Table.vue";
import { useExpensesStore } from "../../stores/useExpensesStore";
import NewFund from "@/components/settings/funds/NewFund.vue";
import { addFund } from "../../modules/funds/funds.api";
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
  },
};
</script>
