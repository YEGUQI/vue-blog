<template>
  <div>
    <!-- 面包屑导航 -->
    <slot name="top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>文章管理</el-breadcrumb-item>
        <el-breadcrumb-item>文章列表</el-breadcrumb-item>
        <el-breadcrumb-item>发布文章</el-breadcrumb-item>
      </el-breadcrumb>
    </slot>
    <el-card>
      <!-- 消息提示区域 -->
      <el-alert
        title="发布文章"
        type="success"
        center
        :closable="false"
      >
      </el-alert>

      <!-- 添加文章表单区域 -->
      <el-form
        :model="addArticleForm"
        :rules="addArticleRules"
        ref="addArticleRef"
        label-width="100px"
      >
        <el-form-item
          label="文章标题"
          prop="title"
        >
          <el-input v-model="addArticleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="文章简介">
          <el-input v-model="addArticleForm.intro"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input
            v-model="username"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="发布时间"
          prop="publishDate"
        >
          <el-date-picker
            v-model="addArticleForm.publishDate"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="文章封面">
          <el-upload
            :action="uploadUrl"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            list-type="picture"
            :headers="uploadheaders"
            :on-success="uploadSuccess"
            :limit='1'
            :on-exceed="beyondlimit"
          >
            <el-button
              size="small"
              type="primary"
            >点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章内容">
          <quill-editor
            v-model="addArticleForm.content"
            :options="editorOption"
            ref="myQuillEditor"
          ></quill-editor>
          <el-button
            type="primary"
            class="subbtn"
            @click="addArticle"
          >点击发布</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-dialog
      title="图片预览"
      :visible.sync="previewDialogVisible"
      width="50%"
    >
      <img
        :src="previewUrl"
        alt=""
        class="previewImg"
      />
    </el-dialog>
  </div>
</template>

<script>
import { addArticle } from "network/article";
import { quillRedefine } from "vue-quill-editor-upload";
export default {
  name: "addArticle",
  data() {
    return {
      // 添加文章表单数据
      addArticleForm: {
        title: "",
        // 此处传递回去的应该是用户id
        author: "",
        publishDate: "",
        cover: {},
        content: "",
        intro: "",
        // 文章中引用的图片
        articleImg: {}
      },
      // 添加文章表单验证规则
      addArticleRules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          { min: 4, max: 20, message: "长度在 4 到 20 个字符", trigger: "blur" }
        ],
        content: [
          { required: true, message: "请输入文章内容", trigger: "blur" }
        ],
        publishDate: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ]
      },
      // 文件上传的url地址
      uploadUrl: "http://127.0.0.1/admin/articles/upload",
      uploadUrl2: "http://127.0.0.1/admin/articles/articleUp",
      // 配置文件上传的请求头信息
      uploadheaders: {
        Authorization: window.sessionStorage.getItem("token")
      },
      // 配置预览图片的 url
      previewUrl: "",
      // 控制预览图片对话框的显示与隐藏
      previewDialogVisible: false,
      editorOption: {},
      // 页面上显示的用户名
      username: ""
    };
  },
  created() {
    // 获取用户 id 传递给后端
    this.addArticleForm.author = window.sessionStorage.getItem("userId");
    // 根据获取当前用户名
    this.username = window.sessionStorage.getItem("username");
    //修改富文本编辑器图片上传路径
    this.editorOption = quillRedefine({
      // 图片上传的设置
      uploadConfig: {
        action: this.uploadUrl2, // 必填参数 图片上传地址
        res: respnse => {
          this.addArticleForm.articleImg = respnse.data;
          return respnse.data.url; //return图片 url
        }
      }
    });
  },
  methods: {
    // 监听图片上传成功的事件
    uploadSuccess(response) {
      // 将服务器返回的 路径保存在 addArticleForm.cover 中
      this.addArticleForm.cover = response.data;
      console.log(this.addArticleForm.cover);
    },
    // 处理图片的预览效果的钩子函数
    handlePreview(file) {
      this.previewUrl = file.url;
      this.previewDialogVisible = true;
    },
    // 处理移除图片的操作
    handleRemove() {
      this.addArticleForm.cover = null;
    },
    //文件超出个数限制时的钩子函数
    beyondlimit() {
      this.$message.warning("只能上传一张封面！");
    },
    // 点击提交文章
    async addArticle() {
      const { data: result } = await addArticle(this.addArticleForm);
      if (result.meta.status !== 200) {
        return this.$message.error("发布文章失败");
      }
      console.log(this.$route.fullPath);
      // 判断当前是 用户添加 文章 还是 管理员 添加文章
      if (this.$route.fullPath === "/useadd") {
        // 用户添加文章 成功后跳转到首页
        return this.$router.push("/home");
      }
      // 管理员添加文章 成功后跳转到文章管理页
      this.$router.push("/article");
      this.$message.success("发布文章成功");
    }
  }
};
</script>

<style lang="less" scoped>
.el-alert{
  margin-bottom: 15px;
}
.subbtn {
  margin-top: 15px;
}
.previewImg{
  width: 100%;
}
</style>