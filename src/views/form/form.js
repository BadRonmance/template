/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-07-12 10:01:02
 * @LastEditTime: 2021-07-23 11:07:43
 * @LastEditors: 张泽锋
 */
const formData = [
  {
    prop: "string",
    type: "input-string",
    show: true,
    label: "input-string",
    disabled: false,
    value: "",
    showWord: true,
    text: "el-icon-platform-eleme",
    placeholder: "测试input",
  },
  {
    prop: "number",
    type: "input-number",
    show: true,
    label: "input-number",
    disabled: false,
    value: "",
    placeholder: "测试input",
  },
  {
    prop: "childSlot",
    type: "childSlot",
    show: true,
    label: "childSlot",
    disabled: false,
    placeholder: "form-item插入子元素",
  },
  {
    prop: "formItemSlot",
    type: "slot",
    show: true,
    label: "slot",
    disabled: false,
    span: 24,
    placeholder: "单个form-item为slot",
  },
  {
    prop: "select",
    type: "select",
    show: true,
    label: "select",
    selectData: [
      {
        value: "1",
        label: "黄金糕",
      },
      {
        value: "2",
        label: "双皮奶",
      },
      {
        value: "3",
        label: "蚵仔煎",
      },
    ],
    value: "3",
    disabled: false,
    clearable: false, // 是否可以清空选项
    multiple: false, //是否多选
    placeholder: "selectz",
  },
  {
    prop: "radio",
    type: "radio",
    show: true,
    label: "radio",
    radioData: [
      {
        value: "1",
        label: "黄金糕",
      },
      {
        value: "2",
        label: "双皮奶",
      },
      {
        value: "3",
        label: "蚵仔煎",
      },
    ],
    value: "1",
    disabled: false,
    placeholder: "radio",
  },
  {
    prop: "timeSelect",
    type: "timeSelect",
    show: true, // 置为false的情况下该条数据不会被渲染到视图上
    label: "timeSelect",
    value: "",
    selectOptions: {
      start: "08:30",
      step: "00:10",
      end: "18:30",
    },
    disabled: false,
    clearable: true, // 是否显示清除按钮
    placeholder: "选择时间",
  },
  {
    prop: "timePicker",
    type: "timePicker",
    show: true, // 置为false的情况下该条数据不会被渲染到视图上
    label: "timePicker",
    value: "",
    disabled: false,
    clearable: true, // 是否显示清除按钮
    placeholder: "选择时间范围",
    isRange: true,
    rangeSeparator: "至",
    startPlaceholder: "开始时间",
    endPlaceholder: "结束时间",
  },
  {
    prop: "datePicker",
    type: "datePicker",
    show: true, // 置为false的情况下该条数据不会被渲染到视图上
    label: "datePicker",
    value: "",
    disabled: false,
    clearable: true, // 是否显示清除按钮
    placeholder: "选择日期",
    dateType: "daterange",
    isRange: true,
    rangeSeparator: "至",
    format: "yyyy 第 WW 周",
    startPlaceholder: "开始日期",
    endPlaceholder: "结束日期",
  },
  {
    prop: "upload",
    type: "upload-file",
    show: true, // 置为false的情况下该条数据不会被渲染到视图上
    label: "upload",
    value: "",
    span: 16,
    disabled: true,
    placeholder: "选择日期",
  },
  {
    prop: "cascader",
    type: "cascader",
    show: true, // 置为false的情况下该条数据不会被渲染到视图上
    label: "cascader",
    value: "",
    showAllLevels: false,
    disabled: true,
    clearable: true,
    filterable: true,
    options: [],
    placeholder: "请选择cascader",
  },
  {
    prop: "textarea",
    type: "input-textarea",
    show: true, // 置为false的情况下该条数据不会被渲染到视图上
    label: "textarea",
    value: "",
    showAllLevels: false,
    disabled: false,
    clearable: true,
    filterable: true,
    options: [],
    showWord: true,
    placeholder: "请输入",
  },
];
const formRules = {
  string: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
  select: [{ required: true, message: "请选择活动区域", trigger: "change" }],
  timeSelect: [
    {
      type: "date",
      required: true,
      message: "请选择日期",
      trigger: "change",
    },
  ],
};
export default {
  formData,
  formRules,
};
