/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-07-14 17:19:38
 * @LastEditTime: 2021-07-26 11:47:42
 * @LastEditors: 张泽锋
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import globalCompoes from "./libs/plugins/globalCompoes.js";
import store from "./store";
import "@/libs/plugins/console.js";
// import "@/libs/plugins/element-plugin.js";
import "./assets/css/element-variables.scss";
import util from "@/libs/utils";
import request from "@/libs/http/request";
import config from "@/config/index";
import Directives from "@/libs/directives";

globalCompoes(Vue);
Vue.config.errorHandler = function (err, vm, info) {
  console.log("errorHandle:", err);
}
Vue.prototype.$util = util;
Vue.prototype.$http = request;
Vue.prototype.$config = config;
Vue.use(Directives);
Vue.config.productionTip = false;
Vue.config.devtools = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
