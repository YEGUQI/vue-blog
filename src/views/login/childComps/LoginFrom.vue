<template>
  <div class="login_box">
    <!-- 头像区域 -->
    <div class="login_img">
      <img
        src="~assets/login.png"
        alt=""
      >
    </div>
    <!-- 登录表单区域 -->
    <el-form
      :model="loginForm"
      label-width="0px"
      :rules="loginRules"
      ref="loginRef"
      class="login_form"
    >
      <!-- 邮箱 -->
      <el-form-item prop="email">
        <el-input
          v-model="loginForm.email"
          prefix-icon="el-icon-user-solid"
          placeholder="请输入邮箱"
        ></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          prefix-icon="el-icon-lock"
          placeholder="请输入密码"
          type="password"
        ></el-input>
      </el-form-item>
      <!-- 按钮区域 -->
      <el-form-item class="btns">
        <el-button
          type="primary"
          @click="loginClick"
        >登录</el-button>
        <el-button
          type="info"
          @click="cleanLogin"
        >重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { postLogin } from "network/login";
export default {
  name: "LoginForm",
  data() {
    return {
      // 登录表单数据
      loginForm: {
        email: "test@qq.com",
        password: "123456"
      },
      // 登录表单验证规则
      loginRules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 登录逻辑
    loginClick() {
      this.$refs.loginRef.validate(async valid => {
        if (!valid) {
          return false;
        }
        const { data: result } = await postLogin(this.loginForm);
        // 根据状态码判断登录是否成功
        if (result.meta.status !== 200) {
          return this.$message.error("登录失败");
        }
        this.$message.success("登录成功");
        console.log(result);
        // 登录成功 将从服务器返回的 token 值保存到客户端 sessionStorage 中
        // 项目中除了登录之外的 API 接口，必须要在登录以后才能访问
        // token 只应在网页打开期间生效 所以保存到 sessionStorage 中
        window.sessionStorage.setItem("token", result.data.token);
        // 登录成功跳转到
        this.$router.push("/admin");
      });
    },
    // 重置表单
    cleanLogin() {
      this.$refs.loginRef.resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.login_box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  border-radius: 5px;

}
  .login_img{
    width: 130px;
    height: 130px;
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 1px solid #eee;
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: center;
}
</style>