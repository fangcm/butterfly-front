<template>
    <div class="recharge-record-container">
      <div class="c-header" ref="topcontain">
        <h5 class="c-title">余额</h5>
        <p class="c-tips">当前余额（元）</p>
        <p class="c-money">{{balanceOut?balanceOut:'0'}}</p>
        <button class="c-torecharge" @click="jumpTo('rechargeInfo')">去充值</button>
      </div>
      <div class="c-body" :style="'height:'+tableHeight+'px;overflow:hidden;'">
        <pull-to :bottom-load-method="refresh" :is-throttle	=true>

        <ul>
          <li class="c-wrap" v-for="(item,index) in tableData" :key="item.id">
            <div class="c-recharge-item" v-if="item.actionType==1">
              <img src="../images/recharge/icon-2.png" alt="">
            </div>
            <div class="c-recharge-item" v-else-if="item.actionType==2">
              <img src="../images/recharge/icon-1.png" alt="">
            </div>
            <div class="c-recharge-item" v-else>

              <img src="../images/recharge/icon-3.png" alt="">
            </div>
            <div class="c-recharge-item">
              <p>
                {{Transform(item.moneyOut)}}
              </p>
              <em>
                {{item.createTime}}
                <span>
                </span>
              </em>
            </div>
            <div class="c-recharge-item">
              <p style="color: #FD4623;" v-if="item.actionType==2">
                <span v-if="item.status!=1">
                  充值{{statusList[item.status]}}
                </span>
                <span v-else @click="pay(item.id,item.moneyOut)" style="color: #1592D4">
                  继续充值
                </span>
              </p>
              <p style="color: #FD4623;" v-if="item.actionType==1">
                赠送{{statusList[item.status]}}
              </p>
              <span v-if="item.actionType==3">
                <p v-if="item.status==21">
                  退款
                </p>
                <p v-else-if="item.status==22">
                  消耗
                </p>
                <p v-else>
                  冻结{{statusList[item.status]}}
                </p>
              </span>
            </div>

          </li>
          <!--<li class="c-wrap">-->
            <!--<div class="c-recharge-item">-->
              <!--<img src="../images/recharge/icon-2.png" alt="">-->
            <!--</div>-->
            <!--<div class="c-recharge-item">-->
              <!--<p>-->
                <!--100.00-->
              <!--</p>-->
              <!--<em>-->
                <!--2018-01-23-->
                <!--<span>-->
                  <!--15:30:36-->
                <!--</span>-->
              <!--</em>-->
            <!--</div>-->
            <!--<div class="c-recharge-item">-->
              <!--<p class="">消费</p>-->
              <!--<em>批次号：1657824</em>-->
            <!--</div>-->

          <!--</li>-->
          <!--<li class="c-wrap">-->
            <!--<div class="c-recharge-item">-->
              <!--<img src="../images/recharge/icon-3.png" alt="">-->
            <!--</div>-->
            <!--<div class="c-recharge-item">-->
              <!--<p>-->
                <!--100.00-->
              <!--</p>-->
              <!--<em>-->
                <!--2018-01-23-->
                <!--<span>-->
                  <!--15:30:36-->
                <!--</span>-->
              <!--</em>-->
            <!--</div>-->
            <!--<div class="c-recharge-item">-->
              <!--<p>退款</p>-->
            <!--</div>-->

          <!--</li>-->

        </ul>
        </pull-to>
      </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex';
  import PullTo from 'vue-pull-to'
  import { fundBalance , detailList ,balanceRecharge } from '@/api/company-api'
  import { numTransform } from '@/util/util'
//status   1=开始；2=执行中；20=成功；21=失败; 22=消耗
//actionType 1=赠送 2=充值 3=冻结
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
              page:{
                pageSize:5,
                pageIndex: 1,
                total:0
              },
              tableHeight:430,
              balanceOut:'',
              statusList:{1:"开始",2:"流程中",20:"成功",21:'失败',22:'消耗'},
              tableData:[],
                msg: 'Welcome to Your Vue.js App'
            }
        },
      components: {
        PullTo
      },
        methods: {
          Transform(data){
            return  numTransform(data)
          },
          pay(fundDetailId,amount){
            let _self = this;
            if(_self.canPay){
              _self.canPay = false;
            const ua = navigator.userAgent.toLowerCase();
            let isWeixin = ua.indexOf('micromessenger') != -1;
            if(!isWeixin){
              _self.$toast({
                message: '对不起，暂时只支持微信浏览器支付',
                className:'longtoast',

              });
              _self.canPay = true;

              return false
            }else{
              let _data = {
                "fundDetailId":fundDetailId,
                "openId": this.openId,
                "payType": "wechat",//支付类型:wechat,alipay
                "totalFee": parseFloat(amount),
                "successUrl":encodeURI(this.successUrl),
                "failUrl":encodeURI(this.failUrl)
              };
              balanceRecharge(_data).then((res)=>{
                _self.canPay = true;
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
            }}



          },
          refresh(loaded) {
              let _self = this;
            setTimeout(() => {
              _self.page.pageIndex++;
              if(_self.page.total >= _self.page.pageIndex){
                this.list(_self.page.pageSize,_self.page.pageIndex,loaded);
              }else{
                loaded('done');
              }
            }, 500);
          },
          list(pageSize,pageIndex,loaded){
              let _self=this;
            let _data={
              pageSize,
              pageIndex,
            };
            detailList(_data).then((res)=>{
              if(res.code == 1){
                _self.tableData = _self.tableData.concat(res.data);
                _self.page.total = res.totalPage;
                loaded && loaded('done');
              }
            }).catch(()=>{
              loaded && loaded('done');
            });
          },
          jumpTo(link){
            this.$router.push({path:'/' + this.$route.params.orgCode +"/"+link,query:{"type":this.$route.query.type}})
          }
        },
        mounted(){
          let _self = this;
          _self.tableHeight = window.outerHeight - _self.$refs.topcontain.offsetHeight
        },
        computed: {
          ...mapState({
            openId:state=>state.user.openId
          })
        },
        created() {

          let _self = this;
          let type = this.$route.query.type;
          this.successUrl = window.location.origin+'/' + this.$route.params.orgCode +'/rechargeRecord?type='+type;
          this.failUrl = window.location.origin+'/' + this.$route.params.orgCode +'/rechargeRecord?type='+type;
          fundBalance().then((res)=>{
            _self.balanceOut = res.data?numTransform(res.data.balanceOut):'0.00'
          });
          let _data = {
            pageSize:this.page.pageSize,
            pageIndex:this.page.pageIndex,
          };

          detailList(_data).then((res)=>{
              if(res.data){
                _self.tableData = _self.tableData.concat(res.data);
                _self.page.total = res.totalPage;

              }

          })
        }
    }
</script>

<style lang="scss">
  .longtoast{
    width:90%;
  }
</style>
