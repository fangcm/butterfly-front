<template>
    <div class="rechargeInfo-container">
      <div class="r-t">
        <em>充值金额</em>
        <p class="clearfix"><s></s><input type="number" placeholder="请输入充值金额" v-model="amount"/></p>
        <span>{{payLimit.minBalance}}元起充</span>
      </div>
      <div class="button-type1" @click="pay" :style=" canPay?'':'background-color:#bbb;'">{{canPay?'充值':'充值中'}}</div>
      <i>
        <a href="tel:4008805847" style="color: #3B3942">客服电话：400-880-5847</a>
      </i>
    </div>
</template>

<script>
  import { mapState } from 'vuex';

  import { balanceRecharge ,configList } from '@/api/company-api'
    export default {
        name: 'app',
        data () {
            return {
              canPay:true,
              successUrl:'',
              failUrl:'',
              payLimit:{
                minBalance:0,
                maxBalance:1
              },
              amount:'',
              msg: 'Welcome to Your Vue.js App'
            }
        },
        components: {},
        methods: {
          pay(){
            let _self = this;

            if(_self.canPay){
              _self.canPay =false;
                  const ua = navigator.userAgent.toLowerCase();
                  let isWeixin = ua.indexOf('micromessenger') != -1;
                  if(!isWeixin){
                    _self.$toast({
                      message: '对不起，暂时只支持微信浏览器支付',
                      className:'longtoast',

                    });
                    _self.canPay =true;
                    return false
                  }else{
                    if(parseFloat(_self.payLimit.minBalance)<=parseFloat(_self.amount)&&parseFloat(_self.payLimit.maxBalance)>=parseFloat(_self.amount)){
                      let _data = {
                        "openId": this.openId,
                        "payType": "wechat",//支付类型:wechat,alipay
                        "totalFee": parseFloat(_self.amount),
                        "successUrl":encodeURI(_self.successUrl),
                        "failUrl":encodeURI(_self.failUrl)
                      };
                      balanceRecharge(_data).then((res)=>{
                        _self.canPay =true;
                        let a = res;
                        if (a.code == 1 && a.data) {
                          var b = a.data.payWapUrl;
                          b += "?payKey=" + a.data.payKey;
                          b += "&partner=" + a.data.partner;
                          b += "&partnerOrderNo=" + a.data.partnerOrderNo;
                          b += "&totalFee=" + a.data.totalFee;
                          b += "&subject=" + a.data.subject;
                          b += "&body=" + a.data.body;
                          b += "&notifyUrl=" + a.data.notifyUrl;
                          b += "&buyerId=" + a.data.buyerId;
                          b += "&sign_type=" + a.data.sign_type;
                          b += "&sign=" + encodeURIComponent(a.data.sign);
                          b += "&sucUrl=" + a.data.sucUrl;
                          b += "&errorUrl=" + a.data.errorUrl;
                          window.location.href = encodeURI(b)
                        }
                      })
                    }else{
                      _self.canPay =true;
                      this.$toast({
                        message: '金额不小于'+_self.payLimit.minBalance+'或者不大于'+_self.payLimit.maxBalance,
                        className:'longtoast',
                      });
                    }


                  }


            }
          },
          computed: {
            ...mapState({
              openId:state=>state.user.openId
            })
          },
        },
      created() {
        let _self = this;
        let type = this.$route.query.type;
        if(type==0){
          this.successUrl = window.location.origin+'/' + this.$route.params.orgCode +'/account';
          this.failUrl = window.location.origin+'/' + this.$route.params.orgCode +'/account'
        }else{
          this.successUrl = window.location.origin+'/' + this.$route.params.orgCode +'/create';
          this.failUrl = window.location.origin+'/' + this.$route.params.orgCode +'/create'
        }
        let _data = {
          key: 'EnterpriseRechargeLimit',
          "pageIndex": 1,
          "pageSize": 10,
        };
        configList(_data).then((res)=> {
          _self.payLimit = JSON.parse(res.data[0].value);
        })
      }
    }
</script>

<style lang="scss">
.longtoast{
  width:90%;
}
</style>
