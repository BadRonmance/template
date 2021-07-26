<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-07-07 09:46:59
 * @LastEditTime: 2021-07-23 10:16:19
 * @LastEditors: 张泽锋
-->
<template>
  <div class="wid">
    <el-form
      v-if="initStatus"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="wid"
      :label-width="layout.labelWidth || '100px'"
    >
      <el-row :gutter="layout.gutter" class="wid">
        <el-col
          :span="item.span || layout.span"
          v-show="item.show"
          v-for="(item, index) in FormData"
          :key="`${item.prop}-${item.show}`"
        >
          <template v-if="item.type !== 'slot'">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type !== 'childSlot'">
                <form-item
                  :index="index"
                  v-model="ruleForm[item.prop]"
                  :data="item"
                  @input="input"
                  @handleChange="handleChange"
                ></form-item>
              </template>
              <template v-else>
                <slot :name="item.prop" :data="item"></slot>
              </template>
            </el-form-item>
          </template>
          <template v-else>
            <slot :name="item.prop" :data="item"></slot>
          </template>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import formItem from "./form-item";
export default {
  name: "sx-form",
  components: { formItem },
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    layout: {
      type: Object,
      default: () => {
        return {
          gutter: 20,
          span: 6,
          size: "",
        };
      },
    },
    formValue: Object,
    rule: Object,
  },
  data() {
    return {
      initStatus: false,
      ruleForm: {},
      FormData: [],
      rules: {},
      FormTypeData: {
        "input-string": "",
        "input-number": 0,
        childSlot: null,
        slot: null,
        select: null,
        radio: null,
        timeSelect: null,
        timePicker: null,
        datePicker: null,
        "upload-file": [],
      },
    };
  },
  mounted() {
    this.initForm();
  },
  methods: {
    /**
     * @description: 初始化表单数据
     * @version: 1.0.0
     * @param {*}
     * @return {*}
     * @author: 张泽锋
     * @Date: 2021-07-20 13:59:52
     */
    initForm() {
      let result = {};
      this.FormData = this.$util.deepcopy(this.data);
      this.rules = this.rule;
      this.FormData.map((item) => {
        result[item.prop] = this.FormTypeData[item.type];
      });
      this.ruleForm = result;
      this.initStatus = true;
    },
    handleChange(event) {
      this.setRuleFormPropValue(event);
    },
    input(event) {
      this.setRuleFormPropValue(event);
    },
    setRuleFormPropValue(event) {
      this.ruleForm[event.target.prop] =
        event.target.value === null
          ? this.FormTypeData[event.target.type]
          : event.target.value;
    },
    setValue(data) {
      const valType = this.formType[data.type];
      if (this.$util.dataType(data.value) !== valType) {
        const value = this.dataType[valType];
        return value;
      } else {
        return data.value;
      }
    },
    /**
     * @description: 对单个表单值进行赋值
     * @version: 1.0.0
     * @param {*} prop
     * @param {*} val
     * @return {*}
     * @author: 张泽锋
     * @Date: 2021-06-11 10:46:54
     */
    setFromValue({ prop, value }) {
      // if (!this.ruleForm[prop]) {
      //   console.log(this.ruleForm[prop]);
      //   console.error(`表单数据中未查询到属性为${prop}的数据`);
      //   return;
      // }
      this.ruleForm[prop] = value;
      console.log(this.ruleForm);
      this.$forceUpdate();
    },
    /**
     * @description: 设置单个form-item数据
     * @version: 1.0.0
     * @param {*} data
     * @param {*} prop
     * @return {*}
     * @author: 张泽锋
     * @Date: 2021-04-08 18:44:53
     */
    setFormItemData({ data, prop, key = "selectData" }) {
      const index = this.FormData.findIndex((val) => val.prop === prop);
      if (index === -1) {
        console.error(`表单数据中未查询到属性为${prop}的数据`);
        return;
      }
      this.FormData[index][key] = data;
      this.$forceUpdate();
    },
    /**
     * @description: 设置单个组件是由禁用
     * @version: 1.0.0
     * @param data
     * @param {*} prop 参数名称
     * @author: 张泽锋
     * @Date: 2021-04-08 18:44:53
     */
    setDisabled(prop, status) {
      const index = this.FormData.findIndex((val) => val.prop === prop);
      this.FormData[index].disabled =
        status == undefined ? this.FormData[index].disabled || false : status;
      this.FormData[index].disabled = !this.FormData[index].disabled;
      this.$forceUpdate();
    },
    /**
     * @description: 设置单个input组件 type和icon
     * @version: 1.0.0
     * @param {*} type  数据类型
     * @param {*} icon  icon类名
     * @param {*} prop  数据prop参数
     * @return {*}
     * @author: 张泽锋
     * @Date: 2021-05-21 10:17:22
     */
    setInputIcon(type, icon, prop) {
      const index = this.formData.findIndex((val) => val.prop === prop);
      this.formData[index].type = type;
      this.formData[index].icon = icon;
      this.$forceUpdate();
    },
    /**
     * @description: 单一尾部icon点击事件
     * @version: 1.0.0
     * @param {*} data
     * @param {*} index
     * @return {*}
     * @author: 张泽锋
     * @Date: 2021-07-20 13:14:27
     */
    slotIcon(data, index) {
      this.$emit("slotIcon", {
        data: data,
        index: index,
      });
    },
    /**
     * @description: 获取表单参数集合
     * @version: 1.0.0
     * @return {*}
     * @author: 张泽锋
     * @Date: 2021-05-24 16:51:42
     */
    getRuleForm() {
      return this.ruleForm;
    },
    /**
     * @description: 表单提交
     * @version: 1.0.0
     * @return {*}
     * @author: 张泽锋
     * @Date: 2021-05-24 16:51:52
     */
    submitForm() {
      let flag = null;
      for (let i in this.ruleForm) {
        if (this.$util.dataType(this.ruleForm[i]) === "String") {
          this.ruleForm[i] =
            this.ruleForm[i].trim() === "" ? "" : this.ruleForm[i];
        }
      }
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          flag = this.ruleForm;
        } else {
          flag = false;
        }
      });
      return flag;
    },
  },
};
</script>
<style lang="scss" scoped>
.el-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
