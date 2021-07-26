<!--
 * @Description: 
 * @Version: 1.2.0
 * @Author: 张泽锋
 * @LastEditors: 张泽锋
 * @Date: 2020-08-17 17:20:13
-->
<template>
  <div class="pa_20" ref="formView">
    <eb-form
      ref="childRules"
      :data="formData"
      :rule="rule"
      :layout="layout"
      :formValue="formValue"
      @slotIcon="slotIcon"
    ></eb-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      layout: {
        gutter: 0,
        span: 24,
        size: "",
        padding: "0",
        labelWidth: "90px",
      },
      formData: [
        {
          label: "旧密码",
          type: "password",
          placeholder: "请输入旧密码",
          value: "",
          maxlength: 16,
          disabled: false,
          require: false,
          prop: "OldLoginPassWord",
          icon: "iconfont icon-yincang",
        },
        {
          label: "新密码",
          type: "password",
          placeholder: "请输入新密码",
          value: "",
          maxlength: 16,
          disabled: false,
          require: false,
          prop: "NewLoginPassWord",
          icon: "iconfont icon-yincang",
        },
        {
          label: "确认新密码",
          type: "password",
          placeholder: "请再次输入新密码",
          value: "",
          maxlength: 16,
          disabled: false,
          require: false,
          prop: "RepLoginPassWord",
          icon: "iconfont icon-yincang",
        },
      ],
      rule: {
        OldLoginPassWord: [
          {
            required: true,
            message: "请输入旧密码",
            trigger: "blur",
          },
        ],
        NewLoginPassWord: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur",
          },
        ],
        RepLoginPassWord: [
          {
            required: true,
            message: "请再次输入新密码",
            trigger: "blur",
          },
          // { validator: validateRepeatPass, trigger: "blur", required: true },
        ],
      },
      formValue: {},
      infoId: "",
    };
  },
  mounted() {},
  methods: {
    slotIcon(data) {
      const type = data.data.type;
      const newType = type === "password" ? "text" : "password";
      const newIcon =
        type === "password" ? "iconfont icon-chakan" : "iconfont icon-yincang";
      this.$refs["childRules"].setInputIcon(newType, newIcon, data.data.prop);
    },
    validateForm() {
      const ruleForm = this.$refs["childRules"].getRuleForm();
      let flag = this.$refs["childRules"].submitForm();
      if (!flag) return false;
      if (ruleForm.NewLoginPassWord !== ruleForm.RepLoginPassWord) {
        this.$message.closeAll();
        this.$message.error("两次输入密码不一致!");
        return false;
      } else {
        return ruleForm;
      }
    },
  },
};
</script>
