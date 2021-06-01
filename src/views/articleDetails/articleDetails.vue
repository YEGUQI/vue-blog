<template>
  <div>
    <el-container>
      <ELmain></ELmain>
    </el-container>
  </div>
</template>

<script>
import ELmain from "./childComps/ELmain";
export default {
  name: "articleDetails",
  components: {
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
  margin: 15px 0px  20px 0px ;
  padding:10px 200px;
}
</style>