/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-07-15 16:44:34
 * @LastEditTime: 2021-07-15 16:45:22
 * @LastEditors: 张泽锋
 */

import SxPagination from "./src/pagination";

/* istanbul ignore next */
SxPagination.install = function (Vue) {
  Vue.component(SxPagination.name, SxPagination);
};

export default SxPagination;
