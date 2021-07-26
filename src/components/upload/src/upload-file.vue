<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-07-15 13:26:31
 * @LastEditTime: 2021-07-16 14:19:05
 * @LastEditors: 张泽锋
-->
<template>
  <div>
    <div class="upload-demo">
      <div class="el-upload">
        <i class="el-icon-upload color_f"></i>
        <div class="upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </div>
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
.upload-demo {
  width: 360px;
}
.el-upload {
  display: inline-block;
  text-align: center;
  background: #fff;
  width: 100%;
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;
  outline: none;
}
.el-icon-upload {
  font-size: 67px;
  color: #c0c4cc;
  margin: 40px 0 16px;
  line-height: 50px;
}
.upload__text {
  color: #858688;
  font-size: 14px;
  text-align: center;
}
.upload__text em {
  color: $--color-primary;
  font-style: normal;
}
</style>
