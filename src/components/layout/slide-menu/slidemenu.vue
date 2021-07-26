<template>
  <div class="slideMenu">
    <el-menu
      :collapse="collapse"
      :default-active="slideConfig.activeIndex"
      :background-color="slideConfig.backgroundColor"
      :text-color="slideConfig.textColor"
      :active-text-color="slideConfig.activeTextColor"
      mode="vertical"
      router
      :unique-opened="true"
      :collapse-transition="true"
    >
      <!-- <slide-menu-item :menu="menuList"></slide-menu-item> -->
      <el-submenu
        :index="index + 'menuList'"
        v-for="(item, index) in menuList"
        :key="item.path"
      >
        <!-- 一级菜单 -->
        <template slot="title">
          <div
            :style="{
              'padding-left': slideConfig.paddingConfig.firstMenu,
            }"
          >
            <i
              :class="['iconfont', item.DefaultIcon]"
              :style="{ color: slideConfig.activeTextColor }"
              class="iconfont fon_18 dis_in"
            ></i>
            <span
              class="fon_14 margin_left_20 dis_in"
              style="margin-top: -6px"
              >{{ item.name }}</span
            >
          </div>
        </template>
        <!-- 子级菜单 -->
        <el-menu-item-group
          v-for="(child, childIndex) in item.children"
          :key="`${childIndex}-childIndex`"
        >
          <!-- 三级菜单 -->
          <slide-menu-item
            :style="{
              'padding-left': collapse
                ? slideConfig.paddingConfig.slideMenuItemCollapse
                : slideConfig.paddingConfig.slideMenuItem,
            }"
            v-if="child.children && child.children.length"
            :parent="child.path"
            :parent-item="child"
          ></slide-menu-item>
          <!-- 二级菜单 -->
          <el-menu-item
            v-else
            :index="child.path"
            :style="{
              'padding-left': collapse
                ? slideConfig.paddingConfig.elMenuItemCollapse
                : slideConfig.paddingConfig.elMenuItem,
            }"
            >{{ child.name }}</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import slideMenuItem from "./silde-menu-item";
export default {
  name: "",
  components: {
    slideMenuItem,
  },
  computed: {
    collapse() {
      return this.$store.state.slideConfig.collapse;
    },
  },
  data() {
    return {
      slideConfig: {
        backgroundColor: "#303133",
        textColor: "#fff",
        activeTextColor: "#f60",
        activeIndex: "/Home",
        paddingConfig: {
          elMenuItem: "65px",
          elMenuItemCollapse: "0px",
          slideMenuItemCollapse: "0px",
          slideMenuItem: "25px",
          firstMenu: "9px",
        },
      },
      parent: "",
      menuList: [],
    };
  },
  watch: {
    $route(val) {
      this.slideConfig.activeIndex = val.fullPath;
    },
  },
  mounted() {
    this.menuList = this.$config.menu || [];
    // this.getMenuList();
    this.slideConfig.activeIndex = this.$route.fullPath;
  },
  methods: {
    /**
     * @description: 获取所有的子站点数据 包含菜单权限 按钮权限
     * @version: 1.0.0
     * @param {*}
     * @return {*}
     * @author: 张泽锋
     * @Date: 2021-05-20 09:34:34
     */
    async getMenuList() {
      if (this.$util.getSessionStorage("menu")) {
        // this.menuList = this.$util.getSessionStorage("menu");
        return;
      }
      const data = await this.$http.post(
        "/TravelingsmoothlyAuthService/GetEmployeeMenuList"
      );
      this.$util.setSessionStorage("function", data.FunctionList);
      // sessionStorage.setItem("function", JSON.stringify(data.FunctionList));
      // * 将菜单的固定属性做个拼接
      data.SystemList.forEach((item) => {
        item.path = "/" + item.SysId;
        item.name = item.SysName;
      });
      data.MenuList.forEach((item) => {
        item.path = "/" + item.MenuId;
        item.name = item.MenuName;
      });
      // * 依据菜单标识id将对应的功能添加至菜单中
      data.MenuList.map((item) => {
        item.functionData = [];
        data.FunctionList.map((el) => {
          if (item.MenuId === el.MenuId) {
            item.functionData.push(el);
          }
        });
      });
      data.MenuList = data.MenuList.sort((a, b) => {
        return a.SortNo - b.SortNo;
      });
      // * 将菜单的平级结构转换为树形结构
      const parent = this.$util.listToTree(data.MenuList, "ParentId", "MenuId");
      // * 将菜单数据和根节点属性合并
      let finalArr = this.concatArray(data.SystemList, parent);
      // * 将拼接好的数据进行重组  重组后的数据根据ShowSysType进行项目结构分离
      const newData = this.$util.mergeRepeatData(finalArr, "ShowSysType", [
        "DefaultUrl",
        "SysName",
        "ShowSysType",
      ]);
      this.menuList = newData[0].children;
      this.$util.setSessionStorage("menu", newData[0].children);
      // sessionStorage.setItem("menu", JSON.stringify(newData[0].children));
    },
    // 合并system 和 menu
    concatArray(sArr, mArr) {
      sArr.forEach((item) => {
        mArr.forEach((current) => {
          if (current.SysId === item.SysId && item.SysId !== "Home") {
            if (item.children !== undefined) {
              item.children.push(current);
            } else {
              item.children = [];
              item.children.push(current);
            }
          }
        });
      });
      return sArr;
    },
  },
};
</script>
<style lang="scss">
.el-aside {
  // 侧边栏折叠动画速度
  transition: width 0.25s !important;
  -webkit-transition: width 0.25s;
  -moz-transition: width 0.25s;
  -webkit-transition: width 0.25s;
  -o-transition: width 0.25s;
}
</style>
