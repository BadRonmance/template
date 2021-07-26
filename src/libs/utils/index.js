/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-05-18 11:06:16
 * @LastEditTime: 2021-07-05 17:28:11
 * @LastEditors: 张泽锋
 */

import String from "./String";
import functionList from "./function";
import auth from "./auth";
import mobile from "./mobile";
import email from "./email";
import idCard from "./idCard";
import tree from "./tree";
import letter from "./letter";
import array from "./array";
import date from "./date";
import number from "./number";
import storage from "./storage";
import transfer from "./transfer";

export default {
  ...transfer,
  ...String,
  ...functionList,
  ...auth,
  ...mobile,
  ...email,
  ...tree,
  ...idCard,
  ...letter,
  ...array,
  ...date,
  ...number,
  ...storage,
};
