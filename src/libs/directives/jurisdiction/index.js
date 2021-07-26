/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-05-20 16:34:46
 * @LastEditTime: 2021-07-21 10:15:49
 * @LastEditors: 张泽锋
 */

const permission = {
  inserted(el, binding) {
    let jurisdiction = JSON.parse(localStorage.getItem("authorityCode"));
    let btnValue = binding.value;
    if (jurisdiction) {
      let hasBtn =
        jurisdiction.findIndex((val) => val == btnValue) == -1 ? false : true;
      if (!hasBtn) {
        el.parentNode.removeChild(el);
      }
    }
  },
};
export default permission;
