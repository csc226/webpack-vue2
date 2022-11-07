// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import '@/styles/index.scss';
import '@/assets/icons';
//ֱ直接全局引入
import Antd from "ant-design-vue/es";
import "ant-design-vue/dist/antd.css";
Vue.use(Antd);

// 导入全局样式表
import './assets/css/reset.css'
import './assets/css/safe/index.css' 
//设置全局token
axios.defaults.timeout = 60* 1000;
axios.interceptors.request.use(config => {
  // 登录授权 请求验证是否有token  需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌 
  const access_token="";
  const token=localStorage.getItem('access_token')?localStorage.getItem('access_token'):access_token
  config.headers.Authorization ='bearer '+token;
  return config // 必须返回否则没有值
})
Vue.config.productionTip = false
Vue.prototype.$axios = axios; 
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
