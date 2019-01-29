<template>
    <div class="company-task-container">
      <div class="task-header">
        <div class="user-info">
          <span class="avatar">
            <img :src="userInfo.avatar">
          </span>
          <span class="name">{{ userInfo.name }}</span>
          <span class="tel">{{ userInfo.mobile }}</span>
        </div>
        <div class="user-account">
          <span class="info"><router-link :to="'/'+ $route.params.orgCode + '/info'">企业资料：<i v-text="!!!this.ass || this.ass.status == 11 ? '去完善' : (this.ass.status==10 ? '审核中' : '查看')"></i> </router-link></span>
          <span class="account"><router-link :to="'/' + $route.params.orgCode + '/balance?type=0'">余额：{{ userInfo.account }}</router-link></span>
        </div>
      </div>
      <div class="task-record">
        <pull-to :bottom-load-method="refresh">
          <ul>
            <li v-for="item in dataList">
              <router-link :to="'/' + $route.params.orgCode +'/task/'+ item.id">
                <div class="record-list">
                  <p class="cell-industry">{{ item.industryTxt }} <em>投放量：{{ item.sendCount }}</em></p>
                  <p class="cell-address">{{ item.areaNameTxt }}</p>
                  <p class="cell-date">{{ item.sendTime }}</p>
                  <span class="list-status">{{ statusCase(item.status) }}</span>
                </div>
              </router-link>
            </li>
<!--              <li v-for="item in dataList">
                <router-link :to="'/' + $route.params.orgCode +'/task/'+ item.id">
                  <div class="record-list">
                    <p class="list-batch">任务编号：{{ item.id }}</p>
                    <p class="list-date">{{ item.createTime }}</p>
                    <span class="list-status">{{ statusCase(item.status) }}</span>
                  </div>
                </router-link>
              </li>-->
              <li class="no-data" v-show="!!!dataList.length">无更多订单记录</li>
          </ul>
        </pull-to>
      </div>
      <div class="task-footer">
        <a @click="checkRouter">立即推广</a>
        <router-link to="/" v-show="0">个人中心</router-link>
      </div>
    </div>
</template>

<script>
    import PullTo from 'vue-pull-to'
    import { regionList,regionAllList } from '@/api/common-api'
    import { getUserInfo,balanceInfo,getWxUser } from '@/api/user-api'
    import { entityInfo } from '@/api/company-api'
    import { assTaskList } from '@/api/task-api'
    import api from '@/api/api-config'
    import defaultHead from '@/images/default.png'
    import { numTransform } from '@/util/util'
    export default {
        name: 'user',
        data () {
            return {
              dataList: [],
              iconLink:'',
              userInfo:{
                avatar: defaultHead ,
                name:'用户',
                mobile:this.$store.state.user.userInfo.uniqueCode,
                account:0,
                status:1
              },
              ass:'',
              page:{
                pageSize:10,
                pageIndex: 1,
                total:0
              }
            }
        },
        components: {
          PullTo
        },
        methods: {
          refresh(loaded) {
            setTimeout(() => {
               this.page.pageIndex ++;
                if(this.page.total >= this.page.pageIndex){
                  this.list(this.page.pageSize,this.page.pageIndex,loaded);
                }else{
                  loaded('done');
                }
            }, 2000);
          },
          list(pageSize,pageIndex,loaded){
            let _data={
              pageSize,
              pageIndex,
              orgCode:api.orgId,
              userId:this.$store.state.user.userInfo.id
            };
            assTaskList(_data).then((data)=>{
              if(data.code == 1){
                this.dataList = this.dataList.concat(data.data);
                loaded && loaded('done');
              }
            }).catch(()=>{
              loaded && loaded('done');
            });
          },
          statusCase(id){
             switch(id){
                case 1 :
                  return '待审核';
                  break;
                case 3:
                  return '已审核';
                  break;
                case 4:
                  return '审核未通过';
                  break;
                case 5:
                  return '投放确认';
                  break;
                case 6:
                  return '投放中';
                  break;
                case 7:
                  return '投放完成';
                  break;
                case 10:
                  return '投放取消';
                  break;
                case 11:
                  return '投放失败';
                  break;
              }
          },
          checkRouter(){
              if(!!this.ass){
                  if(this.ass.status == 10){
                    this.$toast({
                      message:'请等待客服审核资料'
                    })
                  }else if(this.ass.status == 11){
                    this.$toast({
                      message:'审核资料失败，重新填写'
                    })
                  }else if(this.ass.status == 2){
                    this.$toast({
                      message:'企业已禁用，请切换账号'
                    })
                  }else if(this.ass.status == 3){
                    this.$toast({
                      message:'企业信息资料异常'
                    })
                  }else{
                    sessionStorage.setItem('taskInfo','');
                    this.$router.push({path:'/'+ this.$route.params.orgCode +'/create'})
                  }
              }else{
                  this.$toast({
                    message:'请先完善企业资料'
                  })
              }
          }
        },
        computed: {

        },
        mounted (){
          //余额
          balanceInfo().then(data=>{
            if(!!!data.data){
              return false;
            }
            this.$nextTick(()=>{
              this.userInfo.account = numTransform(data.data.balanceOut);
              sessionStorage.setItem('account',data.data.balanceOut);
            });
          });
        },
        created() {
            if(this.$route.query.jumpUrl){
              this.$router.push(this.$route.query.jumpUrl)
            }
          this.$store.dispatch('loadShow', true);

          //获取用户基本信息
/*          let _data = {
            identityNo: this.$store.state.user.userInfo.identityNo,
            identityType:1
          };
          getUserInfo(_data).then(data =>{
           [
             this.userInfo.mobile,
             this.userInfo.status,
            ] = [data.data.identityNo,data.data.status];
          });*/

          //获取微信头像等信息
          getWxUser({
            openId:this.$store.state.user.userInfo.openId || this.$store.state.user.openId
          }).then(data =>{
            [this.userInfo.avatar,this.userInfo.name]=[data.data.image,data.data.name]
          });

          //提前缓存地区信息
          if(sessionStorage.getItem('regionList')){
            this.regionList = JSON.parse(sessionStorage.getItem('regionList'));
          }else{
            regionList().then(data => {
                if(data.data.length > 0){
                  this.regionList = data.data;
                  sessionStorage.setItem('regionList',JSON.stringify(data.data));
                }
            });
          }

          if(sessionStorage.getItem('regionAllList')){
            this.regionList = JSON.parse(sessionStorage.getItem('regionAllList'));
          }else{
            regionAllList().then(data => {
              if(data.data.length > 0){
                this.regionList = data.data;
                sessionStorage.setItem('regionAllList',JSON.stringify(data.data));
              }
            })
          }


          //缓存企业信息
          let _enterprise = JSON.parse(sessionStorage.getItem('enterprise'));
          if(_enterprise){
            entityInfo({enterpriseId:_enterprise.id}).then(data=>{
              this.ass = data.data;
              data.data && sessionStorage.setItem('enterprise',JSON.stringify(data.data));
            });
          }



          //获取任务列表接口
          let _data_={
            pageSize:this.page.pageSize,
            pageIndex:this.page.pageIndex,
            orgCode:api.orgId,
            userId:this.$store.state.user.userInfo.id
          };
          assTaskList(_data_).then((data)=>{
            if(data.code == 1){
              this.dataList = this.dataList.concat(data.data);
              this.page.total = data.totalPage;
              this.$store.dispatch('loadShow', false);
            }
          }).catch(res =>{
            this.$store.dispatch('loadShow', false);
          })
        }
    }
</script>
