import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false;

import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.snow.css';
Vue.use(VueQuillEditor)

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
