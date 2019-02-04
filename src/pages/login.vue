<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs12 sm6>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-img src="../../static/logo.png"/>
          <v-text-field prepend-icon="phone" label="手机号"
                        v-model="mobile" :rules="mobileRules" required></v-text-field>
          <v-text-field prepend-icon="lock" label="密码" type="password"
                        v-model="password" :rules="passwordRules" required
                        @click:append="showPassword = !showPassword"
                        :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                        :type="showPassword ? 'text' : 'password'"></v-text-field>

          <v-layout justify-space-around wrap>
            <v-flex d-flex>
              <v-btn color="primary" @click="submit">登录</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import {mapActions} from 'vuex'
  import {userLogin} from '@/api/core-api'

  const REG = {
    isMobile: /^1[3456789]\d{9}$/,
    isPassword: /^.{4,16}$/
  };

  export default {
    name: 'login',
    data() {
      return {
        valid: true,
        showPassword: false,
        mobile: '',
        mobileRules: [
          v => !!v || '必须填写手机号',
          v => REG.isMobile.test(v) || '不是合法的手机号'
        ],
        password: '',
        passwordRules: [
          v => !!v || '必须填写密码',
          v => REG.isPassword.test(v) || '密码长度应为4-16位'
        ]
      }
    },
    components: {},
    methods: {
      ...mapActions([
        'setUserInfo',
        'setUserToken'
      ]),
      submit() {
        if (this.$refs.form.validate()) {
          let _data = {
            mobile: this.mobile,
            password: this.password
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
      }
    },
    created() {
      this.setUserInfo({});
      this.setUserToken(null);
      sessionStorage.clear();
    }
  }
</script>
