import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
      { 
          path: '/vue',
          name: 'vue'
        }
    ]
})
export default router