<template>
  <div>
    <Elheader></Elheader>
    <useAddArticle class="addContent">
      <template v-slot:top>
        <el-page-header
          @back="goBack"
          content="发布新文章"
        >
        </el-page-header>
      </template>
    </useAddArticle>
  </div>
</template>

<script>
import Elheader from "../childComps/ELheader";
import useAddArticle from "content/addArticle";
export default {
  name: "addArticle",
  components: {
    useAddArticle,
    Elheader
  },
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.push("/home");
    }
  }
};
</script>

<style lang="less" scoped>
.el-page-header{
  line-height: 50px;
}
.addContent{
  padding:0 100px 0 100px ;
}
</style>