import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () =>
  import(/* webpackChunkName: "Login_Home" */ "login/Login")

const Home = () =>
  import(/* webpackChunkName: "Login_Home" */ "home/Home")

const Admin = () =>
  import(/* webpackChunkName: "admin_Welcome" */ "admin/Admin")

const Welcome = () =>
  import(/* webpackChunkName: "admin_Welcome" */ "admin/childComps/Welcome")

const Users = () =>
  import(/* webpackChunkName: "admin_Users" */ "users/Users")

const Article = () =>
  import(/* webpackChunkName: "admin_Article" */ "article/Article")

const AdmAddArticle = () =>
  import(/* webpackChunkName: "admin_Article" */ "content/addArticle")

const EditArticle = () =>
  import(/* webpackChunkName: "admin_Article" */ "content/editArticle")

const previewArticle = () =>
  import(/* webpackChunkName: "admin_Article" */ "article/childComps/previewArticle")

const UseAddArticle = () =>
  import(/* webpackChunkName: "Home_Article" */ "home/childComps/UseAddArticle")

const Details = () =>
  import(/* webpackChunkName: "Home_Article" */ "articleDetails/articleDetails")

const Register = () =>
  import(/* webpackChunkName: "Home_Register" */ "register/Register")


const UserInfo = () =>
  import(/* webpackChunkName: "Home_user" */ "userInfo/UserInfo")

const Info = () =>
  import(/* webpackChunkName: "Home_user" */ "userInfo/childComps/Info")

const UserPub = () =>
  import(/* webpackChunkName: "Home_user" */ "userInfo/childComps/MyPublished")


Vue.use(VueRouter)

const routes = [
  // login
  { path: '/', redirect: '/home' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },

  // 管理页面路由部分
  {
    path: '/admin',
    component: Admin,
    redirect: "/welcome",
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/article', component: Article },
      { path: '/admadd', component: AdmAddArticle },
      { path: '/edit', component: EditArticle },
      { path: '/preview', component: previewArticle },
    ]
  },
  // 首页路由部分
  {
    path: '/home', component: Home, children: [

      { path: '/details', component: Details },
      { path: '/useadd', component: UseAddArticle },
      {
        path: '/userInfo', component: UserInfo, children: [
          { path: '/info', component: Info },
          { path: '/userpub', component: UserPub }
        ]
      },
    ]
  },


]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 导航守卫
// to 将要访问的页面。 from 从哪里来。 next 放行
router.beforeEach((to, from, next) => {
  // 未登录用户可以查看文章首页 文章详情页
  // 判断当前所处的页面是否为 登录页 或者首页 文章详情页 如果是则 next
  if (to.path === "/login" || to.path === "/home" || to.path === "/register" || to.path === "/details") return next()
  // 取出保存在 sessionStorage 中的 role
  const role = window.sessionStorage.getItem('role')
  // 取出客户端的 token 
  const token = window.sessionStorage.getItem("token")
  // 判断 token 中是否有值 没有则说明用户未登录 返回登录页面
  if (!token) return next("/login")
  // 用户已经登录 判断角色 开放对应的页面权限
  // 取出博客管理页面相关的路由
  const adminPath = routes.find(item => {
    return item.path == '/admin'
  })
  // 遍历管理页面的路由
  adminPath.children.forEach(item => {
    // 判断当前用户的角色 
    if (role !== '管理员') {
      // 不是管理员 则不能访问管理页面
      if (to.path === item.path) {
        // 返回登录页面
        return next("/login")
      }
      // 是管理员则直接放行
      next()
    }
  })
  next()
})

export default router
