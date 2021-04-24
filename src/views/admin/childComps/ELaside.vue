<template>
  <el-aside width="200px">
    <el-menu
      background-color="#335374"
      text-color="#fff"
      active-text-color="#248eff"
      :unique-opened="true"
      :collapse-transition="false"
      :router="true"
      default-active="user"
    >
      <!-- 用户管理 -->
      <el-submenu index="user">
        <!-- 一级菜单的模板区域 -->
        <template slot="title">
          <!-- 图标 -->
          <i class="el-icon-user-solid"></i>
          <!-- 文本内容 -->
          <span>用户管理</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item
          index="users"
          @click="saveState"
        >
          <!-- 二级菜单的模板区域 -->
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-menu"></i>
            <!-- 文本内容 -->
            <span>用户列表</span>
          </template>
        </el-menu-item>
      </el-submenu>
      <!-- 文章管理 -->
      <el-submenu index="article ">
        <!-- 一级菜单的模板区域 -->
        <template slot="title">
          <!-- 图标 -->
          <i class="el-icon-postcard"></i>
          <!-- 文本内容 -->
          <span>文章管理</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item
          index="article"
          @click="saveState"
        >
          <!-- 二级菜单的模板区域 -->
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-menu"></i>
            <!-- 文本内容 -->
            <span>文章列表</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "ELaside",
  data() {
    return {
      activePath: ""
    };
  },
  created() {
    //将二级菜单链接状态 赋值给  activePath
    this.activePath = window.sessionStorage.getItem("activeState");
  },
  methods: {
    // 保存二级菜单链接状态
    saveState(activePath) {
      window.sessionStorage.setItem("activeState", activePath);
      this.activePath = activePath;
    }
  }
};
</script>

<style>

</style>