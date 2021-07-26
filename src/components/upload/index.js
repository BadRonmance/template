/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-07-07 10:54:00
 * @LastEditTime: 2021-07-16 15:26:33
 * @LastEditors: 张泽锋
 */

import SxUpload from "./src/upload";

/* istanbul ignore next */
SxUpload.install = function (Vue) {
  Vue.component(SxUpload.name, SxUpload);
};

export default SxUpload;
