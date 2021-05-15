<template>
  <div>
    <el-container>
      <ELheader></ELheader>
      <ELmain></ELmain>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
import ELheader from "home/childComps/ELheader";
import ELmain from "./childComps/ELmain";
export default {
  name: "articleDetails",
  components: {
    ELheader,
    ELmain
  }
};
</script>

<style lang="less" scoped>
.el-container{
  height: 100%;
  width: 100%;
}
.el-main{
  margin-top: 15px;
  padding:10px 200px 10px 200px ;
}
</style>