/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-07-20 16:44:59
 * @LastEditTime: 2021-07-20 16:46:15
 * @LastEditors: 张泽锋
 */

import SxModel from "./src/model";

/* istanbul ignore next */
SxModel.install = function (Vue) {
  Vue.component(SxModel.name, SxModel);
};

export default SxModel;
