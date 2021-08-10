import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import ViteComponents, {
  /* AntDesignVueResolver */ ElementPlusResolver
} from "vite-plugin-components";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  plugins: [
    vue(),
    ViteComponents({
      customComponentResolvers: [
        // AntDesignVueResolver(),
        ElementPlusResolver()
      ]
    })
  ]
});
