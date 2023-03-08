<template>
  <label
    :for="id"
    class="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
    ><slot
  /></label>
</template>

<script>
export default {
  props: {
    id: String,
  },
};
</script>
