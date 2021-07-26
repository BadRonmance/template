/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-07-15 16:43:19
 * @LastEditTime: 2021-07-15 16:44:14
 * @LastEditors: 张泽锋
 */

import SxDialog from "./src/dialog";

/* istanbul ignore next */
SxDialog.install = function (Vue) {
  Vue.component(SxDialog.name, SxDialog);
};

export default SxDialog;
