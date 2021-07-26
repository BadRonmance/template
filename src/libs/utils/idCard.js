/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-05-27 19:40:00
 * @LastEditTime: 2021-05-28 10:58:44
 * @LastEditors: 张泽锋
 */
"use strict";

exports.__esModule = true;
module.exports = {
  ruleCheckIdCard,
  checkIdCard,
};

function checkIdCard(idcode) {
  // alert(idcode)
  //检测身份证号码合法性---全部数字或数字+X/x 18位
  // 加权因子
  var weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  // 校验码
  var check_code = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];

  var code = idcode + "";
  var last = idcode[17]; //最后一位

  var seventeen = code.substring(0, 17);

  // ISO 7064:1983.MOD 11-2
  // 判断最后一位校验码是否正确
  var arr = seventeen.split("");
  var len = arr.length;
  var num = 0;
  for (var i = 0; i < len; i++) {
    num = num + arr[i] * weight_factor[i];
  }

  // 获取余数
  var resisue = num % 11;
  var last_no = check_code[resisue];

  // 格式的正则
  // 正则思路
  /*
  第一位不可能是0
  第二位到第六位可以是0-9
  第七位到第十位是年份，所以七八位为19或者20
  十一位和十二位是月份，这两位是01-12之间的数值
  十三位和十四位是日期，是从01-31之间的数值
  十五，十六，十七都是数字0-9
  十八位可能是数字0-9，也可能是X
  */
  var idcard_patter =
    /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;

  // 判断格式是否正确
  var format = idcard_patter.test(idcode);
  //  alert(format)
  // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
  //  return last === last_no && format ? true : false;
  if (!(format == true && last_no === last)) {
    return false;
  } else {
    return true;
  }
}
/**
 * @description: 邮箱校验
 * @version: 1.0.0
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 * @return {*}
 * @author: 张泽锋
 * @Date: 2021-04-09 16:20:01
 */
function ruleCheckIdCard(rule, value, callback) {
  if (!value) {
    return callback(new Error("身份证号不能为空"));
  } else {
    if (checkIdCard(value)) {
      callback();
    } else {
      return callback(new Error("请输入正确的身份证号"));
    }
  }
}
