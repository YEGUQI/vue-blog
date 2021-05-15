import Vue from "vue";
import Vuex from "vuex";

// 安装 vuex
Vue.use(Vuex)

const state = {
  article: {},
  articleId: ''
}
const store = new Vuex.Store({
  state
})

export default store