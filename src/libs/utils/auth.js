/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-05-18 19:20:22
 * @LastEditTime: 2021-07-15 19:02:39
 * @LastEditors: 张泽锋
 */
import Cookies from "js-cookie";

import storage from "./storage";
const TokenKey = "sxmanage-auth-token";

function getToken() {
  return Cookies.get(TokenKey);
}

function setToken(token) {
  return Cookies.set(TokenKey, token);
}

function removeToken() {
  return Cookies.remove(TokenKey);
}

const userKey = "sxmanage-username";

function getUser() {
  return Cookies.get(userKey);
}

function setUser(user) {
  return Cookies.set(userKey, user);
}

function removeUser() {
  return Cookies.remove(userKey);
}
/**
 * @description: 从存储的方法集合中获取当前页面对应的方法集合
 * @version: 1.0.0
 * @param {*} vm vue实例
 * @param {*} id 需要查询的funcid
 * @param {*} type url 只返回url all返回全部信息
 * @return {*} url、对应的funcid信息、false
 * @author: 张泽锋
 * @Date: 2021-05-31 19:32:13
 */
function getFunc(vm, id, type = "url") {
  let data = storage.getSessionStorage("function");
  let result = data.filter((item) => item.MenuId === vm.$route.meta.menuName);
  result.map((item) => {
    item.url = `${item.ServiceName}/${item.ApiName}`;
  });
  const item = result.find((val) => val.FunctionId === id);
  return type === "all" ? item : type === "url" ? item.url : item || false;
}
/**
 * @description: 从存储的方法集合中获取指定菜单的方法
 * @version: 1.0.0
 * @param {*} vm vue实例
 * @param {*} id 需要查询的funcid
 * @param {*} type url 只返回url all返回全部信息
 * @return {*} url、对应的funcid信息、false
 * @author: 张泽锋
 * @Date: 2021-05-31 19:32:13
 */
function getMenuFunc(menuName, type = "url") {
  let data = storage.getSessionStorage("function");
  let result = data.filter((item) => item.FunctionId === menuName);
  result.map((item) => {
    item.url = `${item.ServiceName}/${item.ApiName}`;
  });
  return type === "all"
    ? result[0]
    : type === "url"
    ? result[0].url
    : result[0] || false;
}
export default {
  getToken,
  setToken,
  removeToken,
  getUser,
  setUser,
  removeUser,
  TokenKey,
  getFunc,
  getMenuFunc,
};
