/*
 * @Description: 自定义正整数指令
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-05-20 16:34:46
 * @LastEditTime: 2021-05-25 15:22:40
 * @LastEditors: 张泽锋
 */

const init = {
  bind: function (el) {
    const input = el.getElementsByTagName("input")[0];
    input.onkeyup = function () {
      if (input.value.length === 1) {
        input.value = input.value.replace(/[^0-9]/g, "");
      } else {
        input.value = input.value.replace(/[^\d]/g, "");
      }
      trigger(input, "input");
    };
    input.onblur = function () {
      if (input.value.length === 1) {
        input.value = input.value.replace(/[^0-9]/g, "");
      } else {
        input.value = input.value.replace(/[^\d]/g, "");
      }
      trigger(input, "input");
    };
  },
};

const trigger = (el, type) => {
  const e = document.createEvent("HTMLEvents");
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
};

export default init;
