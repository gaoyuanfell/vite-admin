<template>
  <div class="cbs-component">
    <template v-for="item of components" :key="item.ref">
      <component
        :ref="item.ref"
        :is="item.component"
        v-bind="item.props"
      ></component>
    </template>
  </div>
</template>

<script>
import { defineComponent, markRaw } from "vue";
import emitter from "@/utils/mitt";
export default defineComponent({
  data() {
    return {
      components: []
    };
  },
  created() {
    emitter.on("push-component", ({ component, props, ref }) => {
      this.components.push(
        markRaw({
          component,
          props,
          ref
        })
      );
      const destroy = (ref) => {
        return () => {
          const index = this.components.findIndex((com) => com.ref === ref);
          if (index !== -1) this.components.splice(index, 1);
        };
      };
      this.$nextTick(() => {
        emitter.emit(ref, { vim: this.$refs[ref], destroy: destroy(ref) });
      });
    });
  }
});
</script>

<style lang="less" scoped></style>
