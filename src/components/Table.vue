<template>
  <table class="w-full table-auto border-collapse text-sm">
    <thead>
      <tr>
        <th
          class="border-b p-4 px-4 pb-3 text-left font-medium text-slate-800 dark:text-slate-200"
          v-for="column in columns"
        >
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody class="bg-white dark:bg-slate-900">
      <tr v-for="item in data">
        <td
          class="w-20 border-b border-slate-100 py-8 px-4 text-left font-medium text-slate-800 dark:text-slate-300"
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
</template>

<script>
export default {
  props: {
    columns: Array,
    data: Array,
  },
};
</script>
