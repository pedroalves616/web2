import Vue from 'vue'
import VueRouter from 'vue-router'
//import Login from '../views/Login.vue'
import ComponentLogin from '../components/Login.vue'
import ComponentHome from '../components/Home.vue'
import ComponentEquipes from '../components/HomeEquipes.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: ComponentLogin
  },
  {
    path: '/home',
    name: 'Home',
    component: ComponentHome
  },
  {
    path: '/equipes',
    name: 'Equipes',
    component: ComponentEquipes
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
