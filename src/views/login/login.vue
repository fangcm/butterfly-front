<template>
  <div>
    <mu-appbar title="登录">
      <mu-icon-button icon="arrow_back" slot="left" @click="back"/>
    </mu-appbar>
    <mu-container>
      <mu-flex justify-content="center" align-items="center">
        <mu-alert color="warning" @delete="logining = false">
          <mu-icon left value="warning"/>
          this is warning alert
        </mu-alert>
      </mu-flex>
      <mu-flex justify-content="center" align-items="center">
        <mu-text-field v-model="mobile" label="手机号" label-float help-text="手机号为11长度的数字" icon="account_circle"/>
        <br/>
      </mu-flex>
      <mu-flex justify-content="center" align-items="center">
        <mu-text-field v-model="password" type="password" label="密码" label-float error-text="请输入密码" icon="locked"/>
        <br/>
      </mu-flex>
      <mu-flex justify-content="center" align-items="center">
        <mu-button @click="login" color="primary">登录</mu-button>
      </mu-flex>
    </mu-container>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {userLogin} from '@/api/user'
import Loading from '@/components/loading/loading'

const REG = {
  isMobile: /^1(3|4|5|6|7|8)\d{9}$/,
  isPassword: /^.{1,16}$/
}

export default {
  data () {
    return {
      mobile: '',
      password: '',
      logining: true
    }
  },
  components: {
    Loading
  },
  methods: {
    async login () {
      if (this._loginCheck()) {
        this.logining = true
        try {
          // 请求登录
          const res = await userLogin({
            username: this.username,
            password: this.password
          })
          // 登陆成功
          if (res.code) {
            const {username, nickname, mobile} = res.data
            // 保存登录状态和信息
            this.setHasLogin(true)
            this.setUserInfo({username, nickname, mobile})
            this.$router.replace('/')
          } else {
            this.setPopup('用户名或密码错误')
          }
        } catch (err) {
          this.setPopup('登录失败')
          console.error(err)
        } finally {
          this.logining = false
        }
      }
    },
    // 检查输入的登录信息
    _loginCheck () {
      if (!REG.isMobile.test(this.username)) {
        this.setPopup('不是合法的用户名/手机号')
        return false
      } else if (!REG.isPassword.test(this.password)) {
        this.setPopup('密码长度应为1-16位')
        return false
      }
      return true
    },
    back () {
      this.$router.back()
    },
    ...mapActions(['setPopup', 'setUserInfo', 'setHasLogin'])
  }
}
</script>

<style scoped>
</style>
