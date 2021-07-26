/*
 * @Author: your name
 * @Date: 2021-04-12 18:25:28
 * @LastEditTime: 2021-07-22 13:49:11
 * @LastEditors: 张泽锋
 * @Description: In User Settings Edit
 * @FilePath: \dianzimingpian-pc\src\libs\directives\index.js
 */
import copy from "./copy/index";
import permission from "./jurisdiction/index";
import debounce from "./debounce/index";
import throttle from "./throttle/index";
import waterMarker from "./water-marker/index";
import Int from "./init/index";
import Capital from "./capital/index";
import sxloading from "./loading/index";
import loadMoreTable from "./load-more-table/index";
import capitalNoDelete from "@libs/directives/capitalNoDelete";

const directives = {
  copy,
  permission,
  debounce,
  throttle,
  waterMarker,
  Int,
  Capital,
  capitalNoDelete,
  loadMoreTable,
  sxloading,
};

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key]);
    });
  },
};
