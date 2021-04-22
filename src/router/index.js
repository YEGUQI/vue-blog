import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import("login/Login")
const admin = () => import("admin/admin")
const users = () => import("users/Users")
Vue.use(VueRouter)

const routes = [
  // home
  { path: "/", redirect: "/login " },
  { path: '/login', component: Login },
  {
    path: '/admin', component: admin, children: [
      { path: '/users', component: users }
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 导航守卫
// to 将要访问的页面。 from 从哪里来。 next 放行
router.beforeEach((to, from, next) => {
  // 判断当前所处的页面是否为 登录页 如果是则 next
  if (to.path === "/login") return next()
  // 取出客户端的 token
  const token = window.sessionStorage.getItem("token")
  // 判断 token 中是否有值 没有则返回登录页面
  if (!token) return next("/login")
  // 如果 token 中有值 则直接放行
  next()
})

export default router
