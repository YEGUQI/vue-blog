import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import("login/Login")
const Admin = () => import("admin/Admin")
const Welcome = () => import("admin/childComps/Welcome")
const Users = () => import("users/Users")
const Article = () => import("article/Article")
const AdmAddArticle = () => import("content/addArticle")
const EditArticle = () => import("content/editArticle")
const Home = () => import("home/Home")
const UseAddArticle = () => import("home/childComps/UseAddArticle")
const Register = () => import("register/Register")
const Details = () => import("articleDetails/articleDetails")

Vue.use(VueRouter)

const routes = [
  // login
  { path: '/', redirect: '/home' },
  { path: '/login', component: Login },
  // 管理页面路由部分
  {
    path: '/admin', component: Admin, redirect: "/welcome", children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/article', component: Article },
      { path: '/admadd', component: AdmAddArticle },
      { path: '/edit', component: EditArticle },
    ]
  },
  // 首页路由部分
  { path: '/home', component: Home },
  { path: '/useadd', component: UseAddArticle },
  { path: '/register', component: Register },
  { path: '/details', component: Details }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 导航守卫
// to 将要访问的页面。 from 从哪里来。 next 放行
router.beforeEach((to, from, next) => {
  // 判断当前所处的页面是否为 登录页 或者首页 文章详情页 如果是则 next
  if (to.path === "/login" || to.path === "/home" || to.path === "/register" || to.path === "/details") return next()
  // 取出客户端的 token
  const token = window.sessionStorage.getItem("token")
  // 判断 token 中是否有值 没有则返回登录页面
  if (!token) return next("/login")
  // 如果 token 中有值 则直接放行
  next()
})

export default router
