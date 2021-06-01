module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        components: "@/components",
        common: "@/components/common",
        content: "@/components/content",
        font: "@/assets/font",
        views: "@/views",
        network: "@/network",
        home: "@/views/home",
        login: "@/views/login",
        admin: "@/views/admin",
        users: "@/views/users",
        article: "@/views/article",
        register: "@/views/register",
        articleDetails: "@/views/articleDetails",
        userInfo: "@/views/userInfo"
      }
    },
  },
  devServer: {
    host: '127.0.0.1',
    port: 8080,
  },
  chainWebpack: config => {
    // 指定项目对应的打包入口
    // 处于产品发布模式 打开指定的入口文件
    config.when(process.env.NODE_ENV === "production", config => {
      config
        .entry("app")
        .clear()
        .add("./src/main-prod.js")

      // 通过 externals 加载外部 CDN资源
      config.set("externals", {
        vue: "Vue",
        "vue-router": "VueRouter",
        axios: "axios",
        lodash: "_",
        "vue-quill-editor": "VueQuillEditor"
      })

      // 自定义首页标题
      config.plugin("html").tap(args => {
        args[0].isProd = false
        return args
      })

    }),
      // 如果处于产品开发模式 打开指定的入口文件
      config.when(process.env.NODE_ENV === "development", config => {
        config
          .entry("app")
          .clear()
          .add("./src/main-dev.js")

      })

    // 自定义首页标题
    config.plugin("html").tap(args => {
      args[0].isProd = true
      return args
    })
  }
}
