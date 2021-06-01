<template>
  <el-aside width="200px">
    <el-menu
      background-color="#335374"
      text-color="#fff"
      active-text-color="#248eff"
      :unique-opened="true"
      :collapse-transition="false"
      :router="true"
      :default-active="activePath"
    >
      <!-- 用户管理 -->
      <el-submenu index="user">
        <!-- 一级菜单的模板区域 -->
        <template slot="title">
          <!-- 图标 -->
          <i class="el-icon-user-solid"></i>
          <!-- 文本内容 -->
          <slot name="one"><span>用户管理</span></slot>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item :index="index.url1">
          <!-- 二级菜单的模板区域 -->
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-menu"></i>
            <!-- 文本内容 -->
            <slot name="two">
              <span>用户列表</span>
            </slot>

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
          <slot name="three">
            <span>文章管理</span>
          </slot>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item :index="index.url2">
          <!-- 二级菜单的模板区域 -->
          <template slot="title">
            <!-- 图标 -->
            <i class="el-icon-menu"></i>
            <!-- 文本内容 -->
            <slot name="four">
              <span>文章列表</span>
            </slot>
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
  props: {
    index: {
      type: Object,
      dafault() {
        return {};
      }
    }
  },
  mounted() {
    let activePath = this.$route.path;
    // 去除 /
    this.activePath = activePath.slice(1);
  }
};
</script>

<style>

</style>