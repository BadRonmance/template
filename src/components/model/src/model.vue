<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-07-20 16:45:09
 * @LastEditTime: 2021-07-23 13:26:57
 * @LastEditors: 张泽锋
-->
<template>
  <div v-if="showModal">
    <transition name="fade" appear>
      <div class="modal-overlay" @click="close"></div>
    </transition>
    <transition name="pop" appear>
      <div class="modal" role="dialog" v-if="showModal">
        <h1>Vue Transitions</h1>
        <p>
          The <code>&lt;transition&gt;</code> component in Vue can create
          wonderful animated entrances and exits.
        </p>
        <button @click="close" class="button">Hide Modal</button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  model: {
    prop: "showModal",
    event: "change",
  },
  props: {
    showModal: Boolean,
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    close() {
      this.$emit("change", false);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped lang="scss">
.modal {
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  text-align: center;
  width: fit-content;
  height: fit-content;
  max-width: 22em;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  background: #fff;
  z-index: 999;
  transform: none;
}
.modal h1 {
  margin: 0 0 1rem;
}

.modal-overlay {
  content: "";
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 998;
  background: #2c3e50;
  opacity: 0.6;
  cursor: pointer;
}

/* ---------------------------------- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}
</style>
