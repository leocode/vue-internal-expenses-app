<template>
  <div class="flex flex-col items-start gap-1">
    <h2>Add new fund</h2>
    <Input v-model="fund.name" name="name" id="name" />

    <button
      @click="addNewFund"
      class="btn rounded-md bg-slate-500 px-4 text-white"
    >
      Add
    </button>
  </div>
</template>

<script>
import Input from "@/components/shared/Input.vue";

export default {
  components: {
    Input,
  },
  data() {
    return {
      fund: {},
    };
  },
  methods: {
    addNewFund() {
      if (!this.fund.name) {
        return;
      }
      this.$emit("newFund", this.fund);
      this.resetForm();
    },
    resetForm() {
      this.fund = {};
    },
  },
};
</script>
