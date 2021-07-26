<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-05-20 19:58:04
 * @LastEditTime: 2021-07-06 10:21:36
 * @LastEditors: 张泽锋
-->
<template>
  <div class="tabs">
    <div class="flex">
      <div class="flex-grow-1">
        <el-tabs
          v-model="activeTab"
          type="card"
          closable
          v-if="openTab.length"
          @tab-click="tabClick(openTab)"
          @tab-remove="tabRemove"
        >
          <el-tab-pane
            :key="item.route + index"
            v-for="(item, index) in openTab"
            :label="item.name"
            :name="item.route"
            :closable="false"
            :index="index"
          >
            <span
              slot="label"
              @contextmenu.prevent="contextMenuClick(item, $event)"
              >{{ item.name }}</span
            >
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="flex-grow-0 flex-y-center">
        <el-dropdown @command="handleCommand">
          <i class="el-dropdown-link el-icon-arrow-down cursor"></i>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="closeAll">关闭所有</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      activeTab: "",
      visible: false,
      contextMenuLeft: 0,
      contextMenuTop: 0,
      menuList: {
        others: "关闭其他",
        all: "关闭所有",
      },
    };
  },
  computed: {
    openTab() {
      return this.$store.state.tab.openTab;
    },
  },
  watch: {
    // todo 需要对函数进行简化处理
    $route(val, from) {
      this.activeTab = val.fullPath;
      let flag = false;
      for (let item of this.openTab) {
        if (item.route === val.fullPath) {
          // if (item.route.indexOf(val.fullPath) !== -1) {
          this.$store.commit("set_active_index", val.meta.active);
          flag = true;
          break;
        }
      }
      if (!flag && val.meta.hideTab !== true) {
        let ix = this.openTab.length - 1;
        this.openTab.forEach((item, index) => {
          if (item.route === from.fullPath) {
            ix = index + 1;
          }
        });
        this.$store.commit("add_tabs", {
          data: {
            route: val.fullPath,
            name: val.meta.title,
            cmpName: val.meta.cmpName,
          },
          ix,
        });
        this.$store.commit("set_active_index", val.meta.active);
      }
    },
  },
  mounted() {
    this.setActiveTab();
  },
  methods: {
    setActiveTab() {
      this.activeTab = this.$route.fullPath;
    },
    // 移除tab标签
    tabRemove(targetName) {
      if (targetName == "/CRM_enterpriceManage") return;
      if (this.openTab && this.openTab.length === 1) return;
      const index = this.openTab.findIndex((val) => val.route === targetName);
      this.$store.commit("delete_tabs", targetName);
      this.$store.commit("set_active_index", this.openTab[index - 1].route);
      this.$router.push({ path: this.openTab[index - 1].route });
    },
    // tab标签点击时，切换相应的路由
    tabClick() {
      this.$router.push({ path: this.activeTab });
    },
    handleTabsOption(type) {
      if (type.includes("all")) {
        // 关闭所有，除了home
        this.$store.commit("delete_all_tabs", this.activeTab);
        this.activeTab = "/Home";
      } else if (type.includes("others")) {
        // 关闭除当前页和home页的其他页
        this.$store.commit("delete_other_tabs", this.activeTab);
      }
      this.$router.push({ path: this.activeTab });
      this.visible = false;
    },
    /**
     * @description: 设置TAB移动的距离
     * @version: 1.0.0
     * @param {*} item
     * @param {*} e
     * @return {*}
     * @author: 张泽锋
     * @Date: 2021-05-21 10:40:19
     */
    contextMenuClick(item, e) {
      this.visible = true;
      this.activeTab = item.route;
      if (this.$store.state.sidebarOpened) {
        this.contextMenuLeft = e.screenX - 20;
      } else {
        this.contextMenuLeft = e.screenX - 300;
      }
      this.contextMenuTop = e.pageY;
    },
    handleCommand(type) {
      if (type === "closeAll") {
        this.activeTab = this.openTab[0].route;
        this.$router.push({ path: this.activeTab });
        this.$store.commit("delete_all_tabs");
      }
    },
  },
};
</script>
<style lang="scss">
.tabs {
  padding: 6px 20px 0 20px;
}
#main .open_tabs .el-tabs--card > .el-tabs__header .el-tabs__nav {
  background: #fff;
  box-sizing: border-box;
}
.contextmenu {
  position: absolute;
  margin: 0;
  padding: 5px 0;
  background: #fff;
  z-index: 1000;
  list-style-type: none;
  border-radius: 4px;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.1);
  li {
    font-size: 14px;
    margin: 0;
    padding: 5px 15px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
