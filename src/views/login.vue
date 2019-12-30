<template>
    <div class="login-container">
        <el-form
         status-icon
         ref="" 
         label-position="left" 
         label-width="0px" 
         class="demo-ruleForm login-page">
            <h3 class="title">系统登录</h3>
            <el-form-item prop="username">
                <el-input type="text" 
                    v-model="account" 
                    auto-complete="off" 
                    placeholder="用户名"
                ></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" 
                    v-model="pass" 
                    auto-complete="off" 
                    placeholder="密码">
                </el-input>
            </el-form-item>
            <!-- <div style="margin-top: 15px;">
              <el-input placeholder="请输入内容" v-model="input2">
                <template slot="append">发送验证码</template>
              </el-input>
            </div> -->
            <el-form-item label="" prop="code" class="pr">
              <el-input prop="code" v-model="code" placeholder="验证码"></el-input>
              <button @click="getCode()" class="code-btn" :disabled="!show">
                  <span v-show="show">发送验证码</span>
                  <span v-show="!show" class="count">{{count}} s</span>
              </button>
            </el-form-item>
            <!-- <el-checkbox 
                v-model="checked"
                class="rememberme"
            >记住密码</el-checkbox> -->
            <el-form-item style="width:100%;margin-top: 15px;">
                <el-button type="primary" style="width:100%;" @click="handleSubmit" >登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { smsLogin } from '@/utils/api';
import { login } from '@/utils/api';
import { Message } from 'element-ui'
import Cookies from 'js-cookie'
const TIME_COUNT = 60 // 倒计时的时间
export default {
  data () {
    return {
        account:'',
        pass:'',
        code:'',
        show: true,
        count: '',
        timer: null
    }
  },
  methods: {
    getCode () {
      var _this=this
      if(_this.account===''){
         Message.error({ message: '请输入用户名' });
         return
      }
      smsLogin({ 
        account: _this.account
        }).then(res => {
           Message.success({ message: '发送成功' });
          // 验证码倒计时
          if (!this.timer) {
            this.count = TIME_COUNT
            this.show = false
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--
              } else {
                this.show = true
                clearInterval(this.timer)
                this.timer = null
              }
            }, 1000)
          }
      })
      
    },
    handleSubmit(){
        var _this=this
        if(_this.account===''
        ||_this.pass===''
        ||_this.code===''){
          Message.error({ message: '请填写信息' });
          return
        }
        login({ 
            account: _this.account,
            pass: _this.pass,
            code: _this.code
        }).then(res => {
            Message.success({ message: '登录成功' });
            sessionStorage.setItem('op-token',res.data)
            this.$router.push({ path: 'home' })
        })
    }
  }
}
</script>

<style scoped>
.login-container {
    width: 100%;
    height: 100%;
}
.login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
}
.pr {
   position: relative;
}
.code-btn {
   width: 100px;
   height: 24px;
   position: absolute;
   top: 10px;
   right: 5px;
   z-index: 222;
   color: #F5A623;
   font-size: 14px;
   border: none;
   border-left: 1px solid #bababa;
   padding-left: 10px;
   background-color: #fff;
}
</style>