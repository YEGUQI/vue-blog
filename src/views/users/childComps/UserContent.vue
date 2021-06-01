<template>
  <div>
    <el-card>
      <!-- 搜索框和添加按钮区域 -->
      <el-row :gutter="20">
        <!-- 搜索框区域 -->
        <el-col :span="8">
          <el-input
            placeholder="请输入用户名"
            v-model="info.query"
            clearable
            @change="getUserlist"
            @clear="getUserlist"
          >
            <template #append>
              <el-button
                icon="el-icon-search"
                @click="getUserlist"
              ></el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            @click="addUserDialogVisible = true"
          >添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table
        :data="userList.users"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="username"
          label="用户名"
        >
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
        >
        </el-table-column>
        <el-table-column
          prop="role"
          label="角色"
        >
        </el-table-column>
        <el-table-column
          label="状态"
          prop="state"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state"
              active-color="#13ce66"
              @change="userStateChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="findUserByid(scope.row._id)"
            >编辑</el-button>
            <el-button
              type="warning"
              @click="deleteUserById(scope.row._id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="userList.pnum"
        :page-sizes="[5, 15, 25, 35]"
        :page-size="userList.psize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>

      <!-- 添加用户对话框 -->
      <el-dialog
        title="添加用户"
        width="50%"
        :visible.sync="addUserDialogVisible"
        @close="closeaddUserDialog"
      >
        <el-form
          :model="addUserForm"
          :rules="addUserRules"
          ref="addUserRef"
          label-width="100px"
        >
          <el-form-item
            label="用户名"
            prop="username"
          >
            <el-input v-model="addUserForm.username"></el-input>
          </el-form-item>
          <el-form-item
            label="邮箱地址"
            prop="email"
          >
            <el-input v-model="addUserForm.email"></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
          >
            <el-input
              v-model="addUserForm.password"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="角色">
            <el-select
              v-model="addUserForm.role"
              placeholder="请选择角色"
            >
              <el-option
                v-for="item in role"
                :key="item.id"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch v-model="addUserForm.state">
            </el-switch>
          </el-form-item>
          <el-form-item label="上传头像">
            <el-upload
              :action="uploadUrl"
              list-type="picture-card"
              :show-file-list="true"
              :on-remove="handleRemove"
              :on-success="uploadSuccess"
              :before-upload="beforeAvatarUpload"
              :limit='1'
              :on-exceed="beyondlimit"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="addUserDialogVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="addUser"
            >确 定</el-button>
          </span>
        </template>
      </el-dialog>

      <!-- 修改用户对话框 -->
    </el-card>
    <el-dialog
      title="修改用户"
      width="50%"
      :visible.sync="editUserDialogVisible"
      @close='closeDialog'
    >
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
        <el-form-item label="角色">
          <el-select
            v-model="userinfo.role"
            placeholder="请选择角色"
          >
            <el-option
              v-for="item in role"
              :key="item.id"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="userinfo.state">
          </el-switch>
        </el-form-item>
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
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editUserDialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="editUser"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import {
  getUserList,
  postAddUser,
  getFindUserById,
  putUserState,
  deleteUserById,
  editUser
} from "network/user";

export default {
  name: "UserContent",
  inject: ["reload"],
  data() {
    // 自定义密码验证规则
    var checkPaw = (rule, val, cb) => {
      const regEmail = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
      if (regEmail.test(val)) {
        return cb();
      }
      cb(new Error("密码中至少包含数字和英文(6~20)"));
    };

    return {
      info: {
        query: "",
        // 当前页码
        pagenum: 1,
        // 每页显示多少条数据
        pagesize: 5
      },
      // 用户列表数据
      userList: [],
      // 控制添加用户对话框的显示与隐藏
      addUserDialogVisible: false,
      // 控制修改用户对话框的显示与隐藏
      editUserDialogVisible: false,
      // 添加用户表单数据
      addUserForm: {
        username: "",
        email: "",
        password: "",
        role: "普通用户",
        state: true,
        avatar: {}
      },
      // 添加用户表单的验证规则
      addUserRules: {
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
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            validator: checkPaw,
            message: "密码中至少包含数字和英文(6~20)",
            trigger: "blur"
          }
        ]
      },
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
      // 角色列表
      role: [
        {
          id: 1,
          label: "普通用户"
        },
        {
          id: 2,
          label: "管理员"
        }
      ],
      // 根据 id 查找的用户信息
      userinfo: {},
      total: 0,
      // 上传头像的 url
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
    this.getUserlist();
  },
  methods: {
    // 获取用户列表数据
    async getUserlist() {
      const { data: result } = await getUserList(this.info);
      if (result.meta.status !== 200) {
        return this.$message.error("获取用户列表数据失败");
      }
      this.userList = result.data;
      this.total = result.data.total;
    },
    // 每页数据条数改变时会触发
    handleSizeChange(newsize) {
      this.info.pagesize = newsize;
      this.getUserlist();
    },
    // 当前的页码发生变化触发
    handleCurrentChange(pagenum) {
      this.info.pagenum = pagenum;
      this.getUserlist();
    },
    // 添加用户
    async addUser() {
      this.$refs.addUserRef.validate(async valid => {
        if (!valid) {
          return false;
        } else {
          const { data: result } = await postAddUser(this.addUserForm);
          if (result.meta.status !== 200) {
            return this.$message.error("添加用户失败");
          }
          this.$message.success("添加用户成功");
          this.getUserlist();
          this.addUserDialogVisible = false;
        }
      });
    },
    // 监听添加用户对话框的关闭事件
    closeaddUserDialog() {
      // 清空添加用户表单中的内容
      this.$refs.addUserRef.resetFields();
    },
    // 根据 id 查找指定用户
    async findUserByid(id) {
      const { data: result } = await getFindUserById(id);
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
      console.log(this.fileList);
    },
    // 根据 id 修改指定用户的状态
    async userStateChange(stateInfo) {
      const { data: result } = await putUserState(stateInfo);
      if (result.meta.status !== 200) {
        return this.$message.error(result.meta.msg);
      }
      this.$message.success(result.meta.msg);
    },
    // 根据 id 删除指定的用户
    async deleteUserById(id) {
      // 弹出警示框
      const confirmres = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }
      ).catch(err => err);
      if (confirmres !== "confirm") {
        return this.$message.info("已取消删除操作");
      }
      // 发送删除请求
      const { data: result } = await deleteUserById(id);
      if (result.meta.status !== 200) {
        return this.$message.error(result.meta.msg);
      }
      this.$message.success(result.meta.msg);
      this.getUserlist();
    },
    // 修改用户信息
    async editUser() {
      console.log(this.userinfo);
      const { data: result } = await editUser(this.userinfo);
      if (result.meta.status !== 200) {
        return this.$message.error(result.meta.msg);
      }
      this.$message.success(result.meta.msg);
      this.editUserDialogVisible = false;
      // 刷新用户列表
      this.getUserlist();
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
    },
    // 监听修改用户信息对话框的关闭事件
    closeDialog() {
      this.reload();
    }
  }
};
</script>

<style lang="less" scoped>
.el-table{
  margin: 15px 0 15px 0;
}
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>