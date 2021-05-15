<template>
  <el-main>
    <el-card class="details">
      <!-- 文章标题 -->
      <h1 class="title">{{articleInfo.title}}</h1>
      <!-- 作者 发布时间 -->
      <div class="authorTime">
        <span class="author">{{author}}</span> |
        <span>{{articleInfo.publishDate | dataFormat}}</span>
      </div>
      <!-- 文章展示区域 -->
      <div
        class="content"
        v-html="articleInfo.content"
      >
      </div>
      <el-divider></el-divider>
      <p>
        <b>评论</b>
      </p>
      <!-- 评论输入框 发布按钮 -->
      <div v-show="isLogin">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="commentInfo.content"
          class="comment"
        >
        </el-input>
        <el-button
          type="info"
          @click="addComment"
        >发布评论</el-button>
      </div>
      <!-- 评论展示区域 -->
      <div>
        <ul>
          <li>
            <span>第一条评论</span>
            <span
              v-if="isAuthor"
              class="operate"
            >
              <el-link type="primary">回复</el-link>
              <el-link type="danger">删除</el-link>
            </span>
          </li>
        </ul>
      </div>
      <!-- 返回顶部 -->
      <el-backtop :visibility-height="400">↑</el-backtop>

    </el-card>

  </el-main>
</template>

<script>
import { findArticle } from "network/article";
import { getFindUserById } from "network/user";
import { postAddComment } from "network/comment";
export default {
  data() {
    return {
      // 保存文章信息
      articleInfo: [],
      // 评论信息
      commentInfo: {
        content: "",
        username: window.sessionStorage.getItem("username"),
        praise: 0,
        isSift: false
      },
      author: ""
    };
  },
  created() {
    // 将 vuex 中保存的文章信息 赋值给 articleInfo
    this.articleInfo = this.$store.state.article;
    // 处理用户刷新页面的操作 防止刷新页面 文章信息丢失
    this.getArticleInfo();
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    // 根据 ID 获取文章数据
    async getArticleInfo() {
      const { data: result } = await findArticle(
        window.sessionStorage.getItem("articleId")
      );
      if (result.meta.status !== 200) {
        return this.$meeage.error(result.meta.msg);
      }
      this.articleInfo = result.data;
    },
    // 发布评论
    async addComment() {
      const { data: result } = await postAddComment(this.commentInfo);
      if (result.meta.status !== 200) {
        return this.$message.error(result.meta.msg);
      }
      this.$message.success(result.meta.msg);
    },
    // 根据用户 id 获取用户信息
    async getUserInfo() {
      const { data: result } = await getFindUserById(this.articleInfo.author);
      console.log(result);
      this.author = result.data.username;
    }
  },
  computed: {
    // 判断登陆者 是不是 当前文章的作者 开放删除评论权限
    isAuthor() {
      if (
        this.articleInfo.author === window.sessionStorage.getItem("username")
      ) {
        return true;
      }
      return false;
    },
    // 是否登录
    isLogin() {
      if (window.sessionStorage.getItem("token")) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="less" scoped>
.content img {
    width: 100%;
    height: 100%;
}
.details{
  padding: 0 20px 20px 20px ;
}
.authorTime{
  font-size: 13px;
  > .author{
    color: #ff7300;
    margin-bottom: 7px;
  }
}
.title{
    color: #555;
}
.comment{
  margin-bottom: 15px;
}
.operate{
  margin-right: 7px;
}
.el-link{
  margin:  0 5px 0 7px ;
}
.content{
  line-height: 2.066667rem;
}
</style>