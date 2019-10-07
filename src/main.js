import Vue from 'vue'
import App from './App.vue'

import router from './router/index.js' // 路由
import store from './store/index.js' // store
import i18n from './assets/locale/i18n.js' // ElementUI+ElementI18n+VueI18n
import utils from './utils/index.js'
import './permission'
Vue.use(utils)

// vue-awesome 的 Icon （全局注册）
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
