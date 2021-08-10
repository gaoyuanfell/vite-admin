<template>
  <el-dialog title="提示" v-model="dialogVisible" v-bind="$attrs" width="30%">
    <span>这是一段信息</span>
    <template #footer>
      <el-button icon="el-icon-close" size="small" @click="cancel"
        >取 消</el-button
      >
      <el-button
        icon="el-icon-check"
        size="small"
        type="primary"
        :loading="loading"
        @click="confirm"
        >确 定</el-button
      >
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  emits: ["resolve", "reject"],
  data() {
    return {
      dialogVisible: false,
      loading: false
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
