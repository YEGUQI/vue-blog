<template>
  <el-header>
    <!-- logo 区域 -->
    <slot name="left">
      <div class="login">
        <a href="/home">
          <img
            src="~assets/img/login.png"
            alt=""
          >
        </a>
        <span>博客</span>
      </div>
    </slot>
    <!-- 用户名区域 -->
    <slot name="right">
      <div class="userinfo">
        <!-- 登录后显示 -->
        <div
          v-if="isLogin"
          class="user"
        >
          <el-tag class="username">{{username}}</el-tag>
          <el-button
            class="el-icon-edit"
            size="medium"
            type="success"
            @click="goAddArticle"
            v-show="isAddBtn"
          >写文章</el-button>
          <el-button
            size="medium"
            type="success"
            @click="goHome"
            v-show="isShow"
          >首页</el-button>
          <el-button
            @click="clearQuit"
            size="medium"
            type="info"
          >退出登录</el-button>
        </div>
        <!-- 未登录显示 -->
        <div
          v-else
          class="user"
        >
          <el-button
            type="primary"
            @click="goLogin"
          >登录</el-button>
          <el-button
            type="success"
            @click="goRegister"
          >注册</el-button>
        </div>
      </div>
    </slot>
  </el-header>
</template>

<script>
export default {
  name: "ELheader",
  // 注入依赖
  inject: ["reload"],
  data() {
    return {
      username: ""
    };
  },
  methods: {
    goAddArticle() {
      this.$router.push("/useadd");
    },
    goLogin() {
      this.$router.push("/login");
    },
    goRegister() {
      this.$router.push("/register");
    },
    goHome() {
      this.$router.push("/home");
    },
    // 退出登录
    clearQuit() {
      window.sessionStorage.clear();
      // 刷新页面
      this.reload();
    }
  },
  created() {
    // 获取当前用户名
    this.username = window.sessionStorage.getItem("username");
  },
  computed: {
    // 是否启用发布文章按钮
    isAddBtn() {
      // 处于 首页  文章详情页 并且 用户已经登录 时启用
      if (
        (this.$route.fullPath === "/home" ||
          this.$route.fullPath === "/details") &&
        this.isLogin
      ) {
        return true;
      }
      return false;
    },
    // 用户是否登录
    isLogin() {
      if (window.sessionStorage.getItem("token")) {
        return true;
      }
      return false;
    },
    // 是否启用发布文章 首页按钮
    isShow() {
      if (this.$route.fullPath !== "/home") {
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #6993bd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 0 100px 0 100px ;
    > .login {
    display: flex;
    align-items: center;
    > span {
      margin-left: 7px;
    }
}
}
.user {
  display: flex;
  align-items: center;
    > span {
    margin-left: 10px;
  }
    > .username{
    margin-right: 15px;
  }
}
</style>