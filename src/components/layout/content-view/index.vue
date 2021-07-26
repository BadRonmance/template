<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-05-24 13:40:42
 * @LastEditTime: 2021-07-15 16:47:37
 * @LastEditors: 张泽锋
-->
<template>
  <div class="wid_hei" style="overflow-y: auto">
    <keep-alive>
      <router-view v-if="keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!keepAlive"></router-view>
  </div>
</template>
<script>
export default {
  name: "contentView",
  computed: {
    keepAlive() {
      return this.$route.meta.keepAlive || false;
    },
  },
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang=""></style>
