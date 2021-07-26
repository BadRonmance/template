import axios from "axios";
import { Message } from "element-ui";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import auth from "../utils/auth";

const qs = require("qs");

const service = axios.create({
  timeout: 30000,
  withCredentials: true,
});
service.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;multipart/form-data;charset=UTF-8;application/json";

service.interceptors.request.use(
  (config) => {
    config.headers.Token = auth.getToken();

    if (config.method === "POST") {
      config.paramsSerializer = function (params) {
        return qs.stringify(params, { arrayFormat: "repeat" });
      };
    }

    if (config.url.indexOf("undefined") >= 0) {
      Message({
        showClose: true,
        message: "无操作权限！",
        type: "warning",
        duration: 3 * 1000,
      });
      return;
    }

    // config.url =
    //   config.url.indexOf("?") === -1
    //     ? config.url + "?_date=" + new Date().getTime()
    //     : config.url + "&_date=" + new Date().getTime();

    NProgress.start();

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// resposne interceptor
service.interceptors.response.use(
  (data) => {
    NProgress.done();
    const status = data.data.c;

    if (status === 200) {
      return data.data.v || status;
    } else {
      const message =
        status === 505
          ? "您的登录已过期,请重新登录"
          : status === 401
          ? "无操作权限！"
          : data.data.msg;
      error(message, "error", status);
      return false;
    }
  },
  (error) => {
    interceptorsEvent(error.response);
    return false;
  }
);

const error = (message, type, status) => {
  // 关闭进度条展示
  NProgress.done();

  // 关闭所有弹框 防止出现重叠现象
  Message.closeAll();

  Message({
    message: message,
    type: type,
    duration: 3 * 1000,
    onClose() {
      if (status === 505) {
        window.location.href = process.env.VUE_APP_HOME_URL;
      }
    },
  });
};

const interceptorsEvent = (error) => {
  if (typeof error == "undefined") {
    message = "";
    return;
  }
  let message =
    error.status === 500
      ? "服务器连接失败,请稍后重试"
      : error.status === 400
      ? error.data.msg
      : error.status === 401
      ? "当前账号暂未登录"
      : error.status === 404
      ? "页面错误"
      : "";
  message != "" ? error(message, "error") : "";
};
export default service;
