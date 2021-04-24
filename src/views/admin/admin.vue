<template>
  <div class="contain-height">
    <ELheader></ELheader>
    <el-container class="contain-height">
      <ELaside></ELaside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import { getUserList } from "network/user";

import ELheader from "admin/childComps/ELheader";
import ELaside from "./childComps/ELaside.vue";
export default {
  components: {
    ELheader,
    ELaside
  },
  data() {
    return {
      info: {
        query: "",
        pagenum: 1,
        pagesize: 5
      }
    };
  },

  methods: {
    async getUserList() {
      const result = await getUserList(this.info);
      console.log(result);
    }
  }
};
</script>

<style lang="less" scoped>
.contain-height {
  height: 100%;
}
.el-aside {
  background-color: #4a6a8b;
  // background-color: #396ea3;
}
.el-main {
  background-color: rgb(255, 245, 247);
}
</style>