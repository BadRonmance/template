/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-06-01 09:32:21
 * @LastEditTime: 2021-07-22 17:42:09
 * @LastEditors: 张泽锋
 */

export default {
  project: {
    name: "顺心畅游CRM管理系统",
    home: "/CRM_enterpriceManage",
    size: "small",
  },
  virtualDirectory: "crm",
  host: "http://192.168.7.207/",
  defaultTab: [
    {
      name: "组件",
      route: "/combination_form",
      cmpName: "enterpriseList",
    },
  ],
  menu: [
    {
      DefaultIcon: "icon-qiyeguanli",
      DefaultUrl: "1",
      PlatFormType: "SXCRM",
      SortNo: 290,
      SysId: "enterprise",
      SysName: "组件",
      children: [
        {
          MenuId: "CRM_enterpriceManage",
          MenuName: "form表单组合",
          ParentId: "enterpriseList",
          SortNo: "0",
          SysId: "enterprise",
          children: [],
          name: "form表单组合",
          path: "/combination_form",
        },
        {
          MenuId: "CRM_enterpriceManage",
          MenuName: "form表单组合",
          ParentId: "enterpriseList",
          SortNo: "0",
          SysId: "enterprise",
          children: [],
          name: "card",
          path: "/combination_card",
        },
        {
          MenuId: "CRM_enterpriceManage",
          MenuName: "大数据",
          ParentId: "enterpriseList",
          SortNo: "0",
          SysId: "enterprise",
          children: [],
          name: "大数据表格",
          path: "/combination_table",
        },
        {
          MenuId: "CRM_enterpriceManage",
          MenuName: "分页器",
          ParentId: "enterpriseList",
          SortNo: "0",
          SysId: "enterprise",
          children: [],
          name: "分页器",
          path: "/combination_pagination",
        },
      ],
      name: "组件",
      path: "/enterprise",
    },
  ],
};
