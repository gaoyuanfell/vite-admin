<template>
  <img ref="img" @load="load" src="img/1.jpg" />
</template>

<script>
import { defineComponent } from "vue";
import exif from "exif-js";
export default defineComponent({
  mounted() {},
  methods: {
    load() {
      exif.getData(this.$refs.img, function () {
        var allMetaData = exif.getAllTags(this);
        console.info(allMetaData);
      });
    }
  }
});
</script>

<style></style>
