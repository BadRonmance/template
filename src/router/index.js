/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-07-14 17:19:38
 * @LastEditTime: 2021-07-26 09:37:51
 * @LastEditors: 张泽锋
 */
import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import routes from "./routes";
import auth from "@/libs/utils/auth";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  const isLogin = auth.getToken() ? true : false;
  console.log(isLogin);
  if (isLogin) {
    to.path === "/" ? next("/combination_form") : next();
  } else {
    if (process.env.NODE_ENV === "development") {
      next();
    } else {
      window.location.href = process.env.VUE_APP_URL;
    }
  }
});
router.afterEach(() => {
  NProgress.done();
});
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});
export default router;
