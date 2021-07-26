<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-05-21 14:00:44
 * @LastEditTime: 2021-06-01 11:21:03
 * @LastEditors: 张泽锋
-->
<template>
  <div>
    <el-submenu :index="parentItem.path" :name="`${parentItem.name}`">
      <template slot="title">
        <span>{{ parentItem.name }}</span>
      </template>
      <div v-for="item in parentItem.children" :key="item.path">
        <template v-if="item.children && item.children.length === 1">
          <el-menu-item :index="item.path">
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
        <template v-else>
          <el-menu-item :index="item.path">
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </div>
    </el-submenu>
  </div>
</template>
<script>
export default {
  props: {
    parentItem: {
      type: Object,
      default: () => {},
    },
    parent: {
      type: String,
      default: "",
    },
  },
  methods: {},
};
</script>
