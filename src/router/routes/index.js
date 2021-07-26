/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-07-19 10:38:51
 * @LastEditTime: 2021-07-20 09:37:20
 * @LastEditors: 张泽锋
 */

import combinationCmp from "./combination-cmp";
export default [
  {
    path: "/replayContent",
    name: "replayContent",
    meta: {
      title: "组件",
    },
    component: () => import("@/views/replay-content/index.vue"),
  },
  ...combinationCmp,
];
