<template>
  <div class="Register_box">
    <!-- 头像区域 -->
    <div class="Register_img">
      <img
        src="~assets/login.png"
        alt=""
      >
    </div>
    <!-- 登录表单区域 -->
    <el-form
      :model="RegisterForm"
      label-width="0px"
      :rules="RegisterRules"
      ref="RegisterRef"
      class="Register_form"
    >
      <!-- 用户名 -->
      <el-form-item prop="username">
        <el-input
          v-model="RegisterForm.username"
          prefix-icon="el-icon-user-solid"
          placeholder="请输入昵称"
          v-model.trim="RegisterForm.username"
        ></el-input>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item prop="email">
        <el-input
          v-model="RegisterForm.email"
          prefix-icon="el-icon-user-solid"
          placeholder="请输入邮箱"
          v-model.trim="RegisterForm.email"
        ></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input
          v-model="RegisterForm.password"
          prefix-icon="el-icon-lock"
          placeholder="请输入密码"
          type="password"
          v-model.trim="RegisterForm.password"
        ></el-input>
      </el-form-item>
      <!-- 二次确认密码 -->
      <el-form-item prop="password">
        <el-input
          v-model="password2"
          prefix-icon="el-icon-lock"
          placeholder="请再次输入密码"
          type="password"
          v-model.trim="password2"
        ></el-input>
      </el-form-item>
      <!-- 按钮区域 -->
      <el-form-item class="btns">
        <el-button
          type="primary"
          @click="RegisterClick"
        >注册</el-button>
        <el-button
          type="info"
          @click="cleanRegister"
        >重置</el-button>

      </el-form-item>
      <!-- 链接 -->
      <el-link
        type="primary"
        class="golink"
        :underline='false'
        @click="goRegister"
      >
        <u>已有账号，点此去登录</u>
      </el-link>
    </el-form>
  </div>
</template>

<script>
import { postAddUser } from "network/user";

export default {
  data() {
    return {
      // 登录表单数据
      RegisterForm: {
        username: "",
        email: "",
        password: ""
      },
      password2: "",
      // 注册表单验证规则
      RegisterRules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        username: [{ required: true, message: "请输入昵称", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 用户注册
    async RegisterClick() {
      if (this.RegisterForm.password !== this.password2) {
        return this.$message.error("两次输入的密码不一致，请重新输入");
      }
      const { data: result } = await postAddUser(this.RegisterForm);
      if (result.meta.status !== 200) {
        return this.$message.error(result.meta.msg);
      }
      this.$message.success("注册成功");
      this.$router.push("/login");
    },
    // 重置表单
    cleanRegister() {
      this.$refs.RegisterRef.resetFields();
    },
    // 点击去登录界面
    goRegister() {
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="less" scoped>

.Register_box{
  width: 450px;
  height: 400px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  border-radius: 5px;

}
  .Register_img{
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
.Register_form {
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
.golink{
  position: absolute;
  right: 10px;
  bottom: 8px;
  font-size: 13px;
}
</style>