/*
 * @Description: 存储方法封装
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-06-29 10:26:44
 * @LastEditTime: 2021-07-14 13:49:01
 * @LastEditors: 张泽锋
 */
import config from "@/config";
import functionList from "./function";
import Cookies from "js-cookie";
/**
 * @description: 二次封装本地存储 set操作不允许进行根级别的存储 只能以规定的变量名开头
 * @version: 1.0.0
 * @param {*} key 存储名称
 * @param {*} data 存储数据
 * @author: 张泽锋
 * @Date: 2021-06-29 10:24:08
 */
function setLocalStorage(key, data) {
  const dataType = functionList.dataType(data);
  data = dataType === "String" ? data : JSON.stringify(data);
  localStorage.setItem(composeKey(key), data);
}
/**
 * @description: 二次封装本地存储
 * @version: 1.0.0
 * @param {*} key 存储数据名称
 * @param {*} isCombination 是否拼接key
 * @author: 张泽锋
 * @Date: 2021-06-29 10:24:35
 */
function getLocalStorage(key, isCombination = true) {
  const combinationKey = isCombination ? composeKey(key) : key;
  const data = localStorage.getItem(combinationKey);
  return JSON.parse(data);
}
/**
 * @description: 二次封装本地存储  set操作不允许进行根级别的存储 只能以规定的变量名开头
 * @version: 1.0.0
 * @param {*} key 存储名称
 * @param {*} data 存储数据
 * @author: 张泽锋
 * @Date: 2021-06-29 10:24:08
 */
function setSessionStorage(key, data) {
  const dataType = functionList.dataType(data);
  data = dataType === "String" ? data : JSON.stringify(data);
  sessionStorage.setItem(composeKey(key), data);
}
/**
 * @description: 二次封装本地存储
 * @version: 1.0.0
 * @param {*} key 存储数据名称
 * @author: 张泽锋
 * @Date: 2021-06-29 10:24:35
 */
function getSessionStorage(key, type) {
  const data = sessionStorage.getItem(composeKey(key));
  return type === "String" ? data : JSON.parse(data);
}
function removeLocalStorage(key) {
  localStorage.removeItem(composeKey(key));
}
function removeSessionStorage(key) {
  sessionStorage.removeItem(composeKey(key));
}
function composeKey(key) {
  return `${config.virtualDirectory}-${key}`;
}
function clearCookies() {
  Cookies.remove("sxmanage-username", { path: "" });
  Cookies.remove("sxmanage-auth-token", { path: "" });
  // var cookies = document.cookie.split(";");
  // for (var i = 0; i < cookies.length; i++) {
  //   var cookie = cookies[i];
  //   var eqPos = cookie.indexOf("=");
  // }
}
export default {
  setLocalStorage,
  getLocalStorage,
  setSessionStorage,
  getSessionStorage,
  removeLocalStorage,
  removeSessionStorage,
  clearCookies,
};
