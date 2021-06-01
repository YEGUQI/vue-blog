<template>
  <div>
    <el-container class="contain">
      <ELheader></ELheader>
      <Elmain v-if="this.$route.fullPath === '/home'"></Elmain>
      <router-view v-else></router-view>
      <Elfooter :class="[this.$route.fullPath === '/userInfo'?'':'footer']"></Elfooter>
    </el-container>
  </div>
</template>

<script>
import ELheader from "./childComps/ELheader";
import Elmain from "./childComps/Elmain";
import Elfooter from "./childComps/Elfooter";

export default {
  name: "Home",
  components: {
    ELheader,
    Elmain,
    Elfooter
  }
};
</script>

<style lang="less" scoped>
.el-header{
  background-color: #6993bd
}
.el-main{
  padding:0 100px;
  margin-bottom: 20px;
}
.el-footer{
  background-color: #6993bd;
}

.contain {
  flex-direction: column;
  height: 100%;
}
</style>