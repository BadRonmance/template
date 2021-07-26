<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-05-20 15:00:37
 * @LastEditTime: 2021-07-20 09:58:19
 * @LastEditors: 张泽锋
-->
<template>
  <div class="wid_hei rel">
    <div class="box flex">
      <div class="flex-grow-0 margin_left_20">
        <div
          class="fon_20 cursor dis_in_center"
          @click="setMenu"
          :class="{ icon_rotate_show: menuType, icon_rotate: !menuType }"
        >
          <i class="iconfont color_3 fon_22 icon-zhankai"></i>
        </div>
        <div class="dis_in_center margin_left_20">
          <el-breadcrumb
            class="breadcrumb-container"
            separator-class="el-icon-arrow-right"
          >
            <el-breadcrumb-item
              v-for="(item, index) in levelList"
              :key="`${item.path}-${index}`"
              >{{ item.meta.title }}</el-breadcrumb-item
            >
          </el-breadcrumb>
        </div>
      </div>
      <div class="flex-grow-1 t_r">
        <div class="cursor dis_in_center padding_left_right_20">
          <el-dropdown @command="handlerSystemCommand" trigger="click">
            <span class="iconfont color_6 fon_22 icon-xitongxiaoxi"></span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="(item, index) in systemData"
                  :key="index"
                  :command="item"
                >
                  {{ item.name }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <!-- <div class="cursor dis_in_center padding_left_right_20">
          <el-dropdown @command="handlerPlatformCommand" trigger="click">
            <span class="el-dropdown-link">
              {{ PlatFormName }}
              <i
                v-if="PlatFormlist.length > 1"
                class="el-icon-arrow-down margin_left_10 el-icon-arrow-right"
              ></i>
            </span>
            <template #dropdown v-if="PlatFormlist.length > 1">
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="(item, index) in PlatFormlist"
                  :key="index"
                  :command="item.PlatFormUrl"
                  :disabled="item.PlatFormUrl == PlatFormUrl"
                >
                  {{ item.PlatFormName }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div> -->
        <div class="cursor dis_in_center padding_left_right_20">
          <el-dropdown @command="handlerCommand" trigger="click">
            <span class="el-dropdown-link color"> {{ userName }} 欢迎您 </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="edit">修改密码</el-dropdown-item>
                <el-dropdown-item command="exit">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <!-- <div class="cursor dis_in_center padding_left_right_20" @click="exit">
          <el-tooltip
            class="item"
            effect="dark"
            content="退出登录"
            placement="bottom"
          >
            <i class="iconfont color_3 fon_24 icon-tuichudenglu"></i>
          </el-tooltip>
        </div> -->
      </div>
    </div>
    <!-- 弹窗子组件 -->
    <sx-dialog
      title="修改密码"
      width="500px"
      v-model="dialogVisible"
      @change="dialogVisible = $event"
      @determine="determine"
    >
      <header-bar-dialog ref="departmentInfo"></header-bar-dialog>
    </sx-dialog>
  </div>
</template>
<script>
import md5 from "@/libs/md5";
export default {
  components: {
    headerBarDialog: () => import("./dialog"),
  },
  data() {
    return {
      systemData: [
        {
          type: "open",
          path: "",
          name: "系统消息",
        },
        {
          type: "open",
          path: "/importExport",
          name: "任务列表",
        },
      ],
      PlatFormUrl: "" || window.location.pathname.split("/")[1],
      PlatFormName: "",
      PlatFormlist: [],
      userName:
        {} || this.$util.getLocalStorage("Employee", false).user.LoginName,
      isShow: false,
      dialogVisible: false,
      levelList: [],
    };
  },
  computed: {
    menuType() {
      return this.$store.state.slideConfig.collapse;
    },
  },
  mounted() {
    // this.PlatFormlist = this.$util.getLocalStorage("plateForm", false);
    // const index = this.$util.getArrayIndex(
    //   this.PlatFormlist,
    //   "PlatFormUrl",
    //   this.PlatFormUrl
    // );
    // this.PlatFormName = this.PlatFormlist[index].PlatFormName;
    this.getBreadcrumb();
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter((item) => item.name);
      this.levelList = matched;
    },
    /**
     * @description: 设置菜单展开状态
     * @version: 1.0.0
     * @param {*}
     * @return {*}
     * @author: 张泽锋
     * @Date: 2021-05-21 10:29:40
     */
    setMenu() {
      this.$store.commit(
        "setCollapse",
        !this.$store.state.slideConfig.collapse
      );
    },
    // 退出登录
    exit() {
      this.$alert("是否要退出登录", "退出登录", {
        confirmButtonText: "确定",
        callback: (action) => {
          action != "cancel" ? this.exitLogin() : "";
        },
      });
    },
    /**
     * @description: 修改密码
     * @version: 1.0.0
     * @param {*}
     * @return {*}
     * @author: 张泽锋
     * @Date: 2021-05-21 10:28:52
     */
    async determine() {
      const that = this;
      // 获取表单验证通过的信息
      let ruleForm = this.$refs["departmentInfo"].validateForm();
      if (!ruleForm) return;
      let data = await this.$http.post(
        "TravelingsmoothlyAuthService/UpdateEmployeePwd",
        {
          EmployeeId: this.$util.getLocalStorage("Employee", false).account
            .EmployeeId,
          OldLoginPassWord: md5.hex_md5(ruleForm.OldLoginPassWord),
          NewLoginPassWord: md5.hex_md5(ruleForm.NewLoginPassWord),
          RepLoginPassWord: md5.hex_md5(ruleForm.RepLoginPassWord),
        }
      );
      if (data) {
        this.$message({
          showClose: true,
          message: "密码修改成功，请重新登录",
          type: "success",
          duration: 1000,
          onClose() {
            that.exitLogin();
          },
        });
      }
    },
    /**
     * @description: 退出登录
     * @version: 1.0.0
     * @param {*}
     * @return {*}
     * @author: 张泽锋
     * @Date: 2021-05-21 10:29:30
     */
    async exitLogin() {
      await this.$http.post("/TravelingsmoothlyAuthService/EmployeeLogout");
      this.$store.commit("delete_all_tabs");
      this.$store.dispatch("ClearLoginInfo");
      window.location.href = process.env.VUE_APP_URL;
    },
    /**
     * @description: 登录用户下拉列表显示
     * @version: 1.0.0
     * @param {*} data 当前点击项 commad
     * @author: 张泽锋
     * @Date: 2021-06-21 14:28:50
     */
    handlerCommand(data) {
      if (data === "exit") {
        this.exit();
      } else if (data === "edit") {
        this.dialogVisible = true;
      }
    },
    handlerPlatformCommand(data) {
      window.location.href = `${process.env.VUE_APP_URL}/${data}`;
    },
    accountInfo() {},
    handlerSystemCommand(data) {
      if (data.path === "") return;
      if (data.type === "open") {
        window.open(data.path);
      }
    },
  },
};
</script>
<style lang="scss">
.icon_rotate {
  transition: all 0.8s;
  transform: rotateY(0deg);
}
.box {
  width: 100%;
  position: absolute;
  top: 50%;
  left: -50%;
  transform: translate(50%, -50%);
}
.icon_rotate_show {
  transition: all 0.5s;
  transform: rotateY(180deg);
}
</style>
