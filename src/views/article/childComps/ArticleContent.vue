<template>
  <div>
    <el-card>
      <!-- 搜索框和添加按钮区域 -->
      <el-row :gutter="20">
        <!-- 搜索框区域 -->
        <el-col :span="8">
          <el-input
            placeholder="请输入文章标题"
            v-model="info.query"
            clearable
            @change="getArticleList"
            @clear="getArticleList"
          >
            <template #append>
              <el-button
                icon="el-icon-search"
                @click="getArticleList"
              ></el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button
            @click="goAddatricle"
            type="primary"
          >发布文章</el-button>
        </el-col>
      </el-row>

      <!-- 文章列表数据 -->
      <el-table
        :data="articlesList.article"
        border
        style="width: 100%"
        :default-sort="{prop: 'isStick', order: 'descending'}"
      >
        <el-table-column
          prop="title"
          label="文章标题"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="author.username"
          label="作者"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="publishDate"
          label="发布时间"
          sortable
        >
          <template slot-scope="scope">
            {{scope.row.publishDate | dataFormat}}
          </template>
        </el-table-column>
        <el-table-column
          prop="isStick"
          label="精选文章"
          sortable
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isStick"
              active-color="#13ce66"
              @change="Stick(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="findArticleById(scope.row._id)"
            >编辑</el-button>
            <el-button
              type='warning'
              @click="deleteArticle(scope.row._id)"
            >删除</el-button>
            <el-button
              type="success"
              @click="previewArticle(scope.row._id)"
            >预览</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="articlesList.pnum"
        :page-sizes="[5, 20, 30, 40]"
        :page-size="articlesList.psize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>

    </el-card>
  </div>
</template>

<script>
import {
  getAllArticlesList,
  deleteArticle,
  StickArticle,
  findArticle
} from "network/article";
export default {
  name: "ArticleContent",
  data() {
    return {
      info: {
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      // 文章数据列表
      articlesList: [],
      // 总数据条数
      total: 0,
      username: ""
    };
  },
  created() {
    this.getArticleList();
  },
  methods: {
    // 跳转到添加文章页面
    goAddatricle() {
      this.$router.push("/admadd");
    },
    // 每页数据条数改变时会触发
    handleSizeChange(newsize) {
      this.info.pagesize = newsize;
      this.getArticleList();
    },
    // 当前的页码发生变化触发
    handleCurrentChange(pagenum) {
      this.info.pagenum = pagenum;
      this.getArticleList();
    },
    // 获取所有文章数据
    async getArticleList() {
      const { data: result } = await getAllArticlesList(this.info);
      if (result.meta.status !== 200) {
        return this.$message.error("获取文章列表数据失败");
      }
      this.articlesList = result.data;
      this.total = result.data.total;
    },
    //删除文章
    async deleteArticle(id) {
      // 弹出警示框
      const confirmres = await this.$confirm(
        "此操作将永久删除该文章, 是否继续?",
        "提示",
        { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }
      ).catch(err => err);
      if (confirmres !== "confirm") {
        return this.$message.info("已取消删除操作");
      }
      // 发送删除请求
      const { data: result } = await deleteArticle(id);
      if (result.meta.status !== 200) {
        return this.$message.error("删除文章失败");
      }
      this.$message.success("删除文章成功");
      this.getArticleList();
    },
    // 文章置顶
    async Stick(info) {
      const { data: result } = await StickArticle(info);
      if (result.meta.status !== 200) {
        return this.$message.error(result.meta.msg);
      }
      if (info.isStick) {
        return this.$message.success(result.meta.msg);
      }
      this.$message.success("已取消文章置顶");
    },
    // 根据 id 查找文章信息
    async findArticleById(id) {
      window.sessionStorage.setItem("articleId", id);
      const { data: result } = await findArticle(id);
      this.$store.state.article = result.data;
      this.$router.push("/edit");
    },
    previewArticle(id) {
      window.sessionStorage.setItem("articleId", id);
      this.$router.push("/preview");
    }
  }
};
</script>

<style lang="less" scoped>
.el-table{
  margin: 15px 0 15px 0;
}
</style>