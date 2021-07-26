/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-06-03 09:09:37
 * @LastEditTime: 2021-06-17 10:51:30
 * @LastEditors: 张泽锋
 */
"use strict";

exports.__esModule = true;
module.exports = {
  isDate,
  convertDate,
  formatDate,
  initDate,
  checkDate,
};

var _number = require("./number");
/**
 * @description: 判断数据是否是时间格式
 * @version: 1.0.0
 * @param {*} val 数据
 * @return {*} Boolean
 * @author: 张泽锋
 * @Date: 2021-06-03 09:43:21
 */
function isDate(val) {
  return (
    Object.prototype.toString.call(val) === "[object Date]" &&
    !(0, _number.isNaN)(val.getTime())
  );
}
/**
 * @description: 时间初始化
 * @version: 1.0.0
 * @param {*} date
 * @param {*} type all  YYYY-MM-DD YYYY-MM-DD HH:MM HH:MM:SS T
 * @return {*}
 * @author: 张泽锋
 * @Date: 2021-04-08 17:59:34
 */
function convertDate(date, type = "all") {
  if (date === null) {
    return "";
  }
  // if (date.indexOf("T") != -1) {
  //   date = date.replace("T", " ");
  // }
  date = new Date(date);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  if (type == "all") {
    return (
      year +
      "-" +
      formatTen(month) +
      "-" +
      formatTen(day) +
      " " +
      formatTen(hour) +
      ":" +
      formatTen(minute) +
      ":" +
      formatTen(second)
    );
  }
  if (type == "YYYY-MM-DD") {
    return year + "-" + formatTen(month) + "-" + formatTen(day);
  }
  if (type == "YYYY-MM-DD HH:MM") {
    return (
      year +
      "-" +
      formatTen(month) +
      "-" +
      formatTen(day) +
      " " +
      formatTen(hour) +
      ":" +
      formatTen(minute)
    );
  }
  if (type == "YYYY-MM-DD HH:MM:SS") {
    return (
      year +
      "-" +
      formatTen(month) +
      "-" +
      formatTen(day) +
      " " +
      formatTen(hour) +
      ":" +
      formatTen(minute) +
      ":" +
      formatTen(second)
    );
  }
  if (type == "HH:MM:SS") {
    return formatTen(hour) + ":" + formatTen(minute) + ":" + formatTen(second);
  }
}

/**
 * @description: 当前时间转换时区时间
 * @version: 1.0.0
 * @param {*} date
 * @return {*}
 * @author: 张泽锋
 * @Date: 2021-04-09 16:19:27
 */
function formatDate(date) {
  date = new Date(date);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return (
    year +
    "-" +
    formatTen(month) +
    "-" +
    formatTen(day) +
    "T" +
    formatTen(hour) +
    ":" +
    formatTen(minute) +
    ":" +
    formatTen(second)
  );
}
function formatTen(num) {
  return num > 9 ? `${num}` : `0${num}`;
}
function initDate() {
  var date = new Date();
  //年
  var year = date.getFullYear();
  //月
  var month = formatTen(date.getMonth() + 1);
  //日
  var day = formatTen(date.getDate());
  //时
  var hh = formatTen(date.getHours());
  //分
  var mm = formatTen(date.getMinutes());
  //秒
  var ss = formatTen(date.getSeconds());
  var rq = year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss;
  return rq;
}
/**
 * @description: 校验时间大小
 * @version: 1.0.0
 * @param {*} date 时间一
 * @param {*} date1 时间二
 * @return {Boolean} 时间二大于时间一则返回true
 * @author: 张泽锋
 * @Date: 2021-06-17 10:45:09
 */
function checkDate(date, date1) {
  date = new Date(date);
  date1 = new Date(date1);
  if (date.getTime() - date1.getTime() <= 0) {
    return true;
  } else {
    return false;
  }
}
