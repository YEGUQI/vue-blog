import axios from "axios"

// import Nprogress from "nprogress"
export function request (config) {
  const instance = axios.create({
    baseURL: "http://39.106.5.72:8889/",
    timeout: 5000,
  })
  // 配置请求拦截
  instance.interceptors.request.use(config => {
    // 进度条开始
    // Nprogress.start()
    // config.headers.Authorization = window.sessionStorage.getItem("token")
    return config
  })
  // 配置响应拦截
  instance.interceptors.response.use(config => {
    // 进度条结束
    // Nprogress.done()
    return config
  })
  // 发送真正的网络请求
  return instance(config)
}
