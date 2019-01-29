<template>
    <div class="balance-container">
      <div class="b-t">
        <img src="../images/recharge/icon-4.png">
        <p>我的余额</p>
        <em><span>&nbsp</span>{{balanceOut?balanceOut:'0'}}</em>
        <div class="button-type button-type1" @click="jumpTo('rechargeInfo')">充值</div>
        <div class="button-type button-type2" @click="jumpTo('rechargeRecord')">消费记录</div>
        <i>
          <a href="tel:4008805847" style="color: #3B3942">客服电话：400-880-5847</a>
        </i>
      </div>
    </div>
</template>

<script>
  import { fundBalance } from '@/api/company-api'
  import { numTransform } from '@/util/util'

  export default {
        name: 'balance',
        data () {
            return {
              balanceOut:'',
                msg: 'Welcome to Your Vue.js App'
            }
        },

        components: {},
        methods: {
          jumpTo(link){
              this.$router.push({path:'/' + this.$route.params.orgCode +"/"+link,query:{"type":this.$route.query.type}})
          }
        },
        watch:{
          '$route'(to,from){
            console.log("to",to)
          }
        },
        computed: {},
        created() {
          let _self = this;
          fundBalance().then((res)=>{
            _self.balanceOut = res.data?numTransform(res.data.balanceOut):'0.00'
          });
        }
    }
</script>

<style lang="scss">

</style>
