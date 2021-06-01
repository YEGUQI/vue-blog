<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  //  provide  inject 这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。
  // provide 该对象包含可注入其子孙的属性。
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      // nextTick()是将回调函数延迟在下一次dom更新数据后调用，即当数据更新了在DOM中渲染后自动执行该函数。
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style>
@import "assets/css/global.css";
@import "assets/css/normalize.css";
@import "assets/font/iconfont.css";

</style>
