/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-05-20 16:34:46
 * @LastEditTime: 2021-05-21 09:28:17
 * @LastEditors: 张泽锋
 */
const vCopy = {
  bind(el, { value }) {
    el.$value = value;
    el.handler = () => {
      if (!el.$value) {
        console.log("无复制内容");
        return;
      }
      const textarea = document.createElement("textarea");
      textarea.readOnly = "readonly";
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      textarea.value = el.$value;
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);
      const result = document.execCommand("Copy");
      if (result) {
        console.log("复制成功");
      }
      document.body.removeChild(textarea);
    };
    el.addEventListener("click", el.handler);
  },
  componentUpdated(el, { value }) {
    el.$value = value;
  },
  unbind(el) {
    el.removeEventListener("click", el.handler);
  },
};

export default vCopy;
