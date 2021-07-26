/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-05-21 10:42:07
 * @LastEditTime: 2021-07-20 09:30:47
 * @LastEditors: 张泽锋
 */
import utils from "@/libs/utils";

export default {
  state: {
    authUser: utils.getUser(),
    token: utils.getToken(),
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
  },
  actions: {},
};
