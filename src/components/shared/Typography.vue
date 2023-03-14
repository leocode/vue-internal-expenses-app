<template>
  <p
    :is="as"
    class="whitespace-nowrap text-left align-middle text-lg font-semibold uppercase"
  >
    <slot />
  </p>
</template>

<script>
export default {
  props: {
    as: {
      type: String,
      default: "p",
    },
  },
};
</script>
