/*
 * @Author: your name
 * @Date: 2021-04-12 18:25:28
 * @LastEditTime: 2021-06-03 09:15:55
 * @LastEditors: 张泽锋
 * @Description: In User Settings Edit
 * @FilePath: \dianzimingpian-pc\src\libs\utils\validate\number.js
 */
"use strict";

exports.__esModule = true;
module.exports = {
  isNumeric,
  isNaN,
  isNumer,
  isNumerP,
  checkPswd,
};

function isNumeric(val) {
  return /^\d+(\.\d+)?$/.test(val);
}
function isNumer(rule, value, callback) {
  if (!value && value !== 0) {
    return callback(new Error("请输入内容"));
  } else {
    const reg = /^\d+(\.\d+)?$/;
    if (reg.test(value)) {
      callback();
    } else {
      return callback(new Error("请输入正确的数字"));
    }
  }
}
function isNumerP(rule, value, callback) {
  if (!value && value !== 0) {
    return callback(new Error("请输入内容"));
  } else {
    const reg = /[^1-9]/;
    if (reg.test(value)) {
      callback();
    } else {
      return callback(new Error("请输入正确的数字"));
    }
  }
}
function isNaN(val) {
  if (Number.isNaN) {
    return Number.isNaN(val);
  } // eslint-disable-next-line no-self-compare

  return val !== val;
}
function checkPswd(rule, value, callback) {
  if (!value && value !== 0) {
    return callback(new Error("请输入内容"));
  } else {
    const reg = /^[\u4e00-\u9fa5]{0,}$/;
    if (!reg.test(value) && value.length >= 6 && value.length < 17) {
      callback();
    } else {
      return callback(new Error("只能输入6-16位数字、字母、符号"));
    }
  }
}
// "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\\W]{6,18}$"
