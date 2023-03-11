<template>
  <transition
    enter-active-class="duration-300 ease-out"
    enter-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-200 ease-in"
    leave-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      v-show="open"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      ></div>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <div
            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            ref="body"
            v-click-outside="close"
          >
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    class="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                    v-if="title"
                  >
                    {{ title }}
                  </h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      <slot />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="gap-2 bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:gap-4 sm:px-6"
            >
              <slot name="footer">
                <Button @click="confirm">
                  {{ confirmText }}
                </Button>
                <Button @click="close">Cancel</Button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Button from "../Button/Button.vue";

export default {
  components: {
    Button,
  },
  props: {
    open: Boolean,
    title: String,
    confirmText: {
      type: String,
      default: "Confirm",
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    confirm() {
      this.$emit("confirm");
      this.close();
    },
  },
};
</script>
