<template>
  <font-awesome-icon icon="fa-solid" :icon="icon" v-bind="$attrs" />
</template>

<script>
export default {
  props: {
    icon: String,
  },
};
</script>
