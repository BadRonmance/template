/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-07-20 15:32:56
 * @LastEditTime: 2021-07-20 15:33:32
 * @LastEditors: 张泽锋
 */

import SxLoading from "./src/loading";

/* istanbul ignore next */
SxLoading.install = function (Vue) {
  Vue.component(SxLoading.name, SxLoading);
};

export default SxLoading;
