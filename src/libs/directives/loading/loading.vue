<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-07-20 15:33:01
 * @LastEditTime: 2021-07-21 14:30:38
 * @LastEditors: 张泽锋
-->
<template>
  <div class="pulse_body">
    <div class="pulse">
      <div class="ring"></div>
      <div class="ring"></div>
      <div class="ring"></div>
      <div class="ring"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #1f3244;
}
.pulse_body {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10000;
  background: #fff;
}

.pulse {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: coral;
  height: 10vmax;
  width: 10vmax;
  border-radius: 100%;
  position: relative;
}
.ring {
  position: absolute;
  background-color: inherit;
  height: 100%;
  width: 100%;
  border-radius: 100%;
  opacity: 0.8;
  animation: pulsing 2s ease-out infinite;

  &:nth-of-type(1) {
    animation-delay: -0.5s;
  }
  &:nth-of-type(2) {
    animation-delay: -1s;
  }
  &:nth-of-type(3) {
    animation-delay: -1.5s;
  }
}

@keyframes pulsing {
  100% {
    transform: scale(1.75);
    opacity: 0;
  }
}
</style>
