/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-07-05 17:27:54
 * @LastEditTime: 2021-07-06 16:15:01
 * @LastEditors: 张泽锋
 */
import Vue from "vue";
const appVue = new Vue();
function $emit(func) {
  return appVue.$emit(func);
}
function $on(func) {
  return new Promise((resolve) => {
    appVue.$on(func, () => {
      resolve(true);
    });
  });
}
export default {
  transfer: appVue,
  $emit,
  $on,
};
