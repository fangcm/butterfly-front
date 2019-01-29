<template>
  <div class="login-container">
    <p class="login-logo"><img src="./../images/logo.png" alt="logo"></p>
    <div class="login-form">
      <div class="login-input">
        <input type="tel" class="login-name" maxlength="11" placeholder="输入手机号"
               oninput="this.value=this.value.replace(/[^\d]/g,'')"
               v-model="login.identityNo">
      </div>
      <div class="login-input">
        <input type="password" class="login-password" maxlength="30" placeholder="输入密码"
               v-model="login.password"
               oninput="this.value=this.value.replace(/[^\w]/g,'')">
      </div>
      <div class="login-btn">
        <button class="login-ok" @click="handleLogin">登录</button>
      </div>
      <p class="login-tips">
        <router-link :to="'/' + orgCode + '/register'">
          <span class="login-register">新用户注册</span>
        </router-link>
        <router-link :to="'/' + orgCode + '/findpassword' ">
          <span class="login-find  pull-right">找回密码</span>
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
    import { userLogin } from '@/api/user-api'
    import{ mapActions } from 'vuex'

    export default {
      data () {
        return {
          login:{
            identityNo:'',
            identityType:1,
            password:'',
            openId:'',
            orgCode:''
          }
        }
      },
      components: {

      },
      methods:{
        ...mapActions([
            "userInfo",
            "userToken"
        ]),
        handleLogin(){
          if(!(this.login.identityNo&&this.login.password)){
            this.$toast({
              message: '用户名或密码不能空哟 >_<',
            });
            return false;
          }
          let reg = /^1[345789]\d{9}$/;
          if(!reg.test(this.login.identityNo) || this.login.identityNo.length != 11){
            this.$toast({
              message: '请输入11位合法手机号',
            });
            return false;
          }

          if(this.login.password.length <6){
            this.$toast({
              message: '密码长度不能少于6位',
            });
            return false;
          }
          this.login.openId = this.$store.state.user.openId || this.login.openId ;
          userLogin(this.login).then((data)=>{
            this.userInfo(data.data);
            this.userToken(data.data.token);
            this.$store.dispatch('upClick','assist_login');//数据登录统计
            if(data.code===1){
              data.data.enterprise && sessionStorage.setItem('enterprise',JSON.stringify(data.data.enterprise));
              if(this.$route.query.redirect && this.$route.query.redirect.indexOf('/login') < 0 && this.$route.query.redirect.indexOf('/register')< 0){
                this.$router.push({ path: this.$route.query.redirect});
              }else{
                this.$router.push({ path:'/'+ this.$route.params.orgCode +'/account'});
              }/*
              this.$toast({
                message: '登录成功',
                iconClass: 'icon icon-success'
              });*/
            }
          })
        }
      },
      created() {
        this.$store.dispatch('upLoad','assist_login');//数据登录统计
        this.uploadLoadStatistics('precision_marketing_login');
        this.orgCode = this.$route.params.orgCode;
        this.userInfo({});
        this.userToken(null);
        sessionStorage.clear();
      }
    }
</script>
