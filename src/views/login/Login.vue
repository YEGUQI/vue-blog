<template>
  <div id="login_cont">
    <loginFrom></loginFrom>
  </div>
</template>

<script>
import LoginFrom from "./childComps/LoginFrom.vue";
export default {
  components: { LoginFrom },
  name: "Login"
};
</script>

<style lang="less" scoped>
#login_cont {
  background-color: #4b6f94;
  height: 100%;
}
</style>