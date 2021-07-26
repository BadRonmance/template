<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-07-07 13:22:13
 * @LastEditTime: 2021-07-23 11:06:45
 * @LastEditors: 张泽锋
-->
<template>
  <section>
    <template v-if="data.type === 'input-string'">
      <el-input
        v-model.trim="formItemValue"
        :disabled="data.disabled"
        @input="input"
        :show-word-limit="data.showWord"
        :placeholder="data.placeholder"
        :maxlength="data.maxlength || 50"
      >
        <!-- 带点击事件的icon -->
        <el-button
          v-if="data.icon && data.icon !== ''"
          @click="slotIcon(data, data.prop)"
          slot="append"
        >
          <span class="iconfont" :class="data.icon"></span>
        </el-button>
        <!-- 仅作展示的icon -->
        <template #suffix>
          <i
            class="padding_right_7"
            v-if="data.suffixIcon"
            :class="data.suffixIcon"
          ></i>
          <span class="padding_right_7" v-if="data.text && data.text !== ''">
            {{ data.text }}
          </span>
        </template>
      </el-input>
    </template>
    <template v-if="data.type === 'input-textarea'">
      <el-input
        class="form_item_child"
        type="textarea"
        v-model.trim="formItemValue"
        :disabled="data.disabled"
        @input="input"
        :show-word-limit="data.showWord"
        :placeholder="data.placeholder"
        :maxlength="data.maxlength || 100"
      ></el-input>
    </template>
    <template v-if="data.type === 'input-number'">
      <el-input-number
        class="form_item_child"
        v-model="formItemValue"
        :disabled="data.disabled"
        :type="data.type"
        @change="handleChange"
        :placeholder="data.placeholder"
        :maxlength="data.maxlength || 50"
      ></el-input-number>
    </template>
    <template v-if="data.type === 'select'">
      <el-select
        class="form_item_child"
        v-model="formItemValue"
        :clearable="data.clearable"
        :multiple="data.multiple"
        :disabled="data.disabled"
        @change="handleChange"
        @clear="clear"
        :popper-append-to-body="true"
        :placeholder="data.placeholder"
      >
        <el-option
          v-for="item in data.selectData"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </template>
    <template v-if="data.type === 'radio'">
      <el-radio-group
        :disabled="data.disabled"
        class="form_item_child"
        v-model="formItemValue"
        @change="handleChange"
      >
        <el-radio
          v-for="item in data.radioData"
          :key="item.value"
          :label="item.value"
          >{{ item.label }}</el-radio
        >
      </el-radio-group>
    </template>
    <template v-if="data.type === 'timeSelect'">
      <el-time-select
        class="form_item_child"
        :disabled="data.disabled"
        :is-range="data.isRange"
        range-separator="至"
        :clearable="data.clearable"
        v-model="formItemValue"
        :picker-options="data.selectOptions"
        :start-placeholder="data.startPlaceholder"
        :end-placeholder="data.endPlaceholder"
        @clear="clear"
        :placeholder="data.placeholder"
        @change="handleChange($event, 'time')"
      >
      </el-time-select>
    </template>
    <template v-if="data.type === 'timePicker'">
      <el-time-picker
        class="form_item_child"
        :disabled="data.disabled"
        :is-range="data.isRange"
        :clearable="data.clearable"
        v-model="formItemValue"
        :range-separator="data.rangeSeparator"
        :start-placeholder="data.startPlaceholder"
        :end-placeholder="data.endPlaceholder"
        :placeholder="data.placeholder"
        @clear="clear"
        @change="handleChange($event, 'time')"
      >
      </el-time-picker>
    </template>
    <template v-if="data.type === 'datePicker'">
      <el-date-picker
        class="form_item_child"
        :disabled="data.disabled"
        :clearable="data.clearable"
        @change="handleChange($event, 'date')"
        v-model="formItemValue"
        :range-separator="data.rangeSeparator"
        :start-placeholder="data.startPlaceholder"
        :end-placeholder="data.endPlaceholder"
        :type="data.dateType"
        :format="data.format"
        :placeholder="data.placeholder"
      >
      </el-date-picker>
    </template>
    <template
      v-if="data.type === 'upload-file' || data.type === 'upload-image'"
    >
      <sx-upload :type="data.type"></sx-upload>
    </template>
    <template v-if="data.type === 'cascader'">
      <el-cascader
        class="form_item_child"
        v-model="formItemValue"
        :options="data.options"
        :filterable="data.filterable"
        :clearable="data.clearable"
        :show-all-levels="data.showAllLevels"
        :props="{
          expandTrigger: data.expandTrigger ? data.expandTrigger : 'click',
        }"
        @change="handleChange($event, 'cascader')"
      ></el-cascader>
    </template>
  </section>
</template>
<script>
export default {
  name: "SxFormItem",
  components: {
    sxUpload: () => import("../../upload"),
  },
  props: {
    index: Number,
    data: Object,
    value: [Array, Object, Function, String, Number, Symbol, Boolean],
  },
  data() {
    return {
      formItemValue: null,
    };
  },
  mounted() {
    this.formItemValue = this.value;
  },
  watch: {
    value(val) {
      this.formItemValue = val;
    },
  },
  methods: {
    input(event) {
      this.$emit("input", {
        target: {
          prop: this.data.prop,
          type: this.data.type,
          value: event,
        },
      });
    },
    handleChange(event, type) {
      if (type === "time") {
        console.log();
      }
      this.$emit("handleChange", {
        target: {
          prop: this.data.prop,
          type: this.data.type,
          value: event,
        },
      });
    },
    clear() {
      this.$emit("handleChange", {
        target: {
          prop: this.data.prop,
          type: this.data.type,
          value: [],
        },
      });
    },
  },
};
</script>
<style scoped lang="scss">
.form_item_child {
  width: 100% !important;
}
</style>
