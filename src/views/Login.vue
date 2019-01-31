<template>
  <div>
    <mu-container>
      <mu-flex justify-content="center" align-items="center">
        <mu-text-field v-model="mobile" placeholder="手机号" help-text="手机号为11长度的数字"
                       icon="phone"/>
      </mu-flex>
      <mu-flex justify-content="center" align-items="center">
        <mu-text-field v-model="password" placeholder="密码" help-text="请输入4到16位密码"
                       :action-icon="isShowPassword ? 'visibility_off' : 'visibility'"
                       :action-click="() => (isShowPassword = !isShowPassword)"
                       :type="isShowPassword ? 'text' : 'password'" icon="locked"/>
      </mu-flex>
      <mu-flex justify-content="center" align-items="center">
        <mu-button @click="login" color="primary">登录</mu-button>
      </mu-flex>
      <mu-snackbar color="info" :open.sync="isLoading">
        正在加载...
      </mu-snackbar>
    </mu-container>
  </div>
</template>

<script>
  import Toast from 'muse-ui-toast'
  import {mapActions} from 'vuex'
  import {userLogin} from '@/api/user-api'

  const REG = {
    isMobile: /^1[3456789]\d{9}$/,
    isPassword: /^.{4,16}$/
  }

  export default {
    data() {
      return {
        mobile: '',
        password: '',
        isShowPassword: false,
        isLoading: false
      }
    },
    components: {},
    methods: {
      ...mapActions([
        'setUserInfo',
        'setUserToken'
      ]),
      login() {
        if (this._loginCheck()) {
          this.isLoading = true

          let _data = {
            mobile: this.mobile,
            password: this.password
          };
          // 请求登录
          userLogin(_data).then((data) => {
            console.log("oooooooooooooooooooooooooooo")
            // 保存登录状态和信息
            this.setUserInfo(data.data);
            this.setUserToken(data.data.token);
            this.$router.replace('/')
          });

          this.isLoading = false

        }
      },
      // 检查输入的登录信息
      _loginCheck() {
        if (!REG.isMobile.test(this.mobile)) {
          Toast.message('不是合法的手机号')
          return false
        } else if (!REG.isPassword.test(this.password)) {
          Toast.message('密码长度应为4-16位')
          return false
        }
        return true
      },
      back() {
        this.$router.back()
      },
      created() {
        this.setUserInfo({});
        this.setUserToken(null);
        sessionStorage.clear();
      }
    }
  }
</script>
