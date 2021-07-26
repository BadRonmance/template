<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-07-22 15:27:51
 * @LastEditTime: 2021-07-23 14:20:18
 * @LastEditors: 张泽锋
-->
<template>
  <div class="hei background_f" v-sxloading="showLoading">
    <sx-pagination
      :disabled="pagination.disabled"
      v-model="pagination.currentPage"
      :total="pagination.total"
      :pageSize="pagination.pageSize"
      @size-change="handleSizeChange"
      @change="change"
    ></sx-pagination>
    <el-button @click="showModal = !showModal"> dialog弹框 </el-button>
    <el-button @click="setLoading">loading</el-button>
    <sx-model v-model="showModal"></sx-model>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      showLoading: false,
      showModal: false,
      pagination: {
        total: 1000,
        pageSize: 10,
        page: 1,
        currentPage: 1,
        disabled: false,
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    change(e) {
      console.log("change", e);
    },
    handleSizeChange(e) {
      console.log("sizeChange", e);
    },
    setLoading() {
      this.showLoading = true;
      setTimeout(() => {
        this.showLoading = false;
      }, 2000);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped lang="scss"></style>
