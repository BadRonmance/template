<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-07-14 17:19:38
 * @LastEditTime: 2021-07-20 10:07:55
 * @LastEditors: 张泽锋
-->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import { record, pack } from "rrweb";
import "rrweb-player/dist/style.css";
export default {
  data() {
    return {};
  },
  mounted() {
    // this.crateWeb();
  },
  methods: {
    // 开始录屏
    crateWeb() {
      let eventsMatrix = [[]];
      let that = this;
      // this.$store.commit("resetEvent");
      record({
        emit(event, isCheckout) {
          if (isCheckout) {
            console.log(`重新生成快照啦`);
            eventsMatrix.push([]);
            that.savedata(eventsMatrix);
            //将录制完成的快照发送到后端存储
          }
          // 用任意方式存储 event
          const lastEvents = eventsMatrix[eventsMatrix.length - 1];
          lastEvents.push(event);
          // _this.$store.commit("storageEvent", event);
        },
        checkoutEveryNms: 2 * 60 * 1000, // 每2分钟重新制作快照
        packFn: pack, //压缩数据
        recordCanvas: true,
      });
    },
    // 保存录屏
    savedata(data) {
      const date = this.$util.initDate();
      const events = JSON.stringify(data);
      const textContent = `日期:${date} 数据:${events}`;
      let element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(textContent)
      );
      element.setAttribute("download", `用户录屏数据${date}`);
      element.style.display = "none";
      element.click();
    },
  },
};
</script>

<style lang="scss">
@import "./assets/css/index.scss";
</style>
