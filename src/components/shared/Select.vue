<template>
  <select
    :name="name"
    class="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
    @input="updateValue"
    :value="value"
  >
    <option v-for="option in options" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    name: String,
    value: String,
    options: Array,
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>
