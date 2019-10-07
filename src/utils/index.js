import moment from 'moment'
import { baseImgUrl } from '../utils/urls'
moment.locale('zh-cn')

export default {
  install (Vue) {
    // 日期格式化
    Vue.prototype.$timeFormat = (timestamp, type, now) => {
      //2019-01-01 12:12:12
      if (type == 1) {
        return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
      }
      //2019-01-01 12:12
      if (type == 2) {
        return moment(timestamp).format('YYYY-MM-DD HH:mm')
      }
      //2019-01-01
      if (type == 3) {
        return moment(timestamp).format('YYYY-MM-DD')
      }
      //12:12:12
      if (type == 4) {
        return moment(timestamp).format('HH:mm:ss')
      }
      //12:12
      if (type == 5) {
        return moment(timestamp).format('HH:mm')
      }
      //xxx小时前
      if (type == 6) {
        return moment(timestamp).from(moment(now))
      }
    }
    // 相对时间
    Vue.prototype.$relativeTimeFormat = (timestamp, type) => {
      if (type == 1) {
        const now = Date.now()
        if (timestamp > now - 24 * 60 * 60 * 1000) {
          return Vue.prototype.$timeFormat(timestamp, 6, now)
        } else {
          return Vue.prototype.$timeFormat(timestamp, 2)
        }
      }
    }
    // 今天/昨天/前天
    Vue.prototype.$dayDiff = timestamp => {
      const today = new Date()
      const tY = today.getFullYear()
      const tM = today.getMonth() + 1
      const tD = today.getDate()
      const tTimestamp = new Date(tY + '/' + tM + '/' + tD).getTime()
      const yTimestamp = tTimestamp - 24 * 60 * 60 * 1000
      const yyTimestamp = tTimestamp - 2 * 24 * 60 * 60 * 1000
      if (timestamp >= tTimestamp) {
        return '今天'
      } else if (timestamp >= yTimestamp && timestamp < tTimestamp) {
        return '昨天'
      } else if (timestamp >= yyTimestamp && timestamp < yTimestamp) {
        return '前天'
      }
    }
    // 基地址拼接图片路径
    Vue.prototype.$imgUrlFormat = imgUrl => {
      if (imgUrl) {
        if (imgUrl.indexOf('http') != -1) {
          return imgUrl
        } else {
          return baseImgUrl + imgUrl
        }
      }
    }

    //将科学计数法转换为正常的数字
    Vue.prototype.$toNormalNumber = num => {
      let numStr = String(num)
      // 处理非数字
      if (isNaN(num)) {
        return num
      }
      // 处理不需要转换的数字(并去除小数末尾的0)
      if (!/e/i.test(numStr)) {
        return parseFloat(num)
      }
      // 处理科学计数法
      var nums = ''
      if (numStr.indexOf('e') > 0 || numStr.indexOf('E') > 0) {
        num = Number(num)
        var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/)
        nums = num.toFixed(Math.max(0, (m[1] || '').length - m[2]))
      } else {
        nums = parseFloat(numStr)
      }
      return nums
    }

    // 空值验证
    Vue.prototype.$empty = function (val) {
      return (
        val === undefined ||
        val === null ||
        val === '' ||
        val === 0 ||
        val.length === 0 ||
        JSON.stringify(val) === '{}'
      )
    }
    // 网址正则
    Vue.prototype.$urlReg = /^(http(s)?:\/\/)(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+/

    // 密码正则
    Vue.prototype.$pwdReg = /^[0-9a-zA-Z]{6,14}$/

    // 分页页码
    Vue.prototype.$pages = [5, 10, 20, 50, 100]
  }
}
