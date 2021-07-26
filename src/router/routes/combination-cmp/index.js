/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-07-19 10:44:37
 * @LastEditTime: 2021-07-19 11:33:17
 * @LastEditors: 张泽锋
 */

import main from "../../../components/layout/index";
import form from "./form";
export default [
  {
    path: "/enterprise",
    name: "enterprise",
    meta: {
      title: "组件",
    },
    component: main,
    children: [...form],
  },
];
