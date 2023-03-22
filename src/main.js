import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import BlockTitleName from "./components/blockTitleName";
import TitleName from "@/components/titleName.vue";
import STable from "./components/table/";
import router from "./router";

createApp(App)
  .use(store)
  .use(Antd)
  .component("BlockTitleName", BlockTitleName)
  .component("s-Table", STable)
  .component("TitleName", TitleName)
  .use(router)
  .mount("#app");
