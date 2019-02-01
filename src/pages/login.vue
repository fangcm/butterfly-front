<template>
  <div>
    <mu-container>
      <mu-flex class="flex-wrapper" justify-content="center" align-items="center">
        <mu-form ref="form" :model="form" class="mu-demo-form">
          <mu-form-item prop="mobile" :rules="mobileRules">
            <mu-text-field v-model="form.mobile" placeholder="手机号" autocomplete='mobile'/>
          </mu-form-item>
          <mu-form-item prop="password" :rules="passwordRules">
            <mu-text-field v-model="form.password" placeholder="密码"
                           :action-icon="isShowPassword ? 'visibility_off' : 'visibility'"
                           :action-click="() => (isShowPassword = !isShowPassword)"
                           :type="isShowPassword ? 'text' : 'password'" autocomplete='current-password'/>
          </mu-form-item>
          <mu-form-item>
            <mu-button @click="login" color="primary">登录</mu-button>
          </mu-form-item>
        </mu-form>
      </mu-flex>
    </mu-container>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import {userLogin} from '@/api/user-api'

  const REG = {
    isMobile: /^1[3456789]\d{9}$/,
    isPassword: /^.{4,16}$/
  };

  export default {
    name: 'login',
    data() {
      return {
        isShowPassword: false,
        mobileRules: [
          {validate: (val) => !!val, message: '必须填写手机号'},
          {validate: (val) => REG.isMobile.test(val), message: '不是合法的手机号'}
        ],
        passwordRules: [
          {validate: (val) => !!val, message: '必须填写密码'},
          {validate: (val) => REG.isPassword.test(val), message: '密码长度应为4-16位'}
        ],
        form: {
          mobile: '',
          password: '',
          isAgree: false
        }
      }
    },
    components: {},
    methods: {
      ...mapActions([
        'setUserInfo',
        'setUserToken'
      ]),
      login() {
        let _data = {
          mobile: this.form.mobile,
          password: this.form.password
        };
        // 请求登录
        userLogin(_data).then((data) => {
          // 保存登录状态和信息
          this.setUserInfo(data.data.user);
          this.setUserToken(data.data.token);
          if (data.code === 0) {
            if (this.$route.query.redirect && !this.$route.query.redirect.startsWith('/login')) {
              this.$router.push({path: this.$route.query.redirect});
            } else {
              this.$router.push({path: 'home/index'});
            }
          }
        });
      }
    },
    created() {
      this.setUserInfo({});
      this.setUserToken(null);
      sessionStorage.clear();
    }
  }
</script>
<style scoped>
  .mu-demo-form {
    width: 100%;
    max-width: 420px;
    align-self: center;
  }
</style>
