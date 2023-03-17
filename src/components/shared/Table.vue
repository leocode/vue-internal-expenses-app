<template>
  <div class="rounded-lg bg-white text-sm">
    <table class="w-full table-auto border-collapse">
      <thead>
        <tr>
          <th
            class="whitespace-nowrap bg-zinc-100 px-6 py-3 text-left align-middle text-xs font-semibold uppercase first:rounded-tl-lg last:rounded-tr-lg"
            v-for="column in columns"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody class="">
        <tr v-for="item in data">
          <td
            class="whitespace-nowrap border border-t-0 border-l-0 border-r-0 border-solid border-zinc-100 p-4 px-6 align-middle text-xs"
            v-for="column in columns"
          >
            <slot :name="`col.${column.property}`" :item="item">
              <template>
                {{ item[column.property] }}
              </template>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="!data.length" class="p-2 text-center">
      {{ noDataInfo || "No data for these filters" }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columns: Array,
    data: Array,
    noDataInfo: String,
  },
};
</script>
