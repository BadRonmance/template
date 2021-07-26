<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-07-14 17:22:35
 * @LastEditTime: 2021-07-26 10:11:25
 * @LastEditors: 张泽锋
-->
<template>
  <div>
    <section>
      <div class="rel dis_in_center">
        <div
          class="upload_view cursor"
          :class="{
            'is-dragover': dragover,
          }"
          @drop.prevent="onDrop"
          @dragover.prevent="onDragover"
          @dragleave.prevent="dragover = false"
        >
          <upload-file></upload-file>
          <upload-image v-if="type === 'upload_image'"></upload-image>
          <!-- input执行上传的交互事件 -->
          <template v-if="isClear">
            <input
              :accept="accept"
              name="file"
              type="file"
              ref="inputFile"
              class="upload_input"
              @change="upload"
              :disabled="disabled"
              :class="{ allowed: disabled, cursor: !disabled }"
            />
          </template>
        </div>
        <div class="upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        <div>
          <upload-list v-model="fileList"></upload-list>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "sxUpload",
  components: {
    uploadImage: () => import("./upload-image.vue"),
    uploadFile: () => import("./upload-file.vue"),
    uploadList: () => import("./upload-list.vue"),
  },
  props: {
    type: {
      type: String,
      default: "image",
    },
    isUpload: {
      type: Boolean,
      default: false,
    },
    fileType: {
      type: Array,
      default: () => {
        return [".jpg", ".png"];
      },
    },
    limit: {
      type: Number,
      default: 1,
    },
    size: {
      type: Number,
      default: 4,
    },
    disabled: Boolean,
  },
  data() {
    return {
      accept: [],
      isClear: true,
      dragover: false,
      fileList: [
        {
          fileName: "/2021/0716/530077a92e8d46cfb3e999cadd8ea09b.jpg",
          guid: "a8a8454d3b5340249662d99ed892f9eb",
          name: "1.png",
          percentage: 100,
          state: "success",
          noDeletion: true,
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    setFile(files) {
      this.httpRequest(files[0]);
    },
    upload(e) {
      this.setFile(e.target.files);
      this.$refs.inputFile.value = null;
    },
    getFileType(file) {
      const typeList = file.name.split(".");
      const length = typeList.length - 1;
      const type = typeList[length];
      return type;
    },
    checkFileType(type) {
      if (this.fileType.length === 0) {
        return false;
      }
      if (this.fileType.findIndex((val) => val === `.${type}`) === -1) {
        this.$message.closeAll();
        this.$message.error("文件类型错误");
        return false;
      }
      return true;
    },
    checkSize(file) {
      let size = Math.floor(file.size);
      if (size > 1024 * 1024 * this.size) {
        this.isClear = true;
        this.$message.error(
          `图片大小超出限制（建议${this.size}M以内）,请重新上传`
        );
        this.$refs.fileIpt.value = "";
        return false;
      }
      return true;
    },
    setFileList(file) {
      this.fileList.push({
        name: file.name,
        imgFile: file,
        status: "",
        percentage: 0,
      });
    },
    setFileProcess(index) {
      setTimeout(() => {
        if (this.fileList[index].percentage >= 90) {
          return;
        }
        let num =
          this.fileList[index].percentage + Math.ceil(Math.random() * 14);
        this.fileList[index].percentage = num > 90 ? 90 : num;
        this.setFileProcess(index);
      }, 500);
    },
    httpRequest(file) {
      // 1、先获取该文件流对应的类型
      const type = this.getFileType(file);
      // 2、校验该文件类型是否属于限定范围内
      if (!this.checkFileType(type)) return;
      // 3、校验该文件大小是否符合规则
      if (!this.checkSize(file)) return;
      // 4、清除文件上传状态
      this.isClear = false;
      // 5、将该文件流push进文件列表中
      this.setFileList(file);
      // 6、将该文件流对应的进度条进行模拟设置
      this.setFileProcess(this.fileList.length - 1);
      // 7、开始上传该文件流
      this.uploadFile(file, this.fileList.length - 1);
      // 检测文件是否上传成功
      if (this.isUploadQuest) {
        this.uploadFile(file, this.fileList.length - 1);
      } else {
        this.$emit("fileChange", file);
      }
      this.isClear = true;
    },
    async uploadFile(file, index) {
      let data = await this.$http.from("file/Upload", {
        file: file,
      });
      if (data) {
        this.fileList[index].percentage = 100;
        this.fileList[index].fileName = data.fileName;
        this.fileList[index].guid = data.guid;
        this.fileList[index].state = "success";
      } else {
        this.$message.closeAll();
        this.$message.error({
          message: "资源上传失败,请重试",
        });
        this.fileList[index].percentage = 0;
        this.fileList[index].state = "fail";
        this.fileList[index].uploadState = false;
      }
      this.isClear = true;
      this.$emit("on-success", this.fileList);
    },
    /**
     * @description: 文件拖拽进入上传组件范围
     * @version: 1.0.0
     * @param {*} e 对应的文件流
     * @return {*}
     * @author: 张泽锋
     * @Date: 2021-07-16 13:43:46
     */
    onDrop(e) {
      this.dragover = false;
      this.setFile(e.dataTransfer.files);
    },
    /**
     * @description: 文件拖拽离开上传组件范围
     * @version: 1.0.0
     * @param {*}
     * @return {*}
     * @author: 张泽锋
     * @Date: 2021-07-16 13:44:18
     */
    onDragover() {
      if (!this.disabled) {
        this.dragover = true;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style lang="scss">
.upload_view {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  transition: all 0.5s;
  border: 1px solid #dcdfe6;

  display: inline-block;
}
.upload_view:hover {
  border: 1px dashed $--color-primary;
}
.is-dragover {
  border: 1px dashed $--color-primary;
}
.upload_input {
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
}
.upload__tip {
  font-size: 12px;
  color: #606266;
}
</style>
