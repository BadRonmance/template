/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-06-01 16:52:16
 * @LastEditTime: 2021-07-05 14:58:24
 * @LastEditors: 张泽锋
 */
/**
 * @description: 字母组合类型的校验
 * @version: 1.0.0
 * @param: {*}
 * @author: 张豪
 * @time: 2021-06-01 13:49:25
 */

"use strict";

exports.__esModule = true;
module.exports = {
  englishLetter,
  letterNumber,
  checkRate,
};
function englishLetter(rule, value, callback) {
  const regLetter = /^[a-zA-Z]+$/;
  if (regLetter.test(value)) {
    callback();
  } else {
    return callback(new Error("请输入英文字母"));
  }
}

function letterNumber(rule, value, callback) {
  const regLetterNumber = /^(?=.*[A-Z])(?=.*\d)[A-Z\d]+$/;
  if (regLetterNumber.test(value)) {
    callback();
  } else {
    return callback(new Error("请输入大写字母与数字组合"));
  }
}
function checkRate(rule, value, callback) {
  const regLetterNumber = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]*$/;
  if (regLetterNumber.test(value)) {
    callback();
  } else {
    return callback(new Error("请输入字母与数字组合"));
  }
}
