<template>
  <el-aside width="200px">
    <el-menu
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409BFF"
      :unique-opened="true"
      :collapse-transition="false"
      :router="true"
    >
      <!-- 用户管理 -->
      <el-submenu index="1">
        <!-- 一级菜单的模板区域 -->
        <template slot="title">
          <!-- 图标 -->
          <i></i>
          <!-- 文本内容 -->
          <span>用户管理</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item index="users">
          <!-- 二级菜单的模板区域 -->
          <template slot="title">
            <!-- 图标 -->
            <i></i>
            <!-- 文本内容 -->
            <span>用户列表</span>
          </template>
        </el-menu-item>
      </el-submenu>
      <!-- 文章管理 -->
      <el-submenu index="2">
        <!-- 一级菜单的模板区域 -->
        <template slot="title">
          <!-- 图标 -->
          <i></i>
          <!-- 文本内容 -->
          <span>文章管理</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item index="post">
          <!-- 二级菜单的模板区域 -->
          <template slot="title">
            <!-- 图标 -->
            <i></i>
            <!-- 文本内容 -->
            <span>文章列表</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {};
</script>

<style>

</style>