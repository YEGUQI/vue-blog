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
  }
}
