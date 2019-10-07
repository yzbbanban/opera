import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router'
import { baseURL } from '../utils/urls'

var instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/myApi' : baseURL,
  timeout: 500000
})

instance.interceptors.request.use(
  config => {
    let token = sessionStorage.getItem('op-token')
    if (!token) token = ''
    let lang = localStorage.getItem('lang') // 国际化
    switch (lang) {
      case 'cn':
        lang = 'zh_CN'
        break
      case 'tw':
        lang = 'zh_TW'
        break
      case 'en':
        lang = 'en'
        break
      default:
        lang = 'zh_CN'
        break
    }
    config.headers = Object.assign(config.headers ? config.headers : {}, {
      Authorization: token,
      from: 'pc',
      lang: lang
    })
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    const res = response.data
    const code = res.code
    if (code === 0) {
      // 成功
      return res
    } else if (code === 4000) {
      // 参数错误，请求被拒绝
      Message({
        message: '参数错误，请求被拒绝',
        type: 'error',
        duration: 5000
      })
      return Promise.reject(res.message)
    } else if (code === 4001) {
      // 无权限
      Message({
        message: '登录过期，请重新登录',
        type: 'error',
        duration: 5000
      })
      router.replace({ name: 'login' })
      return Promise.reject('error')
    } else if (code === 1) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5000
      })
      return Promise.reject(res.message)
    } else {
      // 其他错误
      Message({
        message: res.message,
        type: 'error',
        duration: 5000
      })
      return Promise.reject(res.message)
    }
  },
  error => {
    Message({
      message: 'error',
      type: 'error',
      duration: 5000
    })
    return Promise.reject(error)
  }
)

Vue.prototype.$api = instance
