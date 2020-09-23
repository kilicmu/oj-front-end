import Vue from "vue";
// import ViewUI from 'view-design'
import {
  Button,
  Input,
  Col,
  Row,
  Card,
  Tag,
  Menu,
  MenuItem,
  Icon,
  MenuGroup,
  Layout,
  Submenu,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Divider,
  Modal,
  Breadcrumb,
  Content,
  BackTop,
  Poptip,
  Tooltip,
  Page,
  Time,
  Checkbox,
  Circle,
  Message,
  FormItem,
  Form,
  Switch,
  Upload,
  Select,
  Option,
} from "view-design";
import List from "view-design/src/components/list/list.vue";
import ListItem from "view-design/src/components/list/list-item.vue";

import "view-design/dist/styles/iview.css";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import api from "@/api";
import echarts from "@/utils/echartUtils";
import "@/utils/filters";
import prompt from "@/utils/prompt";
import VueClipboard from "vue-clipboard2";

Vue.use(api);
Vue.use(echarts);
Vue.use(prompt);
Vue.use(VueClipboard);
// Vue.use(ViewUI)

Vue.config.productionTip = false;
Vue.prototype.$Message = Message;
Vue.prototype.$Modal = Modal;
Vue.prototype.$serverAddress = `http://127.0.0.1:3000`;

Vue.component("Button", Button);
Vue.component("Input", Input);
Vue.component("Col", Col);
Vue.component("Row", Row);
Vue.component("Card", Card);
Vue.component("Tag", Tag);
Vue.component("Menu", Menu);
Vue.component("MenuItem", MenuItem);
Vue.component("Icon", Icon);
Vue.component("MenuGroup", MenuGroup);
Vue.component("Layout", Layout);
Vue.component("Submenu", Submenu);
Vue.component("Dropdown", Dropdown);
Vue.component("DropdownItem", DropdownItem);
Vue.component("DropdownMenu", DropdownMenu);
Vue.component("Divider", Divider);
Vue.component("Modal", Modal);
Vue.component("Breadcrumb", Breadcrumb);
Vue.component("Content", Content);
Vue.component("BackTop", BackTop);
Vue.component("Poptip", Poptip);
Vue.component("Tooltip", Tooltip);
Vue.component("List", List);
Vue.component("Page", Page);
Vue.component("ListItem", ListItem);
Vue.component("Time", Time);
Vue.component("Checkbox", Checkbox);
Vue.component("i-circle", Circle);
Vue.component("Form", Form);
Vue.component("FormItem", FormItem);
Vue.component("i-switch", Switch);
Vue.component("Upload", Upload);
Vue.component("Select", Select);
Vue.component("Option", Option);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
