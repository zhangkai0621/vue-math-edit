import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false;

import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';//全局更改
import qs from "qs";//配合qs模块转化post请求的参数，记得先npm install qs
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
