<template>
    <div class="forget-container">
      <div class="ry-form">
        <div class="ry-input">
          <input type="tel" placeholder="输入手机号" maxlength="11" v-model="edit.identityNo" oninput="this.value=this.value.replace(/[^\d]/g,'')">
        </div>
        <div class="ry-input code-box">
          <input type="tel" placeholder="验证码" maxlength="6" v-model="edit.verificationCode">
          <ry-code width="3rem"  @handleSend="handleSend" :disabled="disabled" ref="timer" :second="second"></ry-code>
        </div>
        <div class="ry-input">
          <input type="password" placeholder="新密码" maxlength="18" v-model="edit.password" oninput="this.value=this.value.replace(/[^A-Za-z0-9]/g,'')">
        </div>
        <div class="ry-input">
          <input type="password" placeholder="确认密码" maxlength="18" v-model="edit.confirmPassword" oninput="this.value=this.value.replace(/[^A-Za-z0-9]/g,'')">
        </div>
        <div class="ry-button">
          <button @click="confirmEdit">确认</button>
        </div>
      </div>
    </div>
</template>

<script>
    import RyCode from '@/components/RyCode'
    import { modifyPass, sendSms } from '@/api/user-api'
    export default {
        name: 'findPassword',
        data () {
            return {
                edit:{
                   identityNo: '',
                   identityType: 0,
                   password: '',
                   uniqueCode: '',
                   verificationCode:''
                },
                sendCode: false,
                timeOut: 60,
                disabled: false,
                second: 60
            }
        },
        components: {
          RyCode
        },
        methods: {
          handleSend(){
            let reg = /^1[345789]\d{9}$/;
            if(!reg.test(this.edit.identityNo) || this.edit.identityNo.length != 11){
              this.$toast({
                message: '请输入11位合法手机号',
              });
              return false;
            }
            let _data = {
              mobile : this.edit.identityNo,
              type : 1
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
            if(!reg.test(this.edit.identityNo) || this.edit.identityNo.length != 11){
              this.$toast({
                message: '请输入11位合法手机号',
              });
              return false;
            }
            let _data = {
              mobile : this.edit.identityNo,
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
          confirmEdit(){
            let reg = /^1[345789]\d{9}$/;
            if(!reg.test(this.edit.identityNo) || this.edit.identityNo.length != 11){
              this.$toast({
                message: '请输入11位合法手机号',
              });
              return false;
            }

            if(this.edit.password.length <6){
              this.$toast({
                message: '密码长度不能少于6位',
              });
              return false;
            }

            if(!this.edit.password || !this.edit.confirmPassword){
              this.$toast({
                message: '密码不能空哟 >_<',
              });
              return false;
            }
            if(this.edit.password != this.edit.confirmPassword){
              this.$toast({
                message: '密码不一致 >_<',
              });
              return false;
            }
            if(!this.edit.verificationCode){
              this.$toast({
                message: '验证码不能为空 >_<',
              });
              return false;
            }
            modifyPass(this.edit).then(data => {
              this.$toast({
                message: '修改密码成功',
              });
              this.$router.push({ path:'/' + this.$route.params.orgCode + '/login' });
            });
          }
        },
        computed: {},
        created() {

        }
    }
</script>
