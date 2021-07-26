<!--
 * @Description: element dialog封装
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-04-02 14:13:31
 * @LastEditTime: 2021-07-20 13:22:47
 * @LastEditors: 张泽锋
-->

<template>
  <el-dialog
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="showClose"
    :title="title"
    :visible.sync="myDialogVisible"
    @close="close"
    :width="width || '30%'"
  >
    <div
      ref="viewBox"
      :key="myDialogVisible"
      style="max-height: 400px; overflow-y: auto"
    >
      <slot></slot>
    </div>
    <div
      slot="footer"
      :class="{
        footer_border: footer.border,
        position_right: footer.position === 'right',
        position_left: footer.position === 'left',
        position_center: footer.position === 'center',
      }"
      :style="{
        padding: footer.padding,
      }"
      class="padding_bottom_top_10 padding_left_right_10"
    >
      <div class="padding_left_right_20 dis_in_center" v-if="confim">
        <el-button
          :size="$config.project.size"
          :loading="btnLoading"
          type="primary"
          @click="determine"
        >
          {{ confimText }}
        </el-button>
      </div>
      <div class="padding_left_right_20 dis_in_center" v-if="cancel">
        <el-button :size="$config.project.size" @click="onChange">
          {{ cancelText }}
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "",
  mixins: [],
  model: {
    prop: "dialogVisible",
    event: "change",
  },
  props: {
    title: String,
    width: String,
    dialogVisible: Boolean,
    cancel: {
      type: Boolean,
      default: true,
    },
    confim: {
      type: Boolean,
      default: true,
    },
    confimText: {
      type: String,
      default: "确 定",
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    cancelText: {
      type: String,
      default: "取 消",
    },
    footer: {
      type: Object,
      default: () => {
        return {
          border: true,
          position: "right",
          padding: "10px 10px",
        };
      },
    },
  },
  components: {},
  data() {
    return {
      btnLoading: false,
      myDialogVisible: this.dialogVisible,
    };
  },
  watch: {
    dialogVisible(val) {
      this.btnLoading = false;
      this.myDialogVisible = val;
    },
  },
  mounted() {},
  methods: {
    scrollListener: function () {
      this.$nextTick(() => {
        this.$refs.viewBox.addEventListener("scroll", () => {}, false);
      });
    },
    onChange() {
      this.myDialogVisible = false;
      this.$emit("change", this.myDialogVisible);
    },
    close() {
      this.myDialogVisible = false;
      this.$emit("change", this.myDialogVisible);
    },
    determine() {
      // this.btnLoading = true;
      this.$emit("determine");
    },
  },
};
</script>
<style lang="scss">
.footer_border {
  box-shadow: -0px -0px 5px #d6d6d6;
}
.position_right {
  text-align: right;
}
.position_left {
  text-align: left;
}
.position_center {
  text-align: center;
}
</style>
