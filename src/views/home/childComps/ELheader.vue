<template>
  <el-header>
    <!-- logo 区域 -->
    <div
      class="login"
      @click="goHome"
    >
      <img
        src="~assets/img/login.png"
        alt=""
      >
      <span>一味愚</span>
    </div>

    <!-- 用户名区域 -->
    <div class="userinfo">
      <!-- 登录后显示 -->
      <div
        v-if="isLogin"
        class="user"
      >
        <!-- 用户头像和用户名 -->
        <a
          class="avatarName"
          href="/userInfo"
        >
          <el-avatar
            :src="useravatar"
            class="avatar"
          ></el-avatar>
          <el-tag
            class="username"
            size="medium"
          >{{username}}</el-tag>
        </a>
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
  </el-header>
</template>

<script>
import { getFindUserById } from "network/user";

export default {
  name: "ELheader",
  // 注入依赖
  inject: ["reload"],
  data() {
    return {
      username: "",
      useravatar: ""
    };
  },
  created() {
    // 获取当前用户名
    this.username = window.sessionStorage.getItem("username");
    if (window.sessionStorage.getItem("userId")) {
      this.findUserinfo();
    }
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
      // 判断当前是否处于首页
      if (this.$route.fullPath === "/home") {
        // 刷新页面
        return this.reload();
      }
      // 跳转到首页
      this.$router.push("/home");
    },
    // 退出登录 删除 sessionStorage 中保存的所有登录用户的信息
    clearQuit() {
      // 删除 sessionStorage 中保存的 token
      window.sessionStorage.removeItem("token");
      // 删除 sessionStorage 中保存的 username
      window.sessionStorage.removeItem("username");
      // 删除 sessionStorage 中保存的 userId
      window.sessionStorage.removeItem("userId");
      // 刷新页面
      this.reload();
    },
    // 根据 id查询用户信息
    async findUserinfo() {
      const { data: result } = await getFindUserById(
        window.sessionStorage.getItem("userId")
      );
      if (result.meta.status !== 200) {
        return this.$message.error("获取用户头像失败");
      }
      this.useravatar = result.data.avatar.url;
    }
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
    cursor: pointer;
    > span {
      margin-left: 7px;
    }
}
}
.user {
  display: flex;
  align-items: center;
    > span {
    margin-right: 10px;
  }
  >.avatarName{
    vertical-align:middle;
    line-height: 60px;
    >.avatar{
      position: relative;
      top: 12px;
    }
    >.username{
    margin:0px  10px 0px 10px;
    position: relative;
    top: -8px;
  }
  }
}
.el-header{
  height: 70px !important;
}
.el-avatar{
  width: 50px;
  height: 50px;
}
</style>