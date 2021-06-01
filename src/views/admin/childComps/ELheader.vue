<template>
  <div>
    <el-header>
      <!-- logo 区域 -->
      <div class="header">
        <img
          src="~assets/img/login.png"
          alt=""
        >
        <span>一味愚管理系统</span>
      </div>
      <!-- 用户名区域 -->
      <div>
        欢迎您，管理员:
        <el-tag>{{username}}</el-tag>
      </div>
      <!-- 退出登录按钮区域 -->
      <div>
        <el-button
          @click="goHome"
          type="success"
        >去首页</el-button>
        <el-button
          @click="clearQuit"
          type="info"
        >退出登录</el-button>
      </div>
    </el-header>
  </div>
</template>

<script>
export default {
  name: "ELheader",
  data() {
    return {
      username: ""
    };
  },
  methods: {
    // 退出
    clearQuit() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    goHome() {
      this.$router.push("/home");
    }
  },
  created() {
    // 获取当前用户名
    this.username = window.sessionStorage.getItem("username");
  }
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #6993bd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0px;
  color: #fff;
  padding-right: 5px;
  > div {
    display: flex;
    align-items: center;
    margin-left: 15px;
      > span {
      margin-left: 10px;
    }

  }
}
</style>