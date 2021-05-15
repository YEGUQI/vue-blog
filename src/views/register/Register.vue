<template>
  <div id="login_cont">
    <RegisterForm></RegisterForm>
  </div>
</template>

<script>
import RegisterForm from "./childComps/RegisterForm";
export default {
  name: "register",
  components: {
    RegisterForm
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
#login_cont {
  background-color: #4b6f94;
  height: 100%;
}
</style>