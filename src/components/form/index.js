/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-07-07 09:46:50
 * @LastEditTime: 2021-07-07 09:47:41
 * @LastEditors: 张泽锋
 */
import SxForm from "./src/form";

/* istanbul ignore next */
SxForm.install = function (Vue) {
  Vue.component(SxForm.name, SxForm);
};

export default SxForm;
