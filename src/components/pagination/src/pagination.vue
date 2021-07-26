<!--
 * @Description: element 分页器封装
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-03-31 20:10:19
 * @LastEditTime: 2021-07-22 15:43:32
 * @LastEditors: 张泽锋
-->

<template>
  <div class="t_c padding_top_20" style="min-height: 30px">
    <el-pagination
      v-if="total > 0"
      @size-change="handleSizeChange"
      @prev-click="handleclick"
      @next-click="handleclick"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  model: {
    prop: "currentPage",
    event: "change",
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    total: {
      type: Number,
      default: 0,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    page: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      pageSizes: [10, 20, 50, 100],
    };
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("size-change", val);
      this.$emit("change", 1);
    },
    handleclick() {
      // this.$emit("change", val);
    },
    handleCurrentChange(val) {
      this.$emit("change", val);
    },
  },
};
</script>
<style lang="scss"></style>
