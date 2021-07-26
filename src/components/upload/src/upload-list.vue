<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-07-16 15:21:04
 * @LastEditTime: 2021-07-16 17:41:30
 * @LastEditors: 张泽锋
-->
<template>
  <div>
    <div
      class="upload_file_list"
      :class="{ view_border: item.percentage == 100 }"
      v-for="(item, index) in fileList"
      :key="index"
    >
      <div class="flex">
        <!-- 展示文件名称 -->
        <div class="flex-grow-1 fon_12 color_6">
          {{ item.name }}
        </div>
        <div
          style="width: 30px"
          class="flex-grow-0 cursor rel fon_12 color_6 flex-y-center"
          v-if="item.percentage === 100"
        >
          <!-- 可以删除 -->
          <template v-if="!item.noDeletion">
            <!-- 展示成功按钮 -->
            <p class="show_file_state ab">
              <i
                :class="{
                  'el-icon-check upload_success': item.state,
                  'el-icon-circle-close upload_fail': !item.state,
                }"
              ></i>
            </p>
            <!-- 展示删除按钮 click事件执行删除操作 -->
            <p
              class="show_file_state_delete ab"
              @click="deleteImg(index, item.noDeletion)"
            >
              <i class="el-icon-delete upload_fail"></i>
            </p>
          </template>
          <!-- 禁止删除 -->
          <template v-else>
            <!-- 鼠标悬浮状态改变  click事件执行下载 -->
            <p class="show_dowload_state ab" @click="preview(item)">
              <i class="el-icon-download upload_success"></i></p
          ></template>
        </div>
      </div>
      <!-- 上传模拟进度条展示 -->
      <p v-if="item.percentage < 100">
        <el-progress
          :stroke-width="1"
          :show-text="false"
          :percentage="item.percentage"
          :color="colors"
        ></el-progress>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  model: {
    prop: "fileList",
    event: "change",
  },
  props: {
    fileList: Array,
  },
  data() {
    return {
      colors: [
        {
          color: "#f56c6c",
          percentage: 20,
        },
        {
          color: "#e6a23c",
          percentage: 40,
        },
        {
          color: "#5cb87a",
          percentage: 60,
        },
        {
          color: "#1989fa",
          percentage: 80,
        },
        {
          color: "#6f7ad3",
          percentage: 100,
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async deleteImg(index, noDeletion) {
      if (noDeletion) {
        this.$message.closeAll();
        this.$message.error("该附件不允许删除");
        return;
      }
      let data = await this.$http.get("file/delete", {
        file: this.fileList[index].fileName,
      });
      if (data) {
        this.fileList.splice(index, 1);
        this.$emit("onRemove", this.fileList);
      }
    },
    preview(data) {
      window.open(this.$http.preview(data.fileName));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped lang="scss">
.upload_file_list {
  padding: 0px 0;
  .show_file_state_delete {
    opacity: 0;
    right: 5px;
    transition: all 0.6s;
  }

  .show_file_state {
    opacity: 1;
    right: 5px;
    transition: all 0.6s;
  }

  .show_dowload_state {
    opacity: 1;
    right: 5px;
    transition: all 0.6s;
  }
  .upload_success {
    display: inline-block;
    color: #67c23a;
    width: 18px;
    height: 18px;
    text-align: center;
    line-height: 18px;
    border-radius: 50%;
    border: 1px solid #67c23a;
  }

  .upload_fail {
    display: inline-block;
    color: #f56c6c;
    width: 18px;
    height: 18px;
    text-align: center;
    line-height: 18px;
    border-radius: 50%;
    border: 1px solid #f56c6c;
  }
}
.upload_file_list:hover {
  // background: #f9f9f9;
}

.upload_file_list:hover .show_file_state {
  opacity: 0;
}

.upload_file_list:hover .show_file_state_delete {
  opacity: 1;
}
</style>
