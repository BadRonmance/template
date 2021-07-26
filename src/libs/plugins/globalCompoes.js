/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-07-07 09:49:50
 * @LastEditTime: 2021-07-21 11:01:26
 * @LastEditors: 张泽锋
 */
const set = (vm) => {
  const globalCompoes = require.context("../../components", true, /\.js$/);
  const map = {};
  for (const key of globalCompoes.keys()) {
    const routeData = key.split("/");
    const componentName = routeData[routeData.length - 2];
    map[`sx-${componentName}`] = globalCompoes(key);
  }
  for (const key in map) {
    vm.component(key, map[key].default);
  }
};
export default set;
