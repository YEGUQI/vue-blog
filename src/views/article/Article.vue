<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <ArticleContent></ArticleContent>
  </div>
</template>

<script>
import ArticleContent from "./childComps/ArticleContent";
export default {
  name: "Article",
  components: {
    ArticleContent
  }
};
</script>

<style lang="less" scoped>

</style>