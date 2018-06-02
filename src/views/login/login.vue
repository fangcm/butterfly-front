<template>
  <div class="login">
    <group>
      <x-input title="手机" v-model="mobile" placeholder="输入手机号码" is-type="china-mobile"></x-input>
    </group>
    <group>
      <x-input title="密码" v-model="password" placeholder="输入密码" :min=4 :max=16 type="password"></x-input>
    </group>
    <group>
      <check-icon :value.sync="autoLogin">自动登录</check-icon>
    </group>
    <group>
      <x-button type="primary" :show-loading="loading" @click.native="login">登录</x-button>
    </group>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {XInput, Group, XButton, CheckIcon} from 'vux'
  import {login} from '@/api'

  export default {
    name: 'login',
    components: {
      XInput,
      Group,
      XButton,
      CheckIcon
    },
    data() {
      return {
        mobile: '',
        password: '',
        autoLogin: true,
        loading: false
      }
    },
    computed: {
      ...mapGetters({token: 'getToken'})
    },
    created() {
      if (this.token && this.autoLogin) {
        this.$router.push({name: 'home'})
      }
    },
    methods: {
      async login() {
        this.loading = true
        let result = await login({'username': this.mobile, 'password': this.password})
        this.loading = false
        if (result && result.success && result.result) {
          // 缓存
          this.$store.commit('setToken', result.result)
          this.$store.commit('setAutoLogin', this.autoLogin)
          this.$router.push({name: 'home'})
        } else {
          this.$vux.toast.text((result && result.message) || '登录失败')
        }
      }
    }
  }
</script>

<style>
  .login {
    height: 100vh;
    padding: 1rem 0.35rem 0;
    background-color: #fff;
  }

</style>
