/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-05-20 16:34:46
 * @LastEditTime: 2021-07-21 10:16:01
 * @LastEditors: 张泽锋
 */
const debounce = {
  inserted: function (el, binding) {
    let timmer;

    el.addEventListener("click", () => {
      if (timmer) {
        clearTimeout(timmer);
      } else {
        binding.value();
      }
      timmer = setTimeout(() => {
        binding.value();
      }, 2000);
    });
  },
};
export default debounce;
