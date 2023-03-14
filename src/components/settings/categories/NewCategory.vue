<template>
  <form class="flex flex-col items-start gap-2" @submit.prevent>
    <Typography as="h2">Add new category</Typography>
    <Input
      v-model="category.name"
      name="name"
      id="name"
      placeholder="eg. Car"
    />
    <Input v-model="category.max" type="number" name="max" placeholder="800" />

    <Button
      type="submit"
      @click="addNewCategory"
      class="btn rounded-md bg-slate-500 px-4"
    >
      Add
    </Button>
  </form>
</template>

<script>
import Input from "@/components/shared/Input.vue";
import Button from "@/components/shared/Button/Button.vue";
import Typography from "../../shared/Typography.vue";

export default {
  components: {
    Input,
    Button,
    Typography,
  },
  data() {
    return {
      category: {},
    };
  },
  methods: {
    addNewCategory() {
      const max = Number(this.category.max);
      if (max <= 0 || !this.category.name) {
        return;
      }
      this.$emit("newCategory", this.category);
      this.resetForm();
    },
    resetForm() {
      this.category = {};
    },
  },
};
</script>
