<template>
  <h1>HOME</h1>
  <el-button type="primary" @click="test">默认按钮</el-button>
  <el-button type="primary" @click="test2">默认按钮2</el-button>
  <router-link to="/grid">grid</router-link>
</template>

<script>
import { defineComponent, reactive } from "vue";
import { nav } from "@/utils/nav";
import Dialog from "./Dialog.vue";
import Drawer from "./Drawer.vue";
export default defineComponent({
  components: {
    Dialog
  },
  data() {
    return {
      com: Dialog
    };
  },
  mounted() {
    console.info("mounted");
  },
  unmounted() {
    console.info("unmounted");
  },
  methods: {
    test() {
      const obj = reactive({ title: "Dialog 标题" });
      nav.dialog(Dialog, obj);
      setInterval(() => {
        obj.title = "Dialog 标题" + Date.now();
      }, 1000);
    },
    test2() {
      nav.dialog(Drawer, { title: "Dialog 标题1111111" });
    }
  }
});
</script>

<style lang="less" scoped></style>
