/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-06-03 09:09:32
 * @LastEditTime: 2021-06-18 13:48:28
 * @LastEditors: 张泽锋
 */

/**
 * @description: 单一数组去重
 * @version: 1.0.0
 * @param {*} arr 数据源
 * @return {*} Array
 * @author: 张泽锋
 * @Date: 2021-04-09 16:19:09
 */
function unique(arr) {
  return Array.from(new Set(arr));
}

/**
 * @description: 获取数组一不包含数组二的部分
 * @version: 1.0.0
 * @param {*} arr1 数组1
 * @param {*} arr2 数组2
 * @return {*} Array
 * @author: 张泽锋
 * @Date: 2021-04-09 16:18:58
 */
function subSet(arr1, arr2) {
  var set1 = new Set(arr1);
  var set2 = new Set(arr2);

  var subset = [];
  for (let item of set1) {
    if (!set2.has(item)) {
      subset.push(item);
    }
  }
  return subset;
}
/**
 * @description: 获取某个元素在数据中的索引
 * @version: 1.0.0
 * @param {*} data  数据源
 * @param {*} prop 该元素的键名
 * @param {*} value 该元素的值
 * @return {*} Number 返回该元素对应的索引
 * @author: 张泽锋
 * @Date: 2021-04-09 16:28:50
 */
function getArrayIndex(data, prop, value) {
  const index = data.findIndex((val) => val[prop] === value);
  return index;
}
export default {
  unique,
  subSet,
  getArrayIndex,
};
