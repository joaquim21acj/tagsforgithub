import Vue from 'vue'
import VueRouter from 'vue-router'
import Repositories from '../views/Repositories.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Repositories',
    name: 'repositories',
    component: Repositories
  },
  {
    path: '/',
    name: 'home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router
