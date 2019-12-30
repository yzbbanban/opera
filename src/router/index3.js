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
    name: '人员管理',
    redirect: 'user',
    component: container,
    meta: {
      title: '人员管理',
      icon: 'home',
      noCache: true
    },

    children: [
      {
        path: 'user',
        name: '管理员管理',
        component: () => import('@/views/user'),
        meta: {
          title: '管理员管理',
          icon: 'home',
          noCache: true
        },
      },
      {
        path: ' systemSetting',
        name: '菜单管理',
        component: () => import('@/views/systemSetting'),
        meta: {
          title: '菜单',
          icon: 'home',
          noCache: true
        },
      },
      {
        path: 'role',
        name: '角色管理',
        component: () => import('@/views/role'),
        meta: {
          title: '角色',
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
