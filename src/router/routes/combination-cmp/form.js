/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-07-19 10:44:42
 * @LastEditTime: 2021-07-22 15:28:50
 * @LastEditors: 张泽锋
 */

import main from "@/components/layout/content-view/index";
export default [
  {
    path: "/combination_cmp",
    name: "combination_cmp",
    meta: {
      title: "进阶组件",
    },
    component: main,
    children: [
      {
        path: "/combination_form",
        name: "combination_form",
        meta: {
          title: "表单",
          menuName: "combination_form",
          hideTab: false,
          cmpName: "contractList",
          keepAlive: false,
        },
        component: () => import("@/views/form/index.vue"),
      },
      {
        path: "/combination_card",
        name: "combination_card",
        meta: {
          title: "卡片",
          menuName: "combination_card",
          hideTab: false,
          cmpName: "contractList",
          keepAlive: false,
        },
        component: () => import("@/views/card/index.vue"),
      },
      {
        path: "/combination_table",
        name: "combination_table",
        meta: {
          title: "表格",
          menuName: "combination_table",
          hideTab: false,
          cmpName: "contractList",
          keepAlive: false,
        },
        component: () => import("@/views/table/index.vue"),
      },
      {
        path: "/combination_pagination",
        name: "combination_pagination",
        meta: {
          title: "分页器",
          menuName: "combination_pagination",
          hideTab: false,
          cmpName: "contractList",
          keepAlive: false,
        },
        component: () => import("@/views/pagination/index.vue"),
      },
    ],
  },
];
