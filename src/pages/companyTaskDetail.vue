<template>
    <div class="task-detail-container">
       <div class="detail-header">
         <div class="order-img">
           <img src="./../images/order.png" />
         </div>
         <div class="order-info">
           <span>{{ detailList.length && statusCase(detailList[0].status) || '状态异常'}}</span>
           <span>{{ detailList.length && detailList[0].orderCode }} {{  detailList.length &&detailList[0].task.industryTxt}}</span>
           <span>投放量：{{ detailList.length &&detailList[0].sendCound}}</span>
           <em v-if="detailList.length && detailList[0].status == 1" @click="handleCancel">取消投放</em>
         </div>
       </div>
       <div class="order-adr">
         {{ detailList.length && detailList[0].task.areaNameTxt }}
       </div>
       <div class="detail-list" v-show="detailList.length">
         <div class="cell" v-for="item in detailList">
           <span class="time">
             <em>{{ item.createTime.split(' ')[1].slice(0,5) < '12:00' ? '上午' : '下午' }}</em>
             <em>{{ item.createTime.split(' ')[1].slice(0,5) }}</em>
           </span>
           <span class="order-status">
             <em>{{ statusCase(item.status) }}</em>
             <em>
               <i v-show="item.status == 7">
                 投放：{{ item.sendCound }} 成功：{{ item.fillSuccCount || item.successCound }}
               </i>
             </em>
           </span>
         </div>
       </div>
      <div class="no-data" v-if="!!!detailList.length">
        还没有数据,请稍候刷新页面再试
      </div>
    </div>
</template>

<script>
    import { assTaskDetail,assTaskUpdate } from '@/api/task-api'
    export default {
        name: 'taskDetail',
        data () {
            return {
                detailList:[],
                taskId:0
            }
        },
        components: {},
        methods: {
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
          handleCancel(){
            let _data = {
              id:this.taskId,
              status:10
            };
            assTaskUpdate(_data).then(data =>{
              this.$toast({
                message: '任务取消成功'
              });
              let _data_ = {
                taskId:this.$route.params.id,
                pageIndex:1,
                pageSize:1000
              };
              assTaskDetail(_data_).then(data=>{
                this.detailList = data.data;
                this.taskId = this.$route.params.id
              })
            })
          }
        },
        computed: {},
        created() {
            let _data = {
              taskId:this.$route.params.id,
              pageIndex:1,
              pageSize:1000
            };
            assTaskDetail(_data).then(data=>{
                this.detailList = data.data;
                this.taskId = this.$route.params.id
            })
        }
    }
</script>

<style lang="scss">

</style>
