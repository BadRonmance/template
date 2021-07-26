<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-05-07 14:24:40
 * @LastEditTime: 2021-07-20 09:51:28
 * @LastEditors: 张泽锋
-->
<template>
  <div id="replaycontent">
    <el-button type="primary" size="small" class="downloadTxt" @click="play"
      >保存数据到本地</el-button
    >
  </div>
</template>
<script>
import rrwebPlayer from "rrweb-player";
import "rrweb-player/dist/style.css";
export default {
  name: "",
  mixins: [],
  components: {},
  data() {
    return {};
  },
  mounted() {
    // this.getInfo();
  },
  methods: {
    play() {
      let el = document.getElementById("replaycontent");
      el.innerHTML = "";
      let events = this.$store.state.storageEvent;
      // let events = this.eventsMatrix[this.eventsMatrix.length - 1];
      //取最后一个快照回放
      let replayer = new rrwebPlayer({
        target: el, // 可以自定义 DOM 元素
        data: {
          events,
        },
      });
      return replayer;
    },
    // 回放录屏
    getInfo() {
      // this.saveWeb()
      let events = this.$store.state.storageEvent;
      console.log(events);
      // eslint-disable-next-line no-new,new-cap
      new rrwebPlayer({
        target: document.getElementById("replaycontent"),
        data: {
          events,
        },
      });
    },
    downloadTxt() {
      const date = this.$util.initDate();
      const events = JSON.stringify(this.$store.state.event);
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
#replaycontent {
  width: 100%;
  height: 100%;
  .rr-player {
    width: 100% !important;
    height: 100% !important;
  }
  .downloadTxt {
    position: fixed;
    z-index: 10000;
    bottom: 20px;
    left: 20px;
  }
}
</style>
