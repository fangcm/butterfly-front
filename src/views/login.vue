<template>
  <div>
    <mu-appbar title="登录" color="primary"/>
    <mu-container>
      <mu-flex justify-content="center" align-items="center">
        <mu-text-field v-model="mobile" label="手机号" label-float help-text="手机号为11长度的数字"
                       icon="account_circle"/>
      </mu-flex>
      <mu-flex justify-content="center" align-items="center">
        <mu-text-field v-model="password" type="password" label="密码" label-float help-text="请输入4到16位密码"
                       icon="locked"/>
      </mu-flex>
      <mu-flex justify-content="center" align-items="center">
        <mu-button @click="login" color="primary">登录</mu-button>
      </mu-flex>
      <mu-snackbar position="top" color="info" :open.sync="logining">
        正在登陆中...
      </mu-snackbar>
    </mu-container>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {userLogin} from '@/api/user'

const REG = {
  isMobile: /^1[345678]\d{9}$/,
  isPassword: /^.{4,16}$/
}

export default {
  data () {
    return {
      mobile: '',
      password: '',
      logining: false
    }
  },
  methods: {
    async login () {
      if (this._loginCheck()) {
        this.logining = true
        try {
          // 请求登录
          const data = await userLogin({
            mobile: this.mobile,
            password: this.password
          })
          // 登陆成功
          if (data.success) {
            // 保存登录状态和信息
            this.setToken(data.result)
            this.$router.replace('/')
          } else {
            this.showPopup('用户名或密码错误')
          }
        } catch (err) {
          console.log(err)
          this.showPopup('登录失败')
        } finally {
          this.logining = false
        }
      }
    },
    // 检查输入的登录信息
    _loginCheck () {
      if (!REG.isMobile.test(this.mobile)) {
        this.showPopup('不是合法的手机号')
        return false
      } else if (!REG.isPassword.test(this.password)) {
        this.showPopup('密码长度应为4-16位')
        return false
      }
      return true
    },
    back () {
      this.$router.back()
    },
    ...mapActions(['setToken', 'showPopup'])
  }
}
</script>

<style scoped>
</style>
