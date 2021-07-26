/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-05-18 10:23:07
 * @LastEditTime: 2021-07-20 09:34:44
 * @LastEditors: 张泽锋
 */
import Vue from "vue";
import Vuex from "vuex";
import tab from "./tab";
import user from "./user";
import config from "@/config";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: `${config.virtualDirectory}-vuex`,
    }),
  ],
  state: {
    ct: "SXCRM",
    cv: "1.0.0",
    storageEvent: [],
    slideConfig: {
      collapse: false,
    },
  },
  getters: {
    authUser: (state) => state.authUser,
    token: (state) => state.token,
    ct: (state) => state.ct,
    cv: (state) => state.cv,
    systems: (state) => state.systems,
    menus: (state) => state.menus,
    functions: (state) => state.functions,
  },
  mutations: {
    // 依次添加录屏数据
    storageEvent(state, data) {
      state.storageEvent.push(data);
    },
    // 重置录屏数据
    resetEvent(state) {
      state.storageEvent = [];
    },
    setCollapse(state, value) {
      state.slideConfig.collapse = value;
    },
  },
  actions: {},
  modules: {
    tab,
    user,
  },
});
