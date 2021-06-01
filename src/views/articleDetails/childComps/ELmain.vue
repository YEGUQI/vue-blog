<template>
  <el-main>
    <!-- 数据存在时才进行渲染  -->
    <el-card
      class="details"
      v-if="articleInfo.author!=undefined && articleInfo!=undefined"
    >
      <!-- 文章展示区域 -->
      <div>
        <!-- 文章标题 -->
        <h1 class="title">{{articleInfo.title}}</h1>
        <!-- 作者 发布时间 -->
        <div class="authorTime">
          <span class="author">{{articleInfo.author.username}}</span> |
          <span>{{articleInfo.publishDate | dataFormat}}</span>
        </div>
        <!-- 文章展示区域 -->
        <div
          class="content"
          v-html="articleInfo.content"
        >
        </div>
      </div>

      <!-- 分割线 -->
      <el-divider></el-divider>

      <!-- 评论模块 -->
      <div v-show="isHome">
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
        <b v-show="!isLogin">请先<el-link href="/login">登录</el-link></b>
        <!-- 评论展示区域 -->
        <div>
          <ul>
            <li
              v-for="item in commentList"
              :key='item._id'
            >
              <div class="commit">
                <!-- 评论人 日期 邮箱地址 -->
                <div class="userinfo">
                  <span class="username">{{item.userId.username}}</span>&nbsp;|&nbsp;
                  <span>{{item.publishDate | dataFormat}}</span>&nbsp;|&nbsp;
                  <span>{{item.userId.email}}</span>
                </div>
                <!-- 评论内容 以及删除回复按钮 -->
                <div>
                  <span>{{item.content}}</span>
                  <!-- 对应的删除和回复按钮 -->
                  <span
                    v-if="isAuthor"
                    class="operate"
                  >
                    <el-link
                      type="primary"
                      @click="showDialog(item._id)"
                    >回复</el-link>
                    <el-link
                      type="danger"
                      @click="deleteComment(item._id)"
                    >删除</el-link>
                  </span>
                </div>
              </div>
              <!--  -->
              <div
                v-for="itam in commentBackList"
                :key='itam._id'
                v-show="isShow(item._id,itam.commentId)"
                class="commit back"
              >
                <!-- 评论人 日期 邮箱地址 -->
                <div class="userinfo">
                  <span class="username">{{itam.userId.username}}</span>&nbsp;|&nbsp;
                  <span>{{itam.publishDate | dataFormat}}</span>&nbsp;|&nbsp;
                  <span>{{itam.userId.email}}</span>
                </div>
                <!-- 评论内容 以及删除回复按钮 -->
                <div>
                  <span>{{itam.content}}</span>
                  <!-- 对应的删除和回复按钮 -->
                  <span
                    v-if="isAuthor"
                    class="operate"
                  >
                    <el-link
                      type="danger"
                      @click="deleteCommentBack(itam._id)"
                    >删除</el-link>
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- 评论回复输入框 -->
      <el-dialog
        title="评论回复框"
        :visible.sync="CommentBackdialogVisible"
        width="35%"
      >
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="CommentBackInfo.content"
        >
        </el-input>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="CommentBackdialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="CommentBack"
          >确 定</el-button>
        </span>
      </el-dialog>

      <!-- 返回顶部 -->
      <el-backtop :visibility-height="400">↑</el-backtop>

    </el-card>
  </el-main>
</template>

<script>
import { findArticle } from "network/article";
import {
  postAddComment,
  deleteCommentById,
  CommentBack,
  deleteCommentBackById
} from "network/comment";
export default {
  data() {
    return {
      // 查询到的文章信息
      articleInfo: [],
      // 查询到的评论信息
      commentList: [],
      // 查询到的评论回复信息
      commentBackList: null,
      // 保存评论信息
      commentInfo: {
        content: "",
        praise: 0,
        isSift: false,
        articleId: window.sessionStorage.getItem("articleId"),
        userId: window.sessionStorage.getItem("userId")
      },
      // 保存评论回复相关的信息
      CommentBackInfo: {
        content: "",
        commentId: "",
        userId: window.sessionStorage.getItem("userId"),
        praise: 0,
        isSift: false
      },
      CommentBackdialogVisible: false
    };
  },
  created() {
    // 根据 id 获取文章信息
    this.getArticleInfo();
  },
  mounted() {},
  methods: {
    // 根据 ID 获取文章数据
    async getArticleInfo() {
      const { data: result } = await findArticle(
        window.sessionStorage.getItem("articleId")
      );
      if (result.meta.status !== 200) {
        return this.$meeage.error(result.meta.msg);
      }
      this.articleInfo = result.data.article;
      this.commentList = result.data.comment;
      this.commentBackList = result.data.commentBack;
    },
    // 发布评论
    async addComment() {
      const { data: result } = await postAddComment(this.commentInfo);
      if (result.meta.status !== 200) {
        return this.$message.error(result.meta.msg);
      }
      this.$message.success(result.meta.msg);
      // 清空文本域中的内容
      this.commentInfo.content = "";
      this.getArticleInfo();
    },
    // 删除评论
    async deleteComment(id) {
      // 弹出警示框
      const confirmres = await this.$confirm(
        "是否删除该评论, 是否继续?",
        "提示",
        { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }
      ).catch(err => err);
      if (confirmres !== "confirm") {
        return this.$message.info("已取消删除操作");
      }
      const { data: result } = await deleteCommentById(id);
      if (result.meta.status !== 200) {
        return this.$$message.error(result.meta.msg);
      }
      this.$message.success(result.meta.msg);
      this.getArticleInfo();
    },
    // 展示评论回复框
    showDialog(id) {
      this.CommentBackdialogVisible = true;
      this.CommentBackInfo.commentId = id;
    },
    // 评论回复
    async CommentBack() {
      const { data: result } = await CommentBack(this.CommentBackInfo);
      if (result.meta.status !== 200) {
        return this.$message.error(result.meta.msg);
      }
      this.$message.success(result.meta.msg);
      this.CommentBackdialogVisible = false;
      // 重新获取数据
      this.getArticleInfo();
    },
    // 根据 id 删除回复的评论
    async deleteCommentBack(id) {
      // 弹出警示框
      const confirmres = await this.$confirm(
        "是否删除该评论, 是否继续?",
        "提示",
        { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }
      ).catch(err => err);
      if (confirmres !== "confirm") {
        return this.$message.info("已取消删除操作");
      }
      const { data: result } = await deleteCommentBackById(id);
      if (result.meta.status !== 200) {
        return this.$message.error(result.meta.msg);
      }
      this.$message.success(result.meta.msg);
      // 重新获取数据
      this.getArticleInfo();
    },
    // 显示回复的评论
    isShow(id1, id2) {
      if (id1 === id2) {
        return true;
      }
      return false;
    }
  },
  computed: {
    // 判断登陆者 是不是 当前文章的作者 开放删除评论权限
    isAuthor() {
      if (
        this.articleInfo.author._id === window.sessionStorage.getItem("userId")
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
    },
    // 判断当前是否处于首页
    isHome() {
      if (this.$route.fullPath !== "/preview") {
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
  text-align: center;
}
.el-link{
  margin:  0 5px 0 7px ;
}
.content{
  line-height: 2.066667rem;
}
.commit{
  margin-top: 15px;
  >.userinfo{
    margin-bottom: 10px;
    font-size: 14px;
    > .username{
      color: #ff7300;
    }
  }
}
.back{
  margin-left: 25px;
  font-size: 14px;
}
</style>