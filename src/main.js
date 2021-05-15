import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import './plugins/element.js'
// 导入图片懒加载
import VueLazyload from 'vue-lazyload'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

// 导入富文本编辑器的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 在全局注册富文本编辑器
Vue.use(VueQuillEditor)

// 在全局注册图片懒加载
Vue.use(VueLazyload, {
  // 当文章封面加载出错时显示
  error: require('./assets/img/error.png'),
})
Vue.config.productionTip = false

// 格式化日期时间的过滤器
Vue.filter("dataFormat", function (UTCDateString) {
  if (!UTCDateString) {
    return '-';
  }
  function formatFunc (str) {
    return str > 9 ? str : '0' + str
  }
  var date2 = new Date(UTCDateString);
  var year = date2.getFullYear();
  var mon = formatFunc(date2.getMonth() + 1);
  var day = formatFunc(date2.getDate());
  var hour = date2.getHours();
  hour = hour >= 12 ? hour - 12 : hour; // 12小时制
  hour = formatFunc(hour);
  var min = formatFunc(date2.getMinutes());
  var sec = formatFunc(date2.getSeconds());
  var dateStr = year + '-' + mon + '-' + day + ' ' + hour + ':' + min + ':' + sec;
  return dateStr;
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
