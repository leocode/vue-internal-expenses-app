<template>
  <Modal :open="open" @close="close">
    <ExpenseForm
      :defaultExpense="expense"
      @updateExpense="handleExpenseChange"
    />
    <template #footer>
      <Button @click="confirmUpdate">Confirm</Button>
      <Button @click="close">Cancel</Button></template
    >
  </Modal>
</template>

<script>
import ExpenseForm from "./ExpenseForm/ExpenseForm.vue";
import Modal from "../shared/Modal/Modal.vue";
import Button from "../shared/Button/Button.vue";

export default {
  components: { Modal, ExpenseForm, Button },
  props: {
    open: Boolean,
    expense: Object,
  },
  data() {
    return {
      updatedExpense: { ...this.expense },
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    handleExpenseChange(expense) {
      this.updatedExpense = expense;
    },
    confirmUpdate() {
      this.$emit("updateExpense", this.updatedExpense);
      this.close();
    },
  },
};
</script>
