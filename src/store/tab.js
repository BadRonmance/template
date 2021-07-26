/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-05-21 10:42:07
 * @LastEditTime: 2021-07-19 11:34:22
 * @LastEditors: 张泽锋
 */

import config from "@/config";
console.log(config);
export default {
  state: {
    openTab: config.defaultTab,
    activeIndex: 0,
    deleteRouteName: "",
  },
  mutations: {
    // 删除tabs
    delete_tabs(state, route) {
      let index = 0;
      if (state.openTab.length === 1) return;
      for (let option of state.openTab) {
        if (option.route === route) {
          state.deleteRouteName = option.cmpName || false;
          break;
        }
        index++;
      }
      state.openTab.splice(index, 1);
    },
    /**
     * @description: 根据路由匹配更新某一条tab数据
     * @version: 1.0.0
     * @param {*} state
     * @param {*} route
     * @return {*}
     * @author: 张泽锋
     * @Date: 2021-05-25 13:18:55
     */
    update_tabs(state, router) {
      if (state.openTab.length === 0) return;
      const index = state.openTab.findIndex((val) => val.route == router.path);
      if (index === -1) return;
      state.openTab[index].name = router.name;
    },
    // 删除首页以外的所有tab
    delete_all_tabs(state) {
      const route = state.openTab[0].route;
      state.openTab = state.openTab.filter((item) => item.route === route);
    },
    // 删除首页以外的其他tab
    delete_other_tabs(state, route) {
      this.state.openTab = state.openTab.filter(
        (item) => item.route === route || item.route === "/Home"
      );
    },
    // 添加tabs
    add_tabs(state, p) {
      let data = p.data || p;
      state.openTab = state.openTab.filter(
        (item) => item.route !== data.route && item.route !== "/login"
      );
      if (p.data) {
        state.openTab.splice(p.ix * 1, 0, data);
      } else {
        state.openTab.push(data);
      }
      state.deleteRouteName = false;
    },
    // 设置当前激活的tab
    set_active_index(state, index) {
      state.activeIndex = index;
    },
  },
  actions: {},
};
