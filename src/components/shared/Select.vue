<template>
  <v-select
    :options="options"
    :value="selectedOption"
    @input="updateSelectedOption"
    label="label"
    track-by="value"
    :searchable="true"
    :clearable="true"
    class="placeholder-blueGray-300 text-blueGray-600 rounded text-sm shadow focus:outline-none focus:ring"
  />
</template>

<style>
@import "vue-select/dist/vue-select.css";
.vs__dropdown-toggle {
  @apply border-0 p-2;
}

.vs__selected {
  @apply static m-0 !important;
}

.vs__search {
  @apply m-0 !important;
}
</style>

<script>
import vSelect from "vue-select";

export default {
  components: {
    vSelect,
  },
  props: {
    name: String,
    value: String | Number,
    options: Array,
  },
  data() {
    return {
      selectedOption: this.options.find(
        (option) => option.value === this.value
      ),
    };
  },
  methods: {
    updateSelectedOption(selectedOption) {
      this.selectedOption = selectedOption;
      this.$emit("input", selectedOption.value);
    },
  },
};
</script>
