<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-05-20 13:27:30
 * @LastEditTime: 2021-07-20 09:57:31
 * @LastEditors: 张泽锋
-->
<template>
  <div id="main" class="flex">
    <section
      class="flex-grow-0 slideContent"
      :style="{
        width: collapse ? '64px' : '240px',
      }"
    >
      <div
        class="
          slideLogin
          padding_top_10 padding_bottom_20
          t_c
          fon_14
          gobyndsingle
        "
      >
        <el-image class="logo" :src="logo" fit="cover"></el-image>
        <!-- <p v-show="!collapse" class="color_f projectName">
          {{ PlatFormName }}
        </p> -->
      </div>
      <slide-menu></slide-menu>
    </section>
    <section class="flex-grow-1">
      <div class="header">
        <header-bar></header-bar>
      </div>
      <div class="open_tabs">
        <open-tabs></open-tabs>
      </div>
      <div class="content pa_l" style="overflow-y: auto">
        <keep-alive>
          <router-view v-if="keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!keepAlive"></router-view>
      </div>
    </section>
  </div>
</template>
<script>
import slideMenu from "./slide-menu/slidemenu";
import openTabs from "./open-tabs/index";
import headerBar from "./header-bar/index";
export default {
  name: "layout",
  components: {
    slideMenu,
    headerBar,
    openTabs,
  },
  computed: {
    key() {
      return this.$route.fullPath;
    },
    keepAlive() {
      return this.$route.meta.keepAlive || false;
    },
    collapse() {
      const collapse = this.$store.state.slideConfig.collapse;
      return collapse;
    },
  },
  data() {
    return {
      includeList: ["contractList", "contractInfo"],
      PlatFormUrl: window.location.pathname.split("/")[1],
      PlatFormName: "",
      logo: require("../../assets/logo.png"),
    };
  },
  mounted() {
    // const list = this.$util.getLocalStorage("plateForm", false);
    // const index = this.$util.getArrayIndex(
    //   list,
    //   "PlatFormUrl",
    //   this.PlatFormUrl
    // );
    // document.title = list[index].PlatFormName;
  },
  methods: {},
};
</script>
<style>
.logo {
  width: 50px;
  height: 50px;
}
.projectName {
  height: 40px;
  line-height: 40px;
}
</style>
