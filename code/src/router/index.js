import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: function () {
        return import('../views/About.vue')
    }
  },
  {
      path: '/UEditor',
      name: 'UEditor',
      component: () => {
          return import ('../views/UEditor.vue')
      }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
