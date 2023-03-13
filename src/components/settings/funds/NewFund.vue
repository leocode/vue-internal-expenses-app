<template>
  <form class="flex flex-col items-start gap-2" @submit.prevent>
    <h2>Add new fund</h2>
    <Input
      v-model="fund.name"
      name="name"
      id="name"
      placeholder="eg. Irregular expenses"
    />

    <Button
      @click="addNewFund"
      class="btn rounded-md bg-slate-500 px-4"
      type="submit"
    >
      Add
    </Button>
  </form>
</template>

<script>
import Input from "@/components/shared/Input.vue";
import Button from "@/components/shared/Button/Button.vue";

export default {
  components: {
    Input,
    Button,
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
