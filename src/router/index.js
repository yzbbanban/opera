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
    redirect: 'login',
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
      },
      {
        path: 'menu',
        name: '菜单',
        component: () => import('@/views/menu'),
        meta: {
          title: '菜单',
          icon: 'home',
          noCache: true
        },
      },
      {
        path: 'role',
        name: '角色',
        component: () => import('@/views/role'),
        meta: {
          title: '角色',
          icon: 'home',
          noCache: true
        },
      },
      {
        path: 'admin',
        name: '管理员',
        component: () => import('@/views/admin'),
        meta: {
          title: '管理员',
          icon: 'home',
          noCache: true
        },
      },
      {
        path: 'trader',
        name: '操盘手',
        component: () => import('@/views/trader'),
        meta: {
          title: '操盘手',
          icon: 'home',
          noCache: true
        },
      },
      {
        path: 'exchange',
        name: '交易所',
        component: () => import('@/views/exchange'),
        meta: {
          title: '交易所',
          icon: 'home',
          noCache: true
        },
      },
      {
        path: 'account',
        name: '账号',
        component: () => import('@/views/account'),
        meta: {
          title: '账号',
          icon: 'home',
          noCache: true
        },
      },
      {
        path: 'pair',
        name: '交易对',
        component: () => import('@/views/pair'),
        meta: {
          title: '交易对',
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
