<template>
  <div>
    <el-container>
      <ELheader></ELheader>
      <Elmain></Elmain>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
import ELheader from "./childComps/ELheader";
import Elmain from "./childComps/Elmain";

export default {
  name: "Home",
  components: {
    ELheader,
    Elmain
  }
};
</script>

<style lang="less" scoped>
.el-header{
  background-color: #6993bd
}
.el-main{
  padding:0 100px 0 100px ;
}
.el-footer{
  background-color: #6993bd;
  margin-top: 20px;
}
</style>