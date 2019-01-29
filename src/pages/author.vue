<template>
    <div></div>
</template>

<script>
    import {
      getUserInfo,
      openidLogin
    } from  '@/api/user-api'
    import api_config from '@/api/api-config'
    import * as _ from '@/util/util'
    import { mapState,mapActions } from 'vuex'
    export default {
        name: 'author',
        data () {
            return {
              webUrl:location.hostname == 'wxpay.dev.zt.raiyi.com' ? 'http://wxpay.dev.zt.raiyi.com/wx': 'http://dspgw.2491.raiyi.com/wxauth'
            }
        },
        components: {},
        methods: {
          ...mapActions([
            'userInfo',
            'userToken',
            'userOpenId'
          ]),
          getInfo () {
            this.userOpenId(this.$route.query.auth_openId);
            let _data = {
              openId:this.$route.query.auth_openId
            };
            openidLogin(_data).then( data => {
              this.userInfo(data.data);
              this.userToken(data.data.token);
              data.data && data.data.enterprise && sessionStorage.setItem('enterprise',JSON.stringify(data.data.enterprise));
              setTimeout(() => {// 页面恢复(进入用户一开始请求的页面)
                this.turnTo();
              }, 200)
            }).catch( err =>{
              //this.$toast('异步执行!!!');
              this.$router.push({ path:'/'+ this.$route.params.orgCode +'/login'});
            });
          },
          turnTo(){
            if(this.$route.query.redirect && this.$route.query.redirect.indexOf('/login') < 0 && this.$route.query.redirect !='/'){
              this.$router.push({ path: this.$route.query.redirect});
            }else{
              this.$router.push({ path:'/'+ this.$route.params.orgCode +'/account'});
            }
          }
        },
        computed: {},
        created() {
          if(!!!this.$store.state.user.openId && !!!this.$route.query.auth_openId){
            let ua = window.navigator.userAgent.toLowerCase()
            if(ua.match(/MicroMessenger/i) == 'micromessenger'){// 跳转到微信授权页面
              window.location.href = this.webUrl + '/weixin/auth/getOpenId?url='+_.URLencode(api_config.authorUrl + this.$router.currentRoute.fullPath)+'&type=1'
            }
          }else{// 如果有token 但是vuex中没有用户登录信息则做登录操作
            this.getInfo()
          }
        }
    }
</script>
