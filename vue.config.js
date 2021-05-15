module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        components: "@/components",
        common: "@/components/common",
        content: "@/components/content",
        views: "@/views",
        network: "@/network",
        home: "@/views/home",
        login: "@/views/login",
        admin: "@/views/admin",
        users: "@/views/users",
        article: "@/views/article",
        register: "@/views/register",
        articleDetails: "@/views/articleDetails"
      }
    },
  },
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true
  }
}
