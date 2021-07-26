/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-02-25 11:34:33
 * @LastEditTime: 2021-03-09 14:58:55
 * @LastEditors: 张泽锋
 */
const convertStyle = (val) => {
  const result = [];
  Object.entries(val).map((item) => {
    result.push(`${item[0]}:${item[1]}`);
  });
  return result.join(";");
};

const genID = (length = 18) => {
  return Number(
    Math.random().toString().substr(3, length) + Date.now()
  ).toString(36);
};
export default {
  convertStyle,
  genID,
};
