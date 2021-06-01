<template>
  <div class="contain-height">
    <el-container class="contain-height">
      <ELaside
        :index="{url1:'info',url2:'userpub'}"
        class="aside"
      >
        <template v-slot:one>
          <span>资料管理</span>
        </template>
        <template v-slot:two>
          <span>我的个人信息</span>
        </template>
        <template v-slot:three>
          <span>我的文章</span>
        </template>
        <template v-slot:four>我发布的</template>
      </ELaside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import ELaside from "content/ELaside.vue";
export default {
  components: {
    ELaside
  }
};
</script>

<style lang="less" scoped>
.contain-height {
  height:650px;
}
.el-aside {
  background-color: #4a6a8b;
}
</style>