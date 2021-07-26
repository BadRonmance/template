/*
 * @Author: your name
 * @Date: 2021-04-12 18:25:28
 * @LastEditTime: 2021-06-10 14:59:48
 * @LastEditors: 张泽锋
 * @Description: In User Settings Edit
 * @FilePath: \dianzimingpian-pc\src\libs\utils\validate\mobile.js
 */
"use strict";

exports.__esModule = true;
module.exports = {
  isMobile,
  checkPhone,
  checkMPhone,
  isLandline,
  checkPhoneAndLandline,
};

function isMobile(value) {
  value = value.replace(/[^-|\d]/g, "");
  return (
    /^((\+86)|(86))?(1)\d{10}$/.test(value) || /^0[0-9-]{10,13}$/.test(value)
  );
}
/**
 * @description: 是否是座机
 * @version: 1.0.0
 * @param {*} value 参数值
 * @return {*}
 * @author: 张泽锋
 * @Date: 2021-06-10 14:56:14
 */
function isLandline(value) {
  value = value.replace(/[^-|\d]/g, "");
  var isMob = /0\d{2,3}-\d{7,8}/;
  return isMob.test(value);
}
/**
 * @description: 手机号校验
 * @version: 1.0.0
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 * @return {*}
 * @author: 张泽锋
 * @Date: 2021-04-09 16:20:11
 */
function checkMPhone(rule, value, callback) {
  if (!value) {
    return callback(new Error("手机号不能为空"));
  } else {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
    if (reg.test(value)) {
      callback();
    } else {
      return callback(new Error("请输入正确的手机号"));
    }
  }
}

function checkPhone(rule, value, callback) {
  if (!value) {
    return callback(new Error("电话号码不能为空"));
  } else {
    const regPhone = /^(\d{10}|\d{11})$/;
    // const regFix =/^((\d{3,4}-)|\d{3.4}-)?\d{10,11}$/;
    if (regPhone.test(value)) {
      callback();
    } else {
      return callback(new Error("请输入正确的电话号码"));
    }
  }
}
function checkPhoneAndLandline(rule, value, callback) {
  if (!value) {
    return callback(new Error("电话号码不能为空"));
  } else {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
    if (reg.test(value) || isLandline(value)) {
      callback();
    } else {
      return callback(new Error("请输入正确的电话号码"));
    }
  }
}
