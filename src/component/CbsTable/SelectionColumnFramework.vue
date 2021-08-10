<template>
  {{ params.value }}
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  mounted() {
    this.$nextTick(() => {
      if (this.params.node.selectable === false) {
        let parentNode = this.$el.parentNode.parentNode;
        if (!parentNode) return;
        const checkboxRef = parentNode.querySelector(".ag-selection-checkbox");
        checkboxRef.classList.add("show-hide-checkbox");
        checkboxRef.classList.remove("ag-hidden");
        checkboxRef.classList.remove("ag-invisible");
      }
    });
  }
});
</script>
