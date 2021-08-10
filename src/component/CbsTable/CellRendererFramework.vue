<template>
  <component :is="component"></component>
</template>

<script>
import { defineComponent, createVNode, createTextVNode, watch } from "vue";
export default defineComponent({
  data() {
    return {
      component: undefined
    };
  },
  mounted() {
    let $slots = this.parent.$parent.table.$slots;
    let colDef = this.params.colDef;
    let column = this.params.column;
    let rowIndex = this.params.rowIndex;
    let data = this.params.data;
    const scope = {
      $index: rowIndex,
      row: data,
      column: column
    };
    let slotsFunc = $slots[colDef.slotName];
    watch(data, () => {
      if (typeof slotsFunc === "function") {
        this.component = createVNode("div", null, slotsFunc({ scope }));
      } else {
        this.component = createTextVNode(data[colDef.field]);
      }
    });
    if (typeof slotsFunc === "function") {
      this.component = createVNode("div", null, slotsFunc({ scope }));
    } else {
      this.component = createTextVNode(data[colDef.field]);
    }
  },
  unmounted() {},
  methods: {}
});
</script>

<style lang="less" scoped></style>
