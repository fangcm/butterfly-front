<template>
    <div class="register-container">
      <div class="ry-card">
        <p class="register-welcome">welcome</p>
        <p class="register-tips">欢迎注册助销帮，我们竭诚为您服务</p>
      </div>
      <div class="ry-form">
        <div class="ry-input">
          <input type="tel"
                 maxlength="11"
                 placeholder="输入手机号"
                 v-model="register.mobile"
                 oninput="this.value=this.value.replace(/[^\d]/g,'')">
        </div>
        <div class="ry-input">
          <input type="password"
                 placeholder="新密码"
                 v-model="register.password" oninput="this.value=this.value.replace(/[^A-Za-z0-9]/g,'')">
        </div>
        <div class="ry-input">
          <input type="password"
                 placeholder="确认密码"
                 v-model="register.confirmPassword" oninput="this.value=this.value.replace(/[^A-Za-z0-9]/g,'')">
        </div>
        <div class="ry-input code-box">
          <input type="text"
                 maxlength="6"
                 placeholder="验证码"
                 v-model="register.verificationCode">
          <ry-code width="3rem"  @handleSend="handleSend" :disabled="disabled" ref="timer" :second="second"></ry-code>
        </div>
        <div class="ry-button">
          <button @click="submitRegist">确认</button>
        </div>
      </div>
      <div class="ry-card register-rules" >
        <p class="">注册代表你同意<router-link :to="'/'+ $route.params.orgCode +'/agreement'">《助销帮用户协议》</router-link></p>
      </div>
    </div>
</template>

<script>
  import { userRegist, sendSms } from '@/api/user-api'
  import RyCode from '@/components/RyCode'
  import{ mapActions } from 'vuex'
    export default {
        name: 'register',
        data () {
            return {
                register:{
                  mobile: '',
                  openId: '',
                  password: '',
                  confirmPassword:'',
                  verificationCode: ''
                },
                disabled: false,
                second: 60
            }
        },
        components: {
          RyCode
        },
        methods: {
          ...mapActions([
            "userInfo",
            "userToken"
          ]),
          handleSend(){
            let reg = /^1[345789]\d{9}$/;
            if(!reg.test(this.register.mobile) || this.register.mobile.length != 11){
              this.$toast({
                message: '请输入11位合法手机号',
              });
              return false;
            }

            let _data = {
              mobile: this.register.mobile,
              type: 1
            };
            sendSms(_data).then(data => {
              this.disabled = true;
              setTimeout(() =>{
                this.$refs.timer.run();
                this.disabled = false;
              },200);
            })
          },
          getCode(){
            let reg = /^1[345789]\d{9}$/;
            if(!reg.test(this.register.mobile) || this.register.mobile.length != 11){
              this.$toast({
                message: '请输入11位合法手机号',
              });
              return false;
            }

            let _data = {
              mobile : this.register.mobile,
              type : 1
            };
            sendSms(_data).then(data => {
                this.sendCode = true;
                this.setTimeOut();
            })
          },
          setTimeOut () {
            let timer = setTimeout(() => {
              this.setTimeOut()
              if(this.timeOut > 0) {
                this.timeOut--
              }
            }, 1000);
            if(this.timeOut <= 0) {
              this.sendCode = false
              this.timeOut = 60;
              clearTimeout(timer)
            }
          },
          submitRegist(){
            let reg = /^1[345789]\d{9}$/;
            if(!reg.test(this.register.mobile) || this.register.mobile.length != 11){
              this.$toast({
                message: '请输入11位合法手机号',
              });
              return false;
            }
            this.register.openId = this.$store.state.user.openId;
            if(!this.register.password || !this.register.confirmPassword){
              this.$toast({
                message: '密码不能空哟 >_<',
              });
              return false;
            }

            if(this.register.password.length <6){
              this.$toast({
                message: '密码长度不能少于6位',
              });
              return false;
            }

            if(this.register.password != this.register.confirmPassword){
              this.$toast({
                message: '密码不一致 >_<',
              });
              return false;
            }
            if(!this.register.verificationCode){
              this.$toast({
                message: '验证码不能为空 >_<',
              });
              return false;
            }
            userRegist(this.register).then(data => {
              this.userInfo(data.data);
              this.userToken(data.data.token);
              this.$toast({
                message: '用户注册成功',
              });
              setTimeout(() => {// 页面恢复(进入用户一开始请求的页面)
                this.$router.push({ path:'/'+ this.$route.params.orgCode +'/account'});
              }, 200)
            })

          }
        },
        computed: {},
        created() {

        }
    }
</script>
