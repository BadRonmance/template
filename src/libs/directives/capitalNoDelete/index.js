/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-07-21 10:15:25
 * @LastEditTime: 2021-07-21 10:16:11
 * @LastEditors: 张泽锋
 */
const capitalNoDelete = {
  bind: function (el) {
    const input = el.getElementsByTagName("input")[0];
    input.onblur = function () {
      input.value = input.value.toUpperCase();
    };
    trigger(input, "input");
  },
};
const trigger = (el, type) => {
  const e = document.createEvent("HTMLEvents");
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
};

export default capitalNoDelete;
