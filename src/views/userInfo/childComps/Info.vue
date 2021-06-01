<template>
  <div>
    <el-card>
      <el-form
        :model="userinfo"
        :rules="editUserRules"
        ref="editUserRef"
        label-width="100px"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input v-model="userinfo.username"></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱地址"
          prop="email"
        >
          <el-input v-model="userinfo.email"></el-input>
        </el-form-item>
        <el-alert
          title="请先删除原有头像后再上传新的头像！！！"
          type="warning"
          center
          show-icon
          :closable='false'
        >
        </el-alert>
        <el-form-item label="上传头像">
          <el-upload
            :action="uploadUrl"
            list-type="picture-card"
            :show-file-list="true"
            :on-remove="handleRemove"
            :on-success="uploadSuccess2"
            :before-upload="beforeAvatarUpload"
            :limit='1'
            :file-list="fileList"
            :on-exceed="beyondlimit"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

      </el-form>
      <div class="btn">
        <el-button
          type="warning"
          @click="editUser"
        >确认修改</el-button>
        <el-button
          type="primary"
          @click="findUserByid"
        >重置</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getFindUserById, editUser } from "network/user";
export default {
  inject: ["reload"],
  data() {
    return {
      userinfo: {},
      // 修改用户表单的验证规则
      editUserRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur"
          }
        ]
      },
      uploadUrl: "http://39.106.5.72:8889/admin/articles/avatar",
      imageUrl: "",
      dialogVisible: false,
      // 文件列表
      fileList: [
        {
          name: "",
          url: ""
        }
      ]
    };
  },
  created() {
    this.findUserByid();
  },
  methods: {
    // 根据 id 查找指定用户
    async findUserByid() {
      const { data: result } = await getFindUserById(
        window.sessionStorage.getItem("userId")
      );
      if (result.meta.status !== 200) {
        return this.$message.error(result.meta.msg);
      }
      this.userinfo = result.data;
      this.editUserDialogVisible = true;
      console.log(this.userinfo.avatar);
      // 用户有头像
      if (this.userinfo.avatar !== null) {
        // 获取 用户头像
        this.fileList[0].url = this.userinfo.avatar.url;
        this.fileList[0].name = this.userinfo.avatar.name;
        this.imageUrl = this.userinfo.avatar.url;
      } else {
        // 用户没有头像
        this.fileList = [];
      }
    },
    // 修改用户信息
    async editUser() {
      const { data: result } = await editUser(this.userinfo);
      if (result.meta.status !== 200) {
        return this.$message.error(result.meta.msg);
      }
      this.$message.success(result.meta.msg);
      this.editUserDialogVisible = false;
      // 刷新页面
      this.reload();
    },
    //上传用户头像 监听图片上传成功的事件
    uploadSuccess(res, file) {
      // 将服务器返回的 路径保存在 addArticleForm.cover 中
      this.addUserForm.avatar = res.data;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 修改用户头像 监听图片上传成功的事件
    uploadSuccess2(res, file) {
      // 将服务器返回的 路径保存在 userinfo.cover 中
      this.userinfo.avatar = res.data;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 处理移除图片的操作
    handleRemove() {
      this.addUserForm.avatar = null;
      this.userinfo.avatar = null;
      console.log(this.userinfo.avatar);
    },
    //限制用户上传的图片格式和大小。
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/ 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //文件超出个数限制时的钩子函数
    beyondlimit() {
      this.$message.warning("只能上传一张封面！");
    }
  }
};
</script>

<style lang="less" scoped>
.el-alert{
  margin: 10px 0 15px 0px !important;
}
.btn{
  width: 100%;
  text-align: center;
}
</style>