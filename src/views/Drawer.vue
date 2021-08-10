<template>
  <el-drawer title="我是标题" size="70%" v-model="dialogVisible" :with-header="false">
    <span>我来啦!</span>
  </el-drawer>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  emits: ["resolve", "reject"],
  data() {
    return {
      dialogVisible: false,
    };
  },
  mounted() {
    console.info("mounted");
  },
  unmounted() {
    console.info("unmounted");
  },
  methods: {
    cancel() {
      this.$emit("resolve", false);
    },
    confirm() {
      this.$emit("reject", true);
    }
  }
});
</script>

<style lang="less" scoped></style>
