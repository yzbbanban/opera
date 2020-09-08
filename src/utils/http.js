import axios from 'axios'; 
import QS from 'qs';
import { Message } from 'element-ui'
import router from '../router/index'


// 环境的切换
// axios.defaults.baseURL = 'http://172.20.10.3:9099/';
// axios.defaults.baseURL = 'http://127.0.0.1:9092/';
axios.defaults.baseURL = 'http://106.13.45.232:9092/';
// axios.defaults.baseURL = 'http://118.31.54.117:9092/';


// 请求超时时间
axios.defaults.timeout = 10000;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
    config => {
        let token = sessionStorage.getItem('op-token')
        if (!token) token = ''
        
        config.headers = Object.assign(config.headers ? config.headers : {}, {
          Authorization: token
        })
        return config
      },
      error => {
        return Promise.reject(error)
      })
// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 404请求不存在                
                case 404:
                    Message.error({ message: '服务器被吃了⊙﹏⊙∥' });
                    break;
                case 401:
                    Message.error({ message: '无权限' });    
                    router.replace({ path: '/login' })
                    break;  
                // 其他错误，直接抛出错误提示                
                default:
                    Message.error({ message: '服务器被吃了⊙﹏⊙∥' + error.response.data.message });
            }
            return Promise.reject(error.response);
        }
    }
);
/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
        .then(res => {
            if(res.status==200){
                if(res.data.code==200){
                    Message.success({ message: 'OK' });
                    resolve(res.data);
                }else if (res.code == 401) {
                    this.$router.push({ path: 'login' })
                    Message.error({ message: '' + res.data.message });
                }else{
                    Message.error({ message: ''+res.data.message });
                }
            }else{
                // console.log('==error=>'+JSON.stringify(res))
                Message.error({ message: ''+res.message });
            }
        })
        .catch(err => {
            reject(err.data)
        })
    })
}
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
        .then(res => {
            if(res.status==200){
                if(res.data.code==200){
                    Message.success({ message: ''+res.data.message });
                    resolve(res.data);
                }else if (res.code == 401) {
                    this.$router.push({ path: 'login' })
                    Message.error({ message: '' + res.data.message });
                }else{
                    Message.error({ message: ''+res.data.message });
                }
            }else{
                Message.error({ message: ''+res.data.message });
            }
        })
        .catch(err => {
            reject(err.data)
        })
    })
}