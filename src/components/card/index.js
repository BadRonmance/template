/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-07-20 15:29:32
 * @LastEditTime: 2021-07-20 15:39:20
 * @LastEditors: 张泽锋
 */

import SxCard from "./src/parallax-depth-card.vue";

/* istanbul ignore next */
SxCard.install = function (Vue) {
  Vue.component(SxCard.name, SxCard);
};

export default SxCard;
