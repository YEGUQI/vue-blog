<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
      <el-breadcrumb-item>修改文章</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 消息提示区域 -->
      <el-alert
        title="修改文章"
        type="warning"
        center
        :closable="false"
      >
      </el-alert>

      <!-- 添加文章表单区域 -->
      <el-form
        :model="editArticleForm"
        :rules="editArticleRules"
        ref="editArticleRef"
        label-width="100px"
      >
        <el-form-item
          label="文章标题"
          prop="title"
        >
          <el-input v-model="editArticleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="文章简介">
          <el-input v-model="editArticleForm.intro"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input
            v-model="editArticleForm.author.username"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="发布时间"
          prop="publishDate"
        >
          <el-date-picker
            v-model="editArticleForm.publishDate"
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
            :file-list="fileList"
          >
            <el-button
              size="small"
              type="primary"
            >点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章内容">
          <quill-editor
            v-model="editArticleForm.content"
            :options="editorOption"
            ref="myQuillEditor"
          ></quill-editor>
          <el-button
            type="primary"
            class="subbtn"
            @click="editArticle"
          >完成修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 图片预览对话框 -->
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
import { editArticle, findArticle } from "network/article";
import { quillRedefine } from "vue-quill-editor-upload";

export default {
  name: "editArticle",
  data() {
    return {
      // 修改文章表单数据
      editArticleForm: {
        title: "",
        author: "",
        publishDate: "",
        cover: {},
        content: "",
        intro: "",
        // 文章中引用的图片
        articleImg: []
      },
      // 修改文章表单验证规则
      editArticleRules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          { min: 4, max: 20, message: "长度在 4 到 20 个字符", trigger: "blur" }
        ],
        content: [
          { required: true, message: "请输入文章内容", trigger: "blur" }
        ],
        publishDate: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ]
      },
      // 配置文件上传的 url
      uploadUrl: "http://127.0.0.1/admin/articles/upload",
      uploadUrl2: "http://127.0.0.1/admin/articles/articleUp",
      // 配置文件上传的请求头
      uploadheaders: {
        Authorization: window.sessionStorage.getItem("token")
      },
      // 预览图片的url
      previewUrl: "",
      // 控制预览图片对话框的显示与隐藏
      previewDialogVisible: false,
      editorOption: {},
      fileList: [
        {
          name: "",
          url: ""
        }
      ]
    };
  },
  created() {
    this.getArticleInfo();
    //修改富文本编辑器图片上传路径
    this.editorOption = quillRedefine({
      // 图片上传的设置
      uploadConfig: {
        action: this.uploadUrl2, // 必填参数 图片上传地址
        res: respnse => {
          this.editArticleForm.articleImg.push(respnse.data.tmp_path);
          console.log(this.editArticleForm.articleImg);
          return respnse.data.url; //return图片 url
        }
      }
    });
  },
  methods: {
    // 监听图片上传成功的事件
    uploadSuccess(response) {
      // 将服务器返回的 路径保存在 editArticleForm.cover 中
      this.editArticleForm.cover = response.data;
      this.handlePreview();
    },
    // 点击预览图片的操作
    handlePreview(file) {
      this.previewUrl = file.url;
      this.previewDialogVisible = true;
    },
    // 处理移除图片的操作
    handleRemove() {
      this.editArticleForm.avatar = null;
    },
    //文件超出个数限制时的钩子函数
    beyondlimit() {
      this.$message.warning("只能上传一张封面！");
    },
    // 根据 id 查询文章信息
    async getArticleInfo() {
      const { data: result } = await findArticle(
        window.sessionStorage.getItem("articleId")
      );
      if (result.meta.status !== 200) {
        return this.$message.error(result.meta.msg);
      }
      this.$message.success(result.meta.msg);
      this.editArticleForm = result.data.article;
      // 文章有封面
      if (this.editArticleForm.cover !== null) {
        // 获取 文章封面数据
        this.fileList[0].url = this.editArticleForm.cover.url;
        this.fileList[0].name = this.editArticleForm.cover.name;
        this.previewUrl = this.editArticleForm.cover.url;
      } else {
        // 文章没有封面
        this.fileList = [];
      }
    },
    // 点击修改文章
    async editArticle() {
      const { data: result } = await editArticle(this.editArticleForm);
      if (result.meta.status !== 200) {
        this.$message.error(result.meta.msg);
      }
      this.$message.success(result.meta.msg);
      this.$router.push("/article");
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