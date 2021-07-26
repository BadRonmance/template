/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-07-15 16:43:19
 * @LastEditTime: 2021-07-21 09:45:13
 * @LastEditors: 张泽锋
 */

import SxTable from "./src/index";

/* istanbul ignore next */
SxTable.install = function (Vue) {
  Vue.component(SxTable.name, SxTable);
};

export default SxTable;
