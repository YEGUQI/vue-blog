<template>
  <el-main>
    <!-- 搜索框 -->
    <el-card>
      <!-- 搜索框区域 -->
      <el-input
        placeholder="请输入文章标题来搜索文章"
        v-model="info.query"
        clearable
        @change="getArticlesList"
        @clear="getArticlesList"
      >
        <template #append>
          <el-button
            icon="el-icon-search"
            @click="getArticlesList"
          ></el-button>
        </template>
      </el-input>
    </el-card>
    <!-- 精选文章区域 -->
    <el-card v-if="siftArticlesList.length!==0">
      <el-tag>每日推送</el-tag>
      <el-row :gutter="20">
        <el-col
          :span="11"
          v-for="item in siftArticlesList.article"
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
      <!-- 页码区域 -->
      <el-pagination
        small
        layout="prev, pager, next"
        :page-size="siftArticlesList.psize"
        :total="siftArticlesList.total"
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1"
      >
      </el-pagination>
    </el-card>
    <!-- 所有文章区域 -->
    <el-card v-if="articlesList.length!==0">
      <el-tag>发现更多好文章</el-tag>
      <el-row :gutter="20">
        <el-col
          :span="11"
          v-for="item in articlesList.article"
          :key="item._id"
          class="box"
        >
          <div @click="godetails(item._id)">
            <!-- 文章封面区域 -->
            <div
              class="cover"
              v-if="item.cover!==null? true : false"
            >
              <img
                v-if="item.cover.url!==null? true : false"
                v-lazy="item.cover.url"
                alt=""
              >
            </div>
            <div class="intro">
              <h3>{{item.title}}</h3>
              <p>{{item.intro}}</p>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 页码区域 -->
      <el-pagination
        small
        layout="prev, pager, next"
        :page-size="articlesList.psize"
        :total="articlesList.total"
        @size-change="handleSizeChange2"
        @current-change="handleCurrentChange2"
      >
      </el-pagination>
    </el-card>
    <!-- 分页区域 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="allarticlesList.pnum"
      :page-sizes="[8, 16, 24, 32]"
      :page-size="allarticlesList.psize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 返回顶部 -->
    <el-backtop :visibility-height="400">↑</el-backtop>
  </el-main>
</template>

<script>
import { getAllArticlesList, findArticle } from "network/article";
import { getsiftArticlesList, getArticlesList } from "network/home";
export default {
  name: "Elmain",
  data() {
    return {
      // 所有文章
      info: {
        query: "",
        pagenum: 1,
        pagesize: 8
      },
      // 精选文章
      siftArticlesinfo: {
        query: "",
        pagenum: 1,
        pagesize: 4
      },
      // 普通文章
      articlesinfo: {
        query: "",
        pagenum: 1,
        pagesize: 4
      },
      // 所有文章数据
      allarticlesList: [],
      // 普通文章数据列表
      articlesList: [],
      // 精选文章数据列表
      siftArticlesList: [],
      // 总数据条数
      total: 0
    };
  },
  created() {
    this.getArticlesList();
  },
  methods: {
    // 获取多赢的文章数据
    async getArticlesList() {
      // 搜索框数据联动
      this.siftArticlesinfo.query = this.info.query;
      this.articlesinfo.query = this.info.query;
      // 获取所有文章数据
      const { data: result1 } = await getAllArticlesList(this.info);
      this.allarticlesList = result1.data;
      this.total = result1.data.total;

      // 获取精选文章数据
      const { data: result2 } = await getsiftArticlesList(
        this.siftArticlesinfo
      );
      this.siftArticlesList = result2.data;
      // 获取普通文章数据
      const { data: result3 } = await getArticlesList(this.articlesinfo);
      this.articlesList = result3.data;
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
    // 所有文章的每页数据条数改变时会触发
    handleSizeChange(newsize) {
      this.info.pagesize = newsize;
      this.siftArticlesinfo.pagesize = newsize;
      this.articlesinfo.pagesize = newsize;
      this.getArticlesList();
    },
    // 所有文章的当前的页码发生变化触发
    handleCurrentChange(pagenum) {
      this.info.pagenum = pagenum;
      this.siftArticlesinfo.pagenum = pagenum;
      this.articlesinfo.pagenum = pagenum;
      this.getArticlesList();
    },
    // 精选文章的每页数据条数改变时会触发
    handleSizeChange1(newsize) {
      this.siftArticlesinfo.pagesize = newsize;
      this.getArticlesList();
    },
    // 精选文章的当前的页码发生变化触发
    handleCurrentChange1(pagenum) {
      this.siftArticlesinfo.pagenum = pagenum;
      this.getArticlesList();
    },
    // 普通文章的每页数据条数改变时会触发
    handleSizeChange2(newsize) {
      this.articlesinfo.pagesize = newsize;
      this.getArticlesList();
    },
    // 普通文章的当前的页码发生变化触发
    handleCurrentChange2(pagenum) {
      this.articlesinfo.pagenum = pagenum;
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