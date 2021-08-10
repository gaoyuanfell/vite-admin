import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";

import 'normalize.css'
import '@/styles/index.scss'

const app = createApp(App);
app.config.productionTip = false;

/** element */
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
app.use(ElementPlus);

/** ant-design */
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
app.use(Antd);

/** component */
import CbsComponent from "@/component/CbsComponent.vue";
import CbsTable from "@/component/CbsTable/index.vue";
app.component("CbsComponent", CbsComponent);
app.component("CbsTable", CbsTable);

app.use(router);
app.mount("#app");
