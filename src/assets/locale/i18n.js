import Vue from 'vue'
import ElementUI from 'element-ui' //ElementUI
import ElementI18n from 'element-ui/lib/locale' //ElementI18n
import VueI18n from 'vue-i18n' //VueI18n
import messages from './index.js'
Vue.use(ElementUI)
Vue.use(VueI18n)

let localeLang = localStorage.getItem('lang')
// 如果本地没存储语言，则使用浏览器默认语言
if (!localeLang) {
  let lang = navigator.language.toLowerCase()
  switch (lang) {
    case 'zh-cn':
    case 'zh':
      lang = 'cn'
      break
    case 'zh-tw':
    case 'zh-hk':
      lang = 'tw'
      break
    case 'en':
    case 'en-us':
      lang = 'en'
      break
    default:
      lang = 'cn'
      break
  }
  localStorage.setItem('lang', lang)
}

const i18n = new VueI18n({
  locale: localStorage.getItem('lang'),
  messages
})
ElementI18n.i18n((key, value) => i18n.t(key, value))

export default i18n
