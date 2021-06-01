<template>
  <div>
    <el-card>
      <!-- 搜索框区域 -->
      <el-input
        placeholder="请输入文章标题来搜索文章"
        v-model="info.query"
        clearable
        @change="findUserArticle"
        @clear="findUserArticle"
      >
        <template #append>
          <el-button
            icon="el-icon-search"
            @click="findUserArticle"
          ></el-button>
        </template>
      </el-input>
    </el-card>
    <!-- 文章列表区域 -->
    <el-card v-if="articleList.length!==0">
      <el-row :gutter="20">
        <el-col
          :span="11"
          v-for="item in articleList.article"
          :key="item._id"
          class="box"
        >
          <div @click="godetails(item._id)">
            <!-- 文章封面区域 -->
            <div
              class="cover"
              v-show="item.cover.url!==null? true : false"
            >
              <img
                alt=""
                v-lazy="item.cover.url"
                v-show="item.cover.url===null? 'true' : 'false'"
              >
            </div>
            <div class="intro">
              <h3>{{item.title}}</h3>
              <p>{{item.intro}}</p>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-pagination
        small
        layout="prev, pager, next"
        :page-size="articleList.psize"
        :total="articleList.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { findUserArticle } from "network/user";
import { findArticle } from "network/article";
export default {
  data() {
    return {
      articleList: {},
      info: {
        query: "",
        pagenum: 1,
        pagesize: 8
      }
    };
  },
  created() {
    this.findUserArticle();
  },
  methods: {
    async findUserArticle() {
      const { data: result } = await findUserArticle(
        window.sessionStorage.getItem("userId"),
        this.info
      );
      if (result.meta.status !== 200) {
        return this.$message.error(result.meta.msg);
      }
      this.$message.success(result.meta.msg);
      this.articleList = result.data;
    },
    // 点击跳转到文章详情页
    async godetails(id) {
      window.sessionStorage.setItem("articleId", id);
      // 根据id查询 对应的文章信息
      const { data: result } = await findArticle(id);
      if (result.meta.status !== 200) {
        return this.$message.error(result.meta.msg);
      }
      // 将查询到的文章信息保存在 vuex 中
      this.$store.state.article = result.data;
      // 跳转到文章详情页
      this.$router.push("/details");
    },
    // 精选文章的每页数据条数改变时会触发
    handleSizeChange(newsize) {
      this.siftArticlesinfo.pagesize = newsize;
      this.getArticlesList();
    },
    // 精选文章的当前的页码发生变化触发
    handleCurrentChange(pagenum) {
      this.siftArticlesinfo.pagenum = pagenum;
      this.getArticlesList();
    }
  }
};
</script>

<style lang="less" scoped>
.cover{
  height: 280px;
  width: 200px;
  text-align: center;
  margin: 15px auto !important;
}
.cover img{
  width: 100%;
  height: 100%;
  text-align: center;
}
.el-row{
  margin: none i !important;
}
.box{
  margin:15px 8px 0px 30px;
  padding: 0px  !important;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4%;
 
}
.box:hover{
  box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.5)
}
.el-card{
  margin-top: 15px;
  margin-right: 15px;
}
.intro{
  text-align: center;
}
.el-pagination{
  text-align: center;
  margin-top: 25px;
}

</style>