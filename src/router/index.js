import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    // alias: '/',
    path: '/',
    name: 'main',
    component: () => import(/* webpackChunkName: "main" */ '@/views/main/index.vue'),
    redirect: 'home',
    children: [
      { // 首页
        path: 'home',
        name: 'home',
        component: () => import(/* webpackChunkName: "Container" */ '@/components/Container.vue'),
        children: [
          { // page1
            path: 'page1',
            name: 'page1',
            component: () => import(/* webpackChunkName: "page1" */ '@/views/main/home/page1/index.vue')
          }
        ]
      }
    ]
  },
  // { // 登录
  //   path: 'login',
  //   name: 'login',
  //   component: () => import(/* webpackChunkName: "shuguo" */ '@/views/login/index.vue')
  // },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  routes
})

export default router
