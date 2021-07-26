/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-05-18 19:10:27
 * @LastEditTime: 2021-07-16 15:50:51
 * @LastEditors: 张泽锋
 */
import service from "./service";
import store from "@/store";
import auth from "../utils/auth";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "/v2_api/"
    : `${process.env.VUE_APP_URL}/v2_api`;
const baseFileURL =
  process.env.NODE_ENV === "development"
    ? "/file_server/"
    : `${process.env.VUE_APP_URL}/file_server`;

/**
 * @description: post请求
 * @version: 1.0.0
 * @param {*} url api路径
 * @param params
 * @param id
 * @return {*}
 * @author: 张泽锋
 * @Date: 2021-05-19 14:10:26
 */
async function post(url, params, timeout) {
  if (!url) return;

  let obj = {
    ct: store.getters.ct,
    tk: auth.getToken(),
    cv: store.getters.cv,
    v: params,
  };

  const res = await service({
    url: `${baseURL}/${url}`,
    method: "post",
    data: obj,
    timeout: {
      timeout: timeout,
    },
  });

  return res;
}
async function get(url, params) {
  if (!url) return;

  const res = await service({
    url: `${baseFileURL}${url}`,
    method: "get",
    params,
  });

  return res;
}
async function from(url, params, timeout) {
  if (!url) return;
  var formData = new FormData();
  for (let k in params) {
    formData.append(k, params[k]);
  }
  const res = await service({
    url: `${baseFileURL}/${url}`,
    method: "post",
    data: formData,
    timeout: timeout,
  });
  return res;
}

function preview(val) {
  const token = auth.getToken();
  const url = `${process.env.VUE_APP_URL}/file_server/file/Download?Token=${token}&file=${val}`;
  return encodeURI(url);
}
export default {
  post,
  from,
  get,
  preview,
};
