<template>
  <component :is="component"></component>
</template>

<script>
import { defineComponent, createVNode, createTextVNode, watch } from "vue";
import { ElButton } from "element-plus";

export default defineComponent({
  data() {
    return {
      component: undefined
    };
  },
  mounted() {
    this.render();
  },
  unmounted() {},
  methods: {
    render() {
      let module = this.parent.$parent.table.module;
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
      const createNode = () => {
        const nodes = [];
        if (colDef.slotName === "operations") {
          const actions = [...module.actions, ...Object.values(module.default.actions || {})];

          for (let index = 0; index < actions.length; index++) {
            const item = actions[index];
            if (typeof item.vIf === "function") {
              const _if = item.vIf(scope);
              if (!_if) continue;
            }
            const props = {
              type: "text",
              onClick: (event) => {
                item.click(scope, event);
              },
              size: "small"
            };
            if (typeof item.provideProps === "function") {
              const prop = item.provideProps(scope);
              Object.assign(props, prop);
            }
            const node = createVNode(ElButton, props, [createTextVNode(item.name)]);
            nodes.push(node);
          }
        }
        if (typeof slotsFunc === "function") {
          this.component = createVNode("div", null, [...nodes, ...slotsFunc({ scope })]);
        } else {
          this.component = createTextVNode(data[colDef.field]);
        }
      };
      createNode();
      watch(data, () => {
        createNode();
      });
    }
  }
});
</script>

<style lang="less" scoped></style>
