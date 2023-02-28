<template>
  <input
    :type="type"
    :name="name"
    class="border border-black p-2 text-slate-700"
    @input="updateValue"
    :value="value"
  />
</template>

<script>
export default {
  props: {
    name: String,
    type: {
      type: String,
      default: "text",
    },
    value: String,
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>
