<template>
  <div class="flex flex-col items-start gap-1">
    <h2>Add new category</h2>
    <Input v-model="category.name" name="name" id="name" />
    <Input v-model="category.max" type="number" name="max" />

    <button
      @click="addNewCategory()"
      class="btn rounded-md bg-slate-500 px-4 text-white"
    >
      Add
    </button>
  </div>
</template>

<script>
import Input from "../../shared/Input.vue";

const defaultCategory = {
  name: "",
  max: "1000",
};

export default {
  components: {
    Input,
  },
  data() {
    return {
      category: { ...defaultCategory },
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
      this.category = { ...defaultCategory };
    },
  },
};
</script>
