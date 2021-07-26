/*
 * @Author: your name
 * @Date: 2021-04-19 15:34:17
 * @LastEditTime: 2021-07-21 10:20:13
 * @LastEditors: 张泽锋
 * @Description: In User Settings Edit
 * @FilePath: \dianzimingpian-pc\src\libs\directives\throttle\index.js
 */
const throttle = {
  inserted: function (el, binding) {
    let timmer = true;
    el.addEventListener("click", () => {
      if (timmer) {
        binding.value();
        timmer = false;
        setTimeout(() => {
          timmer = true;
        }, 2000);
      }
    });
  },
};
export default throttle;
