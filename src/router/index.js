import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import container from '@/views/container/container'

export const constantRouterMap = [
  {
    path: '/login',
    name: '登录',
    component: () => import('@/views/login')
  },
  {
    path: '',
    name: '频道管理',
    redirect: 'home',
    component: container,
    meta: {
      title: '频道管理',
      icon: 'home',
      noCache: true
    },

    children: [
      {
        path: 'home',
        name: '频道管理',

        component: () => import('@/views/home'),
        meta: {
          title: '频道管理',
          icon: 'home',
          noCache: true
        },
      }
    ]
  }
]

export default new Router({
  // 防止跳转路由时页面不是在顶部
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: constantRouterMap
})
