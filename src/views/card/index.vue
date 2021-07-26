<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-07-20 16:20:58
 * @LastEditTime: 2021-07-21 10:25:34
 * @LastEditors: 张泽锋
-->
<template>
  <div
    class="background_f"
    v-waterMarker="{ text: '版权所有', textColor: 'rgba(180, 180, 180, 0.4)' }"
  >
    <!-- <sx-loading></sx-loading> -->
    <!-- <sx-model v-model="showModal"></sx-model> -->
    <div class="cardData">
      <sx-card
        v-for="(item, index) in cardData"
        :key="index"
        :data-image="item.img"
      >
        <h1 slot="header">{{ item.name }}</h1>
        <p slot="content">
          {{ item.content }}
        </p>
      </sx-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      showModal: true,
      cardData: [
        {
          img: "https://qq.yh31.com/tp/fj/202107060412250364.jpg",
          name: "Canyons",
          content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        },
        {
          img: "https://qq.yh31.com/tp/fj/202107060411461150.jpg",
          name: "Beaches",
          content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        },
        {
          img: "https://qq.yh31.com/tp/fj/202107060410468391.jpg",
          name: "Trees",
          content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        },
        {
          img: "https://qq.yh31.com/tp/fj/202107060410010021.jpg",
          name: "Lakes",
          content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped lang="scss">
.cardData {
  padding: 40px 80px;
  display: flex;
  flex-wrap: wrap;
  height: 320px !important;
  justify-content: center;
}
.waterMarker {
  height: 100vh;
  width: 100%;
}
</style>
