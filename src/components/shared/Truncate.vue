<template>
  <span :title="text">
    {{ truncatedText }}
  </span>
</template>

<script>
export default {
  name: "Truncate",
  props: {
    max: {
      type: Number,
      required: true,
    },
  },
  computed: {
    text() {
      return this.$slots.default[0].text;
    },
    truncatedText() {
      return this.text.length > this.max
        ? this.text.slice(0, this.max) + "..."
        : this.text;
    },
  },
};
</script>
